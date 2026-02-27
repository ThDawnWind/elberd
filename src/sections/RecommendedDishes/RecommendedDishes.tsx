"use client"

import { DishCard } from "@/components/ui/DishCard"
import { recommendedProducts } from "@/lib/products"
import { Reveal } from "./Reveal"

export const RecommendedDishes = () => {
  return (
    <section
      className="mt-8 mb-2 px-4 sm:px-6 lg:px-8"
      aria-labelledby="recommended-dishes-title"
    >

      <header className="mb-8 sm:mb-10 lg:mb-12">
        <h2 className="font-mono font-bold text-gray-900 text-xl sm:text-2xl lg:text-3xl">
          Рекомендуем попробовать
        </h2>
        <p className="mt-2 font-mono text-gray-500 text-xs sm:text-sm lg:text-base">
          Особенные блюда от нашего шеф-повара — лучший выбор для гурманов
        </p>
      </header>

      <div className="gap-2 sm:gap-3 lg:gap-4 grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {recommendedProducts.map((product) => (
          <li key={product.id}>
            <Reveal>
               <DishCard
                  product={product}
                  price={product.price}
                  variant="grid"
                />
            </Reveal>
          </li>
        ))}
      </div>
    </section>
  )
}