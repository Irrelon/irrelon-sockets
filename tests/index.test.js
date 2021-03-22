const {Client, Server} = require("../src/index");
const server = new Server();

const startServer = () => {
	server.start(10292);
};

const stopServer = () => {
	server.stop();
};

describe("Client", () => {
	it("Can connect to the server", () => {

	});

	it("Can send a request and get a response", () => {

	});
});

describe("Server", () => {

});