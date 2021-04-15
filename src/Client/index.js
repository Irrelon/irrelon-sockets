const WebSocket = require("isomorphic-ws");
const SocketBase = require("../Base");
const {hexId} = require("../Base/utils");
const {
	// States
	STA_DISCONNECTED,
	STA_CONNECTING,
	STA_CONNECTED,
	STA_READY,
	STA_STARTED,
	STA_STOPPED,
	STA_DISCONNECTING,

	// Environments
	ENV_CLIENT,
	ENV_SERVER,

	// Commands
	CMD_COMMAND_MAP,
	CMD_DEFINE_COMMAND,
	CMD_MESSAGE,
	CMD_PING,
	CMD_READY,
	CMD_REQUEST,
	CMD_RESPONSE,
	CMD_SUBSCRIBE,
	CMD_PUBLISH,

	// Events
	EVT_COMMAND,
	EVT_CONNECTED,
	EVT_CONNECTING,
	EVT_DISCONNECTED,
	EVT_MESSAGE,
	EVT_READY,
	EVT_RECONNECTING,
	EVT_STATE_CHANGE,
	EVT_ERROR,
	EVT_STARTED,
	EVT_STOPPED,
	EVT_CLIENT_CONNECTED,
	EVT_CLIENT_DISCONNECTED,
	EVT_SUBSCRIBED
} = require("../Base/enums");

class SocketClient extends SocketBase {
	_backoff = 1000;
	_buffer = [];
	_autoReconnect = true;
	_subscriptions = {};

	constructor (clientName = "Client") {
		super(ENV_CLIENT, clientName);

		// Define the default command listeners
		this.on(EVT_COMMAND, CMD_COMMAND_MAP, this._onCommandMap);
		this.on(EVT_COMMAND, CMD_DEFINE_COMMAND, this._onDefineCommand);
		this.on(EVT_COMMAND, CMD_READY, this._onReadyCommand);
		this.on(CMD_REQUEST, CMD_SUBSCRIBE, (data = {}, response) => {
			const {channelName} = data;
			if (!channelName) return response({"err": "No channel name provided!", "success": false, channelName});

			this._subscriptions[channelName] = this._subscriptions[channelName] || [];
			this._subscriptions[channelName] = true;
			response({"err": null, "success": true, channelName});
		});
	}

	connect (host, callback) {
		return new Promise((resolve, reject) => {
			let proxyResolve = resolve;
			let proxyReject = reject;
			let proxyCallback = callback;

			// Check if we are already connected
			if (this.state() === STA_CONNECTED) {
				return;
			}

			this.state(STA_CONNECTING);

			this._host = host;
			this._socket = new WebSocket(host);
			this._socket.onopen = () => {
				this._onConnected();
				if (callback) { proxyCallback(); }
				proxyResolve();

				proxyResolve = () => {};
				proxyReject = () => {};
				proxyCallback = () => {};
			};
			this._socket.onclose = this._onUnexpectedDisconnect;
			this._socket.onmessage = this._onMessageFromServer;
			this._socket.onerror = (err) => {
				this._onSocketError(err);
				if (callback) { proxyCallback(err); }
				proxyReject(err);

				proxyResolve = () => {};
				proxyReject = () => {};
				proxyCallback = () => {};
			};
		});
	}

	reconnect () {
		this._backoff = this._backoff * 2;

		if (this._backoff > 100000) {
			// This is essentially a failure
			console.warn("Continuous failure to connect to server!");
		}

		this.emit(EVT_RECONNECTING, this._backoff);

		this.connect(this._host);
	}

	disconnect () {
		this.log("Disconnecting by request");
		this.state(STA_DISCONNECTING);

		this._socket.onclose = () => {
			this.state(STA_DISCONNECTED);
			delete this._socket;
		};

		try {
			this._socket.terminate();
		} catch (err) {
			console.error("Error terminating connection", err);
		}
	}

	command (command, data, options) {
		if (this.state() !== STA_READY) {
			// Buffer the message and send when connected
			this._bufferMessage({
				"method": "command",
				"args": [
					command,
					data,
					options
				]
			});
			return;
		}

		return super.command(command, data, this._socket, options);
	}

	request (requestName, data, callback) {
		if (typeof callback === "undefined" && typeof data === "function") {
			callback = data;
			data = undefined;
		}

		if (this.state() !== STA_READY) {
			// Buffer the message and send when connected
			this._bufferMessage({
				"method": "request",
				"args": [
					requestName,
					data,
					callback
				]
			});
			return;
		}

		// TODO: The request id is being defined by the client! This could
		//   lead to collisions and other nasty things. Fix this somehow!
		const requestId = hexId();
		this._responseCallbackByRequestId[requestId] = callback;

		super.request(requestName, requestId, data, this._socket);
	}

	response (requestId, data) {
		if (this.state() !== STA_READY) {
			// Buffer the message and send when connected
			this._bufferMessage({
				"method": "response",
				"args": [
					requestId,
					data
				]
			});
			return;
		}

		super.response(requestId, data, this._socket);
	}

	send (data) {
		this.command(CMD_MESSAGE, data);
	}

	message (data) {
		this.send(data);
	}

	autoReconnect (val) {
		if (val === undefined) return this._autoReconnect;
		this._autoReconnect = val;

		return this;
	}

	subscribe (channelName, data, onChannelDataHandler) {
		if (typeof onChannelDataHandler === "undefined" && typeof data === "function") {
			onChannelDataHandler = data;
			data = undefined;
		}

		return new Promise((resolve, reject) => {
			this.request(CMD_SUBSCRIBE, {channelName, data}, (responseData) => {
				this.onCommand(CMD_PUBLISH, (eventData, socketId, eventChannelName) => {
					if (channelName !== eventChannelName) return;
					onChannelDataHandler(eventData);
				});

				resolve(responseData);
			});
		});
	}

	publish (channelName, data) {
		if (!this._subscriptions || !this._subscriptions[channelName]) return;
		this.log("publish()", channelName, data);

		this.command(CMD_PUBLISH, data, {channelName});
	}

	GET (url, data) {
		return new Promise((resolve, reject) => {
			this.request("GET", {url, "body": data}, (responseData) => {
				resolve(responseData);
			});
		});
	}

	POST (url, data) {
		return new Promise((resolve, reject) => {
			this.request("POST", {url, "body": data}, (responseData) => {
				resolve(responseData);
			});
		});
	}

	PUT (url, data) {
		return new Promise((resolve, reject) => {
			this.request("PUT", {url, "body": data}, (responseData) => {
				resolve(responseData);
			});
		});
	}

	DELETE (url, data) {
		return new Promise((resolve, reject) => {
			this.request("DELETE", {url, "body": data}, (responseData) => {
				resolve(responseData);
			});
		});
	}

	_bufferMessage (data) {
		this._buffer.push(data);
	}

	_processBuffer () {
		this._buffer.forEach((bufferItem) => {
			const bufferFunc = this[bufferItem.method];

			if (!bufferFunc) {
				this.log("Failed to execute buffered method, method name not found: ", bufferItem.method);
				return;
			}

			bufferFunc.apply(this, bufferItem.args);
		});

		this._buffer = [];
	}

	_onConnected = () => {
		this._backoff = 1000;
		this.state(STA_CONNECTED);
		this.emit(EVT_CONNECTED);
	}

	_onUnexpectedDisconnect = () => {
		this.state(STA_DISCONNECTED);

		this.log("Disconnected from server unexpectedly!");
		this.emit(EVT_DISCONNECTED);

		if (!this._autoReconnect) return;

		setTimeout(() => {
			this.reconnect();
		}, this._backoff);
	}

	_onSocketError = (err) => {
		console.error("Error in connection", err);
		this.emit(EVT_ERROR, err);
	}

	_onMessageFromServer = (rawMessage) => {
		this.log("_onMessageFromServer", rawMessage);
		super._onRawMessage(rawMessage.data);
	}

	_onCommandMap = (data) => {
		this.log("_onCommandMap", data);
		const commands = [];

		data.forEach((item) => {
			commands.push(item[0]);
		});

		this.commandMap(commands);

		data.forEach((item) => {
			this.setCommandEncoding(item[0], item[1]);
		});
	}

	_onDefineCommand = (data) => {
		this.log("_onDefineCommand", data);
		this.defineCommand(data[0], data[1]);
	}

	_onReadyCommand = (data) => {
		this.socketId = data.id;
		this.log("_onReadyCommand", data);
		this.state(STA_READY);
		this.emit(CMD_READY);
		this._processBuffer();
	}

	_onRequest (requestName, requestId, data, response) {
		super._onRequest(requestName, requestId, data, response, "");
	}

	_onResponse (requestId, data) {
		const responseCallback = this._responseCallbackByRequestId[requestId];
		responseCallback(data);

		delete this._responseCallbackByRequestId[requestId];
	}
}

module.exports = SocketClient;
