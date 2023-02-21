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
        error: true,
      };

    default:
      return { ...state };
  }
};
