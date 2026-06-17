import type { Metadata } from "next";
import { cookies } from "next/headers";
import { Fraunces, Manrope } from "next/font/google";
import "./globals.css";
import SmoothScroll from "./components/layout/SmoothScroll";
// import CustomCursor from "./components/layout/CustomCursor";
import RegisterSW from "./components/webworkers/RegisterSW";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import HomeLoader from "./components/home/HomeLoader";
import ThemeProvider from "./components/layout/ThemeProvider";
import { resolveTheme, THEME_COOKIE } from "./lib/theme";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["opsz", "SOFT", "WONK"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Canopy Arc — We build digital experiences that connect & protect",
  description:
    "Enterprise-grade web, mobile, cloud, and AI solutions. We design and engineer scalable, secure, and future-ready products that drive real business impact.",
  keywords: [
    "Canopy Arc",
    "web development",
    "mobile apps",
    "AI and machine learning",
    "cloud and devops",
    "UI/UX design",
    "data engineering",
  ],
  openGraph: {
    title: "Canopy Arc — Digital solutions",
    description:
      "We build scalable, secure, and future-ready products: web, mobile, cloud, AI, and design.",
    type: "website",
  },
  icons: {
    icon: [
      { url: "/favicon-mark.png", type: "image/svg+xml" },
      { url: "/favicon-mark.png", sizes: "512x512", type: "image/png" },
      { url: "/favicon-mark.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-mark.png", sizes: "192x192", type: "image/png" },
      { url: "/favicon-mark.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/favicon-mark.png", sizes: "180x180", type: "image/png" }],
    shortcut: "/favicon.ico",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const theme = resolveTheme(cookieStore.get(THEME_COOKIE)?.value);

  return (
    <html
      lang="en"
      data-theme={theme}
      suppressHydrationWarning
      className={`${fraunces.variable} ${manrope.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <ThemeProvider initialTheme={theme}>
          <RegisterSW />
          <HomeLoader />
          <SmoothScroll>
            {/* <CustomCursor /> */}
            <Header initialTheme={theme} />
            <main className="flex-1">{children}</main>
            <Footer />
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
