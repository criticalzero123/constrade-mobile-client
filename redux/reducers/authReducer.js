export const emailAndPasswordRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case "USER_EMAIL_PASSWORD_REGISTER_AUTH_REQUEST":
      return {
        ...state,
        loading: true,
      };

    case "USER_EMAIL_PASSWORD_REGISTER_AUTH_SUCCESS":
      return {
        loading: false,
        success: true,
        user: action.payload,
      };

    case "USER_EMAIL_PASSWORD_REGISTER_AUTH_FAILED":
      return {
        loading: false,
        error: true,
      };

    default:
      return { ...state };
  }
};

export const checkEmailReducer = (state = {}, action) => {
  switch (action.type) {
    case "CHECK_USER_EMAIL_REQUEST":
      return {
        ...state,
        loading: true,
      };

    case "CHECK_USER_EMAIL_SUCCESS":
      return {
        loading: false,
        success: true,
        exist: action.payload,
      };

    case "CHECK_USER_EMAIL_FAILED":
      return {
        loading: false,
        error: true,
      };

    default:
      return { ...state };
  }
};
