export function applydishtype(value, array) {
  if (value === null || value === "both") {
    return array;
  } else {
    const updatedarray = [...array].filter((x) => x.foodtype === value);
    return updatedarray;
  }
}
export function applytimed(value, array) {
  if (value === null || value === "both") {
    return array;
  }
  if (value === "NON_TIMED") {
    const op = [...array].filter((x) => x.timed === false);
    return op;
  }
  if (value === "TIMED") {
    const op2 = [...array].filter((x) => x.timed === true);
    return op2;
  }
}
export function applynewdish(value, array) {
  if (value === null || value === "both") {
    return array;
  }
  if (value === "NEW_DISH") {
    const op = [...array].filter((x) => x.newdish === true);
    return op;
  }
  if (value === "OTHERS") {
    const op2 = [...array].filter((x) => x.newdish === false);
    return op2;
  }
}
export function applysort(value, array) {
  if (value === null || value === "NONE") {
    return array;
  }
  if (value === "PRICE_HIGH_TO_LOW") {
    //   b-a
    const op = [...array].sort((a, b) => b.price - a.price);
    return op;
  }
  if (value === "PRICE_LOW_TO_HIGH") {
    //   a-b
    const op2 = [...array].sort((a, b) => a.price - b.price);
    return op2;
  }
  if (value === "STARS_HIGH_TO_LOW") {
    const op3 = [...array].sort((a, b) => b.stars - a.stars);
    return op3;
  }
}
export function applyfooddishtype(value, array) {
  console.log({ location: "productfunction", value });
  if (value === null || value === "all") {
    return array;
  } else {
    const updatedarray = [...array].filter((x) => x.dishtype === value);
    return updatedarray;
  }
}
export function retunsearch(term, arr) {
  if (term.length > 0) {
    const retarr = [...arr].filter((x) => {
      const termval = term || "";
      const thisobjectname = x.name || "";
      const searchtext = termval.toUpperCase();
      const searchobjectname = thisobjectname.toUpperCase();
      const retbool = searchobjectname.includes(searchtext);
      return retbool;
    });
    return retarr;
  } else {
    return arr;
  }
}
