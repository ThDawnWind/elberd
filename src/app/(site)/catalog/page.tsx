import type { Metadata } from "next";
import CatalogClient from "./CatalogClient";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Каталог | EL’BERD",
  description: "Каталог продуктов EL’BERD. Фильтры по категориям, цене и сортировка.",
  alternates: { canonical: "/catalog" },
};

export default function CatalogPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const category = typeof searchParams.category === "string" ? searchParams.category : undefined;

  return  <Suspense fallback={null}>
            <div className="mx-auto px-4 max-w-[1440px]">
              <CatalogClient initialCategorySlug={category} />
            </div>
          </Suspense>     
}

  