import { Navigate, useLocation } from "react-router";
import { useAuth } from "../../contexts/Authcontext";

export function Privateroute({ children }) {
  const { isuserloggedin } = useAuth();
  const location = useLocation();
  if (!isuserloggedin) {
    return <Navigate to="/account" state={{ from: location }} replace />;
  }
  return children;
}
