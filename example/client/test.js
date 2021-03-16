const client = new IrrelonSockets.Client();

client.on("connected", () => {
	console.log("connected");
});

client.on("ready", () => {
	console.log("ready");
});

client.sendRequest("aClientRequest", {
	"data": true
}, (responseData) => {
	console.log("Got aClientRequest response", responseData);
});

client.on("request", "aServerRequest", ({data, response, clientId}) => {
	response({
		"hello": true
	});
});

client.connect("ws://localhost:9999");