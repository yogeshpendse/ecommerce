export function reducer(prevstate, action) {
  switch (action.type) {
    case "HIGH_TO_LOW":
      return { ...prevstate, sorting: "HIGH_TO_LOW" };
    case "LOW_TO_HIGH":
      return { ...prevstate, sorting: "LOW_TO_HIGH" };
    case "TOGGLE_INCLUDE_OUT_OF_STOCK":
      return {
        ...prevstate,
        includeoutodstock: !prevstate.includeoutodstock
      };
    case "TOGGLE_FAST_DELIVERY":
      return { ...prevstate, fastdelivery: !prevstate.fastdelivery };
    case "ADD_TO_CART":
      console.log(action.type);
      console.log("action.payload.id");
      const searcharr = [prevstate];
      console.log(searcharr);
      console.log("---------prevstate----------");
      const addtocart = {
        ...prevstate,
        prodsincart: [...prevstate.prodsincart, action.payload]
      };
      const comp = prevstate.prodsincart.some(
        (item) => item.id === action.payload.id
      );
      console.log(comp);
      if (comp) {
        console.log("cart me already hai");
        return { ...prevstate };
      }
      return addtocart;
    case "WHISHLIST_TO_CART":
      const itemtremovewl = prevstate.whishlist;
      // const searcharr2 = [prevstate];
      const wltocart = {
        ...prevstate,
        prodsincart: [...prevstate.prodsincart, action.payload]
      };
      const comp2 = prevstate.prodsincart.some(
        (item) => item.id === action.payload.id
      );
      if (comp2) {
        const arrtoberetwl = itemtremovewl.filter(
          (x) => x.id !== action.payload.id
        );
        console.log("cart me already hai");
        return { ...prevstate, whishlist: arrtoberetwl };
      }
      return wltocart;
    case "REMOVE_FROM_CART":
      const itemtremove = prevstate.prodsincart;
      const arrtoberet = itemtremove.filter((x) => x.id !== action.payload.id);
      return { ...prevstate, prodsincart: arrtoberet };
    case "ADD_TO_WHISHLIST":
      console.log(action.type);
      console.log("action.payload.id");
      console.log(prevstate.whishlist);
      console.log("---------prevstate----------");
      const addtowhishlist = {
        ...prevstate,
        whishlist: [...prevstate.whishlist, action.payload]
      };
      const whishlist = prevstate.whishlist.some(
        (item) => item.id === action.payload.id
      );
      console.log(whishlist);
      if (whishlist) {
        console.log("whishlist me already hai");
        return { ...prevstate };
      }
      return addtowhishlist;
    case "REMOVE_FROM_WHISHLIST":
      const itemtremove2 = prevstate.whishlist;
      const arrtoberet2 = itemtremove2.filter(
        (x) => x.id !== action.payload.id
      );
      return { ...prevstate, whishlist: arrtoberet2 };
    case "INCREMENT_BY_ONE":
      console.log(prevstate.prodsincart);
      const incrarr = [...prevstate.prodsincart];
      const newincarr = incrarr.map((x) =>
        x.id === action.payload.id
          ? { ...x, quantity: x.quantity + 1 }
          : { ...x }
      );
      console.log("clicked on increment by one");
      return { ...prevstate, prodsincart: newincarr };
    case "DECREMENT_BY_ONE":
      console.log(prevstate.prodsincart);
      const decrarr = [...prevstate.prodsincart];
      const newdeccarr = decrarr.map((x) =>
        x.id === action.payload.id
          ? { ...x, quantity: x.quantity - 1 }
          : { ...x }
      );
      console.log("clicked on increment by one");
      return { ...prevstate, prodsincart: newdeccarr };
    default:
      break;
  }
}

export function sortdata(productlist, { sortingstate }) {
  if (sortingstate !== null && sortingstate === "HIGH_TO_LOW") {
    const op = [...productlist];
    const sorth2l = op.sort((a, b) => b.price - a.price);
    return sorth2l;
  }
  if (sortingstate !== null && sortingstate === "LOW_TO_HIGH") {
    const po = [...productlist];
    const sortl2h = po.sort((a, b) => a.price - b.price);
    return sortl2h;
  }
  return productlist;
}

export function applyfilters(
  productlist,
  { outtastocktoggle, deliverytoggle }
) {
  const tempdatastore = [...productlist];
  const output = tempdatastore
    .filter((x) => (outtastocktoggle ? true : x.inStock))
    .filter((y) => (deliverytoggle ? y.fastDelivery : true));
  return output;
}

export function searcheddata(productlist, term) {
  const datatobesearched = [...productlist];
  console.log(term);
  const searchedarr = datatobesearched.filter((x) =>
    x.name.toUpperCase().includes(term.toUpperCase())
  );
  return searchedarr;
}
