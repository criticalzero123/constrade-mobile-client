import api from "../../service/api";

export const getMessagesByUserIds =
  (currentUserId, otherId, index) => async (dispatch) => {
    dispatch({ type: "GET_MESSAGES_BY_USER_IDS_REQUEST" });

    try {
      const res = await api
        .setAuthHeaders()
        .get(
          `/api/userchat/messages/${currentUserId}?otherId=${otherId}&index=${index}`
        );

      dispatch({
        type: "GET_MESSAGES_BY_USER_IDS_SUCCESS",
        payload: res.data.responseData,
      });
    } catch (error) {
      dispatch({ type: "GET_MESSAGES_BY_USER_IDS_FAILED", error: error });
    }
  };

export const getChatByUserId = (userId) => async (dispatch) => {
  dispatch({ type: "GET_CHAT_BY_USER_ID_REQUEST" });

  try {
    const res = await api.setAuthHeaders().get(`/api/userchat/${userId}`);
    dispatch({
      type: "GET_CHAT_BY_USER_ID_SUCCESS",
      payload: res.data.responseData,
    });
  } catch (error) {
    dispatch({ type: "GET_CHAT_BY_USER_ID_FAILED", error: error });
  }
};

export const deleteMessageById = (id) => async (dispatch) => {
  dispatch({ type: "DELETE_MESSAGE_BY_ID_REQUEST" });

  try {
    const res = await api
      .setAuthHeaders()
      .delete(`/api/userchat/messages/message/${id}`);

    dispatch({
      type: "DELETE_MESSAGE_BY_ID_SUCCESS",
      payload: res.data.responseData,
    });
  } catch (error) {
    dispatch({ type: "DELETE_MESSAGE_BY_ID_FAILED", error: error });
  }
};
