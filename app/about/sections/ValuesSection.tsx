import GlowHoverCard from "../../components/ui/GlowHoverCard";
import { VALUES } from "./about-data";
import {
  aboutSectionEyebrow,
  aboutSectionTitle,
  aboutValueBody,
  aboutValueIndex,
  aboutValueTitle,
} from "./about-styles";

export default function ValuesSection() {
  return (
    <section className="relative border-t border-line py-16 sm:py-24 md:py-28">
      <div className="mx-auto max-w-350 px-6 lg:px-10">
        <div className="mb-12 max-w-2xl">
          <p className={aboutSectionEyebrow}>What we believe</p>
          <h2 className={aboutSectionTitle}>
            Four principles behind every project we take on.
          </h2>
        </div>

        <div className="grid gap-5 overflow-visible p-1 md:grid-cols-2">
          {VALUES.map((value) => (
            <GlowHoverCard key={value.n} className="rounded-3xl p-6 sm:p-8">
              <p className={aboutValueIndex}>{value.n}</p>
              <h3 className={aboutValueTitle}>{value.title}</h3>
              <p className={aboutValueBody}>{value.body}</p>
            </GlowHoverCard>
          ))}
        </div>
      </div>
    </section>
  );
}
