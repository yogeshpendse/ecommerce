import { checkifelementexist } from "../functions/checkifelementexist";
import { addtoarray } from "../functions/addtoarray";
import { extend } from "lodash";

export function cartreducer(prevstate, action) {
  switch (action.type) {
    case "RETURN_SAME_ARRAY":
      console.log({
        payload: action.payload,
        type: action.type,
        array: prevstate.dataincart,
      });
      return { ...prevstate };

    case "ADD_TO_CART":
      const op = checkifelementexist(prevstate.dataincart, action.payload);
      if (!op) {
        const updatedaddingtocart = addtoarray(
          prevstate.dataincart,
          action.payload
        );

        const newobj = extend(prevstate, {
          dataincart: updatedaddingtocart,
        });
        console.log(newobj);
        return newobj;
      }
      return prevstate;

    case "REMOVE_FROM_CART":
      console.log({ payload: action.payload });
      // const removefromcartobj = extend(prevstate, {
      //   dataincart: action.payload,
      // });
      // console.log({ removefromcartobj });
      return { ...prevstate };
    case "SET_DATA_TO_ARRAY":
      // const newobj = extend(prevstate, { dataincart: [...action.payload] });
      return { dataincart: [...action.payload] };
    default:
      break;
  }
}
