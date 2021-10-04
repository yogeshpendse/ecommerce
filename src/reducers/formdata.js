export function formdatareducer(prevstate, action) {
  switch (action.type) {
    case "MODIFY_NAME":
      // console.log("DESCENDING");
      // action.payload
      return (prevstate = { ...prevstate, name: action.payload });
    case "MODIFY_USERNAME":
      // console.log("DESCENDING");
      return (prevstate = { ...prevstate, username: action.payload });
    case "MODIFY_PASSWORD":
      // console.log("DESCENDING");
      return (prevstate = { ...prevstate, password: action.payload });
    case "MODIFY_NUMBER":
      // console.log("DESCENDING");
      return (prevstate = { ...prevstate, number: action.payload });

    default:
      break;
  }
}
