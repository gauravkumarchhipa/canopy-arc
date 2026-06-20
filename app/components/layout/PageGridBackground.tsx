import { tw } from "../../lib/tw";

type Props = {
  className?: string;
};

/** Site-wide plain grid background — matches home page hero. */
export default function PageGridBackground({ className = "" }: Props) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 -z-10 ${className}`}
      aria-hidden
    >
      <div
        className={`absolute inset-0 opacity-[var(--hero-grid-opacity)] ${tw.gridBg}`}
      />
    </div>
  );
}
