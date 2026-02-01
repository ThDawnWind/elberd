// components/ui/DishCard/AddToCartButton.tsx
"use client";

import { ShoppingCart } from "lucide-react";
import { useState } from "react";

interface AddToCartButtonProps {
  dishId: number;
}

export const AddToCartButton = ({ dishId }: AddToCartButtonProps) => {
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = () => {
    setIsAdding(true);
    console.log('Добавить в корзину:', dishId);
    setTimeout(() => setIsAdding(false), 1000);
  };

  return (
    <button
      onClick={handleAddToCart}
      disabled={isAdding}
      className="flex justify-center items-center gap-2 bg-gray-50 hover:bg-berd-primary disabled:opacity-50 group-hover:shadow-sm mt-4 py-3 rounded-lg font-medium text-gray-700 hover:text-gray-900 transition-all duration-300"
    >
      <ShoppingCart className="w-4 h-4" />
      <span>{isAdding ? "Добавляется..." : "Добавить в корзину"}</span>
    </button>
  );
};