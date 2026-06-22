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
      <span aria-hidden>›</span>
      <Link href="/services" className="transition-colors hover:text-foreground">
        Services
      </Link>
      <span aria-hidden>›</span>
      <span className="text-foreground">{serviceName}</span>
    </nav>
  );
}
