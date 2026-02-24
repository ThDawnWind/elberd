"use client"

import { DishCard } from "@/components/ui/DishCard"
import { recommendedProducts } from "@/lib/products"
import { motion } from "motion/react"

export const RecommendedDishes = () => {
  return (
    <motion.section
      className="mt-8 mb-2 px-4 sm:px-6 lg:px-8"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: 0.08,
            delayChildren: 0.1,
          },
        },
      }}
    >

      <motion.div
        className="mb-8 sm:mb-10 lg:mb-12"
        variants={{
          hidden: { opacity: 0, y: 20 },
          show: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" },
          },
        }}
      >
        <h2 className="font-sans font-bold text-gray-900 text-xl sm:text-2xl lg:text-3xl">
          Рекомендуем попробовать
        </h2>
        <p className="mt-2 font-sans text-gray-500 text-xs sm:text-sm lg:text-base">
          Особенные блюда от нашего шеф-повара — лучший выбор для гурманов
        </p>
      </motion.div>

      <div className="gap-2 sm:gap-3 lg:gap-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {recommendedProducts.map((product) => (
          <motion.div
            key={product.id}
            variants={{
              hidden: { opacity: 0, y: 24, scale: 0.96 },
              show: {
                opacity: 1,
                y: 0,
                scale: 1,
                transition: {
                  duration: 0.45,
                  ease: [0.22, 1, 0.36, 1], 
                },
              },
            }}
          >
            <DishCard
              product={product}
              price={product.price}
              variant="grid"
            />
          </motion.div>
        ))}
      </div>
    </motion.section>
  )
}