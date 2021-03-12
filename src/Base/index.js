import Emitter from "@irrelon/emitter";

export const DISCONNECTED = 0;
export const CONNECTING = 1;
export const CONNECTED = 2;

class SocketBase {

}

Emitter(SocketBase);

export default SocketBase
