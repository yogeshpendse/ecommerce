import axios from "axios";
import { baseurl } from "./baseurl";

export async function incrementbyone(params) {
  const url = `${baseurl}/cart/incrementincart`;
  try {
    const { item, token } = params;
    const response = await axios.post(url, item, {
      headers: { authorization: token },
    });
    if (response.status === 200) {
      return {
        success: true,
        productsincart: response.data.data.productsincart,
      };
    }
  } catch (error) {
    return { success: false, errormessage: "An error occured" };
  }
}

export async function decrementbyone(params) {
  const url = `${baseurl}/cart/decrementincart`;
  try {
    const { item, token } = params;
    const response = await axios.post(url, item, {
      headers: { authorization: token },
    });
    if (response.status === 200) {
      return {
        success: true,
        productsincart: response.data.data.productsincart,
      };
    }
  } catch (error) {
    return { success: false, errormessage: "An error occured" };
  }
}
export async function deleteproductfromcart(params) {
  const url = `${baseurl}/cart/removefromcart`;
  try {
    const { item, token } = params;
    const response = await axios.post(url, item, {
      headers: { authorization: token },
    });
    if (response.status === 200) {
      return {
        success: true,
        productsincart: response.data.data.productsincart,
      };
    }
  } catch (error) {
    return { success: false, errormessage: "An error occured" };
  }
}
