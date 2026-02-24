"use client"

import { useMemo, useEffect } from "react"
import { DishCard } from "@/components/ui/DishCard"
import { CATEGORIES, filters } from "@/lib/constants"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Grid3X3, List } from "lucide-react"
import { cn } from "@/lib/utils"
import { PRODUCTS } from "@/lib/products"
import { MobileFiltersSheet } from "@/components/ui/MobileFiltersSheet"
import { useCatalogStore } from "@/stores/catalog.store"
import { DesktopFiltersSidebarProps } from "@/types"
import { motion, AnimatePresence, cubicBezier } from "motion/react"


const pageFade = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
      ease: cubicBezier(0.16, 1, 0.3, 1),
    },
  },
}

const list = {
  hidden: {},
  show: { transition: { staggerChildren: 0.04 } },
}

 const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1]

const item = {
  hidden: { opacity: 0, y: 10  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: EASE_OUT },
  },
}

export default function CatalogPage() {
  const viewMode = useCatalogStore((state) => state.viewMode)
  const setViewMode = useCatalogStore((state) => state.setViewMode)
  const priceRange = useCatalogStore((state) => state.priceRange)
  const setPriceRange = useCatalogStore((state) => state.setPriceRange)
  const selectedTags = useCatalogStore((state) => state.selectedTags)
  const toggleTag = useCatalogStore((state) => state.toggleTag)
  const selectedCategoryId = useCatalogStore((state) => state.selectedCategoryId)
  const setSelectedCategoryId = useCatalogStore((state) => state.setSelectedCategoryId)
  const sort = useCatalogStore((state) => state.sort)
  const setSort = useCatalogStore((state) => state.setSort)
  const resetFilters = useCatalogStore((state) => state.resetFilters)
  const setProducts = useCatalogStore((state) => state.setProducts)

  useEffect(() => {
    setProducts(PRODUCTS)
  }, [setProducts])

  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS]

    if (selectedCategoryId !== null) {
      const category = CATEGORIES.find((c) => c.id === selectedCategoryId)
      if (category) {
        result = result.filter((product) => product.category === category.name)
      }
    }

    const [minPrice, maxPrice] = priceRange
    result = result.filter((product) => product.price >= minPrice && product.price <= maxPrice)

    selectedTags.forEach((filterId) => {
      const filter = filters.find((f) => f.id === filterId)
      if (filter?.condition) {
        result = result.filter(filter.condition)
      }
    })

    result.sort((a, b) => {
      switch (sort) {
        case "price-asc":
          return a.price - b.price
        case "price-desc":
          return b.price - a.price
        case "rating":
          return (b.rating || 0) - (a.rating || 0)
        case "new":
          if (a.isNew && !b.isNew) return -1
          if (!a.isNew && b.isNew) return 1
          return 0
        default:
          return (b.rating || 0) - (a.rating || 0)
      }
    })

    return result
  }, [selectedCategoryId, priceRange, selectedTags, sort])

  const selectedCategoryName =
    selectedCategoryId === null
      ? "Все товары"
      : CATEGORIES.find((c) => c.id === selectedCategoryId)?.name || ""

  const listKey = `${viewMode}-${selectedCategoryId}-${priceRange[0]}-${priceRange[1]}-${sort}-${selectedTags.join(",")}`

  return (
    <motion.div
      className="bg-background min-h-screen font-sans"
      variants={pageFade}
      initial="hidden"
      animate="show"
    >
      <div className="bg-white/95 supports-[backdrop-filter]:bg-white/60 backdrop-blur border-b w-full font-mono">
        <div className="mx-4 md:mx-[60px] px-4 py-4">
          <div className="flex sm:flex sm:justify-between items-start gap-4 mb-4">
            <div className="flex items-center gap-2 mr-80">
              <Grid3X3 className="w-5 h-5 text-berd-primary" />
              <h1 className="font-bold text-2xl tracking-tight">Каталог</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-4 sm:mx-[60px] px-4 py-6">
        <div className="flex lg:flex-row flex-col gap-6">
          <aside className="hidden lg:block lg:w-1/4">
            <DesktopFiltersSidebar
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              selectedFilters={selectedTags}
              toggleFilter={toggleTag}
              selectedCategory={selectedCategoryId}
              setSelectedCategory={setSelectedCategoryId}
              resetFilters={resetFilters}
            />
          </aside>

          <div className="lg:w-3/4">
            <div className="flex sm:flex-row flex-col justify-between items-start sm:items-center gap-4 mb-6">
              <div>
                <h2 className="font-semibold text-lg">{selectedCategoryName}</h2>
                <p className="text-muted-foreground text-sm">Найдено {filteredProducts.length} товаров</p>
              </div>

              <div className="flex flex-wrap gap-2">
                {selectedTags.map((filterId) => (
                  <Button
                    key={filterId}
                    variant="outline"
                    size="sm"
                    onClick={() => toggleTag(filterId)}
                    className="h-7 text-xs"
                  >
                    {filters.find((f) => f.id === filterId)?.label} ×
                  </Button>
                ))}
              </div>
            </div>

            <div className="flex sm:flex-row xs:justify-between sm:justify-between lg:justify-between gap-4 mb-6">
              <div>
                <Select value={sort} onValueChange={setSort}>
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

                <div className="xs:hidden flex border rounded-lg">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className="rounded-r-none"
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className="rounded-l-none"
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {viewMode === "grid" ? (
              <motion.div
                key={listKey}
                className={cn(
                  "gap-2 xs:gap-3 sm:gap-4 grid",
                  "grid-cols-1",
                  "s:grid-cols-1",
                  "xs:grid-cols-2",
                  "sm:grid-cols-2",
                  "lg:grid-cols-4"
                )}
                variants={list}
                initial="hidden"
                animate="show"
                layout
              >
                <AnimatePresence mode="popLayout">
                  {filteredProducts.map((product) => (
                    <motion.div
                      key={product.id}
                      variants={item}
                      layout
                      exit={{ opacity: 0, scale: 0.98, transition: { duration: 0.15 } }}
                    >
                      <DishCard product={product} price={product.price} variant="grid" />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            ) : (
              <motion.div
                key={listKey}
                className="space-y-4"
                variants={list}
                initial="hidden"
                animate="show"
                layout
              >
                <AnimatePresence mode="popLayout">
                  {filteredProducts.map((product) => (
                    <motion.div
                      key={product.id}
                      variants={item}
                      layout
                      exit={{ opacity: 0, y: 6, transition: { duration: 0.15 } }}
                    >
                      <DishCard product={product} price={product.price} variant="list" />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            )}

            {/* {filteredProducts.length > 0 && filteredProducts.length > 6 && (
              <div className="flex justify-center mt-8">
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" disabled>
                    Назад
                  </Button>
                  <Button variant="default" size="sm" className="p-0 w-8 h-8">
                    1
                  </Button>
                  <Button variant="outline" size="sm" className="p-0 w-8 h-8">
                    2
                  </Button>
                  <Button variant="outline" size="sm" className="p-0 w-8 h-8">
                    3
                  </Button>
                  <Button variant="outline" size="sm">
                    Вперед
                  </Button>
                </div>
              </div>
            )} */}

            {filteredProducts.length === 0 && (
              <div className="py-12 text-center">
                <h3 className="font-semibold text-lg">Товары не найдены</h3>
                <p className="mt-2 text-muted-foreground">Попробуйте изменить фильтры или выбрать другую категорию</p>
                <Button onClick={resetFilters} className="mt-4" variant="outline">
                  Сбросить фильтры
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function DesktopFiltersSidebar({
  priceRange,
  setPriceRange,
  selectedFilters,
  toggleFilter,
  selectedCategory,
  setSelectedCategory,
}: Readonly<DesktopFiltersSidebarProps>) {
  return (
    <div className="top-24 sticky space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="font-semibold text-lg">Фильтры</h2>
      </div>

      <div className="space-y-3">
        <h3 className="font-medium">Категории</h3>

        <div className="space-y-1">
          <Button
            variant={selectedCategory === 0 ? "secondary" : "ghost"}
            className={`
              justify-start gap-2 w-full
              ${
                selectedCategory === 0
                  ? "bg-berd-primary hover:bg-berd-primary/90 text-white"
                  : "hover:bg-gray-100 text-gray-700"
              }
              transition-colors duration-200
            `}
            onClick={() => setSelectedCategory(0)}
          >
            <span className="flex-1 text-left">Все категории</span>
            {selectedCategory !== 0 && (
              <span className="ml-auto font-normal text-gray-400 text-xs">(сбросить)</span>
            )}
          </Button>

          {CATEGORIES.map((category) => {
            const Icon = category.icon
            const isSelected = selectedCategory === category.id

            return (
              <Button
                key={category.id}
                variant={isSelected ? "secondary" : "ghost"}
                className={`
                  justify-start gap-2 w-full
                  ${
                    isSelected
                      ? "bg-berd-primary hover:bg-berd-primary/90 text-white"
                      : "hover:bg-gray-100 text-gray-700"
                  }
                  transition-colors duration-200
                `}
                onClick={() => setSelectedCategory(category.id)}
              >
                <Icon className={`w-4 h-4 ${isSelected ? "text-white" : "text-gray-700"}`} />
                <span className="flex-1 text-left">{category.name}</span>
                {isSelected && <div className="bg-white ml-auto rounded-full w-2 h-2" />}
              </Button>
            )
          })}
        </div>

        <div className="space-y-3">
          <h3 className="font-medium">Дополнительно</h3>
          <div className="space-y-2">
            {filters.map((filter) => (
              <div key={filter.id} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id={`desktop-${filter.id}`}
                  checked={selectedFilters.includes(filter.id)}
                  onChange={() => toggleFilter(filter.id)}
                  className="border-gray-300 rounded focus:ring-berd-primary w-4 h-4 text-berd-primary"
                />
                <label htmlFor={`desktop-${filter.id}`} className="text-sm leading-none cursor-pointer">
                  {filter.label}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-medium">Цена, ₽</h3>
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
            className="my-4"
            aria-label="Диапазон цен"
          />

          <div className="flex justify-between items-center text-muted-foreground text-xs sm:text-sm">
            <span>50 ₽</span>
            <span>2600 ₽</span>
          </div>
        </div>
      </div>
    </div>
  )
}