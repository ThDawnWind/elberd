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
    <div className="flex flex-col w-full min-h-screen">
      <Header />
     <div className="lg:hidden max-md:block flex-1 mx-3 md:mx-6 lg:mx-8 mt-3 mb-2.5 min-w-0 max-w-2xl">
       <SearchBar />
      </div>
      <SubHeader />
      {children}
      <Footer />
    </div>
  );
}