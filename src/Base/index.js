const Emitter = require("@irrelon/emitter");
const encoders = require("./encoders");
const {hexId} = require("./utils");
const {COMMAND, CLIENT, DISCONNECTED} = require("./enums");

class SocketBase {
	_socketById = {};
	_requestById = {};
	_responseCallbackByRequestId = {};
	_dictionary = [];
	_commandMap = ["ping", "commandMap", "defineCommand", "ready", "request", "response"];
	_commandEncoding = {
		"*": encoders.jsonEncoder,
		"commandMap": encoders.stringArrayEncoder,
		"defineCommand": encoders.stringArrayEncoder,
		"ready": encoders.noDataEncoder,
		"request": encoders.jsonEncoder,
		"response": encoders.jsonEncoder
	};
	_idCounter = 0;
	_state = DISCONNECTED;

	constructor (env, name) {
		this._name = name;
		this._env = env;
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

	state = (newState) => {
		if (newState === undefined) return this._state;

		this._state = newState;
		this.emit("state", newState);
	}

	log (...args) {
		args.splice(0, 0, this._name);
		//console.log.call(console, ...args);
	}

	commandMap (commandMap) {
		if (commandMap === undefined) return this._commandMap;
		this._commandMap = commandMap;
		this.generateDictionary();
	}

	defineCommand (command, encoderNameOrObject) {
		let encoderName;
		let encoder;

		const existingCommandId = this.idByCommand(command);
		if (existingCommandId > -1) return existingCommandId;

		if (typeof encoderNameOrObject === "string") {
			// Map to an encoder object
			encoderName = encoderNameOrObject;
			encoder = encoders[encoderNameOrObject];
		}

		// Add the new command
		this._dictionary.push(command);
		this._commandMap.push(command);
		this._commandEncoding[command] = encoder;

		this.log(`Defined new command "${command}"`);

		if (this._env === CLIENT) return this._commandMap.length - 1;

		// Update any connected clients with the new command
		this.sendCommand("defineCommand", [command, encoderName || this.encoderNameByObject(encoder)]);
		return this._commandMap.length - 1;
	}

	encoderNameByObject (obj) {
		return Object.entries(encoders).reduce((name, [key, encoder]) => {
			return encoder === obj ? key : "";
		}, "");
	}

	commandById (id) {
		return this._commandMap[id];
	}

	idByCommand (command) {
		return this._commandMap.indexOf(command);
	}

	sendCommand (cmd, data, socket) {
		if (!socket) return this.log("sendCommand() no socket provided!", cmd, data, socket);

		const commandId = this.defineCommand(cmd);
		const message = [commandId, data];

		this.log("sendCommand", message);

		socket.send(this._encode(cmd, message));
	}

	sendRequest (requestName, requestId, data, socket) {
		this.log("sendRequest()", requestName, requestId, data, socket);
		if (!socket) return this.log("request() no socket provided!", requestName, requestId, data, socket);

		const commandId = this.defineCommand("request");
		const message = [commandId, {"id": requestId, requestName, data}];

		this.log("request message payload", message);

		socket.send(this._encode("request", message));
	}

	_onMessage (rawMessage, socketId) {
		this.log("Raw message incoming", rawMessage, "socketId", socketId);

		const message = this._decode(rawMessage);
		const commandId = message[0];
		const data = message[1];
		const command = this.commandById(commandId);

		if (!command) {
			console.error(`Unknown commandId "${commandId}" received with data`, data);
			return {
				message,
				commandId,
				command,
				data
			};
		}

		this.log(`Incoming command "${command}" with data`, data);

		if (command === "request") {
			if (data.id) {
				this._onRequest(data.requestName, data.id, data.data, (responseData) => {
					this.sendResponse(data.id, responseData);
				}, socketId);
			} else {
				this.log("Request received without a request id!");
			}
		} else if (command === "response") {
			if (data.id) {
				this._onResponse(data.id, data.data);
			} else {
				this.log("Response received without a request id!");
			}
		} else {
			this.emitId(COMMAND, command, data);
		}

		return {
			message,
			commandId,
			command,
			data
		};
	}

	_onRequest (requestName, requestId, data, response, socketId = "") {
		this.emitId("request", requestName, {data, response, socketId});
	}

	_encode (command, [commandId, data]) {
		const encoding = this._commandEncoding[command] || this._commandEncoding["*"];
		if (!this._commandEncoding[command]) console.warn(`No specific encoder for command "${command}" (${commandId})`);
		if (!encoding) throw new Error(`No command encoding for "${command}" (${commandId}) and no default encoder specified under the "*" command name!`);

		return `${commandId}|${encoding.encode(data)}`;
	}

	_decode (data) {
		const parts = data.split("|");
		const command = this.commandById(parts[0]);
		const encoding = this._commandEncoding[command] || this._commandEncoding["*"];

		if (!this._commandEncoding[command]) console.warn(`No specific decoder for command "${command}" (${parts[0]})`);
		if (!encoding) throw new Error(`No command decoding for "${command}" (${parts[0]}) and no default decoder specified under the "*" command name!`);

		return [parts[0], encoding.decode(parts[1])];
	}
}

Emitter(SocketBase);

module.exports = SocketBase;
