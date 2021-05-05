import { NavLink } from "react-router-dom";
import { useCart } from "../context-used/cart-context";

export function Navbar() {
  const { state } = useCart();
  return (
    <div>
      <header>
        <nav className="navbar-main">
          <h1 className="navbar-main-header">e-commerce</h1>
          <ul className="navbar-main-ul">
            <li className="navbar-main-links">
              <NavLink
                end
                className="navbar-main-ul-ua"
                activeClassName="navbar-main-ul-a"
                to="/"
              >
                Home
              </NavLink>
            </li>
            <li className="navbar-main-links">
              <NavLink
                className="navbar-main-ul-ua"
                activeClassName="navbar-main-ul-a"
                to="/cart"
              >
                cart
                <sup>
                  <span
                    style={
                      state.prodsincart.length !== 0
                        ? null
                        : { display: "none" }
                    }
                  >
                    <span className="red-badge-circle">
                      {state.prodsincart.length}
                    </span>
                  </span>
                </sup>
              </NavLink>
            </li>
            <li className="navbar-main-links">
              <NavLink
                className="navbar-main-ul-ua"
                activeClassName="navbar-main-ul-a"
                to="/whishlist"
              >
                whishlist
              </NavLink>
            </li>
            <li className="navbar-main-links">
              <NavLink
                className="navbar-main-ul-ua"
                activeClassName="navbar-main-ul-a"
                to="/acc"
              >
                Account
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
}
