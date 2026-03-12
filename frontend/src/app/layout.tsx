import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import PageTransition from "@/components/PageTransition";
import NovaAI from "@/components/chat/NovaAI";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Novapayroll | Modern HR & Payroll",
  description: "Automated payroll and compliance for modern organizations",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light bg-[#F7F9FC]">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#F7F9FC] text-slate-900`}
      >
        <PageTransition>
          {children}
        </PageTransition>
        <NovaAI />
      </body>
    </html>
  );
}
