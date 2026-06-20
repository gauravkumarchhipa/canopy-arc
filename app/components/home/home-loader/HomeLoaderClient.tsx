"use client";

import { useTheme } from "../../layout/ThemeProvider";
import LoaderBrand from "./LoaderBrand";
import LoaderProgress from "./LoaderProgress";
import LoaderScene from "./LoaderScene";
import { getLoaderThemeClasses } from "./loader-theme";
import { useLoaderLifecycle } from "./useLoaderLifecycle";
import "../home-loader.css";

export interface HomeLoaderProps {
  /** Override theme for design preview */
  isDark?: boolean;
  /** When false, progress loops for preview; production uses true */
  autoFinish?: boolean;
}

export default function HomeLoaderClient({
  isDark: isDarkProp,
  autoFinish = true,
}: HomeLoaderProps) {
  const theme = useTheme();
  const isDark = isDarkProp ?? theme === "dark";
  const { stage, progress, mounted } = useLoaderLifecycle({ autoFinish });
  const themeClasses = getLoaderThemeClasses(isDark);

  if (mounted && stage === "gone") return null;

  return (
    <div
      className={`fixed inset-0 z-[9990] overflow-hidden transition-opacity duration-700 ease-out ${
        stage === "out" ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
      aria-hidden
      aria-busy={stage === "in"}
    >
      <LoaderScene isDark={isDark} />
      <LoaderBrand isDark={isDark} {...themeClasses} />
      <LoaderProgress isDark={isDark} progress={progress} {...themeClasses} />
    </div>
  );
}
