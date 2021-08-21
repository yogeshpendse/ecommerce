import { useEffect } from "react";
import { useAuth } from "../contexts/auth-context";
import axios from "axios";
import { useWishlistcontext } from "../contexts/wishlist-context";
import { useCartcontext } from "../contexts/cart-context";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function Wishlistpage() {
  // const [state, setState] = useState([]);
  const { token, myauthAxios } = useAuth();
  const { wishliststate, wishlistdispatch } = useWishlistcontext();
  const { cartstate, cartdispatch } = useCartcontext();
  const wishliststatearray = [...wishliststate.datainwishlist];
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
    <div>
      <h1>This is Wishlist page</h1>
      <div className="product-cardcontainer">
        {wishliststatearray.map((item) => {
          return (
            <div key={item.prid}>
              <div className="product-card">
                <div className="product-badge">Hot</div>
                <div className="product-tumb">
                  <img src={item.image} alt={item.name} />
                </div>
                <div className="product-details">
                  <span className="product-catagory">{item.foodtype}</span>
                  <span className="product-header">
                    {/* <Link to={`/productviewpage/${item.id}`}> */}
                    <h2>{item.name}</h2>
                  </span>
                  <p>{item.description.substring(0, 40)}...</p>
                  <div className="product-bottom-details">
                    <div className="product-price">&#8377;{item.price}</div>
                    <div className="product-links">
                      <button
                        onClick={() => {
                          // REMOVE_FROM_WHISHLIST
                          removefromwishlist(item);
                          // console.log({ message: "REMOVE_FROM_WHISHLIST" });
                          // dispatch({
                          //   type: "REMOVE_FROM_WHISHLIST",
                          //   payload: items,
                          // })
                        }}
                        className="product-whishlist-heart"
                      >
                        <span style={{ fontSize: "2rem" }}>&#215;</span>
                      </button>
                      <button
                        // WHISHLIST_TO_CART
                        onClick={() => {
                          wishlisttocart(item);

                          // dispatch({
                          //   type: "WHISHLIST_TO_CART",
                          //   payload: items,
                          // });
                        }}
                        className="product-whishlist-cart"
                      >
                        <span style={{ fontSize: "2rem" }}>+</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
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
