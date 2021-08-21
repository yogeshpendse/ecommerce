export function wishlistreducer(prevstate, action) {
  switch (action.type) {
    case "RETURN_SAME_ARRAY":
      console.log({ whishlistdata: prevstate.datainwishlist });
      return { ...prevstate };
    case "SET_DATA_TO_WISHLIST_ARRAY":
      // const newobj = extend(prevstate, { dataincart: [...action.payload] });
      return { datainwishlist: [...action.payload] };
    default:
      break;
  }
}
