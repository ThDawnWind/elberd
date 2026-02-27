import { create } from "zustand"
import type { CatalogState } from "../types"
import { DEFAULT_PRICE_RANGE } from "@/lib/constants"

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

  setSelectedCategoryId: (selectedCategoryId) =>
    set({ selectedCategoryId }),

  toggleTag: (tagId) => {
    const { selectedTags } = get()
    const exists = selectedTags.includes(tagId)

    set({
      selectedTags: exists
        ? selectedTags.filter((id) => id !== tagId)
        : [...selectedTags, tagId],
    })
  },

  setSelectedTags: (tags) =>
    set({ selectedTags: Array.from(new Set(tags)) }),

  setSort: (sortKey) => set({ sort: sortKey }),

  resetFilters: () =>
    set({
      priceRange: DEFAULT_PRICE_RANGE,
      selectedTags: [],
      selectedCategoryId: 0,
      sort: "rating",
    }),
}))