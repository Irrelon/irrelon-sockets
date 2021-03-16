const WebSocket = require("isomorphic-ws");
const SocketBase = require("../Base");
const {hexId} = require("../Base/utils");
const {SERVER, STARTED, STOPPED} = require("../Base/enums");

class SocketServer extends SocketBase {
	constructor (serverName = "Server") {
		super(SERVER, serverName);
	}

	start (port = 8080) {
		if (this.state() === STARTED) {
			this.log("Call to start() - already started!");
			return;
		}

		this._socket = new WebSocket.Server({ port });
		this._socket.on("connection", this._onClientConnect);

		this.log("Server started");
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
		if (!socket) return this.log("Socket required to send message!");

		super.sendCommand(cmd, data, socket);
	}

	sendRequest (requestName, data, callback, socketId) {
		const socket = this._socketById[socketId];
		if (!socket) return this.log("Socket required to send message!");

		const requestId = hexId();
		this._requestById[requestId] = socketId;
		this._responseCallbackByRequestId[requestId] = callback;

		super.sendRequest(requestName, requestId, data, socket);
	}

	sendResponse (requestId, responseData) {
		// Get socketId from requestId
		const socketId = this._requestById[requestId];
		this.log("Sending response", "requestId", requestId, responseData, "socketId", socketId);
		if (!socketId) return this.log("Request ID not recognised, already replied?");

		this.sendCommand("response", {"id": requestId, "data": responseData}, socketId);
	}

	_onClientConnect = (socket) => {
		socket.id = hexId();
		this._socketById[socket.id] = socket;

		this.log("New client connection with id", socket.id);

		socket.on("message", (data) => {
			this._onMessageFromClient(data, socket);
		});

		socket.on("disconnect", (data) => {
			this._onClientDisconnect(data, socket);
		});


		// Send initial data to the client
		this.sendCommand("commandMap", this._commandMap, socket.id);
		this.sendCommand("ready", "", socket.id);

		this.emit("clientConnect", socket.id);
	}

	_onClientDisconnect (data, socket) {
		this.emitId("clientDisconnect", socket.id, data);
		delete this._socketById[socket.id];
	}

	_onMessageFromClient (rawMessage, socket) {
		super._onMessage(rawMessage, socket.id);
	}

	_onRequest (requestName, requestId, data, response, socketId) {
		this.log("_onRequest requestId", requestId, "socketId", socketId);
		this._requestById[requestId] = socketId;
		super._onRequest(requestName, requestId, data, response, socketId);
	}

	_onResponse (requestId, data) {
		const responseCallback = this._responseCallbackByRequestId[requestId];
		responseCallback(data);

		delete this._responseCallbackByRequestId[requestId];
	}
}

module.exports = SocketServer;