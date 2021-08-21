import { useForm } from "../contexts/form-context";
import axios from "axios";
import { useEffect } from "react";
import { Statusjs } from "./status";
import { Username } from "./username";
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
      console.log(postrequest);
    } catch (error) {
      // console.log({
      //   success: false,
      //   errormessage: error.response.data.message,
      //   error,
      // });
      console.log({ errorresponse: error.response.status });
      if (
        error.response.data.message === "mobileno already taken" &&
        error.response.status === 400
      ) {
        console.log({
          message: "if wala",
          error: error.response.data.message,
        });
      } else {
        console.log({ message: "else wala", error });
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

  return (
    <>
      <div className="opopo">
        <div className="align-form-elements">
          <input
            placeholder="name"
            onChange={(e) => handlechangeforname(e.target.value)}
          />
          &nbsp;
          <Statusjs checker={formstate.name} />
        </div>

        <div className="align-form-elements">
          <input
            placeholder="username"
            onChange={(e) => handlechangeforusername(e.target.value)}
          />
          &nbsp;
          <Statusjs checker={formstate.username} />
          {dependance.length > 0 ? <Username status={status} /> : null}
        </div>

        <div className="align-form-elements">
          <input
            type="password"
            placeholder="password"
            onChange={(e) => handlechangeforpassword(e.target.value)}
          />
          &nbsp;
          <Statusjs checker={formstate.password} />
        </div>

        <div className="align-form-elements">
          <input
            type="number"
            placeholder="number"
            onChange={(e) => handlechangefornumber(e.target.value)}
          />
          &nbsp;
          <Statusjs checker={formstate.number} />
        </div>
        <button
          onClick={() => postreques(formdata)}
          disabled={!buttondisability}
        >
          submit
        </button>
      </div>
    </>
  );
}
