"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";

import { useCartStore } from "@/stores/cart.store";

export const CartLink = () => {
  const [mounted, setMounted] = useState(false);
  const cartCount = useCartStore((state) => state.totalItems());

  useEffect(() => {
    setMounted(true);
  }, []);

  const safeCartCount = mounted ? cartCount : 0;

  return (
    <Link
      href="/cart"
      className="relative flex items-center gap-1.5 sm:gap-2 lg:gap-2.5 transition-colors"
      aria-label={mounted ? `Корзина: ${safeCartCount} товаров` : "Корзина"}
    >
      <div className="relative">
        <ShoppingCart className="w-4 xs:w-6 sm:w-6 lg:w-6 h-4 xs:h-6 sm:h-6 lg:h-6 text-gray-700" />

        {safeCartCount > 0 && (
          <span className="-top-1.5 sm:-top-2 -right-1.5 sm:-right-2 absolute flex justify-center items-center bg-berd-primary rounded-full w-3.5 sm:w-4 lg:w-5 h-3.5 sm:h-4 lg:h-5 font-semibold text-[9px] text-black sm:text-[10px] animate-pop">
            {safeCartCount}
          </span>
        )}
      </div>
    </Link>
  );
};
