import Heading from "../../../ui/Heading";
import ArrowIcon from "../../../ui/ArrowIcon";
import GlowHoverCard from "../../../ui/GlowHoverCard";
import { detailRelatedLink, detailSectionTitle } from "./service-detail-styles";

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
      <Heading className={detailSectionTitle}>Related Services</Heading>
      <div className="mt-4 grid gap-3 overflow-visible p-1 sm:grid-cols-2 lg:grid-cols-3">
        {related.slice(0, 3).map((item) => (
          <GlowHoverCard
            key={item.id}
            as={Link}
            href={`/services/${item.id}`}
            className="block rounded-2xl px-4 py-3"
          >
            <span className={detailRelatedLink}>{item.title} <ArrowIcon direction="right" /></span>
          </GlowHoverCard>
        ))}
      </div>
    </section>
  );
}
import Link from "next/link";
