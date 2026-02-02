// components/sections/CategoryCard.tsx
"use client";

import Link from "next/link";

interface CategoryCardProps {
  category: {
    id: number;
    name: string;
    icon: JSX.Element;
  };
}

export const CategoryCard = ({ category }: CategoryCardProps) => {
  return (
    <Link
      href="#"
      className="group flex flex-col justify-center items-center bg-white hover:shadow-lg px-3 sm:px-4 py-4 sm:py-5 border border-gray-100 hover:border-berd-primary/30 rounded-xl sm:rounded-2xl w-[140px] sm:w-[150px] h-[170px] sm:h-[190px] transition-all duration-300"
    >
      <div
        className="flex justify-center items-center bg-gray-50 group-hover:bg-berd-primary/10 rounded-full w-[64px] sm:w-[72px] h-[64px] sm:h-[72px] text-2xl sm:text-3xl group-hover:scale-105 transition-all duration-300"
      >
        {category.icon}
      </div>

      <div className="mt-3 sm:mt-4 text-center">
        <h3
          className="font-sans font-medium text-gray-900 group-hover:text-berd-primary text-xs sm:text-sm line-clamp-2 leading-tight transition-colors"
        >
          {category.name}
        </h3>

        <span
          className="block mt-1 font-sans text-gray-500 group-hover:text-berd-primary/70 text-xs transition-colors"
        >
          смотреть →
        </span>
      </div>
    </Link>
  );
};