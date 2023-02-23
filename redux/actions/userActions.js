import createAuthApiInstance from "../../service/api";

export const updatePersonInfo = (personInfo) => async (dispatch) => {
  const api = await createAuthApiInstance();

  dispatch({ type: "UPDATE_USER_INFO_REQUEST" });
  api
    .put(`api/users/person`, personInfo)
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
