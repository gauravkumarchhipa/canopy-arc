import Link from "next/link";
import { tw } from "../../../../lib/tw";
import ImpactIcon from "../../home/impact/ImpactIcon";
import { detailCtaSection } from "./service-detail-styles";

type Props = {
  serviceName: string;
};

export default function ServiceDetailCta({ serviceName }: Props) {
  return (
    <section className={`${detailCtaSection} mt-12`}>
      <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-start gap-4">
          <span className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[image:var(--grad)] text-white">
            <ImpactIcon name="rocket" className="[&_svg]:h-6 [&_svg]:w-6" />
          </span>
          <div>
            <h2 className="font-display text-2xl tracking-tight sm:text-3xl">
              Ready to build your next {serviceName.toLowerCase()} project?
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
              Let&apos;s discuss your requirements and create a tailored solution for your
              business.
            </p>
          </div>
        </div>
        <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center">
          <Link href="/contact" className={`${tw.headerBtnBase} ${tw.headerBtnPrimary}`}>
            Schedule a Call →
          </Link>
          <Link href="/contact" className={`${tw.headerBtnBase} ${tw.headerBtnGhost}`}>
            Get a Proposal
          </Link>
        </div>
      </div>
    </section>
  );
}
