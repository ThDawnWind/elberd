"use client";

import { motion } from "motion/react";
import { DishCard } from "@/components/ui/DishCard";
import { Product } from "@/types/product";
import { DishCardGridSkeleton } from "../ui/DishCardSkeleton";

const list = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.04 },
  },
};

const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

const item = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: EASE_OUT },
  },
};

export default function ProductsGrid({
  products,
  isLoading,
}: {
  products: Product[];
  isLoading: boolean;
}) {
  
  const skeletons = Array.from({ length: 8 });

  return (
    <motion.ul
      className="justify-center gap-[4px] grid grid-cols-[repeat(auto-fill,265px)]"
      variants={list}
      initial="hidden"
      animate="show"
      layout
    >
      {isLoading
        ? skeletons.map((_, index) => (
            <motion.li key={index} variants={item}>
              <DishCardGridSkeleton/>
            </motion.li>
          ))
        : products.map((product) => (
            <motion.li
              key={product.id}
              variants={item}
              layout="position"
              exit={{
                opacity: 0,
                scale: 0.98,
                transition: { duration: 0.15 },
              }}
            >
              <DishCard
                product={product}
                price={product.price}
                variant="grid"
              />
            </motion.li>
          ))}
    </motion.ul>
  );
}