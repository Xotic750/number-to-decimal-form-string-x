import toStr from 'to-string-x';

const castNumber = (0).constructor;
const emptyString = '';
const {charAt, slice, search, replace, indexOf} = emptyString;
const {join} = [];
const decimalMark = '.';
const hyphenMinus = '-';
const zeroSymbol = '0';
const minusZeroSymbol = '-0';
const isValid = /^-?(?:(?:\d|[1-9]\d*)(?:\.\d+)?)(?:e[+-]?\d+)?$/i;
const {test} = isValid;
const errorMsg = 'not a valid base 10 numeric value';

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
const toDecimalFormString = function toDecimalFormString(value) {
  let workingValue = value;

  // Minus zero?
  if (workingValue === 0 && 1 / workingValue < 0) {
    workingValue = minusZeroSymbol;
  } else {
    workingValue = toStr(workingValue);

    if (test.call(isValid, workingValue) === false) {
      throw new TypeError(errorMsg);
    }
  }

  // Determine sign.
  let sign;

  if (charAt.call(workingValue, 0) === hyphenMinus) {
    workingValue = slice.call(workingValue, 1);
    sign = -1;
  } else {
    sign = 1;
  }

  // Decimal point?
  const pointIndex = indexOf.call(workingValue, decimalMark);

  if (pointIndex > -1) {
    workingValue = replace.call(workingValue, decimalMark, emptyString);
  }

  let exponentIndex = pointIndex;
  // Exponential form?
  let index = search.call(workingValue, /e/i);

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

  let leadingZeroIndex = workingValue.length;
  // Determine leading zeros.
  index = 0;
  while (index < leadingZeroIndex && charAt.call(workingValue, index) === zeroSymbol) {
    index += 1;
  }

  let coefficient;
  let exponent;

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
    let position = 0;
    while (index <= leadingZeroIndex) {
      coefficient[position] = castNumber(charAt.call(workingValue, index));
      position += 1;
      index += 1;
    }
  }

  let decimalForm = join.call(coefficient, emptyString);
  const decimalFormLength = decimalForm.length;

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

export default toDecimalFormString;
