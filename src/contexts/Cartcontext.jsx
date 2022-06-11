import { createContext, useContext, useReducer } from "react";
import { cartreducer } from "../reducers/cartreducer";

export const Cartcontext = createContext();

export const Cartprovider = ({ children }) => {
  const [cartstate, cartdispatch] = useReducer(cartreducer, { dataincart: [] });
  return (
    <Cartcontext.Provider value={{ cartstate, cartdispatch }}>
      {children}
    </Cartcontext.Provider>
  );
};
export const useCartcontext = () => useContext(Cartcontext);
