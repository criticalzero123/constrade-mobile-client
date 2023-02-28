import api from "../../service/api";

export const getWalletUser = (userId) => async (dispatch) => {
  dispatch({ type: "GET_WALLET_USER_REQUEST" });

  try {
    const res = await api.setAuthHeaders().get(`/api/wallet/${userId}`);

    console.log(res);
    dispatch({
      type: "GET_WALLET_USER_SUCCESS",
      payload: res.data.responseData,
    });
  } catch (error) {
    dispatch({ type: "GET_WALLET_USER_FAILED", error: error });
  }
};

export const getAllTransactionWalletUser = (userId) => async (dispatch) => {
  dispatch({ type: "GET_ALL_TRANSACTION_WALLET_USER_REQUEST" });

  try {
    const res = await api
      .setAuthHeaders()
      .get(`/api/wallet/transactions/all/${userId}`);

    console.log(res);
    dispatch({
      type: "GET_ALL_TRANSACTION_WALLET_USER_SUCCESS",
      payload: res.data.responseData,
    });
  } catch (error) {
    dispatch({ type: "GET_ALL_TRANSACTION_WALLET_USER_FAILED", error: error });
  }
};
