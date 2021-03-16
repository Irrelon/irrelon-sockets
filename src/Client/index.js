const WebSocket = require("isomorphic-ws");
const SocketBase = require("../Base");
const {CONNECTING} = require("../Base/enums");
const {CONNECTED} = require("../Base/enums");
const {DISCONNECTED} = require("../Base/enums");
const {CLIENT, COMMAND} = require("../Base/enums");

class SocketClient extends SocketBase {
	_backoff = 1000;
	_buffer = [];

	constructor (clientName) {
		super(CLIENT, clientName);

		// Define the default command listeners
		this.on(COMMAND, "commandMap", this._onCommandMap);
		this.on(COMMAND, "defineCommand", this._onDefineCommand);
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

		this.emit("reconnecting", this._backoff);

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
		if (this.state() !== CONNECTED) {
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

				default:
					break;
			}
		});
		this._buffer = [];
	}

	_onConnected = () => {
		this._backoff = 1000;
		this.state(CONNECTED);
		this.emit("connected");
		this.processBuffer();
	}

	_onUnexpectedDisconnect = () => {
		this.state(DISCONNECTED);

		console.log("Disconnected from server");
		this.emit("disconnected");

		setTimeout(() => {
			this.reconnect();
		}, this._backoff);
	}

	_onSocketError = (err) => {
		console.error("Error in connection", err);
		this.emit("error", err);
	}

	_onMessageFromServer = (rawMessage) => {
		super._onMessage(rawMessage.data);
	}

	_onCommandMap = (data) => {
		console.log("_onCommandMap", data);
		this.commandMap(data);
	}

	_onDefineCommand = (data) => {
		console.log("_onDefineCommand", data);
		this.defineCommand(data[0], data[1]);
	}
}

module.exports = SocketClient;
