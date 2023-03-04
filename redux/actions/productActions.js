import api from "../../service/api";

export const addProduct = (productDetails, imageList) => async (dispatch) => {
  dispatch({ type: "PRODUCT_ADD_REQUEST" });
  try {
    const data = {
      product: productDetails,
      imageUrlList: imageList,
    };
    const res = await api.setAuthHeaders().post(`/api/products`, data);

    dispatch({
      type: "PRODUCT_ADD_SUCCESS",
      payload: res.data.responseData,
    });
  } catch (error) {
    dispatch({ type: "PRODUCT_ADD_FAILED", error: error });
  }
};

export const getProductByUser = (userId) => async (dispatch) => {
  dispatch({ type: "GET_PRODUCT_BY_USER_REQUEST" });
  try {
    const res = await api.setAuthHeaders().get(`/api/products/user/${userId}`);

    dispatch({
      type: "GET_PRODUCT_BY_USER_SUCCESS",
      payload: res.data.responseData,
    });
  } catch (error) {
    dispatch({ type: "GET_PRODUCT_BY_USER_FAILED", error: error });
  }
};

export const getAllProducts = () => async (dispatch) => {
  dispatch({ type: "GET_ALL_PRODUCTS_REQUEST" });
  try {
    const res = await api.setAuthHeaders().get(`/api/products/`);

    dispatch({
      type: "GET_ALL_PRODUCTS_SUCCESS",
      payload: res.data.responseData,
    });
  } catch (error) {
    dispatch({ type: "GET_ALL_PRODUCTS_FAILED", error: error });
  }
};

export const getProductById = (productId, userId) => async (dispatch) => {
  dispatch({ type: "GET_PRODUCT_BY_ID_REQUEST" });
  try {
    const res = await api
      .setAuthHeaders()
      .get(`/api/products/${productId}?uid=${userId}`);

    dispatch({
      type: "GET_PRODUCT_BY_ID_SUCCESS",
      payload: res.data.responseData,
    });
  } catch (error) {
    dispatch({ type: "GET_PRODUCT_BY_ID_FAILED", error: error });
  }
};

export const deleteProductById = (productId) => async (dispatch) => {
  dispatch({ type: "DELETE_PRODUCT_BY_ID_REQUEST" });

  try {
    const res = await api.delete(`/api/products/${productId}`);

    dispatch({
      type: "DELETE_PRODUCT_BY_ID_SUCCESS",
      payload: res.data.responseData,
    });
  } catch (error) {
    dispatch({ type: "DELETE_PRODUCT_BY_ID_FAILED", error: error });
  }
};

export const addFavorite = (info) => async (dispatch) => {
  dispatch({ type: "ADD_FAVORITE_REQUEST" });

  try {
    const res = await api.post(`/api/products/favorite`, info);

    dispatch({
      type: "ADD_FAVORITE_SUCCESS",
      payload: res.data.responseData,
    });
  } catch (error) {
    dispatch({ type: "ADD_FAVORITE_FAILED", error: error });
  }
};

export const deleteFavorite = (favoriteId) => async (dispatch) => {
  dispatch({ type: "DELETE_FAVORITE_REQUEST" });

  try {
    const res = await api.delete(`/api/products/favorite/${favoriteId}`);

    dispatch({
      type: "DELETE_FAVORITE_SUCCESS",
      payload: res.data.responseData,
    });
  } catch (error) {
    dispatch({ type: "DELETE_FAVORITE_FAILED", error: error });
  }
};

export const getFavoriteByUserId = (userId) => async (dispatch) => {
  dispatch({ type: "GET_FAVORITE_REQUEST" });

  try {
    const res = await api.get(`/api/products/favorite/${userId}`);

    dispatch({
      type: "GET_FAVORITE_SUCCESS",
      payload: res.data.responseData,
    });
  } catch (error) {
    dispatch({ type: "GET_FAVORITE_FAILED", error: error });
  }
};
