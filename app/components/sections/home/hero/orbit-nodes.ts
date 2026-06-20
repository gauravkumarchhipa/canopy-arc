import type { EcosystemNode } from "./ecosystem-types";

const ORBIT_POSITIONS: Record<string, { x: number; y: number }> = {
  ai: { x: 0.5, y: 0.06 },
  cloud: { x: 0.82, y: 0.18 },
  data: { x: 0.94, y: 0.48 },
  ux: { x: 0.82, y: 0.78 },
  ecom: { x: 0.5, y: 0.92 },
  cyber: { x: 0.18, y: 0.78 },
  mobile: { x: 0.06, y: 0.48 },
  web: { x: 0.18, y: 0.18 },
};

export function buildOrbitNodes(
  labels: ReadonlyArray<{ id: string; label: string }>,
): EcosystemNode[] {
  return labels.map((n) => ({
    id: n.id,
    label: n.label,
    x: ORBIT_POSITIONS[n.id]?.x ?? 0.5,
    y: ORBIT_POSITIONS[n.id]?.y ?? 0.5,
  }));
}
