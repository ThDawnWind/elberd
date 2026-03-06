"use client";

import { Grid3X3, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MobileFiltersSheet } from "@/components/ui/MobileFiltersSheet";
import type { FilterItem, SortKey } from "@/types";

type CatalogToolbarProps = {
  sort: SortKey;
  setSort: (v: SortKey) => void;

  viewMode: "grid" | "list";
  setViewMode: (v: "grid" | "list") => void;

  priceRange: [number, number];
  setPriceRange: (v: [number, number]) => void;

  selectedTags: string[];
  toggleTag: (id: string) => void;

  selectedCategoryId: number;
  setSelectedCategoryId: (id: number) => void;

  resetFilters: () => void;
  filters: FilterItem[];
};

export default function CatalogToolbar({
  sort,
  setSort,
  viewMode,
  setViewMode,
  priceRange,
  setPriceRange,
  selectedTags,
  toggleTag,
  selectedCategoryId,
  setSelectedCategoryId,
  resetFilters,
  filters,
}: CatalogToolbarProps) {
  return (
    <div className="flex sm:flex-row xs:flex-col xs:justify-between sm:justify-between lg:justify-between gap-4 mb-6 w-full max-w-[1110px] font-sans font-normal">
      <div>
        <Select value={sort} onValueChange={(v) => setSort(v as SortKey)}>
          <SelectTrigger className="w-44">
            <SelectValue placeholder="Сортировка" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="rating">По популярности</SelectItem>
            <SelectItem value="price-asc">Цена выше</SelectItem>
            <SelectItem value="price-desc">Цена ниже</SelectItem>
            <SelectItem value="new">Сначала новинки</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex sm:justify-start items-center gap-2.5 sm:mt-0 sm:w-auto">
        <div className="lg:hidden w-full sm:w-auto">
          <MobileFiltersSheet
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            selectedFilters={selectedTags}
            toggleFilter={toggleTag}
            selectedCategory={selectedCategoryId}
            setSelectedCategory={setSelectedCategoryId}
            resetFilters={resetFilters}
            filters={filters}
          />
        </div>

        <div className="s:hidden xs:hidden sm:hidden flex border rounded-lg">
          <Button
            variant={viewMode === "grid" ? "default" : "ghost"}
            size="sm"
            onClick={() => setViewMode("grid")}
            className="rounded-r-none"
            aria-label="Сетка"
          >
            <Grid3X3 className="w-4 h-4" aria-hidden="true" />
          </Button>

          <Button
            variant={viewMode === "list" ? "default" : "ghost"}
            size="sm"
            onClick={() => setViewMode("list")}
            className="rounded-l-none"
            aria-label="Список"
          >
            <List className="w-4 h-4" aria-hidden="true" />
          </Button>
        </div>
      </div>
    </div>
  );
}