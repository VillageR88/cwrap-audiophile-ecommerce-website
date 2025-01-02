export const productShortNames = {
  "YX1 Wireless Earphones": "YX1",
  "XX59 Headphones": "XX59",
  "XX99 Mark I Headphones": "XX99 MK I",
  "XX99 Mark II Headphones": "XX99 MK II",
  "ZX7 Speaker": "ZX7",
  "ZX9 Speaker": "ZX9",
};

export const formattedCost = (cost) => cost.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 }).replace('$', '$ ');