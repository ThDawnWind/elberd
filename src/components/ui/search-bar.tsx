"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { Search, X } from "lucide-react";
import { useDebounce } from "use-debounce";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatPrice } from "@/lib/format";
import { useProductModalStore } from "@/stores/product-modal.store";
import { Product } from "@/types/product";

type SearchBarProps = {
  products?: Product[];
};

function normalize(text: string) {
  return text.toLowerCase().trim();
}

export const SearchBar = ({ products = [] }: SearchBarProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const [debouncedQuery] = useDebounce(searchQuery, 300);

  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const openModal = useProductModalStore((s) => s.open);

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

  const isTyping = searchQuery !== debouncedQuery;

  const results = useMemo(() => {
    const query = normalize(debouncedQuery);

    if (!query) return [];

    return products
      .filter((product) => {
        const haystack = normalize(
          [product.name, product.category, product.content, product.weight].join(" ")
        );

        return haystack.includes(query);
      })
      .slice(0, 8);
  }, [products, debouncedQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    if (!results.length) return;

    openModal(results[0]);
    setIsOpen(false);
    setSearchQuery("");
  };

  const clearSearch = () => {
    setSearchQuery("");
    inputRef.current?.focus();
  };

  const handleSelectProduct = (product: Product) => {
    openModal(product);
    setSearchQuery("");
    setIsOpen(false);
  };

  return (
    <div ref={searchRef} className="z-50 relative flex-1 max-w-2xl">
      <form onSubmit={handleSearch} className="relative">
        <div className="flex items-center bg-white shadow-sm hover:shadow border border-gray-200 focus-within:border-amber-500 rounded-[10px] focus-within:ring-2 focus-within:ring-amber-200 overflow-hidden transition-all duration-200">
          <Input
            ref={inputRef}
            type="text"
            placeholder="Поиск товаров..."
            className="shadow-none py-2.5 sm:py-2.5 pr-12 pl-4 sm:pl-5 border-0 focus-visible:ring-0 focus-visible:ring-offset-0 w-full h-auto font-normal text-sm sm:text-base"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsOpen(true)}
          />

          {searchQuery && (
            <button
              type="button"
              onClick={clearSearch}
              className="right-12 sm:right-14 absolute text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Очистить поиск"
            >
              <X className="w-4 h-4" />
            </button>
          )}

          <Button
            type="submit"
            size="icon"
            variant="ghost"
            className="flex-shrink-0 hover:bg-amber-50 mr-1 rounded-full w-9 h-9 text-gray-500 hover:text-amber-600"
            aria-label="Искать"
          >
            <Search className="w-4 h-4" />
          </Button>
        </div>
      </form>

      {isOpen && (
        <div className="top-full left-0 z-50 absolute bg-white slide-in-from-top-2 shadow-2xl mt-2 border border-gray-100 rounded-xl w-full overflow-hidden animate-out">
          <div className="p-3 max-h-80 overflow-y-auto">
            {!searchQuery.trim() ? (
              <div className="py-4 text-gray-400 text-center">
                <p className="text-xs">Начните вводить название товара...</p>
              </div>
            ) : isTyping ? (
              <div className="py-4 text-gray-400 text-center">
                <p className="text-xs">Поиск...</p>
              </div>
            ) : results.length > 0 ? (
              <div className="space-y-2">
                <p className="text-gray-500 text-xs">Найдено: {results.length}</p>

                <div className="space-y-1 animate-in">
                  {results.map((product) => (
                    <button
                      key={product.id}
                      type="button"
                      onClick={() => handleSelectProduct(product)}
                      className="flex items-center gap-3 hover:bg-gray-50 px-2 py-2 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 w-full text-left transition-colors"
                    >
                      <div className="bg-gray-100 rounded-md w-12 h-12 overflow-hidden shrink-0">
                        {product.image ? (
                          <Image
                            src={product.image}
                            alt={product.name}
                            width={96}
                            height={96}
                            className="w-full h-full object-cover"
                          />
                        ) : null}
                      </div>

                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm line-clamp-1">
                          {product.name}
                        </p>

                        <div className="flex items-center gap-2 text-muted-foreground text-xs">
                          {product.category ? <span>{product.category}</span> : null}
                          {product.weight ? <span>• {product.weight}</span> : null}
                        </div>
                      </div>

                      <div className="font-semibold text-sm whitespace-nowrap">
                        {formatPrice(product.price)}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="py-4 text-gray-400 text-center">
                <Search className="opacity-20 mx-auto mb-2 w-6 h-6" />
                <p className="text-xs">Ничего не найдено</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
