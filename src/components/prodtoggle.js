import { useState } from "react";
import { useProductcontext } from "../contexts/product-context";
import "../cssforcomponents/modalcss.css";

export function Prodtoggle() {
  // setState
  const [modalstatus, setModalstatus] = useState(false);
  const { productdispatch } = useProductcontext();
  const searchbox = (searchboxvalue) => {
    productdispatch({ type: "SET_SEARCH_TEXT", payload: searchboxvalue });
  };
  const togglefoodtype = (value) => {
    // console.log({ foodtypeval: value });
    productdispatch({ type: "TOGGLE_DISHTYPE", payload: value });
  };
  const toggledeliverytype = (value) => {
    // console.log({ deliverytype: value });
    productdispatch({ type: "TOGGLE_TIMED", payload: value });
  };
  const togglenewdish = (value) => {
    // console.log({ newdish: value });
    productdispatch({ type: "TOGGLE_NEWDISH", payload: value });
  };
  const togglesort = (value) => {
    // console.log({ sorttype: value });
    productdispatch({ type: "TOGGLE_SORT", payload: value });
  };
  const toggledishtype = (value) => {
    // console.log({ sorttype: value });
    productdispatch({ type: "TOGGLE_FOOD_DISHTYPE", payload: value });
  };
  return (
    <>
      <div className="flex justify-content-center">
        <input type="search" onChange={(e) => searchbox(e.target.value)} />
      </div>
      <button
        className="modal-open cursor-pointer ml-0-5rem"
        onClick={() => setModalstatus(true)}
      >
        <span className="modal-open-text">
          <i className="bi bi-filter"></i>&nbsp;filters
        </span>
      </button>

      {modalstatus && (
        <div className="modal-box text-align-center">
          <div className="modal">
            <div className="modal-content">
              <div className="modal-control-items">
                <label>food type : </label>
                <select onChange={(e) => togglefoodtype(e.target.value)}>
                  <option value="both">both</option>
                  <option value="vegetarian">vegetarian</option>
                  <option value="non-vegetarian">non-vegetarian</option>
                </select>
              </div>
              <div className="modal-control-items">
                <label>delivery type : </label>
                <select onChange={(e) => toggledeliverytype(e.target.value)}>
                  <option value="both">both</option>
                  <option value="TIMED">timed</option>
                  <option value="NON_TIMED">non-timed</option>
                </select>
              </div>
              <div className="modal-control-items">
                <label>new dish : </label>
                <select onChange={(e) => togglenewdish(e.target.value)}>
                  <option value="both">both</option>
                  <option value="NEW_DISH">new dish</option>
                  <option value="OTHERS">others</option>
                </select>
              </div>
              <div className="modal-control-items">
                <label>sort : </label>
                <select onChange={(e) => togglesort(e.target.value)}>
                  <option value="NONE">none</option>
                  <option value="PRICE_HIGH_TO_LOW">price high to low</option>
                  <option value="PRICE_LOW_TO_HIGH">price low to high</option>
                  <option value="STARS_HIGH_TO_LOW">stars high to low</option>
                </select>
              </div>
              <div className="modal-control-items">
                <label>dish type : </label>
                <select onChange={(e) => toggledishtype(e.target.value)}>
                  <option value="all">all</option>
                  <option value="pizza">pizza</option>
                  <option value="sides">sides</option>
                  <option value="dessert">dessert</option>
                  <option value="drinks">drinks</option>
                </select>
              </div>
            </div>
            <button
              onClick={() => setModalstatus(false)}
              className="modal-close"
            >
              <span className="modal-close-text">close</span>
            </button>
          </div>
        </div>
      )}

      <hr />
    </>
  );
}
