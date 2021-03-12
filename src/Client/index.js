import WebSocket from "isomorphic-ws";
import SocketBase from "../Base"

class SocketClient extends SocketBase {
	constructor (...args) {
		super(...args);
	}

	connect (host) {
		this._socket = new WebSocket(host);
	}
}

export default SocketClient
