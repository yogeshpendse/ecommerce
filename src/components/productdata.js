import axios from "axios";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/auth-context";
import { useCartcontext } from "../contexts/cart-context";
import { useProductcontext } from "../contexts/product-context";
import { useWishlistcontext } from "../contexts/wishlist-context";
import {
  applydishtype,
  applytimed,
  applynewdish,
  applysort,
  applyfooddishtype,
  retunsearch,
} from "../functions/productfunctions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../cssforcomponents/products.css";
export function Productdata(params) {
  const { productsstate, setProductsstate } = params;
  const { token, cartdispatch } = useCartcontext();
  const { wishlistdispatch } = useWishlistcontext();
  const { myauthAxios } = useAuth();
  const { state, setState, productstate } = useProductcontext();
  const arrayone = applydishtype(productstate.dishtype, state);
  const arraytwo = applytimed(productstate.timed, arrayone);
  const arraythree = applynewdish(productstate.newdish, arraytwo);
  const arrayfour = applysort(productstate.sort, arraythree);
  const arrayfive = applyfooddishtype(productstate.fooddishtype, arrayfour);
  const arraysix = retunsearch(productstate.searchtext, arrayfive);
  useEffect(() => {
    const source = axios.CancelToken.source();

    const fetchData = async () => {
      try {
        setProductsstate(true);
        console.log({ token });
        const response = await axios.get(
          "https://ecom-server--bleedblue.repl.co/product/getdata",
          {
            headers: { authorization: token },
            cancelToken: source.token,
          }
        );
        const productdata = response.data.data;
        setState(productdata);
        setProductsstate(false);
      } catch (error) {
        if (axios.isCancel(error)) {
          //cancelled
          setProductsstate(false);
          console.log("axios cancel : ", JSON.stringify(axios.isCancel(error)));
        } else {
          console.log({ success: false, errormessage: error.message });
        }
      }
    };

    fetchData();

    return () => {
      source.cancel();
    };
  }, [token, setState, setProductsstate]);

  async function handlecartbutton(item) {
    console.log({ ...item });
    try {
      const response = await myauthAxios.post("/cart/addtocart", { ...item });
      if (response.status === 200) {
        console.log({
          message: "added to cart",
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
        console.log({ message: "already exist" });
      }
    } catch (error) {
      console.log({ success: false, errormessage: error.message });
      if (
        error.response.data.message === "product already present in cart" &&
        error.response.status === 400
      ) {
        toast.info("product already present in cart", {
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

    // const prodexistance = checkifelementexist(cartstate.dataincart, item);
    // console.log({
    //   prodexistance,
    //   cartlistitem: item,
    //   cartaarray: cartstate.dataincart,
    // });
  }
  async function handlewishlistbutton(item) {
    // wishlistdispatch({ type: "RETURN_SAME_ARRAY", payload: item, });
    console.log({ wishlistitem: item });
    console.log({ ...item });
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
        toast.success("added to whishlist", {
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
      console.log({ success: false, errormessage: error.message });
      if (
        error.response.data.message === "already present in array" &&
        error.response.status === 400
      ) {
        console.log("already present in wishlist");
        toast.info("already present in wishlist", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        console.log("some error occured");
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
  return (
    <div>
      {productsstate ? (
        <h1 style={{ textAlign: "center" }}>Loading...</h1>
      ) : (
        <div className="container">
          {arraysix.map((item) => {
            return (
              <div className="product-card" key={item.prid}>
                <div className="product-top">
                  <img className="product-image" src={item.image} alt="pizza" />
                  <button
                    onClick={() => handlewishlistbutton(item)}
                    className="border-black btn-circle like cursor-pointer"
                  >
                    <i className="bi bi-heart-fill"></i>
                  </button>
                  <div className="spec-tags">
                    {item.timed && (
                      <span className="spec-tag-delivery">
                        <i className="bi bi-lightning-fill"></i>
                      </span>
                    )}
                    {item.foodtype === "vegetarian" ? (
                      <span className="spec-tag-veg">
                        <i className="bi bi-patch-minus-fill"></i>
                      </span>
                    ) : (
                      <span className="spec-tag-non-veg">
                        <i className="bi bi-patch-minus-fill"></i>
                      </span>
                    )}
                  </div>
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

                  {/* <div className="product-price">&#8377;&nbsp;{item.price}</div>
                  <button
                    onClick={() => handlecartbutton(item)}
                    className="btn btn-primary cursor-pointer"
                  >
                    add to cart
                  </button> */}
                </div>
                <div className="width-100per">
                  <div className="product-price ml-0-5rem">
                    &#8377;&nbsp;{item.price}
                  </div>
                  <button
                    onClick={() => handlecartbutton(item)}
                    className="btn btn-primary cursor-pointer width-100per"
                    style={{
                      borderTopRightRadius: "0px",
                      borderTopLeftRadius: "0px",
                      fontSize: "large",
                    }}
                  >
                    add to cart
                  </button>
                </div>
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
