import Link from "next/link";
import { servicesGrid } from "../../../content/pages/services/grid";
import products from "../../../content/pages/work/products.json";

export function HomeCapabilities() {
  return (
    <section
      id="capabilities"
      className="capabilities-section"
      aria-labelledby="capabilities-title"
    >
      <div className="premium-container">
        <div className="section-heading">
          <p className="editorial-label">02 / OUR CAPABILITIES</p>
          <div>
            <h2 id="capabilities-title">
              Powerful IT services.
              <br />
              <span>Connected solutions.</span>
            </h2>
            <p className="section-description">
              From the first idea to enterprise scale. Explore the disciplines
              that bring your digital vision to life.
            </p>
          </div>
        </div>
        <div className="capability-list">
          {servicesGrid.cards.map((service, i) => (
            <Link
              className="capability-row"
              key={service.id}
              href={`/services/${service.id}`}
            >
              <span className="capability-number">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3>{service.title}</h3>
              <span className="capability-category">{service.tag}</span>
              <span className="capability-arrow" aria-hidden>
                ↗
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
export function HomeWork() {
  return (
    <section
      className="premium-container home-work"
      aria-labelledby="work-title"
    >
      <div className="work-heading">
        <div>
          <p className="editorial-label">03 / SELECTED WORK</p>
          <h2 id="work-title">Ideas, made real.</h2>
        </div>
        <Link className="editorial-link" href="/work">
          Explore all work <span aria-hidden>↗</span>
        </Link>
      </div>
      <div className="editorial-projects">
        {products.slice(0, 2).map((product, i) => (
          <Link
            className="editorial-project"
            href={`/work/${product.id}`}
            key={product.id}
          >
            <div className={`project-art project-art-${i}`} aria-hidden>
              <span className="project-art-index">
                CANOPY ARC / {product.year}
              </span>
              {i === 0 ? (
                <div className="intelligence-art">
                  {Array.from({ length: 9 }, (_, n) => (
                    <span
                      key={n}
                      style={{ transform: `rotate(${n * 20}deg)` }}
                    />
                  ))}
                  <b>S</b>
                </div>
              ) : (
                <div className="advisory-art">
                  P
                  <span>
                    Clarity.
                    <br />
                    By design.
                  </span>
                </div>
              )}
              <span className="project-art-label">{product.highlight}</span>
              <span className="project-art-arrow">↗</span>
            </div>
            <div className="project-caption">
              <h3>{product.name}</h3>
              <span>{product.category}</span>
            </div>
            <p>{product.description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
export function HomeContact() {
  return (
    <section className="home-contact premium-container">
      <p className="editorial-label">YOUR NEXT CHAPTER</p>
      <h2>
        Extraordinary starts
        <br />
        with a conversation.
      </h2>
      <Link className="premium-button" href="/contact">
        Let’s build something <span aria-hidden>↗</span>
      </Link>
      <p>Web. Mobile. Cloud. AI. One connected team.</p>
    </section>
  );
}
