import type { Metadata } from "next";
import CatalogClient from "./CatalogClient";
import {
  getProducts,
  ProductsServiceError,
  type ProductSort,
} from "@/services/prismic/queries/products";
import { CATEGORIES } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Каталог готовых блюд и продуктов",
  description:
    "Каталог EL’BERD: готовые блюда, полуфабрикаты и продукты с доставкой и самовывозом в Грозном. Категории, поиск и сортировка.",
  alternates: {
    canonical: "/catalog",
  },
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
      pageSize: 8,
      min,
      max,
      isNew,
      isHit,
    });

    return (
      <div className="mx-auto px-4 max-w-[1440px]">
        <section className="py-8">
          <h1 className="font-bold text-gray-900 text-2xl sm:text-3xl lg:text-4xl">
            Каталог готовых блюд и продуктов EL’BERD
          </h1>

          <p className="mt-4 max-w-3xl text-gray-600 text-sm sm:text-base leading-relaxed">
            В каталоге EL’BERD собраны готовые блюда, полуфабрикаты и продукты
            для заказа в Грозном. Используйте категории, поиск и сортировку,
            чтобы быстрее найти подходящие позиции.
          </p>
        </section>
        <CatalogClient
          products={productsData.results}
          categories={CATEGORIES}
          currentCategory={currentCategory}
          currentSort={currentSort}
          currentSearch={currentSearch}
          totalPages={productsData.total_pages}
          totalResultsSize={productsData.total_results_size}
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
            totalPages={1}
            totalResultsSize={0}
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
          totalPages={1}
          totalResultsSize={0}
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
