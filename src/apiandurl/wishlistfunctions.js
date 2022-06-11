import axios from "axios";
import { baseurl } from "./baseurl";

export async function addtowishlist(params) {
  const url = `${baseurl}/wishlist/addtowhishlist`;
  try {
    const { item, token } = params;
    const response = await axios.post(url, item, {
      headers: { authorization: token },
    });
    if (response.status === 200) {
      return {
        success: true,
        productsinwishlist: response.data.update.productsinwishlist,
      };
    }
  } catch (error) {
    if (
      error.response.data.message === "already present in array" &&
      error.response.status === 400
    ) {
      return { success: false, errormessage: "already present in wishlist" };
    } else if (
      error.response.data.errormessage === "jwt malformed" &&
      error.response.status === 500
    ) {
      return {
        success: false,
        errormessage: "please login",
      };
    } else {
      return {
        success: false,
        errormessage: "some error occured",
      };
    }
  }
}
// 	/wishlist/removefromwhishlist

export async function removefromwishlist(params) {
  const url2 = `${baseurl}/wishlist/removefromwhishlist`;
  try {
    const { item, token } = params;
    const response = await axios.post(url2, item, {
      headers: { authorization: token },
    });
    if (response.status === 200) {
      return {
        success: true,
        productsinwishlist:
          response.data.removefromwhishlistupdate.productsinwishlist,
      };
    }
  } catch (error) {
    return { success: false, errormessage: "some error occured" };
  }
}
