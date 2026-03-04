"use client";

import { useEffect, useMemo, useRef } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence, cubicBezier, LayoutGroup } from "motion/react";

import { CATEGORIES, filters } from "@/lib/constants";
import { PRODUCTS } from "@/lib/products";
import { useCatalogStore } from "@/stores/catalog.store";

import CatalogHeader from "@/components/catalog/CatalogHeader";
import CatalogToolbar from "@/components/catalog/CatalogToolbar";
import FiltersSidebar from "@/components/catalog/FiltersSidebar";
import ProductsGrid from "@/components/catalog/ProductsGrid";
import ProductsList from "@/components/catalog/ProductsList";

import { filterProducts } from "@/lib/catalog/filterProducts";
import {
  buildCatalogQueryString,
  parseCatalogSearchParams,
  categoryIdFromSlug,
  categorySlugFromId,
} from "@/lib/catalog/url";
import { SortKey } from "@/types";

const pageFade = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 1.5, ease: cubicBezier(0.16, 1, 0.3, 1) } },
};

const PRICE_LIMITS = { min: 50, max: 2600 };

export default function CatalogClient({ initialCategorySlug }: { initialCategorySlug?: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const viewMode = useCatalogStore((s) => s.viewMode);
  const setViewMode = useCatalogStore((s) => s.setViewMode);

  const priceRange = useCatalogStore((s) => s.priceRange);
  const setPriceRange = useCatalogStore((s) => s.setPriceRange);

  const selectedTags = useCatalogStore((s) => s.selectedTags);
  const toggleTag = useCatalogStore((s) => s.toggleTag);
  const setSelectedTags = useCatalogStore((s) => s.setSelectedTags);

  const selectedCategoryId = useCatalogStore((s) => s.selectedCategoryId);
  const setSelectedCategoryId = useCatalogStore((s) => s.setSelectedCategoryId);

  const sort = useCatalogStore((s) => s.sort);
  const setSort = useCatalogStore((s) => s.setSort);

  const resetFilters = useCatalogStore((s) => s.resetFilters);

  const lastAppliedQueryRef = useRef<string>("");

  useEffect(() => {
    const sp = new URLSearchParams(searchParams.toString());

    if (!sp.get("category") && initialCategorySlug) {
      sp.set("category", initialCategorySlug);
    }

    const parsed = parseCatalogSearchParams({
      searchParams: sp,
      categories: CATEGORIES,
      filters,
      priceLimits: PRICE_LIMITS,
    });

    const nextCategoryId = categoryIdFromSlug(CATEGORIES, parsed.categorySlug);
    const nextMin = typeof parsed.min === "number" ? parsed.min : PRICE_LIMITS.min;
    const nextMax = typeof parsed.max === "number" ? parsed.max : PRICE_LIMITS.max;
    const nextSort = parsed.sort ?? "rating";
    const nextTags = parsed.tags ?? [];

    if (selectedCategoryId !== nextCategoryId) setSelectedCategoryId(nextCategoryId);
    if (priceRange[0] !== nextMin || priceRange[1] !== nextMax) setPriceRange([nextMin, nextMax]);
    if (sort !== nextSort) setSort(nextSort as SortKey);

    const tagsStr = selectedTags.slice().sort().join(",");
    const nextTagsStr = nextTags.slice().sort().join(",");
    if (tagsStr !== nextTagsStr) setSelectedTags(nextTags);

    lastAppliedQueryRef.current = sp.toString();
  }, [searchParams, initialCategorySlug, setSelectedCategoryId, setPriceRange, setSort, setSelectedTags, selectedCategoryId, priceRange, sort, selectedTags]);

  useEffect(() => {
    const categorySlug = categorySlugFromId(CATEGORIES, selectedCategoryId);

    const qs = buildCatalogQueryString({
      categorySlug,
      min: priceRange[0],
      max: priceRange[1],
      sort: sort,
      tags: selectedTags,
      priceLimits: PRICE_LIMITS,
    });

    const next = qs.startsWith("?") ? qs.slice(1) : qs;

    if (next === lastAppliedQueryRef.current) return;

    router.replace(`${pathname}${qs}`, { scroll: false });
    lastAppliedQueryRef.current = next;
  }, [pathname, router, selectedCategoryId, priceRange, sort, selectedTags]);

  const filteredProducts = useMemo(() => {
    return filterProducts({
      products: PRODUCTS,
      categories: CATEGORIES,
      filters,
      selectedCategoryId,
      priceRange,
      selectedTags,
      sort,
    });
  }, [selectedCategoryId, priceRange, selectedTags, sort]);

  const selectedCategoryName =
    selectedCategoryId === 0 ? "Все товары" : CATEGORIES.find((c) => c.id === selectedCategoryId)?.name || "Каталог";

  return (
    <motion.div className="bg-background min-h-screen font-sans" variants={pageFade} initial="hidden" animate="show">
      <CatalogHeader title="Каталог" />

      <div className="mx-1 sm:mx-[60px] px-4 xs:px-0 py-6 xs:py-1">
        <div className="flex lg:flex-row flex-col gap-6">
          <aside className="hidden lg:block lg:w-1/5">
            <FiltersSidebar
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              selectedFilters={selectedTags}
              toggleFilter={toggleTag}
              selectedCategory={selectedCategoryId}
              setSelectedCategory={setSelectedCategoryId}
              resetFilters={resetFilters}
            />
          </aside>

          <div className="lg:w-2/2">
            <div className="flex sm:flex-row flex-col justify-between items-start sm:items-center gap-4 mb-6">
              <div>
                <h2 className="font-sans font-semibold text-lg">{selectedCategoryName}</h2>
                <p className="font-mono font-normal text-muted-foreground text-sm">Найдено {filteredProducts.length} товаров</p>
              </div>

              <div className="flex flex-wrap gap-2 font-sans font-semibold">
                {selectedTags.map((filterId) => (
                  <button
                    key={filterId}
                    onClick={() => toggleTag(filterId)}
                    className="bg-background hover:bg-muted px-3 border rounded-md h-7 text-xs"
                    type="button"
                  >
                    {filters.find((f) => f.id === filterId)?.label} ×
                  </button>
                ))}
              </div>
            </div>

            <CatalogToolbar
              sort={sort}
              setSort={setSort}
              viewMode={viewMode}
              setViewMode={setViewMode}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              selectedTags={selectedTags}
              toggleTag={toggleTag}
              selectedCategoryId={selectedCategoryId}
              setSelectedCategoryId={setSelectedCategoryId}
              resetFilters={resetFilters}
              filters={filters}
            />
<LayoutGroup id="catalog">

       {filteredProducts.length === 0 ? (
              <div className="py-12 font-mono font-light text-center">
                <h3 className="font-semibold text-lg">Товары не найдены</h3>
                <p className="mt-2 text-muted-foreground">Попробуйте изменить фильтры или выбрать другую категорию</p>
                <button onClick={resetFilters} className="mt-4 px-4 py-2 border rounded-md" type="button">
                  Сбросить фильтры
                </button>
              </div>
            ) : viewMode === "grid" ? (
              <AnimatePresence mode="popLayout">
                <ProductsGrid products={filteredProducts} />
              </AnimatePresence>
            ) : (
              <AnimatePresence mode="popLayout">
                <ProductsList products={filteredProducts} />
              </AnimatePresence>
            )}
</LayoutGroup>
       
          </div>
        </div>
      </div>
    </motion.div>
  );
}