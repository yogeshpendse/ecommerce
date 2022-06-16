import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { baseurl } from "../apiandurl/baseurl";
import {
  incrementbyone,
  decrementbyone,
  deleteproductfromcart,
} from "../apiandurl/cartfunctions";
import { Myloader } from "../components/Myloader";
import { useAuth } from "../contexts/Authcontext";
import { useCartcontext } from "../contexts/Cartcontext";
export function Cartpage() {
  const [loader, setLoader] = useState(false);
  const { cartdispatch, cartstate } = useCartcontext();
  const { token } = useAuth();
  const cartsum = [...cartstate.dataincart].reduce(
    (acc, obj) => acc + obj.price * obj.quantity,
    0
  );
  const url = `${baseurl}/cart/getcartdata`;
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
        cartdispatch({
          type: "SET_DATA_TO_ARRAY",
          payload: responsedata.data.data.productsincart,
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
  }, [url, token, cartdispatch]);
  async function incrementincart(params) {
    const { token, item } = params;
    const response = await incrementbyone({ token, item });
    if (response.success) {
      cartdispatch({
        type: "SET_DATA_TO_ARRAY",
        payload: response.productsincart,
      });
    } else {
      toast.error("increment failed", {
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
  async function decrementincart(params) {
    const { token, item } = params;
    const response = await decrementbyone({ token, item });
    if (response.success) {
      cartdispatch({
        type: "SET_DATA_TO_ARRAY",
        payload: response.productsincart,
      });
    } else {
      toast.error("decremented failed", {
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
  async function deletefromcart(params) {
    const { token, item } = params;
    const response = await deleteproductfromcart({ token, item });
    if (response.success) {
      cartdispatch({
        type: "SET_DATA_TO_ARRAY",
        payload: response.productsincart,
      });
      toast.success("deleted", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast.error("deletion failed", {
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
  console.log({ cartsum });
  return (
    <>
      <div className="page-width">
        {loader ? (
          <>
            <center className="mt-loader">
              <Myloader />
            </center>
          </>
        ) : (
          <>
            {[...cartstate.dataincart].length === 0 && (
              <center className="no-products">
                <h1>No products in Cart.</h1>
              </center>
            )}
            <>
              {cartsum > 0 && (
                <center className="carttotal-container">
                  <h1>
                    Total:&nbsp;
                    <span className="carttotal">
                      &#8377;
                      {cartsum}
                    </span>
                  </h1>
                </center>
              )}
              <div className="grid grid__col--3 cart-container">
                {[...cartstate.dataincart].map((item) => (
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
                    <div className="ecard__counter">
                      <button
                        className={
                          item.quantity < 1
                            ? "ecard__counterdown ecard__counterdown--disabled"
                            : "ecard__counterdown"
                        }
                        disabled={item.quantity < 1 ? true : false}
                        onClick={() => decrementincart({ item, token })}
                      >
                        <i className="bi bi-dash-circle" />
                      </button>
                      <p className="ecard__countervalue">{item.quantity}</p>
                      <button
                        className="ecard__counterup"
                        onClick={() => incrementincart({ item, token })}
                      >
                        <i className="bi bi-plus-circle" />
                      </button>
                    </div>
                    <p className="ecard__price">&#8377;&nbsp;{item.price}</p>
                    <button
                      className="ecard__addtocart"
                      onClick={() => deletefromcart({ item, token })}
                    >
                      remove
                    </button>
                  </div>
                ))}
              </div>
            </>
          </>
        )}
      </div>
    </>
  );
}

/**
 * 
 * 
 *
<button onClick={() => incrementincart({ item, token })}>
                    increment
</button>
                  {item.quantity > 1 && (
<button onClick={() => decrementincart({ item, token })}>
                      decrement
</button>
                  )}
<button onClick={() => deletefromcart({ item, token })}>
                    delete
</button>
*/
