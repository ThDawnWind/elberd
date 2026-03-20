"use client";

import { usePathname } from "next/navigation";
import { SearchBar } from "@/components/ui/search-bar";
import { Product } from "@/types/product";

type MobileSearchProps = {
  products: Product[];
};

export function MobileSearch({ products }: MobileSearchProps) {
  const pathname = usePathname();

  if (
    pathname === "/cart" ||
    pathname === "/favorites" ||
    pathname === "/about" ||
    pathname === "/where-to-buy"
  ) {
    return null;
  }

  return (
    <div className="lg:hidden max-md:block mx-3 md:mx-6 mt-3 mb-2.5">
      <SearchBar products={products} />
    </div>
  );
}