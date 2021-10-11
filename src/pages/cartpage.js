import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../contexts/auth-context";
import { useCartcontext } from "../contexts/cart-context";
import { useWishlistcontext } from "../contexts/wishlist-context";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function Cartpage() {
  const { token, myauthAxios } = useAuth();
  const { cartdispatch, cartstate } = useCartcontext();
  const { wishlistdispatch } = useWishlistcontext();
  const [loader, setLoader] = useState(true);
  const state = [...cartstate.dataincart];
  console.log({ state });
  useEffect(() => {
    console.log({ token });
    const source = axios.CancelToken.source();

    const fetchData = async () => {
      try {
        setLoader(true);
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
        setLoader(false);
        // ...
      } catch (error) {
        if (axios.isCancel(error)) {
          setLoader(false);
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
  }, [token, cartdispatch]);
  async function removefromcart(item) {
    // cartreducer({
    //   type: "REMOVE_FROM_CART",
    //   payload: response.data.data.productsincart,
    // });
    try {
      const response = await myauthAxios.post("/cart/removefromcart", {
        ...item,
      });
      if (response.status === 200) {
        console.log({
          success: true,
          message: "removed from cart",
          response: response.data.data.productsincart,
        });
        cartdispatch({
          type: "SET_DATA_TO_ARRAY",
          payload: response.data.data.productsincart,
        });
        toast.success("removed from cart", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        console.log({ message: "status 200 executed" });
      }
    } catch (error) {
      console.log({ errorresponse: error.response });
      toast.error("some error occured", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }

  async function addtowhishlist(item) {
    console.log({ message: "ADD_TO_WHISHLIST", data: { ...item } });
    try {
      const response = await myauthAxios.post("/wishlist/addtowhishlist", {
        ...item,
      });
      if (response.status === 200) {
        console.log({
          message: "added to whishlist",
          response: response.data.update.productsinwishlist,
        });
        wishlistdispatch({
          type: "SET_DATA_TO_WISHLIST_ARRAY",
          payload: response.data.update.productsinwishlist,
        });
        toast.success("added to wishlist", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
      if (response.status === 400 || response.status === 401) {
        console.log({ message: "already exist" });
      }
    } catch (error) {
      if (
        (error.response.data.message === "already present in array" &&
          error.response.status) === 400
      ) {
        toast.info("product already present in wishlist", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        toast.error("some error occured", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    }
  }
  async function decrementbyone(item) {
    console.log({ message: "DECREMENT_BY_ONE", data: { ...item } });
    try {
      const response = await myauthAxios.post("/cart/decrementincart", {
        ...item,
      });
      if (response.status === 200) {
        console.log({
          message: "decremented",
          response: response.data.data.productsincart,
        });
        // response.data.data.productsincart
        cartdispatch({
          type: "SET_DATA_TO_ARRAY",
          payload: response.data.data.productsincart,
        });
      }
      if (response.status === 400 || response.status === 401) {
        console.log({ message: "already exist" });
      }
    } catch (error) {
      console.log({ success: false, errormessage: error.message });
    }
  }
  async function incrementbyone(item) {
    console.log({ message: "INCREMENT_BY_ONE", data: { ...item } });
    try {
      const response = await myauthAxios.post("/cart/incrementincart", {
        ...item,
      });
      if (response.status === 200) {
        console.log({
          message: "incremented",
          response: response.data.data.productsincart,
        });
        // response.data.data.productsincart
        cartdispatch({
          type: "SET_DATA_TO_ARRAY",
          payload: response.data.data.productsincart,
        });
      }
      if (response.status === 400 || response.status === 401) {
        console.log({ message: "already exist" });
      }
    } catch (error) {
      console.log({ success: false, errormessage: error.message });
    }
  }
  return (
    <div className="mt-5rem">
      <h1>This is Cart page</h1>
      {loader ? (
        <h1>Loding...</h1>
      ) : (
        <div className="container">
          {state.map((items) => {
            return (
              <div class="product-card" key={items.prid}>
                <div class="product-top">
                  <img
                    class="product-image"
                    src={items.image}
                    alt={items.name}
                  />
                  <button
                    class="border-black btn-circle like cursor-pointer"
                    onClick={() => addtowhishlist(items)}
                  >
                    <i class="bi bi-heart-fill"></i>
                  </button>
                </div>
                <div class="product-bottom">
                  <div class="product-description">
                    <p>
                      <strong>{items.name}</strong>
                    </p>
                  </div>
                  <div class="product-price">&#8377;&nbsp;996</div>
                  <div class="cart-counter">
                    <button
                      class="btn btn-primary cursor-pointer font-large"
                      onClick={() => incrementbyone(items)}
                    >
                      <i class="bi bi-arrow-up-circle-fill"></i>
                    </button>
                    &nbsp;&nbsp;
                    <p>{items.quantity}</p>
                    &nbsp;&nbsp;
                    {items.quantity > 1 && (
                      <button
                        class="btn btn-primary cursor-pointer font-large"
                        onClick={() => decrementbyone(items)}
                      >
                        <i class="bi bi-arrow-down-circle-fill"></i>
                      </button>
                    )}
                  </div>
                </div>
                <button
                  className="btn btn-danger cursor-pointer width-100per"
                  style={{
                    borderTopRightRadius: "0px",
                    borderTopLeftRadius: "0px",
                    fontSize: "large",
                  }}
                  onClick={() => removefromcart(items)}
                >
                  <i class="bi bi-x-circle-fill"></i>&nbsp;remove
                </button>
              </div>
            );
          })}
        </div>
      )}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
      />
    </div>
  );
}

/*
The 'cartarray' array makes the dependencies of useEffect Hook (at line 48) change on every render.
To fix this, wrap the initialization of 'cartarray' in its own useMemo() Hook.
*/
