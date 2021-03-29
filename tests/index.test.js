const {Client, Server, EVT_CONNECTED} = require("../src/index");
const server = new Server();

const startServer = () => {
	server.start(10292);
};

const stopServer = () => {
	server.stop();
};

describe("Client", () => {
	it("Can connect to the server", () => {
		return new Promise((resolve, reject) => {
			startServer();
			const client = new Client();
			const timeout = setTimeout(() => {
				reject("TIMEOUT");
			}, 2000);

			client.on(EVT_CONNECTED, () => {
				clearTimeout(timeout);
				resolve("SUCCESS");
				client.disconnect();
				stopServer();
			});
			client.connect("ws://localhost:10292");
		});
	});

	it("Can send a request and get a response", () => {

	});
});

describe("Server", () => {

});