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
        error: action.error,
      };

    default:
      return { ...state };
  }
};

export const getNotRatedReducer = (state = {}, action) => {
  switch (action.type) {
    case "GET_NOT_RATED_REQUEST":
      return {
        ...state,
        loading: true,
      };

    case "GET_NOT_RATED_SUCCESS":
      return {
        loading: false,
        data: action.payload,
      };

    case "GET_NOT_RATED_FAILED":
      return {
        loading: false,
        error: action.error,
      };

    default:
      return { ...state };
  }
};
