import FooterBrand from "./footer/FooterBrand";
import FooterLinkColumn from "./footer/FooterLinkColumn";
import FooterNewsletter from "./footer/FooterNewsletter";
import FooterBottom from "./footer/FooterBottom";
import type { FooterData } from "../../lib/footer/types";

type Props = {
  data: FooterData;
};

export default function Footer({ data }: Props) {
  return (
    <footer className="relative mt-12 sm:mt-16 border-t border-line bg-background">
      <div className="absolute inset-x-0 -top-px h-px bg-linear-to-r from-transparent via-[#3b82f6]/35 to-transparent" />

      <div className="mx-auto max-w-350 px-6 lg:px-10 pt-14 sm:pt-20 pb-8 sm:pb-10">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-x-10 sm:gap-y-8 lg:grid-cols-[minmax(240px,1.35fr)_repeat(4,minmax(108px,1fr))_minmax(220px,1.1fr)] lg:gap-x-5 lg:gap-y-6 lg:items-start">
          <FooterBrand data={data} />
          <div className="grid grid-cols-1 gap-10 min-[360px]:grid-cols-2 min-[360px]:gap-x-5 min-[360px]:gap-y-8 sm:contents">
            {data.columns.map((column) => (
              <FooterLinkColumn key={column.heading} column={column} />
            ))}
          </div>
          {data.newsletter || data.support ? (
            <FooterNewsletter newsletter={data.newsletter} support={data.support} />
          ) : null}
        </div>

        <FooterBottom copyright={data.copyright} bottomLinks={data.bottomLinks} />
      </div>
    </footer>
  );
}
