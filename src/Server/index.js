import WebSocket from "isomorphic-ws";
import SocketBase from "../Base"

class SocketServer extends SocketBase {
	constructor (...args) {
		super(...args);
	}

	start (port = 8080) {
		this._socket = new WebSocket.Server({ port: port });
	}

	stop () {
		this._socket.close();
	}
}
