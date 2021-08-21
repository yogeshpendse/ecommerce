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
        <div className="product-cardcontainer">
          {arraysix.map((item) => {
            return (
              <div className="product-card" key={item.prid}>
                <div className="product-badge">Hot</div>
                <div className="product-tumb">
                  <img src={item.image} alt={item.name} />
                </div>
                <div className="product-details">
                  <span className="product-catagory">{item.foodtype}</span>
                  <span className="product-header">
                    <Link to={`/product/${item.prid}`}>
                      <h3>{item.name}</h3>
                    </Link>
                  </span>
                  <p>{item.description}...</p>
                  <p>{item.timed && "Fast Delivery"}</p>
                  <p>{item.newdish ? "New Dish" : "Old Dish"}</p>
                  <p>{item.stars}</p>
                  <div className="product-bottom-details">
                    <div className="product-price">
                      {/* <small className="unhilighted-color">
                      &#8377;{item.price * item.randommultiplier}
                    </small> */}
                      <span style={{ color: "green" }}>
                        &#8377;{item.price} &nbsp;
                      </span>
                      {/* <span style={{ fontSize: "medium" }}>
                      {Math.round(100 / item.randommultiplier)}% discount
                    </span> */}
                    </div>
                    <div className="product-links">
                      <button
                        // handlewishlistbutton(item)
                        onClick={() => handlewishlistbutton(item)}
                        className="product-whishlist-heart"
                      >
                        <span style={{ fontSize: "2rem" }}> &#9829; </span>
                      </button>
                      <button
                        // handlecartbutton(item)
                        onClick={() => handlecartbutton(item)}
                        className="product-whishlist-cart"
                      >
                        <span style={{ fontSize: "2rem" }}>+</span>
                      </button>
                    </div>
                  </div>
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
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
      />
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
