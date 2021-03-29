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
	EVT_CLIENT_DISCONNECTED
} = require("../Base/enums");

class SocketClient extends SocketBase {
	_backoff = 1000;
	_buffer = [];
	_autoReconnect = true;

	constructor (clientName = "Client") {
		super(ENV_CLIENT, clientName);

		// Define the default command listeners
		this.on(EVT_COMMAND, CMD_COMMAND_MAP, this._onCommandMap);
		this.on(EVT_COMMAND, CMD_DEFINE_COMMAND, this._onDefineCommand);
		this.on(EVT_COMMAND, CMD_READY, this._onReadyCommand);
	}

	connect (host) {
		// Check if we are already connected
		if (this.state() === STA_CONNECTED) {
			return;
		}

		this.state(STA_CONNECTING);

		this._host = host;
		this._socket = new WebSocket(host);
		this._socket.onopen = this._onConnected;
		this._socket.onclose = this._onUnexpectedDisconnect;
		this._socket.onmessage = this._onMessageFromServer;
		this._socket.onerror = this._onSocketError;
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
		this.state(STA_DISCONNECTED);

		try {
			this._socket.terminate();
			delete this._socket;
		} catch (err) {
			console.error("Error terminating connection", err);
		}
	}

	sendCommand (cmd, data) {
		if (this.state() !== STA_READY) {
			// Buffer the message and send when connected
			this._buffer.push({
				"type": "sendCommand",
				cmd,
				data
			});
			return;
		}

		return super.sendCommand(cmd, data, this._socket);
	}

	processBuffer () {
		this._buffer.forEach((bufferItem) => {
			switch (bufferItem.type) {
				case "sendCommand":
					this.sendCommand(bufferItem.cmd, bufferItem.data);
					break;

				case "sendRequest":
					this.sendRequest(bufferItem.requestName, bufferItem.data, bufferItem.callback);
					break;

				default:
					break;
			}
		});

		this._buffer = [];
	}

	sendRequest (requestName, data, callback) {
		if (this.state() !== STA_READY) {
			// Buffer the message and send when connected
			this._buffer.push({
				"type": "sendRequest",
				requestName,
				data,
				callback
			});
			return;
		}

		const requestId = hexId();
		this._responseCallbackByRequestId[requestId] = callback;

		super.sendRequest(requestName, requestId, data, this._socket);
	}

	sendResponse (requestId, responseData) {
		this.sendCommand(CMD_RESPONSE, {"id": requestId, "data": responseData});
	}

	GET (url, data) {
		return new Promise((resolve, reject) => {
			this.sendRequest("GET", {url, "body": data}, (responseData) => {
				resolve(responseData);
			});
		});
	}

	POST (url, data) {
		return new Promise((resolve, reject) => {
			this.sendRequest("POST", {url, "body": data}, (responseData) => {
				resolve(responseData);
			});
		});
	}

	PUT (url, data) {
		return new Promise((resolve, reject) => {
			this.sendRequest("PUT", {url, "body": data}, (responseData) => {
				resolve(responseData);
			});
		});
	}

	DELETE (url, data) {
		return new Promise((resolve, reject) => {
			this.sendRequest("DELETE", {url, "body": data}, (responseData) => {
				resolve(responseData);
			});
		});
	}

	send (data) {
		this.sendCommand(CMD_MESSAGE, data);
	}

	autoReconnect (val) {
		if (val === undefined) return this._autoReconnect;
		this._autoReconnect = val;

		return this;
	}

	_onConnected = () => {
		this._backoff = 1000;
		this.state(STA_CONNECTED);
		this.emit(EVT_CONNECTED);
	}

	_onUnexpectedDisconnect = () => {
		this.state(STA_DISCONNECTED);

		this.log("Disconnected from server");
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
		super._onMessage(rawMessage.data);
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
		this.log("_onReadyCommand", data);
		this.state(STA_READY);
		this.emit(CMD_READY);
		this.processBuffer();
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
