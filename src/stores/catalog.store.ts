import { create } from "zustand";

type CatalogUIState = {
  viewMode: "grid" | "list";
  setViewMode: (mode: "grid" | "list") => void;

  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;

  mobileFiltersOpen: boolean;
  setMobileFiltersOpen: (open: boolean) => void;
};

export const useCatalogUIStore = create<CatalogUIState>((set) => ({
  viewMode: "grid",
  setViewMode: (viewMode) => set({ viewMode }),

  isLoading: false,
  setIsLoading: (isLoading) => set({ isLoading }),

  mobileFiltersOpen: false,
  setMobileFiltersOpen: (mobileFiltersOpen) => set({ mobileFiltersOpen }),
}));