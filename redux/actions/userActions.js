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

export const updatePersonInfo = async (personInfo) => {
  try {
    const result = await api
      .setAuthHeaders()
      .put(`api/users/person`, personInfo);

    return result.data.responseData;
  } catch (err) {
    console.log(err);
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

    if (result.data.responseData) alert("Reported");
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

    return res.data.responseData;
  } catch (error) {
    console.error(error);
  }
};

export const getUserType = async (userId) => {
  try {
    const res = await api.setAuthHeaders().get(`api/users/type/${userId}`);

    return res.data.responseData;
  } catch (error) {
    console.log(error);
  }
};

export const getHasRequest = async (userId) => {
  try {
    const res = await api.setAuthHeaders().get(`api/verification/${userId}`);

    return res.data.responseData;
  } catch (error) {
    console.log(error);
  }
};

export const addCountPost = async (userId, counts) => {
  try {
    const res = await api
      .setAuthHeaders()
      .put(`api/users/count/add/${userId}?counts=${counts}`);

    return res.data.responseData;
  } catch (error) {
    console.log(error);
  }
};
