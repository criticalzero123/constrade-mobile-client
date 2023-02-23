import { CommonActions } from "@react-navigation/native";

export const emailAndPasswordRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case "EMAIL_PASSWORD_REGISTER_AUTH_REQUEST":
      return {
        ...state,
        loading: true,
      };

    case "EMAIL_PASSWORD_REGISTER_AUTH_SUCCESS":
      return {
        loading: false,
        success: true,
        user: action.payload.user,
        token: action.payload.token,
        apiKey: action.payload.apiKey,
      };

    case "EMAIL_PASSWORD_REGISTER_AUTH_FAILED":
      return {
        loading: false,
        error: action.error,
      };

    case "EMAIL_PASSWORD_REGISTER_AUTH_LEAVE":
      return {};

    default:
      return { ...state };
  }
};

export const checkEmailReducer = (state = {}, action) => {
  switch (action.type) {
    case "CHECK_EMAIL_REQUEST":
      return {
        ...state,
        loading: true,
      };

    case "CHECK_EMAIL_SUCCESS":
      return {
        loading: false,
        success: true,
        exist: action.payload,
      };

    case "CHECK_EMAIL_FAILED":
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
    case "LOGIN_GOOGLE_REQUEST":
      return {
        ...state,
        loading: true,
      };

    case "LOGIN_GOOGLE_SUCCESS":
      return {
        loading: false,
        success: true,
        user: action.payload.user,
        apiKey: action.payload.apiKey,
        token: action.payload.token,
      };

    case "LOGIN_GOOGLE_FAILED":
      return {
        loading: false,
        error: action.error,
      };

    case "LOGIN_GOOGLE_LEAVE":
      return {};

    default:
      return { ...state };
  }
};

export const emailAndPasswordAuthLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case "LOGIN_EMAIL_AND_PASSWORD_REQUEST":
      return {
        ...state,
        loading: true,
      };

    case "LOGIN_EMAIL_AND_PASSWORD_SUCCESS":
      return {
        loading: false,
        success: true,
        user: action.payload.user,
        token: action.payload.token,
        apiKey: action.payload.apiKey,
      };

    case "LOGIN_EMAIL_AND_PASSWORD_FAILED":
      return {
        loading: false,
        error: action.error,
      };

    case "LOGIN_EMAIL_AND_PASSWORD_LEAVE":
      return {};

    default:
      return { ...state };
  }
};

export const googleAuthRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case "REGISTER_GOOGLE_REQUEST":
      return {
        ...state,
        loading: true,
      };

    case "REGISTER_GOOGLE_SUCCESS":
      return {
        loading: false,
        success: true,
        user: action.payload.user,
        apiKey: action.payload.apiKey,
        token: action.payload.token,
      };

    case "REGISTER_GOOGLE_FAILED":
      return {
        loading: false,
        error: action.error,
      };

    case "REGISTER_GOOGLE_LEAVE":
      return {};

    default:
      return { ...state };
  }
};

export const requestOtpEmailReducer = (state = {}, action) => {
  switch (action.type) {
    case "REQUEST_OTP_EMAIL_REQUEST":
      return {
        ...state,
        loading: true,
      };

    case "REQUEST_OTP_EMAIL_SUCCESS":
      return {
        loading: false,
        success: action.payload,
      };

    case "REQUEST_OTP_EMAIL_FAILED":
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
    case "VERIFY_OTP_REQUEST":
      return {
        ...state,
        loading: true,
      };

    case "VERIFY_OTP_SUCCESS":
      return {
        loading: false,
        success: true,
        message: action.payload,
      };

    case "VERIFY_OTP_FAILED":
      return {
        loading: false,
        error: action.error,
      };

    default:
      return { ...state };
  }
};
