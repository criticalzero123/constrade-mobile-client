export const addProductReducer = (state = {}, action) => {
  switch (action.type) {
    case "PRODUCT_ADD_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "PRODUCT_ADD_SUCCESS":
      return {
        loading: false,
        data: action.payload,
      };
    case "PRODUCT_ADD_FAILED":
      return {
        loading: false,
        error: action.error,
      };

    default:
      return { ...state };
  }
};

export const getProductByUserReducer = (state = {}, action) => {
  switch (action.type) {
    case "GET_PRODUCT_BY_USER_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "GET_PRODUCT_BY_USER_SUCCESS":
      return {
        loading: false,
        data: action.payload,
      };
    case "GET_PRODUCT_BY_USER_FAILED":
      return {
        loading: false,
        error: action.error,
      };

    default:
      return { ...state };
  }
};
