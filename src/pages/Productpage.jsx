import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { baseurl } from "../apiandurl/baseurl";
import "../csslayouts/productlayout.css";
import { addtocart } from "../apiandurl/addtocart";
import { useCartcontext } from "../contexts/Cartcontext";
import { addtowishlist } from "../apiandurl/wishlistfunctions";
import { useWishlistcontext } from "../contexts/Wishlistcontext";
import { useAuth } from "../contexts/Authcontext";
import { Myloader } from "../components/Myloader";
import { toast } from "react-toastify";

export function Productpage() {
  const { prid } = useParams();
  const [state, setState] = useState({});
  const [loader, setLoader] = useState(false);
  const { cartdispatch } = useCartcontext();
  const { wishlistdispatch } = useWishlistcontext();
  const { token } = useAuth();
  const url = `${baseurl}/product/getthisprod/${prid}`;
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
  }, [url]);
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
  // {JSON.stringify(state)}
  return (
    <>
      {loader ? (
        <center className="mt-loader">
          <Myloader />
        </center>
      ) : (
        <div className="productlayout">
          <div className="productlayout__imagecontainer">
            <img
              className="img__responsive"
              src={state.image}
              alt={state.name}
            />
          </div>
          <p className="productlayout__name">{state.name}</p>
          <div className="productlayout__tags">
            {state.foodtype === "vegetarian" && (
              <span className="productlayout__tag">
                <i className="bi bi-stop-circle-fill green" />
                <span className="productlayout__tagtext">veg</span>
              </span>
            )}
            {state.foodtype === "non-vegetarian" && (
              <p className="productlayout__tag">
                <i className="bi bi-stop-circle-fill red" />
                <span className="productlayout__tagtext">non-veg</span>
              </p>
            )}

            {state.timed && (
              <p className="productlayout__tag">
                <i className="bi bi-truck orange" />
                <span className="productlayout__tagtext">fast-delivery</span>
              </p>
            )}
            <p className="productlayout__tag">
              <span className="productlayout__tagtext">{state.stars}</span>
              <i className="bi bi-star-fill star" />
            </p>
          </div>
          <p className="productlayout__desc">{state.description}</p>
          <div className="productlayout__buttons">
            <button
              className="btn btn--primary fit-content"
              onClick={() => handlecart({ token, item: state })}
            >
              add to cart
            </button>
            <button
              className="btn btn--primary fit-content"
              onClick={() => handlewishlist({ token, item: state })}
            >
              add to wishlist
            </button>
          </div>
        </div>
      )}
    </>
  );
}
