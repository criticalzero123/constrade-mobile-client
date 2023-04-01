import api from "../../service/api";

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
    const result = await api.setAuthHeaders().post(`api/users/report`, info);

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

export const submitIdRequest = async (info) => {
  try {
    const res = await api
      .setAuthHeaders()
      .post("api/verification/submit", info);

    if (res.data.responseData) {
      alert("Successfully submitted!");
    } else {
      alert("Not successful submitted!");
    }
  } catch (error) {
    console.error(error);
  }
};
