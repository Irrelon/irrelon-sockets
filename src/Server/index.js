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

class SocketServer extends SocketBase {
	_httpMethodHandlers = {};

	constructor (serverName = "Server") {
		super(ENV_SERVER, serverName);

		this.on(CMD_REQUEST, "GET", (data, response, socketId) => {
			this._httpMethodHandlers.GET = this._httpMethodHandlers.GET || {};
			this._httpMethodHandlers.GET[data.url]({"body": data, socketId}, {"send": response});
		});

		this.on(CMD_REQUEST, "POST", (data, response, socketId) => {
			this._httpMethodHandlers.POST = this._httpMethodHandlers.POST || {};
			this._httpMethodHandlers.POST[data.url]({"body": data, socketId}, {"send": response});
		});

		this.on(CMD_REQUEST, "PUT", (data, response, socketId) => {
			this._httpMethodHandlers.PUT = this._httpMethodHandlers.PUT || {};
			this._httpMethodHandlers.PUT[data.url]({"body": data, socketId}, {"send": response});
		});

		this.on(CMD_REQUEST, "DELETE", (data, response, socketId) => {
			this._httpMethodHandlers.DELETE = this._httpMethodHandlers.DELETE || {};
			this._httpMethodHandlers.DELETE[data.url]({"body": data, socketId}, {"send": response});
		});
	}

	start (port = 8080) {
		if (this.state() === STA_STARTED) {
			this.log("Call to start() - already started!");
			return;
		}

		this._socket = new WebSocket.Server({ port });
		this._socket.on("connection", this._onClientConnect);

		this.log("Server started");
		this.emit(EVT_STARTED, {port});
		this.state(STA_STARTED);
	}

	stop () {
		this._socket.close();
		this.emit(EVT_STOPPED);
		this.state(STA_STOPPED);
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

		this.sendCommand(CMD_RESPONSE, {"id": requestId, "data": responseData}, socketId);
	}

	GET (url, callback) {
		this._httpMethodHandlers.GET = this._httpMethodHandlers.GET || {};
		this._httpMethodHandlers.GET[url] = callback;
	}

	POST (url, callback) {
		this._httpMethodHandlers.POST = this._httpMethodHandlers.POST || {};
		this._httpMethodHandlers.POST[url] = callback;
	}

	PUT (url, callback) {
		this._httpMethodHandlers.PUT = this._httpMethodHandlers.PUT || {};
		this._httpMethodHandlers.PUT[url] = callback;
	}

	DELETE (url, callback) {
		this._httpMethodHandlers.DELETE = this._httpMethodHandlers.DELETE || {};
		this._httpMethodHandlers.DELETE[url] = callback;
	}

	send (data, socketId) {
		this.sendCommand(CMD_MESSAGE, data, socketId);
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
		this.sendCommand(CMD_COMMAND_MAP, this._commandMap, socket.id);
		this.sendCommand(CMD_READY, "", socket.id);

		this.emit(EVT_CLIENT_CONNECTED, socket.id);
	}

	_onClientDisconnect (data, socket) {
		this.emitId(EVT_CLIENT_DISCONNECTED, socket.id, data);
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