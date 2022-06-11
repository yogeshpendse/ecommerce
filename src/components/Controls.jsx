import { useState } from "react";
import { useProductcontext } from "../contexts/Prodcontext";

export function Controls() {
  const [modalstatus, setModalstatus] = useState(false);
  const { productdispatch, productstate } = useProductcontext();
  const searchbox = (searchboxvalue) => {
    productdispatch({ type: "SET_SEARCH_TEXT", payload: searchboxvalue });
  };
  const togglefoodtype = (value) => {
    productdispatch({ type: "TOGGLE_DISHTYPE", payload: value });
  };
  const toggledeliverytype = (value) => {
    productdispatch({ type: "TOGGLE_TIMED", payload: value });
  };
  const togglenewdish = (value) => {
    productdispatch({ type: "TOGGLE_NEWDISH", payload: value });
  };
  const togglesort = (value) => {
    productdispatch({ type: "TOGGLE_SORT", payload: value });
  };
  const toggledishtype = (value) => {
    productdispatch({ type: "TOGGLE_FOOD_DISHTYPE", payload: value });
  };
  return (
    <div className="controlcomponent">
      <center className="control-input">
        <input
          value={productstate.searchtext}
          className="input"
          placeholder="search"
          onChange={(event) => searchbox(event.target.value)}
        />
      </center>
      <button
        className="btn btn--olprimary"
        onClick={() => setModalstatus(true)}
      >
        Filters
      </button>

      {modalstatus && (
        <div className="modal__overlay">
          <div className="modal">
            <div className="modal__header">Filters</div>
            <div className="modal__content">
              <div className="filter__container">
                <label>food : </label>
                <select
                  value={productstate.dishtype}
                  onChange={(e) => togglefoodtype(e.target.value)}
                >
                  <option value="both">both</option>
                  <option value="vegetarian">veg</option>
                  <option value="non-vegetarian">nonveg</option>
                </select>
              </div>
              <div className="filter__container">
                <label>delivery : </label>
                <select
                  value={productstate.timed}
                  onChange={(e) => toggledeliverytype(e.target.value)}
                >
                  <option value="both">both</option>
                  <option value="TIMED">timed</option>
                  <option value="NON_TIMED">regular</option>
                </select>
              </div>
              <div className="filter__container">
                <label>new : </label>
                <select
                  value={productstate.newdish}
                  onChange={(e) => togglenewdish(e.target.value)}
                >
                  <option value="both">both</option>
                  <option value="NEW_DISH">new dish</option>
                  <option value="OTHERS">others</option>
                </select>
              </div>
              <div className="filter__container">
                <label>sort : </label>
                <select
                  value={productstate.sort}
                  onChange={(e) => togglesort(e.target.value)}
                >
                  <option value="NONE">none</option>
                  <option value="PRICE_HIGH_TO_LOW">expensive</option>
                  <option value="PRICE_LOW_TO_HIGH">cheap</option>
                  <option value="STARS_HIGH_TO_LOW">popularity</option>
                </select>
              </div>
              <div className="filter__container">
                <label>type : </label>
                <select
                  value={productstate.fooddishtype}
                  onChange={(e) => toggledishtype(e.target.value)}
                >
                  <option value="all">all</option>
                  <option value="pizza">pizza</option>
                  <option value="sides">sides</option>
                  <option value="dessert">dessert</option>
                  <option value="drinks">drinks</option>
                </select>
              </div>
            </div>
            <div className="modal__controls">
              <button
                className="btn btn--primary"
                onClick={() => setModalstatus(false)}
              >
                close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
