const STA_DISCONNECTED = 0;
const STA_CONNECTING = 1;
const STA_CONNECTED = 2;
const STA_READY = 3;
const STA_STARTED = 4;
const STA_STOPPED = 5;
const STA_DISCONNECTING = 6;

const ENV_CLIENT = "1";
const ENV_SERVER = "2";

const CMD_PING = "!^ping";
const CMD_COMMAND_MAP = "!^commandMap";
const CMD_DEFINE_COMMAND = "!^defineCommand";
const CMD_READY = "!^ready";
const CMD_REQUEST = "!^request";
const CMD_RESPONSE = "!^response";
const CMD_MESSAGE = "!^message";
const CMD_SUBSCRIBE = "!^subscribe";
const CMD_PUBLISH = "!^publish";

const EVT_COMMAND = "!^command";
const EVT_READY = "!^ready";
const EVT_MESSAGE = "!^message";
const EVT_CONNECTED = "!^connected";
const EVT_CONNECTING = "!^connecting";
const EVT_DISCONNECTED = "!^disconnected";
const EVT_RECONNECTING = "!^reconnecting";
const EVT_STATE_CHANGE = "!^state";
const EVT_ERROR = "!^error";
const EVT_STARTED = "!^started";
const EVT_STOPPED = "!^stopped";
const EVT_CLIENT_CONNECTED = "!^clientConnected";
const EVT_CLIENT_DISCONNECTED = "!^clientDisconnected";
const EVT_SUBSCRIBED = "!^subscribed";

module.exports = {
	// States
	STA_DISCONNECTED,
	STA_CONNECTING,
	STA_CONNECTED,
	STA_READY,
	STA_STARTED,
	STA_STOPPED,
	STA_DISCONNECTING,

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
};