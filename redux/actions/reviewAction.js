import api from "../../service/api";

export const getReviewsUser = (userId) => async (dispatch) => {
  dispatch({ type: "GET_USER_REVIEWS_REQUEST" });

  try {
    const res = await api.setAuthHeaders().get(`/api/review/${userId}`);
    dispatch({
      type: "GET_USER_REVIEWS_SUCCESS",
      payload: res.data.responseData,
    });
  } catch (err) {
    dispatch({ type: "GET_USER_REVIEWS_FAILED", error: err });
  }
};
