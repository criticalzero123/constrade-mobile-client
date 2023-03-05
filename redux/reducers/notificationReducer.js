export const getNotificationUserReducer = (state = {}, action) => {
  switch (action.type) {
    case "GET_NOTIFICATION_BY_USER_REQUEST":
      return { ...state, loading: true };
    case "GET_NOTIFICATION_BY_USER_SUCCESS":
      return { loading: false, data: action.payload };
    case "GET_NOTIFICATION_BY_USER_FAILED":
      return { loading: false, error: action.error };
    case "GET_NOTIFICATION_BY_USER_LEAVE":
      return {};
    default:
      return { ...state };
  }
};
