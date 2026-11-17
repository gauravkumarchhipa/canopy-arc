type Props = {
  title: string;
  category: string;
  index?: number;
  technologies?: string[];
};

/** Editorial concept art using existing project content, not product screenshots. */
export default function ProjectArtwork({
  title,
  category,
  index = 0,
  technologies = [],
}: Props) {
  const mobile = /mobile|android|ios|app\b/i.test(`${title} ${category}`);
  const intelligence = /ai\b|intelligen|machine|predict|neural/i.test(
    `${title} ${category}`,
  );
  const form = mobile ? "mobile" : intelligence ? "intelligence" : "web";
  const editorial = /portfolio|manufactur|industrial/i.test(title);
  const pipeline = /lead|crm|outreach/i.test(title);
  const document = /tender|vendor|advis|compliance/i.test(title);
  const portal = /portal|enterprise/i.test(title);

  return (
    <div
      className={`project-cover project-cover-${form} project-cover-tone-${index % 3}`}
      aria-hidden="true"
    >
      <div className="project-cover-meta">
        <span>{category}</span>
        <span>CONCEPT / {String(index + 1).padStart(2, "0")}</span>
      </div>
      <div className="project-device">
        <div className="project-device-toolbar">
          <span />
          <span />
          <span />
          <i />
        </div>
        <div className="project-device-content">
          <div className="project-device-sidebar">
            <b />
            <i />
            <i />
            <i />
            <i />
          </div>
          <div className="project-device-main">
            <p>{title}</p>
            {intelligence ? (
              <div className="project-intelligence-form">
                {Array.from({ length: 7 }, (_, n) => (
                  <i key={n} style={{ rotate: `${n * 25}deg` }} />
                ))}
              </div>
            ) : editorial ? (
              <div className="project-editorial-form">
                <svg viewBox="0 0 240 100" fill="none">
                  {Array.from({ length: 9 }, (_, n) => (
                    <path
                      key={n}
                      d={`M${30 + n * 7} 95 Q120 ${-65 + n * 9} ${210 - n * 7} 95`}
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                  ))}
                </svg>
              </div>
            ) : pipeline ? (
              <div className="project-pipeline-form">
                {Array.from({ length: 3 }, (_, n) => (
                  <div key={n}>
                    <b />
                    <i />
                    <i />
                    {n !== 1 ? <i /> : null}
                  </div>
                ))}
              </div>
            ) : document ? (
              <div className="project-document-form">
                <div>
                  <i />
                  <i />
                  <i />
                  <i />
                </div>
                <span>↗</span>
              </div>
            ) : portal ? (
              <div className="project-portal-form">
                {Array.from({ length: 4 }, (_, n) => (
                  <div key={n}>
                    <b />
                    <i />
                    <i />
                  </div>
                ))}
              </div>
            ) : (
              <div className="project-device-chart">
                {[38, 62, 45, 78, 60, 90, 73, 100, 85].map((height, n) => (
                  <span
                    key={n}
                    style={{
                      height: `${height}%`,
                      animationDelay: `${n * 45}ms`,
                    }}
                  />
                ))}
              </div>
            )}
            <div className="project-device-lines">
              <i />
              <i />
              <i />
            </div>
          </div>
        </div>
      </div>
      <div className="project-cover-caption">
        <span>{technologies.slice(0, 2).join(" / ") || category}</span>
        <span>↗</span>
      </div>
    </div>
  );
}
