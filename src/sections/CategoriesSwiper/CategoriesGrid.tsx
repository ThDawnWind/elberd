"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { CATEGORIES } from "@/lib/constants";
import { ICONS } from "@/lib/icons";
import { Category } from "@/types";

const CategoryTile = ({ category }: { category: Category }) => {
  const Icon = category.icon ? ICONS[category.icon as keyof typeof ICONS] : null;
  const href = category.slug
    ? { pathname: "/catalog", query: { category: category.slug } }
    : "/catalog";

  return (
    <Link
      href={href}
      prefetch={false}
      aria-label={`Категория «${category.name}»`}
      className="
        group flex flex-col items-center justify-center gap-1.5
        h-20 px-1 py-3
        rounded-xl border border-[#F3F4F6] bg-[#FFF8F0]
        transition-all duration-200
        hover:border-[#d9a441] hover:shadow-sm active:scale-95
      "
    >
      {Icon && (
        <Icon className="w-6 h-6 text-[#d9a441] transition-colors duration-200 group-hover:text-[#b8872e]" />
      )}
      <span className="text-[10px] font-medium text-[#374151] text-center leading-tight line-clamp-2 w-full px-1 text-ellipsis">
        {category.name}
      </span>
    </Link>
  );
};

export const CategoriesGrid = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="mb-8"
    >
      <h2 className="text-xl font-bold text-[#111827] mb-4">Категории</h2>

      <div className="flex flex-col gap-2">
        <div className="grid grid-cols-4 gap-2">
          {CATEGORIES.slice(0, 4).map((category) => (
            <CategoryTile key={category.id} category={category} />
          ))}
        </div>
        <div className="grid grid-cols-3 gap-2">
          {CATEGORIES.slice(4).map((category) => (
            <CategoryTile key={category.id} category={category} />
          ))}
        </div>
      </div>
    </motion.section>
  );
};
