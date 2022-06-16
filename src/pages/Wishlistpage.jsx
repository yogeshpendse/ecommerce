import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { addtocart } from "../apiandurl/addtocart";
import { baseurl } from "../apiandurl/baseurl";
import { removefromwishlist } from "../apiandurl/wishlistfunctions";
import { Myloader } from "../components/Myloader";
import { useAuth } from "../contexts/Authcontext";
import { useCartcontext } from "../contexts/Cartcontext";
import { useWishlistcontext } from "../contexts/Wishlistcontext";
export function Wishlistpage() {
  const { token } = useAuth();
  const [loader, setLoader] = useState(false);
  const { wishlistdispatch, wishliststate } = useWishlistcontext();
  const { cartdispatch } = useCartcontext();
  const url = `${baseurl}/wishlist/getwhishlistdata`;
  useEffect(() => {
    setLoader(true);
    let controller = new AbortController();
    const signal = controller.signal;
    (async function () {
      try {
        const responsedata = await axios.get(url, {
          headers: { authorization: token },
          signal: signal,
        });
        wishlistdispatch({
          type: "SET_DATA_TO_WISHLIST_ARRAY",
          payload: responsedata.data.data.productsinwishlist,
        });
        setLoader(false);
      } catch (error) {
        setLoader(false);
        if (axios.isCancel(error)) {
          // console.log("Request canceled", error.message);
        } else {
          console.log(error);
        }
      }
    })();
    return () => {
      setLoader(false);
      controller.abort();
    };
  }, [url, token, wishlistdispatch]);
  async function handleaddtocart(params) {
    const response = await addtocart({ ...params });
    if (response.success) {
      cartdispatch({
        type: "SET_DATA_TO_ARRAY",
        payload: response.updatedcart,
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
    if (
      response.success === false &&
      response.errormessage === "product already present in cart"
    ) {
      toast.error("already present in cart", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    if (
      response.success === false &&
      response.errormessage === "please login"
    ) {
      toast.error("please login", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    if (
      response.success === false &&
      response.errormessage === "some error occured"
    ) {
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

    // console.log(params);
  }
  async function handlewishlist(params) {
    const response = await removefromwishlist({ ...params });
    if (response.success) {
      wishlistdispatch({
        type: "SET_DATA_TO_WISHLIST_ARRAY",
        payload: response.productsinwishlist,
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
    }
    if (
      response.success === false &&
      response.errormessage === "some error occured"
    ) {
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
  return (
    <>
      <div className="page-width">
        {loader ? (
          <center className="mt-loader">
            <Myloader />
          </center>
        ) : (
          <>
            {[...wishliststate.datainwishlist].length === 0 && (
              <center>
                <h1 className="no-products">Whishlist empty.</h1>
              </center>
            )}
            <div className="wishlist-container">
              {[...wishliststate.datainwishlist].map((item) => {
                return (
                  <div className="ecard" key={item._id}>
                    <div className="ecard__imagebox">
                      <Link to={`/product/${item.prid}`}>
                        <img
                          className="ecard__image"
                          src={item.image}
                          alt="pizza"
                        />
                      </Link>
                    </div>
                    <div className="ecard__details">
                      <p className="ecard__name">
                        <Link to={`/product/${item.prid}`}>{item.name}</Link>
                      </p>
                      <p className="ecard__description">
                        <Link to={`/product/${item.prid}`}>
                          {item.description}
                        </Link>
                      </p>
                    </div>
                    <p className="ecard__price">&#8377;&nbsp;{item.price}</p>
                    <button
                      className="ecard__addtocart"
                      onClick={() => handleaddtocart({ item, token })}
                    >
                      add to cart
                    </button>
                    <button
                      className="ecard__addtocart ecard__remove"
                      onClick={() => handlewishlist({ item, token })}
                    >
                      remove
                    </button>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </>
  );
}
