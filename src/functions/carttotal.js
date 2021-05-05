export const carttotal = (accumulator, currentValue) =>
  accumulator + currentValue.price * currentValue.quantity;
