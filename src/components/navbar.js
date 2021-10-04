import { NavLink } from "react-router-dom";
import { useCartcontext } from "../contexts/cart-context";
import { useWishlistcontext } from "../contexts/wishlist-context";
export function Navbar() {
  const { wishliststate } = useWishlistcontext();
  const { cartstate } = useCartcontext();
  // wishliststate.datainwishlist
  console.log({ navsup: cartstate.dataincart.length });
  return (
    <div>
      <header>
        <nav className="navbar-main">
          <h1 className="navbar-main-header">pizza+</h1>
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
                to="/products"
              >
                products
              </NavLink>
            </li>
            <li className="navbar-main-links">
              <NavLink
                className="navbar-main-ul-ua"
                activeClassName="navbar-main-ul-a"
                to="/wishlist"
              >
                wishlist <sup>{wishliststate.datainwishlist.length}</sup>
              </NavLink>
            </li>

            <li className="navbar-main-links">
              <NavLink
                className="navbar-main-ul-ua"
                activeClassName="navbar-main-ul-a"
                to="/cart"
              >
                cart <sup>{cartstate.dataincart.length}</sup>
              </NavLink>
            </li>
            <li className="navbar-main-links">
              <NavLink
                className="navbar-main-ul-ua"
                activeClassName="navbar-main-ul-a"
                to="/login"
              >
                account
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
}
