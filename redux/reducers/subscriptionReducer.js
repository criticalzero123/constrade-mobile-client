export const subscribeUserReducer = (state = {}, action) => {
  switch (action.type) {
    case "SUBSCRIBE_USER_REQUEST":
      return {
        ...state,
        loading: true,
      };

    case "SUBSCRIBE_USER_SUCCESS":
      return {
        loading: false,
        data: action.payload,
      };

    case "SUBSCRIBE_USER_FAILED":
      return {
        loading: false,
        error: action.error,
      };

    case "SUBSCRIBE_USER_LEAVE":
      return {};

    default:
      return { ...state };
  }
};

export const getSubscriptionHistoryReducer = (state = {}, action) => {
  switch (action.type) {
    case "GET_SUBSCRIPTION_HISTORY_REQUEST":
      return {
        ...state,
        loading: true,
      };

    case "GET_SUBSCRIPTION_HISTORY_SUCCESS":
      return {
        loading: false,
        data: action.payload,
      };

    case "GET_SUBSCRIPTION_HISTORY_FAILED":
      return {
        loading: false,
        error: action.error,
      };

    case "GET_SUBSCRIPTION_HISTORY_LEAVE":
      return {};

    default:
      return { ...state };
  }
};
