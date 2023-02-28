export const getTimeOnly = (date) => {
  return new Date(date).toLocaleTimeString([], {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
};

export const getDateTime = (date) => {
  return new Date(date).toLocaleString([], {
    month: "short",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
    year: "2-digit",
  });
};
