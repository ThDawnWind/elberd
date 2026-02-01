"use client";

import { Heart, ShoppingCart } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface DishCardProps {
  dish: {
    id: number;
    name: string;
    weight: string;
    price: number;
    image: string;
    isNew?: boolean;
    description?: string;
  };
}

export const DishCard = ({ dish }: DishCardProps) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [quantity, setQuantity] = useState(0);

  const handleAddToCart = () => {
    setQuantity(prev => prev + 1);
    console.log(`Добавлено в корзину: ${dish.name}`);
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsFavorite(!isFavorite);
  };

  return (
    <Card className="hover:to-berd-primary border-gray-200 w-[228px] h-[302px] overflow-hidden transition-colors">
      {/* Изображение */}
      <div className="relative h-[160px] overflow-hidden">
        <Image
          src={dish.image}
          alt={dish.name}
          fill
          className="object-cover"
          sizes="130px"
        />
        
        {/* Новинка бейдж */}
        {dish.isNew && (
          <span className="top-2 left-2 absolute bg-amber-600 px-2 py-1 rounded-full font-sans font-semibold text-white text-xs">
            Новинка
          </span>
        )}
        
        <Button
          variant="ghost"
          size="icon"
          onClick={handleToggleFavorite}
          className="top-2 right-2 absolute bg-white/90 backdrop-blur-sm w-8 h-8"
        >
          <Heart className={cn("w-4 h-4", isFavorite && "fill-red-500 text-red-500")} />
        </Button>
      </div>

      {/* Контент */}
      <CardContent className="flex flex-col flex-1 p-2 h-[103px]">
        <h3 className="mt-2 font-sans font-semibold text-xs line-clamp-2">{dish.name}</h3>
        {dish.description && (
          <p className="mt-1.5 font-sans text-gray-500 text-xs line-clamp-2">{dish.description}</p>
        )}
        
        <div className="flex justify-between items-center mt-1.5">
          <span className="font-sans text-gray-500 text-xs">Вес: {dish.weight}</span>
          <span className="font-sans font-bold text-base">{dish.price}₴</span>
        </div>
      </CardContent>

      <CardFooter className="p-3 pt-0">
        <Button 
          onClick={handleAddToCart}
          className="bg-berd-primary w-full font-sans"
          size="sm"
        >
          <ShoppingCart className="mr-2 w-4 h-4" />
          {quantity > 0 ? `В корзине: ${quantity}` : "В корзину"}
        </Button>
      </CardFooter>
    </Card>
  );
};