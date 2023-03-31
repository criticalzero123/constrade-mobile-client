import api from "../../service/api";

export const getSearchResult = async (search) => {
  try {
    const res = await api.setAuthHeaders().get(`/api/home?text=${search}`);

    return res.data.responseData;
  } catch (error) {
    console.error(error);
  }
};

export const getSearchCategory = async (tradeMethod) => {
  try {
    const res = await api
      .setAuthHeaders()
      .get(`/api/home/method?method=${tradeMethod}`);

    return res.data.responseData;
  } catch (error) {
    console.error(error);
  }
};
