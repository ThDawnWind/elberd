import { Category } from "@/types";
import { Beef, Box, CakeSlice, ChefHat, CookingPot, Fish, Package, PartyPopper } from "lucide-react";


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