export const validateEmail = (value: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
};

export const formatDate = (date: string) => {
  return new Date(date).toLocaleString().split(",")[0];
};

export const resolutionDateHandler = (severity: string) => {
  const currDate = new Date();

  const localDate = new Date(currDate.toISOString());

  if (severity === "Low") {
    localDate.setDate(localDate.getDate() + 5);
  } else if (severity === "Medium") {
    localDate.setDate(localDate.getDate() + 3);
  } else if (severity === "High") {
    localDate.setDate(localDate.getDate() + 1);
  }

  return localDate.toISOString();
};
