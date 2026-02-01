"use client";

import Link from "next/link";
import { useState } from "react";
import { ChefHat, ChevronDown, Croissant, Heart, Pizza, Sandwich, Search, ShoppingCart } from 'lucide-react';
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../components//ui/dropdown-menu";

const categories = [
  { id: 1, name: "Все категории", icon: ChefHat, href: "/catalog" },
  { id: 2, name: "Пицца", icon: Pizza, href: "/catalog/pizza" },
  { id: 3, name: "Бургеры", icon: Sandwich, href: "/catalog/burgers" },
  { id: 4, name: "Суши", icon: Croissant, href: "/catalog/sushi" },
];

export const Header = () => {
    const [selectedCategory, setSelectedCategory] = useState(categories[0]);
    const [searchQuery, setSearchQuery] = useState("");
    const [cartCount] = useState(3);
    const [favoritesCount] = useState(7);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleCategorySelect = (category: typeof categories[0]) => {
    setSelectedCategory(category);
  };


  return (
    <header className="top-0 z-50 sticky bg-white/95 supports-[backdrop-filter]:bg-white/60 backdrop-blur border-b w-full font-mono">
     <div className="mx-4 md:mx-[110px] px-4">
        <div className="flex justify-between items-center w-100 h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex justify-center items-center bg-gradient-to-br from-orange-500 to-red-600 rounded-full w-10 h-10">
                <span className="font-bold text-white text-xl">e</span>
              </div>
              <div className="hidden md:block">
                <span className="font-bold text-gray-900 text-2xl">el.berd</span>
                <p className="-mt-1 text-gray-500 text-xs">доставка готовых блюд</p>
              </div>
            </Link>
          </div>

          <div className="flex-1 mx-4 max-w-2xl">
            <form onSubmit={handleSearch} className="w-full">
              <div className="flex items-center bg-white border border-gray-300 focus-within:border-orange-500 rounded-full focus-within:ring-2 focus-within:ring-orange-200 overflow-hidden">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="flex items-center gap-2 hover:bg-gray-50 px-4 py-2 border-gray-300 border-r rounded-none h-full"
                    >
                      <selectedCategory.icon className="w-4 h-4" />
                      <span className="hidden md:inline max-w-[120px] font-medium text-sm truncate">
                        {selectedCategory.name}
                      </span>
                      <ChevronDown className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-64 max-h-[400px] overflow-y-auto">
                    <div className="px-2 py-1.5 font-semibold text-gray-500 text-xs uppercase tracking-wider">
                      Категории блюд
                    </div>
                    {categories.map((category) => {
                      const Icon = category.icon;
                      return (
                        <DropdownMenuItem
                          key={category.id}
                          onClick={() => handleCategorySelect(category)}
                          className={`flex items-center gap-3 cursor-pointer ${
                            selectedCategory.id === category.id ? "bg-orange-50" : ""
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                          <span className="flex-1">{category.name}</span>
                          {selectedCategory.id === category.id && (
                            <div className="bg-orange-500 rounded-full w-2 h-2" />
                          )}
                        </DropdownMenuItem>
                      );
                    })}
                  </DropdownMenuContent>
                </DropdownMenu>

                <div className="relative flex-1">
                  <Input
                    type="text"
                    placeholder="Найти блюдо, кухню или ингредиент..."
                    className="shadow-none py-2 pr-12 pl-4 border-0 focus-visible:ring-0 focus-visible:ring-offset-0 h-auto"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <Button
                    type="submit"
                    size="icon"
                    variant="ghost"
                    className="top-1/2 right-1 absolute w-8 h-8 text-gray-400 hover:text-orange-500 -translate-y-1/2"
                  >
                    <Search className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </form>
          </div>

          <div className="flex items-center gap-4">
  <Link 
    href="/favorites" 
    className="relative flex items-center gap-2 hover:text-red-500 transition-colors"
  >
    <div className="relative">
      <Heart className="w-6 h-6 text-gray-700" />
      {favoritesCount > 0 && (
        <span className="-top-2 -right-2 absolute flex justify-center items-center bg-red-500 rounded-full w-5 h-5 text-white text-xs">
          {favoritesCount}
        </span>
      )}
    </div>
    <span className="hidden lg:inline font-medium text-gray-700">
      Избранное
    </span>
  </Link>

  <Link 
    href="/cart" 
    className="relative flex items-center gap-2 hover:text-orange-500 transition-colors"
  >
    <div className="relative">
      <ShoppingCart className="w-6 h-6 text-gray-700" />
      {cartCount > 0 && (
        <span className="-top-2 -right-2 absolute flex justify-center items-center bg-orange-500 rounded-full w-5 h-5 text-white text-xs">
          {cartCount}
        </span>
      )}
    </div>
    <span className="hidden lg:inline font-medium text-gray-700">
      Корзина
    </span>
  </Link>
  
  <div className="hidden lg:flex flex-col items-end">
    <a href="tel:+380123456789" className="font-bold text-gray-900 hover:text-orange-500 text-lg">
      +38 (012) 345-67-89
    </a>
    <p className="text-gray-500 text-xs">Круглосуточно</p>
  </div>
</div>
        </div>
      </div>
    </header>
  );
};