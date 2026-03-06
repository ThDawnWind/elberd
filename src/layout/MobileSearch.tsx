"use client";

import { usePathname } from "next/navigation";
import { SearchBar } from "@/components/ui/search-bar";

export function MobileSearch() {
  const pathname = usePathname();

  if (pathname === "/cart") return null;
  if (pathname === "/favorites") return null;
  if (pathname === "/about") return null;
  if (pathname === "/where-to-buy") return null;

  return (
    <div className="lg:hidden max-md:block mx-3 md:mx-6 mt-3 mb-2.5">
      <SearchBar />
    </div>
  );
}