const Emitter = require("@irrelon/emitter");
const {jsonEncoder} = require("./encoders");
const {stringArrayEncoder} = require("./encoders");
const {COMMAND} = require("./enums");
const {CLIENT} = require("./enums");
const {DISCONNECTED} = require("./enums");

class SocketBase {
	_socketById = {};
	_commandMap = ["commandMap", "defineCommand"];
	_commandEncoding = {
		"*": jsonEncoder,
		"commandMap": stringArrayEncoder
	};
	_idCounter = 0;
	_state = DISCONNECTED;

	constructor (env) {
		this._env = env;
	}

	state = (newState) => {
		if (newState === undefined) return this._state;

		this._state = newState;
		this.emit("state", newState);
	}

	log (...args) {
		console.log.apply(...args);
	}

	/**
	 * Generates a new 16-character hexadecimal unique ID
	 * @return {String} The id.
	 */
	hexId () {
		this._idCounter++;
		return (this._idCounter + (Math.random() * Math.pow(10, 17) + Math.random() * Math.pow(10, 17) + Math.random() * Math.pow(10, 17) + Math.random() * Math.pow(10, 17))).toString(16);
	}

	commandMap (commandMap) {
		if (commandMap === undefined) return this._commandMap;
		this._commandMap = commandMap;
	}

	defineCommand (command) {
		const existingCommandId = this.idByCommand(command);
		if (existingCommandId > -1) return existingCommandId;

		// Add the new command
		this._commandMap.push(command);
		if (this._env === CLIENT) return this._commandMap.length - 1;

		// Update any connected clients with the new command
		this.sendCommand("defineCommand", command);
		return this._commandMap.length - 1;
	}

	commandById (id) {
		return this._commandMap[id];
	}

	idByCommand (command) {
		return this._commandMap.indexOf(command);
	}

	sendCommand (cmd, data, socket) {
		if (!socket) return console.log("sendCommand() no socket provided!", cmd, data, socket);

		const commandId = this.defineCommand(cmd);
		const message = [commandId, data];

		console.log("sendCommand", message);

		socket.send(this._encode(cmd, message));
	}

	_onMessage (rawMessage) {
		console.log("Raw message incoming", rawMessage);

		const message = this._decode(rawMessage.data);
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

		console.log(`Emitting command with name ${command} and data`, data);
		this.emitId(COMMAND, command, data);

		return {
			message,
			commandId,
			command,
			data
		};
	}

	_encode (command, [commandId, data]) {
		const encoding = this._commandEncoding[command] || this._commandEncoding["*"];
		if (!encoding) throw new Error(`No command encoding for "${command}" (${commandId}) and no default encoder specified under the "*" command name!`);

		return `${commandId}|${encoding.encode(data)}`;
	}

	_decode (data) {
		const parts = data.split("|");
		const command = this.commandById(parts[0]);
		const encoding = this._commandEncoding[command] || this._commandEncoding["*"];

		if (!encoding) throw new Error(`No command encoding for "${command}" (${parts[0]}) and no default encoder specified under the "*" command name!`);

		return [parts[0], encoding.decode(parts[1])];
	}
}

Emitter(SocketBase);

module.exports = SocketBase;
