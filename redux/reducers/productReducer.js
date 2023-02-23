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
        success: true,
        product: action.payload,
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
