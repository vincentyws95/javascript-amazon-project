import { formatCurrency } from "../scripts/utils/money.js";

const testCases = [
  // Basic cases
  { name: "convert 0 cents", input: 0, expected: "0.00" },
  { name: "basic whole number", input: 2095, expected: "20.95" },
  { name: "basic whole number", input: 1000000, expected: "10000.00" },
  { name: "decimal round up", input: 2000.5, expected: "20.01" },
  { name: "decimal round down", input: 2000.4, expected: "20.00" },

  // Negative values
  { name: "negative", input: -100, expected: "-1.00" },
  {
    name: "negative with decimal round up",
    input: -2000.6,
    expected: "-20.01",
  },

  // Rounding boundaries
  { name: "rounding boundary round up", input: 1999.5, expected: "20.00" },
  { name: "rounding boundary round down", input: 1999.4, expected: "19.99" },

  // Non-number inputs
  { name: "non-number string", input: "abc", expected: NaN },
  { name: "non-number null", input: null, expected: NaN },
  { name: "non-number  undefined", input: undefined, expected: NaN },
  { name: "non-number empty object", input: {}, expected: NaN },

  // Large values
  {
    name: "large number max integer",
    input: Number.MAX_SAFE_INTEGER,
    expected: (Number.MAX_SAFE_INTEGER / 100).toFixed(2),
  },
  {
    name: "large number min integer",
    input: Number.MIN_SAFE_INTEGER,
    expected: (Number.MIN_SAFE_INTEGER / 100).toFixed(2),
  },

  // Small values
  { name: "small decimal round down", input: 0.004, expected: "0.00" },
  { name: "small decimal round up", input: 0.006, expected: "0.00" },

  // Decimal precision
  { name: "decimal precision", input: 12345.6789, expected: "123.46" },
  { name: "decimal precision", input: 12345.6749, expected: "123.46" },
];

describe("Test suite: formatCurrency", () => {
  testCases.forEach((testCase) => {
    it(testCase.name, () => {
      expect(formatCurrency(testCase.input)).toEqual(testCase.expected);
    });
  });
});
