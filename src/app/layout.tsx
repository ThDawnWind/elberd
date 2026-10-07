import type { Metadata } from "next";
import localFont from "next/font/local";
import { StoreHydration } from "@/components/StoreHydration"
import "./globals.css";
import { GlobalProductModal } from "@/components/GlobalProductModal";
import Script from "next/script";

const onest = localFont({
  src: [
    {
      path: "./fonts/Onest-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/Onest-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/Onest-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "./fonts/Onest-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-onest",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.dawnlab.ru"),

  title: {
    default: "EL’BERD — доставка готовых блюд и продуктов в Грозном",
    template: "%s | EL’BERD",
  },

  description:
    "EL’BERD — доставка готовых блюд, полуфабрикатов и продуктов в Грозном. Каталог, самовывоз и доставка по городу.",

  applicationName: "EL’BERD",

  alternates: {
    canonical: "/",
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: "https://www.dawnlab.ru",
    siteName: "EL’BERD",
    title: "EL’BERD — доставка готовых блюд и продуктов в Грозном",
    description:
      "Готовые блюда, полуфабрикаты и продукты с доставкой и самовывозом в Грозном.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "EL’BERD — доставка готовых блюд в Грозном",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "EL’BERD — доставка готовых блюд и продуктов в Грозном",
    description:
      "Готовые блюда, полуфабрикаты и продукты с доставкой и самовывозом в Грозном.",
    images: ["/og-image.jpg"],
  },

  icons: {
    icon: "/favicon.ico",
  },
};

const siteUrl = "https://www.dawnlab.ru";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "Store", "GroceryStore"],

  "@id": `${siteUrl}/#elberd`,
  name: "EL’BERD",
  url: siteUrl,

  description:
    "Магазин готовых продуктов и полуфабрикатов с доставкой и самовывозом в Грозном.",

  logo: `${siteUrl}/logo.png`,
  image: [`${siteUrl}/og-image.jpg`],

  telephone: "+7-989-919-48-71",

  address: {
    "@type": "PostalAddress",
    streetAddress: "проспект Исаева, 3",
    addressLocality: "Грозный",
    addressRegion: "Чеченская Республика",
    postalCode: "364000",
    addressCountry: "RU",
  },

  geo: {
    "@type": "GeoCoordinates",
    latitude: 43.317,
    longitude: 45.698,
  },

  hasMap:
    "https://yandex.ru/maps/?text=ELBERD%20%D0%93%D1%80%D0%BE%D0%B7%D0%BD%D1%8B%D0%B9",

  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "09:00",
      closes: "20:00",
    },
  ],

  areaServed: [
    {
      "@type": "City",
      name: "Грозный",
    },
  ],

  sameAs: [
    "https://www.instagram.com/el.berd_",
    "https://wa.me/79899194871",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`${onest.variable} font-sans`} suppressHydrationWarning>
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

