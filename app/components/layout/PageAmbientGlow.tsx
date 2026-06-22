type Props = {
  className?: string;
};

/** Soft blue/cyan ambient glow — matches contact + home reference backgrounds. */
export default function PageAmbientGlow({ className = "" }: Props) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`.trim()}
      aria-hidden
    >
      <div className="page-ambient-orb page-ambient-orb-top" />
      <div className="page-ambient-orb page-ambient-orb-mid" />
      <div className="page-ambient-orb page-ambient-orb-bottom" />
    </div>
  );
}
