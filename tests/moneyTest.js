import { formatCurrency } from "../scripts/utils/money.js";

console.log("Test suite: formatCurrency");

[
  // Basic cases
  { input: 0, expected: "0.00" },
  { input: 2095, expected: "20.95" },
  { input: 1000000, expected: "10000.00" },
  { input: 2000.5, expected: "20.01" },
  { input: 2000.4, expected: "20.00" },

  // Negative values
  { input: -100, expected: "-1.00" },
  { input: -2000.5, expected: "-20.01" },

  // Rounding boundaries
  { input: 1999.5, expected: "20.00" },
  { input: 1999.6, expected: "20.00" },

  // Non-number inputs
  { input: "abc", expected: "NaN" },
  { input: null, expected: "NaN" },
  { input: undefined, expected: "NaN" },
  { input: {}, expected: "NaN" },

  // Large values
  {
    input: Number.MAX_SAFE_INTEGER,
    expected: (Number.MAX_SAFE_INTEGER / 100).toFixed(2),
  },
  {
    input: Number.MIN_SAFE_INTEGER,
    expected: (Number.MIN_SAFE_INTEGER / 100).toFixed(2),
  },

  // Small values
  { input: 0.004, expected: "0.00" },
  { input: 0.006, expected: "0.01" },

  // Decimal precision
  { input: 12345.6789, expected: "123.46" },
  { input: 12345.6749, expected: "123.46" },
].forEach((x) => {
  const result = formatCurrency(x.input);
  result === x.expected
    ? console.log(`Passed Input = ${x.input} Result = ${result} `)
    : console.log(
        `Failed Failed Failed Input = ${x.input} Result = ${result} Expected = ${x.expected}`
      );
});
