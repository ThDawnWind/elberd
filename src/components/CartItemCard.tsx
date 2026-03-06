import { cn } from "@/lib/utils";
import Image from "next/image";
import { Heart, Minus, Plus, Trash2 } from "lucide-react";
import { Card } from "./ui/card";
import type { CartItem } from "@/types";
import { Button } from "./ui/button";
import { useFavoritesStore } from "@/stores/favorites.store";
import { useMemo } from "react";
import { formatPrice } from "@/lib/format";

export function CartItemCard({
  item,
  onUpdateQuantity,
  onRemove,
  selected,
  onToggleSelected,
  className,
}: {
  item: CartItem;
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemove: (id: number) => void;
  selected: boolean;
  onToggleSelected: (id: number) => void;
  className?: string;
}) {

  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);
  const hasHydratedFav = useFavoritesStore((state) => state.hasHydrated);
  const favIds = useFavoritesStore((s) => s.ids);
  const isFav = useMemo(() => favIds.includes(item?.id), [favIds, item?.id]);

  const favAriaLabel =
    hasHydratedFav && isFav ? "Убрать из избранного" : "Добавить в избранное";

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(item.id);
  };

  return (
    <Card
      key={item.id}
      className={cn(
        "relative shadow-none mb-2 border-none rounded-none w-full max-w-[900px] min-h-[120px] overflow-hidden",
        className
      )}
    >
      <div
        className={cn(
          "flex items-stretch gap-3 p-2 w-full",
          "s:gap-2",
          "xs:gap-3",
          "sm:gap-4",
          "lg:gap-5"
        )}
      >
        <div className="flex items-center">
          <div className="mr-3">
            <input
              type="checkbox"
              checked={selected}
              onChange={() => onToggleSelected(item.id)}
              className="border-gray-300 rounded w-4 h-4 accent-berd-primary cursor-pointer"
              aria-label="Выбрать товар"
            />
          </div>

          <div
            className={cn(
              "relative flex-shrink-0 bg-gray-100 rounded-md overflow-hidden",
              "xs:w-20 xs:h-20",
              "sm:w-20 sm:h-20",
              "lg:w-28 lg:h-28"
            )}
          >
            <Image
              src={item.image}
              alt={item.name}
              fill
              className="object-cover"
              sizes="(max-width: 490px) 64px, (max-width: 767px) 80px, (max-width: 1023px) 96px, 112px"
            />
          </div>
        </div>

        <div className="flex flex-col flex-1 min-w-0">

          <div className="flex justify-between items-start font-sans font-semibold">
            <h3
              className={cn(
                "flex-1 font-medium line-clamp-2",
                "s:text-xs",
                "xs:text-sm",
                "sm:text-sm"
              )}
            >
              {item.name}
            </h3>

            <div className="flex items-center">
              <Button
                variant={"ghost"}
                onClick={handleToggleFavorite}
                aria-label={favAriaLabel}
              >
                <Heart
                  className={cn(
                    "transition-colors",
                    hasHydratedFav && isFav
                      ? "fill-red-500 text-red-500"
                      : "text-muted-foreground hover:fill-red-500 hover:text-red-500"
                  )}
                />
              </Button>

              <Button
                variant={"ghost"}
                onClick={() => onRemove(item.id)}
                className="text-gray-400 hover:text-red-500"
                aria-label="Удалить товар"
              >
                <Trash2/>
              </Button>
            </div>
          </div>

          <p className="mt-2 font-sans text-gray-500 text-xs">
            {item.weight}
          </p>

          <div className="flex justify-end items-center gap-3 mt-auto">

            <div className="inline-flex items-center gap-3 p-1 xs:p-0.5 rounded-full">

              <button
                onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                className={cn(
                  "flex justify-center items-center bg-white hover:bg-gray-50 active:bg-gray-100 shadow-sm border border-gray-200 rounded-full transition-colors",
                  "xs:w-5 xs:h-5",
                  "sm:w-6 sm:h-6"
                )}
                aria-label="Уменьшить количество"
              >
                <Minus />
              </button>

              <span className="s:w-6 xs:w-8 sm:w-10 font-medium s:text-xs xs:text-sm sm:text-base text-center">
                {item.quantity}
              </span>

              <button
                onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                className={cn(
                  "flex justify-center items-center bg-white hover:bg-gray-50 active:bg-gray-100 shadow-sm border border-gray-200 rounded-full transition-colors",
                  "xs:w-5 xs:h-5",
                  "sm:w-6 sm:h-6"
                )}
                aria-label="Увеличить количество"
              >
                <Plus/>
              </button>
            </div>

              <span
              className={cn(
                    "font-sans font-bold",
                    " text-[clamp(0.576rem,3vw,1.3rem)]",
                  )}
                >
              {formatPrice(item.price * item.quantity)}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
}