import api from "../../service/api";

export const getWalletUser = async (userId) => {
  try {
    const res = await api.setAuthHeaders().get(`/api/wallet/${userId}`);

    return res.data.responseData;
  } catch (error) {
    console.log(error);
  }
};

export const getAllTransactionWalletUser = async (walletId) => {
  try {
    const res = await api
      .setAuthHeaders()
      .get(`/api/wallet/transactions/all/${walletId}`);
    return res.data.responseData;
  } catch (error) {
    console.log(error);
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

export const sendMoney = async (info) => {
  try {
    const res = await api.setAuthHeaders().post(`/api/wallet/send`, info);

    return res.data.responseData;
  } catch (error) {
    console.log(error);
  }
};
