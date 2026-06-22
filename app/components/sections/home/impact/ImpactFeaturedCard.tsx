import { impactCardPattern, impactFeaturedCard, impactFeaturedIcon } from "./impact-styles";
import AnimatedCounter from "../../../ui/AnimatedCounter";
import ImpactIcon from "./ImpactIcon";

type ImpactFeaturedCardProps = {
  icon: string;
  value: string;
  label: string;
  description: string;
};

export default function ImpactFeaturedCard({
  icon,
  value,
  label,
  description,
}: ImpactFeaturedCardProps) {
  return (
    <article className={impactFeaturedCard}>
      <div
        className={`absolute inset-0 opacity-90 transition-opacity duration-[400ms] group-hover:opacity-100 ${impactCardPattern}`}
        aria-hidden
      />
      <div className={impactFeaturedIcon}>
        <ImpactIcon name={icon} />
      </div>
      <AnimatedCounter
        value={value}
        className="relative z-1 mt-5 block text-[clamp(2.5rem,5vw,3.5rem)] leading-none font-semibold tracking-tight"
      />
      <h3 className="relative z-1 mt-2.5 text-lg leading-tight font-semibold">{label}</h3>
      <span
        className="relative z-1 mt-4 mb-3 block h-0.5 w-10 rounded-full bg-white/55 transition-[width] duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:w-14"
        aria-hidden
      />
      <p className="relative z-1 m-0 max-w-64 text-[0.8125rem] leading-snug text-white/82 transition-colors duration-[400ms] group-hover:text-white/92">
        {description}
      </p>
    </article>
  );
}
