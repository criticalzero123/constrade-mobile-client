export const getReviewsUserReducer = (state = {}, action) => {
  switch (action.type) {
    case "GET_USER_REVIEWS_REQUEST":
      return {
        ...state,
        loading: true,
      };

    case "GET_USER_REVIEWS_SUCCESS":
      return {
        loading: false,
        success: true,
        review: action.payload,
      };

    case "GET_USER_REVIEWS_FAILED":
      return {
        loading: false,
        error: true,
      };

    default:
      return { ...state };
  }
};
