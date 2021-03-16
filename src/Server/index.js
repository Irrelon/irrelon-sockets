const WebSocket = require("isomorphic-ws");
const SocketBase = require("../Base");
const {hexId} = require("../Base/utils");
const {SERVER, STARTED, STOPPED} = require("../Base/enums");

class SocketServer extends SocketBase {
	constructor (serverName) {
		super(SERVER, serverName);
	}

	start (port = 8080) {
		if (this.state() === STARTED) {
			this.log("Call to start() - already started!");
			return;
		}

		this._socket = new WebSocket.Server({ port });
		this._socket.on("connection", this._onClientConnect);

		this.emit("started", {port});
		this.state(STARTED);
	}

	stop () {
		this._socket.close();
		this.emit("stopped");
		this.state(STOPPED);
	}

	broadcastCommand (cmd, data) {
		Object.entries(this._socketById).forEach(([key, socket]) => {
			super.sendCommand(cmd, data, socket);
		});
	}

	sendCommand (cmd, data, socketId) {
		if (!socketId) return this.broadcastCommand(cmd, data);

		const socket = this._socketById[socketId];
		if (!socket) return console.log("Socket required to send message!");

		super.sendCommand(cmd, data, socket);
	}

	_onClientConnect = (socket) => {
		socket.id = hexId();
		this._socketById[socket.id] = socket;

		socket.on("message", (data) => {
			this._onMessageFromClient(socket, data);
		});

		socket.on("disconnect", (data) => {
			this._onClientDisconnect(socket, data);
		});

		// Send initial data to the client
		this.sendCommand("commandMap", this._commandMap, socket.id);

		this.emit("clientConnect", socket.id);
	}

	_onClientDisconnect (socket, data) {
		this.emitId("clientDisconnect", socket.id, data);
		delete this._socketById[socket.id];
	}

	_onMessageFromClient (socket, rawMessage) {
		super._onMessage(rawMessage);
	}
}

module.exports = SocketServer;