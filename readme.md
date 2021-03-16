# Irrelon Sockets

## Install
```bash
npm i @irrelon/sockets
```

or

```bash
yarn add @irrelon/sockets
```

## Including in Your Project

#### Browser (Client)
Include the library in your project. The library is exported
via webpack to a global name "IrrelonSockets".

```html
<script src="./js/irrelon-sockets/dist/irrelon-sockets.js"></script>
```

The library will then be available in the global scope as
`IrrelonSockets` or `window.IrrelonSockets`.

#### Node.js (Server)
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
client.send({foo: true});
```

### Receiving a Basic Message
> Data received is automatically decoded with JSON.parse.
 
```js
server.on(CMD_MESSAGE, (data, socketId) => {
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
client.sendRequest("myRequest", {foo: true}, (responseData) => {
    // responseData: {gotYa: true}
});
```

### Receiving a Request and Responding
> Data received is automatically decoded with JSON.parse. Data in the response
is automatically encoded with JSON.stringify.

```js
server.on(CMD_REQUEST, "myRequest", (data, response, socketId) => {
    // data: {foo: true}
    // response: a function to send a response
    // socketId: the id of the client that sent the request
    response({gotYa: true});
})
```

## Commands

### Sending a Command
```js
client.sendCommand("myCommandName", {foo: true});
```

### Receiving a Command
```js
server.on(EVT_COMMAND, "myCommandName", (data, socketId) => {
    // data: {foo: true}
});
```

# Encoding and Compression
Under the hood the library keeps track of command strings and encodes them to binary representations rather than sending the entire string. Other compression techniques may also be employed.

# API Reference
Client.send(`data`)
