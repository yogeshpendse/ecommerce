import { useReducer, createContext, useContext, useState } from "react";
import { reducer } from "../reducers/formstatus";
import { formdatareducer } from "../reducers/formdata";
import validator from "validator";
export const Formcontext = createContext();
export function FormProvider({ children }) {
  const [status, setStatus] = useState(false);
  const [formstate, dispatch] = useReducer(reducer, {
    name: false,
    username: false,
    password: false,
    number: false,
  });
  const [formdata, dispatch2] = useReducer(formdatareducer, {
    name: "",
    username: "",
    password: "",
    number: "",
  });
  async function handlechangeforname(e) {
    if (e.length > 0) {
      dispatch({ type: "MODIFY_NAME", payload: true });
      dispatch2({ type: "MODIFY_NAME", payload: e });
    }
    if (e.length === 0) {
      dispatch({ type: "MODIFY_NAME", payload: false });
    }
  }
  function handlechangeforusername(e) {
    if (e.length >= 3 && e.length <= 8) {
      const isalphacheck = validator.isAlpha(e);
      dispatch({ type: "MODIFY_USERNAME", payload: isalphacheck });
      isalphacheck && dispatch2({ type: "MODIFY_USERNAME", payload: e });
    } else {
      dispatch({ type: "MODIFY_USERNAME", payload: false });
    }
  }
  function handlechangeforpassword(e) {
    const z = validator.isStrongPassword(e);
    dispatch({ type: "MODIFY_PASSWORD", payload: z });
    z && dispatch2({ type: "MODIFY_PASSWORD", payload: e });
  }
  function handlechangefornumber(e) {
    if (e.length === 10) {
      const numcheck = validator.isNumeric(e);
      dispatch({ type: "MODIFY_NUMBER", payload: numcheck });
      numcheck && dispatch2({ type: "MODIFY_NUMBER", payload: Number(e) });
    } else {
      dispatch({ type: "MODIFY_NUMBER", payload: false });
    }
  }
  return (
    <Formcontext.Provider
      value={{
        formstate,
        dispatch,
        handlechangeforname,
        handlechangeforusername,
        handlechangeforpassword,
        handlechangefornumber,
        formdata,
        status,
        setStatus,
      }}
    >
      {children}
    </Formcontext.Provider>
  );
}

export function useForm() {
  return useContext(Formcontext);
}
