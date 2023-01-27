import axios from "axios";
import { API_URL_LOCAL } from "@env";

export const emailAndPasswordRegister = (data) => (dispatch) => {
  dispatch({ type: "USER_EMAIL_PASSWORD_REGISTER_AUTH_REQUEST" });
  axios
    .post(`${API_URL_LOCAL}/api/users`, data)
    .then((res) => {
      dispatch({
        type: "USER_EMAIL_PASSWORD_REGISTER_AUTH_SUCCESS",
        payload: res,
      });
    })
    .catch((err) => {
      dispatch({
        type: "USER_EMAIL_PASSWORD_REGISTER_AUTH_FAILED",
        error: err,
      });
    });
};

export const checkEmail = (email) => (dispatch) => {
  dispatch({ type: "CHECK_USER_EMAIL_REQUEST" });
  axios
    .get(`${API_URL_LOCAL}/api/users/check/email/${email}`)
    .then((res) => {
      dispatch({
        type: "CHECK_USER_EMAIL_SUCCESS",
        payload: res.data.responseData,
      });
    })
    .catch((err) => {
      dispatch({
        type: "CHECK_USER_EMAIL_FAILED",
        error: err,
      });
    });
};
