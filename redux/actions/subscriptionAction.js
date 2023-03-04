import api from "../../service/api";

export const subscribeUser = (userId) => async (dispatch) => {
  dispatch({ type: "SUBSCRIBE_USER_REQUEST" });

  try {
    const res = await api.put(`/api/subscription/subscribe/${userId}`);

    dispatch({
      type: "SUBSCRIBE_USER_SUCCESS",
      payload: res.data.responseData,
    });
  } catch (error) {
    dispatch({ type: "SUBSCRIBE_USER_FAILED", error: error });
  }
};
export const getSubscriptionHistory = (userId) => async (dispatch) => {
  dispatch({ type: "GET_SUBSCRIPTION_HISTORY_REQUEST" });

  try {
    const res = await api.get(`/api/subscription/history/user/${userId}`);

    dispatch({
      type: "GET_SUBSCRIPTION_HISTORY_SUCCESS",
      payload: res.data.responseData,
    });
  } catch (error) {
    dispatch({ type: "GET_SUBSCRIPTION_HISTORY_FAILED", error: error });
  }
};
