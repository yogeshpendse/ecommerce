export function prodreducer(prevstate, action) {
  switch (action.type) {
    case "RETURN_SAME":
      console.log({ prevstate, action });
      return prevstate;
    case "TOGGLE_DISHTYPE":
      return { ...prevstate, dishtype: action.payload };
    case "TOGGLE_NEWDISH":
      return { ...prevstate, newdish: action.payload };
    case "TOGGLE_TIMED":
      return { ...prevstate, timed: action.payload };
    case "TOGGLE_SORT":
      return { ...prevstate, sort: action.payload };
    case "TOGGLE_FOOD_DISHTYPE":
      return { ...prevstate, fooddishtype: action.payload };
    case "SET_SEARCH_TEXT":
      return { ...prevstate, searchtext: action.payload };
    default:
      throw new Error();
  }
}
