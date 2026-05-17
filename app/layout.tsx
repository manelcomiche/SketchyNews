import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const rubik = Rubik({
  subsets: ["latin"],
  variable: "--font-rubik",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SketchyNews — News into AI Art",
  description:
    "Transform any news headline into a striking AI-generated illustration using DALL-E 3.",
  icons: { icon: "/assets/favicon.ico" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={rubik.variable} suppressHydrationWarning>
      <body className="antialiased min-h-screen flex flex-col font-[family-name:var(--font-rubik)]">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
