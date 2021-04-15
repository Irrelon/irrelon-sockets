const assert = require("assert");
const {Client, Server} = require("../src/index");
const {CMD_REQUEST} = require("../src/Base/enums");

const makeConnection = (callback) => {
	let endConnection = () => {};

	const server = new Server();
	const client = new Client();

	//server.enableLogging();
	//client.enableLogging();

	endConnection = () => {
		client.disconnect();
		server.stop();
		endConnection = () => {};
	};

	const timeout = setTimeout(() => {
		endConnection();
		throw new Error("TIMEOUT");
	}, 4000);

	server.log("Starting");
	return server.start().then(({port}) => {
		server.log("Started");
		return client.connect(`ws://localhost:${port}`).then(() => {
			clearTimeout(timeout);

			return new Promise((resolve, reject) => {
				const timeout = setTimeout(() => {
					endConnection();
					reject("TIMEOUT");
				}, 4000);

				const resolveProxy = (...args) => {
					clearTimeout(timeout);
					resolve(...args);
				};

				const rejectProxy = (...args) => {
					clearTimeout(timeout);
					reject(...args);
				};

				callback({
					"end": endConnection,
					"resolve": resolveProxy,
					"reject": rejectProxy,
					server,
					client,
					port
				});
			}).then(() => {
				endConnection();
			});
		});
	}).catch((err) => {
		console.log("Error from internal promise, ending connection", err);
		endConnection();
		throw new Error(err);
	});
};

describe("Client", () => {
	describe("message()", () => {
		it("Can send a message", () => {
			return makeConnection((data) => {
				const {server, client, end, resolve, reject} = data;

				server.onMessage((data) => {
					assert.strictEqual(data, "foo", "Data matches what was sent");
					resolve("SUCCESS");
				});

				client.message("foo");
			});
		});
	});

	describe("request()", () => {
		it("Can send a request and get a response", () => {
			return makeConnection(({server, client, end, resolve, reject}) => {
				server.onRequest("myRequest", (data, response) => {
					assert.strictEqual(data.clientData, true, "Data from client is correct");
					response({"foo": true});
				});

				client.request("myRequest", {"clientData": true}, (data) => {
					assert.strictEqual(data.foo, true, "Data from server is correct");
					resolve("SUCCESS");
				});
			});
		});
	});

	describe("subscribe()", () => {
		it("Can subscribe to a channel and get data when published", () => {
			return makeConnection(({server, client, resolve, reject}) => {
				client.subscribe("myChannel", (data) => {
					assert.strictEqual(data.myData, true, "Data was correct");
					resolve("SUCCESS");
				}).then((result) => {
					assert.ok(typeof result !== "undefined", "Result has data");
					assert.ok(!result.err, "Result has no error");

					server.publish("myChannel", {"myData": true});
				});
			});
		});

		it("Will not receive channel data for a channel it's not subscribed to", () => {
			return makeConnection(({server, client, resolve, reject}) => {
				client.subscribe("myChannel", (data) => {
					reject("SHOULD NOT GET DATA ON THIS CHANNEL");
				}).then((result) => {
					assert.ok(typeof result !== "undefined", "Result has data");
					assert.ok(!result.err, "Result has no error");

					server.publish("myOtherChannel", {"myData": true});

					setTimeout(() => {
						resolve("SUCCESS");
					}, 2000);
				});
			});
		});
	});
});

describe("Server", () => {
	describe("message()", () => {
		it("Can send a message", () => {
			return makeConnection((data) => {
				const {server, client, end, resolve, reject} = data;

				client.onMessage((data) => {
					assert.strictEqual(data, "foo", "Data matches what was sent");
					resolve("SUCCESS");
				});

				server.message("foo");
			});
		});
	});

	describe("request()", () => {
		it("Can send a request and get a response", () => {
			return makeConnection(({server, client, end, resolve, reject}) => {
				assert.ok(client.socketId, "The client has a socket id");
				client.onRequest("myRequest", (data, response) => {
					assert.strictEqual(data.serverData, true, "Data from server is correct");
					response({"foo": true});
				});

				server.request("myRequest", {"serverData": true}, (data) => {
					assert.strictEqual(data.foo, true, "Data from client is correct");
					resolve("SUCCESS");
				}, client.socketId);
			});
		});
	});

	describe("subscribe()", () => {
		it("Can subscribe to a channel and get data when published", () => {
			return makeConnection(({server, client, resolve, reject}) => {
				server.subscribe("myChannel", (data) => {
					assert.strictEqual(data.myData, true, "Data was correct");
					resolve("SUCCESS");
				}, client.socketId).then((result) => {
					assert.ok(typeof result !== "undefined", "Result has data");
					assert.ok(!result.err, "Result has no error");

					client.publish("myChannel", {"myData": true});
				});
			});
		});

		it("Will not receive channel data for a channel it's not subscribed to", () => {
			return makeConnection(({server, client, resolve, reject}) => {
				server.subscribe("myChannel", (data) => {
					reject("SHOULD NOT GET DATA ON THIS CHANNEL");
				}, client.socketId).then((result) => {
					assert.ok(typeof result !== "undefined", "Result has data");
					assert.ok(!result.err, "Result has no error");

					client.publish("myOtherChannel", {"myData": true});

					setTimeout(() => {
						resolve("SUCCESS");
					}, 2000);
				});
			});
		});
	});
});
// TODO - Create "command" unit tests to cover command() and onCommand()