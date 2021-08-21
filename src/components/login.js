import { useLocation } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../contexts/auth-context";
export function Login() {
  const { state } = useLocation();
  const [usernameval, setUsernameval] = useState("");
  const [passwordval, setPassword] = useState("");

  const navigate = useNavigate();
  const { setIsuserloggedin, setToken, isuserloggedin } = useAuth();

  function handleusername(e) {
    if (e.length === 0) {
      setUsernameval(e);
    } else {
      setUsernameval(e);
    }
  }
  function handlepassword(e) {
    if (e.length === 0) {
      setPassword(e);
    } else {
      setPassword(e);
    }
  }
  async function checklogin() {
    try {
      const url = "https://ecom-server.bleedblue.repl.co/user/login";
      const response = await axios.post(url, {
        username: usernameval,
        password: passwordval,
      });
      console.log(response);
      if (response.status === 200) {
        const stringifieddata = JSON.stringify({
          loginstatus: response.data.success,
          clienttoken: response.data.token,
        });
        localStorage.setItem("login", stringifieddata);
        setIsuserloggedin(response.data.success);
        setToken(response.data.token);
        console.log({ statevalue: state.from });
        state?.from && navigate(state.from || "/");
      }
    } catch (error) {
      console.log({ errormessage: error.message });
    }
  }
  const logout = () => {
    localStorage.removeItem("login");
    setIsuserloggedin(false);
    setToken(null);
    window.location.reload();
  };
  return (
    <>
      {isuserloggedin === false ? (
        <div>
          <input
            placeholder="username"
            onChange={(e) => handleusername(e.target.value)}
          />
          <input
            placeholder="password"
            onChange={(e) => handlepassword(e.target.value)}
          />
          <button onClick={checklogin}>login</button>
          <button onClick={() => navigate("/signup")}>register</button>
        </div>
      ) : (
        <button onClick={logout}>logout</button>
      )}
    </>
  );
}
