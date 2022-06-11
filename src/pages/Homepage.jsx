import { useEffect, useState } from "react";
import axios from "axios";
import { baseurl } from "../apiandurl/baseurl";
import { useProductcontext } from "../contexts/Prodcontext";
import { useAuth } from "../contexts/Authcontext";
import { addtocart } from "../apiandurl/addtocart";
import { useCartcontext } from "../contexts/Cartcontext";
import { addtowishlist } from "../apiandurl/wishlistfunctions";
import { useWishlistcontext } from "../contexts/Wishlistcontext";
import { Controls } from "../components/Controls";
import "../csscomponents/loaders.css";
import {
  applydishtype,
  applytimed,
  applynewdish,
  applysort,
  applyfooddishtype,
  retunsearch,
} from "../functions/productfunctions";
import { Myloader } from "../components/Myloader";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
export function Homepage() {
  const { state, setState, productstate } = useProductcontext();
  const { cartdispatch } = useCartcontext();
  const { wishlistdispatch } = useWishlistcontext();
  const { token } = useAuth();
  const url = `${baseurl}/product/getdata`;
  const arrayone = applydishtype(productstate.dishtype, state);
  const arraytwo = applytimed(productstate.timed, arrayone);
  const arraythree = applynewdish(productstate.newdish, arraytwo);
  const arrayfour = applysort(productstate.sort, arraythree);
  const arrayfive = applyfooddishtype(productstate.fooddishtype, arrayfour);
  const arraysix = retunsearch(productstate.searchtext, arrayfive);
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    setLoader(true);
    let controller = new AbortController();
    const signal = controller.signal;
    (async function () {
      try {
        const response = await axios.get(url, { signal: signal });
        const responsedata = response.data.data;
        setState(responsedata);
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
  }, [url, setState]);
  async function handlecart(params) {
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
  }
  async function handlewishlist(params) {
    const { token, item } = params;
    const responsedata = await addtowishlist({ token, item });
    if (responsedata.success) {
      wishlistdispatch({
        type: "SET_DATA_TO_WISHLIST_ARRAY",
        payload: responsedata.productsinwishlist,
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
    } else if (
      responsedata.success === false &&
      responsedata.errormessage === "already present in wishlist"
    ) {
      toast.error("already present in wishlist", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else if (
      responsedata.success === false &&
      responsedata.errormessage === "please login"
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
    } else if (
      responsedata.success === false &&
      responsedata.errormessage === "some error occured"
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
        <Controls />
        {loader ? (
          <center>
            <Myloader />
          </center>
        ) : (
          <>
            {[...arraysix].length === 0 && (
              <center>
                <h1>No products left.</h1>
              </center>
            )}
            <div className="grid grid__col--3 home-container">
              {[...arraysix].map((item) => {
                return (
                  <div className="ecard scale_1_5" key={item._id}>
                    <div className="ecard__imagebox">
                      <Link to={`/product/${item.prid}`}>
                        <img
                          className="ecard__image"
                          src={item.image}
                          alt={item.name}
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

                      <p className="ecard__tags">
                        {item.foodtype === "vegetarian" && (
                          <>
                            <i className="bi bi-stop-circle-fill green" />
                          </>
                        )}
                        {item.foodtype === "non-vegetarian" && (
                          <>
                            <i className="bi bi-stop-circle-fill red" />
                          </>
                        )}
                        {item.timed && (
                          <>
                            <i className="bi bi-truck orange" />
                          </>
                        )}
                        <>
                          {item.stars}
                          <i className="bi bi-star-fill star" />
                        </>
                      </p>
                    </div>
                    <p className="ecard__price">&#8377;&nbsp;{item.price}</p>
                    <button
                      className="ecard__addtocart"
                      onClick={() => handlecart({ token, item })}
                    >
                      add to cart
                    </button>
                    ,
                    <button
                      className="ecard__whishlist"
                      onClick={() => handlewishlist({ token, item })}
                    >
                      <i className="bi bi-heart-fill"></i>
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
