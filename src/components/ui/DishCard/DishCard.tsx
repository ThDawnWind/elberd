// components/catalog/dish-card.tsx
"use client";

import { Heart, ShoppingCart, Star } from "lucide-react";
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
    rating?: number;
    tags?: string[];
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
    <Card className="hover:shadow-md border-gray-200 w-full h-auto overflow-hidden transition-all">
      {/* Изображение */}
      <div className="relative h-[160px] overflow-hidden">
        <Image
          src={dish.image || "/images/placeholder.jpg"}
          alt={dish.name}
          fill
          className="object-cover hover:scale-105 transition-transform"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
        
        {/* Новинка бейдж */}
        {dish.isNew && (
          <span className="top-2 left-2 absolute bg-amber-600 px-2 py-1 rounded-full font-sans font-semibold text-white text-xs">
            Новинка
          </span>
        )}
        
        {/* Рейтинг */}
        {dish.rating && (
          <div className="top-2 right-2 absolute flex items-center gap-1 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full">
            <Star className="fill-yellow-400 w-3 h-3 text-yellow-400" />
            <span className="font-semibold text-xs">{dish.rating}</span>
          </div>
        )}
        
        <Button
          variant="ghost"
          size="icon"
          onClick={handleToggleFavorite}
          className="right-2 bottom-2 absolute bg-white/90 backdrop-blur-sm w-8 h-8"
        >
          <Heart className={cn("w-4 h-4", isFavorite && "fill-red-500 text-red-500")} />
        </Button>
      </div>

      {/* Контент */}
      <CardContent className="flex flex-col p-3">
        <h3 className="font-sans font-semibold text-sm line-clamp-2">{dish.name}</h3>
        {dish.description && (
          <p className="mt-1 font-sans text-gray-500 text-xs line-clamp-2">{dish.description}</p>
        )}
        
        {/* Теги */}
        {dish.tags && dish.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {dish.tags.slice(0, 2).map((tag, index) => (
              <span 
                key={index} 
                className="bg-gray-100 px-2 py-0.5 rounded-full text-gray-600 text-xs"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        
        <div className="flex justify-between items-center mt-3">
          <span className="font-sans text-gray-500 text-xs">Вес: {dish.weight}</span>
          <span className="font-sans font-bold text-base">{dish.price}₴</span>
        </div>
      </CardContent>

      <CardFooter className="p-3 pt-0">
        <Button 
          onClick={handleAddToCart}
          className="bg-berd-primary hover:bg-berd-primary/90 w-full font-sans text-sm"
          size="sm"
        >
          <ShoppingCart className="mr-2 w-4 h-4" />
          {quantity > 0 ? `В корзине: ${quantity}` : "В корзину"}
        </Button>
      </CardFooter>
    </Card>
  );
};