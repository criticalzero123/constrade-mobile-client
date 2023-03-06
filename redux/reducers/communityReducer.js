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
