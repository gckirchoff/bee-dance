export const minsToTime = (mins: number): string => {
  const hours = mins / 60;
  const minutes = mins % 60;
  const formattedHours = formatHours(hours);
  const formattedMinutes = formatMinutes(minutes);
  const time = `${formattedHours}:${formattedMinutes}`;
  return time;
};

const formatHours = (hours: number): string => {
  const timeHour = hours > 13 ? hours - 12 : hours;
  return Math.trunc(timeHour).toString().padStart(2, '0');
};

const formatMinutes = (minutes: number): string =>
  Math.trunc(minutes).toString().padStart(2, '0');
