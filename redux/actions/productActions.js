import api from "../../service/api";

export const addProduct = (productDetails, imageList) => async (dispatch) => {
  dispatch({ type: "PRODUCT_ADD_REQUEST" });
  try {
    const data = {
      product: productDetails,
      imageUrlList: imageList,
    };
    const res = await api.setAuthHeaders().post(`/api/products`, data);

    dispatch({
      type: "PRODUCT_ADD_SUCCESS",
      payload: res.data.responseData,
    });
  } catch (error) {
    dispatch({ type: "PRODUCT_ADD_FAILED", error: err });
  }
};

export const getProductByUser = (userId) => async (dispatch) => {
  dispatch({ type: "GET_PRODUCT_BY_USER_REQUEST" });
  try {
    const res = await api.setAuthHeaders().get(`/api/products/user/${userId}`);

    dispatch({
      type: "GET_PRODUCT_BY_USER_SUCCESS",
      payload: res.data.responseData,
    });
  } catch (error) {
    dispatch({ type: "GET_PRODUCT_BY_USER_FAILED", error: err });
  }
};
