import { junctionPoint } from "./story-ribbon";

type Point = ReturnType<typeof junctionPoint>;

function along(start: Point, end: Point, distance: number): Point {
  const dx = end[0] - start[0];
  const dy = end[1] - start[1];
  const dz = end[2] - start[2];
  const fraction = distance / Math.hypot(dx, dy, dz);
  return [start[0] + dx * fraction, start[1] + dy * fraction, start[2] + dz * fraction];
}

const frontRim = Array.from({ length: 10 }, (_, index) => junctionPoint(index, true));
const innerRim = frontRim.map(([x, y, z]): Point => [x * 0.86, y * 0.86 + 0.42 * 0.14, z + 0.17]);
const rearBraces = [[1, 16], [3, 17], [4, 18], [6, 17], [7, 18], [9, 19]] as const;
const joints = [[0, 1], [0, 9], [2, 3], [2, 11], [3, 12], [4, 5], [5, 6], [6, 10], [7, 12], [8, 7], [8, 10], [12, 14], [12, 13]] as const;

export const protectionDetails = [
  ...innerRim.map((start, index) => ({
    start, end: innerRim[(index + 1) % innerRim.length], radius: 0.010, finish: "rim",
  } as const)),
  ...frontRim.map((start, index) => ({ start, end: innerRim[index], radius: 0.007, finish: "brace" } as const)),
  ...rearBraces.map(([front, rear]) => ({
    start: junctionPoint(front, true), end: junctionPoint(rear, true), radius: 0.008, finish: "brace",
  } as const)),
  ...joints.map(([from, to]) => {
    const start = junctionPoint(from, true);
    const end = junctionPoint(to, true);
    return { start: along(start, end, 0.047), end: along(start, end, 0.14), radius: 0.034, finish: "collar" } as const;
  }),
];
