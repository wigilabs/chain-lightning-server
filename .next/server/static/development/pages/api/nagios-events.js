module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = require('../../../../ssr-module-cache.js');
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete installedModules[moduleId];
/******/ 		}
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./pages/api/nagios-events.js":
/*!************************************!*\
  !*** ./pages/api/nagios-events.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var micro_cors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! micro-cors */ "micro-cors");
/* harmony import */ var micro_cors__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(micro_cors__WEBPACK_IMPORTED_MODULE_0__);

const cors = micro_cors__WEBPACK_IMPORTED_MODULE_0___default()();

const superagent = __webpack_require__(/*! superagent */ "superagent");

function getState(s) {
  console.log('getState: ');
  if (s.includes('CRITICAL')) return 0;
  if (s.includes('WARNING')) return 1;
  return 2;
}

const handler = (req, res) => {
  let events;
  superagent.get('https://insights-api.newrelic.com/v1/accounts/2482859/query?nrql=SELECT+*+FROM+NagiosReport+SINCE+5+minutes+ago').set('X-Query-Key', 'NRIQ-j7zJFckfarn9jsOB-nPscK5H6z0QCgHd').set('Accept', 'application/json').end((err, response) => {
    events = JSON.parse(response.text).results[0].events;
    let dObj = events[0];
    let value_load = dObj['Current Load\n'].includes('CRITICAL') || dObj['Current Load\n'].includes('WARNING') || dObj['Current Load\n'].includes('WARNING:') ? 0 : 1;
    let value_users = dObj['Current Users\n'].includes('CRITICAL') || dObj['Current Users\n'].includes('WARNING') || dObj['Current Users\n'].includes('WARNING:') ? 0 : 1;
    let value_http = dObj['HTTP\n'].includes('CRITICAL') || dObj['HTTP\n'].includes('WARNING') || dObj['HTTP\n'].includes('WARNING:') ? 0 : 1;
    let ping_value = dObj['PING\n'].includes('CRITICAL') || dObj['PING\n'].includes('WARNING') || dObj['PING\n'].includes('WARNING:') ? 0 : 1;
    let root_partition = dObj['Root Partition\n'].includes('CRITICAL') || dObj['Root Partition\n'].includes('WARNING') || dObj['Root Partition\n'].includes('WARNING:') ? 0 : 1;
    let ssh_value = dObj['SSH\n'].includes('CRITICAL') || dObj['SSH\n'].includes('WARNING') || dObj['SSH\n'].includes('WARNING:') ? 0 : 1;
    let swap_value = dObj['Swap Usage\n'].includes('CRITICAL') || dObj['Swap Usage\n'].includes('WARNING') || dObj['Swap Usage\n'].includes('WARNING:') ? 0 : 1;
    let total_value = dObj['Total Processes\n'].includes('CRITICAL') || dObj['Total Processes\n'].includes('WARNING') || dObj['Total Processes\n'].includes('WARNING:') ? 0 : 1; // calculate states

    let state_load = getState(dObj['Current Load\n']);
    let state_users = getState(dObj['Current Users\n']);
    let state_http = getState(dObj['HTTP\n']);
    let state_ping = getState(dObj['PING\n']);
    let state_root = getState(dObj['Root Partition\n']);
    let state_ssh = getState(dObj['SSH\n']);
    let state_swap = getState(dObj['Swap Usage\n']);
    let state_total = getState(dObj['Total Processes\n']); //detalles

    let detail_load = dObj['Current Load\n'];
    let detail_users = dObj['Current Users\n'];
    let detail_http = dObj['HTTP\n'];
    let detail_ping = dObj['PING\n'];
    let detail_root_patition = dObj['Root Partition\n'];
    let detail_ssh = dObj['SSH\n'];
    let detail_swap = dObj['Swap Usage\n'];
    let detail_total = dObj['Total Processes\n']; //final object

    events = [{
      name: 'Current Load',
      value: value_load,
      msg: detail_load,
      state: state_load
    }, {
      name: 'Current Users',
      value: value_users,
      msg: detail_users,
      state: state_users
    }, {
      name: 'HTTP',
      value: value_http,
      msg: detail_http,
      state: state_http
    }, {
      name: 'PING',
      value: ping_value,
      msg: detail_ping,
      state: state_ping
    }, {
      name: 'Root Partition',
      value: root_partition,
      msg: detail_root_patition,
      state: state_root
    }, {
      name: 'SSH',
      value: ssh_value,
      msg: detail_ssh,
      state: state_ssh
    }, {
      name: 'Swap Usage',
      value: swap_value,
      msg: detail_swap,
      state: state_swap
    }, {
      name: 'Total Processes',
      value: total_value,
      msg: detail_total,
      state: state_total
    }];
    events.sort(function (a, b) {
      return a.state - b.state;
    });
    return res.json(events);
  });
};

/* harmony default export */ __webpack_exports__["default"] = (cors(handler));

/***/ }),

/***/ 3:
/*!******************************************!*\
  !*** multi ./pages/api/nagios-events.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/diterevan/Documents/projects/chain-lightning-server/pages/api/nagios-events.js */"./pages/api/nagios-events.js");


/***/ }),

/***/ "micro-cors":
/*!*****************************!*\
  !*** external "micro-cors" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("micro-cors");

/***/ }),

/***/ "superagent":
/*!*****************************!*\
  !*** external "superagent" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("superagent");

/***/ })

/******/ });
//# sourceMappingURL=nagios-events.js.map