import api from "../../service/api";

export const getFollowAndFollowersUser = (userId) => async (dispatch) => {
  dispatch({ type: "GET_USER_FOLLOW_FOLLOWERS_REQUEST" });
  try {
    const res = await api.setAuthHeaders().get(`/api/follow/${userId}`);

    dispatch({
      type: "GET_USER_FOLLOW_FOLLOWERS_SUCCESS",
      payload: res.data.responseData,
    });
  } catch (err) {
    dispatch({
      type: "GET_USER_FOLLOW_FOLLOWERS_FAILED",
      error: err,
    });
  }
};
