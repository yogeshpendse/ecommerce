import { createContext, useContext, useReducer, useState } from "react";
import { prodreducer } from "../reducers/prod-reducer";

export const Prodcontext = createContext();

export function Productprovider({ children }) {
  const [state, setState] = useState([]);
  const [productstate, productdispatch] = useReducer(prodreducer, {
    dishtype: null,
    newdish: null,
    timed: null,
    sort: null,
    fooddishtype: null,
    searchtext: "",
  });
  console.log(productstate);
  return (
    <Prodcontext.Provider
      value={{ productstate, productdispatch, state, setState }}
    >
      {children}
    </Prodcontext.Provider>
  );
}

export const useProductcontext = () => useContext(Prodcontext);
