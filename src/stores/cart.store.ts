import {  CartState } from "@/types"
import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      hasHydrated: false,
      skipHydration: true,
      onRehydrateStorage: () => (state: { setHasHydrated: (arg0: boolean) => void }) => state?.setHasHydrated(true),
      setHasHydrated: (v) => set({ hasHydrated: v }),

      addToCart: (id, name, price, weight, image, qty = 1) => {
        const items = get().items
        const existing = items.find((i) => i.id === id)

        if (existing) {
          set({
            items: items.map((i) =>
              i.id === id ? { ...i, quantity: i.quantity + qty } : i
            ),  
          })
          return
        }

        set({ items: [...items, { id, name, price, weight, image, quantity: qty }] })
      },

      removeFromCart: (id) =>
        set({ items: get().items.filter((i) => i.id !== id) }),

      updateQuantity: (id, qty) => {
        if (qty <= 0) {
          set({ items: get().items.filter((i) => i.id !== id) })
          return
        }
        set({
          items: get().items.map((i) =>
            i.id === id ? { ...i, quantity: qty } : i
          ),
        })
      },

      clearCart: () => set({ items: [] }),

      totalItems: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
      totalAmount: () => get().items.reduce((sum, i) => sum + i.quantity * i.price, 0),
    }),
    {
      name: "cart-store",
      storage: createJSONStorage(() => localStorage),
      version: 1,
      skipHydration: true,
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true)
      },
    }
  )
)
