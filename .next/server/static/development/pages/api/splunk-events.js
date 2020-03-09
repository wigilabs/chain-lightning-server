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

/***/ "./pages/api/splunk-events.js":
/*!************************************!*\
  !*** ./pages/api/splunk-events.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var micro_cors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! micro-cors */ "micro-cors");
/* harmony import */ var micro_cors__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(micro_cors__WEBPACK_IMPORTED_MODULE_0__);

const cors = micro_cors__WEBPACK_IMPORTED_MODULE_0___default()();

const superagent = __webpack_require__(/*! superagent */ "superagent");

const handler = (req, res) => {
  let events;
  superagent.get('https://insights-api.newrelic.com/v1/accounts/2482859/query?nrql=SELECT+%60_raw%60%2C%60_sourcetype%60%2C%60source%60+FROM+splunkUpdateLogs%2C+splunkApacheAccess%2C+splunkApacheErrors%2C+splunkAuthLogs%2C+splunkHttp%2C+splunkKernel%2C+splunkSystemctl+WHERE+%60_raw%60+NOT+LIKE+%27%25CRON%25%27+LIMIT+6+').set('X-Query-Key', 'NRIQ-j7zJFckfarn9jsOB-nPscK5H6z0QCgHd').set('Accept', 'application/json').end((err, response) => {
    events = JSON.parse(response.text).results[0].events;
    let name1 = events[0]._sourcetype;
    let eval1 = events[0]._raw;
    let value1 = eval1.includes('not found or unable to stat') || eval1.includes('[:error]') || eval1.includes('deprecated') || eval1.includes('invalid') || eval1.includes('error') ? 0 : 1;
    let name2 = events[1]._sourcetype;
    let eval2 = events[1]._raw;
    let value2 = eval2.includes('not found or unable to stat') || eval2.includes('[:error]') || eval2.includes('deprecated') || eval2.includes('invalid') || eval2.includes('error') ? 0 : 1;
    let name3 = events[2]._sourcetype;
    let eval3 = events[2]._raw;
    let value3 = eval3.includes('not found or unable to stat') || eval3.includes('[:error]') || eval3.includes('deprecated') || eval3.includes('invalid') || eval3.includes('error') ? 0 : 1;
    let name4 = events[3]._sourcetype;
    let eval4 = events[3]._raw;
    let value4 = eval4.includes('not found or unable to stat') || eval4.includes('[:error]') || eval4.includes('deprecated') || eval4.includes('invalid') || eval4.includes('error') ? 0 : 1;
    let name5 = events[4]._sourcetype;
    let eval5 = events[4]._raw;
    let value5 = eval5.includes('not found or unable to stat') || eval5.includes('[:error]') || eval5.includes('deprecated') || eval5.includes('invalid') || eval5.includes('error') ? 0 : 1;
    let name6 = events[5]._sourcetype;
    let eval6 = events[5]._raw;
    let value6 = eval6.includes('not found or unable to stat') || eval6.includes('[:error]') || eval6.includes('deprecated') || eval6.includes('invalid') || eval6.includes('error') ? 0 : 1;
    let parsed = [{
      name: name1,
      value: value1,
      msg: eval1
    }, {
      name: name2,
      value: value2,
      msg: eval2
    }, {
      name: name3,
      value: value3,
      msg: eval3
    }, {
      name: name4,
      value: value4,
      msg: eval4
    }, {
      name: name5,
      value: value5,
      msg: eval5
    }, {
      name: name6,
      value: value6,
      msg: eval6
    }];
    console.log(parsed);
    return res.json(parsed);
  });
};

/* harmony default export */ __webpack_exports__["default"] = (cors(handler));

/***/ }),

/***/ 3:
/*!******************************************!*\
  !*** multi ./pages/api/splunk-events.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\Users\fsoler\Desktop\chain-lightning-server\pages\api\splunk-events.js */"./pages/api/splunk-events.js");


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
//# sourceMappingURL=splunk-events.js.map