"use client"

import { DishCard } from "@/components/ui/DishCard"
import { popularProducts } from "@/lib/products"
import { motion } from "motion/react"

export const PopularDishes = () => {
  return (
    <motion.section
      className="mt-8 px-4 sm:px-6 lg:px-8"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.06 } },
      }}
    >
      <motion.div
        className="mb-8 sm:mb-10 lg:mb-12"
        variants={{
          hidden: { opacity: 0, y: 14 },
          show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
        }}
      >
        <h2 className="font-sans font-bold text-gray-900 text-xl sm:text-2xl lg:text-3xl">
          Популярные блюда
        </h2>
        <p className="mt-2 font-sans text-gray-500 text-xs sm:text-sm lg:text-base">
          Самые любимые блюда наших гостей — проверенный выбор для идеального ужина
        </p>
      </motion.div>

      <div className="gap-2 sm:gap-3 lg:gap-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {popularProducts.map((product) => (
          <motion.div
            key={product.id}
            variants={{
              hidden: { opacity: 0, y: 12, scale: 0.98 },
              show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.35, ease: "easeOut" } },
            }}
          >
            <DishCard price={product.price} product={product} variant="grid" />
          </motion.div>
        ))}
      </div>
    </motion.section>
  )
}