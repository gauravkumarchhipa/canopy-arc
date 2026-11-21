import Button from "../../ui/Button";
import ArrowIcon from "../../ui/ArrowIcon";
import { nav } from "../../../content/shared/nav";

type Props = {
  className?: string;
  stacked?: boolean;
  onNavigate?: () => void;
};

export default function HeaderCtaButtons({ className = "", stacked = false, onNavigate }: Props) {
  return (
    <div
      className={`${stacked ? "flex flex-col gap-3 w-full" : "flex items-center gap-3"} ${className}`.trim()}
    >
      <Button variant="header-ghost"
        href={nav.ctaSecondary.href}
        onNavigate={onNavigate}
      >
        {nav.ctaSecondary.label}
      </Button>
      <Button variant="header-primary"
        href={nav.ctaPrimary.href}
        onNavigate={onNavigate}
      >
        {nav.ctaPrimary.label} <ArrowIcon direction="right" />
      </Button>
    </div>
  );
}
