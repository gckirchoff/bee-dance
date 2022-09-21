import type { Vector } from '../draw/agents/Vector';

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

export const toRadians = (degrees: number): number => (degrees * Math.PI) / 180;

export const toDegrees = (rads: number): number => (rads * 180) / Math.PI;

export const randomRange = (min: number, max: number): number =>
  Math.random() * (max - min) + min;

export const scale = ({
  num,
  inRange,
  outRange,
}: {
  num: number;
  inRange: [number, number];
  outRange: [number, number];
}) => {
  const [inMin, inMax] = inRange;
  const [outMin, outMax] = outRange;
  return ((num - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
};

export const average = (arr: number[]): number => {
  const arrLength = arr.length;
  let sum = 0;
  for (let num of arr) {
    sum += num;
  }
  return sum / arrLength;
};

export const findAngle = (A: Vector, B: Vector, C: Vector) => {
  var AB = Math.sqrt(Math.pow(B.x - A.x, 2) + Math.pow(B.y - A.y, 2));
  var BC = Math.sqrt(Math.pow(B.x - C.x, 2) + Math.pow(B.y - C.y, 2));
  var AC = Math.sqrt(Math.pow(C.x - A.x, 2) + Math.pow(C.y - A.y, 2));
  return Math.acos((BC * BC + AB * AB - AC * AC) / (2 * BC * AB));
};

const findLine = (pointA: Vector, pointB: Vector): { m: number; b: number } => {
  const m = (pointB.y - pointA.y) / (pointB.x - pointA.x);
  const b = pointA.y - m * pointA.x;
  return { m, b };
};

const crossesLine = (point: Vector, line: { m: number; b: number }): boolean => {
  const { m, b } = line;
  const yHat = m * point.x + b;
  return m < 0 ? point.y > yHat : point.y < yHat;
};

export const getDanceAngle = (
  flowerPosition: Vector,
  hivePosition: Vector,
  sunPosition: Vector
): number => {
  const angle = findAngle(flowerPosition, hivePosition, sunPosition);
  const line = findLine(flowerPosition, hivePosition);
  const flip = crossesLine(sunPosition, line) ? -1 : 1;
  return angle * flip;
};
