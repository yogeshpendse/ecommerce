import { useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../context-used/cart-context";

export function Logincomp(params) {
  const { loginstatus, setloginstatus } = useCart();
  const { state } = useLocation();
  const navigate = useNavigate();
  // loginhandler
  function loginhandler(params) {
    setloginstatus((loginstatus) => !loginstatus);
    state?.from && navigate(state.from);
  }
  return (
    <>
      <div>
        <h2>{loginstatus ? "Logged in hai" : "Logged out hai"}</h2>
        <button onClick={loginhandler}>
          {loginstatus ? "logout" : "login"}
        </button>
      </div>
    </>
  );
}
