export const changePasswordEmailReducer = (state = {}, action) => {
  switch (action.type) {
    case "CHANGE_PASSWORD_EMAIL_REQUEST":
      return {
        ...state,
        loading: true,
      };

    case "CHANGE_PASSWORD_EMAIL_SUCCESS":
      return {
        loading: false,
        success: action.payload,
      };

    case "CHANGE_PASSWORD_EMAIL_FAILED":
      return {
        loading: false,
        error: action.error,
      };

    default:
      return { ...state };
  }
};
