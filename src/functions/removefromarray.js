export function removefromarray(arr, obj) {
  const array = [arr];
  const newarray = array.filter((x) => x.prid !== obj.prid);
  return newarray;
}
