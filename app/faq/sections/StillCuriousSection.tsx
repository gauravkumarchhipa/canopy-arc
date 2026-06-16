import Button from "../../components/ui/Button";

export default function StillCuriousSection() {
  return (
    <section className="relative py-12 sm:py-20 md:py-28 border-t border-line">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
        <div className="glass rounded-3xl p-6 sm:p-8 md:p-14 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <h3 className="font-display text-3xl sm:text-4xl md:text-5xl leading-[1] tracking-tight max-w-xl break-words">
              Still curious? Just ask.
            </h3>
          </div>
          <div className="flex flex-col sm:flex-row items-start gap-4">
            <Button href="/contact">
              Send us a note
            </Button>
            <Button href="mailto:support@sahai.ai" variant="ghost">
              support@sahai.ai
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
