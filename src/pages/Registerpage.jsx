import { useState } from "react";
import "../csslayouts/registerpage.css";
import "../csscomponents/loaders.css";
import validator from "validator";
import { Link } from "react-router-dom";
import { baseurl } from "../apiandurl/baseurl";
import axios from "axios";
import { toast } from "react-toastify";
export function Registerpage() {
  const [usernameval, setUsernameval] = useState("");
  const [nameval, setNameval] = useState("");
  const [passwordval, setPasswordval] = useState("");
  const [mobile, setMobile] = useState("");
  const [loader, setLoader] = useState(false);
  const passwordbool = validator.isStrongPassword(passwordval);
  const usernamelengthbool = usernameval.length > 4 ? true : false;
  const isuseralpha = validator.isAlpha(usernameval);
  const usernamebool =
    usernamelengthbool === true && isuseralpha === true ? true : false;
  const namebool = nameval.length > 0 ? true : false;
  const mobilebool = mobile.length === 10 ? true : false;
  const disabledstatus =
    usernamebool === true &&
    passwordbool === true &&
    namebool === true &&
    mobilebool === true
      ? true
      : false;

  async function checkregistertration(params) {
    console.log(params);
    try {
      const { usernameval, passwordval, mobile, nameval } = params;
      setLoader(true);
      const url = `${baseurl}/user/signup`;
      const postrequest = await axios.post(url, {
        username: usernameval,
        password: passwordval,
        name: nameval,
        mobileno: Number(mobile),
      });
      toast.success(postrequest.data.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setLoader(false);
    } catch (error) {
      setLoader(false);
      if (
        error.response.data.message === "user already exists" &&
        error.response.status === 400
      ) {
        toast.error("user already exist", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
      if (
        error.response.data.message === "mobileno already taken" &&
        error.response.status === 400
      ) {
        toast.error("number already taken", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
      if (
        error.response.data.message === "some error occured" &&
        error.response.status === 400
      ) {
        toast.error("some error occured", {
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
  return (
    <>
      <div className="registerpage">
        <input
          value={nameval}
          className="input registerpage__fields"
          type="text"
          placeholder="name"
          onChange={(event) => setNameval(event.target.value)}
        />
        <input
          value={usernameval}
          className="input registerpage__fields"
          type="text"
          placeholder="username"
          onChange={(event) => setUsernameval(event.target.value)}
        />
        <input
          className="input registerpage__fields"
          type="text"
          value={passwordval}
          placeholder="password"
          onChange={(event) => setPasswordval(event.target.value)}
        />
        <input
          className="input registerpage__fields"
          type="number"
          value={mobile}
          placeholder="mobile"
          onChange={(event) => setMobile(event.target.value)}
        />
        <button
          className={disabledstatus ? "btn btn--primary" : "btn btn--gray"}
          disabled={disabledstatus ? false : true}
          onClick={() =>
            checkregistertration({ usernameval, passwordval, mobile, nameval })
          }
        >
          Register {loader && <span className="myloader-sm--light" />}
        </button>
        <div className="registerpage__register">
          <Link to="/account">Have an account?</Link>
        </div>
      </div>
    </>
  );
}
