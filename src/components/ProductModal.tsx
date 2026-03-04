"use client";

import { useEffect, useMemo } from "react";
import { X, Heart, Badge } from "lucide-react";
import { motion } from "motion/react";

import type { ModalProps } from "@/types";
import { cn } from "@/lib/utils";
import { useFavoritesStore } from "@/stores/favorites.store";

import { CarouselWithDots } from "@/components/ui/carousel-with-dots";
import { AddToCartButton } from "@/components/ui/DishCard";
import { Button } from "./ui/button";

export function ProductModal({ product, onClose }: ModalProps) {
   const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);
   const hasHydratedFav = useFavoritesStore((state) => state.hasHydrated);
   const favIds = useFavoritesStore((s) => s.ids);
   const isFav = useMemo(() => favIds.includes(product?.id), [favIds, product?.id]);

  const imgAlt = `${product.name} — доставка EL’BERD`;
  const favAriaLabel = hasHydratedFav && isFav ? "Убрать из избранного" : "Добавить в избранное";

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(product.id);
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const images = product.images?.length ? product.images : [product.image];

  return (
    <div
      className="z-50 fixed inset-0 flex justify-center items-center bg-black/50 p-2"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Товар: ${product.name}`}
    >
      <motion.div
        className={cn(
          "relative grid grid-cols-1 md:grid-cols-2",
          "bg-white shadow-2xl rounded-2xl",
          "w-full max-w-[1152px] min-w-0",
          "xs:mx-1 sm:mx-32 lg:mx-28",
           "[grid-template-columns:repeat(auto-fit,minmax(321px,1fr))]"
        )}
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.96, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 10 }}
        transition={{ duration: 0.18, ease: "easeOut" }}
      >
       <div className="relative min-w-0 overflow-hidden">
          <div className="w-full">
            <CarouselWithDots
              images={images}
              alt={imgAlt}
              heightClass="h-full"
              imageClassName="object-cover group-hover:scale-110 transition-transform duration-500"
            />
          </div>        

          <div className="top-2 sm:top-3 left-2 sm:left-3 absolute flex flex-col gap-1 sm:gap-2">
            {product.isNew && (
              <Badge className="bg-berd-primary hover:bg-berd-primary/90 px-1.5 sm:px-2 py-0.5 sm:py-1 font-sans font-semibold text-[10px] sm:text-xs">
                Новинка
              </Badge>
            )}
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="top-2 sm:top-3 right-2 sm:right-3 absolute bg-background/80 hover:bg-background backdrop-blur-sm w-7 sm:w-8 h-7 sm:h-8"
            onClick={handleToggleFavorite}
            aria-label={favAriaLabel}
          >
            <Heart
              className={cn(
                "w-3.5 sm:w-4 h-3.5 sm:h-4 transition-colors",
                hasHydratedFav && isFav
                  ? "fill-red-500 text-red-500"
                  : "text-muted-foreground hover:fill-red-500 hover:text-red-500"
              )}
            />
          </Button>
        </div>

        <div className="flex flex-col p-5 xs:p-2 min-w-0">
          <div className="flex justify-between items-start gap-3 mb-6 xs:mb-4">
            <h2 className="font-mono font-bold text-[clamp(1.15rem,3vw,2.5rem)] text-gray-900 line-clamp-2 leading-tight">
              {product.name}
            </h2>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              className="text-gray-600 hover:text-red-600 hover:scale-110 transition"
              aria-label="Закрыть"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-2 mb-6 xs:mb-4 font-sans text-sm">
            <div className="bg-gray-50 px-3 py-1 border border-gray-200 rounded-full font-mono text-[clamp(0.675rem,1.2vw,1.25rem)] text-gray-700">
              <span className="text-green-600">Категория:</span>{" "}
              <span className="font-semibold text-gray-900">
                {product.category}
              </span>
            </div>
          </div>

          <div className="mb-auto">
            {product.content && (
              <div className="mb-6 xs:mb-4 font-sans text-[clamp(0.675rem,1.2vw,1.25rem)]">
                <h3 className="mb-2 font-semibold text-black uppercase tracking-wide">
                  Состав:
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {product.content}
                </p>
              </div>
            )}

            <div className="font-sans text-[clamp(0.675rem,1.2vw,1.25rem)]">
              <h3 className="mb-2 font-semibold text-black uppercase tracking-wide">
                Срок хранения:
              </h3>
              <p className="text-gray-700">{product.shelfLife}</p>
            </div>
          </div>

          <div className="mt-6 xs:mt-4 pt-4 border-t">
            <div className="flex justify-end mb-3 xs:mb-1">
              <div className="text-[clamp(0.9rem,1.1vw,1rem)] text-gray-700 text-right">
                <span className="text-gray-500">Вес:</span>{" "}
                <span className="font-semibold text-gray-900">
                  {product.weight}
                </span>
              </div>
            </div>

            <div className="flex justify-between items-end">
              <div className="flex flex-col">
                <span className="text-muted-foreground">Цена:</span>
                <span className="font-mono font-bold text-[clamp(1.25rem,2vw,1.75rem)] text-berd-primary">
                  {product.price}₽
                </span>
              </div>

              <AddToCartButton
                product={product}
                price={product.price}
                variant="modal"
              />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}