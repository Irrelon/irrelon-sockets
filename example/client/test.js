const {Client, EVT_CONNECTED, EVT_READY, CMD_REQUEST, CMD_MESSAGE} = IrrelonSockets;
const client = new Client();

client.on(EVT_CONNECTED, () => {
	console.log("connected");
});

client.on(EVT_READY, () => {
	console.log("ready");
});

client.sendRequest("aClientRequest", {
	"data": true
}, (responseData) => {
	console.log("Got aClientRequest response", responseData);
});

client.on(CMD_REQUEST, "aServerRequest", ({data, response, clientId}) => {
	response({
		"hello": true
	});
});

client.GET("/test").then((response) => {
	console.log("GET response was", response);
});

client.send({"foo": true});
client.on(CMD_MESSAGE, (data) => {
	console.log("Message", data);
});

client.connect("ws://localhost:9999");