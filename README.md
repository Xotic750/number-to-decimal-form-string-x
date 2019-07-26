<a
  href="https://travis-ci.org/Xotic750/number-to-decimal-form-string-x"
  title="Travis status">
<img
  src="https://travis-ci.org/Xotic750/number-to-decimal-form-string-x.svg?branch=master"
  alt="Travis status" height="18">
</a>
<a
  href="https://david-dm.org/Xotic750/number-to-decimal-form-string-x"
  title="Dependency status">
<img src="https://david-dm.org/Xotic750/number-to-decimal-form-string-x/status.svg"
  alt="Dependency status" height="18"/>
</a>
<a
  href="https://david-dm.org/Xotic750/number-to-decimal-form-string-x?type=dev"
  title="devDependency status">
<img src="https://david-dm.org/Xotic750/number-to-decimal-form-string-x/dev-status.svg"
  alt="devDependency status" height="18"/>
</a>
<a
  href="https://badge.fury.io/js/number-to-decimal-form-string-x"
  title="npm version">
<img src="https://badge.fury.io/js/number-to-decimal-form-string-x.svg"
  alt="npm version" height="18">
</a>
<a
  href="https://www.jsdelivr.com/package/npm/number-to-decimal-form-string-x"
  title="jsDelivr hits">
<img src="https://data.jsdelivr.com/v1/package/npm/number-to-decimal-form-string-x/badge?style=rounded"
  alt="jsDelivr hits" height="18">
</a>
<a
  href="https://bettercodehub.com/results/Xotic750/number-to-decimal-form-string-x"
  title="bettercodehub score">
<img src="https://bettercodehub.com/edge/badge/Xotic750/number-to-decimal-form-string-x?branch=master"
  alt="bettercodehub score" height="18">
</a>

<a name="module_number-to-decimal-form-string-x"></a>

## number-to-decimal-form-string-x

Convert a base-10 or scientific E-notation value to a decimal form string.

<a name="exp_module_number-to-decimal-form-string-x--module.exports"></a>

### `module.exports(value)` ⇒ <code>string</code> ⏏

This method converts a base-10 or scientific E-notation value to
a decimal form string. Javascript's IEE 754 double-precision numbers
give the same precision as `number.toString()`.

**Kind**: Exported function  
**Returns**: <code>string</code> - The value converted to a decimal form string.  
**Throws**:

- <code>TypeError</code> If value is not a valid format.
- <code>TypeError</code> If value is a Symbol or not coercible.

| Param | Type                                       | Description                |
| ----- | ------------------------------------------ | -------------------------- |
| value | <code>number</code> \| <code>string</code> | The value to be converted. |

**Example**

```js
import toDecimalFormString from 'number-to-decimal-form-string-x';

toDecimalFormString(Number.MIN_SAFE_INTEGER); // '-9007199254740991'
toDecimalFormString(-0); // '-0'

let number = 0.00000000001;
number.toString(); // '1e-11'
toDecimalFormString(number); // '0.00000000001'

number = 88259496234518.57;
console.log(number.toString()); // '88259496234518.56';
console.log(toDecimalFormString(number)); // '88259496234518.56'

console.log(toDecimalFormString(Math.PI)); // '3.141592653589793'
console.log(toDecimalFormString(Number.MAX_SAFE_INTEGER)); // '9007199254740991'

console.log(toDecimalFormString('0e+0')); // '0'
console.log(toDecimalFormString('1e-11')); // '0.00000000001'
console.log(toDecimalFormString('4.062e-3')); // '0.004062'
console.log(toDecimalFormString('4.461824e+2')); // '446.1824'

toDecimalFormString(NaN); // TypeError
toDecimalFormString(' 0'); // TypeError
toDecimalFormString('0 '); // TypeError
toDecimalFormString('0.'); // TypeError
toDecimalFormString('.0'); // TypeError
toDecimalFormString('0x1'); // TypeError
toDecimalFormString('0o1'); // TypeError
toDecimalFormString('0b1'); // TypeError
toDecimalFormString('4.062 e-3'); // TypeError
toDecimalFormString('9 007 199 254 740 991'); // TypeError
toDecimalFormString('9,007,199,254,740,991'); // TypeError

toDecimalFormString(Symbol('0')); // TypeError
toDecimalFormString(Object.create(null)); // TypeError
```
