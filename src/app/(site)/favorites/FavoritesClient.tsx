"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Heart, ShoppingBag, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useFavoritesStore } from "@/stores/favorites.store";
import { DishCard } from "@/components/ui/DishCard";
import { Reveal } from "@/sections/PopularDishes/Reveal";
import { Product } from "@/types/product";

type FavoritesClientProps = {
  products: Product[];
};

export default function FavoritesClient({ products }: FavoritesClientProps) {
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const hydrated = useFavoritesStore((s) => s.hasHydrated);
  const ids = useFavoritesStore((s) => s.ids);
  const totalItems = useFavoritesStore((s) => s.totalItems());

  const favoriteProducts = useMemo(
    () => products.filter((p) => ids.includes(p.id)),
    [products, ids]
  );

  useEffect(() => {
    document.body.style.overflow = showClearConfirm ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [showClearConfirm]);

  const clearAllFavorites = () => {
    useFavoritesStore.getState().clearFavorites();
    setShowClearConfirm(false);
  };

  if (!hydrated) {
    return <FavoritesSkeleton />;
  }

  return (
    <div className="bg-white w-full min-h-screen">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-5 lg:py-10 w-full">
        <div className="mb-5">
          <div className="flex flex-col gap-4 mb-4">
            <div className="space-y-1">
              <h1 className="font-sans font-bold text-gray-900 text-xl lg:text-2xl">
                Избранные товары
              </h1>
              <p className="font-mono font-normal text-gray-600 text-sm sm:text-base">
                Ваши любимые блюда всегда под рукой
              </p>
            </div>

            <div className="flex justify-between items-center gap-3">
              <Badge className="bg-berd-primary px-4 py-2 font-sans font-light text-black text-xs sm:text-sm">
                {totalItems} товаров
              </Badge>

              {favoriteProducts.length > 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowClearConfirm(true)}
                  className="hover:bg-red-50 border-red-200 font-sans font-light text-red-600"
                >
                  <Trash2 className="mr-2 w-4 h-4" />
                  Очистить все
                </Button>
              )}
            </div>
          </div>

          <div className="bg-gray-200 w-full h-px" />
        </div>

        {favoriteProducts.length === 0 ? (
          <div className="py-16 text-center">
            <div className="flex justify-center items-center bg-gray-100 mx-auto mb-6 rounded-full w-20 h-20">
              <Heart className="w-10 h-10 text-gray-300" />
            </div>

            <h2 className="mb-3 font-bold text-gray-900 text-xl">
              В избранном пока ничего нет
            </h2>

            <p className="mx-auto mb-8 max-w-md text-gray-600 text-sm">
              Добавляйте понравившиеся товары в избранное, нажимая на сердечко в карточке товара
            </p>

            <Button asChild className="bg-berd-primary hover:bg-berd-primary/90">
              <Link href="/catalog">
                <ShoppingBag className="mr-2 w-4 h-4" />
                Перейти в каталог
              </Link>
            </Button>
          </div>
        ) : (
          <ul className="gap-4 grid grid-cols-[repeat(auto-fill,minmax(265px,1fr))]">
            {favoriteProducts.map((product) => (
              <li key={product.id}>
                <Reveal>
                  <DishCard price={product.price} product={product} variant="grid" />
                </Reveal>
              </li>
            ))}
          </ul>
        )}
      </div>

      {showClearConfirm && (
        <ClearConfirmModal
          onConfirm={clearAllFavorites}
          onCancel={() => setShowClearConfirm(false)}
        />
      )}
    </div>
  );
}

function FavoritesSkeleton() {
  return (
    <div className="bg-white w-full min-h-screen">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <p className="sr-only" aria-live="polite">
          Загружаем избранные товары…
        </p>

        <div className="gap-4 grid xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="bg-gray-100 rounded-xl aspect-square animate-pulse" />
          ))}
        </div>
      </div>
    </div>
  );
}

function ClearConfirmModal({
  onConfirm,
  onCancel,
}: {
  onConfirm: () => void;
  onCancel: () => void;
}) {
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onCancel();
  };

  return (
    <div
      className="z-50 fixed inset-0 flex justify-center items-center bg-black/50 p-4"
      onClick={handleOverlayClick}
    >
      <div
        className={cn(
          "bg-white shadow-xl p-6 rounded-2xl w-full max-w-md",
          "animate-in fade-in zoom-in duration-300"
        )}
      >
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-red-100 p-3 rounded-full">
              <Trash2 className="w-8 h-8 text-red-600" />
            </div>
          </div>

          <h2 className="mb-2 font-bold text-lg">Удалить товары из избранного?</h2>

          <p className="mb-6 text-gray-600 text-sm">
            Вы уверены, что хотите удалить все товары?
          </p>

          <div className="flex gap-3">
            <Button variant="outline" onClick={onCancel} className="flex-1">
              Отмена
            </Button>
            <Button onClick={onConfirm} className="flex-1 bg-red-600 hover:bg-red-700">
              Очистить
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}