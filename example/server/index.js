const {Server} = require("../../src/index");

const server = new Server();

server.on("started", ({port}) => {
	console.log("Started on port", port);
});

server.on("stopped", () => {
	console.log("Stopped");
});

server.on("clientConnect", (socketId) => {
	console.log("Client connected", socketId);

	server.sendRequest("aServerRequest", {
		"data": true
	}, (responseData) => {
		console.log("Got aServerRequest response", responseData);
	}, socketId);
});

server.on("request", "aClientRequest", ({data, response, clientId}) => {
	console.log("Server received request", data, clientId, response);
	response({
		"hello": true
	});
});

server.start(9999);