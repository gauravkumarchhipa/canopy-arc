import { interfaceChart, interfaceChartSurface, interfaceDots, interfaceHighlight, interfaceLines, interfacePoint, interfaceSurface, isGlass, junctionPoint, storyCamera, storyInterfaces, strandCount, strandPoint } from "./story-ribbon";

import { protectionDetails } from "./story-protection-details";

export default function StoryStill({ pose, instance = "stage" }: { pose: number; instance?: string }) {
  const shot = storyCamera[pose];
  const metal = `story-metal-${instance}-${pose}`;
  const shadow = `story-shadow-${instance}-${pose}`;
  const c = Math.cos(shot.azimuth);
  const s = Math.sin(shot.azimuth);
  const elevation = Math.atan(shot.elevation);
  const pitch = Math.sin(elevation);
  const up = Math.cos(elevation);
  const fine = pose === 0 || pose === 2 || pose === 3 || pose === 4;
  const project = ([x, y, z]: readonly number[]) => {
    const forward = x * s + z * c;
    const zoom = 755 / (shot.distance - forward * up - y * pitch);
    return [320 + (x * c - z * s + shot.slide) * zoom, 230 - ((y - shot.lift) * up - forward * pitch) * zoom, zoom];
  };
  const paths = Array.from({ length: strandCount }, (_, strand) => {
    let depth = 0;
    const path = Array.from({ length: 28 }, (_, step) => {
      const point = strandPoint(pose, strand, step / 27);
      depth += point[0] * s + point[2] * c;
      const [u, v] = project(point);
      return [u.toFixed(1), v.toFixed(1)].join(" ");
    }).join(" L");
    return { strand, depth, path: "M" + path };
  }).sort((a, b) => a.depth - b.depth);
  const strokeWidth = pose === 0 ? 3.8 : pose === 4 ? 1.7 : fine ? 1.15 : 2;

  return (
    <svg className={pose === 4 ? "story-still story-still--protection" : "story-still"} viewBox="0 0 640 460" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={metal} x1="6%" x2="86%" y1="87%" y2="7%">
          <stop offset="0" stopColor="var(--still-link-base, var(--still-dark))" />
          <stop offset="0.44" stopColor="var(--still-link-highlight, var(--still-light))" />
          <stop offset="0.67" stopColor="var(--still-link-base, var(--still-dark))" />
          <stop offset="1" stopColor="var(--still-link-highlight, var(--still-light))" />
        </linearGradient>
        <radialGradient id={shadow}>
          <stop offset="0" stopColor="var(--still-dark)" stopOpacity="0.32" />
          <stop offset="1" stopColor="var(--still-dark)" stopOpacity="0" />
        </radialGradient>
        {paths.map(({ strand, path }) => (
          <path key={strand} id={`${metal}-strand-${strand}`} d={path} />
        ))}
      </defs>
      <ellipse cx="320" cy={230 - shot.floor * 755 / shot.distance} rx={fine ? 130 : 204} ry="15"
        fill={`url(#${shadow})`} />
      {pose === 2 && storyInterfaces.map((panel) => {
        const point = (x: number, y: number) => project(interfacePoint(panel, x, y));
        const polygon = (points: readonly (readonly [number, number])[]) =>
          points.map(([x, y]) => point(x, y).slice(0, 2).join(",")).join(" ");
        const rect = (x: number, y: number, width: number, height: number) => polygon([
          [x - width / 2, y - height / 2], [x + width / 2, y - height / 2],
          [x + width / 2, y + height / 2], [x - width / 2, y + height / 2],
        ]);
        const chartSurface = interfaceChartSurface;
        const chart = polygon(interfaceChart);
        return (
          <g key={panel.x} data-interface-panel="">
            <polygon points={rect(0, 0, 1, 1)} fill={interfaceSurface.color} fillOpacity={interfaceSurface.opacity} />
            <polygon points={polygon(interfaceHighlight)} fill="#fff8e7" fillOpacity="0.31" />
            <path d={`M${rect(chartSurface.x, chartSurface.y, chartSurface.width, chartSurface.height)}Z M${chart}Z`}
              fillRule="evenodd" fill={chartSurface.color} fillOpacity={chartSurface.opacity} />
            <polygon points={chart} fill="#e5deca" fillOpacity="0.78" />
            {interfaceLines.map(({ x, y, width, height, color }) => (
              <polygon key={y} points={rect(x, y, width, height)} fill={color} fillOpacity="0.72" />
            ))}
            {interfaceDots.map((x) => {
              const [cx, cy, zoom] = point(x, 0.32);
              return <circle key={x} cx={cx} cy={cy} r={zoom * panel.width * 0.014} fill="#eee5d3" fillOpacity="0.78" />;
            })}
          </g>
        );
      })}
      <g fill="none" strokeLinecap="round" strokeLinejoin="round">
        {paths.map(({ strand }) => {
          const width = pose === 4 && strand < 4 ? strokeWidth * 1.4 : strokeWidth;
          return (
            <g key={strand}>
              <use href={`#${metal}-strand-${strand}`} stroke="var(--still-dark)" strokeWidth={width + 1} opacity="0.5" />
              <use href={`#${metal}-strand-${strand}`} stroke={isGlass(strand) ? "var(--still-link-glass, var(--still-glass))" : `url(#${metal})`}
                strokeWidth={width} opacity={strand % 5 === 0 ? 0.7 : 1} />
            </g>
          );
        })}
      </g>
      {pose === 4 && (
        <g strokeLinecap="round" data-protection-details="">
          {protectionDetails.map(({ start, end, radius, finish }, index) => {
            const [x1, y1, close] = project(start);
            const [x2, y2, far] = project(end);
            return (
              <line key={index} x1={x1} y1={y1} x2={x2} y2={y2}
                stroke={`var(--still-detail-${finish})`} strokeWidth={radius * (close + far)} />
            );
          })}
        </g>
      )}
      {(pose === 3 || pose === 4) && Array.from({ length: 20 }, (_, index) => {
        const [x, y] = project(junctionPoint(index, pose === 4));
        return <circle key={index} cx={x} cy={y} r={index % 3 + 2.5} fill="var(--still-node, var(--still-light))" />;
      })}
    </svg>
  );
}
