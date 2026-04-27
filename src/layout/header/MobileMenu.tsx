"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { useDebounce } from "use-debounce";
import { Phone, Timer, Instagram, House, UtensilsCrossed, Info, MapPin, Search, X } from "lucide-react";
import clsx from "clsx";

// import Logo from "../../../public/logo.png";
import { SheetContent, SheetClose, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useProductModalStore } from "@/stores/product-modal.store";
import { formatPrice } from "@/lib/format";
import { Product } from "@/types/product";

type MobileMenuProps = {
  searchProducts: Product[];
};

const NAVIGATION = [
  { label: "Главная", href: "/", icon: House },
  { label: "Меню", href: "/catalog", icon: UtensilsCrossed },
  { label: "О нас", href: "/about", icon: Info },
  { label: "Магазины", href: "/where-to-buy", icon: MapPin },
];


function normalize(text: string) {
  return text.toLowerCase().trim();
}

type SearchProps = {
  products: Product[];
  onSelect: () => void;
};

function MobileSearch({ products, onSelect }: SearchProps) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [debouncedQuery] = useDebounce(query, 300);

  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const openModal = useProductModalStore((s) => s.open);

  const isTyping = query !== debouncedQuery;

  const results = useMemo(() => {
    const q = normalize(debouncedQuery);
    if (!q) return [];
    return products
      .filter((p) => normalize([p.name, p.category, p.content, p.weight].join(" ")).includes(q))
      .slice(0, 8);
  }, [products, debouncedQuery]);

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!results.length) return;
    openModal(results[0]);
    reset();
    onSelect();
  }

  function handleSelect(product: Product) {
    openModal(product);
    reset();
    onSelect();
  }

  function reset() {
    setQuery("");
    setIsOpen(false);
  }

  return (
    <div ref={containerRef} className="relative px-4 pt-4">
      <form onSubmit={handleSubmit}>
        <div className="flex items-center border border-gray-200 rounded-[10px] bg-white overflow-hidden shadow-sm transition-all focus-within:border-amber-500 focus-within:ring-2 focus-within:ring-amber-200">
          <Input
            ref={inputRef}
            type="text"
            placeholder="Поиск товаров..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsOpen(true)}
            className="border-0 shadow-none pl-4 pr-10 py-2.5 text-sm h-auto focus-visible:ring-0 focus-visible:ring-offset-0"
          />
          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                inputRef.current?.focus();
              }}
              className="absolute right-14 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Очистить"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <Button
            type="submit"
            size="icon"
            variant="ghost"
            className="shrink-0 mr-1 w-9 h-9 rounded-full text-gray-500 hover:text-amber-600 hover:bg-amber-50"
            aria-label="Найти"
          >
            <Search className="w-4 h-4" />
          </Button>
        </div>
      </form>

      {isOpen && (
        <div className="absolute left-4 right-4 top-full z-10 mt-1 bg-white border border-gray-100 rounded-xl shadow-xl overflow-hidden">
          <div className="max-h-64 overflow-y-auto p-3 space-y-1">
            {!query.trim() ? (
              <p className="py-3 text-xs text-gray-400 text-center">Начните вводить название товара...</p>
            ) : isTyping ? (
              <p className="py-3 text-xs text-gray-400 text-center">Поиск...</p>
            ) : results.length > 0 ? (
              <>
                <p className="text-xs text-gray-500 pb-1">Найдено: {results.length}</p>
                {results.map((product) => (
                  <button
                    key={product.id}
                    type="button"
                    onClick={() => handleSelect(product)}
                    className="flex items-center gap-3 w-full px-2 py-2 rounded-lg text-left hover:bg-gray-50 transition-colors"
                  >
                    <div className="w-10 h-10 shrink-0 rounded-md bg-gray-100 overflow-hidden">
                      {product.image && (
                        <Image
                          src={product.image}
                          alt={product.name}
                          width={80}
                          height={80}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium line-clamp-1">{product.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {[product.category, product.weight].filter(Boolean).join(" • ")}
                      </p>
                    </div>
                    <span className="text-sm font-semibold whitespace-nowrap">{formatPrice(product.price)}</span>
                  </button>
                ))}
              </>
            ) : (
              <div className="py-3 text-center text-gray-400">
                <Search className="w-5 h-5 mx-auto mb-1 opacity-20" />
                <p className="text-xs">Ничего не найдено</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export function MobileMenu({ searchProducts }: MobileMenuProps) {
  const path = usePathname();

  return (
    <SheetContent side="left" className="w-[300px] p-0 flex flex-col [&>button]:hidden">
      <SheetTitle className="sr-only">Навигация</SheetTitle>
      <SheetDescription className="sr-only">Главное меню сайта</SheetDescription>

      <div className="flex items-center justify-between px-5 h-16 border-b border-gray-100 shrink-0">
        <div className="flex items-center gap-2">
          <span className="text-base font-bold text-[#d9a441]">EL&apos;BERD</span>
        </div>
        <SheetClose className="flex items-center justify-center w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
          <X className="w-4 h-4 text-gray-600" />
          <span className="sr-only">Закрыть</span>
        </SheetClose>
      </div>

      <MobileSearch
        products={searchProducts}
        onSelect={() => {
          document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));
        }}
      />

      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <p className="px-3 mb-2 text-[11px] font-semibold text-gray-400 tracking-wider uppercase">Навигация</p>
        <ul className="flex flex-col gap-1">
          {NAVIGATION.map(({ label, href, icon: Icon }) => (
            <li key={href}>
              <SheetClose asChild>
                <Link
                  href={href}
                  className={clsx(
                    "flex items-center gap-3 px-4 h-12 rounded-xl text-base font-medium transition-colors",
                    path === href ? "bg-amber-50 text-[#d9a441] font-semibold" : "text-gray-700 hover:bg-gray-50",
                  )}
                >
                  <Icon className={clsx("w-5 h-5 shrink-0", path === href ? "text-[#d9a441]" : "text-gray-400")} />
                  {label}
                </Link>
              </SheetClose>
            </li>
          ))}
        </ul>

        <hr className="my-4 border-gray-100" />

        <div className="flex flex-col gap-3 px-3">
          <a
            href="tel:+79899194871"
            className="flex items-center gap-3 text-[15px] font-semibold text-gray-900 hover:text-[#d9a441] transition-colors"
          >
            <Phone className="w-5 h-5 text-[#d9a441] shrink-0" />
            +7 (989) 919-48-71
          </a>
          <div className="flex items-center gap-3 text-[13px] text-gray-400">
            <Timer className="w-5 h-5 text-[#d9a441] shrink-0" />
            08:00 — 20:00, без выходных
          </div>
        </div>

        <hr className="my-4 border-gray-100" />
        <div className="flex items-center gap-3 px-3">
          <span className="text-[13px] text-gray-400">Мы в соцсетях:</span>
          <a
            href="#"
            aria-label="WhatsApp"
            className="flex items-center justify-center w-10 h-10 rounded-full bg-[#25D366] hover:opacity-90 transition-opacity"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="white">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
          </a>
          <a
            href="#"
            aria-label="Instagram"
            className="flex items-center justify-center w-10 h-10 rounded-full bg-[#E1306C] hover:opacity-90 transition-opacity"
          >
            <Instagram className="w-5 h-5 text-white" />
          </a>
        </div>
      </nav>
    </SheetContent>
  );
}
