const DISCONNECTED = 0;
const CONNECTING = 1;
const CONNECTED = 2;
const READY = 3;
const STARTED = 4;
const STOPPED = 5;
const CLIENT = 6;
const SERVER = 7;
const COMMAND = "command";

const CMD_PING = "ping";
const CMD_COMMAND_MAP = "commandMap";
const CMD_DEFINE_COMMAND = "defineCommand";
const CMD_READY = "ready";
const CMD_REQUEST = "request";
const CMD_RESPONSE = "response";
const CMD_MESSAGE = "message";

const EVT_READY = "ready";
const EVT_MESSAGE = "message";
const EVT_CONNECTED = "connected";
const EVT_CONNECTING = "connecting";
const EVT_DISCONNECTED = "disconnected";
const EVT_RECONNECTING = "reconnecting";
const EVT_STATE_CHANGE = "state";
const EVT_ERROR = "error";
const EVT_STARTED = "started";
const EVT_STOPPED = "stopped";
const EVT_CLIENT_CONNECTED = "clientConnected";
const EVT_CLIENT_DISCONNECTED = "clientDisconnected";

module.exports = {
	// States
	DISCONNECTED,
	CONNECTING,
	CONNECTED,
	READY,
	STARTED,
	STOPPED,
	CLIENT,
	SERVER,
	COMMAND,

	// Commands
	CMD_COMMAND_MAP,
	CMD_DEFINE_COMMAND,
	CMD_MESSAGE,
	CMD_PING,
	CMD_READY,
	CMD_REQUEST,
	CMD_RESPONSE,

	// Events
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
};