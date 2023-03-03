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

export const followUser = (otherUserId, currentUserId) => async (dispatch) => {
  dispatch({ type: "FOLLOW_USER_REQUEST" });
  try {
    const res = await api.setAuthHeaders().post(`/api/follow`, {
      followByUserId: otherUserId,
      followedByUserId: currentUserId,
    });

    dispatch({
      type: "FOLLOW_USER_SUCCESS",
      payload: res.data.responseData,
    });
  } catch (err) {
    dispatch({
      type: "FOLLOW_USER_FAILED",
      error: err,
    });
  }
};

export const isFollowUser =
  (otherUserId, currentUserId) => async (dispatch) => {
    dispatch({ type: "GET_IS_FOLLOW_USER_REQUEST" });

    try {
      const res = await api
        .setAuthHeaders()
        .get(
          `/api/follow?currentUserId=${currentUserId}&otherUserId=${otherUserId}`
        );

      dispatch({
        type: "GET_IS_FOLLOW_USER_SUCCESS",
        payload: res.data.responseData,
      });
    } catch (err) {
      dispatch({
        type: "GET_IS_FOLLOW_USER_FAILED",
        error: err,
      });
    }
  };
