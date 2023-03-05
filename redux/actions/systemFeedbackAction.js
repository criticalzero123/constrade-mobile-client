import api from "../../service/api";

export const submitSystemFeedback = async (info) => {
  console.log(info);
  try {
    const res = await api
      .setAuthHeaders()
      .post("/api/systemfeedback/submit", info);
  
    alert(res.data.responseData);
  } catch (error) {
    console.log(error);
  }
};
