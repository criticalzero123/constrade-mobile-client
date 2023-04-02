import api from "../../service/api";

export const emailAndPasswordRegister = async (userInfo) => {
  try {
    const res = await api.post(`/api/auth`, userInfo);

    return res.data.responseData;
  } catch (error) {
    console.log(error);
  }
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

export const emailAndPasswordAuthLogin = async (userInfo) => {
  try {
    const res = await api.put(`/api/auth/login`, userInfo);

    return res.data.responseData;
  } catch (error) {
    console.log(error);
  }
};

export const requestOtpEmail = async (email) => {
  try {
    const res = await api.post(`/api/auth/otp/email`, { sendto: email });

    return res.data.responseData;
  } catch (error) {
    console.log(error);
  }
};

export const verifyOtp = async (user, code) => {
  try {
    const result = await api.get(
      `/api/auth/otp/verify?user=${user}&code=${code}`
    );

    return result.data.responseData;
  } catch (error) {
    console.log(error);
  }
};

export const changePasswordEmail = async (info) => {
  try {
    const res = await api.put(`/api/auth/change/password`, info);

    return res.data.responseData;
  } catch (error) {
    console.log(error);
  }
};

export const signOutUser = () => (dispatch) => {
  dispatch({ type: "USER_SIGN_OUT" });
  dispatch({ type: "USER_INFO_CLEAR" });
};
