import type { Metadata } from "next";
import { Inter, Space_Grotesk, Noto_Sans_Arabic } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const notoArabic = Noto_Sans_Arabic({
  variable: "--font-noto-arabic",
  subsets: ["arabic"],
  display: "swap",
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: "Lesson 1-1 — Development of IT & Social Transformation",
  description:
    "Interactive Smart Board teaching application: Development of Information Technology and Social Transformation. An animated, touch-friendly digital classroom experience.",
  keywords: [
    "information technology",
    "social transformation",
    "Moore's Law",
    "cloud computing",
    "interactive lesson",
    "smart board",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${inter.variable} ${spaceGrotesk.variable} ${notoArabic.variable} h-full`}
    >
      <body className="min-h-full flex flex-col antialiased bg-white text-slate-900">{children}</body>
    </html>
  );
}
