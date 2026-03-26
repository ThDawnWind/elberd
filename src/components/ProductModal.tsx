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

  const images =
    product.images?.length
      ? product.images
      : product.image
        ? [product.image]
        : [];

  return (
    <motion.div
      className="z-50 fixed inset-0 flex justify-center items-end sm:items-center lg:items-center bg-black/50 p-0 sm:p-2"
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
          "relative bg-white shadow-2xl sm:rounded-xl rounded-t-3xl w-full overflow-hidden",
          "max-h-[576px] h-full xs:max-h-[620px] xs:min-w-[300px] xs:max-w-[400px]",
          "flex flex-col",
          "sm:grid sm:grid-cols-2",
          "lg:grid lg:grid-cols-2",
          "sm:max-w-[1152px]",
          "lg:max-w-[1152px]"
        )}
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 80 }}
        transition={{ duration: 0.22, ease: "easeOut" }}
      >
        <div
          className={cn(
            "relative w-full max-w-[576px] xs:max-w-[500px] min-h-[250px] max-h-[590px] s:max-h-[561px]",
            "h-full"
          )}
        >
          <CarouselWithDots
            images={images}
            alt={imgAlt}
            heightClass="h-full max-h-[576px] xs:max-h-[576px] sm:h-[576px] lg:h-[576px]"
            imageClassName="object-cover group-hover:scale-110 transition-transform duration-500"
            className="w-full h-full object-contain"
          />

          <div className="top-2 left-2 z-10 absolute flex flex-col gap-1">
            {product.isNew && (
              <Badge className="bg-berd-primary hover:bg-berd-primary/90 px-2 py-1 font-sans font-semibold text-[10px] xs:text-xs sm:text-xs lg:text-xs">
                Новинка
              </Badge>
            )}
          </div>

          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "top-2 right-2 z-10 absolute bg-background/80 hover:bg-background backdrop-blur-sm",
              "w-7 h-7",
              "xs:w-8 xs:h-8",
              "sm:w-8 sm:h-8",
              "lg:w-8 lg:h-8"
            )}
            onClick={handleToggleFavorite}
            aria-label={favAriaLabel}
          >
            <Heart
              className={cn(
                "transition-colors",
                "w-3.5 h-3.5",
                "xs:w-4 xs:h-4",
                "sm:w-4 sm:h-4",
                "lg:w-4 lg:h-4",
                hasHydratedFav && isFav
                  ? "fill-red-500 text-red-500"
                  : "text-muted-foreground hover:fill-red-500 hover:text-red-500"
              )}
            />
          </Button>
        </div>

        <div
          className={cn(
            "flex flex-col p-4 w-full h-full overflow-y-hidden",
            "sm:p-4"
          )}
        >
          <div className="flex justify-between items-start gap-2 sm:mb-7 lg:mb-4">
            <h1
              className={cn(
                "font-mono font-bold text-gray-900 line-clamp-2 leading-tight",
                "text-[clamp(1.2rem,2vw,2.2rem)]"
              )}
            >
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
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="mb-5 sm:mb-8 lg:mb-6">
            {product.category && (
              <div className="flex flex-wrap items-center gap-2 mt-2 lg:mb-12 text-[clamp(0.65rem,2.8vw,0.875rem)]">
                <div className="bg-gray-50 px-3 py-1 border border-gray-200 rounded-full font-mono text-gray-700">
                  <span className="font-semibold text-green-600">Категория:</span>{" "}
                  <span className="font-semibold text-gray-900">{product.category}</span>
                </div>
              </div>
            )}
          </div>

          <div className="sm:mt-6 mb-auto min-h-[72px]">
            <div className="mb-2 lg:mb-5 min-h-[50px]">
              {product.content && (
                <div className="h-full font-sans text-[clamp(0.75rem,2vw,1.1rem)]">
                  <h3 className="mb-1 font-semibold text-black uppercase tracking-wide">
                    Состав:
                  </h3>
                  <p className="text-gray-700 break-words leading-snug">
                    {product.content}
                  </p>
                </div>
              )}
            </div>

            {product.shelfLife && (
              <p className="font-sans text-[clamp(0.75rem,2vw,1.1rem)] text-gray-700">
                <span className="font-semibold text-black uppercase tracking-wide">
                  Срок хранения:
                </span>{" "}
                {product.shelfLife}
              </p>
            )}
          </div>

          <div className="lg:pt-3 border-t">
            <div className="flex justify-end mb-2">
              <div className="text-[clamp(0.75rem,2.8vw,0.875rem)] text-gray-700 text-right">
                {product.weight && (
                  <div>
                    <span className="text-gray-500">Вес:</span>{" "}
                    <span className="font-semibold text-gray-900">{product.weight}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-between items-center gap-3 w-full">
              <div className="flex flex-col">
                <span className="text-[clamp(0.75rem,2.8vw,0.975rem)] text-muted-foreground">
                  Цена:
                </span>
                <span className="font-mono font-bold text-[clamp(1.3rem,2vw,1.7rem)] text-berd-primary">
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