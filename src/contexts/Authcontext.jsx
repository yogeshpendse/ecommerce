import { createContext, useContext, useState } from "react";

const Authcontext = createContext();

export const Authprovider = ({ children }) => {
  const { clienttoken, loginstatus } = JSON.parse(
    localStorage.getItem("login")
  ) || {
    clienttoken: null,
    loginstatus: false,
  };
  const [token, setToken] = useState(clienttoken);
  const [isuserloggedin, setIsuserloggedin] = useState(loginstatus);
  return (
    <Authcontext.Provider
      value={{ isuserloggedin, setIsuserloggedin, token, setToken }}
    >
      {children}
    </Authcontext.Provider>
  );
};
export const useAuth = () => useContext(Authcontext);
