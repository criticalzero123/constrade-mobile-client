import axios from "axios";
import { API_URL } from "@env";
import { getApiKey, getToken } from "./savingStorageService";

//this is for the authorized  actions
const createAuthApiInstance = async () => {
  const apiKey = await getApiKey();
  const token = await getToken();

  const api = axios.create({
    baseURL: API_URL,
    timeout: 5000,
    headers: {
      ApiKey: apiKey,
      Authorization: `Bearer ${token}`,
    },
  });

  return api;
};

//This is for not authorized or in signing in or loggingin
export const api = axios.create({
  baseURL: API_URL,
  timeout: 5000,
});

export default createAuthApiInstance;
