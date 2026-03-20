import { create } from "zustand";

type CatalogUIState = {
  viewMode: "grid" | "list";
  setViewMode: (mode: "grid" | "list") => void;

  mobileFiltersOpen: boolean;
  setMobileFiltersOpen: (open: boolean) => void;
};

export const useCatalogUIStore = create<CatalogUIState>((set) => ({
  viewMode: "grid",
  setViewMode: (viewMode) => set({ viewMode }),

  mobileFiltersOpen: false,
  setMobileFiltersOpen: (mobileFiltersOpen) => set({ mobileFiltersOpen }),
}));