"use client";

import { ShoppingCart, Plus, Minus, Check } from "lucide-react";
import { Button } from "../button";
import { cn } from "@/lib/utils";
import type { AddToCartButtonProps, SizeStyle } from "@/types";
import { useCartStore } from "@/stores/cart.store";
import { useEffect, useRef, useState } from "react";

export const AddToCartButton = ({
  product,
  price,
  variant = "grid",
  className = "",
  size = "default",
  onQuantityChange,
}: AddToCartButtonProps) => {
  const quantity = useCartStore(
    (s) => s.items.find((i) => i.id === product.id)?.quantity ?? 0
  );

  const addToCart = useCartStore((s) => s.addToCart);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeFromCart = useCartStore((s) => s.removeFromCart);

  const [isAdding, setIsAdding] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const timers = useRef<number[]>([]);

  useEffect(() => {
    return () => {
      timers.current.forEach((t) => window.clearTimeout(t));
      timers.current = [];
    };
  }, []);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setIsAdding(true);

    addToCart(product.id, product.name, price, product.weight, product.image, 1);
    onQuantityChange?.(product.id, 1);

    timers.current.push(
      window.setTimeout(() => {
        setIsAdding(false);
        setIsSuccess(true);
        timers.current.push(
          window.setTimeout(() => setIsSuccess(false), 700)
        );
      }, 300)
    );
  };

  const handleIncrease = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const newQty = quantity + 1;
    updateQuantity(product.id, newQty);
    onQuantityChange?.(product.id, newQty);
  };

  const handleDecrease = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const newQty = quantity - 1;

    if (newQty <= 0) {
      removeFromCart(product.id);
      onQuantityChange?.(product.id, 0);
      return;
    }

    updateQuantity(product.id, newQty);
    onQuantityChange?.(product.id, newQty);
  };

  const variantStyles = {
    grid: {
      button:
        "flex justify-center items-center gap-2 bg-berd-primary hover:bg-black active:bg-berd-primary/80 py-2.5 px-4 rounded-lg font-medium text-white transition-all w-full shadow-sm hover:shadow",
      quantityContainer: "bg-berd-primary/10 rounded-lg p-1",
      quantityButton:
        "w-7 h-7 rounded-md bg-white border border-gray-200 hover:bg-gray-50 active:bg-gray-100 shadow-sm",
      iconSize: "w-4 h-4",
      textSize: "text-xs font-medium",
      successButton: "bg-green-500 hover:bg-green-600",
      cartLabel: "В корзину",
      inCartText: "text-berd-primary",
      inCartIcon: "text-berd-primary",
    },
    list: {
      button:
        "flex justify-center items-center gap-2 bg-berd-primary text-white hover:bg-black active:bg-berd-primary/80 py-3 px-6 rounded-lg font-medium transition-all shadow-sm hover:shadow",
      quantityContainer: "bg-berd-primary/10 rounded-lg p-2",
      quantityButton:
        "w-8 h-8 rounded-md bg-white border border-gray-200 hover:bg-gray-50 active:bg-gray-100 shadow-sm",
      iconSize: "w-5 h-5",
      textSize: "text-sm font-semibold",
      successButton: "bg-green-500 hover:bg-green-600",
      cartLabel: "В корзину",
      inCartText: "text-berd-primary",
      inCartIcon: "text-berd-primary",
    },
    modal: {
      button: "flex w-full items-center justify-center gap-2 rounded-lg bg-berd-primary text-white hover:bg-black active:bg-berd-primary/80 py-4 px-6 font-medium shadow-sm transition-all hover:shadow",
      quantityContainer: "rounded-lg p-3",
      quantityButton:
        "h-8 w-8 xs:h-6 xs:h-6  xs:w-6 xs:w-6  rounded-md bg-white border border-gray-300 hover:bg-gray-50 active:bg-gray-100 shadow-sm",
      iconSize: "w-[clamp(18px,2vw,28px)] h-[clamp(18px,2vw,28px)]",
      textSize: "font-semibold text-[clamp(0.65rem,1.2vw,1.1rem)]",
      successButton: "bg-green-500 hover:bg-green-600",
      cartLabel: "В корзину",
      inCartText: "text-black text-[clamp(0.675rem,1.2vw,1.25rem)]",
      inCartIcon: "text-black",
    },
    compact: {
      button:
        "flex items-center justify-center gap-1 bg-gray-100 hover:bg-black py-1.5 px-3 rounded-md text-sm font-medium text-gray-700 hover:text-white transition-all active:scale-95",
      quantityContainer: "bg-berd-primary/10 rounded-md p-1",
      quantityButton:
        "w-6 h-6 rounded bg-white border border-gray-200 hover:bg-gray-50 active:bg-gray-100",
      iconSize: "w-4 h-4",
      textSize: "text-xs font-semibold",
      successButton: "bg-green-500 hover:bg-green-600 text-white",
      cartLabel: "В корзину",
      inCartText: "text-gray-700",
      inCartIcon: "text-gray-700",
    },
  } as const;

  const sizeStyles: Record<"sm" | "default" | "lg" | "xl", SizeStyle> = {
    sm: {
      button: "py-1 px-2 text-xs",
      quantityButton: "w-6 h-6",
      iconSize: "w-3 h-3",
    },
    default: {},
    lg: {
      button: "py-3 px-8 text-base",
      quantityButton: "w-10 h-10",
      iconSize: "w-5 h-5",
    },
    xl: {
      button: "py-4 px-10 text-lg",
      quantityButton: "max-w-12 w-full max-h-12 h-full",
      iconSize: "max-w-6 w-full max-h-6 h-full",
    },
  };

  const styles = variantStyles[variant];
  const sizeStyle = sizeStyles[size];

  const getIconSize = () => sizeStyle.iconSize || styles.iconSize;

  const getButtonClass = () =>
    cn(
      styles.button,
      sizeStyle.button,
      isSuccess && styles.successButton,
      "relative overflow-hidden"
    );

  const getQuantityButtonClass = () =>
    cn(
      styles.quantityButton,
      sizeStyle.quantityButton,
      "flex items-center justify-center text-gray-700 hover:text-gray-900 transition-all active:scale-95"
    );

  if (quantity === 0) {
    return (
      <div className={className}>
        <Button onClick={handleAddToCart} className={getButtonClass()}>
          {isSuccess ? (
            <>
              <Check className={cn(getIconSize(), "animate-in")} />
              <span>Добавлено</span>
            </>
          ) : (
            <>
              <ShoppingCart
                className={cn(getIconSize(), isAdding && "animate-spin")}
              />
              <span>
                {isAdding ? "Добавление..." : styles.cartLabel}
              </span>
            </>
          )}
          {isAdding && (
            <span className="absolute inset-0 bg-white/20 animate-pulse" />
          )}
        </Button>
      </div>
    );
  }

  return (
    <div
      className={cn(
        styles.quantityContainer,
        "transition-all duration-200 hover:shadow-sm",
        className
      )}
    >
      <div className="flex items-center gap-2">
        <div className={cn("flex items-center gap-1", styles.inCartText)}>
          <ShoppingCart
            className={cn(
              getIconSize(),
              styles.inCartIcon,
              "fill-current/10"
            )}
          />
          <span
            className={cn(
              "font-medium whitespace-nowrap",
              styles.textSize,
              styles.inCartText
            )}
          >
            В корзине
          </span>
        </div>

        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleDecrease}
            className={getQuantityButtonClass()}
          >
            <Minus className={getIconSize()} />
          </Button>

          <span
            className={cn(
              "px-1 min-w-[24px] font-bold text-center",
              styles.textSize,
              styles.inCartText
            )}
          >
            {quantity}
          </span>

          <Button
            variant="ghost"
            size="icon"
            onClick={handleIncrease}
            className={getQuantityButtonClass()}
          >
            <Plus className={getIconSize()} />
          </Button>
        </div>
      </div>
    </div>
  );
};