import type { Metadata } from "next";
import localFont from "next/font/local";
import { StoreHydration } from "@/components/StoreHydration"
import "./globals.css";
import { GlobalProductModal } from "@/components/GlobalProductModal";
import Script from "next/dist/client/script";

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
  title: "Эльберд — доставка еды",
  description: "Доставка еды в вашем городе",
  icons: {
    icon: "/favicon.ico",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "Store", "GroceryStore"],

  "@id": "https://example.com/#elberd",
  name: "EL’BERD",
  url: "https://example.com",
  description: "Магазин готовых продуктов и полуфабрикатов с доставкой и самовывозом в Грозном.",

  logo: "https://example.com/logo.png",
  image: [
    "https://example.com/og-image.jpg",
    "https://example.com/storefront.jpg"
  ],

  telephone: "+7-989-919-48-71",
  email: "info@example.com",

  address: {
    "@type": "PostalAddress",
    streetAddress: "проспект Исаева, 3",
    addressLocality: "Грозный",
    addressRegion: "Чеченская Республика",
    postalCode: "364000",
    addressCountry: "RU"
  },

  geo: {
    "@type": "GeoCoordinates",
    latitude: 43.317000,
    longitude: 45.698000
  },

  hasMap: "https://yandex.ru/maps/?text=ELBERD%20%D0%93%D1%80%D0%BE%D0%B7%D0%BD%D1%8B%D0%B9",

  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"
      ],
      opens: "09:00",
      closes: "20:00"
    }
  ],

  areaServed: [
    { "@type": "City", name: "Грозный" }
  ],

  makesOffer: [
    {
      "@type": "Offer",
      name: "Доставка по городу",
      availability: "https://schema.org/InStock",
      areaServed: { "@type": "City", name: "Грозный" }
    },
    {
      "@type": "Offer",
      name: "Самовывоз из точки",
      availability: "https://schema.org/InStock",
      areaServed: { "@type": "City", name: "Грозный" }
    }
  ],

  sameAs: [
    "https://www.instagram.com/el.berd_",
    "https://wa.me/79899194871"
  ]
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
        <Script
            id="ld-json-restaurant"
            type="application/ld+json"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
        <GlobalProductModal />
      </body>
    </html>
  );
}

