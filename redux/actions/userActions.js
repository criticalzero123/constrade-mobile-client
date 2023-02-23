import axios from "axios";
import { API_URL } from "@env";

export const updatePersonInfo = (personInfo) => (dispatch) => {
  dispatch({ type: "UPDATE_USER_INFO_REQUEST" });

  axios
    .put(`${API_URL}/api/users/person`, personInfo)
    .then((res) => {
      dispatch({
        type: "UPDATE_USER_INFO_SUCCESS",
        payload: res.data.responseData,
      });
    })
    .catch((err) => {
      dispatch({ type: "UPDATE_USER_INFO_FAILED", error: err });
    });
};

export const getUserInfo = (user) => (dispatch) => {
  dispatch({ type: "USER_INFO", payload: user });
};
