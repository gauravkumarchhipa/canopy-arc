"use client";

import type { Theme } from "../../lib/theme";
import HomeLoader from "./HomeLoader";

type Props = {
  initialTheme: Theme;
};

export default function HomeLoaderGate({ initialTheme }: Props) {
  return <HomeLoader isDark={initialTheme === "dark"} />;
}
