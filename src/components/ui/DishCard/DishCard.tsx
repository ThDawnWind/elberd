"use client";

import { useMemo } from "react";
import { Heart } from "lucide-react";

import type { DishCardProps } from "@/types";
import { AddToCartButton } from "./AddToCartButton";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CarouselWithDots } from "../carousel-with-dots";
import { useFavoritesStore } from "@/stores/favorites.store";
import { useProductModalStore } from "@/stores/product-modal.store";
import { formatPrice } from "@/lib/format";

export const DishCard: React.FC<DishCardProps> = ({ product, price, variant = "grid", className = "" }) => {
  const productImages = product.images || product.image;
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);
  const hasHydratedFav = useFavoritesStore((state) => state.hasHydrated);
  const favIds = useFavoritesStore((s) => s.ids);
  const isFav = useMemo(() => favIds.includes(product?.id), [favIds, product?.id]);
  const openModal = useProductModalStore((s) => s.open);

  const imgAlt = `${product.name} — доставка EL’BERD`;
  const favAriaLabel = hasHydratedFav && isFav ? "Убрать из избранного" : "Добавить в избранное";

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(product.id);
  };

  const ProductMicrodata = () => (
    <>
      <meta itemProp="name" content={product.name} />
      {product.content ? <meta itemProp="description" content={product.content} /> : null}
      <div itemProp="offers" itemScope itemType="https://schema.org/Offer">
        <meta itemProp="priceCurrency" content="RUB" />
        <meta itemProp="price" content={String(price)} />
      </div>
    </>
  );

  if (variant === "grid") {
    return (
      <Card
        id={`product-${product.id}`}
        data-product-id={product.id}
        itemScope
        itemType="https://schema.org/Product"
        onClick={() => openModal(product)}
        className={cn(
          "group overflow-hidden transition-all duration-300",
          "hover:shadow-berd-primary",
          "border-border/60",
          "flex flex-col h-full",
          "cursor-pointer",
          className,
        )}
      >
        <ProductMicrodata />

        <div className="relative rounded-t-[8px] overflow-hidden">
          <div className="w-full h-full max-h-[260px] xs:max-h-[150px]">
            <CarouselWithDots
              images={productImages}
              alt={imgAlt}
              heightClass="h-[260px] xs:h-[150px]"
              imageClassName="object-cover group-hover:scale-110 transition-transform duration-500"
            />
          </div>

          <div className="top-2 sm:top-3 left-2 absolute flex flex-col gap-1 sm:gap-2">
            {product.isNew && (
              <Badge className="bg-berd-primary hover:bg-berd-primary/90 px-1.5 py-0.5 font-semibold text-[10px]">
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
                hasHydratedFav && isFav ? "fill-[#d9a441] text-[#d9a441] animate-pop" : "text-muted-foreground",
              )}
            />
          </Button>
        </div>

        <CardHeader className="p-2.5 xs:p-2">
          <CardTitle className="h-full font-semibold text-[18px] xs:text-sm xs:line-clamp-1 leading-tight">{product.name}</CardTitle>
        </CardHeader>

        <div className="bg-berd-primary shadow-md shadow-orange-200/40 mb-auto rounded-sm w-full h-[2px]" />
        <CardContent className="flex-1 grid grid-[auto_1fr_auto] p-2.5">
          {product.shelfLife && (
            <CardDescription className="mb-5 xs:mb-2 font-normal text-xs line-clamp-2">
              Срок годности: {product.shelfLife}
            </CardDescription>
          )}
          {product.content && (
            <div className="mb-auto">
              <p className="flex items-start gap-1 mb-5 xs:mb-2 font-normal text-[13px] leading-tight">
                <span className="whitespace-nowrap">Состав:</span>
                <span className="flex-1 break-words line-clamp-2">{product.content}</span>
              </p>
            </div>
          )}

          <div className="flex justify-between items-center self-end gap-1 pt-4 xs:pt-2 border-t" >
            <div className="flex flex-col font-sans">
              {
                product.weight &&
                <span className="font-normal text-muted-foreground xs:text-[10px] sm:text-xs leading-tight">
                   Вес: {product.weight}
               </span>
              }

              <span className="font-bold xs:text-[9px] lg:text-[15px]">{formatPrice(price)}</span>
            </div>

            <AddToCartButton product={product} price={price} variant="grid" size="md" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (variant === "list") {
    return (
      <Card
        id={`product-${product.id}`}
        data-product-id={product.id}
        itemScope
        itemType="https://schema.org/Product"
        onClick={() => openModal(product)}
        className={cn(
          "group overflow-hidden transition-all duration-300",
          "hover:shadow-lg",
          "border-border/40",
          "flex flex-row",
          className,
        )}
      >
        <ProductMicrodata />

        <div className="relative flex-row ml-3 sm:w-48 lg:w-72">
          <div className="relative w-full aspect-square sm:aspect-square">
            <CarouselWithDots
              images={productImages}
              alt={imgAlt}
              heightClass="h-[288px]"
              imageClassName="object-cover group-hover:scale-110 transition-transform duration-500"
            />
          </div>

          <div className="top-2 xs:top-2 sm:top-3 left-2 xs:left-2 sm:left-3 absolute flex flex-col gap-1 xs:gap-1 sm:gap-2">
            {product.isNew && (
              <Badge className="bg-berd-primary hover:bg-berd-primary/90 px-1.5 xs:px-1.5 sm:px-2 py-0.5 xs:py-0.5 sm:py-1 font-semibold text-[10px] xs:text-[10px] sm:text-xs">
                Новинка
              </Badge>
            )}
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="top-2 xs:top-2 sm:top-3 right-2 xs:right-2 sm:right-3 absolute bg-background/80 hover:bg-background backdrop-blur-sm w-7 xs:w-7 sm:w-8 h-7 xs:h-7 sm:h-8"
            onClick={handleToggleFavorite}
            aria-label={favAriaLabel}
          >
            <Heart
              className={cn(
                "hover:fill-red-500 w-3.5 xs:w-3.5 sm:w-4 h-3.5 xs:h-3.5 sm:h-4",
                hasHydratedFav && isFav ? "fill-red-500 text-red-500 animate-pop" : "hover:text-red-500",
              )}
            />
          </Button>
        </div>

        <div className="flex flex-col flex-grow px-3">
          <div className="flex flex-row justify-between h-full max-h-[55px]">
            <CardTitle className="mb-2 font-semibold text-[21px] line-clamp-2">{product.name}</CardTitle>
            <span className="font-bold text-[19px] whitespace-nowrap">{formatPrice(price)}</span>
          </div>

          <div className="flex flex-col h-[100px] xs:h-[90px] sm:h-[110px] lg:h-[120px]">
            <CardDescription className="h-[40px] xs:h-[35px] sm:h-[42px] lg:h-[48px] font-normal text-muted-foreground xs:text-xs sm:text-sm text-base line-clamp-2">
              {product.shelfLife && <>Срок годности: {product.shelfLife}</>}
            </CardDescription>

            {product.content && (
              <div className="flex flex-col h-[50px] xs:h-[45px] sm:h-[55px] lg:h-[60px]">
                <p className="mb-1 xs:mb-0.5 font-semibold xs:text-xs text-base">Состав:</p>
                <p className="font-normal xs:text-[10px] sm:text-xs text-base line-clamp-2">{product.content}</p>
              </div>
            )}
          </div>

          <div className="flex justify-between items-center mt-auto p-2 border-t">
            <div>
              {product.weight && (
                <span className="font-medium text-black xs:text-[14px] sm:text-xs text-base">
                  Вес: {product.weight}
                </span>
              )}
            </div>

            <AddToCartButton
              product={product}
              price={price}
              variant={variant}
              size="lg"
              className="xs:px-2 sm:px-3 xs:py-1 sm:py-1.5 xs:h-7 sm:h-8 xs:text-[10px] sm:text-xs"
            />
          </div>
        </div>
      </Card>
    );
  }

  return null;
};
