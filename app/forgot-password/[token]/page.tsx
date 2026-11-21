import { headers } from "next/headers";
import Button from "../../components/ui/Button";
import Heading from "../../components/ui/Heading";
import Link from "next/link";
import ResetAppRedirect from "./ResetAppRedirect";
import { PLAY_STORE_URL } from "./reset-app";

export default async function ForgotPasswordDeepLinkPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const [{ token }, requestHeaders] = await Promise.all([params, headers()]);
  const isAndroid = /android/i.test(requestHeaders.get("user-agent") ?? "");

  return (
    <section className="flex flex-1 items-center justify-center px-6 py-24">
      {isAndroid && <ResetAppRedirect token={token} />}
      <div className="max-w-md text-center">
        <Heading level={1} className="font-fraunces text-3xl md:text-4xl">
          {isAndroid ? "Opening SAHAI…" : "Reset your password in the SAHAI app"}
        </Heading>
        <p className="mt-4 text-base opacity-80">
          {isAndroid
            ? "If the app does not open in a few seconds, you’ll be taken to the Play Store to install it."
            : "Open this link on your phone, or install SAHAI to continue the password reset."}
        </p>
        <div className="mt-8 flex flex-col items-center gap-3">
          <Button as="a" variant="unstyled" href={PLAY_STORE_URL} className="inline-flex items-center justify-center rounded-full bg-foreground px-6 py-3 text-background">
            Get SAHAI on Google Play
          </Button>
          <Link href="/" className="text-sm underline opacity-80">
            Back to home
          </Link>
        </div>
      </div>
    </section>
  );
}
