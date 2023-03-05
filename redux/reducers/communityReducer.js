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
