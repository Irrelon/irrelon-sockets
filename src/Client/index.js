const WebSocket = require("isomorphic-ws");
const SocketBase = require("../Base");
const {hexId} = require("../Base/utils");
const {READY, CONNECTING, CONNECTED, DISCONNECTED, CLIENT, COMMAND} = require("../Base/enums");

class SocketClient extends SocketBase {
	_backoff = 1000;
	_buffer = [];

	constructor (clientName = "Client") {
		super(CLIENT, clientName);

		// Define the default command listeners
		this.on(COMMAND, CMD_COMMAND_MAP, this._onCommandMap);
		this.on(COMMAND, CMD_DEFINE_COMMAND, this._onDefineCommand);
		this.on(COMMAND, CMD_READY, this._onReadyCommand);
	}

	connect (host) {
		// Check if we are already connected
		if (this.state() === CONNECTED) {
			return;
		}

		this.state(CONNECTING);

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
		this.state(DISCONNECTED);

		try {
			this._socket.terminate();
			delete this._socket;
		} catch (err) {
			console.error("Error terminating connection", err);
		}
	}

	sendCommand (cmd, data) {
		if (this.state() !== READY) {
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
		if (this.state() !== READY) {
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
		this.sendCommand("genericMessage", data);
	}

	_onConnected = () => {
		this._backoff = 1000;
		this.state(CONNECTED);
		this.emit(EVT_CONNECTED);
	}

	_onUnexpectedDisconnect = () => {
		this.state(DISCONNECTED);

		this.log("Disconnected from server");
		this.emit(EVT_DISCONNECTED);

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
		this.commandMap(data);
	}

	_onDefineCommand = (data) => {
		this.log("_onDefineCommand", data);
		this.defineCommand(data[0], data[1]);
	}

	_onReadyCommand = (data) => {
		this.log("_onReadyCommand", data);
		this.state(READY);
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
