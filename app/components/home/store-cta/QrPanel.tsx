import QRCode from "qrcode";
import Eyebrow from "../../ui/Eyebrow";
import { SMART_LINK } from "./store-data";

let cachedSvg: Promise<string> | null = null;

function getQrSvg() {
  if (!cachedSvg) {
    cachedSvg = QRCode.toString(SMART_LINK, {
      type: "svg",
      errorCorrectionLevel: "H",
      margin: 1,
      width: 360,
      color: { dark: "#14161a", light: "#ffffff" },
    });
  }
  return cachedSvg;
}

export default async function QrPanel() {
  const svg = await getQrSvg();

  return (
    <div className="relative lg:col-span-5">
      <div
        className="relative mx-auto w-full max-w-sm aspect-square rounded-3xl p-6 flex flex-col items-center justify-center"
        style={{
          background: "var(--bg-soft)",
          border: "1px solid var(--line)",
        }}
      >
        <Eyebrow className="mb-4">Scan to install</Eyebrow>
        <div
          className="relative w-56 h-56 rounded-2xl overflow-hidden flex items-center justify-center"
          style={{ background: "#ffffff" }}
        >
          <div
            aria-label={`QR code linking to ${SMART_LINK}`}
            role="img"
            className="absolute inset-0 [&>svg]:w-full [&>svg]:h-full"
            dangerouslySetInnerHTML={{ __html: svg }}
          />
          <span
            className="relative inline-flex h-12 w-12 items-center justify-center rounded-xl overflow-hidden bg-[#f5f1e8]"
            style={{
              boxShadow: "0 6px 18px -6px rgba(0,0,0,0.35)",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/sahai-logo-theme.png"
              alt="SAHAI"
              width={48}
              height={48}
              className="h-full w-full object-contain"
            />
          </span>
        </div>
        <p
          className="mt-5 text-center text-sm font-mono"
          style={{ color: "var(--muted)" }}
        >
          sahai.health/install
        </p>
      </div>
    </div>
  );
}
