import { create } from "zustand"
import { ProductModalState } from "@/types"
import { Product } from "@/types/product"



export const useProductModalStore = create<ProductModalState>((set) => ({
  product: null,
  open: (product: Product) => set({ product }),
  close: () => set({ product: null }),
}))