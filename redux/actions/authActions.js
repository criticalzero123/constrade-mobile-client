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

export const googleAuthRegister = async (userInfo) => {
  try {
    const res = await api.post(`/api/auth`, userInfo);

    return res.data.responseData;
  } catch (error) {
    console.error(error);
  }
};

export const checkEmail = async (email) => {
  try {
    const res = await api.get(`/api/auth/check/email/${email}`);

    return res.data.responseData;
  } catch (error) {
    console.error(error);
  }
};
export const googleAuthLogin = async (email) => {
  try {
    const res = await api.put(`/api/auth/login/google`, { email });

    return res.data.responseData;
  } catch (error) {
    console.log(error);
  }
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

export const changePasswordEmail = (info) => (dispatch) => {
  dispatch({ type: "CHANGE_PASSWORD_EMAIL_REQUEST" });

  api
    .put(`/api/auth/change/password`, info)
    .then((res) => {
      dispatch({
        type: "CHANGE_PASSWORD_EMAIL_SUCCESS",
        payload: res.data.responseData,
      });
    })
    .catch((err) => {
      dispatch({ type: "CHANGE_PASSWORD_EMAIL_FAILED", error: err });
    });
};

export const signOutUser = () => (dispatch) => {
  dispatch({ type: "USER_SIGN_OUT" });
  dispatch({ type: "USER_INFO_CLEAR" });
};

export const cleanAllAuth = () => (dispatch) => {
  dispatch({ type: "REGISTER_GOOGLE_LEAVE" });
  dispatch({ type: "LOGIN_EMAIL_AND_PASSWORD_LEAVE" });
  dispatch({ type: "LOGIN_GOOGLE_LEAVE" });
  dispatch({ type: "EMAIL_PASSWORD_REGISTER_AUTH_LEAVE" });
};
