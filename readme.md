# Irrelon Sockets
A powerful websockets library that includes features like pub/sub,
request/response and automatic data encoding and compression.

> This library is still in beta and the interface may change as it matures.

## Install
```bash
npm i @irrelon/sockets
```

or

```bash
yarn add @irrelon/sockets
```

## Including in Your Project

#### Client (Browser)
Include the library in your project. The library is exported
via webpack to a global name "IrrelonSockets".

```html
<script src="./js/irrelon-sockets/dist/irrelon-sockets.js"></script>
```

The library will then be available in the global scope as
`IrrelonSockets` or `window.IrrelonSockets`.

#### Server (Node.js)
The library can be required in the normal way:

```js
const {Server} = require("@irrelon/sockets");
```

## Using the Library

#### Client (Browser)
```js
const {Client} = IrrelonSockets;
const client = new Client();

// Specify the host and port to connect to
client.connect("ws://localhost:9999");
```

#### Server (Node.js)
```js
const {Server} = require("../../src/index");
const server = new Server();

// Specify the port to start on
server.start(9999);
```

## Basic Network Messages
### Sending a Basic Message
> Data sent in messages is automatically encoded with JSON.stringify.

```js
client.message({foo: true});
```

### Receiving a Basic Message
> Data received is automatically decoded with JSON.parse.

socketId - The id of the client that sent the message.
 
```js
server.onMessage((data, socketId) => {
    // data: {foo: true}
});
```

## Requests
Requests are a useful tool when you want to send a message to either a client
or the server and then provide a callback that will receive a response to the
request.

This avoids you having to code your own request/response flow that has to handle
the async nature of the websockets protocol.

### Sending a Request
> Data sent in requests is automatically encoded with JSON.stringify.
>
```js
client.request("myRequest", {foo: true}, (responseData) => {
    // responseData: {gotYa: true}
});
```

### Receiving a Request and Responding
> Data received is automatically decoded with JSON.parse. Data in the response
is automatically encoded with JSON.stringify.

```js
server.onRequest("myRequest", (data, response, socketId) => {
    // data: {foo: true}
    // response: a function to send a response
    // socketId: the id of the client that sent the request
    response({gotYa: true});
})
```

## Pub/Sub

### Subscribing to a Channel
```js
client.subscribe("MyChannel", (data) => {
    console.log("Some data was sent on MyChannel");
}).then((result) => {
    if (result.err) console.log("An error occured when trying to subscribe!");
});
```

### Publishing to a Channel
```js
server.publish("MyChannel", {someData: "foo"});
```

## Commands
Commands are different from basic messages in that they also have a name.
You can specify a handler for each command you define.

Commands must be defined on the server before they are used.

### Defining a Command
A command has a name and an encoder type. For now, simply use "jsonEncoder"
for the encoder type. This will automatically stringify/parse any data sent
or received with this command.

```js
server.defineCommand("myCommandName", "jsonEncoder");
```

### Sending a Command
```js
client.command("myCommandName", {foo: true});
```

### Sending a Command to a Specific Client
```js
server.command("myCommandName", {foo: true}, socketId);
```

### Receiving a Command
```js
server.onCommand("myCommandName", (data, socketId) => {
    // data: {foo: true}
});
```

# Encoding and Compression
Under the hood the library keeps track of command strings and encodes
them to binary representations rather than sending the entire string.
Other compression techniques may also be employed.

# API Reference
Client.send(`data`)
