import { Header } from "@/layout/Header";
import { SubHeader } from "@/layout/SubHeader";
import { Footer } from "@/layout/Footer";
import { SearchBar } from "@/components/ui/search-bar";
import { Metadata } from "next/dist/lib/metadata/types/metadata-interface";
import { Suspense } from "react";

export const metadata: Metadata = {
  metadataBase: new URL("https://твой-домен.ru"),
};

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
 <div className="flex flex-col w-full">
      <Header />

      <div className="lg:hidden max-md:block mx-3 md:mx-6 mt-3 mb-2.5">
        <SearchBar />
      </div>

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