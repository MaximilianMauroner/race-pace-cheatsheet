export const constants = {
  kmToMile: 0.621371,
  marathonK: 42.195,
  halfMarathonK: 21.0975,
};

export const minToTime = (mins: number) => {
  const hours = Math.floor(mins / 60);
  const minutes = Math.floor(mins % 60);

  const seconds = Math.floor((mins * 60) % 60);
  let hourStr = hours.toString();
  let minStr = minutes.toString();
  let secStr = seconds.toString();
  if (hours < 10) hourStr = `0${hourStr}`;
  if (minutes < 10) minStr = `0${minStr}`;
  if (seconds < 10) secStr = `0${secStr}`;
  return `${hourStr}:${minStr}:${secStr}`;
};
export const formatNumber = (num: number) => {
  return num.toFixed(2);
};
