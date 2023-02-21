import axios from "axios";
import { API_URL } from "@env";

export const getReviewsUser = (userId) => (dispatch) => {
  dispatch({ type: "GET_USER_REVIEWS_REQUEST" });
  axios
    .get(`${API_URL}/api/users/${userId}/review`)
    .then((res) => {
      dispatch({
        type: "GET_USER_REVIEWS_SUCCESS",
        payload: res.data.responseData,
      });
    })
    .catch((err) => {
      dispatch({ type: "GET_USER_REVIEWS_FAILED", error: err });
    });
};
