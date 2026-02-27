import { cn } from "@/lib/utils";
import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Card } from "./ui/card";
import { CartItem } from "@/types";

export function CartItemCard({ 
  item, 
  onUpdateQuantity, 
  onRemove,
  className,
}: { 
  item: CartItem; 
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemove: (id: number) => void;
  className?: string;
}) {
  return (
    <Card key={item.id} className={cn("mb-2 overflow-hidden", className)}>
      <div className={cn(
        "flex gap-3 p-3",
        "s:gap-2 s:p-2",
        "xs:gap-3 xs:p-3",
        "sm:gap-4 sm:p-4",
        "lg:gap-5 lg:p-5"
      )}>
        <div className={cn(
          "relative flex-shrink-0 bg-gray-100 rounded-md overflow-hidden",
          "s:w-16 s:h-16",
          "xs:w-20 xs:h-20",
          "sm:w-20 sm:h-20",
          "lg:w-28 lg:h-28"
        )}>
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-cover"
            sizes="(max-width: 490px) 64px, (max-width: 767px) 80px, (max-width: 1023px) 96px, 112px"
          />
        </div>

        <div className="flex flex-col flex-1 min-w-0">
          <div className="flex justify-between items-start font-sans font-semibold">
            <h3 className={cn(
              "font-medium line-clamp-2",
              "s:text-xs",
              "xs:text-sm",
              "sm:text-sm"
            )}>
              {item.name}
            </h3>
            <button
              onClick={() => onRemove(item.id)}
              className="flex-shrink-0 p-1 text-gray-400 hover:text-red-500 transition-colors"
              aria-label="Удалить товар"
            >
              <Trash2 className={cn(
                "s:w-2.5 s:h-2.5",
                "xs:w-3 xs:h-3",
                "sm:w-3.5 sm:h-3.5"
              )} />
            </button>
          </div>

          <p className="mt-0.5 font-sans text-gray-500 text-xs">{item.weight}</p>

          <div className="flex justify-between items-center mt-auto">
            <span className={cn(
              "font-sans font-bold",
              "s:text-[12px]",
              "xs:text-[12px]",
              "sm:text-[13px]"
            )}>
              {item.price * item.quantity} ₽
            </span>

            <div className="inline-flex items-center gap-3 p-1 xs:p-0.5 rounded-full">
              <button
                onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                className={cn(
                  "flex justify-center items-center bg-white hover:bg-gray-50 active:bg-gray-100 shadow-sm border border-gray-200 rounded-full transition-colors",
                  "s:w-5 s:h-5",
                  "xs:w-6 xs:h-6",
                  "sm:w-6 sm:h-6"
                )}
                aria-label="Уменьшить количество"
              >
                <Minus className={cn(
                  "s:w-2 s:h-2",
                  "xs:w-2.5 xs:h-2.5",
                  "sm:w-3 sm:h-3"
                )} />
              </button>
              
              <span className={cn(
                "font-medium text-center",
                "s:w-6 s:text-xs",
                "xs:w-8 xs:text-sm",
                "sm:w-10 sm:text-base"
              )}>
                {item.quantity}
              </span>
              
              <button
                onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                className={cn(
                  "flex justify-center items-center bg-white hover:bg-gray-50 active:bg-gray-100 shadow-sm border border-gray-200 rounded-full transition-colors",
                  "s:w-6 s:h-6",
                  "xs:w-7 xs:h-7",
                  "sm:w-6 sm:h-6"
                )}
                aria-label="Увеличить количество"
              >
                <Plus className={cn(
                  "s:w-2 s:h-2",
                  "xs:w-2.5 xs:h-2.5",
                  "sm:w-3 sm:h-3"
                )} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}