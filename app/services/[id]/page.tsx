import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ServiceDetailView from "../../components/sections/services/detail/ServiceDetailView";
import {
  getServiceById,
  servicesGrid,
} from "../../content/pages/services/grid";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateStaticParams() {
  return servicesGrid.cards.map((card) => ({ id: card.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const service = getServiceById(id);
  if (!service) return { title: "Service — Canopy Arc" };
  return {
    title: `${service.name} — Canopy Arc`,
    description: service.description,
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { id } = await params;
  const service = getServiceById(id);
  if (!service) notFound();

  const related = servicesGrid.cards
    .filter((card) => card.tag === service.category && card.id !== service.id)
    .map((card) => ({ id: card.id, title: card.title }));

  return <ServiceDetailView service={service} related={related} />;
}
