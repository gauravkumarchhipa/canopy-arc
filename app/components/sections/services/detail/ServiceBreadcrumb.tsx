import ArrowIcon from "../../../ui/ArrowIcon";
import Link from "next/link";

type Props = {
  serviceName: string;
};

export default function ServiceBreadcrumb({ serviceName }: Props) {
  return (
    <nav className="flex flex-wrap items-center gap-2 text-sm text-muted">
      <Link href="/" className="transition-colors hover:text-foreground">
        Home
      </Link>
      <span aria-hidden><ArrowIcon direction="chevron-right" /></span>
      <Link href="/services" className="transition-colors hover:text-foreground">
        Services
      </Link>
      <span aria-hidden><ArrowIcon direction="chevron-right" /></span>
      <span className="text-foreground">{serviceName}</span>
    </nav>
  );
}
