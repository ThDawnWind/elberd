// components/search/SearchBar.tsx
"use client";

import { useState } from "react";
import { Search, ChevronDown} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Category } from "@/types";
import { CATEGORIES } from "@/lib/constants";

export const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<Category>(CATEGORIES[0]);

  const handleCategorySelect = (category: Category) => {
    setSelectedCategory(category);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="flex-1 mx-2 md:mx-4 max-w-2xl">
      <form onSubmit={handleSearch} className="w-full sm:w-96">
        <div className="flex items-center bg-white border border-gray-300 focus-within:border-berd-primary-500 rounded-full focus-within:ring-2 focus-within:ring-berd-primary-200 overflow-hidden">
          {/* Категории - адаптивные */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex items-center gap-1 md:gap-2 hover:bg-berd-primary-50 px-2 md:px-4 py-1.5 md:py-2 border-gray-300 border-r rounded-none h-full"
              >
                <selectedCategory.icon className="w-3.5 md:w-4 h-3.5 md:h-4" />
                <span className="hidden xs:inline max-w-[80px] md:max-w-[120px] font-medium text-xs md:text-sm truncate">
                  {selectedCategory.name}
                </span>
                <ChevronDown className="w-3 md:w-4 h-3 md:h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-48 md:w-56 max-h-[300px] md:max-h-[400px] overflow-y-auto">
              <div className="px-2 py-1.5 font-semibold text-[10px] text-gray-500 md:text-xs uppercase tracking-wider">
                Категории блюд
              </div>
              {CATEGORIES.map((category) => {
                const Icon = category.icon;
                return (
                  <DropdownMenuItem
                    key={category.id}
                    onClick={() => handleCategorySelect(category)}
                    className={`flex items-center gap-2 md:gap-3 cursor-pointer py-1.5 md:py-2 ${
                      selectedCategory.id === category.id ? "bg-berd-primary/10" : ""
                    }`}
                  >
                    <Icon className="w-3.5 md:w-4 h-3.5 md:h-4" />
                    <span className="flex-1 text-sm md:text-base">{category.name}</span>
                    {selectedCategory.id === category.id && (
                      <div className="bg-berd-primary rounded-full w-1.5 md:w-2 h-1.5 md:h-2" />
                    )}
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="relative flex-1">
            <Input
              type="text"
              placeholder="Найти блюдо..."
              className="shadow-none py-1.5 md:py-2 pr-10 md:pr-12 pl-2 md:pl-4 border-0 focus-visible:ring-0 focus-visible:ring-offset-0 h-auto text-xs md:text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button
              type="submit"
              size="icon"
              variant="ghost"
              className="top-1/2 right-1 absolute w-7 md:w-8 h-7 md:h-8 text-gray-400 hover:text-orange-500 -translate-y-1/2"
            >
              <Search className="w-3.5 md:w-4 h-3.5 md:h-4" />
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};