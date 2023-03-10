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

export const getAllProductsReducer = (state = {}, action) => {
  switch (action.type) {
    case "GET_ALL_PRODUCTS_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "GET_ALL_PRODUCTS_SUCCESS":
      return {
        loading: false,
        data: action.payload,
      };
    case "GET_ALL_PRODUCTS_FAILED":
      return {
        loading: false,
        error: action.error,
      };

    default:
      return { ...state };
  }
};

export const getProductByIdReducer = (state = {}, action) => {
  switch (action.type) {
    case "GET_PRODUCT_BY_ID_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "GET_PRODUCT_BY_ID_SUCCESS":
      return {
        loading: false,
        data: action.payload,
      };
    case "GET_PRODUCT_BY_ID_FAILED":
      return {
        loading: false,
        error: action.error,
      };

    case "GET_PRODUCT_BY_ID_LEAVE":
      return {};

    default:
      return { ...state };
  }
};

export const addFavoriteReducer = (state = {}, action) => {
  switch (action.type) {
    case "ADD_FAVORITE_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "ADD_FAVORITE_SUCCESS":
      return {
        loading: false,
        data: action.payload,
      };
    case "ADD_FAVORITE_FAILED":
      return {
        loading: false,
        error: action.error,
      };

    case "ADD_FAVORITE_LEAVE":
      return {};

    default:
      return { ...state };
  }
};

export const deleteFavoriteReducer = (state = {}, action) => {
  switch (action.type) {
    case "DELETE_FAVORITE_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "DELETE_FAVORITE_SUCCESS":
      return {
        loading: false,
        data: action.payload,
      };
    case "DELETE_FAVORITE_FAILED":
      return {
        loading: false,
        error: action.error,
      };

    case "DELETE_FAVORITE_LEAVE":
      return {};

    default:
      return { ...state };
  }
};

export const getFavoriteByUserIdReducer = (state = {}, action) => {
  switch (action.type) {
    case "GET_FAVORITE_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "GET_FAVORITE_SUCCESS":
      return {
        loading: false,
        data: action.payload,
      };
    case "GET_FAVORITE_FAILED":
      return {
        loading: false,
        error: action.error,
      };

    case "GET_FAVORITE_LEAVE":
      return {};

    default:
      return { ...state };
  }
};

export const deleteProductByIdReducer = (state = {}, action) => {
  switch (action.type) {
    case "DELETE_PRODUCT_BY_ID_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "DELETE_PRODUCT_BY_ID_SUCCESS":
      return {
        loading: false,
        data: action.payload,
      };
    case "DELETE_PRODUCT_BY_ID_FAILED":
      return {
        loading: false,
        error: action.error,
      };

    case "DELETE_PRODUCT_BY_ID_LEAVE":
      return {};

    default:
      return { ...state };
  }
};

export const reportProductReducer = (state = {}, action) => {
  switch (action.type) {
    case "REPORT_PRODUCT_REQUEST":
      return {
        ...state,
        loading: true,
      };

    case "REPORT_PRODUCT_SUCCESS":
      return {
        success: true,
        data: action.payload,
        loading: false,
      };

    case "REPORT_PRODUCT_FAILED":
      return {
        error: action.error,
        loading: false,
      };

    case "REPORT_PRODUCT_LEAVE":
      return {};

    default:
      return state;
  }
};
