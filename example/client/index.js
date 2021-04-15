const {Client, EVT_CONNECTED, EVT_READY, CMD_REQUEST, CMD_MESSAGE} = IrrelonSockets;
const client = new Client();
client.enableLogging();

client.on(EVT_CONNECTED, () => {
	console.log("connected");
});

client.on(EVT_READY, () => {
	console.log("ready");
});

client.request("aClientRequest", {
	"data": true
}, (responseData) => {
	console.log("Got aClientRequest response", responseData);
});

client.onRequest("aServerRequest", (data, response) => {
	response({
		"hello": true
	});
});

client.GET("/test").then((response) => {
	console.log("GET response was", response);
});

client.message({"foo": true});
client.onMessage((data) => {
	console.log("Message", data);
});

client.command("myCommandName", {"foo": true});

client.subscribe("myChannel", (data) => {
	console.log("Channel received data", data);
}).then((result) => {
	console.log("Subscribe result", result);
});

client.connect("ws://localhost:9999");