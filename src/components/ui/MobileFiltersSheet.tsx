"use client";

import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Slider } from "@/components/ui/slider";
import { CATEGORIES } from "@/lib/constants";
import { MobileFiltersSheetProps } from "@/types";

export function MobileFiltersSheet({
  priceRange,
  setPriceRange,
  selectedFilters,
  toggleFilter,
  selectedCategory,
  setSelectedCategory,
  resetFilters,
  filters,
}: Readonly<MobileFiltersSheetProps>) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="lg:hidden flex items-center gap-2 font-sans font-semibold"
        >
          <Filter aria-hidden="true" className="w-4 h-4" />
          <span>Фильтры</span>
        </Button>
      </SheetTrigger>

      <SheetContent side="bottom" className="w-[65vw] sm:max-w-md font-mono font-normal">
        <SheetHeader className="text-left">
          <SheetTitle>Фильтры</SheetTitle>
          <SheetDescription>
            Примените фильтры для поиска нужных товаров
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-6 mb-11 py-6 max-h-[calc(100vh-200px)] overflow-y-auto">
          <div className="space-y-3">
            <h3 className="font-medium text-sm">Категории</h3>

            <div className="space-y-2">
              <button
                type="button"
                onClick={() => setSelectedCategory(0)}
                className={`
                  flex items-center gap-3 w-full p-3 rounded-lg text-left transition-colors
                  ${
                    selectedCategory === 0
                      ? "bg-berd-primary/10 text-berd-primary border border-berd-primary/20"
                      : "hover:bg-gray-100 text-gray-700 border border-transparent"
                  }
                `}
              >
                <span className="flex-1">Все категории</span>
                {selectedCategory === 0 && (
                  <div className="bg-berd-primary rounded-full w-2 h-2" />
                )}
              </button>

              {CATEGORIES.map((category) => {
                const Icon = category.icon;
                const isSelected = selectedCategory === category.id;

                return (
                  <button
                    type="button"
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`
                      flex items-center gap-1 font-sans font-medium w-full p-1 rounded-lg text-left transition-colors
                      ${
                        isSelected
                          ? "bg-berd-primary/10 text-berd-primary border border-berd-primary/20"
                          : "hover:bg-gray-100 text-gray-700 border border-transparent"
                      }
                    `}
                  >
                    <Icon
                      aria-hidden="true"
                      className={`w-4 h-4 ${isSelected ? "text-berd-primary" : "text-gray-500"}`}
                    />
                    <span className="flex-1">{category.name}</span>
                    {isSelected && (
                      <div className="bg-berd-primary rounded-full w-2 h-2" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="font-sans font-medium text-sm">Дополнительно</h3>
            <div className="space-y-2">
              {filters.map((filter) => (
                <div key={filter.id} className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id={`mobile-${filter.id}`}
                    checked={selectedFilters.includes(filter.id)}
                    onChange={() => toggleFilter(filter.id)}
                    className="border-gray-300 rounded w-5 h-5 text-berd-primary accent-berd-primary"
                  />
                  <label
                    htmlFor={`mobile-${filter.id}`}
                    className="text-sm leading-none cursor-pointer"
                  >
                    {filter.label}
                  </label>
                </div>
              ))}
            </div>
          </div>

    
          <div className="space-y-4 font-sans font-light">
            <div className="flex justify-between items-center">
              <h3 className="font-medium text-sm">Цена, ₽</h3>
              <span className="text-muted-foreground text-sm">
                {priceRange[0]} – {priceRange[1]} ₽
              </span>
            </div>

            <Slider
              min={50}
              max={2600}
              step={50}
              value={priceRange}
              onValueChange={setPriceRange}
              className="my-4"
              aria-label="Диапазон цен"
            />

            <div className="flex justify-between items-center text-muted-foreground text-xs">
              <span>50 ₽</span>
              <span>2600 ₽</span>
            </div>
          </div>
        </div>

        <SheetFooter className="flex-row gap-3 font-mono font-semibold">
          <Button variant="outline" onClick={resetFilters} className="flex-1">
            Сбросить
          </Button>
          <SheetClose asChild>
            <Button className="flex-1 bg-berd-primary hover:bg-berd-primary/90">
              Применить
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}