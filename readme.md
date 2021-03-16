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
const client = new IrrelonSockets.Client();
```

#### Server (Node.js)
```js
const {Server} = require("../../src/index");
const server = new Server();

// Specify the port to start on
server.start(9999);
```

