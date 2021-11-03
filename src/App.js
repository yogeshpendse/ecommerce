import "./App.css";
import { Productpage } from "./pages/productpage";
import { Routes, Route } from "react-router-dom";
import { Cartpage } from "./pages/cartpage";
import { Wishlistpage } from "./pages/wishlist";
import { Loginpage } from "./pages/loginpage";
import { Pagenotfound } from "./pages/pagenotfound";
import { Privateroute } from "./privateroutes/private-route";
import { Navbar } from "./components/navbar";
import { Signuppage } from "./pages/signuppage";
import { Productdisppage } from "./pages/productdisppage";
function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route end path="/" element={<Productpage />} />
        <Route end path="product/:prid" element={<Productdisppage />} />
        <Privateroute end path="/cart" element={<Cartpage />} />
        <Privateroute end path="/wishlist" element={<Wishlistpage />} />
        <Route end path="/login" element={<Loginpage />} />
        <Route end path="/signup" element={<Signuppage />} />
        <Route end path="*" element={<Pagenotfound />} />
      </Routes>
    </div>
  );
}

export default App;
