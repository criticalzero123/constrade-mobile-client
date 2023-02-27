export const updatePersonInfoReducer = (state = {}, action) => {
  switch (action.type) {
    case "UPDATE_USER_INFO_REQUEST":
      return {
        ...state,
        loading: true,
      };

    case "UPDATE_USER_INFO_SUCCESS":
      return {
        success: true,
        data: action.payload,
        loading: false,
      };

    case "UPDATE_USER_INFO_FAILED":
      return {
        error: true,
        loading: false,
      };

    case "UPDATE_USER_INFO_LEAVE":
      return {};

    default:
      return state;
  }
};

export const getAllUsersReducer = (state = {}, action) => {
  switch (action.type) {
    case "GET_ALL_USERS_REQUEST":
      return {
        ...state,
        loading: true,
      };

    case "GET_ALL_USERS_SUCCESS":
      return {
        data: action.payload,
        loading: false,
      };

    case "GET_ALL_USERS_FAILED":
      return {
        error: action.error,
        loading: false,
      };

    case "GET_ALL_USERS_LEAVE":
      return {};

    default:
      return state;
  }
};

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
