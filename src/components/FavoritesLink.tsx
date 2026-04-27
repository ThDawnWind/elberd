"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Heart } from "lucide-react";

import { useFavoritesStore } from "@/stores/favorites.store";

export const FavoritesLink = () => {
  const [mounted, setMounted] = useState(false);
  const favoritesCount = useFavoritesStore((state) => state.totalItems());

  useEffect(() => {
    setMounted(true);
  }, []);

  const safeFavoritesCount = mounted ? favoritesCount : 0;

  return (
    <Link
      href="/favorites"
      className="relative flex items-center gap-1.5 sm:gap-2 lg:gap-2.5 hover:text-red-500 transition-colors"
      aria-label={mounted ? `Избранное: ${safeFavoritesCount} товаров` : "Избранное"}
    >
      <div className="relative">
        <Heart className="w-4 xs:w-6 sm:w-6 lg:w-6 h-4 xs:h-6 sm:h-6 lg:h-6 text-gray-700" />

        {safeFavoritesCount > 0 && (
          <span className="-top-1.5 sm:-top-2 -right-1.5 sm:-right-2 absolute flex justify-center items-center bg-red-500 rounded-full w-3.5 sm:w-4 lg:w-5 h-3.5 sm:h-4 lg:h-5 font-semibold text-[9px] text-white sm:text-[10px] animate-pop">
            {safeFavoritesCount}
          </span>
        )}
      </div>
    </Link>
  );
};
