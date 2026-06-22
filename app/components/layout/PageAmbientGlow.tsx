type Props = {
  className?: string;
  /** `blur` = soft orb glow (contact). `gradient` = clean color wash without blur (home). */
  variant?: "blur" | "gradient";
};

/** Soft blue/cyan ambient background — contact uses blur orbs; home uses flat gradients. */
export default function PageAmbientGlow({
  className = "",
  variant = "blur",
}: Props) {
  if (variant === "gradient") {
    return (
      <div
        className={`page-ambient-gradient pointer-events-none absolute inset-0 ${className}`.trim()}
        aria-hidden
      />
    );
  }

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
