import { cookies } from "next/headers";
import { resolveTheme, THEME_COOKIE } from "../lib/theme";
import AuthShell from "./components/AuthShell";

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const theme = resolveTheme(cookieStore.get(THEME_COOKIE)?.value);

  return <AuthShell initialTheme={theme}>{children}</AuthShell>;
}
