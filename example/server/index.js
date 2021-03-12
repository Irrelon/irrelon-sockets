const {Server} = require("../../src/index");

const server = new Server();

server.on("started", ({port}) => {
	console.log("Started on port", port);
});

server.on("stopped", () => {
	console.log("Stopped");
});

server.start(9999);

server.on("clientConnect", (clientId) => {
	console.log("Client connected", clientId);
	server.defineCommand("fooBar", "jsonEncoder");
	server.sendCommand("fooBar", {"itWorked": true}, clientId);

	console.log("charCode is", server.fromDictionaryId(server.toDictionaryId("fooBar")));
});

server.start(9999);