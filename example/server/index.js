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
	server.sendCommand("fooBar", {"itWorked": true}, clientId);
});

server.start(9999);