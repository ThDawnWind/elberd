import { CartItem } from "@/types"
import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"

type CartState = {
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

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      hasHydrated: false,
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
