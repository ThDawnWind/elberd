import type { Metadata } from "next";
import localFont from "next/font/local";
import { StoreHydration } from "@/components/StoreHydration"
import "./globals.css";
import { GlobalProductModal } from "@/components/GlobalProductModal";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Эльберд - Доставка еды",
  description: "Заказывайте вкусные готовые блюда с доставкой",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`${geistSans.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <body className="antialiased">
        <StoreHydration />
        {children}
        <GlobalProductModal />
      </body>
    </html>
  );
}

