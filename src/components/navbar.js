import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useCartcontext } from "../contexts/cart-context";
import { useWishlistcontext } from "../contexts/wishlist-context";
import { useWidth } from "../customhooks/useWidth";
import "../cssforcomponents/navbarcss.css";
export function Navbar() {
  const { wishliststate } = useWishlistcontext();
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
                  <NavLink
                    end
                    className="navbar-link"
                    // activeClassName="navbar-main-ul-a"
                    to="/"
                  >
                    Home
                  </NavLink>
                </span>
                <span>
                  <NavLink
                    className="navbar-link"
                    // activeClassName="navbar-main-ul-a"
                    to="/products"
                  >
                    products
                  </NavLink>
                </span>
                <span>
                  <NavLink
                    className="navbar-link"
                    // activeClassName="navbar-main-ul-a"
                    to="/cart"
                  >
                    cart <sup>{cartstate.dataincart.length}</sup>
                  </NavLink>
                </span>
                <span>
                  <NavLink
                    className="navbar-link"
                    // activeClassName="navbar-main-ul-a"
                    to="/wishlist"
                  >
                    wishlist <sup>{wishliststate.datainwishlist.length}</sup>
                  </NavLink>
                </span>
                <span>
                  <NavLink
                    className="navbar-link"
                    // activeClassName="navbar-main-ul-a"
                    to="/login"
                  >
                    account
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
  const { cartstate } = useCartcontext();
  const { wishliststate } = useWishlistcontext();
  return (
    <>
      <ul className="links">
        <li className="links-item">
          <NavLink end className="navbar-link" to="/">
            Home
          </NavLink>
        </li>
        <li className="links-item">
          <NavLink className="navbar-link" to="/products">
            products
          </NavLink>
        </li>
        <li className="links-item">
          <NavLink className="navbar-link" to="/cart">
            cart <sup>{cartstate.dataincart.length}</sup>
          </NavLink>
        </li>
        <li className="links-item">
          <NavLink className="navbar-link" to="/wishlist">
            wishlist <sup>{wishliststate.datainwishlist.length}</sup>
          </NavLink>
        </li>
        <li className="links-item">
          <NavLink className="navbar-link" to="/login">
            account
          </NavLink>
        </li>
      </ul>
    </>
  );
}
