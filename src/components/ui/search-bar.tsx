// components/search/SearchBar.tsx
"use client";

import { useState } from "react";
import { Search, ChevronDown, ChefHat, Pizza, Sandwich, Croissant, LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Category {
  id: number;
  name: string;
  icon: LucideIcon;
  href: string;
}

const categories: Category[] = [
  { id: 1, name: "Все категории", icon: ChefHat, href: "/catalog" },
  { id: 2, name: "Пицца", icon: Pizza, href: "/catalog/pizza" },
  { id: 3, name: "Бургеры", icon: Sandwich, href: "/catalog/burgers" },
  { id: 4, name: "Суши", icon: Croissant, href: "/catalog/sushi" },
];

export const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<Category>(categories[0]);

  const handleCategorySelect = (category: Category) => {
    setSelectedCategory(category);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Search:", searchQuery, "in category:", selectedCategory.name);
    // Здесь можно добавить логику поиска, например, навигацию
    // router.push(`${selectedCategory.href}?search=${searchQuery}`);
  };

  return (
    <div className="flex-1 mx-4 max-w-2xl">
      <form onSubmit={handleSearch} className="w-full">
        <div className="flex items-center bg-white border border-gray-300 focus-within:border-berd-primary-500 rounded-full focus-within:ring-2 focus-within:ring-berd-primary-200 overflow-hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex items-center gap-2 hover:bg-berd-primary-50 px-4 py-2 border-gray-300 border-r rounded-none h-full"
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
                      selectedCategory.id === category.id ? "bg-berd-primary/10" : ""
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="flex-1">{category.name}</span>
                    {selectedCategory.id === category.id && (
                      <div className="bg-berd-primary rounded-full w-2 h-2" />
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
  );
};