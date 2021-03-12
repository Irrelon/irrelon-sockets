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

	var Server = __webpack_require__(20);

	module.exports = {
	  Client: Client,
	  Server: Server
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

	var _require = __webpack_require__(19),
	    CLIENT = _require.CLIENT,
	    COMMAND = _require.COMMAND;

	var SocketClient = /*#__PURE__*/function (_SocketBase) {
	  (0, _inherits2["default"])(SocketClient, _SocketBase);

	  var _super = _createSuper(SocketClient);

	  function SocketClient() {
	    var _thisSuper, _this;

	    (0, _classCallCheck2["default"])(this, SocketClient);
	    _this = _super.call(this, CLIENT); // Define the default command listeners

	    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onConnected", function () {
	      _this.emit("connected");
	    });
	    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onMessageFromServer", function (rawMessage) {
	      (0, _get2["default"])((_thisSuper = (0, _assertThisInitialized2["default"])(_this), (0, _getPrototypeOf2["default"])(SocketClient.prototype)), "_onMessage", _thisSuper).call(_thisSuper, rawMessage);
	    });
	    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onCommandMap", function (data) {
	      console.log("_onCommandMap", data);

	      _this.commandMap(data);
	    });
	    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onDefineCommand", function (data) {
	      console.log("_onDefineCommand", data);

	      _this.defineCommand(data);
	    });

	    _this.on(COMMAND, "commandMap", _this._onCommandMap);

	    _this.on(COMMAND, "defineCommand", _this._onDefineCommand);

	    return _this;
	  }

	  (0, _createClass2["default"])(SocketClient, [{
	    key: "connect",
	    value: function connect(host) {
	      this._socket = new WebSocket(host);
	      this._socket.onopen = this._onConnected;
	      this._socket.onmessage = this._onMessageFromServer;
	    }
	  }, {
	    key: "sendCommand",
	    value: function sendCommand(cmd, data) {
	      return (0, _get2["default"])((0, _getPrototypeOf2["default"])(SocketClient.prototype), "sendCommand", this).call(this, cmd, data, this._socket);
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

	var _classCallCheck2 = _interopRequireDefault(__webpack_require__(4));

	var _createClass2 = _interopRequireDefault(__webpack_require__(5));

	var _defineProperty2 = _interopRequireDefault(__webpack_require__(14));

	var Emitter = __webpack_require__(17);

	var _require = __webpack_require__(19),
	    COMMAND = _require.COMMAND;

	var _require2 = __webpack_require__(19),
	    CLIENT = _require2.CLIENT;

	var _require3 = __webpack_require__(19),
	    DISCONNECTED = _require3.DISCONNECTED;

	var SocketBase = /*#__PURE__*/function () {
	  function SocketBase(env) {
	    var _this = this;

	    (0, _classCallCheck2["default"])(this, SocketBase);
	    (0, _defineProperty2["default"])(this, "_socketById", {});
	    (0, _defineProperty2["default"])(this, "_commandMap", ["commandMap", "defineCommand"]);
	    (0, _defineProperty2["default"])(this, "_idCounter", 0);
	    (0, _defineProperty2["default"])(this, "_state", DISCONNECTED);
	    (0, _defineProperty2["default"])(this, "state", function (newState) {
	      if (newState === undefined) return _this._state;
	      _this._state = newState;

	      _this.emit("state", newState);
	    });
	    this._env = env;
	  }

	  (0, _createClass2["default"])(SocketBase, [{
	    key: "log",
	    value: function log() {
	      var _console$log;

	      (_console$log = console.log).apply.apply(_console$log, arguments);
	    }
	    /**
	     * Generates a new 16-character hexadecimal unique ID
	     * @return {String} The id.
	     */

	  }, {
	    key: "hexId",
	    value: function hexId() {
	      this._idCounter++;
	      return (this._idCounter + (Math.random() * Math.pow(10, 17) + Math.random() * Math.pow(10, 17) + Math.random() * Math.pow(10, 17) + Math.random() * Math.pow(10, 17))).toString(16);
	    }
	  }, {
	    key: "commandMap",
	    value: function commandMap(_commandMap) {
	      if (_commandMap === undefined) return this._commandMap;
	      this._commandMap = _commandMap;
	    }
	  }, {
	    key: "defineCommand",
	    value: function defineCommand(command) {
	      var existingCommandId = this.idByCommand(command);
	      if (existingCommandId > -1) return existingCommandId; // Add the new command

	      this._commandMap.push(command);

	      if (this._env === CLIENT) return this._commandMap.length - 1; // Update any connected clients with the new command

	      this.sendCommand("defineCommand", this._commandMap.length - 1);
	      return this._commandMap.length - 1;
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
	      if (!socket) return;
	      var commandId = this.defineCommand(cmd);
	      var message = [commandId, data];
	      console.log("sendCommand", message);
	      socket.send(JSON.stringify(message));
	    }
	  }, {
	    key: "_onMessage",
	    value: function _onMessage(rawMessage) {
	      console.log("Raw message incoming", rawMessage);
	      var message = JSON.parse(rawMessage.data);
	      var commandId = message[0];
	      var data = message[1];
	      var command = this.commandById(commandId);
	      console.log("Emitting", COMMAND, command, data);
	      this.emitId(COMMAND, command, data);
	      return {
	        message: message,
	        commandId: commandId,
	        command: command,
	        data: data
	      };
	    }
	  }, {
	    key: "_encode",
	    value: function _encode(data) {
	      return JSON.stringify(data);
	    }
	  }, {
	    key: "_decode",
	    value: function _decode(data) {
	      return JSON.parse(data);
	    }
	  }]);
	  return SocketBase;
	}();

	Emitter(SocketBase);
	module.exports = SocketBase;

/***/ }),
/* 17 */
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

	var Overload = __webpack_require__(18);

	var EventMethods = {
	  on: new Overload({
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
	      var self = this,
	          generateTimeout,
	          emitter,
	          i;

	      generateTimeout = function generateTimeout(emitter) {
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
	        for (i = 0; i < this._emitters[event].length; i++) {
	          emitter = this._emitters[event];

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
	  once: new Overload({
	    /**
	     * Attach an event listener to the passed event which will only fire once.
	     * @memberof Emitter
	     * @method once
	     * @param {String} event The name of the event to listen for.
	     * @param {Function} listener The method to call when the event is fired.
	     */
	    "string, function": function stringFunction(event, listener) {
	      var self = this,
	          fired = false,
	          internalCallback = function internalCallback() {
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
	      var self = this,
	          fired = false,
	          internalCallback = function internalCallback() {
	        if (!fired) {
	          fired = true;
	          self.off(event, id, internalCallback);
	          listener.apply(self, arguments);
	        }
	      };

	      return this.on(event, id, internalCallback);
	    }
	  }),
	  one: new Overload({
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
	  off: new Overload({
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
	      var self = this,
	          arr,
	          index;

	      if (this._emitting) {
	        this._eventRemovalQueue = this._eventRemovalQueue || [];

	        this._eventRemovalQueue.push(function () {
	          self.off(event, listener);
	        });
	      } else {
	        if (typeof listener === "string") {
	          if (this._listeners && this._listeners[event] && this._listeners[event][listener]) {
	            delete this._listeners[event][listener];
	          }
	        } else {
	          if (this._listeners && this._listeners[event]) {
	            arr = this._listeners[event]["*"] || [];
	            index = arr.indexOf(listener);

	            if (index > -1) {
	              arr.splice(index, 1);
	            }
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
	      } else {
	        if (this._listeners && this._listeners[event] && this._listeners[event][id]) {
	          // Kill all listeners for this event id
	          delete this._listeners[event][id];
	        }
	      }
	    }
	  }),
	  emit: new Overload({
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

	      if (this._listeners[event]) {
	        var arrIndex, arrCount, tmpFunc, arr; // Handle global emit

	        if (this._listeners[event][id]) {
	          arr = this._listeners[event][id];
	          arrCount = arr.length;

	          for (arrIndex = 0; arrIndex < arrCount; arrIndex++) {
	            // Check we have a function to execute
	            tmpFunc = arr[arrIndex];

	            if (typeof tmpFunc === "function") {
	              tmpFunc.apply(this, Array.prototype.slice.call(arguments, 1));
	            }
	          }
	        }
	      }

	      this._emitting = false;

	      this._processRemovalQueue();

	      return this;
	    }
	  }),
	  emitId: new Overload({
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

	      if (this._listeners[event]) {
	        var arrIndex, arrCount, tmpFunc, arr; // Handle global emit

	        if (this._listeners[event]["*"]) {
	          arr = this._listeners[event]["*"];
	          arrCount = arr.length;

	          for (arrIndex = 0; arrIndex < arrCount; arrIndex++) {
	            // Check we have a function to execute
	            tmpFunc = arr[arrIndex];

	            if (typeof tmpFunc === "function") {
	              tmpFunc.apply(this, Array.prototype.slice.call(arguments, 2));
	            }
	          }
	        } // Handle id emit


	        if (this._listeners[event][id]) {
	          arr = this._listeners[event][id];
	          arrCount = arr.length;

	          for (arrIndex = 0; arrIndex < arrCount; arrIndex++) {
	            // Check we have a function to execute
	            tmpFunc = arr[arrIndex];

	            if (typeof tmpFunc === "function") {
	              tmpFunc.apply(this, Array.prototype.slice.call(arguments, 2));
	            }
	          }
	        }
	      }

	      this._emitting = false;

	      this._processRemovalQueue();

	      return this;
	    }
	  }),
	  emitStatic: new Overload({
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

	      if (this._listeners[event]) {
	        var arrIndex, arrCount, tmpFunc, arr; // Handle global emit

	        if (this._listeners[event][id]) {
	          arr = this._listeners[event][id];
	          arrCount = arr.length;

	          for (arrIndex = 0; arrIndex < arrCount; arrIndex++) {
	            // Check we have a function to execute
	            tmpFunc = arr[arrIndex];

	            if (typeof tmpFunc === "function") {
	              tmpFunc.apply(this, Array.prototype.slice.call(arguments, 1));
	            }
	          }
	        }
	      }

	      this._emitting = false;
	      this._emitters = this._emitters || {};
	      this._emitters[event] = this._emitters[event] || [];

	      this._emitters[event].push({
	        id: "*",
	        args: Array.prototype.slice.call(arguments, 1)
	      });

	      this._processRemovalQueue();

	      return this;
	    }
	  }),
	  emitStaticId: new Overload({
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
	        var arrIndex, arrCount, tmpFunc, arr; // Handle global emit

	        if (this._listeners[event]["*"]) {
	          arr = this._listeners[event]["*"];
	          arrCount = arr.length;

	          for (arrIndex = 0; arrIndex < arrCount; arrIndex++) {
	            // Check we have a function to execute
	            tmpFunc = arr[arrIndex];

	            if (typeof tmpFunc === "function") {
	              tmpFunc.apply(this, Array.prototype.slice.call(arguments, 2));
	            }
	          }
	        } // Handle id emit


	        if (this._listeners[event][id]) {
	          arr = this._listeners[event][id];
	          arrCount = arr.length;

	          for (arrIndex = 0; arrIndex < arrCount; arrIndex++) {
	            // Check we have a function to execute
	            tmpFunc = arr[arrIndex];

	            if (typeof tmpFunc === "function") {
	              tmpFunc.apply(this, Array.prototype.slice.call(arguments, 2));
	            }
	          }
	        }
	      }

	      this._emitting = false;
	      this._emitters = this._emitters || {};
	      this._emitters[event] = this._emitters[event] || [];

	      this._emitters[event].push({
	        id: id,
	        args: Array.prototype.slice.call(arguments, 2)
	      });

	      this._processRemovalQueue();

	      return this;
	    }
	  }),
	  cancelStatic: new Overload({
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
	  willEmit: function willEmit(event) {
	    var id = "*";

	    if (this._listeners && this._listeners[event]) {
	      var arrIndex, arrCount, tmpFunc, arr; // Handle global emit

	      if (this._listeners[event][id]) {
	        arr = this._listeners[event][id];
	        arrCount = arr.length;

	        for (arrIndex = 0; arrIndex < arrCount; arrIndex++) {
	          // Check we have a function to execute
	          tmpFunc = arr[arrIndex];

	          if (typeof tmpFunc === "function") {
	            return true;
	          }
	        }
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
	  willEmitId: function willEmitId(event, id) {
	    if (this._listeners && this._listeners[event]) {
	      var arrIndex, arrCount, tmpFunc, arr; // Handle global emit

	      if (this._listeners[event]["*"]) {
	        arr = this._listeners[event]["*"];
	        arrCount = arr.length;

	        for (arrIndex = 0; arrIndex < arrCount; arrIndex++) {
	          // Check we have a function to execute
	          tmpFunc = arr[arrIndex];

	          if (typeof tmpFunc === "function") {
	            return true;
	          }
	        }
	      } // Handle id emit


	      if (this._listeners[event][id]) {
	        arr = this._listeners[event][id];
	        arrCount = arr.length;

	        for (arrIndex = 0; arrIndex < arrCount; arrIndex++) {
	          // Check we have a function to execute
	          tmpFunc = arr[arrIndex];

	          if (typeof tmpFunc === "function") {
	            return true;
	          }
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
	  _processRemovalQueue: function _processRemovalQueue() {
	    var i;

	    if (this._eventRemovalQueue && this._eventRemovalQueue.length) {
	      // Execute each removal call
	      for (i = 0; i < this._eventRemovalQueue.length; i++) {
	        this._eventRemovalQueue[i]();
	      } // Clear the removal queue


	      this._eventRemovalQueue = [];
	    }
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
	  deferEmit: function deferEmit(eventName, data) {
	    var self = this,
	        args;

	    if (!this._noEmitDefer && (!this._db || this._db && !this._db._noEmitDefer)) {
	      args = arguments; // Check for an existing timeout

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
/* 18 */
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
/* 19 */
/***/ (function(module, exports) {

	"use strict";

	var DISCONNECTED = 0;
	var CONNECTING = 1;
	var CONNECTED = 2;
	var STARTED = 3;
	var STOPPED = 4;
	var CLIENT = 5;
	var SERVER = 6;
	var COMMAND = "command";
	module.exports = {
	  DISCONNECTED: DISCONNECTED,
	  CONNECTING: CONNECTING,
	  CONNECTED: CONNECTED,
	  STARTED: STARTED,
	  STOPPED: STOPPED,
	  CLIENT: CLIENT,
	  SERVER: SERVER,
	  COMMAND: COMMAND
	};

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var _interopRequireDefault = __webpack_require__(3);

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

	var _require = __webpack_require__(19),
	    COMMAND = _require.COMMAND;

	var _require2 = __webpack_require__(19),
	    SERVER = _require2.SERVER,
	    STARTED = _require2.STARTED,
	    STOPPED = _require2.STOPPED;

	var SocketServer = /*#__PURE__*/function (_SocketBase) {
	  (0, _inherits2["default"])(SocketServer, _SocketBase);

	  var _super = _createSuper(SocketServer);

	  function SocketServer() {
	    var _this;

	    (0, _classCallCheck2["default"])(this, SocketServer);
	    _this = _super.call(this, SERVER);
	    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onClientConnect", function (socket) {
	      socket.id = _this.hexId();
	      _this._socketById[socket.id] = socket;
	      socket.on("message", function (data) {
	        _this._onMessageFromClient(socket, data);
	      });
	      socket.on("disconnect", function (data) {
	        _this._onClientDisconnect(socket, data);
	      }); // Send initial data to the client

	      _this.sendCommand("commandMap", _this._commandMap, socket.id);

	      _this.emit("clientConnect", socket.id);
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

	      this.emit("started", {
	        port: port
	      });
	      this.state(STARTED);
	    }
	  }, {
	    key: "stop",
	    value: function stop() {
	      this._socket.close();

	      this.emit("stopped");
	      this.state(STOPPED);
	    }
	  }, {
	    key: "sendCommand",
	    value: function sendCommand(cmd, data, socketId) {
	      var socket = this._socketById[socketId];
	      if (!socket) return;
	      (0, _get2["default"])((0, _getPrototypeOf2["default"])(SocketServer.prototype), "sendCommand", this).call(this, cmd, data, socket);
	    }
	  }, {
	    key: "_onClientDisconnect",
	    value: function _onClientDisconnect(socket, data) {
	      this.emitId("clientDisconnect", socket.id, data);
	      delete this._socketById[socket.id];
	    }
	  }, {
	    key: "_onMessageFromClient",
	    value: function _onMessageFromClient(socket, rawMessage) {
	      (0, _get2["default"])((0, _getPrototypeOf2["default"])(SocketServer.prototype), "_onMessage", this).call(this, rawMessage);
	    }
	  }]);
	  return SocketServer;
	}(SocketBase);

	module.exports = SocketServer;

/***/ })
/******/ ]);