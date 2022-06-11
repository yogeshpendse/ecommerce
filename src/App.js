import { Routes, Route } from "react-router-dom";
import { Homepage } from "./pages/Homepage";
import { Accountpage } from "./pages/Accountpage";
import { Cartpage } from "./pages/Cartpage";
import { Privateroute } from "./routes/privateroutes/privateroute";
import { Navbar } from "./components/Navbar";
import { Wishlistpage } from "./pages/Wishlistpage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./styles.css";
import { Productpage } from "./pages/Productpage";
import { Registerpage } from "./pages/Registerpage";
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/product/:prid" element={<Productpage />} />
        <Route
          path="/cart"
          element={
            <Privateroute>
              <Cartpage />
            </Privateroute>
          }
        />
        <Route
          path="/wishlist"
          element={
            <Privateroute>
              <Wishlistpage />
            </Privateroute>
          }
        />
        <Route path="/account" element={<Accountpage />} />
        <Route path="/register" element={<Registerpage />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
