import { Navigate, Route } from "react-router-dom";
import { useCart } from "../../context-used/cart-context";

export function Privateroute(params) {
  const { path, ...rest } = params;
  const { loginstatus } = useCart();
  return loginstatus ? (
    <Route path={path} {...rest} />
  ) : (
    <Navigate state={{ from: path }} replace to="/acc" />
  );
}
