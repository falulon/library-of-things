import { single_product_url } from "../utils/constants";
import axios from "axios";

const consoleErr = (error) => {
  if (error.response) {
    console.error(error.response.data.msg);
  }
};

export const axiosUpdateProduct = async (productId, product) => {
  let isError = false;
  const url = `${single_product_url}edit/${productId}`;
  await axios.put(url, { product }).catch((e) => {
    consoleErr(e);
    isError = e.response.data.msg;
  });
  return isError;
};

export const axiosCreateProduct = async (product) => {
  let isError = false;
  const url = `${single_product_url}edit/create`;
  await axios.post(url, { product }).catch((e) => {
    consoleErr(e);
    isError = e.response.data.msg;
  });
  return isError;
};

export const axiosDeleteProduct = async (productId) => {
  const url = `${single_product_url}edit/${productId}`;
  await axios.delete(url).catch(consoleErr);
};
