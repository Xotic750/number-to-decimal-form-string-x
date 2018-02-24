(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.returnExports = f()}})(function(){var define,module,exports;return (function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(_dereq_,module,exports){
/**
 * @file Convert a base-10 or scientific E-notation value to a decimal form string.
 * @version 1.0.1
 * @author Xotic750 <Xotic750@gmail.com>
 * @copyright  Xotic750
 * @license {@link <https://opensource.org/licenses/MIT> MIT}
 * @module number-to-decimal-form-string-x
 */

'use strict';

var castNumber = _dereq_('cached-constructors-x').Number;
var toStr = _dereq_('to-string-x');
var emptyString = '';
var charAt = emptyString.charAt;
var slice = emptyString.slice;
var search = emptyString.search;
var replace = emptyString.replace;
var indexOf = emptyString.indexOf;
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
 * @example
 * var toDecimalFormString = require('number-to-decimal-form-string-x');
 *
 * toDecimalFormString(Number.MIN_SAFE_INTEGER); // '-9007199254740991'
 * toDecimalFormString(-0); // '-0'
 *
 * var number = 0.00000000001;
 * number.toString(); // '1e-11'
 * toDecimalFormString(number); // '0.00000000001'
 *
 * number = 88259496234518.57;
 * number.toString(); '88259496234518.56'
 * toDecimalFormString(number); // '88259496234518.56'
 *
 * toDecimalFormString(Math.PI); // '3.141592653589793'
 * toDecimalFormString(Number.MAX_SAFE_INTEGER); // '9007199254740991'
 *
 * toDecimalFormString('0e+0'); // '0'
 * toDecimalFormString('1e-11'); // '0.00000000001'
 * toDecimalFormString('4.062e-3'); // '0.004062'
 * toDecimalFormString('4.461824e+2'); // '446.1824'
 *
 * toDecimalFormString(NaN); // TypeError
 * toDecimalFormString(' 0'); // TypeError
 * toDecimalFormString('0 '); // TypeError
 * toDecimalFormString('0.'); // TypeError
 * toDecimalFormString('.0'); // TypeError
 * toDecimalFormString('0x1'); // TypeError
 * toDecimalFormString('0o1'); // TypeError
 * toDecimalFormString('0b1'); // TypeError
 * toDecimalFormString('4.062 e-3'); // TypeError
 * toDecimalFormString('9 007 199 254 740 991'); // TypeError
 * toDecimalFormString('9,007,199,254,740,991'); // TypeError
 *
 * toDecimalFormString(Symbol('0')); // TypeError
 * toDecimalFormString(Object.create(null)); // TypeError
 */
// eslint-disable-next-line complexity
module.exports = function toDecimalFormString(value) {
  var workingValue = value;

  // Minus zero?
  if (workingValue === 0 && (1 / workingValue) < 0) {
    workingValue = minusZeroSymbol;
  } else {
    workingValue = toStr(workingValue);
    if (test.call(isValid, workingValue) === false) {
      throw new TypeError(errorMsg);
    }
  }

  // Determine sign.
  var sign;
  if (charAt.call(workingValue, 0) === hyphenMinus) {
    workingValue = slice.call(workingValue, 1);
    sign = -1;
  } else {
    sign = 1;
  }

  // Decimal point?
  var pointIndex = indexOf.call(workingValue, decimalMark);
  if (pointIndex > -1) {
    workingValue = replace.call(workingValue, decimalMark, emptyString);
  }

  var exponentIndex = pointIndex;
  // Exponential form?
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

  var leadingZeroIndex = workingValue.length;
  // Determine leading zeros.
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
    coefficient.length = leadingZeroIndex + 1;

    // Convert string to array of digits without leading/trailing zeros.
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
    }

    // Exponent is zero.
  } else if (decimalFormLength > 1) {
    decimalForm = charAt.call(decimalForm, 0) + decimalMark + slice.call(decimalForm, 1);
  }

  return sign < 0 ? hyphenMinus + decimalForm : decimalForm;
};

},{"cached-constructors-x":2,"to-string-x":4}],2:[function(_dereq_,module,exports){
/**
 * @file Constructors cached from literals.
 * @version 1.0.2
 * @author Xotic750 <Xotic750@gmail.com>
 * @copyright  Xotic750
 * @license {@link <https://opensource.org/licenses/MIT> MIT}
 * @module cached-constructors-x
 */

'use strict';

/**
 * Constructors cached from literals.
 *
 * @type Object
 * @example
 * var constructors = require('cached-constructors-x');
 */
module.exports = {
  Array: [].constructor,
  Boolean: true.constructor,
  Function: function () {}.constructor,
  Number: (0).constructor,
  Object: {}.constructor,
  RegExp: (/(?:)/).constructor,
  String: ''.constructor
};

},{}],3:[function(_dereq_,module,exports){
'use strict';

var toStr = Object.prototype.toString;
var hasSymbols = typeof Symbol === 'function' && typeof Symbol() === 'symbol';

if (hasSymbols) {
	var symToStr = Symbol.prototype.toString;
	var symStringRegex = /^Symbol\(.*\)$/;
	var isSymbolObject = function isSymbolObject(value) {
		if (typeof value.valueOf() !== 'symbol') { return false; }
		return symStringRegex.test(symToStr.call(value));
	};
	module.exports = function isSymbol(value) {
		if (typeof value === 'symbol') { return true; }
		if (toStr.call(value) !== '[object Symbol]') { return false; }
		try {
			return isSymbolObject(value);
		} catch (e) {
			return false;
		}
	};
} else {
	module.exports = function isSymbol(value) {
		// this environment does not support Symbols.
		return false;
	};
}

},{}],4:[function(_dereq_,module,exports){
/**
 * @file ES6-compliant shim for ToString.
 * @see {@link http://www.ecma-international.org/ecma-262/6.0/#sec-tostring|7.1.12 ToString ( argument )}
 * @version 1.4.5
 * @author Xotic750 <Xotic750@gmail.com>
 * @copyright  Xotic750
 * @license {@link <https://opensource.org/licenses/MIT> MIT}
 * @module to-string-x
 */

'use strict';

var castString = _dereq_('cached-constructors-x').String;
var isSymbol = _dereq_('is-symbol');

/**
 * The abstract operation ToString converts argument to a value of type String.
 *
 * @param {*} value - The value to convert to a string.
 * @throws {TypeError} If `value` is a Symbol.
 * @returns {string} The converted value.
 * @example
 * var $toString = require('to-string-x');
 *
 * $toString(); // 'undefined'
 * $toString(null); // 'null'
 * $toString('abc'); // 'abc'
 * $toString(true); // 'true'
 * $toString(Symbol('foo')); // TypeError
 * $toString(Symbol.iterator); // TypeError
 * $toString(Object(Symbol.iterator)); // TypeError
 * $toString(Object.create(null)); // TypeError
 */
module.exports = function ToString(value) {
  if (isSymbol(value)) {
    throw new TypeError('Cannot convert a Symbol value to a string');
  }

  return castString(value);
};

},{"cached-constructors-x":2,"is-symbol":3}]},{},[1])(1)
});