const WebSocket = require("isomorphic-ws");
const SocketBase = require("../Base");
const {CLIENT, COMMAND} = require("../Base/enums");

class SocketClient extends SocketBase {
	constructor () {
		super(CLIENT);

		// Define the default command listeners
		this.on(COMMAND, "commandMap", this._onCommandMap);
		this.on(COMMAND, "defineCommand", this._onDefineCommand);
	}

	connect (host) {
		this._socket = new WebSocket(host);
		this._socket.onopen = this._onConnected;
		this._socket.onmessage = this._onMessageFromServer;
	}

	sendCommand (cmd, data) {
		return super.sendCommand(cmd, data, this._socket);
	}

	_onConnected = () => {
		this.emit("connected");
	}

	_onMessageFromServer = (rawMessage) => {
		super._onMessage(rawMessage);
	}

	_onCommandMap = (data) => {
		console.log("_onCommandMap", data);
		this.commandMap(data);
	}

	_onDefineCommand = (data) => {
		console.log("_onDefineCommand", data);
		this.defineCommand(data);
	}
}

module.exports = SocketClient;
