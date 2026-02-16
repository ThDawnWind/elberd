import { Header } from "@/layout/Header";
import { SubHeader } from "@/layout/SubHeader";
import { Footer } from "@/layout/Footer";
import { SearchBar } from "@/components/ui/search-bar";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col mx-auto w-full max-w-[1440px]">
      <Header />
      
      <div className="lg:hidden max-md:block mx-3 md:mx-6 mt-3 mb-2.5">
        <SearchBar />
      </div>

      <SubHeader />

      <main className="flex-1">
        {children}
      </main>

      <Footer />
    </div>
  );
}