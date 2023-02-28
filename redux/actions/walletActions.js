import api from "../../service/api";

export const getWalletUser = (userId) => async (dispatch) => {
  dispatch({ type: "GET_WALLET_USER_REQUEST" });

  try {
    const res = await api.setAuthHeaders().get(`/api/wallet/${userId}`);

    dispatch({
      type: "GET_WALLET_USER_SUCCESS",
      payload: res.data.responseData,
    });
  } catch (error) {
    dispatch({ type: "GET_WALLET_USER_FAILED", error: error });
  }
};

export const getAllTransactionWalletUser = (walletId) => async (dispatch) => {
  dispatch({ type: "GET_ALL_TRANSACTION_WALLET_USER_REQUEST" });

  try {
    const res = await api
      .setAuthHeaders()
      .get(`/api/wallet/transactions/all/${walletId}`);
    dispatch({
      type: "GET_ALL_TRANSACTION_WALLET_USER_SUCCESS",
      payload: res.data.responseData,
    });
  } catch (error) {
    dispatch({ type: "GET_ALL_TRANSACTION_WALLET_USER_FAILED", error: error });
  }
};

export const getAllWalletUser = () => async (dispatch) => {
  dispatch({ type: "GET_ALL_WALLET_USER_REQUEST" });

  try {
    const res = await api.setAuthHeaders().get(`/api/wallet/user/all`);
    dispatch({
      type: "GET_ALL_WALLET_USER_SUCCESS",
      payload: res.data.responseData,
    });
  } catch (error) {
    dispatch({ type: "GET_ALL_WALLET_USER_FAILED", error: error });
  }
};

export const sendMoney = (info) => async (dispatch) => {
  dispatch({ type: "SEND_MONEY_WALLET_REQUEST" });

  try {
    const res = await api.setAuthHeaders().post(`/api/wallet/send`, info);

    dispatch({
      type: "SEND_MONEY_WALLET_SUCCESS",
      payload: res.data.responseData,
    });
  } catch (error) {
    dispatch({ type: "SEND_MONEY_WALLET_FAILED", error: error });
  }
};
