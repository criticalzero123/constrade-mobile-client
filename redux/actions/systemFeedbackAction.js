import api from "../../service/api";

export const submitSystemFeedback = async (info) => {
  try {
    const res = await api
      .setAuthHeaders()
      .post("/api/systemfeedback/submit", info);

    if (res.data.responseData) {
      alert("Submitted. Thank you for your submission.");
    }
  } catch (error) {
    console.log(error);
  }
};
