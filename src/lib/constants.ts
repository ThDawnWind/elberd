import { Category } from "@/types";
import {  Grid3X3, Home, Info,  Store } from "lucide-react";

export const CATEGORIES: Category[] = [
  { id: 1, name: "Полуфабрикаты", icon: "package", slug: "semi-finished" },
  { id: 2, name: "Готовая еда", icon: "cookingPot", slug: "ready-meals" },
  { id: 3, name: "Мясная продукция", icon: "beef", slug: "meat" },
  { id: 4, name: "Рыба", icon: "fish", slug: "fish" },
  { id: 5, name: "Хлебобулочные изделия", icon: "cakeSlice", slug: "bakery" },
  { id: 6, name: "Заготовки", icon: "box", slug: "preserves" },
  { id: 7, name: "Праздничные блюда", icon: "partyPopper", slug: "holiday" },
];

export const allCategory: Category = {
  id: 0,
  name: "Все товары",
  icon: "chefHat",
  slug: "all",
};

export const filters = [
  { id: "new", label: "Новинки" },
  { id: "hit", label: "Хиты продаж" },
]

export const mobileNavItems = [  
  { name: "Главная", href: "/", icon: Home },
  { name: "Меню", href: "/catalog", icon: Grid3X3 },
  { name: "О нас", href: "/about", icon: Info },
  { name: "Магазины", href: "/where-to-buy", icon: Store },
];

export const RESTAURANT_PHONE = "+79637042858";

export const DEFAULT_PRICE_RANGE: [number, number] = [50, 2600]