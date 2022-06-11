import { createContext, useContext, useReducer } from "react";
import { wishlistreducer } from "../reducers/wishlistreducer";
const Wishlistcontext = createContext();

export const Wishlistprovider = ({ children }) => {
  const [wishliststate, wishlistdispatch] = useReducer(wishlistreducer, {
    datainwishlist: [],
  });
  return (
    <Wishlistcontext.Provider value={{ wishliststate, wishlistdispatch }}>
      {children}
    </Wishlistcontext.Provider>
  );
};
export const useWishlistcontext = () => useContext(Wishlistcontext);
