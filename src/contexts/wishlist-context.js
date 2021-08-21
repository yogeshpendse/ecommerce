import { createContext, useContext, useReducer, useEffect } from "react";
import { wishlistreducer } from "../reducers/wishlist-reducers";
import axios from "axios";
import { useAuth } from "./auth-context";
export const Wishlistcontext = createContext();

export function Wishlistprovider({ children }) {
  const [wishliststate, wishlistdispatch] = useReducer(wishlistreducer, {
    datainwishlist: [],
  });
  const { token } = useAuth();
  useEffect(() => {
    // wishlisttoken :

    const source = axios.CancelToken.source();

    const fetchData = async () => {
      try {
        console.log({ wishlisttoken: token });
        const response = await axios.get(
          "https://ecom-server--bleedblue.repl.co/wishlist/getwhishlistdata",
          {
            headers: { authorization: token },
            cancelToken: source.token,
          }
        );
        // console.log(response.data.data.productsinwishlist);
        wishlistdispatch({
          type: "SET_DATA_TO_WISHLIST_ARRAY",
          payload: response.data.data.productsinwishlist,
        });
        // ...
      } catch (error) {
        if (axios.isCancel(error)) {
          //cancelled
          console.log("axios cancel : ", JSON.stringify(axios.isCancel(error)));
        } else {
          // throw error;
          console.log({ success: false, errormessage: error.message });
        }
      }
    };

    fetchData();

    return () => {
      source.cancel();
    };
  }, [token]);
  return (
    <>
      <Wishlistcontext.Provider value={{ wishliststate, wishlistdispatch }}>
        {children}
      </Wishlistcontext.Provider>
    </>
  );
}
export const useWishlistcontext = () => useContext(Wishlistcontext);
