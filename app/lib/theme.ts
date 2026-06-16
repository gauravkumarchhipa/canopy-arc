export type Theme = "dark" | "light";

export const THEME_COOKIE = "canopy-theme";

export function resolveTheme(value: string | undefined): Theme {
  return value === "light" || value === "dark" ? value : "dark";
}
