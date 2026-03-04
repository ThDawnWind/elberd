import { create } from "zustand";
import type { CatalogState } from "../types";
import { DEFAULT_PRICE_RANGE } from "@/lib/constants";

const isSameRange = (
  a: [number, number],
  b: [number, number]
) => a[0] === b[0] && a[1] === b[1];

export const useCatalogStore = create<CatalogState>((set, get) => ({
  products: [],
  categories: [],
  viewMode: "grid",
  priceRange: DEFAULT_PRICE_RANGE,
  selectedCategoryId: 0,
  selectedTags: [],
  sort: "rating",

  setProducts: (products) => set({ products }),
  setCategories: (categories) => set({ categories }),
  setViewMode: (viewMode) => set({ viewMode }),
  setPriceRange: (priceRange) => set({ priceRange }),

  setSelectedCategoryId: (selectedCategoryId) => set({ selectedCategoryId }),

  toggleTag: (tagId) => {
    const { selectedTags } = get();
    const exists = selectedTags.includes(tagId);

    set({
      selectedTags: exists
        ? selectedTags.filter((id) => id !== tagId)
        : [...selectedTags, tagId],
    });
  },

  setSelectedTags: (tags) => set({ selectedTags: Array.from(new Set(tags)) }),

  setSort: (sortKey) => set({ sort: sortKey }),

  hasActiveFilters: () => {
    const { selectedCategoryId, selectedTags, priceRange, sort } = get();

    const categoryActive = selectedCategoryId !== 0;
    const tagsActive = selectedTags.length > 0;
    const priceActive = !isSameRange(priceRange, DEFAULT_PRICE_RANGE);
    const sortActive = sort !== "rating";

    return categoryActive || tagsActive || priceActive || sortActive;
  },

  resetFilters: () =>
    set({
      priceRange: DEFAULT_PRICE_RANGE,
      selectedTags: [],
      selectedCategoryId: 0,
      sort: "rating",
    }),
}));