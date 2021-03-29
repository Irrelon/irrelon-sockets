var IrrelonSockets =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var Client = __webpack_require__(2);

	var Server = __webpack_require__(27);

	var _require = __webpack_require__(25),
	    STA_DISCONNECTED = _require.STA_DISCONNECTED,
	    STA_CONNECTING = _require.STA_CONNECTING,
	    STA_CONNECTED = _require.STA_CONNECTED,
	    STA_READY = _require.STA_READY,
	    STA_STARTED = _require.STA_STARTED,
	    STA_STOPPED = _require.STA_STOPPED,
	    ENV_CLIENT = _require.ENV_CLIENT,
	    ENV_SERVER = _require.ENV_SERVER,
	    CMD_COMMAND_MAP = _require.CMD_COMMAND_MAP,
	    CMD_DEFINE_COMMAND = _require.CMD_DEFINE_COMMAND,
	    CMD_MESSAGE = _require.CMD_MESSAGE,
	    CMD_PING = _require.CMD_PING,
	    CMD_READY = _require.CMD_READY,
	    CMD_REQUEST = _require.CMD_REQUEST,
	    CMD_RESPONSE = _require.CMD_RESPONSE,
	    EVT_COMMAND = _require.EVT_COMMAND,
	    EVT_CONNECTED = _require.EVT_CONNECTED,
	    EVT_CONNECTING = _require.EVT_CONNECTING,
	    EVT_DISCONNECTED = _require.EVT_DISCONNECTED,
	    EVT_MESSAGE = _require.EVT_MESSAGE,
	    EVT_READY = _require.EVT_READY,
	    EVT_RECONNECTING = _require.EVT_RECONNECTING,
	    EVT_STATE_CHANGE = _require.EVT_STATE_CHANGE,
	    EVT_ERROR = _require.EVT_ERROR,
	    EVT_STARTED = _require.EVT_STARTED,
	    EVT_STOPPED = _require.EVT_STOPPED,
	    EVT_CLIENT_CONNECTED = _require.EVT_CLIENT_CONNECTED,
	    EVT_CLIENT_DISCONNECTED = _require.EVT_CLIENT_DISCONNECTED;

	module.exports = {
	  // Classes
	  Client: Client,
	  Server: Server,
	  // States
	  STA_DISCONNECTED: STA_DISCONNECTED,
	  STA_CONNECTING: STA_CONNECTING,
	  STA_CONNECTED: STA_CONNECTED,
	  STA_READY: STA_READY,
	  STA_STARTED: STA_STARTED,
	  STA_STOPPED: STA_STOPPED,
	  // Environments
	  ENV_CLIENT: ENV_CLIENT,
	  ENV_SERVER: ENV_SERVER,
	  // Commands
	  CMD_COMMAND_MAP: CMD_COMMAND_MAP,
	  CMD_DEFINE_COMMAND: CMD_DEFINE_COMMAND,
	  CMD_MESSAGE: CMD_MESSAGE,
	  CMD_PING: CMD_PING,
	  CMD_READY: CMD_READY,
	  CMD_REQUEST: CMD_REQUEST,
	  CMD_RESPONSE: CMD_RESPONSE,
	  // Events
	  EVT_COMMAND: EVT_COMMAND,
	  EVT_CONNECTED: EVT_CONNECTED,
	  EVT_CONNECTING: EVT_CONNECTING,
	  EVT_DISCONNECTED: EVT_DISCONNECTED,
	  EVT_MESSAGE: EVT_MESSAGE,
	  EVT_READY: EVT_READY,
	  EVT_RECONNECTING: EVT_RECONNECTING,
	  EVT_STATE_CHANGE: EVT_STATE_CHANGE,
	  EVT_ERROR: EVT_ERROR,
	  EVT_STARTED: EVT_STARTED,
	  EVT_STOPPED: EVT_STOPPED,
	  EVT_CLIENT_CONNECTED: EVT_CLIENT_CONNECTED,
	  EVT_CLIENT_DISCONNECTED: EVT_CLIENT_DISCONNECTED
	};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var _interopRequireDefault = __webpack_require__(3);

	var _classCallCheck2 = _interopRequireDefault(__webpack_require__(4));

	var _createClass2 = _interopRequireDefault(__webpack_require__(5));

	var _assertThisInitialized2 = _interopRequireDefault(__webpack_require__(6));

	var _inherits2 = _interopRequireDefault(__webpack_require__(7));

	var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(9));

	var _get2 = _interopRequireDefault(__webpack_require__(11));

	var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(13));

	var _defineProperty2 = _interopRequireDefault(__webpack_require__(14));

	function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

	function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

	var WebSocket = __webpack_require__(15);

	var SocketBase = __webpack_require__(16);

	var _require = __webpack_require__(26),
	    hexId = _require.hexId;

	var _require2 = __webpack_require__(25),
	    STA_DISCONNECTED = _require2.STA_DISCONNECTED,
	    STA_CONNECTING = _require2.STA_CONNECTING,
	    STA_CONNECTED = _require2.STA_CONNECTED,
	    STA_READY = _require2.STA_READY,
	    STA_STARTED = _require2.STA_STARTED,
	    STA_STOPPED = _require2.STA_STOPPED,
	    ENV_CLIENT = _require2.ENV_CLIENT,
	    ENV_SERVER = _require2.ENV_SERVER,
	    CMD_COMMAND_MAP = _require2.CMD_COMMAND_MAP,
	    CMD_DEFINE_COMMAND = _require2.CMD_DEFINE_COMMAND,
	    CMD_MESSAGE = _require2.CMD_MESSAGE,
	    CMD_PING = _require2.CMD_PING,
	    CMD_READY = _require2.CMD_READY,
	    CMD_REQUEST = _require2.CMD_REQUEST,
	    CMD_RESPONSE = _require2.CMD_RESPONSE,
	    EVT_COMMAND = _require2.EVT_COMMAND,
	    EVT_CONNECTED = _require2.EVT_CONNECTED,
	    EVT_CONNECTING = _require2.EVT_CONNECTING,
	    EVT_DISCONNECTED = _require2.EVT_DISCONNECTED,
	    EVT_MESSAGE = _require2.EVT_MESSAGE,
	    EVT_READY = _require2.EVT_READY,
	    EVT_RECONNECTING = _require2.EVT_RECONNECTING,
	    EVT_STATE_CHANGE = _require2.EVT_STATE_CHANGE,
	    EVT_ERROR = _require2.EVT_ERROR,
	    EVT_STARTED = _require2.EVT_STARTED,
	    EVT_STOPPED = _require2.EVT_STOPPED,
	    EVT_CLIENT_CONNECTED = _require2.EVT_CLIENT_CONNECTED,
	    EVT_CLIENT_DISCONNECTED = _require2.EVT_CLIENT_DISCONNECTED;

	var SocketClient = /*#__PURE__*/function (_SocketBase) {
	  (0, _inherits2["default"])(SocketClient, _SocketBase);

	  var _super = _createSuper(SocketClient);

	  function SocketClient() {
	    var _thisSuper, _this;

	    var clientName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "Client";
	    (0, _classCallCheck2["default"])(this, SocketClient);
	    _this = _super.call(this, ENV_CLIENT, clientName); // Define the default command listeners

	    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_backoff", 1000);
	    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_buffer", []);
	    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_autoReconnect", true);
	    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onConnected", function () {
	      _this._backoff = 1000;

	      _this.state(STA_CONNECTED);

	      _this.emit(EVT_CONNECTED);
	    });
	    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onUnexpectedDisconnect", function () {
	      _this.state(STA_DISCONNECTED);

	      _this.log("Disconnected from server");

	      _this.emit(EVT_DISCONNECTED);

	      if (!_this._autoReconnect) return;
	      setTimeout(function () {
	        _this.reconnect();
	      }, _this._backoff);
	    });
	    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onSocketError", function (err) {
	      console.error("Error in connection", err);

	      _this.emit(EVT_ERROR, err);
	    });
	    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onMessageFromServer", function (rawMessage) {
	      (0, _get2["default"])((_thisSuper = (0, _assertThisInitialized2["default"])(_this), (0, _getPrototypeOf2["default"])(SocketClient.prototype)), "_onMessage", _thisSuper).call(_thisSuper, rawMessage.data);
	    });
	    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onCommandMap", function (data) {
	      _this.log("_onCommandMap", data);

	      var commands = [];
	      data.forEach(function (item) {
	        commands.push(item[0]);
	      });

	      _this.commandMap(commands);

	      data.forEach(function (item) {
	        _this.setCommandEncoding(item[0], item[1]);
	      });
	    });
	    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onDefineCommand", function (data) {
	      _this.log("_onDefineCommand", data);

	      _this.defineCommand(data[0], data[1]);
	    });
	    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onReadyCommand", function (data) {
	      _this.log("_onReadyCommand", data);

	      _this.state(STA_READY);

	      _this.emit(CMD_READY);

	      _this.processBuffer();
	    });

	    _this.on(EVT_COMMAND, CMD_COMMAND_MAP, _this._onCommandMap);

	    _this.on(EVT_COMMAND, CMD_DEFINE_COMMAND, _this._onDefineCommand);

	    _this.on(EVT_COMMAND, CMD_READY, _this._onReadyCommand);

	    return _this;
	  }

	  (0, _createClass2["default"])(SocketClient, [{
	    key: "connect",
	    value: function connect(host) {
	      // Check if we are already connected
	      if (this.state() === STA_CONNECTED) {
	        return;
	      }

	      this.state(STA_CONNECTING);
	      this._host = host;
	      this._socket = new WebSocket(host);
	      this._socket.onopen = this._onConnected;
	      this._socket.onclose = this._onUnexpectedDisconnect;
	      this._socket.onmessage = this._onMessageFromServer;
	      this._socket.onerror = this._onSocketError;
	    }
	  }, {
	    key: "reconnect",
	    value: function reconnect() {
	      this._backoff = this._backoff * 2;

	      if (this._backoff > 100000) {
	        // This is essentially a failure
	        console.warn("Continuous failure to connect to server!");
	      }

	      this.emit(EVT_RECONNECTING, this._backoff);
	      this.connect(this._host);
	    }
	  }, {
	    key: "disconnect",
	    value: function disconnect() {
	      this.state(STA_DISCONNECTED);

	      try {
	        this._socket.terminate();

	        delete this._socket;
	      } catch (err) {
	        console.error("Error terminating connection", err);
	      }
	    }
	  }, {
	    key: "sendCommand",
	    value: function sendCommand(cmd, data) {
	      if (this.state() !== STA_READY) {
	        // Buffer the message and send when connected
	        this._buffer.push({
	          "type": "sendCommand",
	          cmd: cmd,
	          data: data
	        });

	        return;
	      }

	      return (0, _get2["default"])((0, _getPrototypeOf2["default"])(SocketClient.prototype), "sendCommand", this).call(this, cmd, data, this._socket);
	    }
	  }, {
	    key: "processBuffer",
	    value: function processBuffer() {
	      var _this2 = this;

	      this._buffer.forEach(function (bufferItem) {
	        switch (bufferItem.type) {
	          case "sendCommand":
	            _this2.sendCommand(bufferItem.cmd, bufferItem.data);

	            break;

	          case "sendRequest":
	            _this2.sendRequest(bufferItem.requestName, bufferItem.data, bufferItem.callback);

	            break;

	          default:
	            break;
	        }
	      });

	      this._buffer = [];
	    }
	  }, {
	    key: "sendRequest",
	    value: function sendRequest(requestName, data, callback) {
	      if (this.state() !== STA_READY) {
	        // Buffer the message and send when connected
	        this._buffer.push({
	          "type": "sendRequest",
	          requestName: requestName,
	          data: data,
	          callback: callback
	        });

	        return;
	      }

	      var requestId = hexId();
	      this._responseCallbackByRequestId[requestId] = callback;
	      (0, _get2["default"])((0, _getPrototypeOf2["default"])(SocketClient.prototype), "sendRequest", this).call(this, requestName, requestId, data, this._socket);
	    }
	  }, {
	    key: "sendResponse",
	    value: function sendResponse(requestId, responseData) {
	      this.sendCommand(CMD_RESPONSE, {
	        "id": requestId,
	        "data": responseData
	      });
	    }
	  }, {
	    key: "GET",
	    value: function GET(url, data) {
	      var _this3 = this;

	      return new Promise(function (resolve, reject) {
	        _this3.sendRequest("GET", {
	          url: url,
	          "body": data
	        }, function (responseData) {
	          resolve(responseData);
	        });
	      });
	    }
	  }, {
	    key: "POST",
	    value: function POST(url, data) {
	      var _this4 = this;

	      return new Promise(function (resolve, reject) {
	        _this4.sendRequest("POST", {
	          url: url,
	          "body": data
	        }, function (responseData) {
	          resolve(responseData);
	        });
	      });
	    }
	  }, {
	    key: "PUT",
	    value: function PUT(url, data) {
	      var _this5 = this;

	      return new Promise(function (resolve, reject) {
	        _this5.sendRequest("PUT", {
	          url: url,
	          "body": data
	        }, function (responseData) {
	          resolve(responseData);
	        });
	      });
	    }
	  }, {
	    key: "DELETE",
	    value: function DELETE(url, data) {
	      var _this6 = this;

	      return new Promise(function (resolve, reject) {
	        _this6.sendRequest("DELETE", {
	          url: url,
	          "body": data
	        }, function (responseData) {
	          resolve(responseData);
	        });
	      });
	    }
	  }, {
	    key: "send",
	    value: function send(data) {
	      this.sendCommand(CMD_MESSAGE, data);
	    }
	  }, {
	    key: "autoReconnect",
	    value: function autoReconnect(val) {
	      if (val === undefined) return this._autoReconnect;
	      this._autoReconnect = val;
	      return this;
	    }
	  }, {
	    key: "_onRequest",
	    value: function _onRequest(requestName, requestId, data, response) {
	      (0, _get2["default"])((0, _getPrototypeOf2["default"])(SocketClient.prototype), "_onRequest", this).call(this, requestName, requestId, data, response, "");
	    }
	  }, {
	    key: "_onResponse",
	    value: function _onResponse(requestId, data) {
	      var responseCallback = this._responseCallbackByRequestId[requestId];
	      responseCallback(data);
	      delete this._responseCallbackByRequestId[requestId];
	    }
	  }]);
	  return SocketClient;
	}(SocketBase);

	module.exports = SocketClient;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : {
	    "default": obj
	  };
	}

	module.exports = _interopRequireDefault;
	module.exports["default"] = module.exports, module.exports.__esModule = true;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	}

	module.exports = _classCallCheck;
	module.exports["default"] = module.exports, module.exports.__esModule = true;

/***/ }),
/* 5 */
/***/ (function(module, exports) {

	function _defineProperties(target, props) {
	  for (var i = 0; i < props.length; i++) {
	    var descriptor = props[i];
	    descriptor.enumerable = descriptor.enumerable || false;
	    descriptor.configurable = true;
	    if ("value" in descriptor) descriptor.writable = true;
	    Object.defineProperty(target, descriptor.key, descriptor);
	  }
	}

	function _createClass(Constructor, protoProps, staticProps) {
	  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
	  if (staticProps) _defineProperties(Constructor, staticProps);
	  return Constructor;
	}

	module.exports = _createClass;
	module.exports["default"] = module.exports, module.exports.__esModule = true;

/***/ }),
/* 6 */
/***/ (function(module, exports) {

	function _assertThisInitialized(self) {
	  if (self === void 0) {
	    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  }

	  return self;
	}

	module.exports = _assertThisInitialized;
	module.exports["default"] = module.exports, module.exports.__esModule = true;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	var setPrototypeOf = __webpack_require__(8);

	function _inherits(subClass, superClass) {
	  if (typeof superClass !== "function" && superClass !== null) {
	    throw new TypeError("Super expression must either be null or a function");
	  }

	  subClass.prototype = Object.create(superClass && superClass.prototype, {
	    constructor: {
	      value: subClass,
	      writable: true,
	      configurable: true
	    }
	  });
	  if (superClass) setPrototypeOf(subClass, superClass);
	}

	module.exports = _inherits;
	module.exports["default"] = module.exports, module.exports.__esModule = true;

/***/ }),
/* 8 */
/***/ (function(module, exports) {

	function _setPrototypeOf(o, p) {
	  module.exports = _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
	    o.__proto__ = p;
	    return o;
	  };

	  module.exports["default"] = module.exports, module.exports.__esModule = true;
	  return _setPrototypeOf(o, p);
	}

	module.exports = _setPrototypeOf;
	module.exports["default"] = module.exports, module.exports.__esModule = true;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

	var _typeof = __webpack_require__(10)["default"];

	var assertThisInitialized = __webpack_require__(6);

	function _possibleConstructorReturn(self, call) {
	  if (call && (_typeof(call) === "object" || typeof call === "function")) {
	    return call;
	  }

	  return assertThisInitialized(self);
	}

	module.exports = _possibleConstructorReturn;
	module.exports["default"] = module.exports, module.exports.__esModule = true;

/***/ }),
/* 10 */
/***/ (function(module, exports) {

	function _typeof(obj) {
	  "@babel/helpers - typeof";

	  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
	    module.exports = _typeof = function _typeof(obj) {
	      return typeof obj;
	    };

	    module.exports["default"] = module.exports, module.exports.__esModule = true;
	  } else {
	    module.exports = _typeof = function _typeof(obj) {
	      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
	    };

	    module.exports["default"] = module.exports, module.exports.__esModule = true;
	  }

	  return _typeof(obj);
	}

	module.exports = _typeof;
	module.exports["default"] = module.exports, module.exports.__esModule = true;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

	var superPropBase = __webpack_require__(12);

	function _get(target, property, receiver) {
	  if (typeof Reflect !== "undefined" && Reflect.get) {
	    module.exports = _get = Reflect.get;
	    module.exports["default"] = module.exports, module.exports.__esModule = true;
	  } else {
	    module.exports = _get = function _get(target, property, receiver) {
	      var base = superPropBase(target, property);
	      if (!base) return;
	      var desc = Object.getOwnPropertyDescriptor(base, property);

	      if (desc.get) {
	        return desc.get.call(receiver);
	      }

	      return desc.value;
	    };

	    module.exports["default"] = module.exports, module.exports.__esModule = true;
	  }

	  return _get(target, property, receiver || target);
	}

	module.exports = _get;
	module.exports["default"] = module.exports, module.exports.__esModule = true;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

	var getPrototypeOf = __webpack_require__(13);

	function _superPropBase(object, property) {
	  while (!Object.prototype.hasOwnProperty.call(object, property)) {
	    object = getPrototypeOf(object);
	    if (object === null) break;
	  }

	  return object;
	}

	module.exports = _superPropBase;
	module.exports["default"] = module.exports, module.exports.__esModule = true;

/***/ }),
/* 13 */
/***/ (function(module, exports) {

	function _getPrototypeOf(o) {
	  module.exports = _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
	    return o.__proto__ || Object.getPrototypeOf(o);
	  };
	  module.exports["default"] = module.exports, module.exports.__esModule = true;
	  return _getPrototypeOf(o);
	}

	module.exports = _getPrototypeOf;
	module.exports["default"] = module.exports, module.exports.__esModule = true;

/***/ }),
/* 14 */
/***/ (function(module, exports) {

	function _defineProperty(obj, key, value) {
	  if (key in obj) {
	    Object.defineProperty(obj, key, {
	      value: value,
	      enumerable: true,
	      configurable: true,
	      writable: true
	    });
	  } else {
	    obj[key] = value;
	  }

	  return obj;
	}

	module.exports = _defineProperty;
	module.exports["default"] = module.exports, module.exports.__esModule = true;

/***/ }),
/* 15 */
/***/ (function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {// https://github.com/maxogden/websocket-stream/blob/48dc3ddf943e5ada668c31ccd94e9186f02fafbd/ws-fallback.js

	var ws = null

	if (typeof WebSocket !== 'undefined') {
	  ws = WebSocket
	} else if (typeof MozWebSocket !== 'undefined') {
	  ws = MozWebSocket
	} else if (typeof global !== 'undefined') {
	  ws = global.WebSocket || global.MozWebSocket
	} else if (typeof window !== 'undefined') {
	  ws = window.WebSocket || window.MozWebSocket
	} else if (typeof self !== 'undefined') {
	  ws = self.WebSocket || self.MozWebSocket
	}

	module.exports = ws

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var _interopRequireDefault = __webpack_require__(3);

	var _slicedToArray2 = _interopRequireDefault(__webpack_require__(17));

	var _classCallCheck2 = _interopRequireDefault(__webpack_require__(4));

	var _createClass2 = _interopRequireDefault(__webpack_require__(5));

	var _assertThisInitialized2 = _interopRequireDefault(__webpack_require__(6));

	var _inherits2 = _interopRequireDefault(__webpack_require__(7));

	var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(9));

	var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(13));

	var _defineProperty2 = _interopRequireDefault(__webpack_require__(14));

	function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

	function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

	var _require = __webpack_require__(23),
	    Emitter = _require.Emitter;

	var encoders = __webpack_require__(24);

	var _require2 = __webpack_require__(25),
	    STA_DISCONNECTED = _require2.STA_DISCONNECTED,
	    STA_CONNECTING = _require2.STA_CONNECTING,
	    STA_CONNECTED = _require2.STA_CONNECTED,
	    STA_READY = _require2.STA_READY,
	    STA_STARTED = _require2.STA_STARTED,
	    STA_STOPPED = _require2.STA_STOPPED,
	    ENV_CLIENT = _require2.ENV_CLIENT,
	    ENV_SERVER = _require2.ENV_SERVER,
	    CMD_COMMAND_MAP = _require2.CMD_COMMAND_MAP,
	    CMD_DEFINE_COMMAND = _require2.CMD_DEFINE_COMMAND,
	    CMD_MESSAGE = _require2.CMD_MESSAGE,
	    CMD_PING = _require2.CMD_PING,
	    CMD_READY = _require2.CMD_READY,
	    CMD_REQUEST = _require2.CMD_REQUEST,
	    CMD_RESPONSE = _require2.CMD_RESPONSE,
	    EVT_COMMAND = _require2.EVT_COMMAND,
	    EVT_CONNECTED = _require2.EVT_CONNECTED,
	    EVT_CONNECTING = _require2.EVT_CONNECTING,
	    EVT_DISCONNECTED = _require2.EVT_DISCONNECTED,
	    EVT_MESSAGE = _require2.EVT_MESSAGE,
	    EVT_READY = _require2.EVT_READY,
	    EVT_RECONNECTING = _require2.EVT_RECONNECTING,
	    EVT_STATE_CHANGE = _require2.EVT_STATE_CHANGE,
	    EVT_ERROR = _require2.EVT_ERROR,
	    EVT_STARTED = _require2.EVT_STARTED,
	    EVT_STOPPED = _require2.EVT_STOPPED,
	    EVT_CLIENT_CONNECTED = _require2.EVT_CLIENT_CONNECTED,
	    EVT_CLIENT_DISCONNECTED = _require2.EVT_CLIENT_DISCONNECTED;

	var SocketBase = /*#__PURE__*/function (_Emitter) {
	  (0, _inherits2["default"])(SocketBase, _Emitter);

	  var _super = _createSuper(SocketBase);

	  /**
	   * @param {string} env The environment for the SocketBase instance.
	   * Either ENV_CLIENT or ENV_SERVER.
	   */
	  function SocketBase(env, name) {
	    var _this;

	    (0, _classCallCheck2["default"])(this, SocketBase);
	    _this = _super.call(this);
	    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_socketById", {});
	    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_requestById", {});
	    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_responseCallbackByRequestId", {});
	    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_dictionary", []);
	    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_commandMap", []);
	    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_commandEncoding", {
	      "*": encoders.jsonEncoder
	    });
	    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_state", STA_DISCONNECTED);
	    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_logging", false);
	    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "state", function (newState) {
	      if (newState === undefined) return _this._state;
	      _this._state = newState;

	      _this.emit(EVT_STATE_CHANGE, newState);

	      return (0, _assertThisInitialized2["default"])(_this);
	    });
	    _this._name = name;
	    _this._env = env;

	    _this.defineCommand(CMD_PING, "noDataEncoder");

	    _this.defineCommand(CMD_COMMAND_MAP, "jsonEncoder");

	    _this.defineCommand(CMD_DEFINE_COMMAND, "stringArrayEncoder");

	    _this.defineCommand(CMD_READY, "noDataEncoder");

	    _this.defineCommand(CMD_REQUEST, "jsonEncoder");

	    _this.defineCommand(CMD_RESPONSE, "jsonEncoder");

	    _this.defineCommand(CMD_MESSAGE, "noDataEncoder");

	    _this.generateDictionary();

	    return _this;
	  }

	  (0, _createClass2["default"])(SocketBase, [{
	    key: "generateDictionary",
	    value: function generateDictionary() {
	      var _this2 = this;

	      this._dictionary = [];

	      this._commandMap.forEach(function (command) {
	        _this2._dictionary.push(command);
	      });
	    }
	  }, {
	    key: "toDictionaryId",
	    value: function toDictionaryId(word) {
	      var index = this._dictionary.indexOf(word);

	      if (index === -1) {
	        console.error("Dictionary does not contain term \"".concat(word, "\""));
	      }

	      return String.fromCharCode(index);
	    }
	  }, {
	    key: "fromDictionaryId",
	    value: function fromDictionaryId(id) {
	      var index = id.charCodeAt(0);
	      return this._dictionary[index];
	    }
	    /**
	     * Gets or sets the current instance state.
	     * @param {string} [newState] Optional. If provided, sets the current
	     * instance state to the passed state value. If not provided the function
	     * operates as a getter and the current state is returned instead.
	     * @returns {SocketBase|String} State or self.
	     */

	  }, {
	    key: "enableLogging",
	    value:
	    /**
	     * Enables logging output to the console.
	     * @returns {undefined}
	     */
	    function enableLogging() {
	      this._logging = true;
	    }
	    /**
	     * Disables logging output to the console.
	     * @returns {undefined}
	     */

	  }, {
	    key: "disableLogging",
	    value: function disableLogging() {
	      this._logging = false;
	    }
	  }, {
	    key: "log",
	    value: function log() {
	      var _console$log;

	      if (this._logging !== true) return;

	      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
	        args[_key] = arguments[_key];
	      }

	      args.splice(0, 0, this._name);

	      (_console$log = console.log).call.apply(_console$log, [console].concat(args));
	    }
	    /**
	     * Gets or sets the command map.
	     * @param {Array<String>} [commandMap] Optional. If passed, sets
	     * the passed array as the new command map.
	     * @returns {Array<String>|SocketBase} Either the existing map
	     * or self.
	     */

	  }, {
	    key: "commandMap",
	    value: function commandMap(_commandMap) {
	      if (_commandMap === undefined) return this._commandMap;
	      this._commandMap = _commandMap;
	      this.generateDictionary();
	      return this;
	    }
	    /**
	     * Defines a command and the encoder to use.
	     * @param {String} command The name of the command to define.
	     * @param {String|Object} encoderNameOrObject Either the name
	     * of the encoder or an object containing `encode()` and
	     * `decode()` functions.
	     * @returns {Number} The id of the command.
	     */

	  }, {
	    key: "defineCommand",
	    value: function defineCommand(command) {
	      var encoderNameOrObject = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "jsonEncoder";
	      var encoderName;
	      var encoder;
	      var existingCommandId = this.idByCommand(command);
	      if (existingCommandId > -1) return existingCommandId;

	      if (typeof encoderNameOrObject === "string") {
	        // Map to an encoder object
	        encoderName = encoderNameOrObject;
	        encoder = encoders[encoderNameOrObject];
	      }

	      this.log("New command defined", command, encoderName); // Add the new command

	      this._dictionary.push(command);

	      this._commandMap.push(command);

	      this.setCommandEncoding(command, encoder);
	      this.log("Defined new command \"".concat(command, "\""));
	      if (this._env === ENV_CLIENT) return this._commandMap.length - 1; // Update any connected clients with the new command

	      this.broadcastCommand(CMD_DEFINE_COMMAND, [command, encoder.name]);
	      return this._commandMap.length - 1;
	    }
	  }, {
	    key: "setCommandEncoding",
	    value: function setCommandEncoding() {
	      var command = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
	      var encoderNameOrObj = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "jsonEncoder";
	      if (!command || !encoderNameOrObj) return;
	      this._commandEncoding[command] = this.resolveEncoder(encoderNameOrObj);
	    }
	    /**
	     * Gets an encoder name by it's object.
	     * @param {Object} obj The encoder object.
	     * @returns {String} The name of the encoder or a blank
	     * string if not found.
	     */

	  }, {
	    key: "encoderNameByObject",
	    value: function encoderNameByObject(obj) {
	      return Object.entries(encoders).reduce(function (name, _ref) {
	        var _ref2 = (0, _slicedToArray2["default"])(_ref, 2),
	            key = _ref2[0],
	            encoder = _ref2[1];

	        return encoder === obj ? key : "";
	      }, "");
	    }
	  }, {
	    key: "resolveEncoder",
	    value: function resolveEncoder(encoder) {
	      if (typeof encoder === "string") {
	        return encoders[encoder];
	      }

	      return encoder;
	    }
	    /**
	     * Returns the command name from the passed command id.
	     * @param {Number} id The id of the commmand to find.
	     * @returns {String} The name of the command.
	     */

	  }, {
	    key: "commandById",
	    value: function commandById(id) {
	      return this._commandMap[id];
	    }
	  }, {
	    key: "idByCommand",
	    value: function idByCommand(command) {
	      return this._commandMap.indexOf(command);
	    }
	    /**
	     * Sends a command to the specified socket.
	     * @param {String} cmd The command to send.
	     * @param {*} data The data to send.
	     * @param {*} socket The socket to send to.
	     * @returns {undefined} Nothing.
	     */

	  }, {
	    key: "sendCommand",
	    value: function sendCommand(cmd, data, socket) {
	      if (!socket) return this.log("sendCommand() no socket provided!", cmd, data, socket);
	      var commandId = this.defineCommand(cmd);
	      var message = [commandId, data];
	      this.log("sendCommand", message);
	      socket.send(this._encode(cmd, message));
	    }
	  }, {
	    key: "sendRequest",
	    value: function sendRequest(requestName, requestId, data, socket) {
	      this.log("sendRequest()", requestName, requestId, data, socket);
	      if (!socket) return this.log("request() no socket provided!", requestName, requestId, data, socket);
	      var commandId = this.defineCommand(CMD_REQUEST);
	      var message = [commandId, {
	        "id": requestId,
	        requestName: requestName,
	        data: data
	      }];
	      this.log("request message payload", message);
	      socket.send(this._encode(CMD_REQUEST, message));
	    }
	  }, {
	    key: "_onMessage",
	    value: function _onMessage(rawMessage, socketId) {
	      var _this3 = this;

	      this.log("Raw message incoming", rawMessage, "socketId", socketId);

	      var message = this._decode(rawMessage);

	      var commandId = message[0];
	      var data = message[1];
	      var command = this.commandById(commandId);

	      if (!command) {
	        console.error("Unknown commandId \"".concat(commandId, "\" received with data"), data);
	        return {
	          message: message,
	          commandId: commandId,
	          command: command,
	          data: data
	        };
	      }

	      this.log("Incoming command \"".concat(command, "\" with data"), data);

	      if (command === CMD_REQUEST) {
	        if (data.id) {
	          this._onRequest(data.requestName, data.id, data.data, function (responseData) {
	            _this3.sendResponse(data.id, responseData);
	          }, socketId);
	        } else {
	          this.log("Request received without a request id!");
	        }
	      } else if (command === CMD_RESPONSE) {
	        if (data.id) {
	          this._onResponse(data.id, data.data);
	        } else {
	          this.log("Response received without a request id!");
	        }
	      } else if (command === CMD_MESSAGE) {
	        this.emit(EVT_MESSAGE, data, socketId);
	      } else {
	        this.emitId(EVT_COMMAND, command, data, socketId);
	      }

	      return {
	        message: message,
	        commandId: commandId,
	        command: command,
	        data: data
	      };
	    }
	  }, {
	    key: "_onRequest",
	    value: function _onRequest(requestName, requestId, data, response) {
	      var socketId = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : "";
	      this.emitId(CMD_REQUEST, requestName, data, response, socketId);
	    }
	  }, {
	    key: "_encode",
	    value: function _encode(command, _ref3) {
	      var _ref4 = (0, _slicedToArray2["default"])(_ref3, 2),
	          commandId = _ref4[0],
	          data = _ref4[1];

	      var encoding = this._commandEncoding[command] || this._commandEncoding["*"];
	      if (!this._commandEncoding[command]) console.warn("No specific encoder for command \"".concat(command, "\" (").concat(commandId, ")"));
	      if (!encoding) throw new Error("No command encoding for \"".concat(command, "\" (").concat(commandId, ") and no default encoder specified under the \"*\" command name!"));
	      return "".concat(commandId, "|").concat(encoding.encode(data));
	    }
	  }, {
	    key: "_decode",
	    value: function _decode(data) {
	      var parts = data.split("|");
	      var command = this.commandById(parts[0]);
	      var encoding = this._commandEncoding[command] || this._commandEncoding["*"];
	      if (!this._commandEncoding[command]) console.warn("No specific decoder for command \"".concat(command, "\" (").concat(parts[0], ")"));
	      if (!encoding) throw new Error("No command decoding for \"".concat(command, "\" (").concat(parts[0], ") and no default decoder specified under the \"*\" command name!"));
	      return [parts[0], encoding.decode(parts[1])];
	    }
	  }]);
	  return SocketBase;
	}(Emitter);

	module.exports = SocketBase;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

	var arrayWithHoles = __webpack_require__(18);

	var iterableToArrayLimit = __webpack_require__(19);

	var unsupportedIterableToArray = __webpack_require__(20);

	var nonIterableRest = __webpack_require__(22);

	function _slicedToArray(arr, i) {
	  return arrayWithHoles(arr) || iterableToArrayLimit(arr, i) || unsupportedIterableToArray(arr, i) || nonIterableRest();
	}

	module.exports = _slicedToArray;
	module.exports["default"] = module.exports, module.exports.__esModule = true;

/***/ }),
/* 18 */
/***/ (function(module, exports) {

	function _arrayWithHoles(arr) {
	  if (Array.isArray(arr)) return arr;
	}

	module.exports = _arrayWithHoles;
	module.exports["default"] = module.exports, module.exports.__esModule = true;

/***/ }),
/* 19 */
/***/ (function(module, exports) {

	function _iterableToArrayLimit(arr, i) {
	  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
	  var _arr = [];
	  var _n = true;
	  var _d = false;
	  var _e = undefined;

	  try {
	    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
	      _arr.push(_s.value);

	      if (i && _arr.length === i) break;
	    }
	  } catch (err) {
	    _d = true;
	    _e = err;
	  } finally {
	    try {
	      if (!_n && _i["return"] != null) _i["return"]();
	    } finally {
	      if (_d) throw _e;
	    }
	  }

	  return _arr;
	}

	module.exports = _iterableToArrayLimit;
	module.exports["default"] = module.exports, module.exports.__esModule = true;

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

	var arrayLikeToArray = __webpack_require__(21);

	function _unsupportedIterableToArray(o, minLen) {
	  if (!o) return;
	  if (typeof o === "string") return arrayLikeToArray(o, minLen);
	  var n = Object.prototype.toString.call(o).slice(8, -1);
	  if (n === "Object" && o.constructor) n = o.constructor.name;
	  if (n === "Map" || n === "Set") return Array.from(o);
	  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return arrayLikeToArray(o, minLen);
	}

	module.exports = _unsupportedIterableToArray;
	module.exports["default"] = module.exports, module.exports.__esModule = true;

/***/ }),
/* 21 */
/***/ (function(module, exports) {

	function _arrayLikeToArray(arr, len) {
	  if (len == null || len > arr.length) len = arr.length;

	  for (var i = 0, arr2 = new Array(len); i < len; i++) {
	    arr2[i] = arr[i];
	  }

	  return arr2;
	}

	module.exports = _arrayLikeToArray;
	module.exports["default"] = module.exports, module.exports.__esModule = true;

/***/ }),
/* 22 */
/***/ (function(module, exports) {

	function _nonIterableRest() {
	  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
	}

	module.exports = _nonIterableRest;
	module.exports["default"] = module.exports, module.exports.__esModule = true;

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

	/*
	 The MIT License (MIT)

	 Copyright (c) 2014 Irrelon Software Limited
	 http://www.irrelon.com

	 Permission is hereby granted, free of charge, to any person obtaining a copy
	 of this software and associated documentation files (the "Software"), to deal
	 in the Software without restriction, including without limitation the rights
	 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	 copies of the Software, and to permit persons to whom the Software is
	 furnished to do so, subject to the following conditions:

	 The above copyright notice, url and this permission notice shall be included in
	 all copies or substantial portions of the Software.

	 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	 THE SOFTWARE.

	 Source: https://github.com/irrelon/emitter

	 Changelog:
	 	Version 4.0.1:
	 		Updated library to use new ES6 functionality making Overload()
	 		less useful so it can be removed as a dependency.
	 	Version 4.0.0:
	 		Breaking change. Library now has named exports `Emitter` and
	 		`makeEmitter`. `Emitter` is an ES6 class that can be extended
	 		and `makeEmitter` is a function that takes an object or class
	 		and does what `Emitter(someObject)` used to do. This change is
	 		to support being able to extend `Emitter` as a base class.
	 	Version 3.1.0:
	 		Changed order of execution so that listeners that are listening
	 		against a specific ID get called before the general catch-all
	 		listeners. Renamed package to @irrelon/emitter.
	 	Version 2.0.11:
	 		Added cancelStatic method to allow cancelling a static event
	 	Version 2.0.7:
	 		Fixed UMD module support
	 	Version 2.0.6:
	 		Added UMD module support
	 	Version 2.0.5:
	 		Added bower version number
	 	Version 2.0.4:
	 		Allow instantiation as independent instance, updated unit tests
	 	Version 2.0.3:
	 		Documentation updates, published to bower
	 	Version 2.0.2:
	 		Documentation updates
	 	Version 2.0.1:
	 		Bug fix in this._emitters usage
	 	Version 2.0.0:
	 		Big update to bring in line with latest developments in other projects. Event emitter can
	 		now use deferEmit(), emitId(), emitStatic(), emitStaticId(), willEmit(), willEmitId().
	 	Version 1.1.9:
	 		Updated changelog correctly
	 	Version 1.1.8:
	 		Removed tons of dependencies wrongly included in main dependencies, have moved to devDependencies section of package.json
	 	Version 1.1.0:
	 		Added support for overloaded methods
	 		Added support for events with ids
	 	Version 1.0.2:
	 		Removed AMD support, added browserify support
	 		Added package.json
	 		Added once() method
	 		Added hasListener() method
	 		Published to NPM as irrelon-emitter
	 	Version 1.0.1:
	 		Added ability to extend any object with eventing capability
	 		Added AMD / Require.js support
			 Added Node.js support
		Version 1.0.0:
			First commit
	 */
	"use strict";

	var _interopRequireDefault = __webpack_require__(3);

	var _typeof2 = _interopRequireDefault(__webpack_require__(10));

	var _classCallCheck2 = _interopRequireDefault(__webpack_require__(4));

	var _createClass2 = _interopRequireDefault(__webpack_require__(5));

	var EventMainMethods = {
	  /**
	   * Attach an event listener to the passed event only if the passed
	   * id matches the document id for the event being fired.
	   * @memberOf Emitter
	   * @method on
	   * @param {String} event The name of the event to listen for.
	   * @param {*} id The document id to match against.
	   * @param {Function} listener The method to call when the event is fired.
	   * @returns {Emitter} The emitter instance.
	   */
	  "_on": function _on(event, id, listener) {
	    var _this = this;

	    var self = this;

	    var generateTimeout = function generateTimeout(emitter) {
	      setTimeout(function () {
	        listener.apply(_this, emitter.args);
	      }, 1);
	    };

	    this._listeners = this._listeners || {};
	    this._listeners[event] = this._listeners[event] || {};
	    this._listeners[event][id] = this._listeners[event][id] || [];

	    this._listeners[event][id].push(listener); // Check for any static emitters, and fire the event if any exist


	    if (!this._emitters || !this._emitters[event] || !this._emitters[event].length) return this; // Emit events for each emitter

	    for (var i = 0; i < this._emitters[event].length; i++) {
	      var emitter = this._emitters[event];

	      if (id === "*" || emitter.id === id) {
	        // Call the listener out of process so that any code that expects a listener
	        // to be called at some point in the future rather than immediately on registration
	        // will not fail
	        generateTimeout(emitter);
	      }
	    }

	    return this;
	  },

	  /**
	   * Attach an event listener to the passed event only if the passed
	   * id matches the document id for the event being fired.
	   * @memberOf Emitter
	   * @method once
	   * @param {String} event The name of the event to listen for.
	   * @param {*} id The document id to match against.
	   * @param {Function} listener The method to call when the event is fired.
	   * @returns {Emitter} The emitter instance.
	   */
	  "_once": function _once(event, id, listener) {
	    var _this2 = this,
	        _arguments = arguments;

	    var fired = false;

	    var internalCallback = function internalCallback() {
	      if (fired) return;
	      fired = true;

	      _this2.off(event, id, internalCallback);

	      listener.apply(_this2, _arguments);
	    };

	    return this.on(event, id, internalCallback);
	  },

	  /**
	   * Cancels an event listener based on an event name, id and listener function.
	   * @memberOf Emitter
	   * @method off
	   * @param {String} event The event to cancel listener for.
	   * @param {String} id The ID of the event to cancel listening for.
	   * @param {Function} listener The event listener function used in the on()
	   * or once() call to cancel.
	   * @returns {Emitter} The emitter instance.
	   */
	  "_off": function _off(event, id, listener) {
	    var _this3 = this;

	    if (this._emitting) {
	      this._eventRemovalQueue = this._eventRemovalQueue || [];

	      this._eventRemovalQueue.push(function () {
	        _this3.off(event, id, listener);
	      });

	      return this;
	    }

	    if (!this._listeners || !this._listeners[event] || !this._listeners[event][id]) return this;

	    if (id && !listener) {
	      if (id === "*") {
	        delete this._listeners[event];
	        return this;
	      } // No listener provided, delete all listeners


	      delete this._listeners[event][id];
	      return this;
	    }

	    var arr = this._listeners[event][id] || [],
	        index = arr.indexOf(listener);

	    if (index > -1) {
	      arr.splice(index, 1);
	    }
	  }
	};
	/**
	 * @class Emitter
	 * @constructor
	 */

	var Emitter =
	/*#__PURE__*/
	function () {
	  function Emitter() {
	    (0, _classCallCheck2.default)(this, Emitter);
	  }

	  (0, _createClass2.default)(Emitter, [{
	    key: "on",

	    /**
	     * Attach an event listener to the passed event only if the passed
	     * id matches the document id for the event being fired.
	     * @memberOf Emitter
	     * @method on
	     * @param {String} event The name of the event to listen for.
	     * @param {*} id The document id to match against.
	     * @param {Function} listener The method to call when the event is fired.
	     * @returns {Emitter} The emitter instance.
	     */
	    value: function on(event) {
	      for (var _len = arguments.length, rest = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	        rest[_key - 1] = arguments[_key];
	      }

	      var restTypes = rest.map(function (arg) {
	        return (0, _typeof2.default)(arg);
	      });

	      if (restTypes[0] === "function") {
	        return EventMainMethods._on.call(this, event, "*", rest[0]);
	      }

	      return EventMainMethods._on.call(this, event, rest[0], rest[1]);
	    }
	    /**
	     * Attach an event listener to the passed event only if the passed
	     * id matches the document id for the event being fired.
	     * @memberOf Emitter
	     * @method once
	     * @param {String} event The name of the event to listen for.
	     * @param {*} id The document id to match against.
	     * @param {Function} listener The method to call when the event is fired.
	     * @returns {Emitter} The emitter instance.
	     */

	  }, {
	    key: "once",
	    value: function once(event) {
	      for (var _len2 = arguments.length, rest = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
	        rest[_key2 - 1] = arguments[_key2];
	      }

	      var restTypes = rest.map(function (arg) {
	        return (0, _typeof2.default)(arg);
	      });

	      if (restTypes[0] === "function") {
	        return EventMainMethods._once.call(this, event, "*", rest[0]);
	      }

	      return EventMainMethods._once.call(this, event, rest[0], rest[1]);
	    }
	    /**
	     * Attach an event listener to the passed event only if the passed
	     * id matches the document id for the event being fired.
	     * @memberOf Emitter
	     * @method once
	     * @param {String} event The name of the event to listen for.
	     * @param {*} id The document id to match against.
	     * @param {Function} listener The method to call when the event is fired.
	     * @returns {Emitter} The emitter instance.
	     */

	  }, {
	    key: "one",
	    value: function one(event) {
	      for (var _len3 = arguments.length, rest = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
	        rest[_key3 - 1] = arguments[_key3];
	      }

	      var restTypes = rest.map(function (arg) {
	        return (0, _typeof2.default)(arg);
	      });

	      if (restTypes[0] === "function") {
	        this.off(event);
	        return EventMainMethods._on.call(this, event, "*", rest[0]);
	      }

	      this.off(event, rest[0]);
	      return EventMainMethods._on.call(this, event, rest[0], rest[1]);
	    }
	    /**
	     * Cancels an event listener based on an event name, id and listener function.
	     * @memberOf Emitter
	     * @method off
	     * @param {String} event The event to cancel listener for.
	     * @param {String} id The ID of the event to cancel listening for.
	     * @param {Function} listener The event listener function used in the on()
	     * or once() call to cancel.
	     * @returns {Emitter} The emitter instance.
	     */

	  }, {
	    key: "off",
	    value: function off(event) {
	      for (var _len4 = arguments.length, rest = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
	        rest[_key4 - 1] = arguments[_key4];
	      }

	      if (rest.length === 0) {
	        // Only event was provided
	        return EventMainMethods._off.call(this, event, "*");
	      }

	      var restTypes = rest.map(function (arg) {
	        return (0, _typeof2.default)(arg);
	      });

	      if (restTypes[0] === "function") {
	        return EventMainMethods._off.call(this, event, "*", rest[0]);
	      }

	      return EventMainMethods._off.call(this, event, rest[0], rest[1]);
	    }
	    /**
	     * Handles emitting events, is an internal method not called directly.
	     * @param {String} event The name of the event to emit.
	     * @param {*} data The data to emit with the event.
	     * @returns {Emitter} The emitter instance.
	     * @private
	     */

	  }, {
	    key: "emit",
	    value: function emit(event) {
	      var id = "*";
	      this._listeners = this._listeners || {};
	      this._emitting = true;

	      if (this._listeners[event] && this._listeners[event][id]) {
	        // Handle global emit
	        var arr = this._listeners[event][id];
	        var arrCount = arr.length;

	        for (var _len5 = arguments.length, data = new Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
	          data[_key5 - 1] = arguments[_key5];
	        }

	        for (var arrIndex = 0; arrIndex < arrCount; arrIndex++) {
	          // Check we have a function to execute
	          var tmpFunc = arr[arrIndex];

	          if (typeof tmpFunc === "function") {
	            tmpFunc.call.apply(tmpFunc, [this].concat(data));
	          }
	        }
	      }

	      this._emitting = false;

	      this._processRemovalQueue();

	      return this;
	    }
	  }, {
	    key: "emitId",
	    value: function emitId(event, id) {
	      this._listeners = this._listeners || {};
	      this._emitting = true;

	      if (!this._listeners[event]) {
	        this._emitting = false;

	        this._processRemovalQueue();

	        return this;
	      } // Handle id emit


	      for (var _len6 = arguments.length, data = new Array(_len6 > 2 ? _len6 - 2 : 0), _key6 = 2; _key6 < _len6; _key6++) {
	        data[_key6 - 2] = arguments[_key6];
	      }

	      if (this._listeners[event][id]) {
	        var arr = this._listeners[event][id];
	        var arrCount = arr.length;

	        for (var arrIndex = 0; arrIndex < arrCount; arrIndex++) {
	          // Check we have a function to execute
	          var tmpFunc = arr[arrIndex];

	          if (typeof tmpFunc === "function") {
	            tmpFunc.call.apply(tmpFunc, [this].concat(data));
	          }
	        }
	      } // Handle global emit


	      if (this._listeners[event]["*"]) {
	        var _arr = this._listeners[event]["*"];
	        var _arrCount = _arr.length;

	        for (var _arrIndex = 0; _arrIndex < _arrCount; _arrIndex++) {
	          // Check we have a function to execute
	          var _tmpFunc = _arr[_arrIndex];

	          if (typeof _tmpFunc === "function") {
	            _tmpFunc.call.apply(_tmpFunc, [this].concat(data));
	          }
	        }
	      }

	      this._emitting = false;

	      this._processRemovalQueue();

	      return this;
	    }
	    /**
	     * Handles emitting events, is an internal method not called directly.
	     * @param {String} event The name of the event to emit.
	     * @param {*} data The data to emit with the event.
	     * @returns {Emitter} The emitter instance.
	     * @private
	     */

	  }, {
	    key: "emitStatic",
	    value: function emitStatic(event) {
	      for (var _len7 = arguments.length, data = new Array(_len7 > 1 ? _len7 - 1 : 0), _key7 = 1; _key7 < _len7; _key7++) {
	        data[_key7 - 1] = arguments[_key7];
	      }

	      var id = "*";
	      this._listeners = this._listeners || {};
	      this._emitting = true;

	      if (this._listeners[event] && this._listeners[event][id]) {
	        // Handle global emit
	        var arr = this._listeners[event][id];
	        var arrCount = arr.length;

	        for (var arrIndex = 0; arrIndex < arrCount; arrIndex++) {
	          // Check we have a function to execute
	          var tmpFunc = arr[arrIndex];

	          if (typeof tmpFunc === "function") {
	            tmpFunc.call.apply(tmpFunc, [this].concat(data));
	          }
	        }
	      }

	      this._emitting = false;
	      this._emitters = this._emitters || {};
	      this._emitters[event] = this._emitters[event] || [];

	      this._emitters[event].push({
	        "id": "*",
	        "args": data
	      });

	      this._processRemovalQueue();

	      return this;
	    }
	    /**
	     * Handles emitting events, is an internal method not called directly.
	     * @param {String} event The name of the event to emit.
	     * @param {String} id The id of the event to emit.
	     * @param {*} data The data to emit with the event.
	     * @returns {Emitter} The emitter instance.
	     * @private
	     */

	  }, {
	    key: "emitStaticId",
	    value: function emitStaticId(event, id) {
	      for (var _len8 = arguments.length, data = new Array(_len8 > 2 ? _len8 - 2 : 0), _key8 = 2; _key8 < _len8; _key8++) {
	        data[_key8 - 2] = arguments[_key8];
	      }

	      if (!id) throw new Error("Missing id from emitId call!");
	      this._listeners = this._listeners || {};
	      this._emitting = true;

	      if (this._listeners[event]) {
	        // Handle id emit
	        if (this._listeners[event][id]) {
	          var arr = this._listeners[event][id];
	          var arrCount = arr.length;

	          for (var arrIndex = 0; arrIndex < arrCount; arrIndex++) {
	            // Check we have a function to execute
	            var tmpFunc = arr[arrIndex];

	            if (typeof tmpFunc === "function") {
	              tmpFunc.call.apply(tmpFunc, [this].concat(data));
	            }
	          }
	        } // Handle global emit


	        if (this._listeners[event]["*"]) {
	          var _arr2 = this._listeners[event]["*"];
	          var _arrCount2 = _arr2.length;

	          for (var _arrIndex2 = 0; _arrIndex2 < _arrCount2; _arrIndex2++) {
	            // Check we have a function to execute
	            var _tmpFunc2 = _arr2[_arrIndex2];

	            if (typeof _tmpFunc2 === "function") {
	              _tmpFunc2.call.apply(_tmpFunc2, [this].concat(data));
	            }
	          }
	        }
	      }

	      this._emitting = false;
	      this._emitters = this._emitters || {};
	      this._emitters[event] = this._emitters[event] || [];

	      this._emitters[event].push({
	        id: id,
	        "args": data
	      });

	      this._processRemovalQueue();

	      return this;
	    }
	    /**
	     * Handles removing emitters, is an internal method not called directly.
	     * @param {String} event The event to remove static emitter for.
	     * @returns {Emitter} The emitter instance.
	     * @private
	     */

	  }, {
	    key: "cancelStatic",
	    value: function cancelStatic(event) {
	      this._emitters = this._emitters || {};
	      this._emitters[event] = [];
	      return this;
	    }
	    /**
	     * Checks if an event has any event listeners or not.
	     * @memberOf Emitter
	     * @method willEmit
	     * @param {String} event The name of the event to check for.
	     * @returns {boolean} True if one or more event listeners are registered for
	     * the event. False if none are found.
	     */

	  }, {
	    key: "willEmit",
	    value: function willEmit(event) {
	      var id = "*";

	      if (!this._listeners || !this._listeners[event]) {
	        return false;
	      }

	      var arr = this._listeners[event][id];
	      var arrCount = arr.length;

	      for (var arrIndex = 0; arrIndex < arrCount; arrIndex++) {
	        // Check we have a function to execute
	        var tmpFunc = arr[arrIndex];

	        if (typeof tmpFunc === "function") {
	          return true;
	        }
	      }

	      return false;
	    }
	    /**
	     * Checks if an event has any event listeners or not based on the passed id.
	     * @memberOf Emitter
	     * @method willEmitId
	     * @param {String} event The name of the event to check for.
	     * @param {String} id The event ID to check for.
	     * @returns {boolean} True if one or more event listeners are registered for
	     * the event. False if none are found.
	     */

	  }, {
	    key: "willEmitId",
	    value: function willEmitId(event, id) {
	      if (!this._listeners || !this._listeners[event]) {
	        return false;
	      } // Handle id emit


	      if (this._listeners[event][id]) {
	        var arr = this._listeners[event][id];
	        var arrCount = arr.length;

	        for (var arrIndex = 0; arrIndex < arrCount; arrIndex++) {
	          // Check we have a function to execute
	          var tmpFunc = arr[arrIndex];

	          if (typeof tmpFunc === "function") {
	            return true;
	          }
	        }
	      } // Handle global emit


	      if (this._listeners[event]["*"]) {
	        var _arr3 = this._listeners[event]["*"];
	        var _arrCount3 = _arr3.length;

	        for (var _arrIndex3 = 0; _arrIndex3 < _arrCount3; _arrIndex3++) {
	          // Check we have a function to execute
	          var _tmpFunc3 = _arr3[_arrIndex3];

	          if (typeof _tmpFunc3 === "function") {
	            return true;
	          }
	        }
	      }

	      return false;
	    }
	    /**
	     * Queues an event to be fired. This has automatic de-bouncing so that any
	     * events of the same type that occur within 100 milliseconds of a previous
	     * one will all be wrapped into a single emit rather than emitting tons of
	     * events for lots of chained inserts etc. Only the data from the last
	     * de-bounced event will be emitted.
	     * @memberOf Emitter
	     * @method deferEmit
	     * @param {String} eventName The name of the event to emit.
	     * @param {*=} data Optional data to emit with the event.
	     * @returns {Emitter} The emitter instance.
	     */

	  }, {
	    key: "deferEmit",
	    value: function deferEmit(eventName) {
	      var _this4 = this;

	      for (var _len9 = arguments.length, data = new Array(_len9 > 1 ? _len9 - 1 : 0), _key9 = 1; _key9 < _len9; _key9++) {
	        data[_key9 - 1] = arguments[_key9];
	      }

	      if (!this._noEmitDefer && (!this._db || this._db && !this._db._noEmitDefer)) {
	        // Check for an existing timeout
	        this._deferTimeout = this._deferTimeout || {};

	        if (this._deferTimeout[eventName]) {
	          clearTimeout(this._deferTimeout[eventName]);
	        } // Set a timeout


	        this._deferTimeout[eventName] = setTimeout(function () {
	          var _this4$emit;

	          (_this4$emit = _this4.emit).call.apply(_this4$emit, [_this4, eventName].concat(data));
	        }, 1);
	      } else {
	        var _this$emit;

	        (_this$emit = this.emit).call.apply(_this$emit, [this, eventName].concat(data));
	      }

	      return this;
	    }
	    /**
	     * If events are cleared with the off() method while the event emitter is
	     * actively processing any events then the off() calls get added to a
	     * queue to be executed after the event emitter is finished. This stops
	     * errors that might occur by potentially modifying the event queue while
	     * the emitter is running through them. This method is called after the
	     * event emitter is finished processing.
	     * @private
	     */

	  }, {
	    key: "_processRemovalQueue",
	    value: function _processRemovalQueue() {
	      if (!this._eventRemovalQueue || !this._eventRemovalQueue.length) {
	        return;
	      } // Execute each removal call


	      for (var i = 0; i < this._eventRemovalQueue.length; i++) {
	        this._eventRemovalQueue[i]();
	      } // Clear the removal queue


	      this._eventRemovalQueue = [];
	    }
	  }]);
	  return Emitter;
	}();
	/**
	 * Makes the passed class or object into an emitter by modifying either the
	 * prototype or the actual object to include event emitter methods.
	 * @param {Object} [obj={}] The object / function / class to add event methods to.
	 * If none is provided a new object will be created. This allows you to use
	 * new Emitter() to generate an event emitter that is not tied to any other
	 * object or class.
	 * @param {Boolean} [prototypeMode=true] Defaults to true. Set to true to add emitter
	 * methods to the the passed object"s prototype property e.g. obj.prototype.on
	 * = emitter.on. Set to false to add emitter methods the object directly e.g.
	 * obj.on = emitter.on.
	 * @returns {Object} The newly augmented object.
	 */


	var makeEmitter = function makeEmitter(obj, prototypeMode) {
	  var operateOnObject;

	  if (obj === undefined && prototypeMode === undefined) {
	    obj = {};
	    prototypeMode = false;
	  }

	  if (typeof obj === "boolean" && prototypeMode === undefined) {
	    prototypeMode = obj;
	    obj = {};
	  }

	  if (prototypeMode === undefined) {
	    prototypeMode = true;
	  }

	  if ((0, _typeof2.default)(obj) !== "object" && typeof obj !== "function") {
	    throw new Error("Cannot operate on a non-object / non-function passed as first argument!");
	  }

	  if (prototypeMode) {
	    if (obj.prototype === undefined) {
	      throw new Error("Cannot modify prototype of passed object, it has no prototype property! Was it instantiated with the new operator correctly?");
	    }

	    operateOnObject = obj.prototype;
	  } else {
	    operateOnObject = obj;
	  } // Convert the object prototype to have eventing capability


	  operateOnObject.on = Emitter.prototype.on;
	  operateOnObject.off = Emitter.prototype.off;
	  operateOnObject.one = Emitter.prototype.one;
	  operateOnObject.once = Emitter.prototype.once;
	  operateOnObject.emit = Emitter.prototype.emit;
	  operateOnObject.emitId = Emitter.prototype.emitId;
	  operateOnObject.emitStatic = Emitter.prototype.emitStatic;
	  operateOnObject.emitStaticId = Emitter.prototype.emitStaticId;
	  operateOnObject.cancelStatic = Emitter.prototype.cancelStatic;
	  operateOnObject.deferEmit = Emitter.prototype.deferEmit;
	  operateOnObject.willEmit = Emitter.prototype.willEmit;
	  operateOnObject.willEmitId = Emitter.prototype.willEmitId;
	  operateOnObject._processRemovalQueue = Emitter.prototype._processRemovalQueue;
	  return obj;
	};

	module.exports = {
	  Emitter: Emitter,
	  makeEmitter: makeEmitter
	};

/***/ }),
/* 24 */
/***/ (function(module, exports) {

	"use strict";

	var jsonEncoder = {
	  "name": "jsonEncoder",
	  "encode": function encode(data) {
	    if (data === undefined) return "";
	    return JSON.stringify(data);
	  },
	  "decode": function decode(data) {
	    if (data === undefined || data === null || data === "") return "";
	    var decoded;

	    try {
	      decoded = JSON.parse(data);
	    } catch (err) {
	      decoded = "";
	    }

	    return decoded;
	  }
	};
	var stringArrayEncoder = {
	  "name": "stringArrayEncoder",
	  "encode": function encode() {
	    var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
	    return data.join(",");
	  },
	  "decode": function decode() {
	    var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
	    return data.split(",");
	  }
	};
	var booleanArrayEncoder = {
	  "name": "booleanArrayEncoder",
	  "encode": function encode() {
	    var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
	    return data.join(",");
	  },
	  "decode": function decode() {
	    var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
	    return data.split(",").map(function (value) {
	      return value === "true";
	    });
	  }
	};
	var noDataEncoder = {
	  "name": "noDataEncoder",
	  "encode": function encode() {
	    return undefined;
	  },
	  "decode": function decode() {
	    return undefined;
	  }
	};
	module.exports = {
	  jsonEncoder: jsonEncoder,
	  stringArrayEncoder: stringArrayEncoder,
	  booleanArrayEncoder: booleanArrayEncoder,
	  noDataEncoder: noDataEncoder
	};

/***/ }),
/* 25 */
/***/ (function(module, exports) {

	"use strict";

	var STA_DISCONNECTED = 0;
	var STA_CONNECTING = 1;
	var STA_CONNECTED = 2;
	var STA_READY = 3;
	var STA_STARTED = 4;
	var STA_STOPPED = 5;
	var ENV_CLIENT = "1";
	var ENV_SERVER = "2";
	var CMD_PING = "ping";
	var CMD_COMMAND_MAP = "commandMap";
	var CMD_DEFINE_COMMAND = "defineCommand";
	var CMD_READY = "ready";
	var CMD_REQUEST = "request";
	var CMD_RESPONSE = "response";
	var CMD_MESSAGE = "message";
	var EVT_COMMAND = "command";
	var EVT_READY = "ready";
	var EVT_MESSAGE = "message";
	var EVT_CONNECTED = "connected";
	var EVT_CONNECTING = "connecting";
	var EVT_DISCONNECTED = "disconnected";
	var EVT_RECONNECTING = "reconnecting";
	var EVT_STATE_CHANGE = "state";
	var EVT_ERROR = "error";
	var EVT_STARTED = "started";
	var EVT_STOPPED = "stopped";
	var EVT_CLIENT_CONNECTED = "clientConnected";
	var EVT_CLIENT_DISCONNECTED = "clientDisconnected";
	module.exports = {
	  // States
	  STA_DISCONNECTED: STA_DISCONNECTED,
	  STA_CONNECTING: STA_CONNECTING,
	  STA_CONNECTED: STA_CONNECTED,
	  STA_READY: STA_READY,
	  STA_STARTED: STA_STARTED,
	  STA_STOPPED: STA_STOPPED,
	  // Environments
	  ENV_CLIENT: ENV_CLIENT,
	  ENV_SERVER: ENV_SERVER,
	  // Commands
	  CMD_COMMAND_MAP: CMD_COMMAND_MAP,
	  CMD_DEFINE_COMMAND: CMD_DEFINE_COMMAND,
	  CMD_MESSAGE: CMD_MESSAGE,
	  CMD_PING: CMD_PING,
	  CMD_READY: CMD_READY,
	  CMD_REQUEST: CMD_REQUEST,
	  CMD_RESPONSE: CMD_RESPONSE,
	  // Events
	  EVT_COMMAND: EVT_COMMAND,
	  EVT_CONNECTED: EVT_CONNECTED,
	  EVT_CONNECTING: EVT_CONNECTING,
	  EVT_DISCONNECTED: EVT_DISCONNECTED,
	  EVT_MESSAGE: EVT_MESSAGE,
	  EVT_READY: EVT_READY,
	  EVT_RECONNECTING: EVT_RECONNECTING,
	  EVT_STATE_CHANGE: EVT_STATE_CHANGE,
	  EVT_ERROR: EVT_ERROR,
	  EVT_STARTED: EVT_STARTED,
	  EVT_STOPPED: EVT_STOPPED,
	  EVT_CLIENT_CONNECTED: EVT_CLIENT_CONNECTED,
	  EVT_CLIENT_DISCONNECTED: EVT_CLIENT_DISCONNECTED
	};

/***/ }),
/* 26 */
/***/ (function(module, exports) {

	"use strict";

	var _idCounter = 0;
	/**
	 * Generates a new 16-character hexadecimal unique ID
	 * @return {String} The id.
	 */

	var hexId = function hexId() {
	  _idCounter++;
	  return (_idCounter + (Math.random() * Math.pow(10, 17) + Math.random() * Math.pow(10, 17) + Math.random() * Math.pow(10, 17) + Math.random() * Math.pow(10, 17))).toString(16);
	};

	module.exports = {
	  hexId: hexId
	};

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var _interopRequireDefault = __webpack_require__(3);

	var _slicedToArray2 = _interopRequireDefault(__webpack_require__(17));

	var _classCallCheck2 = _interopRequireDefault(__webpack_require__(4));

	var _createClass2 = _interopRequireDefault(__webpack_require__(5));

	var _assertThisInitialized2 = _interopRequireDefault(__webpack_require__(6));

	var _get2 = _interopRequireDefault(__webpack_require__(11));

	var _inherits2 = _interopRequireDefault(__webpack_require__(7));

	var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(9));

	var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(13));

	var _defineProperty2 = _interopRequireDefault(__webpack_require__(14));

	function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

	function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

	var WebSocket = __webpack_require__(15);

	var SocketBase = __webpack_require__(16);

	var _require = __webpack_require__(26),
	    hexId = _require.hexId;

	var _require2 = __webpack_require__(25),
	    STA_DISCONNECTED = _require2.STA_DISCONNECTED,
	    STA_CONNECTING = _require2.STA_CONNECTING,
	    STA_CONNECTED = _require2.STA_CONNECTED,
	    STA_READY = _require2.STA_READY,
	    STA_STARTED = _require2.STA_STARTED,
	    STA_STOPPED = _require2.STA_STOPPED,
	    ENV_CLIENT = _require2.ENV_CLIENT,
	    ENV_SERVER = _require2.ENV_SERVER,
	    CMD_COMMAND_MAP = _require2.CMD_COMMAND_MAP,
	    CMD_DEFINE_COMMAND = _require2.CMD_DEFINE_COMMAND,
	    CMD_MESSAGE = _require2.CMD_MESSAGE,
	    CMD_PING = _require2.CMD_PING,
	    CMD_READY = _require2.CMD_READY,
	    CMD_REQUEST = _require2.CMD_REQUEST,
	    CMD_RESPONSE = _require2.CMD_RESPONSE,
	    EVT_COMMAND = _require2.EVT_COMMAND,
	    EVT_CONNECTED = _require2.EVT_CONNECTED,
	    EVT_CONNECTING = _require2.EVT_CONNECTING,
	    EVT_DISCONNECTED = _require2.EVT_DISCONNECTED,
	    EVT_MESSAGE = _require2.EVT_MESSAGE,
	    EVT_READY = _require2.EVT_READY,
	    EVT_RECONNECTING = _require2.EVT_RECONNECTING,
	    EVT_STATE_CHANGE = _require2.EVT_STATE_CHANGE,
	    EVT_ERROR = _require2.EVT_ERROR,
	    EVT_STARTED = _require2.EVT_STARTED,
	    EVT_STOPPED = _require2.EVT_STOPPED,
	    EVT_CLIENT_CONNECTED = _require2.EVT_CLIENT_CONNECTED,
	    EVT_CLIENT_DISCONNECTED = _require2.EVT_CLIENT_DISCONNECTED;

	var SocketServer = /*#__PURE__*/function (_SocketBase) {
	  (0, _inherits2["default"])(SocketServer, _SocketBase);

	  var _super = _createSuper(SocketServer);

	  /**
	   * @param {string} serverName The name of the server, used in logs.
	   */
	  function SocketServer() {
	    var _this;

	    var serverName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "Server";
	    (0, _classCallCheck2["default"])(this, SocketServer);
	    _this = _super.call(this, ENV_SERVER, serverName);
	    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_httpMethodHandlers", {});
	    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onClientConnect", function (socket) {
	      socket.id = hexId();
	      _this._socketById[socket.id] = socket;

	      _this.log("New client connection with id", socket.id);

	      socket.on("message", function (data) {
	        _this._onMessageFromClient(data, socket);
	      });
	      socket.on("disconnect", function (data) {
	        _this._onClientDisconnect(data, socket);
	      }); // Send initial data to the client

	      _this.sendCommand(CMD_COMMAND_MAP, _this._commandMap.map(function (command) {
	        return [command, _this._commandEncoding[command].name];
	      }), socket.id);

	      _this.sendCommand(CMD_READY, "", socket.id);

	      _this.emit(EVT_CLIENT_CONNECTED, socket.id);
	    });

	    _this.on(CMD_REQUEST, "GET", function (data, response, socketId) {
	      _this._httpMethodHandlers.GET = _this._httpMethodHandlers.GET || {};

	      _this._httpMethodHandlers.GET[data.url]({
	        "body": data,
	        socketId: socketId
	      }, {
	        "send": response
	      });
	    });

	    _this.on(CMD_REQUEST, "POST", function (data, response, socketId) {
	      _this._httpMethodHandlers.POST = _this._httpMethodHandlers.POST || {};

	      _this._httpMethodHandlers.POST[data.url]({
	        "body": data,
	        socketId: socketId
	      }, {
	        "send": response
	      });
	    });

	    _this.on(CMD_REQUEST, "PUT", function (data, response, socketId) {
	      _this._httpMethodHandlers.PUT = _this._httpMethodHandlers.PUT || {};

	      _this._httpMethodHandlers.PUT[data.url]({
	        "body": data,
	        socketId: socketId
	      }, {
	        "send": response
	      });
	    });

	    _this.on(CMD_REQUEST, "DELETE", function (data, response, socketId) {
	      _this._httpMethodHandlers.DELETE = _this._httpMethodHandlers.DELETE || {};

	      _this._httpMethodHandlers.DELETE[data.url]({
	        "body": data,
	        socketId: socketId
	      }, {
	        "send": response
	      });
	    });

	    return _this;
	  }
	  /**
	   * Starts the server on the specified port.
	   * @param {Number} port The port to run the server on.
	   */


	  (0, _createClass2["default"])(SocketServer, [{
	    key: "start",
	    value: function start() {
	      var port = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 8080;

	      if (this.state() === STA_STARTED) {
	        this.log("Call to start() - already started!");
	        return;
	      }

	      this._socket = new WebSocket.Server({
	        port: port
	      });

	      this._socket.on("connection", this._onClientConnect);

	      this.log("Server started");
	      this.emit(EVT_STARTED, {
	        port: port
	      });
	      this.state(STA_STARTED);
	    }
	    /**
	     * Stops the server.
	     */

	  }, {
	    key: "stop",
	    value: function stop() {
	      this._socket.close();

	      this.emit(EVT_STOPPED);
	      this.state(STA_STOPPED);
	    }
	    /**
	     * Broadcasts a command and data to all connected clients.
	     * @param {string} cmd The command to send.
	     * @param {*} [data] The data to send with the command.
	     */

	  }, {
	    key: "broadcastCommand",
	    value: function broadcastCommand(cmd, data) {
	      var _this2 = this;

	      Object.entries(this._socketById).forEach(function (_ref) {
	        var _ref2 = (0, _slicedToArray2["default"])(_ref, 2),
	            key = _ref2[0],
	            socket = _ref2[1];

	        (0, _get2["default"])((0, _getPrototypeOf2["default"])(SocketServer.prototype), "sendCommand", _this2).call(_this2, cmd, data, socket);
	      });
	    }
	    /**
	     * Sends a command and data to the specified socket. If no socket
	     * is provided, the command is automatically broadcast instead.
	     * @param {string} cmd The command to send.
	     * @param {*} [data] The data to send with the command.
	     * @param {string} [socketId] The id of the client to send the
	     * command to.
	     */

	  }, {
	    key: "sendCommand",
	    value: function sendCommand(cmd, data, socketId) {
	      if (!socketId) return this.broadcastCommand(cmd, data);
	      var socket = this._socketById[socketId];
	      if (!socket) return this.log("Socket required to send message!");
	      (0, _get2["default"])((0, _getPrototypeOf2["default"])(SocketServer.prototype), "sendCommand", this).call(this, cmd, data, socket);
	    }
	    /**
	     * Sends a request to a client.
	     * @param {string} requestName The name of the request to send.
	     * @param {*} [data] The data to send with the request.
	     * @param {function(data: Any)} callback The function to call when the request
	     * receives a response.
	     */

	  }, {
	    key: "sendRequest",
	    value: function sendRequest(requestName, data, callback, socketId) {
	      var socket = this._socketById[socketId];
	      if (!socket) return this.log("Socket required to send message!");
	      var requestId = hexId();
	      this._requestById[requestId] = socketId;
	      this._responseCallbackByRequestId[requestId] = callback;
	      (0, _get2["default"])((0, _getPrototypeOf2["default"])(SocketServer.prototype), "sendRequest", this).call(this, requestName, requestId, data, socket);
	    }
	    /**
	     * Sends a response to a request using the request id.
	     * @param {string} requestId The request id to respond to.
	     * @param {*} responseData The data to send with the response.
	     */

	  }, {
	    key: "sendResponse",
	    value: function sendResponse(requestId, responseData) {
	      // Get socketId from requestId
	      var socketId = this._requestById[requestId];
	      this.log("Sending response", "requestId", requestId, responseData, "socketId", socketId);
	      if (!socketId) return this.log("Request ID not recognised, already replied?");
	      this.sendCommand(CMD_RESPONSE, {
	        "id": requestId,
	        "data": responseData
	      }, socketId);
	    }
	    /**
	     * Defines a listener at a URL for a GET request from the client. This
	     * operates in a similar way to an express server's .get() function.
	     * @param {string} url The url path to listen for requests on.
	     * @param {function} callback The function to call when a request comes
	     * in to the server.
	     */

	  }, {
	    key: "GET",
	    value: function GET(url, callback) {
	      this._httpMethodHandlers.GET = this._httpMethodHandlers.GET || {};
	      this._httpMethodHandlers.GET[url] = callback;
	    }
	    /**
	     * Defines a listener at a URL for a POST request from the client. This
	     * operates in a similar way to an express server's .post() function.
	     * @param {string} url The url path to listen for requests on.
	     * @param {function} callback The function to call when a request comes
	     * in to the server.
	     */

	  }, {
	    key: "POST",
	    value: function POST(url, callback) {
	      this._httpMethodHandlers.POST = this._httpMethodHandlers.POST || {};
	      this._httpMethodHandlers.POST[url] = callback;
	    }
	    /**
	     * Defines a listener at a URL for a PUT request from the client. This
	     * operates in a similar way to an express server's .put() function.
	     * @param {string} url The url path to listen for requests on.
	     * @param {function} callback The function to call when a request comes
	     * in to the server.
	     */

	  }, {
	    key: "PUT",
	    value: function PUT(url, callback) {
	      this._httpMethodHandlers.PUT = this._httpMethodHandlers.PUT || {};
	      this._httpMethodHandlers.PUT[url] = callback;
	    }
	    /**
	     * Defines a listener at a URL for a DELETE request from the client. This
	     * operates in a similar way to an express server's .delete() function.
	     * @param {string} url The url path to listen for requests on.
	     * @param {function} callback The function to call when a request comes
	     * in to the server.
	     */

	  }, {
	    key: "DELETE",
	    value: function DELETE(url, callback) {
	      this._httpMethodHandlers.DELETE = this._httpMethodHandlers.DELETE || {};
	      this._httpMethodHandlers.DELETE[url] = callback;
	    }
	    /**
	     * Sends a basic message over the network to a specific client.
	     * @param {*} data The data to send with the message.
	     * @param {string} [socketId] Optional socketId. If none is provided
	     * the message is automatically broadcast to all connected clients.
	     */

	  }, {
	    key: "send",
	    value: function send(data, socketId) {
	      this.sendCommand(CMD_MESSAGE, data, socketId);
	    }
	    /**
	     * Called when a client connects to the server.
	     * @param {object} socket The socket object representing the client.
	     */

	  }, {
	    key: "_onClientDisconnect",
	    value:
	    /**
	     *
	     */
	    function _onClientDisconnect(data, socket) {
	      this.emitId(EVT_CLIENT_DISCONNECTED, socket.id, data);
	      delete this._socketById[socket.id];
	    }
	    /**
	     *
	     */

	  }, {
	    key: "_onMessageFromClient",
	    value: function _onMessageFromClient(rawMessage, socket) {
	      (0, _get2["default"])((0, _getPrototypeOf2["default"])(SocketServer.prototype), "_onMessage", this).call(this, rawMessage, socket.id);
	    }
	    /**
	     *
	     */

	  }, {
	    key: "_onRequest",
	    value: function _onRequest(requestName, requestId, data, response, socketId) {
	      this.log("_onRequest requestId", requestId, "socketId", socketId);
	      this._requestById[requestId] = socketId;
	      (0, _get2["default"])((0, _getPrototypeOf2["default"])(SocketServer.prototype), "_onRequest", this).call(this, requestName, requestId, data, response, socketId);
	    }
	    /**
	     *
	     */

	  }, {
	    key: "_onResponse",
	    value: function _onResponse(requestId, data) {
	      var responseCallback = this._responseCallbackByRequestId[requestId];
	      responseCallback(data);
	      delete this._responseCallbackByRequestId[requestId];
	    }
	  }]);
	  return SocketServer;
	}(SocketBase);

	module.exports = SocketServer;

/***/ })
/******/ ]);