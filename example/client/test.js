const client = new IrrelonSockets.Client();

client.on("connected", () => {
	console.log("connected");
});

client.on("command", "fooBar", () => {
	const elem = document.createElement("div");
	elem.innerHTML = "Foobar!";

	document.body.appendChild(elem);

	console.log("charCode is", client.fromDictionaryId(client.toDictionaryId("fooBar")));
});

client.connect("ws://localhost:9999");