import type { Metadata } from "next";
import localFont from "next/font/local";
import { Geist } from "next/font/google";
import { SmoothScroll } from "@/components/SmoothScroll";
import { ScrollReset } from "@/components/ScrollReset";
import "./globals.css";
import "./components.css";

const canela = localFont({
  src: [
    { path: "./fonts/Canela-Light.woff2", weight: "300", style: "normal" },
    { path: "./fonts/Canela-Regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/Canela-Medium.woff2", weight: "500", style: "normal" },
  ],
  display: "swap",
  variable: "--font-canela",
  fallback: ["Times New Roman", "serif"],
});

const geist = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist",
});

export const metadata: Metadata = {
  title: "Dragonflower Studio",
  description:
    "Dragonflower is a strategic research and narrative design studio. We uncover the human truths within complex systems and turn them into stories, strategies, and movements people can believe in.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-GB" className={`${canela.variable} ${geist.variable}`}>
      <body className="theme-default">
        <SmoothScroll />
        <ScrollReset />
        <div className="page-wrapper">{children}</div>
      </body>
    </html>
  );
}
