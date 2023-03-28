import api from "../../service/api";
export const getPricesFromQuery = async (text) => {
  try {
    const res = await api
      .setAuthHeaders()
      .get(`/api/price/product?query=${text}`);

    return res.data.responseData;
  } catch (error) {
    console.error(error);
  }
};
