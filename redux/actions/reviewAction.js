import api from "../../service/api";

export const getMyAverageRate = async (userId) => {
  try {
    const res = await api.setAuthHeaders().get(`/api/review/${userId}`);

    return res.data.responseData;
  } catch (err) {
    console.error(err);
  }
};

export const getOtherReviewsUser =
  (otherUserId, userId) => async (dispatch) => {
    dispatch({ type: "GET_OTHER_USER_REVIEWS_REQUEST" });

    try {
      const res = await api
        .setAuthHeaders()
        .get(`/api/review/${otherUserId}/other?userId=${userId}`);
      dispatch({
        type: "GET_OTHER_USER_REVIEWS_SUCCESS",
        payload: res.data.responseData,
      });
    } catch (err) {
      dispatch({ type: "GET_OTHER_USER_REVIEWS_FAILED", error: err });
    }
  };

export const getMyReviewsUser = (otherUserId, userId) => async (dispatch) => {
  dispatch({ type: "GET_MY_USER_REVIEWS_REQUEST" });

  try {
    const res = await api
      .setAuthHeaders()
      .get(`/api/review/${otherUserId}/my?userId=${userId}`);
    dispatch({
      type: "GET_MY_USER_REVIEWS_SUCCESS",
      payload: res.data.responseData,
    });
  } catch (err) {
    dispatch({ type: "GET_MY_USER_REVIEWS_FAILED", error: err });
  }
};

export const getNotRated = (userId, visitorId) => async (dispatch) => {
  dispatch({ type: "GET_NOT_RATED_REQUEST" });

  try {
    const res = await api
      .setAuthHeaders()
      .get(`/api/review/${userId}/available?visitorId=${visitorId}`);
    dispatch({
      type: "GET_NOT_RATED_SUCCESS",
      payload: res.data.responseData,
    });
  } catch (err) {
    dispatch({ type: "GET_NOT_RATED_FAILED", error: err });
  }
};

export const addReview = async (reviewerId, info) => {
  try {
    const res = await api
      .setAuthHeaders()
      .post(`/api/review?reviewerId=${reviewerId}`, info);

    if (res.data.responseData) {
      alert("Successfully added");
    } else {
      alert("Not succesfully added");
    }
  } catch (err) {
    alert("Something Went Wrong.");
  }
};
