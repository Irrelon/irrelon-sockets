const Emitter = require("@irrelon/emitter");
const {COMMAND} = require("./enums");
const {CLIENT} = require("./enums");
const {DISCONNECTED} = require("./enums");

class SocketBase {
	_socketById = {};
	_commandMap = ["commandMap", "defineCommand"];
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
		this.sendCommand("defineCommand", this._commandMap.length - 1);
		return this._commandMap.length - 1;
	}

	commandById (id) {
		return this._commandMap[id];
	}

	idByCommand (command) {
		return this._commandMap.indexOf(command);
	}

	sendCommand (cmd, data, socket) {
		if (!socket) return;

		const commandId = this.defineCommand(cmd);
		const message = [commandId, data];

		console.log("sendCommand", message);

		socket.send(JSON.stringify(message));
	}

	_onMessage (rawMessage) {
		console.log("Raw message incoming", rawMessage);

		const message = JSON.parse(rawMessage.data);
		const commandId = message[0];
		const data = message[1];
		const command = this.commandById(commandId);

		console.log("Emitting", COMMAND, command, data);
		this.emitId(COMMAND, command, data);

		return {
			message,
			commandId,
			command,
			data
		};
	}

	_encode (data) {
		return JSON.stringify(data);
	}

	_decode (data) {
		return JSON.parse(data);
	}
}

Emitter(SocketBase);

module.exports = SocketBase;
