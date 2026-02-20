"use client";

import { Category } from "@/types";
import Link from "next/link";

export const CategoryCard = ({ name, icon: Icon, slug }: Category) => {
  const href = slug ? `/catalog/${slug}` : "/catalog";

  return (
    <Link
      href={href}
      className="group flex flex-col justify-center items-center bg-white hover:shadow-lg px-2 sm:px-4 lg:px-4 py-3 sm:py-5 lg:py-5 border border-gray-100 hover:border-berd-primary/30 rounded-xl lg:rounded-2xl w-[120px] sm:w-[140px] lg:w-[150px] h-[150px] sm:h-[170px] lg:h-[190px] transition-all duration-300"
      aria-label={`Перейти в категорию ${name}`}
    >
      <div className="flex justify-center items-center bg-gray-50 group-hover:bg-berd-primary/10 rounded-full w-[56px] sm:w-[64px] lg:w-[72px] h-[56px] sm:h-[64px] lg:h-[72px] group-hover:scale-105 transition-all duration-300">
        <Icon className="w-7 sm:w-8 lg:w-9 h-7 sm:h-8 lg:h-9 text-gray-700 group-hover:text-berd-primary transition-colors" />
      </div>

      <div className="mt-2 sm:mt-3 lg:mt-4 text-center">
        <h3 className="font-sans font-medium text-gray-900 group-hover:text-berd-primary text-xs sm:text-sm lg:text-sm line-clamp-2 leading-tight transition-colors">
          {name}
        </h3>

        <span className="block mt-1 font-sans text-gray-500 group-hover:text-berd-primary/70 text-xs transition-colors">
          смотреть →
        </span>
      </div>
    </Link>
  );
};