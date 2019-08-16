import toStr from 'to-string-x';
import methodize from 'simple-methodize-x';

const castNumber = (0).constructor;
const EMPTY_STRING = '';
const charAt = methodize(EMPTY_STRING.charAt);
const slice = methodize(EMPTY_STRING.slice);
const search = methodize(EMPTY_STRING.search);
const replace = methodize(EMPTY_STRING.replace);
const indexOf = methodize(EMPTY_STRING.indexOf);
const join = methodize([].join);
const DECIMAL_MARK = '.';
const HYPHEN_MINUS = '-';
const ZERO_STRING = '0';
const MINUS_ZERO_STRING = '-0';
const VALID_RX = /^-?(?:(?:\d|[1-9]\d*)(?:\.\d+)?)(?:e[+-]?\d+)?$/i;
const methodizedTest = methodize(VALID_RX.test);
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
    workingValue = MINUS_ZERO_STRING;
  } else {
    workingValue = toStr(workingValue);

    if (methodizedTest(VALID_RX, workingValue) === false) {
      throw new TypeError(errorMsg);
    }
  }

  // Determine sign.
  let sign;

  if (charAt(workingValue, 0) === HYPHEN_MINUS) {
    workingValue = slice(workingValue, 1);
    sign = -1;
  } else {
    sign = 1;
  }

  // Decimal point?
  const pointIndex = indexOf(workingValue, DECIMAL_MARK);

  if (pointIndex > -1) {
    workingValue = replace(workingValue, DECIMAL_MARK, EMPTY_STRING);
  }

  let exponentIndex = pointIndex;
  // Exponential form?
  let index = search(workingValue, /e/i);

  if (index > 0) {
    // Determine exponent.
    if (exponentIndex < 0) {
      exponentIndex = index;
    }

    exponentIndex += castNumber(slice(workingValue, index + 1));
    workingValue = slice(workingValue, 0, index);
  } else if (exponentIndex < 0) {
    // Integer.
    exponentIndex = workingValue.length;
  }

  let leadingZeroIndex = workingValue.length;
  // Determine leading zeros.
  index = 0;
  while (index < leadingZeroIndex && charAt(workingValue, index) === ZERO_STRING) {
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
      } while (charAt(workingValue, leadingZeroIndex) === ZERO_STRING && leadingZeroIndex > 0);
    }

    exponent = exponentIndex - index - 1;
    coefficient = [];
    coefficient.length = leadingZeroIndex + 1;

    // Convert string to array of digits without leading/trailing zeros.
    let position = 0;
    while (index <= leadingZeroIndex) {
      coefficient[position] = castNumber(charAt(workingValue, index));
      position += 1;
      index += 1;
    }
  }

  let decimalForm = join(coefficient, EMPTY_STRING);
  const decimalFormLength = decimalForm.length;

  if (exponent < 0) {
    exponent += 1;
    while (exponent) {
      decimalForm = ZERO_STRING + decimalForm;
      exponent += 1;
    }

    decimalForm = ZERO_STRING + DECIMAL_MARK + decimalForm;
  } else if (exponent > 0) {
    exponent += 1;

    if (exponent > decimalFormLength) {
      exponent -= decimalFormLength;
      while (exponent) {
        decimalForm += ZERO_STRING;
        exponent -= 1;
      }
    } else if (exponent < decimalFormLength) {
      decimalForm = slice(decimalForm, 0, exponent) + DECIMAL_MARK + slice(decimalForm, exponent);
    }

    // Exponent is zero.
  } else if (decimalFormLength > 1) {
    decimalForm = charAt(decimalForm, 0) + DECIMAL_MARK + slice(decimalForm, 1);
  }

  return sign < 0 ? HYPHEN_MINUS + decimalForm : decimalForm;
};

export default toDecimalFormString;
