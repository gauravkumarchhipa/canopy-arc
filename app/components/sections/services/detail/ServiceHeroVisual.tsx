import type { ReactNode } from "react";
import ServiceIcon from "../ServiceIcon";

type VisualProps = {
  iconName: string;
};

function VisualShell({
  iconName,
  accentIcon,
  children,
}: VisualProps & { accentIcon?: ReactNode; children: ReactNode }) {
  return (
    <div className="relative mx-auto w-full max-w-md lg:max-w-none">
      <div
        className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(37,99,235,0.18),transparent_68%)]"
        aria-hidden
      />
      <div className="relative rounded-[1.5rem] border border-line bg-[linear-gradient(145deg,rgba(37,99,235,0.12),rgba(6,182,212,0.08))] p-5 sm:p-6">
        <div className="rounded-[1rem] border border-line bg-background/80 p-3 shadow-[0_24px_60px_-32px_rgba(37,99,235,0.45)]">
          {children}
        </div>
        <div className="absolute -right-2 top-8 flex h-12 w-12 items-center justify-center rounded-xl border border-line bg-background text-accent shadow-lg sm:-right-4 sm:h-14 sm:w-14">
          <ServiceIcon name={iconName} className="[&_svg]:h-6 [&_svg]:w-6" />
        </div>
        {accentIcon ? (
          <div className="absolute -left-2 bottom-10 flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-background text-accent shadow-lg sm:-left-4">
            {accentIcon}
          </div>
        ) : null}
      </div>
    </div>
  );
}

function BrowserChrome() {
  return (
    <div className="mb-3 flex items-center gap-1.5">
      <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
      <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
      <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
      <div className="ml-2 h-4 flex-1 rounded-full border border-line bg-surface/80" />
    </div>
  );
}

function WebVisual({ iconName }: VisualProps) {
  return (
    <VisualShell
      iconName={iconName}
      accentIcon={
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5">
          <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4" />
        </svg>
      }
    >
      <BrowserChrome />
      <div className="grid grid-cols-3 gap-2">
        {[0, 1, 2].map((i) => (
          <div key={i} className="rounded-lg border border-line bg-surface p-2.5">
            <div className="h-2 w-8 rounded bg-accent/25" />
            <div className="mt-2 h-6 rounded bg-accent/15" />
          </div>
        ))}
      </div>
      <div className="mt-2 grid grid-cols-[1.2fr_0.8fr] gap-2">
        <div className="rounded-lg border border-line bg-surface p-2.5">
          <div className="h-16 rounded-md bg-[image:var(--grad-soft)]" />
        </div>
        <div className="space-y-2">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-4 rounded bg-accent/12" />
          ))}
        </div>
      </div>
    </VisualShell>
  );
}

function MobileVisual({ iconName }: VisualProps) {
  return (
    <VisualShell
      iconName={iconName}
      accentIcon={
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5">
          <path d="M5 12h14M12 5v14" strokeLinecap="round" />
        </svg>
      }
    >
      <div className="flex items-center justify-center py-2">
        <div className="w-[42%] rounded-[1.1rem] border-2 border-line bg-surface p-1.5 shadow-inner">
          <div className="mx-auto mb-1.5 h-1 w-8 rounded-full bg-line" />
          <div className="space-y-1.5 rounded-xl bg-background p-2">
            <div className="h-10 rounded-lg bg-[image:var(--grad-soft)]" />
            <div className="grid grid-cols-2 gap-1">
              <div className="h-8 rounded-md bg-accent/15" />
              <div className="h-8 rounded-md bg-accent/20" />
            </div>
            <div className="space-y-1">
              {[0, 1, 2].map((i) => (
                <div key={i} className="h-2 rounded bg-accent/10" />
              ))}
            </div>
            <div className="mt-1 flex justify-around border-t border-line pt-1.5">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="h-2 w-2 rounded-full bg-accent/25" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </VisualShell>
  );
}

function AiVisual({ iconName }: VisualProps) {
  return (
    <VisualShell
      iconName={iconName}
      accentIcon={
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5">
          <circle cx="12" cy="12" r="3" />
          <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
        </svg>
      }
    >
      <div className="relative flex h-36 items-center justify-center">
        <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.35),transparent_70%)]" />
        <div className="relative grid grid-cols-3 gap-3">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className={`flex h-9 w-9 items-center justify-center rounded-full border border-accent/30 bg-accent/10 ${
                i === 1 || i === 3 ? "scale-110 border-accent/50 bg-accent/20" : ""
              }`}
            >
              <div className="h-2 w-2 rounded-full bg-accent/70" />
            </div>
          ))}
        </div>
        <svg className="pointer-events-none absolute inset-0 h-full w-full text-accent/25" aria-hidden>
          <line x1="33%" y1="40%" x2="50%" y2="50%" stroke="currentColor" strokeWidth="1" />
          <line x1="67%" y1="40%" x2="50%" y2="50%" stroke="currentColor" strokeWidth="1" />
          <line x1="33%" y1="60%" x2="50%" y2="50%" stroke="currentColor" strokeWidth="1" />
          <line x1="67%" y1="60%" x2="50%" y2="50%" stroke="currentColor" strokeWidth="1" />
        </svg>
      </div>
      <div className="mt-2 flex gap-2">
        <div className="flex-1 rounded-lg border border-line bg-surface p-2">
          <div className="text-[0.5rem] uppercase tracking-wider text-muted">Model</div>
          <div className="mt-1 h-2 w-full rounded bg-accent/20" />
        </div>
        <div className="flex-1 rounded-lg border border-line bg-surface p-2">
          <div className="text-[0.5rem] uppercase tracking-wider text-muted">Output</div>
          <div className="mt-1 h-2 w-3/4 rounded bg-emerald-400/30" />
        </div>
      </div>
    </VisualShell>
  );
}

function SecurityVisual({ iconName }: VisualProps) {
  return (
    <VisualShell iconName={iconName}>
      <div className="flex items-center justify-center py-3">
        <div className="relative">
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-accent/30 bg-accent/10">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-10 w-10 text-accent">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <path d="m9 12 2 2 4-4" />
            </svg>
          </div>
          <div className="absolute -right-3 -top-2 h-6 w-6 rounded-full border border-emerald-400/40 bg-emerald-400/15" />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {["Firewall", "Encrypt", "Audit"].map((label) => (
          <div key={label} className="rounded-lg border border-line bg-surface p-2 text-center">
            <div className="mx-auto h-4 w-4 rounded-full bg-accent/20" />
            <div className="mt-1 text-[0.5rem] text-muted">{label}</div>
          </div>
        ))}
      </div>
    </VisualShell>
  );
}

function IotVisual({ iconName }: VisualProps) {
  return (
    <VisualShell iconName={iconName}>
      <div className="relative flex h-32 items-center justify-center">
        <div className="absolute left-4 top-4 h-10 w-10 rounded-xl border border-line bg-surface p-1.5">
          <div className="h-full w-full rounded bg-accent/15" />
        </div>
        <div className="absolute right-4 top-6 h-8 w-8 rounded-full border border-line bg-surface" />
        <div className="absolute bottom-4 left-8 h-9 w-14 rounded-lg border border-line bg-surface" />
        <div className="z-1 flex h-14 w-14 items-center justify-center rounded-2xl border border-accent/40 bg-accent/15">
          <div className="h-3 w-3 animate-pulse rounded-full bg-accent" />
        </div>
        <svg className="pointer-events-none absolute inset-0 h-full w-full text-accent/20" aria-hidden>
          <line x1="20%" y1="25%" x2="50%" y2="50%" stroke="currentColor" strokeDasharray="3 3" />
          <line x1="80%" y1="30%" x2="50%" y2="50%" stroke="currentColor" strokeDasharray="3 3" />
          <line x1="30%" y1="80%" x2="50%" y2="50%" stroke="currentColor" strokeDasharray="3 3" />
        </svg>
      </div>
    </VisualShell>
  );
}

function DataVisual({ iconName }: VisualProps) {
  return (
    <VisualShell iconName={iconName}>
      <div className="flex h-28 items-end justify-between gap-1.5 px-2 pb-1">
        {[35, 55, 40, 70, 50, 85, 60].map((h, i) => (
          <div
            key={i}
            className="flex-1 rounded-t-md bg-[image:var(--grad-soft)]"
            style={{ height: `${h}%` }}
          />
        ))}
      </div>
      <div className="mt-2 grid grid-cols-2 gap-2">
        <div className="rounded-lg border border-line bg-surface p-2">
          <div className="h-8 w-8 rounded-full border-4 border-accent/20 border-t-accent" />
        </div>
        <div className="space-y-1.5 rounded-lg border border-line bg-surface p-2">
          {[0, 1, 2].map((i) => (
            <div key={i} className="flex gap-1">
              <div className="h-1.5 w-1.5 rounded-full bg-accent/40" />
              <div className="h-1.5 flex-1 rounded bg-accent/12" />
            </div>
          ))}
        </div>
      </div>
    </VisualShell>
  );
}

function CloudVisual({ iconName }: VisualProps) {
  return (
    <VisualShell iconName={iconName}>
      <div className="flex justify-center py-2">
        <div className="relative">
          <div className="h-12 w-20 rounded-full border border-accent/30 bg-accent/10" />
          <div className="absolute -left-3 top-2 h-8 w-12 rounded-full border border-accent/20 bg-accent/8" />
          <div className="absolute -right-2 top-3 h-7 w-10 rounded-full border border-accent/20 bg-accent/8" />
        </div>
      </div>
      <div className="mt-2 grid grid-cols-3 gap-2">
        {[0, 1, 2].map((i) => (
          <div key={i} className="rounded-lg border border-line bg-surface p-2">
            <div className="h-6 rounded bg-accent/12" />
            <div className="mt-1 flex gap-0.5">
              <div className="h-1 w-1 rounded-full bg-emerald-400/60" />
              <div className="h-1 flex-1 rounded bg-accent/10" />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-2 h-1 rounded-full bg-accent/10">
        <div className="h-full w-2/3 rounded-full bg-accent/40" />
      </div>
    </VisualShell>
  );
}

function DesignVisual({ iconName }: VisualProps) {
  return (
    <VisualShell iconName={iconName}>
      <div className="grid grid-cols-[0.35fr_1fr] gap-2">
        <div className="space-y-1.5">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="h-6 rounded border border-line bg-surface" />
          ))}
        </div>
        <div className="rounded-lg border border-dashed border-accent/30 bg-surface/50 p-2">
          <div className="h-3 w-16 rounded bg-accent/15" />
          <div className="mt-3 h-14 rounded-md border border-line bg-background" />
          <div className="mt-2 flex gap-1">
            {["#3b82f6", "#8b5cf6", "#06b6d4"].map((c) => (
              <div key={c} className="h-3 w-3 rounded-full" style={{ backgroundColor: c }} />
            ))}
          </div>
        </div>
      </div>
    </VisualShell>
  );
}

function MarketingVisual({ iconName }: VisualProps) {
  return (
    <VisualShell iconName={iconName}>
      <div className="flex items-end gap-1 px-1">
        <div className="flex-1">
          <div className="text-[0.5rem] text-muted">Reach</div>
          <div className="mt-1 h-12 rounded-t-lg bg-accent/15" />
        </div>
        <div className="flex-1">
          <div className="text-[0.5rem] text-muted">Leads</div>
          <div className="mt-1 h-20 rounded-t-lg bg-[image:var(--grad-soft)]" />
        </div>
        <div className="flex-1">
          <div className="text-[0.5rem] text-muted">ROI</div>
          <div className="mt-1 h-16 rounded-t-lg bg-accent/20" />
        </div>
      </div>
      <div className="mt-3 flex items-center gap-2 rounded-lg border border-line bg-surface p-2">
        <div className="h-8 w-8 rounded-full bg-accent/15" />
        <div className="flex-1 space-y-1">
          <div className="h-2 w-full rounded bg-accent/12" />
          <div className="h-2 w-2/3 rounded bg-accent/8" />
        </div>
      </div>
    </VisualShell>
  );
}

function EcommerceVisual({ iconName }: VisualProps) {
  return (
    <VisualShell iconName={iconName}>
      <div className="grid grid-cols-2 gap-2">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="rounded-lg border border-line bg-surface p-2">
            <div className="aspect-square rounded-md bg-[image:var(--grad-soft)]" />
            <div className="mt-1.5 h-2 w-3/4 rounded bg-accent/12" />
            <div className="mt-1 h-2 w-1/3 rounded bg-accent/20" />
          </div>
        ))}
      </div>
      <div className="mt-2 flex items-center justify-between rounded-lg border border-line bg-surface px-3 py-2">
        <div className="h-3 w-3 rounded-full bg-accent/30" />
        <div className="h-2 w-16 rounded bg-accent/15" />
        <div className="rounded-full bg-[image:var(--grad)] px-2 py-0.5 text-[0.5rem] text-white">
          Buy
        </div>
      </div>
    </VisualShell>
  );
}

function ArVrVisual({ iconName }: VisualProps) {
  return (
    <VisualShell iconName={iconName}>
      <div className="flex items-center justify-center py-2">
        <div className="relative w-[55%]">
          <div className="h-14 rounded-[2rem] border-2 border-line bg-surface" />
          <div className="absolute inset-x-4 top-3 h-8 rounded-xl bg-[image:var(--grad-soft)]" />
          <div className="absolute -right-2 top-5 h-3 w-6 rounded-r-lg border border-line bg-background" />
        </div>
      </div>
      <div className="mt-2 flex justify-center">
        <div className="relative h-16 w-16">
          <div className="absolute inset-0 rotate-12 rounded-lg border border-accent/30 bg-accent/10" />
          <div className="absolute inset-2 -rotate-6 rounded-lg border border-accent/20 bg-accent/5" />
        </div>
      </div>
    </VisualShell>
  );
}

function BackendVisual({ iconName }: VisualProps) {
  return (
    <VisualShell iconName={iconName}>
      <div className="space-y-2">
        {[0, 1, 2].map((i) => (
          <div key={i} className="flex items-center gap-2 rounded-lg border border-line bg-surface p-2">
            <div className="flex gap-0.5">
              <div className="h-1.5 w-1.5 rounded-full bg-emerald-400/70" />
              <div className="h-1.5 w-1.5 rounded-full bg-amber-400/70" />
            </div>
            <div className="flex-1 font-mono text-[0.5rem] text-muted">
              GET /api/v1/{i === 0 ? "users" : i === 1 ? "orders" : "health"}
            </div>
            <div className="rounded bg-accent/15 px-1 text-[0.45rem] text-accent">200</div>
          </div>
        ))}
      </div>
    </VisualShell>
  );
}

function QaVisual({ iconName }: VisualProps) {
  return (
    <VisualShell iconName={iconName}>
      <div className="space-y-2">
        {["Unit tests", "E2E flows", "CI pipeline"].map((label, i) => (
          <div key={label} className="flex items-center gap-2 rounded-lg border border-line bg-surface p-2">
            <div
              className={`flex h-5 w-5 items-center justify-center rounded-full ${
                i < 2 ? "bg-emerald-400/20 text-emerald-500" : "bg-accent/15 text-accent"
              }`}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3 w-3">
                {i < 2 ? <path d="M20 6 9 17l-5-5" /> : <circle cx="12" cy="12" r="4" />}
              </svg>
            </div>
            <span className="flex-1 text-[0.6rem] text-muted">{label}</span>
            <div className="h-1.5 w-12 rounded-full bg-accent/10">
              <div className="h-full rounded-full bg-accent/40" style={{ width: `${(i + 1) * 33}%` }} />
            </div>
          </div>
        ))}
      </div>
    </VisualShell>
  );
}

function VideoVisual({ iconName }: VisualProps) {
  return (
    <VisualShell iconName={iconName}>
      <div className="relative aspect-video overflow-hidden rounded-lg border border-line bg-surface">
        <div className="absolute inset-0 bg-[image:var(--grad-soft)]" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-white/20 backdrop-blur-sm">
            <div className="ml-0.5 h-0 w-0 border-y-[6px] border-l-10 border-y-transparent border-l-white" />
          </div>
        </div>
      </div>
      <div className="mt-2 flex items-center gap-2">
        <div className="h-1 flex-1 rounded-full bg-accent/15">
          <div className="h-full w-1/3 rounded-full bg-accent/50" />
        </div>
        <span className="text-[0.5rem] text-muted">1:24</span>
      </div>
    </VisualShell>
  );
}

function EnterpriseVisual({ iconName }: VisualProps) {
  return (
    <VisualShell iconName={iconName}>
      <div className="flex justify-center py-1">
        <div className="flex h-20 w-16 flex-col items-center rounded-t-lg border border-line bg-surface">
          <div className="mt-2 grid grid-cols-2 gap-1 px-2">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="h-3 w-3 rounded-sm bg-accent/20" />
            ))}
          </div>
          <div className="mt-auto h-3 w-full rounded-b-lg bg-accent/15" />
        </div>
      </div>
      <div className="mt-2 grid grid-cols-3 gap-2">
        {["ERP", "CRM", "SSO"].map((label) => (
          <div key={label} className="rounded-lg border border-line bg-surface p-1.5 text-center text-[0.5rem] text-muted">
            {label}
          </div>
        ))}
      </div>
    </VisualShell>
  );
}

const VISUAL_BY_SERVICE: Record<string, (props: VisualProps) => ReactNode> = {
  "web-development": WebVisual,
  "app-development": MobileVisual,
  "ai-ml": AiVisual,
  cybersecurity: SecurityVisual,
  iot: IotVisual,
  "data-engineering": DataVisual,
  "cloud-devops": CloudVisual,
  "ui-ux-design": DesignVisual,
  "digital-marketing": MarketingVisual,
  "ecommerce-saas": EcommerceVisual,
  "ar-vr": ArVrVisual,
  "backend-api": BackendVisual,
  "qa-automation": QaVisual,
  "video-content": VideoVisual,
  "enterprise-solutions": EnterpriseVisual,
};

type ServiceHeroVisualProps = {
  serviceId: string;
  iconName: string;
};

export default function ServiceHeroVisual({ serviceId, iconName }: ServiceHeroVisualProps) {
  const Visual = VISUAL_BY_SERVICE[serviceId] ?? WebVisual;
  return <Visual iconName={iconName} />;
}
