import { createContext, useContext, useReducer, useState } from "react";
import { prodreducer } from "../reducers/productreducer";

const Prodcontext = createContext();

export function Productprovider({ children }) {
  const [state, setState] = useState([]);
  const [productstate, productdispatch] = useReducer(prodreducer, {
    dishtype: "both",
    newdish: "both",
    timed: "both",
    sort: "NONE",
    fooddishtype: "all",
    searchtext: "",
  });
  return (
    <Prodcontext.Provider
      value={{ productstate, productdispatch, state, setState }}
    >
      {children}
    </Prodcontext.Provider>
  );
}

export const useProductcontext = () => useContext(Prodcontext);
