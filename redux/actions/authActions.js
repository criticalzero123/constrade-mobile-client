import api from "../../service/api";

export const emailAndPasswordRegister = (userInfo) => (dispatch) => {
  dispatch({ type: "EMAIL_PASSWORD_REGISTER_AUTH_REQUEST" });

  api
    .post(`/api/auth`, userInfo)
    .then((res) => {
      dispatch({
        type: "EMAIL_PASSWORD_REGISTER_AUTH_SUCCESS",
        payload: res.data.responseData,
      });
    })
    .catch((err) => {
      dispatch({
        type: "EMAIL_PASSWORD_REGISTER_AUTH_FAILED",
        error: err,
      });
    });
};

export const googleAuthRegister = (userInfo) => (dispatch) => {
  dispatch({ type: "REGISTER_GOOGLE_REQUEST" });

  api
    .post(`/api/auth`, userInfo)
    .then((res) => {
      dispatch({
        type: "REGISTER_GOOGLE_SUCCESS",
        payload: res.data.responseData,
      });
    })
    .catch((err) => {
      dispatch({ type: "REGISTER_GOOGLE_FAILED", error: err });
    });
};

export const checkEmail = (email) => (dispatch) => {
  dispatch({ type: "CHECK_EMAIL_REQUEST" });
  api
    .get(`/api/auth/check/email/${email}`)
    .then((res) => {
      dispatch({
        type: "CHECK_EMAIL_SUCCESS",
        payload: res.data.responseData,
      });
    })
    .catch((err) => {
      dispatch({
        type: "CHECK_EMAIL_FAILED",
        error: err,
      });
    });
};

export const googleAuthLogin = (email) => (dispatch) => {
  dispatch({ type: "LOGIN_GOOGLE_REQUEST" });

  api
    .put(`/api/auth/login/google`, { email })
    .then((res) => {
      dispatch({
        type: "LOGIN_GOOGLE_SUCCESS",
        payload: res.data.responseData,
      });
    })
    .catch((err) => {
      dispatch({ type: "LOGIN_GOOGLE_FAILED", error: err });
    });
};

export const emailAndPasswordAuthLogin = (userInfo) => (dispatch) => {
  dispatch({ type: "LOGIN_EMAIL_AND_PASSWORD_REQUEST" });
  api
    .put(`/api/auth/login`, userInfo)
    .then((res) => {
      dispatch({
        type: "LOGIN_EMAIL_AND_PASSWORD_SUCCESS",
        payload: res.data.responseData,
      });
    })
    .catch((err) => {
      dispatch({ type: "LOGIN_EMAIL_AND_PASSWORD_FAILED", error: err });
    });
};

export const requestOtpEmail = (email) => (dispatch) => {
  dispatch({ type: "REQUEST_OTP_EMAIL_REQUEST" });

  api
    .post(`/api/auth/otp/email`, { sendto: email })
    .then((res) => {
      dispatch({
        type: "REQUEST_OTP_EMAIL_SUCCESS",
        payload: res.data.responseData,
      });
    })
    .catch((err) => {
      dispatch({ type: "REQUEST_OTP_EMAIL_FAILED", error: err });
    });
};

export const verifyOtp = (user, code) => (dispatch) => {
  dispatch({ type: "VERIFY_OTP_REQUEST" });

  api
    .get(`/api/auth/otp/verify?user=${user}&code=${code}`)
    .then((res) => {
      dispatch({
        type: "VERIFY_OTP_SUCCESS",
        payload: res.data.responseData,
      });
    })
    .catch((err) => {
      dispatch({ type: "VERIFY_OTP_FAILED", error: err });
    });
};

export const signOutUser = () => (dispatch) => {
  dispatch({ type: "SIGN_OUT" });
};

export const cleanAllAuth = () => (dispatch) => {
  dispatch({ type: "REGISTER_GOOGLE_LEAVE" });
  dispatch({ type: "LOGIN_EMAIL_AND_PASSWORD_LEAVE" });
  dispatch({ type: "LOGIN_GOOGLE_LEAVE" });
  dispatch({ type: "EMAIL_PASSWORD_REGISTER_AUTH_LEAVE" });
};
