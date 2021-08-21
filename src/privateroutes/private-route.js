import { Navigate, Route } from "react-router-dom";
import { useAuth } from "../contexts/auth-context";

export function Privateroute(passedprops) {
  const { path, ...rest } = passedprops;
  const { isuserloggedin } = useAuth();
  console.log({ location: "private-route", isuserloggedin });
  return (
    <>
      {isuserloggedin ? (
        <Route path={path} {...rest} />
      ) : (
        <Navigate state={{ from: path }} replace to="/login" />
      )}
    </>
  );
}
