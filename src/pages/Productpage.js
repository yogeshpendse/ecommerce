import { useParams } from "react-router-dom";
import { Dispthisprod } from "../components/Dispthisprod";
import { Navbar } from "../components/Navbar";
import { useCart } from "../context-used/cart-context";
import { bringproductdata } from "../functions/bringproductdata";
export function Productviewpage() {
  const { data } = useCart();
  const { pid } = useParams();
  const reult = bringproductdata(pid, data);
  return (
    <>
      <div>
        <Navbar />
        <Dispthisprod product={reult} />
      </div>
    </>
  );
}
// Productpage.js
