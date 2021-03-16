const client = new IrrelonSockets.Client();

client.sendCommand("ping");

client.on("connected", () => {
	console.log("connected");
});

client.on("ready", () => {
	console.log("ready");
});

client.on("command", (...args) => {
	console.log("COMMAND", args);
	const elem = document.createElement("div");
	elem.innerHTML = "Foobar!";

	document.body.appendChild(elem);

	console.log("charCode is", client.fromDictionaryId(client.toDictionaryId("fooBar")));
});

client.connect("ws://localhost:9999");