import { impactStatCard } from "./impact-styles";
import ImpactIcon from "./ImpactIcon";

type Pillar = {
  icon: string;
  title: string;
  description: string;
};

type ImpactCommitmentProps = {
  title: string;
  description: string;
  pillars: readonly Pillar[];
};

export default function ImpactCommitment({ title, description, pillars }: ImpactCommitmentProps) {
  return (
    <article
      className={`mt-8 flex flex-col gap-6 rounded-[1.15rem] p-5 sm:mt-10 lg:flex-row lg:items-center lg:gap-8 lg:p-6 ${impactStatCard}`}
    >
      <div className="flex min-w-0 items-start gap-4 lg:flex-[0_0_34%] lg:border-r lg:border-line lg:pr-6">
        <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-[0.8rem] border border-[rgba(37,99,235,0.16)] bg-[rgba(37,99,235,0.08)] text-accent [&_svg]:h-5 [&_svg]:w-5">
          <ImpactIcon name="star" />
        </span>
        <div>
          <h3 className="m-0 text-[1.05rem] font-semibold text-foreground">{title}</h3>
          <p className="mt-1.75 text-[0.8125rem] leading-snug text-muted">{description}</p>
        </div>
      </div>
      <div className="grid flex-1 grid-cols-2 gap-x-4 gap-y-5 md:grid-cols-4 md:gap-4">
        {pillars.map((pillar) => (
          <div key={pillar.title} className="min-w-0">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-[0.65rem] border border-[rgba(37,99,235,0.14)] bg-[rgba(37,99,235,0.06)] text-accent [&_svg]:h-4 [&_svg]:w-4">
              <ImpactIcon name={pillar.icon} />
            </span>
            <h4 className="mt-2.5 text-[0.8125rem] font-semibold text-foreground">{pillar.title}</h4>
            <p className="mt-1 text-[0.6875rem] leading-snug text-muted">{pillar.description}</p>
          </div>
        ))}
      </div>
    </article>
  );
}
