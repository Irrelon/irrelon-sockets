const http = require("http");
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

class SocketServer extends SocketBase {
	_httpMethodHandlers = {};
	_subscriptions = {};

	/**
	 * @param {string} serverName The name of the server, used in logs.
	 */
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

		this.on(CMD_REQUEST, CMD_SUBSCRIBE, (data = {}, response, socketId) => {
			const {channelName} = data;
			if (!channelName) return response({"err": "No channel name provided!", "success": false, channelName});

			this._subscriptions[channelName] = this._subscriptions[channelName] || [];
			this._subscriptions[channelName].push(socketId);
			response({"err": null, "success": true, channelName});
		});
	}

	/**
	 * Starts the server on the specified port.
	 * @param {Number} [port] The port to run the server on. If no
	 * port is provided, the operating system will provide one for
	 * us. The chosen port is available via `server.port();`.
	 */
	start (port ) {
		return new Promise((resolve, reject) => {
			if (this.state() === STA_STARTED) {
				this.log("Call to start() - already started!");
				return;
			}

			const returnToCaller = (finalPort) => {
				this._socket.on("connection", this._onClientConnect);

				this.log("Server started");
				this.emit(EVT_STARTED, {"port": finalPort});
				this.state(STA_STARTED);

				resolve({"port": finalPort});
			};

			if (!port) {
				this._server = http.createServer();
				this._socket = new WebSocket.Server({"server": this._server});
				this._server.listen(0, () => {
					returnToCaller(this._server.address().port);
				});
				return;
			}

			this._socket = new WebSocket.Server({port});
			returnToCaller(port);
		});
	}

	/**
	 * Stops the server.
	 */
	stop () {
		if (this._server) {
			this._server.close();
		} else {
			this._socket.close();
		}

		this.emit(EVT_STOPPED);
		this.state(STA_STOPPED);
	}

	/**
	 * Broadcasts a command and data to all connected clients.
	 * @param {string} cmd The command to send.
	 * @param {*} [data] The data to send with the command.
	 * @param {Array<string>} [socketIds] An array of socket ids
	 * to broadcast to.
	 */
	broadcastCommand (cmd, data, socketIds, options = {}) {
		let recipients;

		if (socketIds instanceof Array) {
			recipients = socketIds.map((socketId) => this._socketById[socketId]);
		} else {
			recipients = Object.values(this._socketById);
		}

		this.log("broadcastCommand() sending command", cmd, data, options);

		recipients.forEach((socket) => {
			super.command(cmd, data, socket, options);
		});
	}

	/**
	 * Sends a command and data to the specified socket. If no socket
	 * is provided, the command is automatically broadcast instead.
	 * @param {string} cmd The command to send.
	 * @param {*} [data] The data to send with the command.
	 * @param {string|array} [socketId] The id of the client to send the
	 * command to or an array of ids to send to. If no id is provided,
	 * the command is broadcast to all connected clients.
	 */
	command (cmd, data, socketId, options= {}) {
		if (!socketId || socketId instanceof Array) return this.broadcastCommand(cmd, data, socketId, options);

		const socket = this._socketById[socketId];
		if (!socket) return this.log("command() Socket required to send message!");
		this.log("command() sending command", cmd, data, options);
		super.command(cmd, data, socket, options);
	}

	/**
	 * Sends a request to a client.
	 * @param {string} requestName The name of the request to send.
	 * @param {*} [data] The data to send with the request.
	 * @param {function(data: Any)} callback The function to call when the request
	 * receives a response.
	 * @param {string|number} socketId The id of the socket to send the request
	 * to.
	 */
	request (requestName, data, callback, socketId) {
		const socket = this._socketById[socketId];
		if (!socket) return this.log(`request() Socket required to send message and socket id "${socketId}" is not connected`);

		const requestId = hexId();
		this._requestById[requestId] = socketId;
		this._responseCallbackByRequestId[requestId] = callback;

		super.request(requestName, requestId, data, socket);
	}

	/**
	 * Sends a response to a request using the request id.
	 * @param {string} requestId The request id to respond to.
	 * @param {*} responseData The data to send with the response.
	 */
	response (requestId, data) {
		// Get socketId from requestId
		const socketId = this._requestById[requestId];
		const socket = this._socketById[socketId];
		this.log("Sending response", "requestId", requestId, data, "socketId", socketId);
		if (!socketId) return this.log("response() Request ID not recognised, already replied?");
		if (!socket) return this.log("response() Socket not recognised, disconnected?");

		super.response(requestId, data, socket);
	}

	/**
	 * Sends a basic message over the network to a specific client.
	 * @param {*} data The data to send with the message.
	 * @param {string} [socketId] Optional socketId. If none is provided
	 * the message is automatically broadcast to all connected clients.
	 */
	send (data, socketId) {
		this.command(CMD_MESSAGE, data, socketId);
	}

	message (data, socketId) {
		this.send(data, socketId);
	}

	subscribe (channelName, data, onChannelDataHandler, socketId) {
		if ((typeof onChannelDataHandler === "undefined" || typeof onChannelDataHandler === "string") && typeof data === "function") {
			socketId = onChannelDataHandler;
			onChannelDataHandler = data;
			data = undefined;
		}

		if (!socketId) return Promise.resolve({
			"err": "socketId not recognised",
			"success": false
		});

		return new Promise((resolve, reject) => {
			this.request(CMD_SUBSCRIBE, {channelName, data}, (responseData) => {
				this.onCommand(CMD_PUBLISH, (eventData, socketId, eventChannelName) => {
					if (channelName !== eventChannelName) return;
					onChannelDataHandler(eventData);
				});

				resolve(responseData);
			}, socketId);
		});
	}

	publish (channelName, data, socketId) {
		if (!this._subscriptions || !this._subscriptions[channelName]) return;
		this.log("publish()", channelName, data);

		if (!socketId) {
			// Get an array of socket ids that are listening on this channel
			socketId = this._subscriptions[channelName];
		}

		this.command(CMD_PUBLISH, data, socketId, {channelName});
	}

	/**
	 * Defines a listener at a URL for a GET request from the client. This
	 * operates in a similar way to an express server's .get() function.
	 * @param {string} url The url path to listen for requests on.
	 * @param {function} callback The function to call when a request comes
	 * in to the server.
	 */
	GET (url, callback) {
		this._httpMethodHandlers.GET = this._httpMethodHandlers.GET || {};
		this._httpMethodHandlers.GET[url] = callback;
	}

	/**
	 * Defines a listener at a URL for a POST request from the client. This
	 * operates in a similar way to an express server's .post() function.
	 * @param {string} url The url path to listen for requests on.
	 * @param {function} callback The function to call when a request comes
	 * in to the server.
	 */
	POST (url, callback) {
		this._httpMethodHandlers.POST = this._httpMethodHandlers.POST || {};
		this._httpMethodHandlers.POST[url] = callback;
	}

	/**
	 * Defines a listener at a URL for a PUT request from the client. This
	 * operates in a similar way to an express server's .put() function.
	 * @param {string} url The url path to listen for requests on.
	 * @param {function} callback The function to call when a request comes
	 * in to the server.
	 */
	PUT (url, callback) {
		this._httpMethodHandlers.PUT = this._httpMethodHandlers.PUT || {};
		this._httpMethodHandlers.PUT[url] = callback;
	}

	/**
	 * Defines a listener at a URL for a DELETE request from the client. This
	 * operates in a similar way to an express server's .delete() function.
	 * @param {string} url The url path to listen for requests on.
	 * @param {function} callback The function to call when a request comes
	 * in to the server.
	 */
	DELETE (url, callback) {
		this._httpMethodHandlers.DELETE = this._httpMethodHandlers.DELETE || {};
		this._httpMethodHandlers.DELETE[url] = callback;
	}

	/**
	 * Called when a client connects to the server.
	 * @param {object} socket The socket object representing the client.
	 */
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
		this.command(CMD_COMMAND_MAP, this._commandMap.map((command) => [command, this._commandEncoding[command].name]), socket.id);
		this.command(CMD_READY, {"id": socket.id}, socket.id);

		this.emit(EVT_CLIENT_CONNECTED, socket.id);
	}

	/**
	 *
	 */
	_onClientDisconnect (data, socket) {
		this.emitId(EVT_CLIENT_DISCONNECTED, socket.id, data);
		delete this._socketById[socket.id];
	}

	/**
	 *
	 */
	_onMessageFromClient (rawMessage, socket) {
		super._onRawMessage(rawMessage, socket.id);
	}

	/**
	 *
	 */
	_onRequest (requestName, requestId, data, response, socketId) {
		this.log("_onRequest requestId", requestId, "socketId", socketId);
		this._requestById[requestId] = socketId;
		super._onRequest(requestName, requestId, data, response, socketId);
	}

	/**
	 *
	 */
	_onResponse (requestId, data) {
		const responseCallback = this._responseCallbackByRequestId[requestId];
		responseCallback(data);

		delete this._responseCallbackByRequestId[requestId];
	}
}

module.exports = SocketServer;