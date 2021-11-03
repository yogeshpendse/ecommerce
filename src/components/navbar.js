import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useCartcontext } from "../contexts/cart-context";
import { useWidth } from "../customhooks/useWidth";
import "../cssforcomponents/navbarcss.css";
export function Navbar() {
  const { cartstate } = useCartcontext();
  const [state, setState] = useState(false);
  const hookval = useWidth();
  const width = hookval.width || window.innerWidth;
  const screensizetoggle = width > 600 ? true : false;
  console.log({ navsup: cartstate.dataincart.length });
  return (
    <div>
      <header>
        <nav className="color-fixes">
          <div className="Navbar">
            <h3 style={{ paddingLeft: "1rem", fontStyle: "italic" }}>Pizza+</h3>
            {screensizetoggle ? (
              <div className="display-list">
                <span>
                  <NavLink className="navbar-link" to="/">
                    Products
                  </NavLink>
                </span>
                <span>
                  <NavLink className="navbar-link" to="/cart">
                    Cart
                    {/*  <sup>{cartstate.dataincart.length}</sup> */}
                  </NavLink>
                </span>
                <span>
                  <NavLink className="navbar-link" to="/wishlist">
                    Wishlist
                  </NavLink>
                </span>
                <span>
                  <NavLink className="navbar-link" to="/login">
                    Account
                  </NavLink>
                </span>
              </div>
            ) : (
              <>
                <button className="toggler" onClick={() => setState(!state)}>
                  {state ? (
                    <>
                      <i className="bi bi-x-lg"></i>
                    </>
                  ) : (
                    <>
                      <i className="bi bi-list"></i>
                    </>
                  )}
                </button>
              </>
            )}
          </div>
          {screensizetoggle === false && state && <Listval />}
        </nav>
      </header>
    </div>
  );
}

function Listval(state) {
  // const { cartstate } = useCartcontext();
  return (
    <>
      <ul className="links">
        <li className="links-item ml-0_5rem">
          <NavLink className="navbar-link" to="/">
            Products
          </NavLink>
        </li>
        <li className="links-item ml-0_5rem">
          <NavLink className="navbar-link" to="/cart">
            Cart
            {/* Cart <sup>{cartstate.dataincart.length}</sup> */}
          </NavLink>
        </li>
        <li className="links-item ml-0_5rem">
          <NavLink className="navbar-link" to="/wishlist">
            Wishlist
          </NavLink>
        </li>
        <li className="links-item ml-0_5rem pb-0_5rem">
          <NavLink className="navbar-link" to="/login">
            Account
          </NavLink>
        </li>
      </ul>
    </>
  );
}
