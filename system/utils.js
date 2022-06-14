export const formatCurrency = (value) => {
  return new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
  }).format(value);
};

export const safeRound = (arg) => Math.round(arg * 100) / 100;
