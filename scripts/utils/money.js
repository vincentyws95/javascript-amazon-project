export const formatCurrency = (priceCents) => {
  return typeof priceCents === "number"
    ? (Math.round(priceCents) / 100).toFixed(2)
    : NaN;
};
