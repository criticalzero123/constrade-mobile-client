export const getTimeOnly = (date) => {
  return new Date(date).toLocaleTimeString([], {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
};
