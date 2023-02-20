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

export const googleAuthLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case "USER_LOGIN_GOOGLE_REQUEST":
      return {
        ...state,
        loading: true,
      };

    case "USER_LOGIN_GOOGLE_SUCCESS":
      return {
        loading: false,
        success: true,
        user: action.payload,
      };

    case "USER_LOGIN_GOOGLE_FAILED":
      return {
        loading: false,
        error: action.error,
      };

    default:
      return { ...state };
  }
};

export const emailAndPasswordAuthLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case "USER_LOGIN_EMAIL_AND_PASSWORD_REQUEST":
      return {
        ...state,
        loading: true,
      };

    case "USER_LOGIN_EMAIL_AND_PASSWORD_SUCCESS":
      return {
        loading: false,
        success: true,
        user: action.payload,
      };

    case "USER_LOGIN_EMAIL_AND_PASSWORD_FAILED":
      return {
        loading: false,
        error: action.error,
      };

    default:
      return { ...state };
  }
};

export const googleAuthRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case "USER_REGISTER_GOOGLE_REQUEST":
      return {
        ...state,
        loading: true,
      };

    case "USER_REGISTER_GOOGLE_SUCCESS":
      return {
        loading: false,
        success: true,
        user: action.payload,
      };

    case "USER_REGISTER_GOOGLE_FAILED":
      return {
        loading: false,
        error: action.error,
      };

    default:
      return { ...state };
  }
};

export const requestOtpEmailReducer = (state = {}, action) => {
  switch (action.type) {
    case "USER_REQUEST_OTP_EMAIL_REQUEST":
      return {
        ...state,
        loading: true,
      };

    case "USER_REQUEST_OTP_EMAIL_SUCCESS":
      return {
        loading: false,
        success: action.payload,
      };

    case "USER_REQUEST_OTP_EMAIL_FAILED":
      return {
        loading: false,
        error: action.error,
      };

    default:
      return { ...state };
  }
};

export const verifyOtpReducer = (state = {}, action) => {
  switch (action.type) {
    case "USER_VERIFY_OTP_REQUEST":
      return {
        ...state,
        loading: true,
      };

    case "USER_VERIFY_OTP_SUCCESS":
      return {
        loading: false,
        success: true,
        message: action.payload,
      };

    case "USER_VERIFY_OTP_FAILED":
      return {
        loading: false,
        error: action.error,
      };

    default:
      return { ...state };
  }
};

export const userInfoReducer = (state = {}, action) => {
  switch (action.type) {
    case "USER_INFO":
      return {
        ...state,
        user: action.payload,
      };

    default:
      return { ...state };
  }
};
