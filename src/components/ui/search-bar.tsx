"use client";

import { useState, useEffect, useRef } from "react";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log("Поиск:", searchQuery);
      setIsOpen(false);
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
    inputRef.current?.focus();
  };

  return (
    <div ref={searchRef} className="z-50 relative flex-1 max-w-2xl">
      <form onSubmit={handleSearch} className="relative">
        <div className="flex items-center bg-white shadow-sm hover:shadow border border-gray-200 focus-within:border-amber-500 rounded-full focus-within:ring-2 focus-within:ring-amber-200 overflow-hidden transition-all duration-200">
          <Input
            ref={inputRef}
            type="text"
            placeholder="Поиск..."
            className="shadow-none py-2 sm:py-2.5 pr-12 pl-4 sm:pl-5 border-0 focus-visible:ring-0 focus-visible:ring-offset-0 w-full h-auto text-sm sm:text-base"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsOpen(true)}
          />
          {searchQuery && (
            <button
              type="button"
              onClick={clearSearch}
              className="right-12 sm:right-14 absolute text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <Button
            type="submit"
            size="icon"
            variant="ghost"
            className="flex-shrink-0 hover:bg-amber-50 mr-1 rounded-full w-9 h-9 text-gray-500 hover:text-amber-600"
          >
            <Search className="w-4 h-4" />
          </Button>
        </div>
      </form>

      {isOpen && (
        <div className="top-full left-0 z-50 absolute bg-white slide-in-from-top-2 shadow-2xl mt-2 border border-gray-100 rounded-xl w-full overflow-hidden animate-in duration-200 fade-in">
          <div className="p-3 max-h-60 overflow-y-auto">
            {searchQuery ? (
              <div className="space-y-2">
                <p className="text-gray-500 text-xs">Результаты по запросу «{searchQuery}»</p>
                <div className="py-4 text-gray-400 text-center">
                  <Search className="opacity-20 mx-auto mb-2 w-6 h-6" />
                  <p className="text-xs">Ничего не найдено</p>
                </div>
              </div>
            ) : (
              <div className="py-4 text-gray-400 text-center">
                <p className="text-xs">Начните вводить запрос...</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};