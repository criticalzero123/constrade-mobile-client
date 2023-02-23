import api from "../../service/api";

const config = (token) => {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
};

export const addProduct = (productDetails, imageList, token) => (dispatch) => {
  dispatch({ type: "PRODUCT_ADD_REQUEST" });

  const data = {
    product: productDetails,
    imageUrlList: imageList,
  };

  api
    .post(`/api/products`, data, config(token))
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
