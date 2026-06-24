import { TIMELINE } from "./about-data";
import {
  aboutSectionEyebrow,
  aboutSectionTitle,
  aboutTimelineBody,
  aboutTimelineDate,
  aboutTimelineTitle,
} from "./about-styles";

export default function TimelineSection() {
  return (
    <section className="relative border-t border-line py-16 sm:py-24 md:py-28">
      <div className="mx-auto max-w-350 px-6 lg:px-10">
        <div className="mb-12 max-w-2xl">
          <p className={aboutSectionEyebrow}>Our journey</p>
          <h2 className={aboutSectionTitle}>
            From a small studio to a trusted global partner.
          </h2>
        </div>

        <div className="relative">
          <div className="absolute top-2 bottom-2 left-[7.25rem] hidden w-px bg-linear-to-b from-accent/30 via-accent/20 to-transparent md:block" />
          {TIMELINE.map((entry, index) => (
            <div
              key={`${entry.date}-${index}`}
              className="relative grid gap-4 border-t border-line py-8 first:border-t-0 md:grid-cols-[10rem_1fr] md:gap-12"
            >
              <p className={aboutTimelineDate}>{entry.date}</p>
              <div className="relative md:pl-8">
                <span className="absolute top-3 -left-[0.45rem] hidden h-3 w-3 rounded-full bg-accent md:block" />
                <h3 className={aboutTimelineTitle}>{entry.title}</h3>
                <p className={aboutTimelineBody}>{entry.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
