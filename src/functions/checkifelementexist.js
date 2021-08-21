export function checkifelementexist(arr, obj) {
  const array = [...arr];
  const boolval = array.some((x) => x.prid === obj.prid);
  return boolval;
}
