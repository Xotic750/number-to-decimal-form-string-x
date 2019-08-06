/*!
{
  "author": "Graham Fairweather",
  "copywrite": "Copyright (c) 2017-present",
  "date": "2019-08-06T00:38:06.650Z",
  "describe": "",
  "description": "Convert a base-10 or scientific E-notation value to a decimal form string.",
  "file": "number-to-decimal-form-string-x.js",
  "hash": "fdc42172392c8a8ca64e",
  "license": "MIT",
  "version": "2.0.18"
}
*/
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["numberToDecimalFormStringX"] = factory();
	else
		root["numberToDecimalFormStringX"] = factory();
})((function () {
  'use strict';

  if (typeof self !== 'undefined') {
    return self;
  }

  if (typeof window !== 'undefined') {
    return window;
  }

  if (typeof global !== 'undefined') {
    return global;
  }

  return Function('return this')();
}()), function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
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
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
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
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var toStr = Object.prototype.toString;
var hasSymbols = __webpack_require__(1)();

if (hasSymbols) {
	var symToStr = Symbol.prototype.toString;
	var symStringRegex = /^Symbol\(.*\)$/;
	var isSymbolObject = function isRealSymbolObject(value) {
		if (typeof value.valueOf() !== 'symbol') {
			return false;
		}
		return symStringRegex.test(symToStr.call(value));
	};

	module.exports = function isSymbol(value) {
		if (typeof value === 'symbol') {
			return true;
		}
		if (toStr.call(value) !== '[object Symbol]') {
			return false;
		}
		try {
			return isSymbolObject(value);
		} catch (e) {
			return false;
		}
	};
} else {

	module.exports = function isSymbol(value) {
		// this environment does not support Symbols.
		return  false && false;
	};
}


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var origSymbol = global.Symbol;
var hasSymbolSham = __webpack_require__(3);

module.exports = function hasNativeSymbols() {
	if (typeof origSymbol !== 'function') { return false; }
	if (typeof Symbol !== 'function') { return false; }
	if (typeof origSymbol('foo') !== 'symbol') { return false; }
	if (typeof Symbol('bar') !== 'symbol') { return false; }

	return hasSymbolSham();
};

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(2)))

/***/ }),
/* 2 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* eslint complexity: [2, 17], max-statements: [2, 33] */
module.exports = function hasSymbols() {
	if (typeof Symbol !== 'function' || typeof Object.getOwnPropertySymbols !== 'function') { return false; }
	if (typeof Symbol.iterator === 'symbol') { return true; }

	var obj = {};
	var sym = Symbol('test');
	var symObj = Object(sym);
	if (typeof sym === 'string') { return false; }

	if (Object.prototype.toString.call(sym) !== '[object Symbol]') { return false; }
	if (Object.prototype.toString.call(symObj) !== '[object Symbol]') { return false; }

	// temp disabled per https://github.com/ljharb/object.assign/issues/17
	// if (sym instanceof Symbol) { return false; }
	// temp disabled per https://github.com/WebReflection/get-own-property-symbols/issues/4
	// if (!(symObj instanceof Symbol)) { return false; }

	// if (typeof Symbol.prototype.toString !== 'function') { return false; }
	// if (String(sym) !== Symbol.prototype.toString.call(sym)) { return false; }

	var symVal = 42;
	obj[sym] = symVal;
	for (sym in obj) { return false; } // eslint-disable-line no-restricted-syntax
	if (typeof Object.keys === 'function' && Object.keys(obj).length !== 0) { return false; }

	if (typeof Object.getOwnPropertyNames === 'function' && Object.getOwnPropertyNames(obj).length !== 0) { return false; }

	var syms = Object.getOwnPropertySymbols(obj);
	if (syms.length !== 1 || syms[0] !== sym) { return false; }

	if (!Object.prototype.propertyIsEnumerable.call(obj, sym)) { return false; }

	if (typeof Object.getOwnPropertyDescriptor === 'function') {
		var descriptor = Object.getOwnPropertyDescriptor(obj, sym);
		if (descriptor.value !== symVal || descriptor.enumerable !== true) { return false; }
	}

	return true;
};


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/is-symbol/index.js
var is_symbol = __webpack_require__(0);
var is_symbol_default = /*#__PURE__*/__webpack_require__.n(is_symbol);

// CONCATENATED MODULE: ./node_modules/to-string-x/dist/to-string-x.esm.js

var ERROR_MESSAGE = 'Cannot convert a Symbol value to a string';
var castString = ERROR_MESSAGE.constructor;
/**
 * The abstract operation ToString converts argument to a value of type String.
 *
 * @param {*} [value] - The value to convert to a string.
 * @throws {TypeError} If `value` is a Symbol.
 * @returns {string} The converted value.
 */

var to_string_x_esm_ToString = function ToString(value) {
  if (is_symbol_default()(value)) {
    throw new TypeError(ERROR_MESSAGE);
  }

  return castString(value);
};

/* harmony default export */ var to_string_x_esm = (to_string_x_esm_ToString);


// CONCATENATED MODULE: ./dist/number-to-decimal-form-string-x.esm.js

var castNumber = 0 .constructor;
var emptyString = '';
var charAt = emptyString.charAt,
    slice = emptyString.slice,
    search = emptyString.search,
    replace = emptyString.replace,
    indexOf = emptyString.indexOf;
var join = [].join;
var decimalMark = '.';
var hyphenMinus = '-';
var zeroSymbol = '0';
var minusZeroSymbol = '-0';
var isValid = /^-?(?:(?:\d|[1-9]\d*)(?:\.\d+)?)(?:e[+-]?\d+)?$/i;
var test = isValid.test;
var errorMsg = 'not a valid base 10 numeric value';
/**
 * This method converts a base-10 or scientific E-notation value to
 * a decimal form string. Javascript's IEE 754 double-precision numbers
 * give the same precision as `number.toString()`.
 *
 * @param {number|string} value - The value to be converted.
 * @throws {TypeError} If value is not a valid format.
 * @throws {TypeError} If value is a Symbol or not coercible.
 * @returns {string} The value converted to a decimal form string.
 */

var number_to_decimal_form_string_x_esm_toDecimalFormString = function toDecimalFormString(value) {
  var workingValue = value; // Minus zero?

  if (workingValue === 0 && 1 / workingValue < 0) {
    workingValue = minusZeroSymbol;
  } else {
    workingValue = to_string_x_esm(workingValue);

    if (test.call(isValid, workingValue) === false) {
      throw new TypeError(errorMsg);
    }
  } // Determine sign.


  var sign;

  if (charAt.call(workingValue, 0) === hyphenMinus) {
    workingValue = slice.call(workingValue, 1);
    sign = -1;
  } else {
    sign = 1;
  } // Decimal point?


  var pointIndex = indexOf.call(workingValue, decimalMark);

  if (pointIndex > -1) {
    workingValue = replace.call(workingValue, decimalMark, emptyString);
  }

  var exponentIndex = pointIndex; // Exponential form?

  var index = search.call(workingValue, /e/i);

  if (index > 0) {
    // Determine exponent.
    if (exponentIndex < 0) {
      exponentIndex = index;
    }

    exponentIndex += castNumber(slice.call(workingValue, index + 1));
    workingValue = slice.call(workingValue, 0, index);
  } else if (exponentIndex < 0) {
    // Integer.
    exponentIndex = workingValue.length;
  }

  var leadingZeroIndex = workingValue.length; // Determine leading zeros.

  index = 0;

  while (index < leadingZeroIndex && charAt.call(workingValue, index) === zeroSymbol) {
    index += 1;
  }

  var coefficient;
  var exponent;

  if (index === leadingZeroIndex) {
    // Zero.
    exponent = 0;
    coefficient = [0];
  } else {
    // Determine trailing zeros.
    if (leadingZeroIndex > 0) {
      do {
        leadingZeroIndex -= 1;
      } while (charAt.call(workingValue, leadingZeroIndex) === zeroSymbol && leadingZeroIndex > 0);
    }

    exponent = exponentIndex - index - 1;
    coefficient = [];
    coefficient.length = leadingZeroIndex + 1; // Convert string to array of digits without leading/trailing zeros.

    var position = 0;

    while (index <= leadingZeroIndex) {
      coefficient[position] = castNumber(charAt.call(workingValue, index));
      position += 1;
      index += 1;
    }
  }

  var decimalForm = join.call(coefficient, emptyString);
  var decimalFormLength = decimalForm.length;

  if (exponent < 0) {
    exponent += 1;

    while (exponent) {
      decimalForm = zeroSymbol + decimalForm;
      exponent += 1;
    }

    decimalForm = zeroSymbol + decimalMark + decimalForm;
  } else if (exponent > 0) {
    exponent += 1;

    if (exponent > decimalFormLength) {
      exponent -= decimalFormLength;

      while (exponent) {
        decimalForm += zeroSymbol;
        exponent -= 1;
      }
    } else if (exponent < decimalFormLength) {
      decimalForm = slice.call(decimalForm, 0, exponent) + decimalMark + slice.call(decimalForm, exponent);
    } // Exponent is zero.

  } else if (decimalFormLength > 1) {
    decimalForm = charAt.call(decimalForm, 0) + decimalMark + slice.call(decimalForm, 1);
  }

  return sign < 0 ? hyphenMinus + decimalForm : decimalForm;
};

/* harmony default export */ var number_to_decimal_form_string_x_esm = __webpack_exports__["default"] = (number_to_decimal_form_string_x_esm_toDecimalFormString);



/***/ })
/******/ ]);
});
//# sourceMappingURL=number-to-decimal-form-string-x.js.map