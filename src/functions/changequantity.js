export function incrementquantity(arr, obj) {
  const arrx = [...arr];
  const opp = arrx.map((x) =>
    x.prid === obj.prid ? { ...x, qty: x.qty + 1 } : x
  );

  return opp;
}
export function decrementquantity(arr, obj) {
  const arrxy = [...arr];
  const oppx = arrxy.map((x) =>
    x.prid === obj.prid ? { ...x, qty: x.qty - 1 } : x
  );
  return oppx;
}
