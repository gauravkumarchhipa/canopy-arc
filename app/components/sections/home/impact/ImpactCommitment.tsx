import {
  impactCommitmentCard,
  impactCommitmentDescription,
  impactCommitmentLead,
  impactCommitmentLeadIcon,
  impactCommitmentPillarDescription,
  impactCommitmentPillarIcon,
  impactCommitmentPillarTitle,
  impactCommitmentTitle,
  impactStatCardGradient,
  impactStatCardPattern,
} from "./impact-styles";
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
    <article className={impactCommitmentCard}>
      <div className={impactStatCardGradient} aria-hidden />
      <div className={impactStatCardPattern} aria-hidden />
      <div className={impactCommitmentLead}>
        <span className={impactCommitmentLeadIcon}>
          <ImpactIcon name="star" />
        </span>
        <div>
          <h3 className={impactCommitmentTitle}>{title}</h3>
          <p className={impactCommitmentDescription}>{description}</p>
        </div>
      </div>
      <div className="relative z-1 grid flex-1 grid-cols-2 gap-x-4 gap-y-5 md:grid-cols-4 md:gap-4">
        {pillars.map((pillar) => (
          <div key={pillar.title} className="min-w-0">
            <span className={impactCommitmentPillarIcon}>
              <ImpactIcon name={pillar.icon} />
            </span>
            <h4 className={impactCommitmentPillarTitle}>{pillar.title}</h4>
            <p className={impactCommitmentPillarDescription}>{pillar.description}</p>
          </div>
        ))}
      </div>
    </article>
  );
}
