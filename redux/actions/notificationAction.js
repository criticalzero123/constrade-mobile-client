import api from "../../service/api";

export const getNotificationUser = (userId) => async (dispatch) => {
  dispatch({ type: "GET_NOTIFICATION_BY_USER_REQUEST" });

  try {
    const res = await api.get(`/api/notification/${userId}`);

    dispatch({
      type: "GET_NOTIFICATION_BY_USER_SUCCESS",
      payload: res.data.responseData,
    });
  } catch (error) {
    dispatch({ type: "GET_NOTIFICATION_BY_USER_FAILED" });
  }
};
