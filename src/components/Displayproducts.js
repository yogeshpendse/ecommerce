import { Link } from "react-router-dom";
import { useCart } from "../context-used/cart-context";
export function Displayproducts() {
  const {
    state,
    data,
    sortdata,
    applyfilters,
    dispatch,
    searchterm,
    searcheddata
  } = useCart();
  const outtastocktoggle = state.includeoutodstock;
  const deliverytoggle = state.fastdelivery;
  const sortingstate = state.sorting;
  const queriedddata = searcheddata(data, searchterm);
  const modifieddata = sortdata(queriedddata, { sortingstate });
  const finaldata = applyfilters(modifieddata, {
    outtastocktoggle,
    deliverytoggle
  });
  return (
    <div>
      <div className="product-cardcontainer">
        {finaldata.map((item) => (
          <div key={item.id}>
            <div className="product-card">
              <div className="product-badge">Hot</div>
              <div className="product-tumb">
                <Link to={`/productviewpage/${item.id}`}>
                  <img src={item.image} alt="" />
                </Link>
              </div>
              <div className="product-details">
                <span className="product-catagory">{item.department}</span>
                <span className="product-header">
                  <h3>
                    <Link to={`/productviewpage/${item.id}`}>{item.name}</Link>
                  </h3>
                </span>
                <p>{item.description.substring(0, 40)}...</p>
                <p>{item.fastDelivery && "Fast Delivery"}</p>
                <p>{item.inStock ? null : "Out of stock"}</p>
                <div className="product-bottom-details">
                  <div className="product-price">
                    <small className="unhilighted-color">
                      &#8377;{item.price * item.randommultiplier}
                    </small>
                    <span style={{ color: "black" }}>
                      &#8377;{item.price} &nbsp;
                    </span>
                    <span style={{ fontSize: "medium" }}>
                      {Math.round(100 / item.randommultiplier)}% discount
                    </span>
                  </div>
                  <div className="product-links">
                    <button
                      onClick={() =>
                        dispatch({
                          type: "ADD_TO_WHISHLIST",
                          payload: item
                        })
                      }
                      className="product-whishlist-heart"
                    >
                      <span style={{ fontSize: "2rem" }}> &#9829; </span>
                    </button>
                    <button
                      onClick={() =>
                        dispatch({ type: "ADD_TO_CART", payload: item })
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
        ;
      </div>
    </div>
  );
}
