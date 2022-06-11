import axios from "axios";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { baseurl } from "../apiandurl/baseurl";
import { useAuth } from "../contexts/Authcontext";
import { Link } from "react-router-dom";
import "../csscomponents/loaders.css";
import "../csslayouts/accountpage.css";
import { toast } from "react-toastify";
export function Accountpage() {
  const { isuserloggedin, setIsuserloggedin, setToken } = useAuth();
  const navigate = useNavigate();
  const { state } = useLocation();
  const [usernameval, setUsernameval] = useState("userd");
  const [passwordval, setPasswordval] = useState("User@1234");
  const [loader, setLoader] = useState(false);
  const passwordbool = passwordval.length > 0 ? false : true;
  const usernamebool = usernameval.length > 0 ? false : true;
  const disabledstatus =
    passwordbool === false && usernamebool === false ? false : true;
  const from = state?.from?.pathname || "/";
  async function checklogin(params) {
    try {
      setLoader(true);
      const { usernameval, passwordval } = params;
      const url = `${baseurl}/user/login`;
      const response = await axios.post(url, {
        username: usernameval,
        password: passwordval,
      });
      if (response.status === 200) {
        const stringifieddata = JSON.stringify({
          loginstatus: response.data.success,
          clienttoken: response.data.token,
        });
        localStorage.setItem("login", stringifieddata);
        setIsuserloggedin(response.data.success);
        setToken(response.data.token);
        navigate(from);
      }
      // toast.success("user created", {
      //   position: "top-right",
      //   autoClose: 3000,
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: true,
      //   progress: undefined,
      // });
    } catch (error) {
      setLoader(false);
      if (error.response.data.message === "user doesn't exist") {
        toast.error("user doesn't exist", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
      if (error.response.data.errormessage === "passwords don't match") {
        toast.error("invalid password", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    }
  }
  const logout = () => {
    localStorage.removeItem("login");
    setIsuserloggedin(false);
    setToken(null);
  };
  return (
    <>
      <div>
        {isuserloggedin ? (
          <div className="accountpage">
            <button className="btn btn--primary" onClick={() => logout()}>
              logout
            </button>
          </div>
        ) : (
          <>
            <div className="accountpage">
              <input
                value={usernameval}
                className="input accountpage__fields"
                type="text"
                placeholder="username"
                onChange={(event) => setUsernameval(event.target.value)}
              />
              <input
                className="input accountpage__fields"
                type="password"
                value={passwordval}
                placeholder="password"
                onChange={(event) => setPasswordval(event.target.value)}
              />

              <button
                className={
                  disabledstatus ? "btn btn--gray" : "btn btn--primary"
                }
                onClick={() => checklogin({ usernameval, passwordval })}
                disabled={disabledstatus}
              >
                Login {loader && <span className="myloader-sm--light" />}
              </button>
              <div className="accountpage__register">
                <Link to="/register">Don't have an account.</Link>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
