import { useCart } from "../context-used/cart-context";

export function Inputfields() {
  const { setSearchterm, dispatch } = useCart();
  return (
    <>
      <div className="inputs-alignment">
        <div>
          <input
            className="basic-input-box"
            type="text"
            placeholder="search products"
            onChange={(event) => setSearchterm(event.target.value)}
          ></input>
        </div>

        <div>
          <button onClick={() => dispatch({ type: "HIGH_TO_LOW" })}>
            high to low
          </button>
          <button onClick={() => dispatch({ type: "LOW_TO_HIGH" })}>
            low to high
          </button>
        </div>

        <div>
          <fieldset style={{ marginTop: "1rem" }}>
            <legend> Filters </legend>
            <label>
              <input
                type="checkbox"
                onChange={() =>
                  dispatch({ type: "TOGGLE_INCLUDE_OUT_OF_STOCK" })
                }
              />
              Include Out of Stock
            </label>
            <label>
              <input
                type="checkbox"
                onChange={() => dispatch({ type: "TOGGLE_FAST_DELIVERY" })}
              />
              Fast Delivery Only
            </label>
          </fieldset>
        </div>
      </div>
    </>
  );
}
