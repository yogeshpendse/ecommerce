import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Dispthisproduct } from "../components/dispthisproduct";
export function Productdisppage() {
  const { prid } = useParams();
  const [productstate, setProductstate] = useState(null);
  const [loader, setLoader] = useState(true);
  const url =
    "https://ecom-server--bleedblue.repl.co/product/getthisprod/" + prid;
  useEffect(() => {
    (async function () {
      try {
        setLoader(true);
        const op = await axios.get(url);
        setProductstate(op.data.data);
        setLoader(false);
      } catch (error) {
        setProductstate(null);
        setLoader(false);
      }
    })();
  }, [url]);
  console.log({ productstate, url });
  return (
    <>
      <Dispthisproduct product={productstate} loader={loader} />
    </>
  );
}
