"use client"

import { ProductModal } from "@/components/ProductModal"
import { useProductModalStore } from "@/stores/product-modal.store"

export function GlobalProductModal() {
  const product = useProductModalStore((s) => s.product)
  const close = useProductModalStore((s) => s.close)

  if (!product) return null

  return <ProductModal product={product} onClose={close} />
}