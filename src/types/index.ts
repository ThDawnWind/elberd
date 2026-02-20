import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";

export interface Category {
  id: number;
  name: string;
  icon: LucideIcon;
  slug: string;
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
  isHit: boolean;
  isPopular: boolean;
  isRecommended: boolean;
  tags?: string[];
}

export interface CartItem {
  id: number;
  name: string;
  price: number;
  weight: string;
  image: string;
  quantity: number;
}

export interface CategoryDropdownProps {
  readonly selectedCategory: string;
  readonly setSelectedCategory: (category: string) => void;
  readonly trigger: ReactNode;
}


export interface DesktopFiltersSidebarProps {
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
  selectedFilters: string[];
  toggleFilter: (id: string) => void;
  selectedCategory: number | null;
  setSelectedCategory: (id: number | null) => void;
  resetFilters: () => void;
}

export interface MobileFiltersSheetProps {
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
  selectedFilters: string[];
  toggleFilter: (id: string) => void;
  selectedCategory: number | null;
  setSelectedCategory: (id: number | null) => void;
  resetFilters: () => void;
  filters: Array<{
    id: string;
    label: string;
    condition: (product: Product) => boolean;
  }>;
}

export interface AddToCartButtonProps {
  product: Product;
  price: number;
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
  price: number; 
  variant?: 'grid' | 'list' | 'detailed';
  className?: string;
}

export interface CarouselWithDotsProps {
  readonly images: string[]
  readonly alt: string
  readonly className?: string
  readonly imageClassName?: string
}
export type SortKey = "rating" | "price-asc" | "price-desc" | "new"
export type ViewMode = "grid" | "list"

export type CatalogState = {
  products: Product[]
  categories: Category[]

  viewMode: ViewMode
  priceRange: [ number, number ]
  selectedCategoryId: number | null
  selectedTags: string[]
  sort: SortKey


  setProducts: (products: Product[]) => void
  setCategories: (categories: Category[]) => void

  setViewMode: (viewMode: ViewMode) => void
  setPriceRange: (priceRange: [ number, number ]) => void
  setSelectedCategoryId: (categoryId: number | null) => void
  toggleTag: (tag: string) => void
  setSort: (sort: SortKey) => void
  resetFilters: () => void
}

