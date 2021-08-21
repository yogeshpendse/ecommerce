import { createContext, useContext, useReducer, useEffect } from "react";
import { cartreducer } from "../reducers/cart-reducers";
import { useAuth } from "./auth-context";
import axios from "axios";
export const Cartcontext = createContext();
export function Cartprovider({ children }) {
  const [cartstate, cartdispatch] = useReducer(cartreducer, { dataincart: [] });
  console.log({ cartstatecartdata: cartstate.dataincart });
  const { token } = useAuth();
  useEffect(() => {
    const source = axios.CancelToken.source();

    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://ecom-server--bleedblue.repl.co/cart/getcartdata",
          {
            headers: { authorization: token },
            cancelToken: source.token,
          }
        );
        cartdispatch({
          type: "SET_DATA_TO_ARRAY",
          payload: response.data.data.productsincart,
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
      <Cartcontext.Provider value={{ cartstate, cartdispatch }}>
        {children}
      </Cartcontext.Provider>
    </>
  );
}

export const useCartcontext = () => useContext(Cartcontext);
