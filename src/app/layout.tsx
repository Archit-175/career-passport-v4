import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import "slot-text/style.css";
import { Nav } from "@/components/layout/Nav";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Career Passport — Own Your Professional Story",
  description:
    "The verified professional passport that proves what you've done, not just what you claim. Join the waitlist.",
  keywords: ["career", "professional", "passport", "verified", "hiring", "talent"],
  openGraph: {
    title: "Career Passport — Own Your Professional Story",
    description: "The verified professional passport that proves what you've done.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="grain">
        <Nav />
        <main>{children}</main>
      </body>
    </html>
  );
}
