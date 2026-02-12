"use client";

import { ShoppingCart, Plus, Minus, Check } from "lucide-react";
import { useState } from "react";
import { Button } from "../button";
import { cn } from "@/lib/utils";
import { AddToCartButtonProps, SizeStyle } from "@/types";

export const AddToCartButton = ({ 
  dishId, 
  variant = 'grid',
  className = '',
  size = 'default',
  initialQuantity = 0,
  onQuantityChange,
}: AddToCartButtonProps) => {
  const [quantity, setQuantity] = useState(initialQuantity);
  const [isAdding, setIsAdding] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleAddToCart = () => {
    setIsAdding(true);
    const newQuantity = 1;
    setQuantity(newQuantity);
    
    setTimeout(() => {
      setIsAdding(false);
      setIsSuccess(true);
      onQuantityChange?.(dishId, newQuantity);
      console.log(`Добавлено в корзину: ${dishId}, количество: ${newQuantity}`);
      
      setTimeout(() => setIsSuccess(false), 1500);
    }, 300);
  };

  const handleIncrease = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    onQuantityChange?.(dishId, newQuantity);
    console.log(`Увеличено количество: ${dishId} = ${newQuantity}`);
  };

  const handleDecrease = () => {
    if (quantity > 0) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      onQuantityChange?.(dishId, newQuantity);
      console.log(`Уменьшено количество: ${dishId} = ${newQuantity}`);
    }
  };

  const variantStyles = {
    grid: {
      container: "",
      button: "flex justify-center items-center gap-2 xs:gap-1.5 bg-berd-primary hover:bg-black active:bg-berd-primary/80 disabled:opacity-70 xs:py-1.5 py-2.5 xs:px-3 px-4 rounded-lg font-medium text-white transition-all duration-300 ease-in-out w-full shadow-sm hover:shadow xs:text-xs text-sm",
      quantityContainer: "bg-berd-primary/10 rounded-lg p-1 xs:p-0.5",
      quantityButton: "w-8 h-8 xs:w-6 xs:h-6 rounded-md bg-white border border-gray-200 hover:bg-gray-50 active:bg-gray-100 shadow-sm",
      iconSize: "w-4 h-4 xs:w-3 xs:h-3",
      textSize: "text-xs xs:text-[10px] font-medium",
      successButton: "bg-green-500 hover:bg-green-600",
      cartLabel: "В корзину"
    },
    list: {
      container: "",
      button: "flex justify-center items-center gap-2 bg-berd-primary text-white hover:bg-black active:bg-berd-primary/80 disabled:opacity-70 py-3 px-6 rounded-lg font-medium transition-all duration-200 shadow-sm hover:shadow",
      quantityContainer: "bg-berd-primary/10 rounded-lg p-2",
      quantityButton: "w-9 h-9 rounded-md bg-white border border-gray-200 hover:bg-gray-50 active:bg-gray-100 shadow-sm",
      iconSize: "w-4 h-4",
      textSize: "text-sm font-semibold",
      successButton: "bg-green-500 hover:bg-green-600",
      cartLabel: "В корзину"
    },
    compact: {
      container: "",
      button: "flex items-center justify-center gap-1 xs:gap-1 bg-gray-100 hover:bg-black disabled:opacity-70 xs:py-1 py-1.5 xs:px-2 px-3 rounded-md xs:text-xs text-sm font-medium text-gray-700 hover:text-white transition-all duration-200 active:scale-95",
      quantityContainer: "bg-berd-primary/10 rounded-md p-1 xs:p-0.5",
      quantityButton: "w-7 h-7 xs:w-5 xs:h-5 rounded bg-white border border-gray-200 hover:bg-gray-50 active:bg-gray-100",
      iconSize: "w-3.5 h-3.5 xs:w-2.5 xs:h-2.5",
      textSize: "text-xs xs:text-[10px] font-semibold",
      successButton: "bg-green-500 hover:bg-green-600 text-white",
      cartLabel: "В корзину"
    }
  };

  const sizeStyles: Record<'sm' | 'default' | 'lg', SizeStyle> = {
    sm: {
      button: "py-1 xs:py-1 px-2.5 xs:px-2 text-xs",
      quantityButton: "w-6 h-6 xs:w-5 xs:h-5",
      iconSize: "w-3 h-3 xs:w-2.5 xs:h-2.5"
    },
    default: {},
    lg: {
      button: "py-3 px-8 text-base",
      quantityButton: "w-10 h-10",
      iconSize: "w-5 h-5"
    }
  };

  const styles = variantStyles[variant];
  const sizeStyle = sizeStyles[size];

  const getIconSize = () => {
    const variantIconSize = styles.iconSize;
    const sizeIconSize = sizeStyle.iconSize;
    return sizeIconSize || variantIconSize;
  };

  const getButtonClass = () => {
    return cn(
      styles.button,
      isSuccess && styles.successButton,
      sizeStyle.button,
      "relative overflow-hidden"
    );
  };

  const getQuantityButtonClass = (isDecrease = false) => {
    return cn(
      styles.quantityButton,
      sizeStyle.quantityButton,
      "flex items-center justify-center text-gray-700 hover:text-gray-900 transition-all duration-150 active:scale-95",
      isDecrease && quantity === 0 && "opacity-50 cursor-not-allowed"
    );
  };

  if (quantity === 0) {
    return (
      <div className={cn(styles.container, className)}>
        <Button
          onClick={handleAddToCart}
          disabled={isAdding}
          className={getButtonClass()}
          aria-label={isAdding ? "Добавляется в корзину" : "Добавить в корзину"}
        >
          {isSuccess ? (
            <>
              <Check className={cn(getIconSize(), "animate-bounce")} />
              <span className="font-medium">Добавлено</span>
            </>
          ) : (
            <>
              <ShoppingCart className={cn(
                getIconSize(),
                isAdding && "animate-pulse"
              )} />
              <span className="font-medium">
                {isAdding 
                  ? variant === 'compact' ? "..." : "Добавление..." 
                  : styles.cartLabel}
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
    <div className={cn(
      styles.quantityContainer,
      "transition-all duration-200 hover:shadow-sm",
      className
    )}>
      <div className="flex flex-row justify-between items-center gap-2 xs:gap-1">
        <div className="flex items-center gap-1 text-berd-primary">
          <ShoppingCart className={cn(getIconSize(), "fill-berd-primary/10")} />
          <span className={cn(
            "font-medium text-berd-primary whitespace-nowrap",
            variant === 'compact' ? "text-xs" : "text-sm"
          )}>
            В корзине
          </span>
        </div>
        <div className="flex items-center gap-1 xs:gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleDecrease}
            disabled={quantity === 0}
            className={getQuantityButtonClass(true)}
          >
            <Minus className={getIconSize()} />
          </Button>

          <span className={cn(
            "px-1 min-w-[24px] font-bold text-berd-primary text-center",
            styles.textSize,
            size === 'lg' && "text-base",
            size === 'sm' && "text-xs xs:text-[8px]"
          )}>
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