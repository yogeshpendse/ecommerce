import { useForm } from "../contexts/form-context";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useEffect } from "react";
// import { Statusjs } from "./status";
import { Username } from "./username";
import { Link } from "react-router-dom";
export function Signup(params) {
  const {
    formstate,
    handlechangeforname,
    handlechangeforusername,
    handlechangeforpassword,
    handlechangefornumber,
    formdata,
    status,
    setStatus,
  } = useForm();
  const buttondisability =
    formstate.username &&
    formstate.password &&
    formstate.number &&
    formstate.name &&
    !status
      ? true
      : false;
  const dependance = formdata.username;
  async function postreques(formdata) {
    try {
      const username = formdata.username;
      const password = formdata.password;
      const name = formdata.name;
      const number = formdata.number;
      const url = "https://ecom-server--bleedblue.repl.co/user/signup";
      const postrequest = await axios.post(url, {
        username,
        password,
        name,
        mobileno: number,
      });
      toast.success("user created", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      console.log(postrequest);
    } catch (error) {
      if (
        error.response.data.message === "mobileno already taken" &&
        error.response.status === 400
      ) {
        toast.error(error.response.data.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
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

  useEffect(() => {
    // console.log("entered useeffect");
    let source = axios.CancelToken.source();
    const loadData = async (state) => {
      // console.log("entered function");
      try {
        const address =
          "https://ecom-server.bleedblue.repl.co/user/checifuserispresent/";
        const response = await axios.post(
          address,
          {
            username: dependance,
          },
          {
            cancelToken: source.token,
          }
        );
        // console.log("were here");
        // console.log({ response });
        if (response.status === 200 && response.data.success) {
          setStatus(response.data.success);
        } else {
          setStatus(false);
          // setState("");
        }
      } catch (error) {
        // if (!axios.isCancel(error)) {
        //   console.log("something went wrong");
        // }
        if (axios.isCancel(error)) {
          // console.log("AxiosCancel: caught cancel");
        }
        // else {
        //   throw error;
        // }
      }
      // console.log("near if statemennts");
    };
    if (dependance.length > 0) {
      setStatus(false);
      loadData(dependance);
    }
    if (dependance.length === 0) {
      setStatus(false);
    }
    // console.log("exitinguseeffect");

    return () => {
      source.cancel();
    };
  }, [dependance, setStatus]);

  const onSubmit = (event) => {
    event.preventDefault();
    postreques(formdata);
  };
  return (
    <>
      <form onSubmit={onSubmit}>
        <div className="input-form">
          <div className="input-elements">
            <input
              className="input-element"
              placeholder="name"
              onChange={(e) => handlechangeforname(e.target.value)}
            />

            {/* <Statusjs checker={formstate.name} /> */}
            <input
              className="input-element"
              placeholder="username"
              onChange={(e) => handlechangeforusername(e.target.value)}
            />

            {/* <Statusjs checker={formstate.username} /> */}
            {dependance.length > 0 ? <Username status={status} /> : <></>}
            <input
              className="input-element"
              type="password"
              placeholder="password"
              onChange={(e) => handlechangeforpassword(e.target.value)}
            />

            {/* <Statusjs checker={formstate.password} /> */}
            <input
              className="input-element"
              type="number"
              placeholder="number"
              onChange={(e) => handlechangefornumber(e.target.value)}
            />

            {/* <Statusjs checker={formstate.number} /> */}
            <button
              // className="input-element btn btn-primary cursor-pointer"
              className={
                !buttondisability
                  ? "input-form-submit-disabled"
                  : "input-element btn-primary cursor-pointer"
              }
              // onClick={() => postreques(formdata)}
              type="submit"
              disabled={!buttondisability}
            >
              submit
            </button>
            <Link to="/login" className="input-toggle-button text-align-center">
              <p className="text-decoration-underline">Already a customer?</p>
            </Link>
            <div
              style={{
                backgroundColor: "#008080",
                color: "#fff",
                padding: "0.5rem 1rem",
                fontStyle: "italic",
              }}
            >
              <p className="text-align-center">
                <>
                  <span># password must be alphanumeric.</span>
                  <br />
                  <span># username must contain only small letters.</span>
                </>
              </p>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
