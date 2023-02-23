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
