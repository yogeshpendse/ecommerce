import { Cart } from "../components/Cart";
import { Navbar } from "../components/Navbar";

export function Cartpage() {
  console.log("cart displayed");
  return (
    <div>
      <Navbar />
      <p>yeh cart hai</p>
      <Cart />
    </div>
  );
}
