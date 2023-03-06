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

export const getCommunityById = (id) => async (dispatch) => {
  dispatch({ type: "GET_COMMUNITY_BY_ID_REQUEST" });

  try {
    const res = await api.setAuthHeaders().get(`/api/community/${id}`);
    dispatch({
      type: "GET_COMMUNITY_BY_ID_SUCCESS",
      payload: res.data.responseData,
    });
  } catch (error) {
    dispatch({ type: "GET_COMMUNITY_BY_ID_FAILED", error: error });
  }
};

export const deleteCommunity = (id, userId) => async (dispatch) => {
  dispatch({ type: "DELETE_COMMUNITY_REQUEST" });

  try {
    const res = await api
      .setAuthHeaders()
      .delete(`/api/community/${id}?userId=${userId}`);
    dispatch({
      type: "DELETE_COMMUNITY_SUCCESS",
      payload: res.data.responseData,
    });
  } catch (error) {
    dispatch({ type: "DELETE_COMMUNITY_FAILED", error: error });
  }
};

export const reportCommunity = (info) => async (dispatch) => {
  dispatch({ type: "REPORT_COMMUNITY_REQUEST" });

  try {
    const res = await api.setAuthHeaders().post(`/api/community/report`, info);
    dispatch({
      type: "REPORT_COMMUNITY_SUCCESS",
      payload: res.data.responseData,
    });
  } catch (error) {
    dispatch({ type: "REPORT_COMMUNITY_FAILED", error: error });
  }
};

export const cleanCommunity = () => (dispatch) => {
  dispatch({ type: "CREATE_COMMUNITY_LEAVE" });
  dispatch({ type: "GET_MY_COMMUNITY_LEAVE" });
  dispatch({ type: "GET_COMMUNITY_BY_ID_LEAVE" });
};
