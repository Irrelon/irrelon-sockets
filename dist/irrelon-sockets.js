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

	var _interopRequireDefault = __webpack_require__(2);

	var _defineProperty2 = _interopRequireDefault(__webpack_require__(3));

	function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

	function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

	var Client = __webpack_require__(4);

	var Server = __webpack_require__(28);

	var enums = __webpack_require__(26);

	module.exports = _objectSpread({
	  Client: Client,
	  Server: Server
	}, enums);

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : {
	    "default": obj
	  };
	}

	module.exports = _interopRequireDefault;
	module.exports["default"] = module.exports, module.exports.__esModule = true;

/***/ }),
/* 3 */
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
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var _interopRequireDefault = __webpack_require__(2);

	var _classCallCheck2 = _interopRequireDefault(__webpack_require__(5));

	var _createClass2 = _interopRequireDefault(__webpack_require__(6));

	var _assertThisInitialized2 = _interopRequireDefault(__webpack_require__(7));

	var _inherits2 = _interopRequireDefault(__webpack_require__(8));

	var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(10));

	var _get2 = _interopRequireDefault(__webpack_require__(12));

	var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(14));

	var _defineProperty2 = _interopRequireDefault(__webpack_require__(3));

	function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

	function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

	var WebSocket = __webpack_require__(15);

	var SocketBase = __webpack_require__(16);

	var _require = __webpack_require__(27),
	    hexId = _require.hexId;

	var _require2 = __webpack_require__(26),
	    READY = _require2.READY,
	    CONNECTING = _require2.CONNECTING,
	    CONNECTED = _require2.CONNECTED,
	    DISCONNECTED = _require2.DISCONNECTED,
	    CLIENT = _require2.CLIENT,
	    COMMAND = _require2.COMMAND;

	var SocketClient = /*#__PURE__*/function (_SocketBase) {
	  (0, _inherits2["default"])(SocketClient, _SocketBase);

	  var _super = _createSuper(SocketClient);

	  function SocketClient() {
	    var _thisSuper, _this;

	    var clientName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "Client";
	    (0, _classCallCheck2["default"])(this, SocketClient);
	    _this = _super.call(this, CLIENT, clientName); // Define the default command listeners

	    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_backoff", 1000);
	    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_buffer", []);
	    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onConnected", function () {
	      _this._backoff = 1000;

	      _this.state(CONNECTED);

	      _this.emit(EVT_CONNECTED);
	    });
	    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onUnexpectedDisconnect", function () {
	      _this.state(DISCONNECTED);

	      _this.log("Disconnected from server");

	      _this.emit(EVT_DISCONNECTED);

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

	      _this.commandMap(data);
	    });
	    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onDefineCommand", function (data) {
	      _this.log("_onDefineCommand", data);

	      _this.defineCommand(data[0], data[1]);
	    });
	    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onReadyCommand", function (data) {
	      _this.log("_onReadyCommand", data);

	      _this.state(READY);

	      _this.emit(CMD_READY);

	      _this.processBuffer();
	    });

	    _this.on(COMMAND, CMD_COMMAND_MAP, _this._onCommandMap);

	    _this.on(COMMAND, CMD_DEFINE_COMMAND, _this._onDefineCommand);

	    _this.on(COMMAND, CMD_READY, _this._onReadyCommand);

	    return _this;
	  }

	  (0, _createClass2["default"])(SocketClient, [{
	    key: "connect",
	    value: function connect(host) {
	      // Check if we are already connected
	      if (this.state() === CONNECTED) {
	        return;
	      }

	      this.state(CONNECTING);
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
	      this.state(DISCONNECTED);

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
	      if (this.state() !== READY) {
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
	      if (this.state() !== READY) {
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
	      this.sendCommand("genericMessage", data);
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
/* 5 */
/***/ (function(module, exports) {

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	}

	module.exports = _classCallCheck;
	module.exports["default"] = module.exports, module.exports.__esModule = true;

/***/ }),
/* 6 */
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
/* 7 */
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
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

	var setPrototypeOf = __webpack_require__(9);

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
/* 9 */
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
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

	var _typeof = __webpack_require__(11)["default"];

	var assertThisInitialized = __webpack_require__(7);

	function _possibleConstructorReturn(self, call) {
	  if (call && (_typeof(call) === "object" || typeof call === "function")) {
	    return call;
	  }

	  return assertThisInitialized(self);
	}

	module.exports = _possibleConstructorReturn;
	module.exports["default"] = module.exports, module.exports.__esModule = true;

/***/ }),
/* 11 */
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
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

	var superPropBase = __webpack_require__(13);

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
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

	var getPrototypeOf = __webpack_require__(14);

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
/* 14 */
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

	var _interopRequireDefault = __webpack_require__(2);

	var _slicedToArray2 = _interopRequireDefault(__webpack_require__(17));

	var _classCallCheck2 = _interopRequireDefault(__webpack_require__(5));

	var _createClass2 = _interopRequireDefault(__webpack_require__(6));

	var _defineProperty2 = _interopRequireDefault(__webpack_require__(3));

	var Emitter = __webpack_require__(23);

	var encoders = __webpack_require__(25);

	var _require = __webpack_require__(26),
	    COMMAND = _require.COMMAND,
	    CLIENT = _require.CLIENT,
	    DISCONNECTED = _require.DISCONNECTED;

	var SocketBase = /*#__PURE__*/function () {
	  function SocketBase(env, name) {
	    var _this = this;

	    (0, _classCallCheck2["default"])(this, SocketBase);
	    (0, _defineProperty2["default"])(this, "_socketById", {});
	    (0, _defineProperty2["default"])(this, "_requestById", {});
	    (0, _defineProperty2["default"])(this, "_responseCallbackByRequestId", {});
	    (0, _defineProperty2["default"])(this, "_dictionary", []);
	    (0, _defineProperty2["default"])(this, "_commandMap", [CMD_PING, CMD_COMMAND_MAP, CMD_DEFINE_COMMAND, CMD_READY, CMD_REQUEST, CMD_RESPONSE, CMD_MESSAGE]);
	    (0, _defineProperty2["default"])(this, "_commandEncoding", {
	      "*": encoders.jsonEncoder,
	      "CMD_COMMAND_MAP": encoders.stringArrayEncoder,
	      "CMD_DEFINE_COMMAND": encoders.stringArrayEncoder,
	      "CMD_READY": encoders.noDataEncoder,
	      "CMD_REQUEST": encoders.jsonEncoder,
	      "CMD_RESPONSE": encoders.jsonEncoder,
	      "CMD_MESSAGE": encoders.jsonEncoder
	    });
	    (0, _defineProperty2["default"])(this, "_idCounter", 0);
	    (0, _defineProperty2["default"])(this, "_state", DISCONNECTED);
	    (0, _defineProperty2["default"])(this, "state", function (newState) {
	      if (newState === undefined) return _this._state;
	      _this._state = newState;

	      _this.emit(EVT_STATE_CHANGE, newState);
	    });
	    this._name = name;
	    this._env = env;
	    this.generateDictionary();
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
	  }, {
	    key: "log",
	    value: function log() {
	      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
	        args[_key] = arguments[_key];
	      }

	      args.splice(0, 0, this._name); //console.log.call(console, ...args);
	    }
	  }, {
	    key: "commandMap",
	    value: function commandMap(_commandMap) {
	      if (_commandMap === undefined) return this._commandMap;
	      this._commandMap = _commandMap;
	      this.generateDictionary();
	    }
	  }, {
	    key: "defineCommand",
	    value: function defineCommand(command, encoderNameOrObject) {
	      var encoderName;
	      var encoder;
	      var existingCommandId = this.idByCommand(command);
	      if (existingCommandId > -1) return existingCommandId;

	      if (typeof encoderNameOrObject === "string") {
	        // Map to an encoder object
	        encoderName = encoderNameOrObject;
	        encoder = encoders[encoderNameOrObject];
	      } // Add the new command


	      this._dictionary.push(command);

	      this._commandMap.push(command);

	      this._commandEncoding[command] = encoder;
	      this.log("Defined new command \"".concat(command, "\""));
	      if (this._env === CLIENT) return this._commandMap.length - 1; // Update any connected clients with the new command

	      this.sendCommand(CMD_DEFINE_COMMAND, [command, encoderName || this.encoderNameByObject(encoder)]);
	      return this._commandMap.length - 1;
	    }
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
	    key: "commandById",
	    value: function commandById(id) {
	      return this._commandMap[id];
	    }
	  }, {
	    key: "idByCommand",
	    value: function idByCommand(command) {
	      return this._commandMap.indexOf(command);
	    }
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
	        this.emit(EVT_MESSAGE, data);
	      } else {
	        this.emitId(COMMAND, command, data);
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
	      this.emitId(CMD_REQUEST, requestName, {
	        data: data,
	        response: response,
	        socketId: socketId
	      });
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
	}();

	Emitter(SocketBase);
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
	 	Version 3.1.0:
	 		Changed order of execution so that listeners that are listening
	 		against a specific ID get called before the general catch-all
	 		listeners.
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

	var _interopRequireDefault = __webpack_require__(2);

	var _typeof2 = _interopRequireDefault(__webpack_require__(11));

	var Overload = __webpack_require__(24);

	var EventMethods = {
	  "on": new Overload({
	    /**
	     * Attach an event listener to the passed event.
	     * @memberof Emitter
	     * @method on
	     * @param {String} event The name of the event to listen for.
	     * @param {Function} listener The method to call when the event is fired.
	     */
	    "string, function": function stringFunction(event, listener) {
	      return this.$main(event, "*", listener);
	    },

	    /**
	     * Attach an event listener to the passed event only if the passed
	     * id matches the document id for the event being fired.
	     * @memberof Emitter
	     * @method on
	     * @param {String} event The name of the event to listen for.
	     * @param {*} id The document id to match against.
	     * @param {Function} listener The method to call when the event is fired.
	     */
	    "string, *, function": function stringFunction(event, id, listener) {
	      return this.$main(event, id, listener);
	    },

	    /**
	     * @param event
	     * @param id
	     * @param listener
	     * @return {$main}
	     * @private
	     */
	    "$main": function $main(event, id, listener) {
	      var self = this;

	      var generateTimeout = function generateTimeout(emitter) {
	        setTimeout(function () {
	          listener.apply(self, emitter.args);
	        }, 1);
	      };

	      this._listeners = this._listeners || {};
	      this._listeners[event] = this._listeners[event] || {};
	      this._listeners[event][id] = this._listeners[event][id] || [];

	      this._listeners[event][id].push(listener); // Check for any static emitters, and fire the event if any exist


	      if (this._emitters && this._emitters[event] && this._emitters[event].length) {
	        // Emit events for each emitter
	        for (var i = 0; i < this._emitters[event].length; i++) {
	          var emitter = this._emitters[event];

	          if (id === "*" || emitter.id === id) {
	            // Call the listener out of process so that any code that expects a listener
	            // to be called at some point in the future rather than immediately on registration
	            // will not fail
	            generateTimeout(emitter);
	          }
	        }
	      }

	      return this;
	    }
	  }),
	  "once": new Overload({
	    /**
	     * Attach an event listener to the passed event which will only fire once.
	     * @memberof Emitter
	     * @method once
	     * @param {String} event The name of the event to listen for.
	     * @param {Function} listener The method to call when the event is fired.
	     */
	    "string, function": function stringFunction(event, listener) {
	      var self = this;
	      var fired = false;

	      var internalCallback = function internalCallback() {
	        if (!fired) {
	          fired = true;
	          self.off(event, internalCallback);
	          listener.apply(self, arguments);
	        }
	      };

	      return this.on(event, internalCallback);
	    },

	    /**
	     * Attach an event listener to the passed event only if the passed
	     * id matches the document id for the event being fired.
	     * @memberof Emitter
	     * @method once
	     * @param {String} event The name of the event to listen for.
	     * @param {*} id The document id to match against.
	     * @param {Function} listener The method to call when the event is fired.
	     */
	    "string, *, function": function stringFunction(event, id, listener) {
	      var self = this;
	      var fired = false;

	      var internalCallback = function internalCallback() {
	        if (!fired) {
	          fired = true;
	          self.off(event, id, internalCallback);
	          listener.apply(self, arguments);
	        }
	      };

	      return this.on(event, id, internalCallback);
	    }
	  }),
	  "one": new Overload({
	    /**
	     * Attach an event listener to the passed event which will cancel all
	     * previous listeners and only fire this newest one.
	     * @memberof Emitter
	     * @method one
	     * @param {String} event The name of the event to listen for.
	     * @param {Function} listener The method to call when the event is fired.
	     */
	    "string, function": function stringFunction(event, listener) {
	      this.off(event);
	      return this.on(event, listener);
	    },

	    /**
	     * Attach an event listener to the passed event only if the passed
	     * id matches the document id for the event being fired.
	     * @memberof Emitter
	     * @method once
	     * @param {String} event The name of the event to listen for.
	     * @param {*} id The document id to match against.
	     * @param {Function} listener The method to call when the event is fired.
	     */
	    "string, *, function": function stringFunction(event, id, listener) {
	      this.off(event, id);
	      return this.on(event, id, listener);
	    }
	  }),
	  "off": new Overload({
	    /**
	     * Cancels all event listeners for the passed event.
	     * @memberof Emitter
	     * @method off
	     * @param {String} event The name of the event.
	     * @returns {*}
	     */
	    "string": function string(event) {
	      var self = this;

	      if (this._emitting) {
	        this._eventRemovalQueue = this._eventRemovalQueue || [];

	        this._eventRemovalQueue.push(function () {
	          self.off(event);
	        });
	      } else {
	        if (this._listeners && this._listeners[event]) {
	          delete this._listeners[event];
	        }
	      }

	      return this;
	    },

	    /**
	     * Cancels the event listener for the passed event and listener function.
	     * @memberof Emitter
	     * @method off
	     * @param {String} event The event to cancel listener for.
	     * @param {Function} listener The event listener function used in the on()
	     * or once() call to cancel.
	     * @returns {*}
	     */
	    "string, function": function stringFunction(event, listener) {
	      var self = this;

	      if (this._emitting) {
	        this._eventRemovalQueue = this._eventRemovalQueue || [];

	        this._eventRemovalQueue.push(function () {
	          self.off(event, listener);
	        });
	      } else if (typeof listener === "string") {
	        if (this._listeners && this._listeners[event] && this._listeners[event][listener]) {
	          delete this._listeners[event][listener];
	        }
	      } else {
	        if (this._listeners && this._listeners[event]) {
	          var arr = this._listeners[event]["*"] || [];
	          var index = arr.indexOf(listener);

	          if (index > -1) {
	            arr.splice(index, 1);
	          }
	        }
	      }

	      return this;
	    },

	    /**
	     * Cancels an event listener based on an event name, id and listener function.
	     * @memberof Emitter
	     * @method off
	     * @param {String} event The event to cancel listener for.
	     * @param {String} id The ID of the event to cancel listening for.
	     * @param {Function} listener The event listener function used in the on()
	     * or once() call to cancel.
	     */
	    "string, *, function": function stringFunction(event, id, listener) {
	      var self = this;

	      if (this._emitting) {
	        this._eventRemovalQueue = this._eventRemovalQueue || [];

	        this._eventRemovalQueue.push(function () {
	          self.off(event, id, listener);
	        });
	      } else {
	        if (this._listeners && this._listeners[event] && this._listeners[event][id]) {
	          var arr = this._listeners[event][id] || [],
	              index = arr.indexOf(listener);

	          if (index > -1) {
	            arr.splice(index, 1);
	          }
	        }
	      }
	    },

	    /**
	     * Cancels all listeners for an event based on the passed event name and id.
	     * @memberof Emitter
	     * @method off
	     * @param {String} event The event name to cancel listeners for.
	     * @param {*} id The ID to cancel all listeners for.
	     */
	    "string, *": function string(event, id) {
	      var self = this;

	      if (this._emitting) {
	        this._eventRemovalQueue = this._eventRemovalQueue || [];

	        this._eventRemovalQueue.push(function () {
	          self.off(event, id);
	        });
	      } else if (this._listeners && this._listeners[event] && this._listeners[event][id]) {
	        // Kill all listeners for this event id
	        delete this._listeners[event][id];
	      }
	    }
	  }),
	  "emit": new Overload({
	    /**
	     * Emit an event.
	     * @memberof Emitter
	     * @method emit
	     * @param {String} event The event to emit.
	     * @returns {*}
	     */
	    "string": function string(event) {
	      // Fire global listeners
	      return this.$main(event);
	    },

	    /**
	     * Emit an event with data.
	     * @memberof Emitter
	     * @method emit
	     * @param {String} event The event to emit.
	     * @param {*} data Data to emit with the event.
	     * @returns {*}
	     */
	    "string, ...": function string(event, data) {
	      // Fire global listeners first
	      this.$main.apply(this, arguments);
	      return this;
	    },

	    /**
	     * Handles emitting events, is an internal method not called directly.
	     * @param {String} event The name of the event to emit.
	     * @param {*} data The data to emit with the event.
	     * @returns {*}
	     * @private
	     */
	    "$main": function $main(event, data) {
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
	            tmpFunc.apply(this, Array.prototype.slice.call(arguments, 1));
	          }
	        }
	      }

	      this._emitting = false;

	      this._processRemovalQueue();

	      return this;
	    }
	  }),
	  "emitId": new Overload({
	    "string": function string(event) {
	      throw "Missing id from emitId call!";
	    },
	    "string, *": function string(event, id) {
	      return this.$main(event, id);
	    },
	    "string, *, ...": function string(event, id) {
	      // Fire global listeners first
	      this.$main.apply(this, arguments);
	      return this;
	    },
	    "$main": function $main(event, id, data) {
	      this._listeners = this._listeners || {};
	      this._emitting = true;

	      if (!this._listeners[event]) {
	        this._emitting = false;

	        this._processRemovalQueue();

	        return this;
	      } // Handle id emit


	      if (this._listeners[event][id]) {
	        var arr = this._listeners[event][id];
	        var arrCount = arr.length;

	        for (var arrIndex = 0; arrIndex < arrCount; arrIndex++) {
	          // Check we have a function to execute
	          var tmpFunc = arr[arrIndex];

	          if (typeof tmpFunc === "function") {
	            tmpFunc.apply(this, Array.prototype.slice.call(arguments, 2));
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
	            _tmpFunc.apply(this, Array.prototype.slice.call(arguments, 2));
	          }
	        }
	      }

	      this._emitting = false;

	      this._processRemovalQueue();

	      return this;
	    }
	  }),
	  "emitStatic": new Overload({
	    /**
	     * Emit an event that will fire on listeners even when the listener
	     * is registered AFTER the event has been emitted.
	     * @memberof Emitter
	     * @method emitStatic
	     * @param {String} event The event to emit.
	     * @returns {*}
	     */
	    "string": function string(event) {
	      // Fire global listeners
	      return this.$main(event);
	    },

	    /**
	     * Emit an event with data that will fire on listeners even when the listener
	     * is registered AFTER the event has been emitted.
	     * @memberof Emitter
	     * @method emitStatic
	     * @param {String} event The event to emit.
	     * @param {*} data Data to emit with the event.
	     * @returns {*}
	     */
	    "string, ...": function string(event, data) {
	      // Fire global listeners first
	      this.$main.apply(this, arguments);
	      return this;
	    },

	    /**
	     * Handles emitting events, is an internal method not called directly.
	     * @param {String} event The name of the event to emit.
	     * @param {*} data The data to emit with the event.
	     * @returns {*}
	     * @private
	     */
	    "$main": function $main(event, data) {
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
	            tmpFunc.apply(this, Array.prototype.slice.call(arguments, 1));
	          }
	        }
	      }

	      this._emitting = false;
	      this._emitters = this._emitters || {};
	      this._emitters[event] = this._emitters[event] || [];

	      this._emitters[event].push({
	        "id": "*",
	        "args": Array.prototype.slice.call(arguments, 1)
	      });

	      this._processRemovalQueue();

	      return this;
	    }
	  }),
	  "emitStaticId": new Overload({
	    /**
	     * Require an id to emit.
	     * @memberof Emitter
	     * @method emitStaticId
	     * @param event
	     */
	    "string": function string(event) {
	      throw "Missing id from emitId call!";
	    },

	    /**
	     * Emit an event that will fire on listeners even when the listener
	     * is registered AFTER the event has been emitted.
	     * @memberof Emitter
	     * @method emitStaticId
	     * @param {String} event The event to emit.
	     * @param {String} id The id of the event to emit.
	     * @returns {*}
	     */
	    "string, *": function string(event, id) {
	      return this.$main(event, id);
	    },

	    /**
	     * Emit an event that will fire on listeners even when the listener
	     * is registered AFTER the event has been emitted.
	     * @memberof Emitter
	     * @method emitStaticId
	     * @param {String} event The event to emit.
	     * @param {String} id The id of the event to emit.
	     * @param {*=} data The data to emit with the event.
	     * @returns {*}
	     */
	    "string, *, ...": function string(event, id, data) {
	      // Fire global listeners first
	      this.$main.apply(this, arguments);
	      return this;
	    },

	    /**
	     * Handles emitting events, is an internal method not called directly.
	     * @param {String} event The name of the event to emit.
	     * @param {String} id The id of the event to emit.
	     * @param {*} data The data to emit with the event.
	     * @returns {*}
	     * @private
	     */
	    "$main": function $main(event, id, data) {
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
	              tmpFunc.apply(this, Array.prototype.slice.call(arguments, 2));
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
	              _tmpFunc2.apply(this, Array.prototype.slice.call(arguments, 2));
	            }
	          }
	        }
	      }

	      this._emitting = false;
	      this._emitters = this._emitters || {};
	      this._emitters[event] = this._emitters[event] || [];

	      this._emitters[event].push({
	        id: id,
	        "args": Array.prototype.slice.call(arguments, 2)
	      });

	      this._processRemovalQueue();

	      return this;
	    }
	  }),
	  "cancelStatic": new Overload({
	    /**
	     * Remove a static event emitter.
	     * @memberof Emitter
	     * @method emitStatic
	     * @param {String} event The event to remove static emitter for.
	     * @returns {*}
	     */
	    "string": function string(event) {
	      // Fire global listeners
	      return this.$main(event);
	    },

	    /**
	     * Handles removing emitters, is an internal method not called directly.
	     * @param {String} event The event to remove static emitter for.
	     * @returns {*}
	     * @private
	     */
	    "$main": function $main(event) {
	      this._emitters = this._emitters || {};
	      this._emitters[event] = [];
	      return this;
	    }
	  }),

	  /**
	   * Checks if an event has any event listeners or not.
	   * @memberof Emitter
	   * @method willEmit
	   * @param {String} event The name of the event to check for.
	   * @returns {boolean} True if one or more event listeners are registered for
	   * the event. False if none are found.
	   */
	  "willEmit": function willEmit(event) {
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
	  },

	  /**
	   * Checks if an event has any event listeners or not based on the passed id.
	   * @memberof Emitter
	   * @method willEmitId
	   * @param {String} event The name of the event to check for.
	   * @param {String} id The event ID to check for.
	   * @returns {boolean} True if one or more event listeners are registered for
	   * the event. False if none are found.
	   */
	  "willEmitId": function willEmitId(event, id) {
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
	  },

	  /**
	   * If events are cleared with the off() method while the event emitter is
	   * actively processing any events then the off() calls get added to a
	   * queue to be executed after the event emitter is finished. This stops
	   * errors that might occur by potentially modifying the event queue while
	   * the emitter is running through them. This method is called after the
	   * event emitter is finished processing.
	   * @private
	   */
	  "_processRemovalQueue": function _processRemovalQueue() {
	    if (!this._eventRemovalQueue || !this._eventRemovalQueue.length) {
	      return;
	    } // Execute each removal call


	    for (var i = 0; i < this._eventRemovalQueue.length; i++) {
	      this._eventRemovalQueue[i]();
	    } // Clear the removal queue


	    this._eventRemovalQueue = [];
	  },

	  /**
	   * Queues an event to be fired. This has automatic de-bouncing so that any
	   * events of the same type that occur within 100 milliseconds of a previous
	   * one will all be wrapped into a single emit rather than emitting tons of
	   * events for lots of chained inserts etc. Only the data from the last
	   * de-bounced event will be emitted.
	   * @memberof Emitter
	   * @method deferEmit
	   * @param {String} eventName The name of the event to emit.
	   * @param {*=} data Optional data to emit with the event.
	   */
	  "deferEmit": function deferEmit(eventName, data) {
	    var self = this;

	    if (!this._noEmitDefer && (!this._db || this._db && !this._db._noEmitDefer)) {
	      var args = arguments; // Check for an existing timeout

	      this._deferTimeout = this._deferTimeout || {};

	      if (this._deferTimeout[eventName]) {
	        clearTimeout(this._deferTimeout[eventName]);
	      } // Set a timeout


	      this._deferTimeout[eventName] = setTimeout(function () {
	        self.emit.apply(self, args);
	      }, 1);
	    } else {
	      this.emit.apply(this, arguments);
	    }

	    return this;
	  }
	};
	/**
	 * @class Emitter
	 * @param {Object=} obj The object / function / class to add event methods to.
	 * If none is provided a new object will be created. This allows you to use
	 * new Emitter() to generate an event emitter that is not tied to any other
	 * object or class.
	 * @param {Boolean=} prototypeMode Defaults to true. Set to true to add emitter
	 * methods to the the passed object"s prototype property e.g. obj.prototype.on
	 * = emitter.on. Set to false to add emitter methods the object directly e.g.
	 * obj.on = emitter.on.
	 * @constructor
	 */

	var Emitter = function Emitter(obj, prototypeMode) {
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


	  operateOnObject.on = EventMethods.on;
	  operateOnObject.off = EventMethods.off;
	  operateOnObject.one = EventMethods.one;
	  operateOnObject.once = EventMethods.once;
	  operateOnObject.emit = EventMethods.emit;
	  operateOnObject.emitId = EventMethods.emitId;
	  operateOnObject.emitStatic = EventMethods.emitStatic;
	  operateOnObject.emitStaticId = EventMethods.emitStaticId;
	  operateOnObject.cancelStatic = EventMethods.cancelStatic;
	  operateOnObject.deferEmit = EventMethods.deferEmit;
	  operateOnObject.willEmit = EventMethods.willEmit;
	  operateOnObject.willEmitId = EventMethods.willEmitId;
	  operateOnObject._processRemovalQueue = EventMethods._processRemovalQueue;
	  return obj;
	};

	Emitter.prototype = EventMethods;
	module.exports = Emitter;

/***/ }),
/* 24 */
/***/ (function(module, exports) {

	"use strict";

	/**
	 * Allows a method to accept overloaded calls with different parameters controlling
	 * which passed overload function is called.
	 * @param {Object} def
	 * @returns {Function}
	 * @constructor
	 */
	var Overload = function (def) {
		if (def) {
			var self = this,
				index,
				count,
				tmpDef,
				defNewKey,
				sigIndex,
				signatures;

			if (!(def instanceof Array)) {
				tmpDef = {};

				// Def is an object, make sure all prop names are devoid of spaces
				for (index in def) {
					if (def.hasOwnProperty(index)) {
						defNewKey = index.replace(/ /g, '');

						// Check if the definition array has a * string in it
						if (defNewKey.indexOf('*') === -1) {
							// No * found
							tmpDef[defNewKey] = def[index];
						} else {
							// A * was found, generate the different signatures that this
							// definition could represent
							signatures = this.generateSignaturePermutations(defNewKey);

							for (sigIndex = 0; sigIndex < signatures.length; sigIndex++) {
								if (!tmpDef[signatures[sigIndex]]) {
									tmpDef[signatures[sigIndex]] = def[index];
								}
							}
						}
					}
				}

				def = tmpDef;
			}

			return function () {
				var arr = [],
					lookup,
					type;

				// Check if we are being passed a key/function object or an array of functions
				if (def instanceof Array) {
					// We were passed an array of functions
					count = def.length;
					for (index = 0; index < count; index++) {
						if (def[index].length === arguments.length) {
							return self.callExtend(this, '$main', def, def[index], arguments);
						}
					}
				} else {
					// Generate lookup key from arguments
					// Copy arguments to an array
					for (index = 0; index < arguments.length; index++) {
						type = typeof arguments[index];

						// Handle detecting arrays
						if (type === 'object' && arguments[index] instanceof Array) {
							type = 'array';
						}

						// Handle been presented with a single undefined argument
						if (arguments.length === 1 && type === 'undefined') {
							break;
						}

						// Add the type to the argument types array
						arr.push(type);
					}

					lookup = arr.join(',');

					// Check for an exact lookup match
					if (def[lookup]) {
						return self.callExtend(this, '$main', def, def[lookup], arguments);
					} else {
						for (index = arr.length; index >= 0; index--) {
							// Get the closest match
							lookup = arr.slice(0, index).join(',');

							if (def[lookup + ',...']) {
								// Matched against arguments + "any other"
								return self.callExtend(this, '$main', def, def[lookup + ',...'], arguments);
							}
						}
					}
				}

				throw('Irrelon Overload: Overloaded method does not have a matching signature for the passed arguments: ' + JSON.stringify(arr));
			};
		}

		return function () {};
	};

	/**
	 * Generates an array of all the different definition signatures that can be
	 * created from the passed string with a catch-all wildcard *. E.g. it will
	 * convert the signature: string,*,string to all potentials:
	 * string,string,string
	 * string,number,string
	 * string,object,string,
	 * string,function,string,
	 * string,undefined,string
	 *
	 * @param {String} str Signature string with a wildcard in it.
	 * @returns {Array} An array of signature strings that are generated.
	 */
	Overload.prototype.generateSignaturePermutations = function (str) {
		var signatures = [],
			newSignature,
			types = ['string', 'object', 'number', 'function', 'undefined'],
			index;

		if (str.indexOf('*') > -1) {
			// There is at least one "any" type, break out into multiple keys
			// We could do this at query time with regular expressions but
			// would be significantly slower
			for (index = 0; index < types.length; index++) {
				newSignature = str.replace('*', types[index]);
				signatures = signatures.concat(this.generateSignaturePermutations(newSignature));
			}
		} else {
			signatures.push(str);
		}

		return signatures;
	};

	Overload.prototype.callExtend = function (context, prop, propContext, func, args) {
		var tmp,
			ret;

		if (context && propContext[prop]) {
			tmp = context[prop];

			context[prop] = propContext[prop];
			ret = func.apply(context, args);
			context[prop] = tmp;

			return ret;
		} else {
			return func.apply(context, args);
		}
	};

	module.exports = Overload;

/***/ }),
/* 25 */
/***/ (function(module, exports) {

	"use strict";

	var jsonEncoder = {
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
/* 26 */
/***/ (function(module, exports) {

	"use strict";

	var DISCONNECTED = 0;
	var CONNECTING = 1;
	var CONNECTED = 2;
	var READY = 3;
	var STARTED = 4;
	var STOPPED = 5;
	var CLIENT = 6;
	var SERVER = 7;
	var COMMAND = "command";
	var CMD_PING = "ping";
	var CMD_COMMAND_MAP = "commandMap";
	var CMD_DEFINE_COMMAND = "defineCommand";
	var CMD_READY = "ready";
	var CMD_REQUEST = "request";
	var CMD_RESPONSE = "response";
	var CMD_MESSAGE = "message";
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
	  DISCONNECTED: DISCONNECTED,
	  CONNECTING: CONNECTING,
	  CONNECTED: CONNECTED,
	  READY: READY,
	  STARTED: STARTED,
	  STOPPED: STOPPED,
	  CLIENT: CLIENT,
	  SERVER: SERVER,
	  COMMAND: COMMAND,
	  // Commands
	  CMD_COMMAND_MAP: CMD_COMMAND_MAP,
	  CMD_DEFINE_COMMAND: CMD_DEFINE_COMMAND,
	  CMD_MESSAGE: CMD_MESSAGE,
	  CMD_PING: CMD_PING,
	  CMD_READY: CMD_READY,
	  CMD_REQUEST: CMD_REQUEST,
	  CMD_RESPONSE: CMD_RESPONSE,
	  // Events
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
/* 27 */
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
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var _interopRequireDefault = __webpack_require__(2);

	var _slicedToArray2 = _interopRequireDefault(__webpack_require__(17));

	var _classCallCheck2 = _interopRequireDefault(__webpack_require__(5));

	var _createClass2 = _interopRequireDefault(__webpack_require__(6));

	var _assertThisInitialized2 = _interopRequireDefault(__webpack_require__(7));

	var _get2 = _interopRequireDefault(__webpack_require__(12));

	var _inherits2 = _interopRequireDefault(__webpack_require__(8));

	var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(10));

	var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(14));

	var _defineProperty2 = _interopRequireDefault(__webpack_require__(3));

	function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

	function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

	var WebSocket = __webpack_require__(15);

	var SocketBase = __webpack_require__(16);

	var _require = __webpack_require__(27),
	    hexId = _require.hexId;

	var _require2 = __webpack_require__(26),
	    SERVER = _require2.SERVER,
	    STARTED = _require2.STARTED,
	    STOPPED = _require2.STOPPED;

	var SocketServer = /*#__PURE__*/function (_SocketBase) {
	  (0, _inherits2["default"])(SocketServer, _SocketBase);

	  var _super = _createSuper(SocketServer);

	  function SocketServer() {
	    var _this;

	    var serverName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "Server";
	    (0, _classCallCheck2["default"])(this, SocketServer);
	    _this = _super.call(this, SERVER, serverName);
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

	      _this.sendCommand(CMD_COMMAND_MAP, _this._commandMap, socket.id);

	      _this.sendCommand(CMD_READY, "", socket.id);

	      _this.emit(EVT_CLIENT_CONNECT, socket.id);
	    });

	    _this.on(CMD_REQUEST, "GET", function (_ref) {
	      var data = _ref.data,
	          response = _ref.response,
	          clientId = _ref.clientId;
	      _this._httpMethodHandlers.GET = _this._httpMethodHandlers.GET || {};

	      _this._httpMethodHandlers.GET[data.url]({
	        "body": data,
	        clientId: clientId
	      }, {
	        "send": response
	      });
	    });

	    _this.on(CMD_REQUEST, "POST", function (_ref2) {
	      var data = _ref2.data,
	          response = _ref2.response,
	          clientId = _ref2.clientId;
	      _this._httpMethodHandlers.POST = _this._httpMethodHandlers.POST || {};

	      _this._httpMethodHandlers.POST[data.url]({
	        "body": data,
	        clientId: clientId
	      }, {
	        "send": response
	      });
	    });

	    _this.on(CMD_REQUEST, "PUT", function (_ref3) {
	      var data = _ref3.data,
	          response = _ref3.response,
	          clientId = _ref3.clientId;
	      _this._httpMethodHandlers.PUT = _this._httpMethodHandlers.PUT || {};

	      _this._httpMethodHandlers.PUT[data.url]({
	        "body": data,
	        clientId: clientId
	      }, {
	        "send": response
	      });
	    });

	    _this.on(CMD_REQUEST, "DELETE", function (_ref4) {
	      var data = _ref4.data,
	          response = _ref4.response,
	          clientId = _ref4.clientId;
	      _this._httpMethodHandlers.DELETE = _this._httpMethodHandlers.DELETE || {};

	      _this._httpMethodHandlers.DELETE[data.url]({
	        "body": data,
	        clientId: clientId
	      }, {
	        "send": response
	      });
	    });

	    return _this;
	  }

	  (0, _createClass2["default"])(SocketServer, [{
	    key: "start",
	    value: function start() {
	      var port = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 8080;

	      if (this.state() === STARTED) {
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
	      this.state(STARTED);
	    }
	  }, {
	    key: "stop",
	    value: function stop() {
	      this._socket.close();

	      this.emit(EVT_STOPPED);
	      this.state(STOPPED);
	    }
	  }, {
	    key: "broadcastCommand",
	    value: function broadcastCommand(cmd, data) {
	      var _this2 = this;

	      Object.entries(this._socketById).forEach(function (_ref5) {
	        var _ref6 = (0, _slicedToArray2["default"])(_ref5, 2),
	            key = _ref6[0],
	            socket = _ref6[1];

	        (0, _get2["default"])((0, _getPrototypeOf2["default"])(SocketServer.prototype), "sendCommand", _this2).call(_this2, cmd, data, socket);
	      });
	    }
	  }, {
	    key: "sendCommand",
	    value: function sendCommand(cmd, data, socketId) {
	      if (!socketId) return this.broadcastCommand(cmd, data);
	      var socket = this._socketById[socketId];
	      if (!socket) return this.log("Socket required to send message!");
	      (0, _get2["default"])((0, _getPrototypeOf2["default"])(SocketServer.prototype), "sendCommand", this).call(this, cmd, data, socket);
	    }
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
	  }, {
	    key: "GET",
	    value: function GET(url, callback) {
	      this._httpMethodHandlers.GET = this._httpMethodHandlers.GET || {};
	      this._httpMethodHandlers.GET[url] = callback;
	    }
	  }, {
	    key: "POST",
	    value: function POST(url, callback) {
	      this._httpMethodHandlers.POST = this._httpMethodHandlers.POST || {};
	      this._httpMethodHandlers.POST[url] = callback;
	    }
	  }, {
	    key: "PUT",
	    value: function PUT(url, callback) {
	      this._httpMethodHandlers.PUT = this._httpMethodHandlers.PUT || {};
	      this._httpMethodHandlers.PUT[url] = callback;
	    }
	  }, {
	    key: "DELETE",
	    value: function DELETE(url, callback) {
	      this._httpMethodHandlers.DELETE = this._httpMethodHandlers.DELETE || {};
	      this._httpMethodHandlers.DELETE[url] = callback;
	    }
	  }, {
	    key: "send",
	    value: function send(data, socketId) {
	      this.sendCommand("genericMessage", data, socketId);
	    }
	  }, {
	    key: "_onClientDisconnect",
	    value: function _onClientDisconnect(data, socket) {
	      this.emitId(EVT_CLIENT_DISCONNECT, socket.id, data);
	      delete this._socketById[socket.id];
	    }
	  }, {
	    key: "_onMessageFromClient",
	    value: function _onMessageFromClient(rawMessage, socket) {
	      (0, _get2["default"])((0, _getPrototypeOf2["default"])(SocketServer.prototype), "_onMessage", this).call(this, rawMessage, socket.id);
	    }
	  }, {
	    key: "_onRequest",
	    value: function _onRequest(requestName, requestId, data, response, socketId) {
	      this.log("_onRequest requestId", requestId, "socketId", socketId);
	      this._requestById[requestId] = socketId;
	      (0, _get2["default"])((0, _getPrototypeOf2["default"])(SocketServer.prototype), "_onRequest", this).call(this, requestName, requestId, data, response, socketId);
	    }
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