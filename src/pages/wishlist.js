import { useEffect, useState } from "react";
import { useAuth } from "../contexts/auth-context";
import axios from "axios";
import { useWishlistcontext } from "../contexts/wishlist-context";
import { useCartcontext } from "../contexts/cart-context";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

export function Wishlistpage() {
  // const [state, setState] = useState([]);
  const { token, myauthAxios } = useAuth();
  const [loader, setLoader] = useState(true);
  const { wishliststate, wishlistdispatch } = useWishlistcontext();
  const { cartstate, cartdispatch } = useCartcontext();
  const wishliststatearray = [...wishliststate.datainwishlist];
  useEffect(() => {
    // wishlisttoken :

    const source = axios.CancelToken.source();

    const fetchData = async () => {
      try {
        setLoader(true);
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
        setLoader(false);
        // ...
      } catch (error) {
        if (axios.isCancel(error)) {
          setLoader(false);
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
  }, [token, wishlistdispatch]);
  console.log({ wishlist: wishliststatearray });
  // WHISHLIST_TO_CART
  async function removefromwishlist(item) {
    // /wishlist/removefromwhishlist
    console.log({ message: "REMOVE_FROM_WHISHLIST", object: { ...item } });
    try {
      const response = await myauthAxios.post("/wishlist/removefromwhishlist", {
        ...item,
      });
      if (response.status === 200) {
        console.log({
          message: "removed from wishlist",
          response: response.data.removefromwhishlistupdate.productsinwishlist,
        });
        // response.data.removefromwhishlistupdate.productsinwishlist
        wishlistdispatch({
          type: "SET_DATA_TO_WISHLIST_ARRAY",
          payload: response.data.removefromwhishlistupdate.productsinwishlist,
        });
        toast.success("removed from wishlist", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        console.log({ response: response });
      }
      if (response.status === 400 || response.status === 401) {
        console.log("product doesn't axist");
      }
    } catch (error) {
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
  async function wishlisttocart(item) {
    console.log({ message: "WHISHLIST_TO_CART", object: { ...item } });
    try {
      const response = await myauthAxios.post("/cart/addtocart", { ...item });
      if (response.status === 200) {
        console.log({
          message: "product added to cart",
          response: response.data.updatedcart,
        });
        cartdispatch({
          type: "SET_DATA_TO_ARRAY",
          payload: response.data.updatedcart,
        });
        toast.success("added to cart", {
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
        console.log("product alreafy axist");
      }
    } catch (error) {
      // console.log({
      //   success: false,
      //   errormessage: error.message,
      //   errorresponse: error.response.data.message,
      //   status: error.response.status,
      // });
      if (
        error.response.data.message === "product already present in cart" &&
        error.response.status === 400
      ) {
        console.log("product already present in cart");
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
  // item
  console.log({ cartstate });
  return (
    <div className="mt-5rem">
      {loader ? (
        <h1 style={{ marginTop: "5rem", textAlign: "center" }}>Loding...</h1>
      ) : (
        <>
          {wishliststatearray.length === 0 && (
            <h1 style={{ marginTop: "5rem", textAlign: "center" }}>
              wishlist is empty
            </h1>
          )}
          {wishliststatearray.length > 0 && (
            <div className="container">
              {wishliststatearray.map((item) => {
                return (
                  <div className="product-card" key={item.prid}>
                    <div className="product-top">
                      <img
                        className="product-image"
                        src={item.image}
                        alt="pizza"
                      />
                    </div>
                    <div className="product-bottom">
                      <Link
                        className="text-decoration-none"
                        to={`/product/${item.prid}`}
                      >
                        <div className="product-description">
                          <strong>{item.name}</strong>
                          <p>{item.description}</p>
                        </div>
                      </Link>
                    </div>
                    <div className="width-100per">
                      <div className="product-price ml-0-5rem">
                        &#8377;&nbsp;{item.price}
                      </div>
                      <button
                        className="btn btn-primary cursor-pointer width-100per"
                        style={{
                          fontSize: "large",
                          borderRadius: "0px",
                        }}
                        onClick={() => wishlisttocart(item)}
                      >
                        add to cart
                      </button>
                      <button
                        className="btn btn-danger cursor-pointer width-100per"
                        style={{
                          borderTopRightRadius: "0px",
                          borderTopLeftRadius: "0px",
                          fontSize: "large",
                        }}
                        onClick={() => removefromwishlist(item)}
                      >
                        remove
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </>
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
