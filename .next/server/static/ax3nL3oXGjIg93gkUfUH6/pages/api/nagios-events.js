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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("BtpO");


/***/ }),

/***/ "BtpO":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const superagent = __webpack_require__("iHmL");

const handler = (req, res) => {
  let events;
  superagent.get('https://insights-api.newrelic.com/v1/accounts/2482859/query?nrql=SELECT+*+FROM+NagiosReport+SINCE+5+minutes+ago').set('X-Query-Key', 'NRIQ-j7zJFckfarn9jsOB-nPscK5H6z0QCgHd').set('Accept', 'application/json').end((err, response) => {
    events = JSON.parse(response.text).results[0].events;
    let dObj = events[0]; //console.log('events: ', dObj)

    let value_load = dObj['Current Load\n'].includes('CRITICAL') ? 0 : 1;
    let value_users = dObj['Current Users\n'].includes('CRITICAL') ? 0 : 1;
    let value_http = dObj['HTTP\n'].includes('CRITICAL') ? 0 : 1;
    let ping_value = dObj['PING\n'].includes('CRITICAL') ? 0 : 1;
    let root_partition = dObj['Root Partition\n'].includes('CRITICAL') ? 0 : 1;
    let ssh_value = dObj['SSH\n'].includes('CRITICAL') ? 0 : 1;
    let swap_value = dObj['Swap Usage\n'].includes('CRITICAL') ? 0 : 1;
    let total_value = dObj['Total Processes\n'].includes('CRITICAL') ? 0 : 1; //detalles

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
      msg: detail_load
    }, {
      name: 'Current Users',
      value: value_users,
      msg: detail_users
    }, {
      name: 'HTTP',
      value: value_http,
      msg: detail_http
    }, {
      name: 'PING',
      value: ping_value,
      msg: detail_ping
    }, {
      name: 'Root Partition',
      value: root_partition,
      msg: detail_root_patition
    }, {
      name: 'SSH',
      value: ssh_value,
      msg: detail_ssh
    }, {
      name: 'Swap Usage',
      value: swap_value,
      msg: detail_swap
    }, {
      name: 'Total Processes',
      value: total_value,
      msg: detail_total
    }];
    console.log(events);
    return res.json(events);
  });
};

/* harmony default export */ __webpack_exports__["default"] = (handler);

/***/ }),

/***/ "iHmL":
/***/ (function(module, exports) {

module.exports = require("superagent");

/***/ })

/******/ });