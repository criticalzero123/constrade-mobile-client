import api from "../../service/api";

export const getNotificationUser = async (userId) => {
  try {
    const res = await api.get(`/api/notification/${userId}`);

    return res.data.responseData;
  } catch (error) {
    console.log(error);
  }
};

export const getNotificationCount = async (userId) => {
  try {
    const res = await api.get(`/api/notification/count/${userId}`);

    return res.data.responseData;
  } catch (error) {
    console.log(error);
  }
};

export const markAsRead = async (id) => {
  try {
    const res = await api.put(`/api/notification/read?id=${id}`);

    return res.data.responseData;
  } catch (error) {
    console.log(error);
  }
};
