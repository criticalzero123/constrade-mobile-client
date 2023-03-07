import api from "../../service/api";

export default function useReport() {
  const reportById = async (userId, id, reportType) => {
    try {
      const info = {
        reportedBy: userId,
        idReported: id,
        reportType: reportType,
        description: "Something dummy coming from function",
        dateSubmitted: new Date(),
      };

      const res = await api.setAuthHeaders().post("/api/report", info);

      if (res.data.responseData) alert("Reported");
    } catch (error) {
      alert(error);
    }
  };

  return { reportById };
}
