export const getTotal = (array) => {
  let total = 0;
  array.forEach((a) => [(total += parseInt(a.total_amount))]);

  return total;
};
