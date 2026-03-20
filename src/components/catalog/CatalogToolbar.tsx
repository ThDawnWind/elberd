"use client";

import { Grid3X3, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import type { ProductSort } from "@/services/prismic/queries/products";
import type { Category, FilterItem } from "@/types";
import { MobileFiltersSheet } from "../ui/MobileFiltersSheet";

type CatalogToolbarProps = {
    categories: Category[];
    currentCategory: string;
    currentSort: ProductSort;
    currentSearch: string;

    setCategory: (value: string) => void;
    setSort: (value: ProductSort) => void;
    setSearch: (value: string) => void;

    priceRange: [number, number];
    setPriceRange: (value: [number, number]) => void;

    selectedFilters: string[];
    toggleFilter: (id: string) => void;
    filters: FilterItem[];

    viewMode: "grid" | "list";
    setViewMode: (value: "grid" | "list") => void;

    resetFilters: () => void;
};

export default function CatalogToolbar({
  categories,
  currentCategory,
  currentSort,
  setCategory,
  setSort,
  priceRange,
  setPriceRange,
  selectedFilters,
  toggleFilter,
  filters,
  viewMode,
  setViewMode,
  resetFilters,
}: CatalogToolbarProps) {
  return (
    <div className="flex sm:flex-row xs:flex-col xs:justify-between sm:justify-between lg:justify-between gap-4 mb-6 w-full max-w-[1110px] font-sans font-normal">
      <div className="font-medium">
        <Select value={currentSort} onValueChange={(v) => setSort(v as ProductSort)}>
          <SelectTrigger className="w-44">
            <SelectValue placeholder="Сортировка" />
          </SelectTrigger>

          <SelectContent className="font-medium">
            <SelectItem value="newest">Сначала новые</SelectItem>
            <SelectItem value="price_asc">Сначала дешевле</SelectItem>
            <SelectItem value="price_desc">Сначала дороже</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex sm:justify-start items-center gap-2.5 sm:mt-0 sm:w-auto">
            <div className="lg:hidden w-full sm:w-auto">
              <MobileFiltersSheet
                categories={categories}
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                selectedFilters={selectedFilters}
                toggleFilter={toggleFilter}
                selectedCategory={currentCategory}
                setSelectedCategory={setCategory}
                resetFilters={resetFilters}
                filters={filters}
              />
            </div>
        <Button
          variant="outline"
          size="sm"
          onClick={resetFilters}
          type="button"
          className="lg:hidden"
        >
          Сбросить
        </Button>

        <div className="s:hidden xs:hidden sm:hidden flex border rounded-lg">
          <Button
            variant={viewMode === "grid" ? "default" : "ghost"}
            size="sm"
            onClick={() => setViewMode("grid")}
            className="rounded-r-none"
            aria-label="Сетка"
            type="button"
          >
            <Grid3X3 className="w-4 h-4" aria-hidden="true" />
          </Button>

          <Button
            variant={viewMode === "list" ? "default" : "ghost"}
            size="sm"
            onClick={() => setViewMode("list")}
            className="rounded-l-none"
            aria-label="Список"
            type="button"
          >
            <List className="w-4 h-4" aria-hidden="true" />
          </Button>
        </div>
      </div>
    </div>
  );
}