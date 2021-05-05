export function bringproductdata(pid, data) {
  const datatbereturned = data.find((element) => element.id === pid);
  console.log("datatbereturned", datatbereturned);
  return datatbereturned;
}
