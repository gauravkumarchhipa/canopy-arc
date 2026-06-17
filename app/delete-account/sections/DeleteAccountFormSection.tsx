import Reveal from "../../components/Reveal";
import DeleteAccountForm from "../../components/DeleteAccountForm";
import { INFO_ITEMS } from "./delete-account-data";

export default function DeleteAccountFormSection() {
  return (
    <section className="relative pb-12 sm:pb-24">
      <div className="mx-auto max-w-350 px-6 lg:px-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-7">
            <DeleteAccountForm />
          </div>

          <div className="lg:col-span-5">
            <Reveal staggerChildren stagger={0.08}>
              <div className="flex flex-col gap-3">
                {INFO_ITEMS.map((item) => (
                  <div
                    key={item.label}
                    className="block p-5 sm:p-6 rounded-2xl border border-line bg-surface/30"
                  >
                    <p className="text-xs tracking-[0.25em] uppercase text-muted mb-3">
                      {item.label}
                    </p>
                    <p className="font-display text-xl md:text-2xl leading-tight tracking-tight">
                      {item.body}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal>
              <div className="mt-12 border border-line bg-surface backdrop-blur-xl backdrop-saturate-140 rounded-2xl p-8">
                <p className="text-xs tracking-[0.25em] uppercase text-muted mb-4">
                  Need help instead?
                </p>
                <p className="font-display text-2xl tracking-tight leading-tight">
                  Talk to us before
                  <br />
                  you delete.
                </p>
                <p className="mt-6 text-sm text-muted leading-relaxed">
                  Many issues — billing, setup, a loved one&apos;s care — can
                  be resolved without closing your account.
                </p>
                <a
                  href="/contact"
                  className="inline-flex mt-6 text-sm text-accent hover:underline"
                  data-cursor="hover"
                >
                  Go to contact →
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
