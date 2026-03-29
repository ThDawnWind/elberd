import {
  Beef,
  Box,
  CakeSlice,
  ChefHat,
  CookingPot,
  Fish,
  Grid3X3,
  Home,
  Info,
  Package,
  PartyPopper,
  Store,
} from "lucide-react";

export const ICONS = {
  package: Package,
  cookingPot: CookingPot,
  beef: Beef,
  fish: Fish,
  cakeSlice: CakeSlice,
  box: Box,
  partyPopper: PartyPopper,
  chefHat: ChefHat,
  home: Home,
  grid: Grid3X3,
  info: Info,
  store: Store,
} as const;

export type IconKey = keyof typeof ICONS;