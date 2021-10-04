import { createContext, useContext, useState } from "react";
import axios from "axios";
export const Authcontext = createContext();

export function Authprovider({ children }) {
  const { clienttoken, loginstatus } = JSON.parse(
    localStorage.getItem("login")
  ) || {
    clienttoken: null,
    loginstatus: false,
  };
  const [token, setToken] = useState(clienttoken);
  const [isuserloggedin, setIsuserloggedin] = useState(loginstatus);
  const myauthAxios = axios.create({
    baseURL: "https://ecom-server--bleedblue.repl.co",
    headers: { authorization: token },
  });
  // message :

  return (
    <Authcontext.Provider
      value={{
        setToken,
        isuserloggedin,
        setIsuserloggedin,
        myauthAxios,
        token,
      }}
    >
      {children}
    </Authcontext.Provider>
  );
}

export const useAuth = () => useContext(Authcontext);
