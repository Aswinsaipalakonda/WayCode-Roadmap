import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "WayCode — Asynchronous Mobile Gateway for Autonomous AI Engineering",
  description: "An Asynchronous Mobile Gateway for Autonomous Software Engineering Agents. Prompt, monitor, approve, and deploy code from anywhere.",
  manifest: "/manifest.json",
  icons: {
    icon: "/images/logo.svg",
    apple: "/images/logo.svg",
  },
  openGraph: {
    title: "WayCode — Mobile Gateway for AI Coding Agents",
    description: "An Asynchronous Mobile Gateway for Autonomous Software Engineering Agents",
    images: ["/images/logo.svg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#0F172A",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="icon" type="image/svg+xml" href="/images/logo.svg" />
      </head>
      <body className={`${inter.variable} font-sans h-full bg-background text-foreground antialiased selection:bg-primary/20`}>
        {children}
      </body>
    </html>
  );
}
