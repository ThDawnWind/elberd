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
  selectedCategory: number;
  setSelectedCategory: (id: number) => void;
  resetFilters: () => void;
}

export type FilterItem = {
  id: string;
  label: string;
  condition: (product: Product) => boolean;
};

export interface MobileFiltersSheetProps {
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;

  selectedFilters: string[];
  toggleFilter: (id: string) => void;

  selectedCategory: number;
  setSelectedCategory: (id: number) => void;

  resetFilters: () => void;

  filters: FilterItem[];
}

export interface AddToCartButtonProps {
  product: Product;
  price: number;
  variant?: 'grid' | 'list' | 'compact' | 'modal';
  className?: string;
  size?: 'default' | 'sm' | 'lg' | 'xl';
  initialQuantity?: number;
  onQuantityChange?: (dishId: number, quantity: number) => void;
}

export interface SizeStyle {
  button?: string;
  quantityButton?: string;
  iconSize?: string;
  cartText?:string;
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
  readonly heightClass: string
  readonly sizes?: string
}
export type SortKey = "rating" | "price-asc" | "price-desc" | "new"
export type ViewMode = "grid" | "list"

export type CatalogState = {
  products: Product[]
  categories: Category[]

  viewMode: ViewMode
  priceRange: [ number, number ]
  selectedCategoryId: number
  selectedTags: string[]
  sort: SortKey


  setProducts: (products: Product[]) => void
  setCategories: (categories: Category[]) => void

  setViewMode: (viewMode: ViewMode) => void
  setPriceRange: (priceRange: [ number, number ]) => void
  setSelectedCategoryId: (categoryId: number) => void
  toggleTag: (tag: string) => void
  setSort: (sort: SortKey) => void
  resetFilters: () => void
  setSelectedTags: (tags: string[]) => void
  hasActiveFilters: () => boolean
}

export type CartState = {
  items: CartItem[]
  hasHydrated: boolean
  setHasHydrated: (v: boolean) => void

  addToCart: (id: number, name: string, price: number, weight: string, image: string, qty: number) => void
  removeFromCart: (id: number) => void
  updateQuantity: (id: number, qty: number) => void
  clearCart: () => void
  totalItems: () => number
  totalAmount: () => number
}

export type FavoritesState = {
  ids: number[]
  hasHydrated: boolean
  setHasHydrated: (v: boolean) => void

  toggleFavorite: (id: number) => void
  clearFavorites: () => void
  isFavorite: (id: number) => boolean
  totalItems: () => number
}

export type ModalProps = {
  product: Product
  onClose: () => void
}

export type ProductModalState = {
  product: Product | null
  open: (product: Product) => void
  close: () => void
}