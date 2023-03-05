import api from "../../service/api";

export const createCommunity = (info) => async (dispatch) => {
  dispatch({ type: "CREATE_COMMUNITY_REQUEST" });

  try {
    const res = await api.setAuthHeaders().post("/api/community/create", info);
    dispatch({
      type: "CREATE_COMMUNITY_SUCCESS",
      payload: res.data.responseData,
    });
  } catch (error) {
    dispatch({ type: "CREATE_COMMUNITY_FAILED", error: error });
  }
};

export const getMyCommunity = (userId) => async (dispatch) => {
  dispatch({ type: "GET_MY_COMMUNITY_REQUEST" });

  try {
    const res = await api
      .setAuthHeaders()
      .get(`/api/community/created/${userId}`);
    dispatch({
      type: "GET_MY_COMMUNITY_SUCCESS",
      payload: res.data.responseData,
    });
  } catch (error) {
    dispatch({ type: "GET_MY_COMMUNITY_FAILED", error: error });
  }
};

export const cleanCommunity = () => (dispatch) => {
  dispatch({ type: "CREATE_COMMUNITY_LEAVE" });
  dispatch({ type: "GET_MY_COMMUNITY_LEAVE" });
};
