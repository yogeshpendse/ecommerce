// import { useCart } from "./context-used/cart-context"
import { Link } from "react-router-dom";
import { useCart } from "../context-used/cart-context";

export function Whishlist() {
  const { state, dispatch } = useCart();
  console.log(state.whishlist);
  const whishlistdata = state.whishlist;
  return (
    <div>
      <h1>This is Whishlist.</h1>
      <div className="product-cardcontainer">
        {whishlistdata.map((items) => (
          <div key={items.id}>
            <div className="product-card">
              <div className="product-badge">Hot</div>
              <div className="product-tumb">
                <Link to={`/productviewpage/${items.id}`}>
                  <img src={items.image} alt="" />
                </Link>
              </div>
              <div className="product-details">
                <span className="product-catagory">{items.department}</span>
                <span className="product-header">
                  {/* <Link to={`/productviewpage/${item.id}`}> */}
                  <h2>
                    <Link to={`/productviewpage/${items.id}`}>
                      {items.name}
                    </Link>
                  </h2>
                </span>
                <p>{items.description.substring(0, 40)}...</p>
                <div className="product-bottom-details">
                  <div className="product-price">
                    <small className="unhilighted-color">
                      &#8377;{items.price * 2}
                    </small>
                    &#8377;{items.price}
                  </div>
                  <div className="product-links">
                    <button
                      onClick={() =>
                        dispatch({
                          type: "REMOVE_FROM_WHISHLIST",
                          payload: items
                        })
                      }
                      className="product-whishlist-heart"
                    >
                      <span style={{ fontSize: "2rem" }}>&#215;</span>
                    </button>
                    <button
                      // WHISHLIST_TO_CART
                      onClick={() =>
                        dispatch({
                          type: "WHISHLIST_TO_CART",
                          payload: items
                        })
                      }
                      className="product-whishlist-cart"
                    >
                      <span style={{ fontSize: "2rem" }}>+</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
