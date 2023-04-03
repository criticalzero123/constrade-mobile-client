import api from "../../service/api";

export const getNotificationUser = async (userId) => {
  try {
    const res = await api.get(`/api/notification/${userId}`);

    return res.data.responseData;
  } catch (error) {
    console.log(error);
  }
};
