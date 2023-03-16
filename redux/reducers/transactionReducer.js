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

export const getProductTransactionReducer = (state = {}, action) => {
  switch (action.type) {
    case "GET_PRODUCT_TRANSACTION_REQUEST":
      return {
        ...state,
        loading: true,
      };

    case "GET_PRODUCT_TRANSACTION_SUCCESS":
      return {
        loading: false,
        data: action.payload,
      };

    case "GET_PRODUCT_TRANSACTION_FAILED":
      return {
        loading: false,
        error: action.error,
      };

    case "GET_PRODUCT_TRANSACTION_LEAVE":
      return {};

    default:
      return { ...state };
  }
};
