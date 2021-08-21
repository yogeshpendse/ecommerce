import { useState } from "react";
import { Prodtoggle } from "../components/prodtoggle";
import { Productdata } from "../components/productdata";

export function Productpage() {
  const [productsstate, setProductsstate] = useState(true);
  return (
    <>
      <h1>This is product page.</h1>
      <Prodtoggle />
      <Productdata
        setProductsstate={setProductsstate}
        productsstate={productsstate}
      />
    </>
  );
}
