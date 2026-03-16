import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "カジノルーレット - American Roulette",
  description: "本格的なアメリカンルーレット体験",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
