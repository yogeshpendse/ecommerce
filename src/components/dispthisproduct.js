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
        <div className="product-page">
          <div className="product-page-container">
            <div className="product-page-image">
              <img src={product.image} alt="imagename" />
            </div>
            <div className="product-page-name">
              <p>{product.name}</p>
              <p>&#8377;&nbsp;{product.price}</p>
            </div>
            <div className="product-page-tags">
              <p className="product-page-tag-star">
                <strong>
                  {product.stars}&nbsp;<i className="bi bi-star-fill"></i>
                </strong>
              </p>
              {product.timed && (
                <p className="product-page-tag-delivery">
                  <strong>fast</strong>
                </p>
              )}

              <p
                className={
                  product.foodtype === "vegetarian"
                    ? "product-page-tag-veg"
                    : "product-page-tag-nonveg"
                }
              >
                <strong>
                  {product.foodtype === "vegetarian" ? "veg" : "non-veg"}
                </strong>
              </p>
              {product.newdish && (
                <p className="product-page-tag-newdish">
                  <strong>new-dish</strong>
                </p>
              )}
            </div>
            <div className="product-page-controllers">
              <button
                onClick={() => handlecartbutton(product)}
                className="btn btn-primary product-page-btn cursor-pointer"
              >
                add to cart
              </button>
              <button
                onClick={() => handlewishlistbutton(product)}
                className="btn btn-primary product-page-btn cursor-pointer"
              >
                add to wishlist
              </button>
            </div>
            <div className="product-page-description">
              <strong>description : </strong>
              {product.description}
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
    </>
  );
}
