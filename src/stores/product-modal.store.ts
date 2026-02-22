import { create } from "zustand"
import { ProductModalState } from "@/types"



export const useProductModalStore = create<ProductModalState>((set) => ({
  product: null,
  open: (product) => set({ product }),
  close: () => set({ product: null }),
}))