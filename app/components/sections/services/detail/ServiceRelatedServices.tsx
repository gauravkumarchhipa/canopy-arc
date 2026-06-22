import Link from "next/link";
import { detailSectionTitle } from "./service-detail-styles";

type RelatedService = {
  id: string;
  title: string;
};

type Props = {
  related: RelatedService[];
};

export default function ServiceRelatedServices({ related }: Props) {
  if (related.length === 0) return null;

  return (
    <section className="mt-12">
      <h2 className={detailSectionTitle}>Related Services</h2>
      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {related.slice(0, 3).map((item) => (
          <Link
            key={item.id}
            href={`/services/${item.id}`}
            className="rounded-2xl border border-line bg-surface px-4 py-3 text-sm transition-colors hover:border-accent/40 hover:text-accent"
          >
            {item.title} →
          </Link>
        ))}
      </div>
    </section>
  );
}
