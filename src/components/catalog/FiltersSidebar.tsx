"use client";

import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { CATEGORIES, filters } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useCatalogStore } from "@/stores/catalog.store";
import type { DesktopFiltersSidebarProps } from "@/types";

export default function FiltersSidebar({
  priceRange,
  setPriceRange,
  selectedFilters,
  toggleFilter,
  selectedCategory,
  setSelectedCategory,
  resetFilters,
}: Readonly<DesktopFiltersSidebarProps> & { resetFilters: () => void }) {
  const hasActiveFilters = useCatalogStore(s => s.hasActiveFilters)

  return (
    <div className="top-24 sticky space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="font-semibold text-lg">Фильтры</h2>
        <Button 
        variant="ghost" 
        size="sm" 
        onClick={resetFilters}
        className={cn(
            "font-medium text-gray-500 hover:text-black text-sm",
            "text-sm text-gray-500 hover:text-black",
            !hasActiveFilters && "hidden"
        )}
        >
          Сброс
        </Button>
      </div>

      <div className="space-y-3">
        <h3 className="font-bold">Категории</h3>

        <div className="space-y-1">
          <Button
            variant={selectedCategory === 0 ? "secondary" : "ghost"}
            className={`justify-start gap-2 w-full font-medium ${
              selectedCategory === 0
                ? "bg-berd-primary hover:bg-berd-primary/90 text-white"
                : "hover:bg-gray-100 text-gray-700"
            } transition-colors duration-200`}
            onClick={() => setSelectedCategory(0)}
          >
            <span className="flex-1 font-medium text-left">Все категории</span>
          </Button>

          {CATEGORIES.map((category) => {
            const Icon = category.icon;
            const isSelected = selectedCategory === category.id;

            return (
              <Button
                key={category.id}
                variant={isSelected ? "secondary" : "ghost"}
                className={`justify-start gap-2 w-full ${
                  isSelected
                    ? "bg-berd-primary hover:bg-berd-primary/90 text-white"
                    : "hover:bg-gray-100 text-gray-700"
                } transition-colors duration-200`}
                onClick={() => setSelectedCategory(category.id)}
              >
                <Icon className={`w-4 h-4 ${isSelected ? "text-white" : "text-gray-700"}`} aria-hidden="true" />
                <span className="flex-1 font-medium text-left">{category.name}</span>
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
                  onChange={() => toggleFilter(filter.id)}
                  className="border-gray-300 rounded w-4 h-4 accent-berd-primary"
                />
                <label htmlFor={`desktop-${filter.id}`} className="font-medium text-sm leading-none cursor-pointer">
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
              {priceRange[0]} – {priceRange[1]} ₽
            </span>
          </div>
          <Slider
            defaultValue={priceRange}
            min={50}
            max={2600}
            step={50}
            value={priceRange}
            onValueChange={setPriceRange}
            className="bg-berd-primary my-4 font-medium"
            aria-label="Диапазон цен"
          />

          <div className="flex justify-between items-center font-normal text-muted-foreground text-xs sm:text-sm">
            <span>50 ₽</span>
            <span>2600 ₽</span>
          </div>
        </div>
      </div>
    </div>
  );
}