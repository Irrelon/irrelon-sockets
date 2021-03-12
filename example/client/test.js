const client = new IrrelonSockets.Client();

client.on("connected", () => {
	console.log("connected");
});

client.connect("ws://localhost:9999");