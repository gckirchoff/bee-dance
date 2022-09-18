enum Meridiem {
  AM = 'AM',
  PM = 'PM',
}

export const minsToTime = (mins: number): string => {
  const hours = mins / 60;
  const minutes = mins % 60;
  const formattedHours = formatHours(hours);
  const formattedMinutes = cleanUpTimeString(minutes);
  const meridiem = getMeridiem(hours);

  return `${formattedHours}:${formattedMinutes} ${meridiem}`;
};

const formatHours = (hours: number): string => {
  const timeHour = hours > 13 ? hours - 12 : hours;
  return cleanUpTimeString(timeHour);
};

const cleanUpTimeString = (time: number): string =>
  Math.trunc(time).toString().padStart(2, '0');

const getMeridiem = (hours: number): Meridiem =>
  hours >= 12 ? Meridiem.PM : Meridiem.AM;
