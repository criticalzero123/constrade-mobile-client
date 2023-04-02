import api from "../../service/api";

export const addProduct = async (productDetails, imageList) => {
  try {
    const data = {
      product: productDetails,
      imageUrlList: imageList,
    };
    const res = await api.setAuthHeaders().post(`/api/products`, data);

    return res.data.responseData;
  } catch (error) {
    console.error(error);
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

export const addFavorite = async (info) => {
  try {
    const res = await api.post(`/api/products/favorite`, info);

    return res.data.responseData;
  } catch (error) {
    console.error(error);
    alert("Something Went Wrong");
    return;
  }
};

export const deleteFavorite = async (favoriteId) => {
  try {
    const res = await api.delete(`/api/products/favorite/${favoriteId}`);

    return res.data.responseData;
  } catch (error) {
    console.log(error);
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

export const reportProduct = (info) => async (dispatch) => {
  dispatch({ type: "REPORT_PRODUCT_REQUEST" });

  try {
    const result = await api.setAuthHeaders().post(`api/products/report`, info);

    dispatch({
      type: "REPORT_PRODUCT_SUCCESS",
      payload: result.data.responseData,
    });
  } catch (err) {
    dispatch({ type: "REPORT_PRODUCT_FAILED", error: err });
  }
};

export const getProductBoost = async (id) => {
  try {
    const result = await api.setAuthHeaders().get(`api/products/boost/${id}`);

    return result.data.responseData;
  } catch (err) {
    console.log(err);
  }
};

export const addProductBoost = async (id, days, userId) => {
  try {
    const result = await api
      .setAuthHeaders()
      .post(`api/products/boost/${id}?days=${days}&userId=${userId}`);

    if (result.data.responseData) {
      alert("Boosted");
    } else {
      alert("Something Went wrong in boosting");
    }
  } catch (err) {
    console.error(err);
  }
};

export const cancelProductBoost = async (id) => {
  try {
    const result = await api
      .setAuthHeaders()
      .put(`api/products/boost/${id}/cancel`);

    if (result.data.responseData) {
      alert("cancel");
    } else {
      alert("Something Went wrong in cancelling the boost");
    }
  } catch (err) {
    console.error(err);
  }
};
