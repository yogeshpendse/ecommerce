import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../contexts/auth-context";
export function Login() {
  const { state } = useLocation();
  const [usernameval, setUsernameval] = useState("");
  const [passwordval, setPassword] = useState("");
  const disablestatus = usernameval.length > 0 && passwordval.length;

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
  const onSubmit = (event) => {
    event.preventDefault();
    checklogin();
  };
  return (
    <>
      {isuserloggedin === false ? (
        <form onSubmit={onSubmit}>
          <div className="input-form">
            <div className="input-elements">
              <input
                className="input-element"
                placeholder="username"
                onChange={(e) => handleusername(e.target.value)}
              />
              <input
                className="input-element"
                placeholder="password"
                onChange={(e) => handlepassword(e.target.value)}
              />
              <button
                type="submit"
                className={
                  disablestatus
                    ? "input-element btn btn-primary cursor-pointer"
                    : "input-form-submit-disabled"
                }
                disabled={!disablestatus}
                // onClick={checklogin}
              >
                login
              </button>
              <Link
                className="input-toggle-button text-align-center"
                to="/signup"
              >
                <p className="text-decoration-underline">
                  Don't have an account?
                </p>
              </Link>
            </div>
          </div>
        </form>
      ) : (
        <div
          className="logout-btn"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "5rem",
          }}
        >
          <button
            style={{ padding: "0.5", fontSize: "1rem" }}
            onClick={logout}
            className="btn btn-primary cursor-pointer"
          >
            logout
          </button>
        </div>
      )}
    </>
  );
}
