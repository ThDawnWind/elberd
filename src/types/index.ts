import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";

export interface Category {
  id: number;
  name: string;
  icon: LucideIcon;
  href: string;
}

export interface Product {
  id: number;
  image: string;
  images?: string[]
  name: string;
  shelfLife: string
  weight: string; 
  price: number;
  rating: number
  category: string;
  quantity?: number;
  content?: string;
  isNew: boolean;
  tags?: string[];
}

export interface CategoryDropdownProps {
  readonly selectedCategory: string;
  readonly setSelectedCategory: (category: string) => void;
  readonly trigger: ReactNode;
}


export interface DesktopFiltersSidebarProps {
  priceRange: number[];
  setPriceRange: (range: number[]) => void;
  selectedFilters: string[];
  toggleFilter: (id: string) => void;
  selectedCategory: string;
  setSelectedCategory: (id: string) => void;
  resetFilters: () => void;
}

export interface MobileFiltersSheetProps {
  priceRange: number[];
  setPriceRange: (range: number[]) => void;
  selectedFilters: string[];
  toggleFilter: (id: string) => void;
  selectedCategory: string;
  setSelectedCategory: (id: string) => void;
  resetFilters: () => void;
  filters: Array<{
    id: string;
    label: string;
    condition: (product: Product) => boolean;
  }>;
}

export interface AddToCartButtonProps {
  dishId: number;
  variant?: 'grid' | 'list' | 'compact';
  className?: string;
  size?: 'default' | 'sm' | 'lg';
  initialQuantity?: number;
  onQuantityChange?: (dishId: number, quantity: number) => void;
}

export interface SizeStyle {
  button?: string;
  quantityButton?: string;
  iconSize?: string;
};

export interface DishCardProps {
  product: Product; 
  variant?: 'grid' | 'list' | 'detailed';
  className?: string;
}

export interface CarouselWithDotsProps {
  readonly images: string[]
  readonly alt: string
  readonly className?: string
  readonly imageClassName?: string
}