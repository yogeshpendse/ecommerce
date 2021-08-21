import { useAuth } from "../contexts/auth-context";
import { useCartcontext } from "../contexts/cart-context";
import { useWishlistcontext } from "../contexts/wishlist-context";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export function Dispthisproduct(params) {
  const { product, loader } = params;
  const { myauthAxios } = useAuth();
  const { cartdispatch } = useCartcontext();
  const { wishlistdispatch } = useWishlistcontext();
  async function handlecartbutton(item) {
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
      }
      toast.success("added to cart", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
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
  }
  async function handlewishlistbutton(item) {
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
      console.log({
        success: false,
        errormessage: error.message,
        error: error.response.data.message,
        status: error.response.status,
      });
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
    <>
      {loader ? (
        <h1 style={{ textAlign: "center" }}>loading...</h1>
      ) : (
        <div className="thisproductpage">
          <div className="thisproductimagecontainer">
            <img className="thisproductimage" src={product.image} alt="" />
          </div>
          <div className="thisproductdescriptiondata">
            <h1>{product.name} </h1>
            <h2 className="thisproductcategory">{product.department}</h2>
            <p className="thisproductdescription">{product.description}</p>
            <div className="thisproductotherdata">
              <p>{product.fastDelivery && "Fast Delivery"}</p>
              <p>{product.inStock === false && "Out of stock"}</p>
              <button onClick={() => handlecartbutton(product)}>
                add to cart
              </button>
              <button onClick={() => handlewishlistbutton(product)}>
                add to whishlist
              </button>
            </div>
          </div>
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
    </>
  );
}
