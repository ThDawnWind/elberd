"use client"

import { useEffect } from "react"
import { useFavoritesStore } from "@/stores/favorites.store"
import { useCartStore } from "@/stores/cart.store"

export function StoreHydration() {
  useEffect(() => {
    useFavoritesStore.persist.rehydrate()
    useCartStore.persist.rehydrate()
  }, [])

  return null
}