// import { useCart } from "./context-of-cart";
import { useCart } from "../context-used/cart-context";
import { Link } from "react-router-dom";
import { carttotal } from "../functions/carttotal";

export function Cart() {
  const { state, dispatch } = useCart();
  const cartitems = state.prodsincart;
  // const { state } = useCart();
  const total = cartitems.reduce(carttotal, 0);
  console.log("total", total);
  console.log(state.prodsincart);
  return (
    <div>
      <h1>This is cart.</h1>
      <h2 style={{ marginLeft: "10%" }}>total : &#8377; {total}</h2>
      <div>
        <div className="product-cardcontainer">
          {cartitems.map((items) => (
            <div key={items.id}>
              <div>
                <div className="product-card">
                  <div className="product-badge">Hot</div>
                  <div className="product-tumb">
                    <Link to={`/productviewpage/${items.id}`}>
                      <img src={items.image} alt="" />
                    </Link>
                  </div>
                  <div className="product-details">
                    <span className="product-catagory">{items.department}</span>
                    <h3>
                      <Link
                        className="cart-productname"
                        to={`/productviewpage/${items.id}`}
                      >
                        {items.name}
                      </Link>
                    </h3>
                    <p>
                      <span style={{ color: "black" }}>
                        Stock status :&nbsp;
                        {items.inStock ? "available" : "not available"} <br />
                        fast delivery status - &nbsp;
                        {items.fastDelivery ? "available" : "not available"}
                      </span>
                    </p>
                    <div className="product-bottom-details">
                      <div className="product-price">
                        <small className="unhilighted-color">
                          ₹ {items.price * 2}
                        </small>
                        ₹{items.price}
                      </div>
                      <div className="product-links">
                        <button
                          onClick={() =>
                            dispatch({
                              type: "ADD_TO_WHISHLIST",
                              payload: items
                            })
                          }
                          className="product-whishlist-heart"
                        >
                          <span style={{ fontSize: "2rem" }}> &#9829; </span>
                        </button>
                        <button
                          onClick={() =>
                            dispatch({
                              type: "REMOVE_FROM_CART",
                              payload: items
                            })
                          }
                          style={{ fontSize: "2rem" }}
                        >
                          &#128465;
                        </button>
                      </div>
                      <div style={{ fontSize: "2rem" }}>
                        <button
                          onClick={() =>
                            dispatch({
                              type: "DECREMENT_BY_ONE",
                              payload: items
                            })
                          }
                          style={{
                            fontSize: "1rem",
                            width: "2rem",
                            height: "2rem",
                            borderRadius: "50%",
                            cursor: "pointer"
                          }}
                        >
                          &lt;
                        </button>
                        &nbsp;
                        {items.quantity}&nbsp;
                        <button
                          onClick={() =>
                            dispatch({
                              type: "INCREMENT_BY_ONE",
                              payload: items
                            })
                          }
                          style={{
                            fontSize: "1rem",
                            width: "2rem",
                            height: "2rem",
                            borderRadius: "50%",
                            cursor: "pointer"
                          }}
                        >
                          &gt;
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            // open
          ))}
          {/* <h3></h3> */}
        </div>
      </div>
    </div>
  );
}
