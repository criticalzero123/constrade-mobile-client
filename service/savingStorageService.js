import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeApiKeyAndToken = async (apiKey, token) => {
  try {
    const first = ["apiKey", apiKey];
    const second = ["token", token];

    await AsyncStorage.multiSet([first, second]);
  } catch (e) {
    console.log(e);
  }
};

export const getApiKey = async () => {
  try {
    const value = await AsyncStorage.getItem("apiKey");
    if (value !== null) return value;

    return null;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const getToken = async () => {
  try {
    const value = await AsyncStorage.getItem("token");
    if (value !== null) return value;

    return null;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const clearAllAsyncStorage = async () => {
  try {
    await AsyncStorage.clear();
  } catch (e) {
    console.log(e);
  }
};
