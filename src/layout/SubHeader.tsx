"use client";

import Link from "next/link";
import { Home, Menu} from "lucide-react";
import { CategoryDropdown } from "@/components/ui/category-dropdown";
import { mobileNavItems } from "@/lib/constants";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const SubHeader = () => {
  const pathname = usePathname();
  const router = useRouter(); 
  const searchParams =  useSearchParams();
  const isCatalog = pathname.startsWith("/catalog");
  const selectedCategory = searchParams.get("category") || "all";

  return (
    <>
      <nav aria-label="Подменю" className="xs:hidden bg-white border-b w-full">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-6 lg:gap-8 h-12">
            <div className="flex items-center gap-6 lg:gap-8">
              <div className="relative">
                <CategoryDropdown 
                  selectedCategory={selectedCategory}
                  setSelectedCategory={(next) => {
                    const url = next === "all" ? "/catalog" : `/catalog?category=${next}`;
                    router.push(url);
                  }}
                trigger={
                    <Link 
                      href="/catalog"
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                        isCatalog 
                          ? "bg-berd-primary text-black" 
                          : "hover:bg-berd-primary/10 text-gray-800"
                      }`}
                      aria-label="Открыть меню каталога"
                      title="Каталог"
                      aria-current={isCatalog ? "page" : undefined}
                    >
                      <Menu className="w-4 h-4" />
                      <span className="font-sans font-normal text-sm">
                        Меню
                      </span>
                    </Link>
                  }
                />
              </div>
              <Link
                href="/"
                className={`relative group flex items-center gap-2 py-1 font-medium text-sm transition-colors ${
                  pathname === "/"
                    ? "text-berd-primary"
                    : "text-gray-700 hover:text-berd-primary"
                }`}
                aria-label="Перейти на главную страницу"
                aria-current={pathname === "/" ? "page" : undefined}
              >
                <Home className="w-4 h-4" />
                <span className="font-sans font-normal text-sm">Главная</span>
                <span 
                  className={`bottom-0 left-0 absolute bg-berd-primary h-0.5 transition-all duration-300 ${
                     pathname === "/"
                      ? "w-full"
                      : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            </div>

            <div className="flex items-center gap-6 lg:gap-8 ml-auto">
              <Link
                href="/about"
                className={`group relative py-1 font-medium text-sm transition-colors ${
                  pathname === "/about"
                    ? "text-berd-primary"
                    : "text-gray-700 hover:text-berd-primary"
                }`}
                aria-label="Перейти к разделу 'О нас'"
                aria-current={pathname === "/about" ? "page" : undefined}
              >
                <span className="font-sans font-normal text-sm">О нас</span>
                <span className={`absolute bottom-0 left-0 bg-berd-primary h-0.5 transition-all duration-300 ${
                    pathname === "/about" ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
              <Link
                href="/where-to-buy"
                className={`group relative py-1 font-medium text-sm transition-colors ${
                  pathname === "/where-to-buy"
                    ? "text-berd-primary"
                    : "text-gray-700 hover:text-berd-primary"
                }`}
                aria-label="Перейти к разделу 'Магазины'"
                aria-current={pathname === "/where-to-buy" ? "page" : undefined}
              >
                <span className="font-sans font-normal text-sm">Магазины</span> 
                <span 
                  className={`absolute bottom-0 left-0  bg-berd-primary h-0.5 transition-all duration-300 ${
                    pathname === "/where-to-buy" ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <nav className="sm:hidden lg:hidden block right-0 bottom-0 left-0 z-50 fixed bg-white/95 shadow-lg backdrop-blur-lg border-t">
        <div className="flex justify-around items-center px-1 h-16">
          {mobileNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex flex-col justify-center items-center gap-1 px-2 py-1 rounded-xl min-w-[60px] transition-colors ${
                  isActive
                    ? "text-berd-primary"
                    : "text-gray-600 hover:text-berd-primary"
                }`}
                aria-label={`Перейти к разделу ${item.name}`}
                aria-current={isActive ? "page" : undefined}
              >
                <div className="relative">
                  <Icon className="w-5 h-5" />
                  {isActive && (
                    <div className="-top-1 -right-1 absolute bg-berd-primary rounded-full w-2 h-2"></div>
                  )}
                </div>
                <span className="font-medium text-[10px] sm:text-xs">{item.name}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      <div className="xs:hidden sm:hidden" />
    </>
  );
};