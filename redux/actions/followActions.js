import axios from "axios";
import { API_URL } from "@env";

export const getFollowAndFollowersUser = (userId) => (dispatch) => {
  dispatch({ type: "GET_USER_FOLLOW_FOLLOWERS_REQUEST" });
  axios
    .get(`${API_URL}/api/users/${userId}/follow`)
    .then((res) => {
      dispatch({
        type: "GET_USER_FOLLOW_FOLLOWERS_SUCCESS",
        payload: res.data.responseData,
      });
    })
    .catch((err) => {
      dispatch({
        type: "GET_USER_FOLLOW_FOLLOWERS_FAILED",
        error: err,
      });
    });
};
