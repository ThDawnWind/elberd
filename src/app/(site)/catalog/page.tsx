// app/(site)/catalog/page.tsx
"use client";

import { useState } from "react";
import { DishCard } from "@/components/catalog/dish-card";
import { CATEGORIES } from "@/data/categories";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Grid3X3, List, Filter } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

// Генерация товаров на основе вашей структуры
const generateProducts = () => [
  {
    id: 1,
    name: "Жижиг-галнаш",
    weight: "420г",
    price: 320,
    image: "/images/dishes/jizhig.jpg",
    description: "Мясо с галушками по-чеченски",
    category: "Чеченская кухня",
    isNew: true,
    rating: 4.8,
    tags: ["мясо", "традиционный"]
  },
  {
    id: 2,
    name: "Чебуреки (готовые)",
    weight: "500г",
    price: 280,
    image: "/images/dishes/chebureki.jpg",
    description: "Хрустящие чебуреки с мясной начинкой",
    category: "Готовая еда",
    isNew: false,
    rating: 4.6,
    tags: ["выпечка", "мясо"]
  },
  {
    id: 3,
    name: "Хинкаль",
    weight: "600г",
    price: 350,
    image: "/images/dishes/hinkal.jpg",
    description: "Дагестанское блюдо с мясом и бульоном",
    category: "Готовая еда",
    isNew: true,
    rating: 4.9,
    tags: ["традиционный", "мясо"]
  },
  {
    id: 4,
    name: "Манты",
    weight: "800г",
    price: 420,
    image: "/images/dishes/manty.jpg",
    description: "Сочные манты со специями",
    category: "Полуфабрикаты",
    isNew: false,
    rating: 4.7,
    tags: ["заморозка", "мясо"]
  },
  {
    id: 5,
    name: "Стейк Рибай",
    weight: "300г",
    price: 890,
    image: "/images/dishes/steak.jpg",
    description: "Мраморная говядина премиум класса",
    category: "Мясная продукция",
    isNew: false,
    rating: 4.8,
    tags: ["премиум", "стейк"]
  },
  {
    id: 6,
    name: "Сёмга слабосолёная",
    weight: "200г",
    price: 450,
    image: "/images/dishes/salmon.jpg",
    description: "Филе сёмги слабого посола",
    category: "Рыба",
    isNew: true,
    rating: 4.5,
    tags: ["рыба", "деликатес"]
  },
  {
    id: 7,
    name: "Хлеб бородинский",
    weight: "500г",
    price: 120,
    image: "/images/dishes/bread.jpg",
    description: "Ржаной хлеб по традиционному рецепту",
    category: "Хлебобулочные изделия",
    isNew: false,
    rating: 4.4,
    tags: ["хлеб", "выпечка"]
  },
  {
    id: 8,
    name: "Лагман",
    weight: "550г",
    price: 380,
    image: "/images/dishes/lagman.jpg",
    description: "Узбекский суп с лапшой и мясом",
    category: "Готовая еда",
    isNew: false,
    rating: 4.7,
    tags: ["суп", "мясо"]
  },
  {
    id: 9,
    name: "Фарш говяжий",
    weight: "1000г",
    price: 320,
    image: "/images/dishes/ground-beef.jpg",
    description: "Свино-говяжий фарш для котлет",
    category: "Полуфабрикаты",
    isNew: false,
    rating: 4.3,
    tags: ["фарш", "мясо"]
  },
  {
    id: 10,
    name: "Шашлык из баранины",
    weight: "1000г",
    price: 780,
    image: "/images/dishes/shashlik.jpg",
    description: "Маринованная баранина для шашлыка",
    category: "Праздничные блюда",
    isNew: true,
    rating: 4.9,
    tags: ["шашлык", "мясо"]
  },
  {
    id: 11,
    name: "Пельмени сибирские",
    weight: "1000г",
    price: 380,
    image: "/images/dishes/pelmeni.jpg",
    description: "Пельмени с говядиной и свининой",
    category: "Полуфабрикаты",
    isNew: false,
    rating: 4.6,
    tags: ["пельмени", "заморозка"]
  },
  {
    id: 12,
    name: "Тирамису",
    weight: "250г",
    price: 280,
    image: "/images/dishes/tiramisu.jpg",
    description: "Итальянский десерт с маскарпоне",
    category: "Готовая еда",
    isNew: false,
    rating: 4.8,
    tags: ["десерт", "итальянский"]
  }
];

const filters = [
  { id: "vegetarian", label: "Вегетарианские" },
  { id: "new", label: "Новинки" },
  { id: "bestseller", label: "Хиты продаж" },
  { id: "discount", label: "Со скидкой" },
];

export default function CatalogPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("popular");
  
  const products = generateProducts();

  // Фильтрация и сортировка
  const filteredProducts = products
    .filter(product => {
      // Фильтр по категории
      if (selectedCategory !== "all") {
        const category = CATEGORIES.find(c => c.id === parseInt(selectedCategory));
        return category && product.category === category.name;
      }
      return true;
    })
    .filter(product => {
      // Фильтр по цене
      return product.price >= priceRange[0] && product.price <= priceRange[1];
    })
    .filter(product => {
      // Фильтр по тегам
      if (selectedFilters.includes("new") && !product.isNew) return false;
      if (selectedFilters.includes("bestseller") && product.rating < 4.7) return false;
      return true;
    })
    .sort((a, b) => {
      // Сортировка
      switch (sortBy) {
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating;
        case "popular":
        default:
          return b.rating - a.rating; // По рейтингу как популярность
      }
    });

  const toggleFilter = (filterId: string) => {
    setSelectedFilters(prev =>
      prev.includes(filterId)
        ? prev.filter(id => id !== filterId)
        : [...prev, filterId]
    );
  };

  const resetFilters = () => {
    setPriceRange([0, 1000]);
    setSelectedFilters([]);
    setSelectedCategory("all");
  };

  return (
    <div className="bg-background min-h-screen font-sans">
      {/* Хедер */}
      <header className="top-0 z-50 sticky bg-white/95 supports-[backdrop-filter]:bg-white/60 backdrop-blur border-b w-full font-mono">
        <div className="mx-4 md:mx-[90px] px-4 py-4">
          <div className="flex sm:flex-row flex-col justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-2">
              <Grid3X3 className="w-5 h-5 text-berd-primary" />
              <h1 className="font-bold text-2xl tracking-tight">Каталог блюд</h1>
            </div>
            
            <div className="flex items-center gap-4 w-full sm:w-auto">
              {/* Мобильный фильтр */}
              <Sheet>
                <SheetTrigger asChild className="sm:hidden">
                  <Button variant="outline" size="sm">
                    <Filter className="mr-2 w-4 h-4" />
                    Фильтры
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                  <FiltersSidebar
                    priceRange={priceRange}
                    setPriceRange={setPriceRange}
                    selectedFilters={selectedFilters}
                    toggleFilter={toggleFilter}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                    resetFilters={resetFilters}
                  />
                </SheetContent>
              </Sheet>

              <div className="hidden sm:flex items-center gap-2">
                <span className="text-muted-foreground text-sm">Вид:</span>
                <div className="flex border rounded-lg">
                  <Button
                    variant={viewMode === 'grid' ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                    className="rounded-r-none"
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode('list')}
                    className="rounded-l-none"
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Сортировка" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popular">По популярности</SelectItem>
                  <SelectItem value="price-asc">По цене (возр.)</SelectItem>
                  <SelectItem value="price-desc">По цене (убыв.)</SelectItem>
                  <SelectItem value="rating">По рейтингу</SelectItem>
                  <SelectItem value="new">Сначала новинки</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Горизонтальные категории */}
          <div className="mt-4 overflow-x-auto">
            <div className="flex space-x-2 pb-2 min-w-max">
              {CATEGORIES.map(category => {
                const Icon = category.icon;
                return (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id.toString() ? "default" : "outline"}
                    size="sm"
                    className="gap-2 whitespace-nowrap"
                    onClick={() => setSelectedCategory(category.id.toString())}
                  >
                    <Icon className="w-4 h-4" />
                    {category.name}
                  </Button>
                );
              })}
            </div>
          </div>
        </div>
      </header>

      <div className="mx-4 md:mx-[90px] px-4 py-6">
        <div className="flex lg:flex-row flex-col gap-6">
          {/* Десктопные фильтры */}
          <aside className="hidden lg:block lg:w-1/4">
            <FiltersSidebar
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              selectedFilters={selectedFilters}
              toggleFilter={toggleFilter}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              resetFilters={resetFilters}
            />
          </aside>

          {/* Товары */}
          <main className="lg:w-3/4">
            {/* Статистика */}
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="font-semibold text-lg">
                  {selectedCategory === "all" 
                    ? "Все блюда" 
                    : CATEGORIES.find(c => c.id.toString() === selectedCategory)?.name}
                </h2>
                <p className="text-muted-foreground text-sm">
                  Найдено {filteredProducts.length} товаров
                </p>
              </div>

              {/* Активные фильтры */}
              <div className="flex flex-wrap gap-2">
                {selectedFilters.map(filter => (
                  <Button
                    key={filter}
                    variant="outline"
                    size="sm"
                    onClick={() => toggleFilter(filter)}
                    className="h-7 text-xs"
                  >
                    {filters.find(f => f.id === filter)?.label} ×
                  </Button>
                ))}
                {selectedFilters.length > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={resetFilters}
                    className="h-7 text-xs"
                  >
                    Сбросить всё
                  </Button>
                )}
              </div>
            </div>

            {/* Сетка товаров */}
            {viewMode === 'grid' ? (
              <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {filteredProducts.map(product => (
                  <DishCard key={product.id} dish={product} />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredProducts.map(product => (
                  <div key={product.id} className="flex gap-4 p-4 border rounded-lg">
                    <div className="relative flex-shrink-0 w-32 h-32">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="rounded-lg w-full h-full object-cover"
                      />
                      {product.isNew && (
                        <span className="top-2 left-2 absolute bg-amber-600 px-2 py-1 rounded-full font-semibold text-white text-xs">
                          Новинка
                        </span>
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{product.name}</h3>
                      <p className="mt-1 text-muted-foreground text-sm">{product.description}</p>
                      <div className="flex items-center gap-4 mt-2">
                        <span className="text-sm">Вес: {product.weight}</span>
                        <div className="flex items-center gap-1">
                          <span className="text-sm">★ {product.rating}</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center mt-4">
                        <span className="font-bold text-2xl">{product.price}₴</span>
                        <Button className="bg-berd-primary hover:bg-berd-primary/90">
                          В корзину
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Пагинация */}
            {filteredProducts.length > 0 && (
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
            )}

            {/* Нет товаров */}
            {filteredProducts.length === 0 && (
              <div className="py-12 text-center">
                <h3 className="font-semibold text-lg">Товары не найдены</h3>
                <p className="mt-2 text-muted-foreground">
                  Попробуйте изменить фильтры или выбрать другую категорию
                </p>
                <Button 
                  onClick={resetFilters}
                  className="mt-4"
                  variant="outline"
                >
                  Сбросить фильтры
                </Button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

// Компонент сайдбара с фильтрами
interface FiltersSidebarProps {
  priceRange: number[];
  setPriceRange: (range: number[]) => void;
  selectedFilters: string[];
  toggleFilter: (id: string) => void;
  selectedCategory: string;
  setSelectedCategory: (id: string) => void;
  resetFilters: () => void;
}

function FiltersSidebar({
  priceRange,
  setPriceRange,
  selectedFilters,
  toggleFilter,
  selectedCategory,
  setSelectedCategory,
  resetFilters,
}: FiltersSidebarProps) {
  return (
    <div className="top-24 sticky space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="font-semibold text-lg">Фильтры</h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={resetFilters}
          className="text-xs"
        >
          Сбросить
        </Button>
      </div>

      <div className="space-y-3">
        <h3 className="font-medium">Категории</h3>
        <div className="space-y-1">
          {CATEGORIES.map(category => {
            const Icon = category.icon;
            return (
              <Button
                key={category.id}
                variant={selectedCategory === category.id.toString() ? "secondary" : "ghost"}
                className="justify-start gap-2 w-full"
                onClick={() => setSelectedCategory(category.id.toString())}
              >
                <Icon className="w-4 h-4" />
                {category.name}
              </Button>
            );
          })}
        </div>
      </div>

      <Separator />

      {/* Фильтр по цене */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="font-medium">Цена, ₴</h3>
          <span className="text-muted-foreground text-sm">
            {priceRange[0]} - {priceRange[1]}
          </span>
        </div>
        <Slider
          min={0}
          max={1000}
          step={50}
          value={priceRange}
          onValueChange={setPriceRange}
          className="my-4"
        />
        <div className="flex justify-between items-center text-muted-foreground text-sm">
          <span>0</span>
          <span>500</span>
          <span>1000+</span>
        </div>
      </div>

      <Separator />

      {/* Дополнительные фильтры */}
      <div className="space-y-3">
        <h3 className="font-medium">Дополнительно</h3>
        <div className="space-y-2">
          {filters.map(filter => (
            <div key={filter.id} className="flex items-center space-x-2">
              <Checkbox
                id={filter.id}
                checked={selectedFilters.includes(filter.id)}
                onCheckedChange={() => toggleFilter(filter.id)}
              />
              <label
                htmlFor={filter.id}
                className="peer-disabled:opacity-70 text-sm leading-none peer-disabled:cursor-not-allowed"
              >
                {filter.label}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}