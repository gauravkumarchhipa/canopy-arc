/** Every pose uses the same strand and length coordinates, from stock to finished canopy. */
export const strandCount = 24;
const pi = Math.PI;

export const storyCamera = [
  { azimuth: -0.16, elevation: 0.07, distance: 8.1, lift: 0.02, slide: 0.04, floor: -1.60 },
  { azimuth: -0.43, elevation: 0.13, distance: 9.5, lift: 0.11, slide: 0.17, floor: -1.31 },
  { azimuth: -0.20, elevation: 0.17, distance: 9.2, lift: -0.02, slide: 0.06, floor: -1.38 },
  { azimuth: 0.21, elevation: 0.14, distance: 8.2, lift: 0.03, slide: -0.13, floor: -1.37 },
  { azimuth: 0.49, elevation: 0.13, distance: 8.9, lift: 0.05, slide: -0.11, floor: -1.44 },
  { azimuth: 0.35, elevation: 0.20, distance: 10.15, lift: 0.02, slide: 0.10, floor: -1.36 },
] as const;

type MarkPoint = readonly [number, number];
type MarkRail = readonly [MarkPoint, MarkPoint, MarkPoint?];

const markHalf: readonly MarkRail[] = [
  [[4, 75], [31, 30], [15, 49]],
  [[31, 30], [96, 3], [62, 12]],
  [[4, 75], [45, 69], [24, 67]],
  [[45, 69], [96, 147], [88, 80]],
  [[31, 30], [45, 69]],
  [[31, 30], [96, 57]],
  [[45, 69], [96, 3]],
  [[45, 69], [96, 57], [69, 56]],
  [[45, 69], [96, 105], [74, 77]],
  [[4, 75], [31, 30]],
  [[31, 30], [96, 3], [62, 12]],
];
const markSpine: MarkRail = [[96, 3], [96, 106]];

function markPoint(strand: number, t: number): [number, number, number] {
  const spine = strand >= markHalf.length * 2;
  const rail = Math.floor(strand / 2);
  const [a, b, control] = spine ? markSpine : markHalf[rail];
  const side = strand % 2 === 0 ? 1 : -1;
  const s = 1 - t;
  const x = control ? s * s * a[0] + 2 * s * t * control[0] + t * t * b[0] : s * a[0] + t * b[0];
  const y = control ? s * s * a[1] + 2 * s * t * control[1] + t * t * b[1] : s * a[1] + t * b[1];
  const across = (x - 96) * 0.020;
  const up = (71 - y) * 0.020;
  const back = spine ? strand % 2 !== 0 : rail >= 9;
  const depth = 0.26 * (1 - (across / 1.84) ** 2) - up * 0.10 - (back ? 0.16 : 0);
  return [across * side, up, depth];
}

export const protectionShield = {
  center: [0.44, 0.16, 0.82],
  scale: [3.48, 2.60],
  yaw: 0.49,
} as const;

// Quadratic segments around the shield, represented by their start, control and end points.
const shieldCurves = [
  [[0, 0.61], [0.22, 0.43], [0.50, 0.40]],
  [[0.50, 0.40], [0.49, 0.14], [0.46, -0.05]],
  [[0.46, -0.05], [0.38, -0.49], [0, -0.66]],
  [[0, -0.66], [-0.38, -0.49], [-0.46, -0.05]],
  [[-0.46, -0.05], [-0.49, 0.14], [-0.50, 0.40]],
  [[-0.50, 0.40], [-0.22, 0.43], [0, 0.61]],
] as const;

export const shieldOutline = shieldCurves.flatMap(([start, control, end]) =>
  Array.from({ length: 12 }, (_, index): [number, number] => {
    const t = index / 12;
    const s = 1 - t;
    return [
      s * s * start[0] + 2 * s * t * control[0] + t * t * end[0],
      s * s * start[1] + 2 * s * t * control[1] + t * t * end[1],
    ];
  }));

const networkRows = [
  [-1.78, -0.13, 0.06], [-1.31, 0.61, 0.25], [-0.80, 1.00, -0.17], [0.04, 1.05, -0.40],
  [0.81, 0.86, -0.29], [1.52, 0.42, 0.06], [1.81, -0.16, 0.17], [1.21, -0.64, 0.07],
  [0.54, -0.99, -0.34], [-0.24, -0.79, -0.56], [-0.94, -0.55, -0.37], [-1.36, -0.45, 0.19],
  [-0.93, 0.02, 0.79], [-0.31, 0.45, 0.88], [0.37, 0.61, 0.68], [0.99, 0.15, 0.71],
  [0.60, -0.35, 0.79], [-0.07, -0.43, 0.66], [-0.57, 0.32, -0.78], [0.55, 0.31, -0.81],
] as const;
const routes = [
  [0, 1, 2, 3], [3, 4, 5, 6], [6, 7, 8, 9], [9, 10, 11, 0],
  [0, 12, 13, 2], [1, 12, 17, 10], [2, 13, 14, 4], [3, 14, 15, 5],
  [5, 15, 16, 7], [6, 15, 14, 3], [7, 16, 17, 9], [8, 16, 14, 4],
  [9, 17, 13, 1], [10, 17, 12, 0], [11, 12, 13, 3], [12, 17, 16, 15],
  [13, 17, 8, 7], [14, 16, 7, 6], [0, 18, 2, 4], [3, 18, 10, 9],
  [4, 19, 8, 9], [6, 19, 18, 11], [2, 18, 19, 5], [11, 18, 13, 15],
] as const;
export const junctionRoutes = routes;

export function junctionPoint(index: number, protectedScale = 0): [number, number, number] {
  const [x, y, z] = networkRows[index];
  return [x * (1 - 0.31 * protectedScale), y * (1 - 0.27 * protectedScale), z * (1 - 0.22 * protectedScale)];
}

export const storyInterfaces = [
  { x: 1.57, y: 0.12, z: -0.62, width: 1.52, height: 0.99, angle: -0.12 },
  { x: -1.47, y: -0.39, z: -0.45, width: 1.46, height: 0.95, angle: -0.04 },
  { x: 0.70, y: 0.22, z: 0.02, width: 1.90, height: 1.24, angle: 0.04 },
  { x: -0.31, y: -0.04, z: 0.58, width: 2.27, height: 1.48, angle: 0.12 },
] as const;

export const interfaceTilt = 0.075;
export const interfaceChart = [
  [0.09, -0.32], [0.09, -0.16], [0.19, 0.02], [0.25, -0.09],
  [0.33, 0.10], [0.42, -0.06], [0.42, -0.32],
] as const;
export const interfaceChartSurface = { x: 0.255, y: -0.10, width: 0.38, height: 0.49, color: "#4b514a", opacity: 0.68 } as const;
export const interfaceLines = [
  { x: -0.24, y: 0.18, width: 0.34, height: 0.024, color: "#eee5d3" },
  { x: -0.29, y: 0.035, width: 0.24, height: 0.015, color: "#eee5d3" },
  { x: -0.24, y: -0.11, width: 0.34, height: 0.015, color: "#dac094" },
  { x: -0.29, y: -0.25, width: 0.24, height: 0.015, color: "#eee5d3" },
  { x: -0.21, y: -0.38, width: 0.30, height: 0.013, color: "#d4af73" },
] as const;
export const interfaceDots = [-0.40, -0.33, -0.26] as const;
export const interfaceHighlight = [[-0.46, 0.34], [-0.42, 0.45], [0.18, 0.45], [-0.13, -0.39], [-0.46, -0.39]] as const;
export const interfaceSurface = { color: "#858173", opacity: 0.51 } as const;

export function interfacePoint(panel: typeof storyInterfaces[number], x: number, y: number): [number, number, number] {
  const across = x * panel.width * Math.cos(panel.angle);
  const up = y * panel.height;
  return [
    panel.x + across * Math.cos(interfaceTilt) - up * Math.sin(interfaceTilt),
    panel.y + across * Math.sin(interfaceTilt) + up * Math.cos(interfaceTilt),
    panel.z - x * panel.width * Math.sin(panel.angle),
  ];
}

export function isGlass(strand: number) {
  return strand === 6 || strand === 16 || strand === 17;
}

export function strandPoint(pose: number, strand: number, t: number): [number, number, number] {
  const lane = strand / (strandCount - 1) - 0.5;
  const along = t * 2 - 1;
  const arch = Math.sin(pi * t);

  switch (pose) {
    case 0:
      return markPoint(strand, t);
    case 1:
      // A standing-seam vault with a shallow entrance and a high, swept rear span.
      return [
        along * (2.53 + lane * 0.37) + lane * 0.49,
        -1.25 + arch * (2.30 + lane * 1.13 + 0.34 * along)
          + Math.sin(t * pi * 2) * arch * (0.94 + lane * 0.24) + lane * 0.08,
        lane * 2.88 + arch * (0.40 * along + lane * 0.2),
      ];
    case 2: {
      const panel = storyInterfaces[strand % storyInterfaces.length];
      const rim = Math.floor(strand / storyInterfaces.length);
      const angle = (t + rim * 0.25) * 2 * pi;
      const x = Math.cos(angle);
      const y = Math.sin(angle);
      const radius = (0.499 - rim * 0.009) / (x ** 16 + y ** 16) ** (1 / 16);
      const point = interfacePoint(panel, radius * x, radius * y);
      point[2] += 0.022 + rim * 0.007;
      return point;
    }
    case 3:
    case 4: {
      const path = routes[strand];
      const segment = Math.min(2, Math.floor(t * 3));
      const blend = t * 3 - segment;
      const a = junctionPoint(path[segment], pose === 4 ? 1 : 0);
      const b = junctionPoint(path[segment + 1], pose === 4 ? 1 : 0);
      const offset = Math.sin(blend * Math.PI) * (strand % 5 - 2) * 0.011;
      return [
        a[0] + (b[0] - a[0]) * blend,
        a[1] + (b[1] - a[1]) * blend,
        a[2] + (b[2] - a[2]) * blend + offset,
      ];
    }
    default:
      return [
        along * (2.58 + 0.33 * lane) + lane * 0.82 + arch * lane * 0.37,
        -1.27 + arch * (2.84 + 0.96 * lane + 0.41 * along) + lane * 0.12,
        lane * 3.15 + arch * (0.61 * along - 0.24 * lane),
      ];
  }
}
