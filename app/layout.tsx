import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";

const font = Rubik({ subsets: ["arabic"] });

export const metadata: Metadata = {
  title: "NOTE BASIC 🚀",
  description: "created by cwpslxck",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="rtl">
      <body className={font.className}>{children}</body>
    </html>
  );
}
