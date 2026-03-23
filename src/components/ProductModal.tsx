"use client";

import { useEffect, useMemo } from "react";
import { X, Heart } from "lucide-react";
import { motion } from "motion/react";

import type { ModalProps } from "@/types";
import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/format";
import { useFavoritesStore } from "@/stores/favorites.store";

import { CarouselWithDots } from "@/components/ui/carousel-with-dots";
import { Badge } from "@/components/ui/badge";
import { Button } from "./ui/button";
import { AddToCartButton } from "./ui/DishCard";

export function ProductModal({ product, onClose }: ModalProps) {
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);
  const hasHydratedFav = useFavoritesStore((state) => state.hasHydrated);
  const favIds = useFavoritesStore((s) => s.ids);

  console.log(product, "00000000000000");
  const isFav = useMemo(() => favIds.includes(product?.id), [favIds, product?.id]);

  const imgAlt = `${product.name} — доставка EL’BERD`;
  const favAriaLabel =
    hasHydratedFav && isFav ? "Убрать из избранного" : "Добавить в избранное";

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

  const images = product.images?.length ? product.images : product.image ? [product.image] : [];

  return (
    <motion.div
      className="z-50 fixed inset-0 flex justify-center items-center bg-black/50 p-2 sm:p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Товар: ${product.name}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className={cn(
          "relative grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))]",
          "bg-white shadow-2xl rounded-xl sm:rounded-2xl",
          "w-full max-w-[1152px] max-h-[90vh]",
          "mx-1 sm:mx-4 lg:mx-12 overflow-hidden"
        )}
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.96, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 10 }}
        transition={{ duration: 0.18, ease: "easeOut" }}
      >
        <div className="relative w-full h-full max-h-[488px]">
          <CarouselWithDots
            images={images}
            alt={imgAlt}
            heightClass="h-[480px]"
            imageClassName="object-cover"
          />

          <div className="top-2 sm:top-3 left-2 sm:left-3 z-10 absolute flex flex-col gap-1 sm:gap-2">
            {product.isNew && (
              <Badge className="bg-berd-primary hover:bg-berd-primary/90 px-1.5 sm:px-2 py-0.5 sm:py-1 font-sans font-semibold text-[10px] sm:text-xs">
                Новинка
              </Badge>
            )}
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="top-2 sm:top-3 right-2 sm:right-3 z-10 absolute bg-background/80 hover:bg-background backdrop-blur-sm w-7 sm:w-8 h-7 sm:h-8"
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

        <div className="flex flex-col p-4 sm:p-5 min-w-0 overflow-y-auto">
          <div className="flex justify-between items-start gap-3 mb-3 xs:mb-1">
            <h1 className="font-mono font-bold text-[clamp(0.876rem,2vw,2.5rem)] text-gray-900 line-clamp-2 leading-tight">
              {product.name}
            </h1>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              className="text-gray-600 hover:text-red-600 hover:scale-110 transition shrink-0"
              aria-label="Закрыть"
            >
              <X className="w-5 xs:w-4 h-5 xs:h-4" />
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-2 mb-2 text-[clamp(0.476rem,2vw,0.876rem)]">
            {product.category && (
              <div className="bg-gray-50 px-3 py-1 border border-gray-200 rounded-full font-mono text-gray-700">
                <span className="font-semibold text-green-600">Категория:</span>{" "}
                <span className="font-semibold text-gray-900">{product.category}</span>
              </div>
            )}
          </div>

          <div className="mb-auto h-full min-h-[203px]">
            {product.content && (
              <div className="mb-4 xs:mb-2 sm:mb-6 font-sans text-[clamp(0.476rem,3vw,0.876rem)]">
                <h3 className="mb-2 font-semibold text-black uppercase tracking-wide">
                  Состав:
                </h3>
                <p className="text-gray-700 break-words leading-relaxed">{product.content}</p>
              </div>
            )}

            {product.shelfLife && (
              <div className="font-sans text-[clamp(0.476rem,3vw,0.876rem)]">
                <h3 className="mb-2 font-semibold text-black uppercase tracking-wide">
                  Срок хранения:
                </h3>
                <p className="text-gray-700">{product.shelfLife}</p>
              </div>
            )}
          </div>

          <div className="mt-4 xs:mt-2 pt-4 border-t">
            <div className="flex justify-end mb-3 xs:mb-1">
              <div className="text-[clamp(0.476rem,3vw,0.876rem)] text-gray-700 text-right">
                {product.weight && (
                  <>
                    <span className="text-gray-500">Вес:</span>{" "}
                    <span className="font-semibold text-gray-900">{product.weight}</span>
                  </>
                )}
              </div>
            </div>

            <div className="flex justify-between items-center gap-3 xs:gap-1 w-full">
              <div className="flex flex-col">
                <span className="text-[clamp(0.476rem,3vw,0.876rem)] text-muted-foreground">Цена:</span>
                <span className="font-mono font-bold text-berd-primary text-2xl sm:text-3xl">
                  {formatPrice(product.price)}
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
    </motion.div>
  );
}