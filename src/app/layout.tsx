import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";

import { QueryProvider } from "@/components/QueryProvider/QueryProvider";

import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Matchspace Music - Find your music teacher",
    template: "%s | Matchspace Music",
  },
  description:
    "Browse qualified music teachers across Switzerland, compare instruments and prices, and book your first lesson online.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${jakarta.variable} h-full antialiased`}>
      <body
        suppressHydrationWarning
        className="flex min-h-screen flex-col font-sans"
      >
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
