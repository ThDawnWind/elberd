"use client"

import { ProductModal } from "@/components/ProductModal"
import { useProductModalStore } from "@/stores/product-modal.store"
import { AnimatePresence } from "motion/react"

export function GlobalProductModal() {
  const product = useProductModalStore((s) => s.product)
  const close = useProductModalStore((s) => s.close)

  if (!product) return null

  return <AnimatePresence mode="wait">
            <ProductModal product={product} onClose={close} />
          </AnimatePresence>
}