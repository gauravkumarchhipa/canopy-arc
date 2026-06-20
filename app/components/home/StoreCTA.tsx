import AppStoreBadge from "./store-cta/AppStoreBadge";
import PlayStoreBadge from "./store-cta/PlayStoreBadge";
import QrPanel from "./store-cta/QrPanel";
import Eyebrow from "../ui/Eyebrow";

export default function StoreCTA() {
  return (
    <section className="relative py-12 sm:py-20 md:py-44">
      <div className="mx-auto max-w-350 px-4 sm:px-6 lg:px-10">
        <div
          className="relative grid lg:grid-cols-12 gap-10 lg:gap-20 items-center rounded-3xl overflow-hidden p-6 sm:p-6 sm:p-10 md:p-16"
          style={{
            background:
              "linear-gradient(135deg, var(--surface) 0%, var(--surface-strong) 100%)",
            border: "1px solid var(--line)",
          }}
        >
          <div
            className="absolute -top-40 -right-40 h-96 w-96 rounded-full blur-3xl pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, var(--accent-2), transparent 70%)",
              opacity: 0.35,
            }}
          />
          <div
            className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full blur-3xl pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, var(--accent), transparent 70%)",
              opacity: 0.25,
            }}
          />

          <div className="relative lg:col-span-7">
            <Eyebrow className="mb-5">Bring SAHAI home</Eyebrow>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl leading-[0.95] tracking-tight wrap-break-word">
              On the App Store.
              <br />
              On Google Play.
              <br />
              <span className="bg-[image:var(--grad)] bg-clip-text text-transparent">Or just scan.</span>
            </h2>

            <p className="mt-8 max-w-lg text-base md:text-lg text-muted leading-relaxed">
              SAHAI is built for both iOS and Android. Open the camera on your
              phone, scan the code, and install — same link, smart redirect to
              the right store.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-start gap-4">
              <AppStoreBadge />
              <PlayStoreBadge />
            </div>

            <p className="mt-6 text-xs text-muted/80">
              Available now · iOS & Android · Hindi · English
            </p>
          </div>

          <QrPanel />
        </div>
      </div>
    </section>
  );
}
