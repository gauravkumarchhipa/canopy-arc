import { PLAY_STORE_URL } from "./store-data";

export default function PlayStoreBadge() {
  return (
    <a
      href={PLAY_STORE_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="store-badge"
      aria-label="Get it on Google Play"
      data-cursor="hover"
    >
      <svg width="22" height="26" viewBox="0 0 512 512" aria-hidden>
        <defs>
          <linearGradient id="pg1" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#00C3FF" />
            <stop offset="100%" stopColor="#1F8DFF" />
          </linearGradient>
          <linearGradient id="pg2" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFE000" />
            <stop offset="100%" stopColor="#FFBD00" />
          </linearGradient>
          <linearGradient id="pg3" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FF3A44" />
            <stop offset="100%" stopColor="#C31162" />
          </linearGradient>
          <linearGradient id="pg4" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#00F076" />
            <stop offset="100%" stopColor="#00B25A" />
          </linearGradient>
        </defs>
        <path
          fill="url(#pg1)"
          d="M62 22c-7 4-12 12-12 22v424c0 10 5 18 12 22l245-245-245-223z"
        />
        <path
          fill="url(#pg2)"
          d="M384 256l-77-77 22-20 90 78c14 12 14 30 0 42l-90 78-22-20 77-81z"
        />
        <path
          fill="url(#pg3)"
          d="M62 468c7 4 17 4 27-2l242-141-22-20-244 144c-2 9-3 14-3 19z"
        />
        <path
          fill="url(#pg4)"
          d="M62 22c0 5 1 10 3 19l244 144 22-20-242-141c-10-6-20-6-27-2z"
        />
      </svg>
      <span className="leading-tight">
        <span className="block text-[0.65rem] uppercase tracking-[0.18em] font-medium">
          Get it on
        </span>
        <span className="block text-lg font-semibold">Google Play</span>
      </span>
    </a>
  );
}
