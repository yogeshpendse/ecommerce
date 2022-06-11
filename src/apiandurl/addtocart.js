import axios from "axios";
import { baseurl } from "./baseurl";

export async function addtocart(params) {
  //  /cart/addtocart
  const { item, token } = params;
  console.log({ token, item });
  const url = `${baseurl}/cart/addtocart`;
  try {
    const response = await axios.post(
      url,
      { ...item },
      {
        headers: {
          authorization: token,
        },
      }
    );
    if (response.status === 200) {
      console.log({
        message: "added to cart",
        response: response.data.updatedcart,
      });
      return { success: true, updatedcart: response.data.updatedcart };
    }
  } catch (error) {
    if (
      error.response.data.message === "product already present in cart" &&
      error.response.status === 400
    ) {
      return {
        success: false,
        errormessage: "product already present in cart",
        errorstatus: 400,
      };
    } else if (
      error.response.data.errormessage === "jwt malformed" &&
      error.response.status === 500
    ) {
      return {
        success: false,
        errormessage: "please login",
        errorstatus: 500,
      };
    } else {
      return {
        success: false,
        errormessage: "some error occured",
        errorstatus: 400,
      };
    }
  }
}

/**
 * {
        headers: {
          authorization: token,
        },
      }
*/
