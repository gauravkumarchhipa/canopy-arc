import Heading from "../components/ui/Heading";
import SignOutButton from "./SignOutButton";
import GlowHoverCard from "../components/ui/GlowHoverCard";
import {
  glowHoverCardText,
  glowHoverCardTitle,
} from "../components/ui/glow-card-styles";
import { tw } from "../lib/tw";

type Props = {
  email: string;
};

export default function DashboardContent({ email }: Props) {
  return (
    <div className={`${tw.pageShell} ${tw.pageShellBottom}`}>
      <div className="mx-auto max-w-350 px-6 lg:px-10">
        <p className="text-xs tracking-[0.3em] uppercase text-muted">Dashboard</p>
        <Heading level={1} className="mt-5 font-display text-[clamp(2rem,4vw,3rem)] leading-[1.05] tracking-tight">
          Welcome back
        </Heading>
        <p className="mt-4 max-w-2xl text-muted">
          You are signed in as{" "}
          <span className="font-medium text-foreground">{email}</span>.
        </p>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          <GlowHoverCard className="p-6 sm:p-7 lg:col-span-2">
            <Heading className={glowHoverCardTitle}>Your workspace</Heading>
            <p className={`${glowHoverCardText} mt-4`}>
              This is your protected dashboard. Only signed-in users with a valid
              session cookie can access this page.
            </p>
          </GlowHoverCard>

          <GlowHoverCard className="p-6 sm:p-7">
            <Heading className={glowHoverCardTitle}>Account</Heading>
            <p className={`${glowHoverCardText} mt-4 break-all`}>{email}</p>
            <SignOutButton />
          </GlowHoverCard>
        </div>
      </div>
    </div>
  );
}
