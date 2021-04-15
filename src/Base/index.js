const {Emitter} = require("@irrelon/emitter");
const encoders = require("./encoders");
const Message = require("./Message");
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
	EVT_CLIENT_DISCONNECTED
} = require("./enums");

/**
 * @typedef {object} SendCommandOptions
 * @property {string} [channelName] If specified, only transmits
 * this command on the specified channel.
 */

class SocketBase extends Emitter {
	_socketById = {};
	_requestById = {};
	_responseCallbackByRequestId = {};
	_dictionary = [];
	_commandMap = [];
	_commandEncoding = {
		"*": encoders.jsonEncoder
	};
	_state = STA_DISCONNECTED;
	_logging = false;
	_commandHandler = {};

	/**
	 * @param {string} env The environment for the SocketBase instance.
	 * Either ENV_CLIENT or ENV_SERVER.
	 */
	constructor (env, name) {
		super();
		this._name = name;
		this._env = env;

		this.defineCommand(CMD_PING, "noDataEncoder");
		this.defineCommand(CMD_COMMAND_MAP, "jsonEncoder");
		this.defineCommand(CMD_DEFINE_COMMAND, "stringArrayEncoder");
		this.defineCommand(CMD_READY, "jsonEncoder");
		this.defineCommand(CMD_REQUEST, "jsonEncoder");
		this.defineCommand(CMD_RESPONSE, "jsonEncoder");
		this.defineCommand(CMD_MESSAGE, "jsonEncoder");
		this.defineCommand(CMD_SUBSCRIBE, "jsonEncoder");
		this.defineCommand(CMD_PUBLISH, "jsonEncoder");

		this._commandHandler[CMD_REQUEST] = ({requestId, requestName, data, socketId}) => {
			if (!requestId) {
				return this.log("Request received without a request id!");
			}

			this._onRequest(requestName, requestId, data, (responseData) => {
				this.response(requestId, responseData);
			}, socketId);
		};

		this._commandHandler[CMD_RESPONSE] = ({requestId, data}) => {
			if (!requestId) {
				return this.log("Response received without a request id!");
			}

			this._onResponse(requestId, data);
		};

		this._commandHandler[CMD_MESSAGE] = ({message, commandId, command, data, rawMessage, socketId}) => {
			this.emit(EVT_MESSAGE, data, socketId);
		};

		this.generateDictionary();
	}

	generateDictionary () {
		this._dictionary = [];
		this._commandMap.forEach((command) => {
			this._dictionary.push(command);
		});
	}

	toDictionaryId (word) {
		const index = this._dictionary.indexOf(word);

		if (index === -1) {
			console.error(`Dictionary does not contain term "${word}"`);
		}

		return String.fromCharCode(index);
	}

	fromDictionaryId (id) {
		const index = id.charCodeAt(0);
		return this._dictionary[index];
	}

	/**
	 * Gets or sets the current instance state.
	 * @param {string|number} [newState] Optional. If provided, sets the current
	 * instance state to the passed state value. If not provided the function
	 * operates as a getter and the current state is returned instead.
	 * @returns {SocketBase|String|Number} State or self.
	 */
	state = (newState) => {
		if (newState === undefined) return this._state;

		this._state = newState;
		this.emit(EVT_STATE_CHANGE, newState);
		return this;
	}

	/**
	 * Enables logging output to the console.
	 * @returns {undefined}
	 */
	enableLogging () {
		this._logging = true;
	}

	/**
	 * Disables logging output to the console.
	 * @returns {undefined}
	 */
	disableLogging () {
		this._logging = false;
	}

	log (...args) {
		if (this._logging !== true) return;

		args.splice(0, 0, this._name);
		console.log.call(console, ...args);
	}

	/**
	 * Gets or sets the command map.
	 * @param {Array<String>} [commandMap] Optional. If passed, sets
	 * the passed array as the new command map.
	 * @returns {Array<String>|SocketBase} Either the existing map
	 * or self.
	 */
	commandMap (commandMap) {
		if (commandMap === undefined) return this._commandMap;
		this._commandMap = commandMap;
		this.generateDictionary();

		return this;
	}

	/**
	 * Defines a command and the encoder to use.
	 * @param {String} command The name of the command to define.
	 * @param {String|Object} encoderNameOrObject Either the name
	 * of the encoder or an object containing `encode()` and
	 * `decode()` functions.
	 * @returns {Number} The id of the command.
	 */
	defineCommand (command, encoderNameOrObject= "jsonEncoder") {
		let encoderName;
		let encoder;

		const existingCommandId = this._idByCommand(command);
		if (existingCommandId > -1) return existingCommandId;

		if (typeof encoderNameOrObject === "string") {
			// Map to an encoder object
			encoderName = encoderNameOrObject;
			encoder = encoders[encoderNameOrObject];
		}

		this.log("New command defined", command, encoderName);

		// Add the new command
		this._dictionary.push(command);
		this._commandMap.push(command);
		this.setCommandEncoding(command, encoder);

		this.log(`Defined new command "${command}"`);

		if (this._env === ENV_CLIENT) return this._commandMap.length - 1;

		// Update any connected clients with the new command
		this.broadcastCommand(CMD_DEFINE_COMMAND, [command, encoder.name]);
		return this._commandMap.length - 1;
	}

	setCommandEncoding (command = "", encoderNameOrObj = "jsonEncoder") {
		if (!command || !encoderNameOrObj) return;
		this._commandEncoding[command] = this._resolveEncoder(encoderNameOrObj);
	}

	/**
	 * Sends a command to the specified socket.
	 * @param {String} command The command to send.
	 * @param {*} data The data to send.
	 * @param {*} socket The socket to send to.
	 * @param {SendCommandOptions} [options] The options object.
	 * @returns {undefined} Nothing.
	 */
	command (command, data, socket, options= {}) {
		if (!socket) return this.log("command() no socket provided!", command, data, socket, options);
		if (socket.constructor.name !== "WebSocket") {
			return this.log("command() No websocket instance provided!", command, data, socket, options);
		}

		const {channelName} = options;
		const commandId = this.defineCommand(command);

		socket.send(this._encode({command, commandId, data, channelName}));
	}

	request (requestName, requestId, data, socket) {
		this.log("request()", requestName, requestId, data, socket);
		if (!socket) return this.log("request() no socket provided!", requestName, requestId, data, socket);

		const commandId = this.defineCommand(CMD_REQUEST);

		socket.send(this._encode({
			"command": CMD_REQUEST,
			commandId,
			data,
			requestId,
			requestName
		}));
	}

	response (requestId, data, socket) {
		this.log("response()", requestId, data, socket);
		if (!socket) return this.log("response() no socket provided!", requestId, data, socket);

		const commandId = this.defineCommand(CMD_RESPONSE);

		socket.send(this._encode({
			"command": CMD_REQUEST,
			commandId,
			data,
			requestId
		}));
	}

	onRequest (requestName, eventHandler) {
		this.on(CMD_REQUEST, requestName, eventHandler);
	}

	offRequest (requestName, eventHandler) {
		this.off(CMD_REQUEST, requestName, eventHandler);
	}

	onCommand (commandName, eventHandler) {
		this.on(EVT_COMMAND, commandName, eventHandler);
	}

	offCommand (commandName, eventHandler) {
		this.off(EVT_COMMAND, commandName, eventHandler);
	}

	onMessage (eventHandler) {
		this.on(EVT_MESSAGE, eventHandler);
	}

	offMessage (eventHandler) {
		this.off(EVT_MESSAGE, eventHandler);
	}

	_onRawMessage (rawMessage, socketId) {
		this.log(`Raw message incoming (socketId: ${socketId})`, rawMessage);

		const message = this._decode(rawMessage);
		const {
			commandId,
			data,
			channelName,
			requestId,
			requestName
		} = message;

		const command = this._commandById(commandId);

		if (!command) {
			console.error(`Unknown commandId "${commandId}" received with data`, data, "on channel", channelName);
			return message;
		}

		message.rawMessage = rawMessage;
		message.socketId = socketId;
		message.command = command;

		this.log(`Incoming command "${command}" with data`, data, "on channel", channelName);

		const commandHandler = this._commandHandler[command];

		if (commandHandler) {
			commandHandler(message);
		} else {
			this.emitId(EVT_COMMAND, command, data, socketId, channelName);
		}

		return message;
	}

	_onRequest (requestName, requestId, data, response, socketId = "") {
		this.emitId(CMD_REQUEST, requestName, data, response, socketId);
	}

	_encode (message) {
		const encoding = this._commandEncoding[message.command] || this._commandEncoding["*"];
		message.data = encoding.encode(message.data);

		return Message(message);
	}

	_decode (message) {
		const msg = Message(message);
		const command = this._commandById(msg.commandId);
		const encoding = this._commandEncoding[command] || this._commandEncoding["*"];

		msg.data = encoding.decode(msg.data);

		return msg;
	}

	/**
	 * Gets an encoder name by it's object.
	 * @param {Object} obj The encoder object.
	 * @returns {String} The name of the encoder or a blank
	 * string if not found.
	 */
	_encoderNameByObject (obj) {
		return Object.entries(encoders).reduce((name, [key, encoder]) => {
			return encoder === obj ? key : "";
		}, "");
	}

	/**
	 * Checks if the passed encoder is a string name
	 * or an actual encoder object. If it is a string name,
	 * returns the encoder object matching the name.
	 * @param {Object|String} encoder The name or the encoder
	 * object.
	 * @returns {Object|undefined} Either the encoder object
	 * or undefined if it does not exist.
	 */
	_resolveEncoder (encoder) {
		if (typeof encoder === "string") {
			return encoders[encoder];
		}

		return encoder;
	}

	/**
	 * Returns the command name from the passed command id.
	 * @param {Number} id The id of the commmand to find.
	 * @returns {String} The name of the command.
	 */
	_commandById (id) {
		return this._commandMap[id];
	}

	_idByCommand (command) {
		return this._commandMap.indexOf(command);
	}
}

module.exports = SocketBase;
