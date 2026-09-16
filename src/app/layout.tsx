import type { Metadata } from "next";
import { Caveat, Fraunces, Nunito, Source_Serif_4 } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fraunces",
  axes: ["SOFT", "opsz", "WONK"],
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-source-serif",
  style: ["normal", "italic"],
});

const caveat = Caveat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-caveat",
});

const nunito = Nunito({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-nunito",
});

export const metadata: Metadata = {
  title: {
    default: "Maccu — Little art. Big memories.",
    template: "%s — Maccu",
  },
  description: "Turn their drawings into a childhood you can keep.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${fraunces.variable} ${sourceSerif.variable} ${caveat.variable} ${nunito.variable} h-full antialiased`}
    >
      <body className="paper-grain min-h-full">{children}</body>
    </html>
  );
}
