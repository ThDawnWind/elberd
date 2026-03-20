import { Header } from "@/layout/header/Header";
import { SubHeader } from "@/layout/SubHeader";
import { Footer } from "@/layout/Footer";
import type { Metadata } from "next";
import { Suspense } from "react";
import { MobileSearch } from "@/layout/MobileSearch";
import { getSearchProducts } from "@/services/prismic/queries/search";

export const metadata: Metadata = {
  metadataBase: new URL("https://твой-домен.ru"),
};

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  
const searchProducts = await getSearchProducts();

  return (
 <div className="flex flex-col w-full">
  
      <Header searchProducts={searchProducts} />

      <MobileSearch products={searchProducts} />


      <div className="mx-auto px-4 w-full max-w-[1440px]">
        <Suspense fallback={null}>
          <SubHeader />
        </Suspense>
      </div>

      <main className="flex-1">
        {children}
      </main>

      <Footer />
    </div>
  );
}