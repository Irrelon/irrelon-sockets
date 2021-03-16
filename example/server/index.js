const {Server} = require("../../src/index");

const server = new Server();

server.on(EVT_STARTED, ({port}) => {
	console.log("Started on port", port);
});

server.on(EVT_STOPPED, () => {
	console.log("Stopped");
});

server.on(EVT_CLIENT_CONNECTED, (socketId) => {
	console.log("Client connected", socketId);

	server.sendRequest("aServerRequest", {
		"data": true
	}, (responseData) => {
		console.log("Got aServerRequest response", responseData);
	}, socketId);

	server.send({"foo": true}, socketId);
});

server.on(CMD_REQUEST, "aClientRequest", ({data, response, clientId}) => {
	console.log("Server received request", data, clientId, response);
	response({
		"hello": true
	});
});

server.GET("/test", (req, res) => {
	res.send({"GET RESPONSE": true});
});

server.on(EVT_MESSAGE, (data) => {
	console.log("Message", data);
});

server.start(9999);