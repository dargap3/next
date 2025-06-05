import { Geist, Geist_Mono } from "next/font/google";

import { Header } from "@/components/header";

import type { Metadata } from "next";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Weather freecodecamp App",
  description:
    "This next.js weather app is based mostly in a course provided by freecodecamp",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="bg-[#d6cbcb] min-h-screen">
          <Header />

          {children}
        </div>
      </body>
    </html>
  );
}
