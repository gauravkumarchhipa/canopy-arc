import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";
import "./globals.css";
import SmoothScroll from "./components/layout/SmoothScroll";
import CustomCursor from "./components/layout/CustomCursor";
import RegisterSW from "./components/webworkers/RegisterSW";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import HomeLoader from "./components/home/HomeLoader";

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
};

const THEME_INIT_SCRIPT = `
try {
  var t = localStorage.getItem('canopy-theme');
  if (t === 'light' || t === 'dark') {
    document.documentElement.dataset.theme = t;
  } else {
    document.documentElement.dataset.theme = 'dark';
  }
} catch (e) {
  document.documentElement.dataset.theme = 'dark';
}
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme="dark"
      suppressHydrationWarning
      className={`${fraunces.variable} ${manrope.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <RegisterSW />
        <HomeLoader />
        <SmoothScroll>
          <CustomCursor />
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
