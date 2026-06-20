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
    <article className="relative flex min-h-72 flex-col justify-end overflow-hidden rounded-[1.25rem] bg-[linear-gradient(145deg,#1d4ed8_0%,#2563eb_42%,#1e40af_100%)] p-6 text-white shadow-[0_24px_60px_-28px_rgba(37,99,235,0.65)] lg:min-h-full lg:p-8">
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(255,255,255,0.14),transparent_42%),repeating-radial-gradient(circle_at_70%_60%,rgba(255,255,255,0.08)_0_1px,transparent_1px_18px)] opacity-90"
        aria-hidden
      />
      <div className="relative z-1 mb-auto inline-flex h-13 w-13 items-center justify-center rounded-full border border-white/28 bg-white/12 shadow-[0_0_28px_rgba(255,255,255,0.18)] [&_svg]:h-5.5 [&_svg]:w-5.5">
        <ImpactIcon name={icon} />
      </div>
      <p className="relative z-1 mt-5 text-[clamp(2.5rem,5vw,3.5rem)] leading-none font-semibold tracking-tight">
        {value}
      </p>
      <h3 className="relative z-1 mt-2.5 text-lg leading-tight font-semibold">{label}</h3>
      <span className="relative z-1 mt-4 mb-3 block h-0.5 w-10 rounded-full bg-white/55" aria-hidden />
      <p className="relative z-1 m-0 max-w-64 text-[0.8125rem] leading-snug text-white/82">
        {description}
      </p>
    </article>
  );
}
