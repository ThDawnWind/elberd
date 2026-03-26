"use client";

import { forwardRef } from "react";
import { motion } from "motion/react";
import { DishCard } from "@/components/ui/DishCard";
import { Product } from "@/types/product";
import { DishCardListSkeleton } from "../ui/DishCardSkeleton";

const list = {
  hidden: {},
  show: { transition: { staggerChildren: 0.04 } },
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

type ProductsListProps = {
  products: Product[];
  isLoading: boolean;
};

const ProductsList = forwardRef<HTMLUListElement, ProductsListProps>(
  ({ products, isLoading }, ref) => {
    const skeletons = Array.from({ length: 8 });

    return (
      <motion.ul
        ref={ref}
        className="space-y-2"
        variants={list}
        initial="hidden"
        animate="show"
        layout
      >
        {isLoading
          ? skeletons.map((_, index) => (
              <motion.li key={index} variants={item}>
                <DishCardListSkeleton />
              </motion.li>
            ))
          : products.map((product) => (
              <motion.li
                key={product.id}
                variants={item}
                layout="position"
                exit={{ opacity: 0, y: 6, transition: { duration: 0.15 } }}
              >
                <DishCard
                  product={product}
                  price={product.price}
                  variant="list"
                />
              </motion.li>
            ))}
      </motion.ul>
    );
  }
);

ProductsList.displayName = "ProductsList";

export default ProductsList;