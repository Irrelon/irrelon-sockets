const {Server} = require("../../src/index");

const server = new Server();

server.on("started", ({port}) => {
	console.log("Started on port", port);
});

server.on("stopped", () => {
	console.log("Stopped");
});

server.start(9999);

server.on("clientConnect", (client) => {

});

server.start(9999);