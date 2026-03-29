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
  size = "md",
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
      button: "flex h-11 w-[130px] items-center justify-center gap-2 rounded-lg bg-berd-primary px-1 font-medium text-white shadow-sm transition-all duration-200 ease-out hover:bg-black hover:shadow active:scale-[0.98] active:bg-berd-primary/80",
      quantityContainer:
        "flex h-[43px] w-[129px] px-2 items-center rounded-lg bg-berd-primary",

      quantityInner:
        "flex w-full h-[43px] items-center gap-2",

      quantityButton:
        "flex h-full w-9  items-center justify-center rounded-md bg-white text-gray-700 shadow-sm transition-all duration-200 ease-out hover:bg-white/10 hover:text-white active:scale-95 active:bg-gray-10",

      count:
        "min-w-[28px] text-center font-semibold text-sm text-white",

      iconSize: "h-4 w-4",

      textSize: "text-sm font-medium",

      successButton: "bg-green-500 hover:bg-green-600",

      cartLabel: "В корзину",

      inCartText: "text-white",

      inCartIcon: "text-white",
    },

    list: {
      button:
        "flex items-center justify-center gap-2 rounded-lg bg-berd-primary px-6 py-3 font-medium text-white shadow-sm transition-all duration-200 ease-out hover:bg-black hover:shadow active:scale-[0.98] active:bg-berd-primary/80",
      quantityContainer:
        "rounded-lg bg-berd-primary/10 p-2",
      quantityInner:
        "flex items-center gap-2",
      quantityButton:
        "flex h-8 w-8 items-center justify-center rounded-md border border-gray-200 bg-white text-gray-700 shadow-sm transition-all duration-200 ease-out hover:bg-gray-50 active:scale-95 active:bg-gray-100",
      count:
        "min-w-[24px] px-1 text-center font-semibold text-sm text-berd-primary",
      iconSize: "h-5 w-5",
      textSize: "text-sm font-semibold",
      successButton: "bg-green-500 hover:bg-green-600",
      cartLabel: "В корзину",
      inCartText: "text-berd-primary",
      inCartIcon: "text-berd-primary",
    },

    modal: {
      button:
        "flex h-12 w-full max-w-[220px] items-center justify-center gap-2 rounded-lg bg-berd-primary px-4 text-white shadow-sm transition-all duration-200 ease-out hover:bg-black hover:shadow active:scale-[0.98] active:bg-berd-primary/80 sm:h-12",
      quantityContainer:
        "w-full max-w-[220px] rounded-lg bg-berd-primary px-2",
      quantityInner:
        "flex h-12 w-full items-center justify-between sm:h-12",
      quantityButton:
        "flex h-9 w-9 items-center justify-center rounded-md text-white transition-all duration-200 ease-out hover:bg-white/10 active:scale-95 active:bg-white/15",
      count:
        "min-w-[32px] text-center font-semibold text-white text-sm sm:text-base",
      iconSize: "h-4 w-4 sm:h-5 sm:w-5",
      textSize: "text-sm font-semibold sm:text-base",
      successButton: "bg-green-500 hover:bg-green-600",
      cartLabel: "В корзину",
      inCartText: "text-white",
      inCartIcon: "text-white",
    },

    compact: {
      button:
        "flex items-center justify-center gap-1 rounded-md bg-gray-100 px-3 py-1.5 text-sm font-medium text-gray-700 transition-all duration-200 ease-out hover:bg-black hover:text-white active:scale-95",
      quantityContainer:
        "rounded-md bg-berd-primary/10 p-1",
      quantityInner:
        "flex items-center gap-1",
      quantityButton:
        "flex h-6 w-6 items-center justify-center rounded border border-gray-200 bg-white text-gray-700 transition-all duration-200 ease-out hover:bg-gray-50 active:scale-95 active:bg-gray-100",
      count:
        "min-w-[20px] text-center text-xs font-semibold text-berd-primary",
      iconSize: "h-4 w-4",
      textSize: "text-xs font-semibold",
      successButton: "bg-green-500 hover:bg-green-600 text-white",
      cartLabel: "В корзину",
      inCartText: "text-berd-primary",
      inCartIcon: "text-gray-700",
    },
  } as const;

  const sizeStyles: Record<"sm" | "md" | "lg", SizeStyle> = {
    sm: {
      button: "py-1 px-2 text-xs",
      quantityButton: "w-6 h-full",
      iconSize: "w-3 h-3",
    },
    md: {
      button: "py-3 px-8 text-base",
      quantityButton: "w-[25px] h-9 bg-inherit",
      iconSize: "w-5 h-5",
    },
    lg: {
      button: "py-6 px-16 text-lg rounded-xl sm:py-4 sm:px-6 sm:text-base",
      quantityButton: "w-10 h-10",
      iconSize: "w-5 h-5 sm:w-5 sm:h-5",
    },
  };

  const styles = variantStyles[variant];
  const sizeStyle = sizeStyles[size];

  const getIconSize = () => sizeStyle.iconSize || styles.iconSize;

  const getButtonClass = () =>
    cn(
      styles.button,
      variant !== "modal" && sizeStyle.button,
      isSuccess && styles.successButton,
      "relative overflow-hidden"
    );

  const getQuantityButtonClass = () =>
    cn(
      styles.quantityButton,
      variant !== "modal" && sizeStyle.quantityButton
    );

  if (quantity === 0) {
    return (
      <div className={cn(variant === "modal" && "w-full", className)}>
        <Button onClick={handleAddToCart} className={getButtonClass()}>
          {isSuccess ? (
            <>
              <Check className={cn(getIconSize(), "animate-in")} />
              <span className={styles.textSize}>Добавлено</span>
            </>
          ) : (
            <>
              <ShoppingCart
                className={cn(getIconSize(), isAdding && "animate-spin")}
              />
              <span className={styles.textSize}>
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
        variant === "modal" && "w-full",
        "transition-all duration-200 ease-out",
        className
      )}
    >
      <div className={styles.quantityInner}>
        <div className={cn("flex items-center gap-2", styles.inCartText)}>
          <ShoppingCart
            className={cn(
              getIconSize(),
              styles.inCartIcon,
              variant === "modal" ? "fill-current/10" : ""
            )}
          />
        </div>

        <div className="flex items-center gap-1 min-h-[40px]">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleDecrease}
            className={getQuantityButtonClass()}
          >
            <Minus className={getIconSize()} />
          </Button>

          <span className={cn(styles.count, styles.textSize)}>
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