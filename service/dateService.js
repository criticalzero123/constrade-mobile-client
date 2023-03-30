export const getTimeOnly = (date) => {
  return new Date(date).toLocaleTimeString([], {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
};

export const getDateFull = (date) => {
  return new Date(date).toLocaleString([], {
    day: "2-digit",
    month: "short",
    year: "numeric",
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
