import AnimatedCounter from "../ui/AnimatedCounter";
import Heading from "../ui/Heading";
import styles from "./StudioMetrics.module.css";

type StudioMetricsProps = {
  headingId: string;
  title: string;
  shellClassName: string;
  figures: readonly { label: string; value: string }[];
};

export default function StudioMetrics({ headingId, title, shellClassName, figures }: StudioMetricsProps) {
  return (
    <section className={styles.metrics} aria-labelledby={headingId}>
      <div className={shellClassName}>
        <Heading id={headingId} className={styles.label}>{title}</Heading>
        <dl className={styles.figures}>
          {figures.map(({ label, value }) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd><AnimatedCounter value={value} /></dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
