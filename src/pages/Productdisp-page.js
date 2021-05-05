import { Navbar } from "../components/Navbar";
import { Displayproducts } from "../components/Displayproducts";
import { Inputfields } from "../components/Inputfeilds";

export function Productpage() {
  return (
    <div>
      <Navbar />
      <Inputfields />
      <p>yeh product page hai</p>
      <Displayproducts />
    </div>
  );
}
