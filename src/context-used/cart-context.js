import { data } from "../data";
import { createContext, useContext, useReducer, useState } from "react";
import {
  sortdata,
  applyfilters,
  reducer,
  searcheddata
} from "../functions/functions-of-cart";
export const Cartcontext = createContext();

export function CartProvider({ children }) {
  const opium = { value: 4 };
  const [loginstatus, setloginstatus] = useState(false);
  const [searchterm, setSearchterm] = useState("");
  const [state, dispatch] = useReducer(reducer, {
    sorting: null,
    includeoutodstock: false,
    fastdelivery: false,
    navbartoggle: "product",
    prodsincart: [],
    whishlist: []
  });

  return (
    <Cartcontext.Provider
      value={{
        opium,
        data,
        applyfilters,
        sortdata,
        reducer,
        state,
        dispatch,
        searchterm,
        setSearchterm,
        searcheddata,
        loginstatus,
        setloginstatus
      }}
    >
      {children}
    </Cartcontext.Provider>
  );
}

export function useCart() {
  return useContext(Cartcontext);
}
