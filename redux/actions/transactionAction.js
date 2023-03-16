import api from "../../service/api";

export const soldProduct = (info) => async (dispatch) => {
  dispatch({ type: "SOLD_PRODUCT_REQUEST" });

  try {
    const res = await api
      .setAuthHeaders()
      .post("/api/transactions/product", info);

    dispatch({ type: "SOLD_PRODUCT_SUCCESS", payload: res.data.responseData });
  } catch (error) {
    dispatch({ type: "SOLD_PRODUCT_FAILED", error: error });
  }
};

export const getProductTransaction = (productId) => async (dispatch) => {
  dispatch({ type: "GET_PRODUCT_TRANSACTION_REQUEST" });

  try {
    const res = await api
      .setAuthHeaders()
      .get(`/api/transactions/product/${productId}`);

    dispatch({
      type: "GET_PRODUCT_TRANSACTION_SUCCESS",
      payload: res.data.responseData,
    });
  } catch (error) {
    dispatch({ type: "GET_PRODUCT_TRANSACTION_FAILED", error: error });
  }
};
