import axios from "axios";
import { API_URL } from "@env";

export const emailAndPasswordRegister = (userInfo) => (dispatch) => {
  dispatch({ type: "USER_EMAIL_PASSWORD_REGISTER_AUTH_REQUEST" });
  axios
    .post(`${API_URL}/api/users`, userInfo)
    .then((res) => {
      dispatch({
        type: "USER_EMAIL_PASSWORD_REGISTER_AUTH_SUCCESS",
        payload: res.data.responseData,
      });
    })
    .catch((err) => {
      dispatch({
        type: "USER_EMAIL_PASSWORD_REGISTER_AUTH_FAILED",
        error: err,
      });
    });
};

export const googleAuthRegister = (userInfo) => (dispatch) => {
  dispatch({ type: "USER_REGISTER_GOOGLE_REQUEST" });

  axios
    .post(`${API_URL}/api/users`, userInfo)
    .then((res) => {
      dispatch({
        type: "USER_REGISTER_GOOGLE_SUCCESS",
        payload: res.data.responseData,
      });
    })
    .catch((err) => {
      dispatch({ type: "USER_REGISTER_GOOGLE_FAILED", error: err });
    });
};

export const checkEmail = (email) => (dispatch) => {
  dispatch({ type: "CHECK_USER_EMAIL_REQUEST" });
  axios
    .get(`${API_URL}/api/users/check/email/${email}`)
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

export const googleAuthLogin = (userEmail) => (dispatch) => {
  dispatch({ type: "USER_LOGIN_GOOGLE_REQUEST" });

  axios
    .get(`${API_URL}/api/users/login/google/${userEmail}`)
    .then((res) => {
      dispatch({
        type: "USER_LOGIN_GOOGLE_SUCCESS",
        payload: res.data.responseData,
      });
    })
    .catch((err) => {
      dispatch({ type: "USER_LOGIN_GOOGLE_FAILED", error: err });
    });
};

export const emailAndPasswordAuthLogin = (userInfo) => (dispatch) => {
  dispatch({ type: "USER_LOGIN_EMAIL_AND_PASSWORD_REQUEST" });

  axios
    .put(`${API_URL}/api/users/login/${userInfo}`)
    .then((res) => {
      dispatch({
        type: "USER_LOGIN_EMAIL_AND_PASSWORD_SUCCESS",
        payload: res.data.responseData,
      });
    })
    .catch((err) => {
      dispatch({ type: "USER_LOGIN_EMAIL_AND_PASSWORD_FAILED", error: err });
    });
};

export const getUserInfo = (user) => (dispatch) => {
  dispatch({ type: "USER_INFO", payload: user });
};
