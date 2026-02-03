import { Header } from "@/layout/Header";
import { SubHeader } from "@/layout/SubHeader";
import { Footer } from "@/layout/Footer";

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