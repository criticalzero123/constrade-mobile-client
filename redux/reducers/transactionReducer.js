export const soldProductReducer = (state = {}, action) => {
  switch (action.type) {
    case "SOLD_PRODUCT_REQUEST":
      return {
        ...state,
        loading: true,
      };

    case "SOLD_PRODUCT_SUCCESS":
      return {
        loading: false,
        data: action.payload,
      };

    case "SOLD_PRODUCT_FAILED":
      return {
        loading: false,
        error: action.error,
      };

    case "SOLD_PRODUCT_LEAVE":
      return {};

    default:
      return { ...state };
  }
};
