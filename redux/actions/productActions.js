import axios from "axios";
import { API_URL_LOCAL } from "@env";

export const addProduct = (product) => (dispatch) => {
  dispatch({ type: "PRODUCT_ADD_REQUEST" });

  axios
    .post(`${API_URL_LOCAL}/api/products`, product)
    .then((res) => {
      dispatch({
        type: "PRODUCT_ADD_SUCCESS",
        payload: res.data.responseData,
      });
    })
    .catch((err) => {
      dispatch({ type: "PRODUCT_ADD_FAILED", error: err });
    });
};
