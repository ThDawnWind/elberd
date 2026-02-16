"use client";

import { useState, useEffect } from "react"; // 👈 добавляем useEffect
import { DishCard } from "@/components/ui/DishCard";
import { Heart, ShoppingBag, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { favProducts } from "@/lib/products";
import { cn } from "@/lib/utils";

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState(favProducts);
  const [showClearConfirm, setShowClearConfirm] = useState(false); 

  useEffect(() => {
    if (showClearConfirm) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [showClearConfirm]);

  const clearAllFavorites = () => {
    setFavorites([]);
    setShowClearConfirm(false);
  };

  return (
    <div className="bg-white w-full min-h-screen">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-5 lg:py-10 w-full">
        <div className="mb-5">
          <div className="flex flex-col justify-between items-start sm:items-center gap-4 sm:gap-6 mb-4 sm:mb-5">
            <div className="flex flex-col flex-start gap-1 w-full">
              <h1 className="mb-2 font-sans font-bold text-gray-900 sm:text-xl lg:text-2xl leading-tight">
                Избранные товары
              </h1>
              <p className="max-w-3xl font-sans text-gray-600 text-sm sm:text-base lg:text-lg leading-relaxed">
                Ваши любимые блюда всегда под рукой
              </p>
            </div>
            
            <div className="flex justify-between items-center gap-2 sm:gap-3 w-full">
              <Badge className="bg-berd-primary px-3 sm:px-4 lg:px-4 py-1.5 sm:py-2 font-sans text-white text-xs sm:text-sm whitespace-nowrap">
                {favorites.length} товаров
              </Badge>
              
              {favorites.length > 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowClearConfirm(true)} 
                  className="hover:bg-red-50 px-2 sm:px-3 lg:px-3 border-red-200 h-8 sm:h-9 lg:h-9 font-sans text-red-600 hover:text-red-700 whitespace-nowrap"
                >
                  <Trash2 className="mr-1 sm:mr-2 lg:mr-2 w-3 sm:w-4 lg:w-4 h-3 sm:h-4 lg:h-4" />
                  <span className="text-xs sm:text-sm lg:text-sm">Очистить все</span>
                </Button>
              )}
            </div>
          </div>
          
          <div className="bg-gray-200 w-full h-px"></div>
        </div>

        {favorites.length === 0 ? (
          <div className="py-8 sm:py-12 lg:py-16 text-center">
            <div className="flex justify-center items-center bg-gray-100 mx-auto mb-4 sm:mb-6 lg:mb-6 rounded-full w-16 sm:w-20 lg:w-20 h-16 sm:h-20 lg:h-20">
              <Heart className="w-8 sm:w-10 lg:w-10 h-8 sm:h-10 lg:h-10 text-gray-300" />
            </div>
            <h3 className="mb-2 sm:mb-3 lg:mb-3 font-sans font-bold text-gray-900 text-lg sm:text-xl lg:text-2xl">
              В избранном пока ничего нет
            </h3>
            <p className="mx-auto mb-6 sm:mb-8 lg:mb-8 max-w-md font-sans text-gray-600 text-xs sm:text-sm lg:text-base">
              Добавляйте понравившиеся товары в избранное, 
              нажимая на сердечко в карточке товара
            </p>
            <Button
              asChild
              className="bg-berd-primary hover:bg-berd-primary/90 px-4 sm:px-6 lg:px-6 py-2 sm:py-3 lg:py-3 font-sans text-sm sm:text-base"
            >
              <Link href="/catalog">
                <ShoppingBag className="mr-2 w-4 sm:w-5 lg:w-5 h-4 sm:h-5 lg:h-5" />
                Перейти в каталог
              </Link>
            </Button>
          </div>
        ) : (
          <div className="w-full">
            <div className="justify-items-center gap-3 sm:gap-4 lg:gap-4 grid xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 s:grid-cols-1">
              {favorites.map(product => (
                <div key={product.id} className="relative w-full">
                  <DishCard product={product} variant="grid" />
                </div>
              ))}
            </div>
          </div>
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

function ClearConfirmModal({ onConfirm, onCancel }: { onConfirm: () => void; onCancel: () => void }) {
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onCancel();
    }
  };

  return (
    <div 
      className="z-50 fixed inset-0 flex justify-center items-center bg-black/50 p-4"
      onClick={handleOverlayClick}
    >
      <div className={cn(
        "bg-white shadow-xl rounded-2xl w-full max-w-96",
        "animate-in fade-in zoom-in duration-300"
      )}>
        <div className="p-6 text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-red-100 p-3 rounded-full">
              <Trash2 className="w-8 h-8 text-red-600" /> 
            </div>
          </div>
          
          <h2 className="mb-2 font-bold text-xl">Удалить товары из Избранного?</h2>
          <p className="mb-6 text-gray-600">
            Вы уверены, что хотите удалить все товары?
          </p>
          
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={onCancel}
              className="flex-1"
            >
              Отмена
            </Button>
            <Button
              onClick={onConfirm}
              className="flex-1 bg-red-600 hover:bg-red-700"
            >
              Очистить
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}