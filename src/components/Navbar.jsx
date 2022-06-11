import { useState } from "react";
import { Link } from "react-router-dom";
export function Navbar() {
  const [navbartgl, setNavbartgl] = useState(false);

  return (
    <>
      <nav className="navbar sticky lift-navbar">
        <div className="navbar__container">
          <Link className="navbar__brand" to="/">
            Pizza+
          </Link>
          <ul className="navbar__links">
            <li className="navbar__link">
              <Link className="navbar-link" to="/">
                Products
              </Link>
            </li>
            <li className="navbar__link">
              <Link className="navbar-link" to="/cart">
                Cart
              </Link>
            </li>
            <li className="navbar__link">
              <Link className="navbar-link" to="/wishlist">
                Wishlist
              </Link>
            </li>
            <li className="navbar__link">
              <Link className="navbar-link" to="/account">
                Account
              </Link>
            </li>
          </ul>
          <div className="navbar__togglebox">
            <button
              onClick={() => setNavbartgl(!navbartgl)}
              className="navbar__toggle"
            >
              {navbartgl ? (
                <i className="bi bi-x" />
              ) : (
                <i className="bi bi-list" />
              )}
            </button>
          </div>
        </div>
        <div
          className={
            navbartgl
              ? "navbar__dropdown navbar__dropdown--open"
              : "navbar__dropdown"
          }
        >
          <ul className="navbar__dlinks">
            <li>
              <Link className="navbar__dlink" to="/">
                Products
              </Link>
            </li>
            <li>
              <Link className="navbar__dlink" to="/cart">
                Cart
              </Link>
            </li>
            <li>
              <Link className="navbar__dlink" to="/wishlist">
                Wishlist
              </Link>
            </li>
            <li>
              <Link className="navbar__dlink" to="/account">
                Account
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}
