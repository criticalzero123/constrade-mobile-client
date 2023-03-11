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
    alert("deleted");
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
    alert("reported");
  } catch (error) {
    dispatch({ type: "REPORT_COMMUNITY_FAILED", error: error });
  }
};

export const getAllCommunity = () => async (dispatch) => {
  dispatch({ type: "GET_ALL_COMMUNITY_REQUEST" });

  try {
    const res = await api.setAuthHeaders().get("/api/community");
    dispatch({
      type: "GET_ALL_COMMUNITY_SUCCESS",
      payload: res.data.responseData,
    });
  } catch (error) {
    dispatch({ type: "GET_ALL_COMMUNITY_FAILED", error: error });
  }
};

export const joinCommunityById = (info) => async (dispatch) => {
  dispatch({ type: "JOIN_COMMUNITY_BY_ID_REQUEST" });

  try {
    const res = await api.setAuthHeaders().post("/api/community/join", info);
    dispatch({
      type: "JOIN_COMMUNITY_BY_ID_SUCCESS",
      payload: res.data.responseData,
    });
  } catch (error) {
    dispatch({ type: "JOIN_COMMUNITY_BY_ID_FAILED", error: error });
  }
};

export const postCommunity = (communityId, info) => async (dispatch) => {
  dispatch({ type: "POST_COMMUNITY_REQUEST" });

  try {
    const res = await api
      .setAuthHeaders()
      .post(`/api/community/${communityId}/post`, info);

    dispatch({
      type: "POST_COMMUNITY_SUCCESS",
      payload: res.data.responseData,
    });
  } catch (error) {
    dispatch({ type: "POST_COMMUNITY_FAILED", error: error });
  }
};

export const getPostByCommunityId = (communityId) => async (dispatch) => {
  dispatch({ type: "GET_POST_BY_COMMUNITY_ID_REQUEST" });

  try {
    const res = await api
      .setAuthHeaders()
      .get(`/api/community/${communityId}/post`);

    dispatch({
      type: "GET_POST_BY_COMMUNITY_ID_SUCCESS",
      payload: res.data.responseData,
    });
  } catch (error) {
    dispatch({ type: "GET_POST_BY_COMMUNITY_ID_FAILED", error: error });
  }
};

export const likePost = (communityId, postId, userId) => async (dispatch) => {
  dispatch({ type: "LIKE_POST_REQUEST" });

  try {
    const res = await api
      .setAuthHeaders()
      .put(
        `/api/community/${communityId}/post/${postId}/like?userId=${userId}`
      );

    dispatch({
      type: "LIKE_POST_SUCCESS",
      payload: res.data.responseData,
    });
  } catch (error) {
    dispatch({ type: "LIKE_POST_FAILED", error: error });
  }
};

export const deletePostInCommunity =
  (communityId, postId) => async (dispatch) => {
    dispatch({ type: "DELETE_POST_IN_COMMUNITY_REQUEST" });

    try {
      const res = await api
        .setAuthHeaders()
        .delete(`/api/community/${communityId}/post/${postId}`);

      dispatch({
        type: "DELETE_POST_IN_COMMUNITY_SUCCESS",
        payload: res.data.responseData,
      });
    } catch (error) {
      dispatch({ type: "DELETE_POST_IN_COMMUNITY_FAILED", error: error });
    }
  };

export const commentPost = (communityId, info) => async (dispatch) => {
  dispatch({ type: "COMMENT_POST_REQUEST" });

  try {
    const res = await api
      .setAuthHeaders()
      .post(
        `/api/community/${communityId}/post/${info.communityPostId}/comment`,
        info
      );

    dispatch({
      type: "COMMENT_POST_SUCCESS",
      payload: res.data.responseData,
    });
  } catch (error) {
    dispatch({ type: "COMMENT_POST_FAILED", error: error });
  }
};

export const editCommentPost = (communityId, info) => async (dispatch) => {
  dispatch({ type: "EDIT_COMMENT_POST_REQUEST" });

  try {
    const res = await api
      .setAuthHeaders()
      .put(
        `/api/community/${communityId}/post/${info.communityPostId}/comment`,
        info
      );

    dispatch({
      type: "EDIT_COMMENT_POST_SUCCESS",
      payload: res.data.responseData,
    });
  } catch (error) {
    dispatch({ type: "EDIT_COMMENT_POST_FAILED", error: error });
  }
};

export const getCommentPost = (communityId, postId) => async (dispatch) => {
  dispatch({ type: "GET_COMMENT_POST_BY_ID_REQUEST" });

  try {
    const res = await api
      .setAuthHeaders()
      .get(`/api/community/${communityId}/post/${postId}/comment`);

    dispatch({
      type: "GET_COMMENT_POST_BY_ID_SUCCESS",
      payload: res.data.responseData,
    });
  } catch (error) {
    dispatch({ type: "GET_COMMENT_POST_BY_ID_FAILED", error: error });
  }
};

export const deleteCommentPost =
  (communityId, postId, commentId) => async (dispatch) => {
    dispatch({ type: "DELETE_COMMENT_BY_ID_REQUEST" });

    try {
      const res = await api
        .setAuthHeaders()
        .delete(
          `/api/community/${communityId}/post/${postId}/comment/${commentId}`
        );

      dispatch({
        type: "DELETE_COMMENT_BY_ID_SUCCESS",
        payload: res.data.responseData,
      });
    } catch (error) {
      dispatch({ type: "DELETE_COMMENT_BY_ID_FAILED", error: error });
    }
  };

export const getCommunityMembers = (communityId) => async (dispatch) => {
  dispatch({ type: "GET_COMMUNITY_MEMBERS_REQUEST" });

  try {
    const res = await api
      .setAuthHeaders()
      .get(`/api/community/${communityId}/members`);

    dispatch({
      type: "GET_COMMUNITY_MEMBERS_SUCCESS",
      payload: res.data.responseData,
    });
  } catch (error) {
    dispatch({ type: "GET_COMMUNITY_MEMBERS_FAILED", error: error });
  }
};

export const removeCommunityMemberById =
  (communityId, memberId) => async (dispatch) => {
    dispatch({ type: "DELETE_COMMUNITY_MEMBER_BY_ID_REQUEST" });

    try {
      const res = await api
        .setAuthHeaders()
        .delete(`/api/community/${communityId}/members/${memberId}`);

      dispatch({
        type: "DELETE_COMMUNITY_MEMBER_BY_ID_SUCCESS",
        payload: res.data.responseData,
      });
    } catch (error) {
      dispatch({ type: "DELETE_COMMUNITY_MEMBER_BY_ID_FAILED", error: error });
    }
  };

export const cleanCommunity = () => (dispatch) => {
  dispatch({ type: "CREATE_COMMUNITY_LEAVE" });
  // dispatch({ type: "GET_MY_COMMUNITY_LEAVE" });
  // dispatch({ type: "GET_COMMUNITY_BY_ID_LEAVE" });
  // dispatch({ type: "GET_ALL_COMMUNITY_LEAVE" });
};
