import { Routes, Route } from "react-router-dom";
import { Cartpage } from "../pages/Cart-page";
import { Productpage } from "../pages/Productdisp-page";
import { Whishlistpage } from "../pages/Whishlist-page";
import { Productviewpage } from "../pages/Productpage";
import { Accountpage } from "../pages/Account-page";
import { Privateroute } from "./Privateroutes/Privateroute";

export function Reactrouter() {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<Productpage />} />
        <Privateroute path="/cart" element={<Cartpage />} />
        <Privateroute path="/whishlist" element={<Whishlistpage />} />
        <Route path="/productviewpage/:pid" element={<Productviewpage />} />
        <Route path="/acc" element={<Accountpage />} />
      </Routes>
    </div>
  );
}
