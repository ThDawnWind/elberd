"use client"

import { useState } from "react"
import { DishCard } from "@/components/ui/DishCard"
import { DishCardGridSkeleton } from "@/components/ui/DishCardSkeleton"
import { recommendedProducts } from "@/lib/products"
import { Reveal } from "./Reveal"

export const RecommendedDishes = () => {
    const [loading, setLoading] = useState<boolean>(true)
  
    setTimeout(() => {
      setLoading(false)
    }, 5000)

  return (
    <section
      className="mb-[64px] xs:mb-[32px] px-4 sm:px-6 lg:px-8"
      aria-labelledby="recommended-dishes-title"
    >

      <header className="mb-8 sm:mb-10 lg:mb-12">
        <h2 className="font-bold text-gray-900 text-xl sm:text-2xl lg:text-3xl">
          Рекомендуем попробовать
        </h2>
      </header>

     <ul className="gap-[4px] grid grid-cols-[repeat(auto-fill,minmax(265px,1fr))]">
        {loading 
            ? Array.from({ length: 5 }).map((_, i) => (
            <li key={i}>
              <DishCardGridSkeleton />
            </li>
          )) : recommendedProducts.map((product) => (
              <li key={product.id}>
                <Reveal>
                  <DishCard price={product.price} product={product} variant="grid" />
                </Reveal>
              </li>
            ))}
      </ul>
    </section>
  )
}