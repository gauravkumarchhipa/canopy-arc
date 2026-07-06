"use client";

import type { ReactNode } from "react";
import ThemeToggle from "../../components/layout/ThemeToggle";
import type { Theme } from "../../lib/theme";
import AuthLeftPanel from "./AuthLeftPanel";

type Props = {
  children: ReactNode;
  initialTheme: Theme;
};

export default function AuthShell({ children, initialTheme }: Props) {
  return (
    <div className="relative min-h-screen overflow-y-auto bg-background">
      <div className="grid min-h-screen lg:grid-cols-2">
        <div className="hidden lg:block">
          <AuthLeftPanel />
        </div>

        <div className="relative flex min-h-screen w-full flex-col justify-center px-5 py-8 sm:px-8 sm:py-10 lg:px-14 xl:px-20">
          <div className="absolute right-5 top-5 sm:right-8 sm:top-8">
            <ThemeToggle initialTheme={initialTheme} />
          </div>

          <div className="mx-auto w-full max-w-md lg:max-w-md">{children}</div>
        </div>
      </div>
    </div>
  );
}
