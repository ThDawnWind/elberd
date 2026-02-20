import { Category, Product } from "@/types";
import { Beef, Box, CakeSlice, ChefHat, CookingPot, Fish, Grid3X3, Home, Info, Package, PartyPopper, Store } from "lucide-react";

export const CATEGORIES: Category[] = [
  { id: 1, name: "Полуфабрикаты", icon: Package, slug: "semi-finished" },
  { id: 2, name: "Готовая еда", icon: CookingPot, slug: "ready-meals" },
  { id: 3, name: "Мясная продукция", icon: Beef, slug: "meat" },
  { id: 4, name: "Рыба", icon: Fish, slug: "fish" },
  { id: 5, name: "Хлебобулочные изделия", icon: CakeSlice, slug: "bakery" },
  { id: 6, name: "Заготовки", icon: Box, slug: "preserves" },
  { id: 7, name: "Праздничные блюда", icon: PartyPopper, slug: "holiday" },
]

export const allCategory = {
    id: 0,                 
    name: 'Все товары',
    icon: ChefHat,
    slug: 'all',                  
  }


export const filters = [
  { id: "new", label: "Новинки", condition: (product: Product) => product.isNew },
  { id: "bestseller", label: "Хиты продаж", condition: (product: Product) => (product.rating || 0) >= 4.7 },
]

export const mobileNavItems = [  
  { name: "Главная", href: "/", icon: Home },
  { name: "Меню", href: "/catalog", icon: Grid3X3 },
  { name: "О нас", href: "/about", icon: Info },
  { name: "Магазины", href: "/where-to-buy", icon: Store },
];

export const RESTAURANT_PHONE = "+79637042858";

export const DEFAULT_PRICE_RANGE: [number, number] = [50, 2600]