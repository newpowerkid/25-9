import "~/style/globals.css";

import type { Metadata } from "next";

import { Geist, Geist_Mono } from "next/font/google";
import { getLocale } from "next-intl/server";
import { fontBarrio } from "~/assets/fonts";

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});
const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });

export const metadata: Metadata = {
  description: "Next.js + Elysia + BetterAuth",
  title: "Application template for Next.js with Elysia backend and BetterAuth",
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const locale = await getLocale();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`${geist.variable} ${geistMono.variable} ${fontBarrio.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
