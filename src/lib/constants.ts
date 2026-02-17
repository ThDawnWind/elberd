import { Category, Product } from "@/types";
import { Beef, Box, CakeSlice, ChefHat, CookingPot, Fish, Grid3X3, Home, Info, Package, PartyPopper, Store } from "lucide-react";

export const CATEGORIES: Category[] = [
  { id: 1, name: "Все категории", icon: ChefHat, href: "/catalog" },
  { id: 2, name: "Полуфабрикаты", icon: Package, href: "/catalog/semi-finished" },
  { id: 3, name: "Готовая еда", icon: CookingPot, href: "/catalog/ready-meals" },
  { id: 4, name: "Мясная продукция", icon: Beef, href: "/catalog/meat" },
  { id: 5, name: "Рыба", icon: Fish, href: "/catalog/fish" },
  { id: 6, name: "Хлебобулочные изделия", icon: CakeSlice, href: "/catalog/bakery" },
  { id: 7, name: "Заготовки", icon: Box, href: "/catalog/preserves" },
  { id: 8, name: "Праздничные блюда", icon: PartyPopper, href: "/catalog/holiday" },
];

export const filters = [
  { id: "new", label: "Новинки", condition: (product: Product) => product.isNew },
  { id: "bestseller", label: "Хиты продаж", condition: (product: Product) => (product.rating || 0) >= 4.7 },
]

export const mobileNavItems = [  
  { name: "Главная", href: "/", icon: Home },
  { name: "Меню", href: "/catalog", icon: Grid3X3 },
  { name: "О нас", href: "/about", icon: Info },
  { name: "Магазины", href: "/stores", icon: Store },
];

export const RESTAURANT_PHONE = "+79637042858";