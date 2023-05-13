import axios from "axios";
import { API_URL } from "@env";
import { getApiKey, getToken } from "./savingStorageService";

const createApi = () => {
  const api = axios.create({
    baseURL: API_URL,
    // timeout: 10000,
  });

  //Authorized  actions
  const setAuthHeaders = async () => {
    const apiKey = await getApiKey();
    const token = await getToken();
    api.defaults.headers.common["ApiKey"] = apiKey;
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  };

  return {
    setAuthHeaders: () => {
      return {
        get: async (url, config) => {
          await setAuthHeaders();
          return api.get(url, config);
        },
        post: async (url, data, config) => {
          await setAuthHeaders();
          return api.post(url, data, config);
        },
        put: async (url, data, config) => {
          await setAuthHeaders();
          return api.put(url, data, config);
        },
        delete: async (url, config) => {
          await setAuthHeaders();
          return api.delete(url, config);
        },
      };
    },
    get: api.get,
    post: api.post,
    put: api.put,
    delete: api.delete,
  };
};

const api = createApi();

export default api;
