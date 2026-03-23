import type { Metadata } from "next";
import CatalogClient from "./CatalogClient";
import {
  getProducts,
  ProductsServiceError,
  type ProductSort,
} from "@/services/prismic/queries/products";
import { CATEGORIES } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Каталог | EL’BERD",
  description: "Каталог продуктов EL’BERD. Фильтры по категориям и сортировка.",
  alternates: { canonical: "/catalog" },
};

type CatalogPageProps = {
  searchParams: {
    category?: string;
    sort?: string;
    search?: string;
    page?: string;
    min?: string;
    max?: string;
    new?: string;
    hit?: string;
  };
};

export default async function CatalogPage({ searchParams }: CatalogPageProps) {
  const currentCategory = searchParams.category ?? "all";
  const currentSort = (searchParams.sort ?? "newest") as ProductSort;
  const currentSearch = searchParams.search ?? "";
  const page = Number(searchParams.page ?? "1");
  const min = Number(searchParams.min ?? "50");
  const max = Number(searchParams.max ?? "2600");

  const isNew = searchParams.new === "1";
  const isHit = searchParams.hit === "1";

  

  try {
    const productsData = await getProducts({
      categorySlug: currentCategory,
      sort: currentSort,
      search: currentSearch,
      page,
      pageSize: 114,
      min,
      max,
      isNew,
      isHit,
    });

    return (
      <div className="mx-auto px-4 max-w-[1440px]">
        <CatalogClient
          products={productsData.results}
          categories={CATEGORIES}
          currentCategory={currentCategory}
          currentSort={currentSort}
          currentSearch={currentSearch}
          error={null}
        />
      </div>
    );
  } catch (error) {
    if (error instanceof ProductsServiceError) {
      console.error("[CatalogPage]", {
        code: error.code,
        status: error.status,
        message: error.message,
        userMessage: error.userMessage,
        details: error.details,
      });

      return (
        <div className="mx-auto px-4 max-w-[1440px]">
          <CatalogClient
            products={[]}
            categories={CATEGORIES}
            currentCategory={currentCategory}
            currentSort={currentSort}
            currentSearch={currentSearch}
            error={{
              code: error.code,
              message: error.userMessage,
              retryable: error.retryable,
            }}
          />
        </div>
      );
    }

    return (
      <div className="mx-auto px-4 max-w-[1440px]">
        <CatalogClient
          products={[]}
          categories={CATEGORIES}
          currentCategory={currentCategory}
          currentSort={currentSort}
          currentSearch={currentSearch}
          error={{
            code: "UNKNOWN",
            message: "Не удалось загрузить каталог.",
            retryable: true,
          }}
        />
      </div>
    );
  }
}