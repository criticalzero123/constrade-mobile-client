export const getUserByIdReducer = (state = {}, action) => {
  switch (action.type) {
    case "GET_USER_BY_ID_REQUEST":
      return {
        ...state,
        loading: true,
      };

    case "GET_USER_BY_ID_SUCCESS":
      return {
        success: true,
        data: action.payload,
        loading: false,
      };

    case "GET_USER_BY_ID_FAILED":
      return {
        error: action.error,
        loading: false,
      };

    case "GET_USER_BY_ID_LEAVE":
      return {};

    default:
      return state;
  }
};

export const userInfoReducer = (state = {}, action) => {
  switch (action.type) {
    case "USER_INFO":
      return {
        ...state,
        user: action.payload,
      };

    case "USER_INFO_CLEAR":
      return {};

    default:
      return { ...state };
  }
};

export const userReportReducer = (state = {}, action) => {
  switch (action.type) {
    case "REPORT_USER_REQUEST":
      return {
        ...state,
        loading: true,
      };

    case "REPORT_USER_SUCCESS":
      return {
        success: true,
        data: action.payload,
        loading: false,
      };

    case "REPORT_USER_FAILED":
      return {
        error: action.error,
        loading: false,
      };

    case "REPORT_USER_LEAVE":
      return {};

    default:
      return state;
  }
};
