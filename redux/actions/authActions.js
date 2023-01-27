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
