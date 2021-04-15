const {
	Server,
	EVT_STARTED,
	EVT_STOPPED,
	EVT_COMMAND,
	EVT_CLIENT_CONNECTED,
	CMD_REQUEST,
	CMD_MESSAGE,
	CMD_SUBSCRIBE
} = require("../../src/index");

const server = new Server();
server.enableLogging();
server.defineCommand("foo", "jsonEncoder");

server.on(EVT_STARTED, ({port}) => {
	console.log("Started on port", port);
});

server.on(EVT_STOPPED, () => {
	console.log("Stopped");
});

server.on(EVT_CLIENT_CONNECTED, (socketId) => {
	console.log("Client connected", socketId);

	server.request("aServerRequest", {
		"data": true
	}, (responseData) => {
		console.log("Got aServerRequest response", responseData);
	}, socketId);

	server.message({"foo": true}, socketId);
});

server.onRequest("aClientRequest", (data, response, socketId) => {
	console.log("Server received request", data, socketId, response);
	response({
		"hello": true
	});
});

server.onCommand( "myCommandName", (data, socketId) => {
	console.log("Command myCommandName", data, socketId);
});

server.GET("/test", (req, res) => {
	res.send({"GET RESPONSE": true});
});

server.onMessage((data) => {
	console.log("Message", data);
});

setInterval(() => {
	server.publish("myChannel", {"myData": true});
}, 1000);

server.start(9999);