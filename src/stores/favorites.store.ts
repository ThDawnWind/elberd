import { FavoritesState } from "@/types"
import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"


export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      ids: [],
      hasHydrated: false,
      setHasHydrated: (v) => set({ hasHydrated: v }),

      toggleFavorite: (id: string) => {
        const ids = get().ids
        set({
          ids: ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id],
        })
      },

      clearFavorites: () => set({ ids: [] }),
      isFavorite: (id) => get().ids.includes(id),
      totalItems: () => get().ids.length,
    }),
    {
      name: "favorites-store",
      storage: createJSONStorage(() => localStorage),
      version: 1,
      skipHydration: true,
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true)
      },
    }
  )
)