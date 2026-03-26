"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart, Phone, ShoppingCart } from "lucide-react";

import { useFavoritesStore } from "@/stores/favorites.store";
import { useCartStore } from "@/stores/cart.store";
import { SearchBar } from "@/components/ui/search-bar";
import { Product } from "@/types/product";

type HeaderClientProps = {
  searchProducts: Product[];
};

export const HeaderClient = ({ searchProducts }: HeaderClientProps) => {
  const [mounted, setMounted] = useState(false);

  const favoritesCount = useFavoritesStore((s) => s.totalItems());
  const cartCount = useCartStore((s) => s.totalItems());

  useEffect(() => {
    setMounted(true);
  }, []);

  const safeFavoritesCount = mounted ? favoritesCount : 0;
  const safeCartCount = mounted ? cartCount : 0;

  return (
    <header className="top-0 z-50 sticky bg-white/95 supports-[backdrop-filter]:bg-white/60 backdrop-blur border-b w-full font-mono">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-18 lg:h-20">
          <div className="flex flex-shrink-0 items-center">
            <Link
              href="/"
              aria-label="На главную — Эльберд"
              title="Эльберд — доставка еды"
              className="flex items-center gap-1 sm:gap-2 lg:gap-3"
            >
              <div className="relative max-w-[50px] sm:max-w-[55px] lg:max-w-[58px] max-h-[50px] sm:max-h-[55px] lg:max-h-[58px]">
                <Image
                  src="/logo.png"
                  alt="Эльберд - доставка еды"
                  width={695}
                  height={792}
                  priority
                  className="w-full h-full object-contain scale-110 sm:scale-125 lg:scale-150"
                />
              </div>

              <div className="flex flex-col">
                <span className="font-bold text-berd-primary text-base sm:text-lg lg:text-2xl">
                  Эльберд
                </span>
                <p className="font-normal text-gray-500 text-xs sm:text-sm">
                  Доставка еды
                </p>
              </div>
            </Link>
          </div>

          <div className="hidden lg:block flex-1 mx-4 lg:mx-6 min-w-0 max-w-2xl">
            <SearchBar products={searchProducts} />
          </div>

          <nav
            aria-label="Навигация: избранное, корзина, телефон"
            className="flex flex-shrink-0 items-center gap-2 xs:gap-6 sm:gap-3 lg:gap-6"
          >
            <Link
              href="/favorites"
              className="relative flex items-center gap-1.5 sm:gap-2 lg:gap-2.5 hover:text-red-500 transition-colors"
              aria-label={
                mounted
                  ? `Избранное: ${safeFavoritesCount} товаров`
                  : "Избранное"
              }
            >
              <div className="relative">
                <Heart className="w-4 xs:w-6 sm:w-6 lg:w-6 h-4 xs:h-6 sm:h-6 lg:h-6 text-gray-700" />

                {safeFavoritesCount > 0 && (
                  <span className="-top-1.5 sm:-top-2 -right-1.5 sm:-right-2 absolute flex justify-center items-center bg-red-500 rounded-full w-3.5 sm:w-4 lg:w-5 h-3.5 sm:h-4 lg:h-5 font-semibold text-[9px] text-white sm:text-[10px] animate-pop">
                    {safeFavoritesCount}
                  </span>
                )}
              </div>

              <span className="hidden lg:inline font-medium text-gray-700 hover:text-berd-primary text-sm duration-300 ease-in-out">
                Избранное
              </span>
            </Link>

            <Link
              href="/cart"
              className="relative flex items-center gap-1.5 sm:gap-2 lg:gap-2.5 transition-colors"
              aria-label={
                mounted
                  ? `Корзина: ${safeCartCount} товаров`
                  : "Корзина"
              }
            >
              <div className="relative">
                <ShoppingCart className="w-4 xs:w-6 sm:w-6 lg:w-6 h-4 xs:h-6 sm:h-6 lg:h-6 text-gray-700" />

                {safeCartCount > 0 && (
                  <span className="-top-1.5 sm:-top-2 -right-1.5 sm:-right-2 absolute flex justify-center items-center bg-berd-primary rounded-full w-3.5 sm:w-4 lg:w-5 h-3.5 sm:h-4 lg:h-5 font-semibold text-[9px] text-black sm:text-[10px] animate-pop">
                    {safeCartCount}
                  </span>
                )}
              </div>

              <span className="hidden lg:inline font-medium text-gray-700 hover:text-berd-primary text-sm duration-300 ease-in-out">
                Корзина
              </span>
            </Link>

            <div className="flex items-center">
              <a
                href="tel:+79899194871"
                className="lg:hidden flex justify-center items-center hover:bg-gray-100 rounded-full w-9 sm:w-10 h-9 sm:h-10 transition-colors"
                aria-label="Позвонить +7 (989) 919-48-71"
              >
                <Phone className="w-4 xs:w-6 sm:w-5 h-4 xs:h-6 sm:h-5 text-gray-700" />
              </a>

              <div className="hidden lg:flex items-center gap-3 font-medium">
                <a
                  href="tel:+79899194871"
                  className="flex items-center gap-2 bg-berd-primary hover:bg-black px-4 py-2 rounded-lg font-semibold text-white text-sm transition duration-300 ease-in-out"
                  aria-label="Позвонить по номеру +7 (989) 919-48-71"
                >
                  <Phone className="w-4 h-4" />
                  Позвонить
                </a>

                <div className="flex flex-col">
                  <span className="font-bold text-gray-900 text-sm">
                    +7 (989) 919-48-71
                  </span>
                  <p className="font-medium text-gray-500 text-xs">
                    время работы: 9:00-20:00
                  </p>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};