import { useState } from "react";
import { Prodtoggle } from "../components/prodtoggle";
import { Productdata } from "../components/productdata";

export function Productpage() {
  const [productsstate, setProductsstate] = useState(true);
  return (
    <div className="mt-5rem">
      <Prodtoggle />
      <Productdata
        setProductsstate={setProductsstate}
        productsstate={productsstate}
      />
    </div>
  );
}
