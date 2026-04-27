"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  motion,
  AnimatePresence,
  cubicBezier,
  LayoutGroup,
} from "motion/react";

import CatalogHeader from "@/components/catalog/CatalogHeader";
import CatalogToolbar from "@/components/catalog/CatalogToolbar";
import FiltersSidebar from "@/components/catalog/FiltersSidebar";
import ProductsGrid from "@/components/catalog/ProductsGrid";
import ProductsList from "@/components/catalog/ProductsList";

import type { ProductSort } from "@/services/prismic/queries/products";
import type { Category } from "@/types";
import { useCatalogUIStore } from "@/stores/catalog.store";
import { filters } from "@/lib/constants";
import { Product } from "@/types/product";
import { ProductsErrorState } from "@/components/ProductsState";
import { DishCardGridSkeleton, DishCardListSkeleton } from "@/components/ui/DishCardSkeleton";

const pageFade = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.5, ease: cubicBezier(0.16, 1, 0.3, 1) },
  },
};

type CatalogClientProps = {
  products: Product[];
  categories: Category[];
  currentCategory: string;
  currentSort: ProductSort;
  currentSearch: string;
  totalPages: number;
  totalResultsSize: number;
  error: {
    code: string;
    message: string;
    retryable: boolean;
  } | null;
};

const DEFAULT_PRICE_RANGE: [number, number] = [50, 2600];
const PAGE_SIZE = 8;

export default function CatalogClient({
  products,
  categories,
  currentCategory,
  currentSort,
  currentSearch,
  totalPages,
  totalResultsSize,
  error,
}: CatalogClientProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const ref = useRef<HTMLDivElement | null>(null)

  const viewMode = useCatalogUIStore((s) => s.viewMode);
  const setViewMode = useCatalogUIStore((s) => s.setViewMode);
  const isLoading = useCatalogUIStore((s) => s.isLoading);

  const initialMin = Number(searchParams.get("min") ?? DEFAULT_PRICE_RANGE[0]);
  const initialMax = Number(searchParams.get("max") ?? DEFAULT_PRICE_RANGE[1]);
  const initialPage = Number(searchParams.get("page") ?? 1);

  const [priceRange, setPriceRange] = useState<[number, number]>([
    Number.isNaN(initialMin) ? DEFAULT_PRICE_RANGE[0] : initialMin,
    Number.isNaN(initialMax) ? DEFAULT_PRICE_RANGE[1] : initialMax,
  ]);

  const [loadedProducts, setLoadedProducts] = useState(products);
  const [page, setPage] = useState(initialPage);
  const [hasMore, setHasMore] = useState(initialPage < totalPages);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  useEffect(() => {
    const min = Number(searchParams.get("min") ?? DEFAULT_PRICE_RANGE[0]);
    const max = Number(searchParams.get("max") ?? DEFAULT_PRICE_RANGE[1]);

    setPriceRange([
      Number.isNaN(min) ? DEFAULT_PRICE_RANGE[0] : min,
      Number.isNaN(max) ? DEFAULT_PRICE_RANGE[1] : max,
    ]);
  }, [searchParams]);

  useEffect(() => {
    const currentPage = Number(searchParams.get("page") ?? 1);

    setLoadedProducts(products);
    setPage(currentPage);
    setHasMore(currentPage < totalPages);
  }, [products, searchParams, totalPages]);

    const loadMore = useCallback(async () => {
          if (isLoadingMore || !hasMore) return;

          setIsLoadingMore(true);

          try {
            const nextPage = page + 1;

            const params = new URLSearchParams(searchParams.toString());
            params.set("page", String(nextPage));
            params.set("pageSize", String(PAGE_SIZE));

            const res = await fetch(`/api/catalog?${params.toString()}`);

            if (!res.ok) {
              throw new Error(`Ошибка загрузки: ${res.status}`);
            }

            const data = await res.json();

            setLoadedProducts((prev) => [...prev, ...data.results]);
            setPage(data.page);
            setHasMore(data.page < data.total_pages);
          } catch (error) {
            console.error("[CatalogClient] loadMore error:", error);
          } finally {
            setIsLoadingMore(false);
          }
    }, [hasMore, isLoadingMore, page, searchParams])

  useEffect(() => {
    const node = ref.current;

    if (!node || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const firstEntry = entries[0];

        if (firstEntry?.isIntersecting && !isLoadingMore) {
          loadMore();
        }
      },
      {
        root: null,
        rootMargin: "300px 0px",
        threshold: 0,
      }
    );

    observer.observe(node)

    return () => {
      observer.disconnect();
    }
  }, [hasMore, isLoadingMore, loadMore])

  const isNewSelected = searchParams.get("new") === "1";
  const isHitSelected = searchParams.get("hit") === "1";

  const selectedFilters = [
    ...(isNewSelected ? ["new"] : []),
    ...(isHitSelected ? ["hit"] : []),
  ];

  const updateParams = (updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(updates).forEach(([key, value]) => {
      if (!value || value === "all") {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });

    params.set("page", "1");

    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  };

  const resetFilters = () => {
    setPriceRange(DEFAULT_PRICE_RANGE);
    router.replace(pathname, { scroll: false });
  };

  const handlePriceChange = (value: [number, number]) => {
    setPriceRange(value);

    updateParams({
      min: String(value[0]),
      max: String(value[1]),
    });
  };

  const toggleFilter = (id: string) => {
    if (id === "new") {
      updateParams({
        new: isNewSelected ? null : "1",
      });
      return;
    }

    if (id === "hit") {
      updateParams({
        hit: isHitSelected ? null : "1",
      });
    }
  };

  const selectedCategoryName =
    currentCategory === "all"
      ? "Все товары"
      : categories.find((c) => c.slug === currentCategory)?.name || "Каталог";

  return (
    <motion.div
      className="bg-background min-h-screen"
      variants={pageFade}
      initial="hidden"
      animate="show"
    >
      <CatalogHeader title="Каталог" />

      <div className="mx-1 sm:mx-[60px] px-4 xs:px-0 py-6 xs:py-1">
        <div className="flex lg:flex-row flex-col gap-6">
          <aside className="hidden lg:block lg:w-1/5">
            <FiltersSidebar
              categories={categories}
              currentCategory={currentCategory}
              currentSort={currentSort}
              currentSearch={currentSearch}
              onCategoryChange={(value: string) =>
                updateParams({ category: value === "all" ? null : value })
              }
              onSortChange={(value: ProductSort) => updateParams({ sort: value })}
              onReset={resetFilters}
              priceRange={priceRange}
              setPriceRange={handlePriceChange}
              selectedFilters={selectedFilters}
              toggleFilter={toggleFilter}
            />
          </aside>

          <div className="lg:w-full">
            <div className="flex sm:flex-row flex-col justify-between items-start sm:items-center gap-4 mb-6">
              <div>
                <h2 className="font-semibold text-lg">{selectedCategoryName}</h2>
                <p className="font-light text-muted-foreground text-sm">
                  {error
                    ? "Не удалось загрузить товары"
                    : `Найдено ${totalResultsSize} товаров`}
                </p>
              </div>
            </div>

            <CatalogToolbar
              categories={categories}
              currentCategory={currentCategory}
              currentSort={currentSort}
              currentSearch={currentSearch}
              setCategory={(value: string) =>
                updateParams({ category: value === "all" ? null : value })
              }
              setSort={(value: ProductSort) => updateParams({ sort: value })}
              setSearch={(value: string) =>
                updateParams({ search: value.trim() ? value : null })
              }
              priceRange={priceRange}
              setPriceRange={handlePriceChange}
              selectedFilters={selectedFilters}
              toggleFilter={toggleFilter}
              filters={filters}
              viewMode={viewMode}
              setViewMode={setViewMode}
              resetFilters={resetFilters}
            />

            <LayoutGroup id="catalog">
              <div className="justify-center">
                {error ? (
                  <div className="py-8">
                    <ProductsErrorState
                      code={error.code}
                      message={error.message}
                      retryable={error.retryable}
                      onRetry={() => router.refresh()}
                    />
                  </div>
                ) : loadedProducts.length === 0 ? (
                  <div className="py-12 font-mono font-light text-center">
                    <h3 className="font-semibold text-lg">Товары не найдены</h3>
                    <p className="mt-2 text-muted-foreground">
                      Попробуйте изменить поиск, сортировку или выбрать другую категорию
                    </p>
                    <button
                      onClick={resetFilters}
                      className="mt-4 px-4 py-2 border rounded-md"
                      type="button"
                    >
                      Сбросить фильтры
                    </button>
                  </div>
                ) : viewMode === "grid" ? (
                  <AnimatePresence mode="popLayout">
                    <ProductsGrid isLoading={isLoading} products={loadedProducts} />
                  </AnimatePresence>
                ) : (
                  <AnimatePresence mode="popLayout">
                    <ProductsList isLoading={isLoading} products={loadedProducts} />
                  </AnimatePresence>
                )}
              </div>
            </LayoutGroup>

            {!error && loadedProducts.length > 0  && (
                  <div className="mt-6">
                    <div ref={ref} className="w-full h-10" />

                    {isLoadingMore && viewMode === "grid" && (
                      <div className="justify-center gap-[8px] grid grid-cols-[repeat(auto-fill,265px)] mt-4">
                        {Array.from({ length: 4 }).map((_, i) => (
                          <DishCardGridSkeleton key={i} />
                        ))}
                      </div>
                    )}


                     {isLoadingMore && viewMode === "list" && (
                      <div className="justify-center gap-[8px] grid grid-cols-[repeat(auto-fill,265px)] mt-4">
                        {Array.from({ length: 1 }).map((_, i) => (
                          <DishCardListSkeleton key={i} />
                        ))}
                      </div>
                    )}


                    {!hasMore && (
                      <div className="mt-4 font-mono text-muted-foreground text-sm text-center">
                        Все товары загружены
                      </div>
                    )}
                  </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
