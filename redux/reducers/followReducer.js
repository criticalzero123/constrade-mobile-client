export const getFollowAndFollowersUserReducer = (state = {}, action) => {
  switch (action.type) {
    case "GET_USER_FOLLOW_FOLLOWERS_REQUEST":
      return {
        ...state,
        loading: true,
      };

    case "GET_USER_FOLLOW_FOLLOWERS_SUCCESS":
      return {
        loading: false,
        success: true,
        data: action.payload,
      };

    case "GET_USER_FOLLOW_FOLLOWERS_FAILED":
      return {
        loading: false,
        error: action.error,
      };

    default:
      return { ...state };
  }
};

export const followUserReducer = (state = {}, action) => {
  switch (action.type) {
    case "FOLLOW_USER_REQUEST":
      return {
        ...state,
        loading: true,
      };

    case "FOLLOW_USER_SUCCESS":
      return {
        loading: false,
        success: true,
        data: action.payload,
      };

    case "FOLLOW_USER_FAILED":
      return {
        loading: false,
        error: action.error,
      };

    default:
      return { ...state };
  }
};

export const isFollowUserReducer = (state = {}, action) => {
  switch (action.type) {
    case "GET_IS_FOLLOW_USER_REQUEST":
      return {
        ...state,
        loading: true,
      };

    case "GET_IS_FOLLOW_USER_SUCCESS":
      return {
        loading: false,
        success: true,
        data: action.payload,
      };

    case "GET_IS_FOLLOW_USER_FAILED":
      return {
        loading: false,
        error: action.error,
      };

    case "GET_IS_FOLLOW_USER_LEAVE":
      return {};

    default:
      return { ...state };
  }
};
