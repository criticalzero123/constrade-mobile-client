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

export const getProductTransaction = async (productId) => {
  try {
    const res = await api
      .setAuthHeaders()
      .get(`/api/transactions/product/${productId}`);

    return res.data.responseData;
  } catch (error) {
    console.error(error);
  }
};

export const getUserTransactions = async (userId) => {
  try {
    const res = await api
      .setAuthHeaders()
      .get(`/api/transactions/users/${userId}`);

    return res.data.responseData;
  } catch (error) {
    console.error(error);
  }
};
