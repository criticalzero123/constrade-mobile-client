export const getMessagesByUserIdsReducer = (state = {}, action) => {
  switch (action.type) {
    case "GET_MESSAGES_BY_USER_IDS_REQUEST":
      return {
        ...state,
        loading: true,
      };

    case "GET_MESSAGES_BY_USER_IDS_SUCCESS":
      return {
        loading: false,
        data: action.payload,
      };

    case "GET_MESSAGES_BY_USER_IDS_FAILED":
      return {
        loading: false,
        error: action.error,
      };

    case "GET_MESSAGES_BY_USER_IDS_LEAVE":
      return {};

    default:
      return { ...state };
  }
};

export const getChatByUserIdReducer = (state = {}, action) => {
  switch (action.type) {
    case "GET_CHAT_BY_USER_ID_REQUEST":
      return {
        ...state,
        loading: true,
      };

    case "GET_CHAT_BY_USER_ID_SUCCESS":
      return {
        loading: false,
        data: action.payload,
      };

    case "GET_CHAT_BY_USER_ID_FAILED":
      return {
        loading: false,
        error: action.error,
      };

    case "GET_CHAT_BY_USER_ID_LEAVE":
      return {};

    default:
      return { ...state };
  }
};
