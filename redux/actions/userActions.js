import api from "../../service/api";

// TODO: this is temporary please remove this in the future
export const getAllUsers = () => async (dispatch) => {
  dispatch({ type: "GET_ALL_USERS_REQUEST" });

  try {
    const res = await api.setAuthHeaders().get("/api/users/");

    dispatch({ type: "GET_ALL_USERS_SUCCESS", payload: res.data.responseData });
  } catch (err) {
    dispatch({ type: "GET_ALL_USERS_FAILED", error: err });
  }
};

export const getUserById = (userId) => async (dispatch) => {
  dispatch({ type: "GET_USER_BY_ID_REQUEST" });

  try {
    const res = await api.setAuthHeaders().get(`/api/users/${userId}`);

    dispatch({
      type: "GET_USER_BY_ID_SUCCESS",
      payload: res.data.responseData,
    });
  } catch (err) {
    dispatch({ type: "GET_USER_BY_ID_FAILED", error: err });
  }
};

export const updatePersonInfo = (personInfo) => async (dispatch) => {
  dispatch({ type: "UPDATE_USER_INFO_REQUEST" });

  try {
    const result = await api
      .setAuthHeaders()
      .put(`api/users/person`, personInfo);

    dispatch({
      type: "UPDATE_USER_INFO_SUCCESS",
      payload: result.data.responseData,
    });
  } catch (err) {
    dispatch({ type: "UPDATE_USER_INFO_FAILED", error: err });
  }
};

export const userReport = (info) => async (dispatch) => {
  dispatch({ type: "REPORT_USER_REQUEST" });

  try {
    const result = await api.setAuthHeaders().post(`api/userreport`, info);

    dispatch({
      type: "REPORT_USER_SUCCESS",
      payload: result.data.responseData,
    });
  } catch (err) {
    dispatch({ type: "REPORT_USER_FAILED", error: err });
  }
};

export const getUserInfo = (user) => (dispatch) => {
  dispatch({ type: "USER_INFO", payload: user });
};
