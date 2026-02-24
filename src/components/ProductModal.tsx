"use client"

import { useEffect } from "react"
import { X, Heart } from "lucide-react"
import { ModalProps } from "@/types"
import { AddToCartButton } from "./ui/DishCard"
import { useFavoritesStore } from "@/stores/favorites.store"
import { cn } from "@/lib/utils"
import { CarouselWithDots } from "./ui/carousel-with-dots"
import {motion} from "motion/react"

export function ProductModal({ product, onClose }: ModalProps) {
  const toggleFavorite = useFavoritesStore((s) => s.toggleFavorite)
  const isFavorite = useFavoritesStore((s) => s.isFavorite(product.id))

  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [])

  return (
    <div
      className="z-50 fixed inset-0 flex justify-center items-center bg-black/50 p-2"
      onClick={onClose}
    >
      <motion.div
        className="relative flex bg-white shadow-2xl rounded-2xl w-full xs:w-[70vw] sm:w-[70vw] max-w-3xl h-[384px] xs:h-[268px] sm:h-[269px]"
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.96, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 10 }}
        transition={{ duration: 0.18, ease: "easeOut" }}
      >
        <button
          onClick={(e) => {
            e.stopPropagation()
            onClose()
          }}
          className="-top-7 xs:-top-4 sm:-top-5 -right-12 xs:-right-8 sm:-right-10 z-20 absolute bg-white shadow-xl p-2 xs:p-1 rounded-full hover:text-red-600 hover:scale-110 transition"
          aria-label="Закрыть"
        >
          <X className="w-4 xs:w-3 sm:w-3 h-4 xs:h-3 sm:h-3" />
        </button>

        <div className="relative rounded-2xl w-1/2">
          <CarouselWithDots
            images={product.images || [product.image]}
            alt={product.name}
            className="h-full"
            imageClassName="object-cover"
          />

          <button
            onClick={(e) => {
              e.stopPropagation()
              toggleFavorite(product.id)
            }}
            className="top-4 right-4 absolute bg-white/80 shadow backdrop-blur-sm p-2 rounded-full hover:scale-105 transition"
            aria-label="В избранное"
          >
            <Heart
              className={cn(
                "w-5 xs:w-3 sm:w-3 h-5 xs:h-3 sm:h-3 transition-colors",
                isFavorite
                  ? "fill-red-500 text-red-500"
                  : "text-gray-500 hover:text-red-500"
              )}
            />
          </button>
        </div>

        <div className="flex flex-col p-2 w-1/2 h-full">
          <h2 className="mb-3 xs:mb-0 min-h-[3rem] font-bold text-gray-900 xs:text-sm sm:text-base text-xl text-end line-clamp-2 leading-tight tracking-tight">
            {product.name}
          </h2>

          <div className="flex justify-between items-center gap-4 sm:mb-1 lg:mb-3 xs:text-xs sm:text-xs text-sm">
            <span className="bg-gray-50 px-3 xs:px-2 py-1 border border-gray-200 rounded-full font-mono text-gray-700 xs:text-[10px] text-xs">
              <span className="text-green-500">Категория:</span>{" "}
              <span className="font-semibold text-gray-900">{product.category}</span>
            </span>

            <span className="text-gray-700">
              <span className="text-gray-500">Вес:</span>{" "}
              <span className="font-semibold text-gray-900">{product.weight}</span>
            </span>
          </div>

          <div className="mb-2 border-t h-3" />

          {product.content && (
            <div className="xs:mb-3 lg:mb-4 xs:text-[9px] sm:text-[10px] text-sm">
              <h3 className="mb-2 xs:mb-1 sm:mb-1 lg:mb-2 font-semibold text-black uppercase tracking-wide">
                Состав:
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {product.content}
              </p>
            </div>
          )}

          <div className="mb-5 xs:mb-1 sm:mb-0 lg:mb-3 xs:text-[10px] sm:text-[10px] text-sm">
            <h3 className="mb-1 font-semibold text-black uppercase tracking-wide">
              Срок хранения:
            </h3>
            <p className="text-gray-700">
              {product.shelfLife}
            </p>
          </div>

          <div className="flex justify-between items-center mt-auto pt-8 xs:pt-2 sm:pt-2 border-t">
            <div className="flex flex-col">
              <span className="text-muted-foreground xs:text-[10px] sm:text-[10px] text-xs">
                Цена
              </span>
              <span className="font-bold text-gray-900 sm:text-base xs:text-xl text-2xl lg:text-3xl">
                {product.price} ₽
              </span>
            </div>

            <AddToCartButton
              product={product}
              price={product.price}
              variant="grid"
            />
          </div>
        </div>
      </motion.div>
    </div>
  )
}