import { useCart } from "../context-used/cart-context";
import "../cssfrorcomponents/dispthisprod.css";
export function Dispthisprod(params) {
  const { dispatch } = useCart();
  const { product } = params;
  return (
    <div>
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
            <button
              onClick={() =>
                dispatch({ type: "ADD_TO_CART", payload: product })
              }
            >
              add to cart
            </button>
            <button
              onClick={() =>
                dispatch({ type: "ADD_TO_WHISHLIST", payload: product })
              }
            >
              add to whishlist
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
