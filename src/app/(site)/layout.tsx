import { Header } from "@/components/layout/Header";
import { SubHeader } from "@/components/layout/SubHeader";
import { Footer } from "@/components/layout/Footer";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col w-full min-h-screen">
      <Header />
      <SubHeader />
      {children}
      <Footer />
    </div>
  );
}