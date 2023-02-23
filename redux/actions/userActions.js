import api from "../../service/api";

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

export const getUserInfo = (user) => (dispatch) => {
  dispatch({ type: "USER_INFO", payload: user });
};
