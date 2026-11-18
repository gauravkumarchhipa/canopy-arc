import type { CSSProperties } from "react";
import { PerspectiveCamera, Vector3 } from "three";
import { chapters } from "./story-chapters";
import { makeBrainMesh, storyCamera, storyPanels, strandPoint } from "./story-geometry";

const width = 900;
const height = 600;
type Point = { x: number; y: number };

function stroke(points: Point[], thickness: number) {
  const outline = (direction: number) => points.map((point, index) => {
    const previous = points[Math.max(index - 1, 0)];
    const next = points[Math.min(index + 1, points.length - 1)];
    const dx = next.x - previous.x;
    const dy = next.y - previous.y;
    const distance = Math.hypot(dx, dy) || 1;
    const x = point.x - dy / distance * thickness * direction;
    const y = point.y + dx / distance * thickness * direction;
    return `${(x / width * 100).toFixed(2)}% ${(y / height * 100).toFixed(2)}%`;
  });
  return `polygon(${[...outline(1), ...outline(-1).reverse()].join(",")})`;
}

function makeSkeleton(chapter: number) {
  const angle = storyCamera.azimuths[chapter];
  const distance = storyCamera.distances[chapter];
  const structure = chapter === 1 || chapter === 5;
  const clearance = chapter === 5 ? 0.33 : 0;
  const camera = new PerspectiveCamera(35, width / height, 0.1, 60);
  camera.position.set(Math.sin(angle) * distance, storyCamera.elevations[chapter], Math.cos(angle) * distance);
  camera.lookAt(-Math.cos(angle) * clearance, structure ? 0.14 : -0.05, Math.sin(angle) * clearance);
  camera.updateMatrixWorld();
  const vector = new Vector3();
  const project = (x: number, y: number, z: number) => {
    vector.set(x, y, z).project(camera);
    return { x: (1 + vector.x) * width / 2, y: (1 - vector.y) * height / 2 };
  };
  const frame = (x: number, y: number, z: number, w: number, h: number): CSSProperties => {
    const center = project(x, y, z);
    const right = project(x + w / 2, y, z);
    const top = project(x, y + h / 2, z);
    return {
      left: `${center.x / width * 100}%`,
      top: `${center.y / height * 100}%`,
      width: `${Math.abs(right.x - center.x) / width * 200}%`,
      height: `${Math.abs(top.y - center.y) / height * 200}%`,
    };
  };

  const sample = new Vector3();
  const brain = chapter === 3 ? makeBrainMesh() : null;
  const brainPoints = brain?.points.map(({ x, y, z }) => project(x, y, z)) ?? [];
  const strands = brain ? brain.edges.map(([a, b]) => stroke([brainPoints[a], brainPoints[b]], 0.58)) : Array.from({ length: 9 }, (_, index) => stroke(
    Array.from({ length: 29 }, (_, step) => {
      strandPoint(chapter, index * 3, step / 28, sample);
      return project(sample.x, sample.y, sample.z);
    }),
    structure ? 0.95 : 0.52,
  ));
  const shell = chapter === 0 || chapter === 4
    ? frame(0, 0, 0, chapter === 0 ? 2.48 : 3.18, chapter === 0 ? 2.48 : 3.18)
    : null;
  const rings = shell
    ? [0, 1].map((index) => frame(0, 0, 0, 3.57 + index * 0.82, 0.74 + index * 0.51))
    : brain ? [frame(0, 0, 0, 4.18, 0.94)] : [];
  const panels = chapter === 2
    ? storyPanels.map(({ x, y, z, size }) => frame(x, y, z, 1.92 * size, 1.25 * size))
    : [];
  const spark = chapter === 0 ? frame(0.14, -0.37, 0.75, 0.7, 0.7) : null;
  const shield = chapter === 4 ? frame(0.83, -0.23, 1.26, 1.12, 1.33) : null;
  const brainLights = brainPoints.filter((_, index) => index % 4 === 1).map(({ x, y }) => ({
    left: `${x / width * 100}%`,
    top: `${y / height * 100}%`,
  }));
  return { strands, shell, rings, panels, spark, shield, brainLights };
}

const models = chapters.map((_, index) => makeSkeleton(index));

export default function StorySculptureSkeleton({ chapter }: { chapter: number }) {
  const { strands, shell, rings, panels, spark, shield, brainLights } = models[chapter];
  return (
    <div className="story-skeleton" aria-hidden="true">
      <div className="story-skeleton-model">
        {shell && <span className="story-skeleton-shell" style={shell} />}
        {rings.map((style, index) => (
          <span className="story-skeleton-ring" key={index} style={{ ...style, rotate: index === 0 ? "-14deg" : "12deg" }} />
        ))}
        {strands.map((clipPath, index) => (
          <span className="story-skeleton-strand" key={index} style={{ clipPath }} />
        ))}
        {brainLights.map((style, index) => (
          <span className="story-skeleton-node" key={index} style={style} />
        ))}
        {panels.map((style, index) => (
          <span className="story-skeleton-panel" key={index} style={style} />
        ))}
        {spark && <span className="story-skeleton-spark" style={spark} />}
        {shield && <span className="story-skeleton-shield" style={shield} />}
      </div>
    </div>
  );
}
