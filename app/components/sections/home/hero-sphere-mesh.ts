/** Precomputed plexus mesh — rounded coords avoid SSR/client float drift. */
function roundCoord(n: number) {
  return Math.round(n * 100) / 100;
}

const CX = 200;
const CY = 205;

function buildSphereMesh() {
  const dots: { x: number; y: number }[] = [];
  const lines: [number, number][] = [];

  const rings = [
    { rx: 52, ry: 48, count: 10, phase: 0 },
    { rx: 88, ry: 82, count: 14, phase: 0.22 },
    { rx: 124, ry: 116, count: 18, phase: 0.11 },
    { rx: 158, ry: 148, count: 22, phase: 0.05 },
  ];

  const ringDots: number[][] = [];

  rings.forEach((ring) => {
    const indices: number[] = [];
    for (let i = 0; i < ring.count; i++) {
      const a = (i / ring.count) * Math.PI * 2 + ring.phase;
      const x = roundCoord(CX + Math.cos(a) * ring.rx);
      const y = roundCoord(CY + Math.sin(a) * ring.ry);
      const idx = dots.length;
      dots.push({ x, y });
      indices.push(idx);

      if (i > 0) lines.push([indices[i - 1], idx]);
    }
    if (indices.length > 1) lines.push([indices[indices.length - 1], indices[0]]);
    ringDots.push(indices);
  });

  ringDots.forEach((indices, ri) => {
    if (ri >= ringDots.length - 1) return;
    const next = ringDots[ri + 1];
    indices.forEach((from, i) => {
      const to = next[Math.floor((i / indices.length) * next.length) % next.length];
      lines.push([from, to]);
    });
  });

  for (let i = 0; i < dots.length; i++) {
    for (let j = i + 2; j < dots.length; j++) {
      const dx = dots[i].x - dots[j].x;
      const dy = dots[i].y - dots[j].y;
      const dist = Math.hypot(dx, dy);
      if (dist < 55 && (i + j) % 7 === 0) lines.push([i, j]);
    }
  }

  return { dots, lines };
}

export const SPHERE_MESH = buildSphereMesh();

export function roundSvgCoord(n: number) {
  return roundCoord(n);
}
