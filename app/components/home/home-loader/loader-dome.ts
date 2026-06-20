export type ArcDef = {
  p0: [number, number];
  c: [number, number];
  p1: [number, number];
};

export const VB_W = 1200;
export const VB_H = 900;
export const HORIZON_Y = 560;
export const APEX_X = 600;
export const APEX_Y = 102;
export const MESH_STRETCH_X = 1.28;

const LATITUDE_LEVELS = [0.14, 0.26, 0.38, 0.5, 0.62, 0.74, 0.86];
const MERIDIAN_SPREADS = [640, 520, 400, 290, 195, 115, 55, 20];

function arc(x0: number, y0: number, x1: number, y1: number, cx: number, cy: number): ArcDef {
  return { p0: [x0, y0], c: [cx, cy], p1: [x1, y1] };
}

const qb = (
  t: number,
  p0: [number, number],
  c: [number, number],
  p1: [number, number],
): [number, number] => {
  const u = 1 - t;
  return [
    u * u * p0[0] + 2 * u * t * c[0] + t * t * p1[0],
    u * u * p0[1] + 2 * u * t * c[1] + t * t * p1[1],
  ];
};

function meridian(spread: number): ArcDef {
  const controlY = 2 * APEX_Y - HORIZON_Y;
  return {
    p0: [APEX_X - spread, HORIZON_Y],
    c: [APEX_X, controlY],
    p1: [APEX_X + spread, HORIZON_Y],
  };
}

function pointOnArc(a: ArcDef, t: number): [number, number] {
  return qb(t, a.p0, a.c, a.p1);
}

function latitudeArcThrough(meridians: ArcDef[], t: number): ArcDef {
  const pts = meridians.map((m) => pointOnArc(m, t));
  const left = pts[0];
  const right = pts[pts.length - 1];
  const mid = pts[Math.floor(pts.length / 2)];
  const cy = Math.min(mid[1] - 6, APEX_Y + (mid[1] - APEX_Y) * 0.42);
  return arc(left[0], left[1], right[0], right[1], APEX_X, cy);
}

export function arcPath(a: ArcDef) {
  return `M ${a.p0[0]} ${a.p0[1]} Q ${a.c[0]} ${a.c[1]} ${a.p1[0]} ${a.p1[1]}`;
}

export type DomeNode = [number, number, number, number, number];

export type DomeMesh = {
  allArcs: ArcDef[];
  nodes: DomeNode[];
  topRimLines: [number, number, number, number][];
  meshTransform: string;
};

const TOP_RIM_ARCS: ArcDef[] = [
  arc(-20, 0, 1220, 0, APEX_X, 42),
  arc(-20, 0, 1220, 0, APEX_X, 78),
  arc(-40, 58, 1240, 58, APEX_X, 12),
];

const TOP_RIM_LINES: [number, number, number, number][] = [
  [0, 0, APEX_X, APEX_Y],
  [1200, 0, APEX_X, APEX_Y],
  [0, 0, 360, 175],
  [1200, 0, 840, 175],
];

const SIDE_ARCS: ArcDef[] = [
  arc(-20, 530, 700, 230, 260, 320),
  arc(1220, 530, 500, 230, 940, 320),
  arc(40, 460, 790, 200, 360, 275),
  arc(1160, 460, 410, 200, 840, 275),
];

export function buildDomeMesh(): DomeMesh {
  const meridians = MERIDIAN_SPREADS.map((s) => meridian(s));
  const latArcs = LATITUDE_LEVELS.map((t) => latitudeArcThrough(meridians, t));
  const allArcs = [...meridians, ...latArcs, ...TOP_RIM_ARCS, ...SIDE_ARCS];

  const nodes: DomeNode[] = [];
  let idx = 0;

  meridians.forEach((m, mi) => {
    LATITUDE_LEVELS.forEach((t, ti) => {
      const sparse = mi % 2 === 0 && ti % 2 === 0;
      const topHighlight =
        t <= 0.28 && (mi === 0 || mi === meridians.length - 1 || mi % 3 === 0);
      if (!sparse && !topHighlight) return;

      const [x, y] = pointOnArc(m, t);
      if (y > HORIZON_Y - 12) return;

      const depth = 1 - t;
      const edgeFade = 1 - Math.abs(mi / (meridians.length - 1) - 0.5) * 0.22;
      const r = (0.65 + depth * 0.85) * edgeFade;
      const bright = 0.4 + depth * 0.5;
      nodes.push([x, y, r, idx++, bright]);
    });
  });

  nodes.push([APEX_X, APEX_Y, 2, idx++, 1]);
  [[0, 0], [1200, 0], [600, 0]].forEach(([x, y]) => {
    nodes.push([x, y, 1.5, idx++, 0.95]);
  });

  return {
    allArcs,
    nodes,
    topRimLines: TOP_RIM_LINES,
    meshTransform: `translate(${APEX_X} 0) scale(${MESH_STRETCH_X} 1) translate(${-APEX_X} 0)`,
  };
}

/** Precomputed once — mesh geometry is static */
export const DOME_MESH = buildDomeMesh();
