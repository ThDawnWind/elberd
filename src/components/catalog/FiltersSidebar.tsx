"use client";

import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import type { ProductSort } from "@/services/prismic/queries/products";
import { cn } from "@/lib/utils";
import { Category } from "@/types";
import { ICONS } from "@/lib/icons";
import { filters } from "@/lib/constants";

type FiltersSidebarProps = {
  categories: Category[];
  currentCategory: string;
  currentSort: ProductSort;
  currentSearch: string;
  onCategoryChange: (value: string) => void;
  onSortChange: (value: ProductSort) => void;
  onReset: () => void;

  priceRange?: [number, number];
  setPriceRange?: (value: [number, number]) => void;

  selectedFilters?: string[];
  toggleFilter?: (id: string) => void;
};

export default function FiltersSidebar({
  categories,
  currentCategory,
  currentSort,
  currentSearch,
  onCategoryChange,
  onReset,
  priceRange,
  setPriceRange,
  selectedFilters = [],
  toggleFilter,
}: FiltersSidebarProps) {
  const hasActiveFilters =
    currentCategory !== "all" ||
    currentSort !== "newest" ||
    currentSearch.trim().length > 0 ||
    selectedFilters.length > 0;

  return (
    <div className="top-24 sticky space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="font-semibold text-lg">Фильтры</h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={onReset}
          className={cn(
            "font-medium text-gray-500 hover:text-black text-sm",
            !hasActiveFilters && "hidden"
          )}
          type="button"
        >
          Сброс
        </Button>
      </div>

      <div className="space-y-3">
        <h3 className="font-bold">Категории</h3>

        <div className="space-y-1">
          <Button
            variant={currentCategory === "all" ? "secondary" : "ghost"}
            className={cn(
              "justify-start gap-2 w-full font-medium transition-colors duration-200",
              currentCategory === "all"
                ? "bg-berd-primary text-white hover:bg-berd-primary/90"
                : "text-gray-700 hover:bg-gray-100"
            )}
            onClick={() => onCategoryChange("all")}
            type="button"
          >
            <span className="flex-1 font-medium text-left">Все категории</span>
          </Button>

          {categories.map((category) => {
            const Icon = ICONS[category.icon as keyof typeof ICONS];
            const isSelected = currentCategory === category.slug;

            return (
              <Button
                key={category.id}
                variant={isSelected ? "secondary" : "ghost"}
                className={cn(
                  "justify-start gap-2 w-full transition-colors duration-200",
                  isSelected
                    ? "bg-berd-primary text-white hover:bg-berd-primary/90"
                    : "text-gray-700 hover:bg-gray-100"
                )}
                onClick={() => onCategoryChange(category.slug)}
                type="button"
              >
                {Icon ? (
                  <Icon
                    className={cn(
                      "w-4 h-4",
                      isSelected ? "text-white" : "text-gray-700"
                    )}
                    aria-hidden="true"
                  />
                ) : null}

                <span className="flex-1 font-medium text-left">
                  {category.name}
                </span>

                {isSelected && <div className="bg-white ml-auto rounded-full w-2 h-2" />}
              </Button>
            );
          })}
        </div>

        <div className="space-y-3">
          <h3 className="font-bold">Дополнительно</h3>
          <div className="space-y-2">
            {filters.map((filter) => (
              <div key={filter.id} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id={`desktop-${filter.id}`}
                  checked={selectedFilters.includes(filter.id)}
                  onChange={() => toggleFilter?.(filter.id)}
                  className="border-gray-300 rounded w-4 h-4 accent-berd-primary"
                  disabled={!toggleFilter}
                />
                <label
                  htmlFor={`desktop-${filter.id}`}
                  className="font-medium text-sm leading-none cursor-pointer"
                >
                  {filter.label}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-normal">Цена, ₽</h3>
            <span className="text-muted-foreground text-sm">
              {priceRange ? `${priceRange[0]} – ${priceRange[1]} ₽` : "50 – 2600 ₽"}
            </span>
          </div>

          <Slider
            defaultValue={priceRange ?? [50, 2600]}
            min={50}
            max={2600}
            step={50}
            value={priceRange ?? [50, 2600]}
            onValueChange={(value) => setPriceRange?.(value as [number, number])}
            className="bg-berd-primary my-4 font-medium"
            aria-label="Диапазон цен"
            disabled={!setPriceRange}
          />

          <div className="flex justify-between items-center font-normal text-muted-foreground text-xs sm:text-sm">
            <span>50 ₽</span>
            <span>2600 ₽</span>
          </div>
        </div>


        {currentSearch.trim().length > 0 && (
          <div className="space-y-2">
            <h3 className="font-bold">Поиск</h3>
            <div className="bg-gray-50 px-3 py-2 border rounded-lg text-gray-700 text-sm">
              {currentSearch}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}