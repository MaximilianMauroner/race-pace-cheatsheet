export const constants = {
  kmInMile: 0.621371,
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
export const formatNumber = (num: number, isTime = false) => {
  if (isTime) {
    const minutes = Math.floor(num);
    const seconds = Math.round((num % 1) * 60);
    const minStr = minutes < 10 ? `0${minutes}` : minutes.toString();
    const secStr = seconds < 10 ? `0${seconds}` : seconds.toString();
    return `${minStr}:${secStr}`;
  }
  return num.toFixed(2);
};
