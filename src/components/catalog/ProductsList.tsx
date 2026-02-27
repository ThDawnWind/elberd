"use client";

import { motion } from "motion/react";
import { DishCard } from "@/components/ui/DishCard";
import { Product } from "@/types";

const list = { hidden: {}, show: { transition: { staggerChildren: 0.04 } } };
const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

const item = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: EASE_OUT } },
};

export default function ProductsList({ products }: { products: Product[] }) {
  return (
    <motion.ul className="space-y-4" variants={list} initial="hidden" animate="show" layout>
      {products.map((product) => (
        <motion.li
          key={product.id}
          variants={item}
          layout="position"
          exit={{ opacity: 0, y: 6, transition: { duration: 0.15 } }}
        >
          <DishCard product={product} price={product.price} variant="list" />
        </motion.li>
      ))}
    </motion.ul>
  );
}