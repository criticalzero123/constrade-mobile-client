export const createCommunityReducer = (state = {}, action) => {
  switch (action.type) {
    case "CREATE_COMMUNITY_REQUEST":
      return {
        ...state,
        loading: true,
      };

    case "CREATE_COMMUNITY_SUCCESS":
      return {
        loading: false,
        data: action.payload,
      };

    case "CREATE_COMMUNITY_FAILED":
      return {
        loading: false,
        error: action.error,
      };

    case "CREATE_COMMUNITY_LEAVE":
      return {};

    default:
      return { ...state };
  }
};

export const getMyCommunityReducer = (state = {}, action) => {
  switch (action.type) {
    case "GET_MY_COMMUNITY_REQUEST":
      return {
        ...state,
        loading: true,
      };

    case "GET_MY_COMMUNITY_SUCCESS":
      return {
        loading: false,
        data: action.payload,
      };

    case "GET_MY_COMMUNITY_FAILED":
      return {
        loading: false,
        error: action.error,
      };

    case "GET_MY_COMMUNITY_LEAVE":
      return {};

    default:
      return { ...state };
  }
};

export const getCommunityByIdReducer = (state = {}, action) => {
  switch (action.type) {
    case "GET_COMMUNITY_BY_ID_REQUEST":
      return {
        ...state,
        loading: true,
      };

    case "GET_COMMUNITY_BY_ID_SUCCESS":
      return {
        loading: false,
        data: action.payload,
      };

    case "GET_COMMUNITY_BY_ID_FAILED":
      return {
        loading: false,
        error: action.error,
      };

    case "GET_COMMUNITY_BY_ID_LEAVE":
      return {};

    default:
      return { ...state };
  }
};

export const deleteCommunityReducer = (state = {}, action) => {
  switch (action.type) {
    case "DELETE_COMMUNITY_REQUEST":
      return {
        ...state,
        loading: true,
      };

    case "DELETE_COMMUNITY_SUCCESS":
      return {
        loading: false,
        data: action.payload,
      };

    case "DELETE_COMMUNITY_FAILED":
      return {
        loading: false,
        error: action.error,
      };

    case "DELETE_COMMUNITY_LEAVE":
      return {};

    default:
      return { ...state };
  }
};

export const joinCommunityByIdReducer = (state = {}, action) => {
  switch (action.type) {
    case "JOIN_COMMUNITY_BY_ID_REQUEST":
      return {
        ...state,
        loading: true,
      };

    case "JOIN_COMMUNITY_BY_ID_SUCCESS":
      return {
        loading: false,
        data: action.payload,
      };

    case "JOIN_COMMUNITY_BY_ID_FAILED":
      return {
        loading: false,
        error: action.error,
      };

    case "JOIN_COMMUNITY_BY_ID_LEAVE":
      return {};

    default:
      return { ...state };
  }
};

export const getAllCommunityReducer = (state = {}, action) => {
  switch (action.type) {
    case "GET_ALL_COMMUNITY_REQUEST":
      return {
        ...state,
        loading: true,
      };

    case "GET_ALL_COMMUNITY_SUCCESS":
      return {
        loading: false,
        data: action.payload,
      };

    case "GET_ALL_COMMUNITY_FAILED":
      return {
        loading: false,
        error: action.error,
      };

    case "GET_ALL_COMMUNITY_LEAVE":
      return {};

    default:
      return { ...state };
  }
};

export const postCommunityReducer = (state = {}, action) => {
  switch (action.type) {
    case "POST_COMMUNITY_REQUEST":
      return {
        ...state,
        loading: true,
      };

    case "POST_COMMUNITY_SUCCESS":
      return {
        loading: false,
        data: action.payload,
      };

    case "POST_COMMUNITY_FAILED":
      return {
        loading: false,
        error: action.error,
      };

    case "POST_COMMUNITY_LEAVE":
      return {};

    default:
      return { ...state };
  }
};

export const getPostByCommunityIdReducer = (state = {}, action) => {
  switch (action.type) {
    case "GET_POST_BY_COMMUNITY_ID_REQUEST":
      return {
        ...state,
        loading: true,
      };

    case "GET_POST_BY_COMMUNITY_ID_SUCCESS":
      return {
        loading: false,
        data: action.payload,
      };

    case "GET_POST_BY_COMMUNITY_ID_FAILED":
      return {
        loading: false,
        error: action.error,
      };

    case "GET_POST_BY_COMMUNITY_ID_LEAVE":
      return {};

    default:
      return { ...state };
  }
};

export const deletePostInCommunityReducer = (state = {}, action) => {
  switch (action.type) {
    case "DELETE_POST_IN_COMMUNITY_REQUEST":
      return {
        ...state,
        loading: true,
      };

    case "DELETE_POST_IN_COMMUNITY_SUCCESS":
      return {
        loading: false,
        data: action.payload,
      };

    case "DELETE_POST_IN_COMMUNITY_FAILED":
      return {
        loading: false,
        error: action.error,
      };

    case "DELETE_POST_IN_COMMUNITY_LEAVE":
      return {};

    default:
      return { ...state };
  }
};

export const likePostReducer = (state = {}, action) => {
  switch (action.type) {
    case "LIKE_POST__REQUEST":
      return {
        ...state,
        loading: true,
      };

    case "LIKE_POST__SUCCESS":
      return {
        loading: false,
        data: action.payload,
      };

    case "LIKE_POST__FAILED":
      return {
        loading: false,
        error: action.error,
      };

    case "LIKE_POST__LEAVE":
      return {};

    default:
      return { ...state };
  }
};

export const commentPostReducer = (state = {}, action) => {
  switch (action.type) {
    case "COMMENT_POST_REQUEST":
      return {
        ...state,
        loading: true,
      };

    case "COMMENT_POST_SUCCESS":
      return {
        loading: false,
        data: action.payload,
      };

    case "COMMENT_POST_FAILED":
      return {
        loading: false,
        error: action.error,
      };

    case "COMMENT_POST_LEAVE":
      return {};

    default:
      return { ...state };
  }
};

export const getCommentPostReducer = (state = {}, action) => {
  switch (action.type) {
    case "GET_COMMENT_POST_BY_ID_REQUEST":
      return {
        ...state,
        loading: true,
      };

    case "GET_COMMENT_POST_BY_ID_SUCCESS":
      return {
        loading: false,
        data: action.payload,
      };

    case "GET_COMMENT_POST_BY_ID_FAILED":
      return {
        loading: false,
        error: action.error,
      };

    case "GET_COMMENT_POST_BY_ID_LEAVE":
      return {};

    default:
      return { ...state };
  }
};

export const deleteCommentPostReducer = (state = {}, action) => {
  switch (action.type) {
    case "DELETE_COMMENT_BY_ID_REQUEST":
      return {
        ...state,
        loading: true,
      };

    case "DELETE_COMMENT_BY_ID_SUCCESS":
      return {
        loading: false,
        data: action.payload,
      };

    case "DELETE_COMMENT_BY_ID_FAILED":
      return {
        loading: false,
        error: action.error,
      };

    case "DELETE_COMMENT_BY_ID_LEAVE":
      return {};

    default:
      return { ...state };
  }
};
