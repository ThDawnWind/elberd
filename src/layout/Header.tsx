import Link from "next/link";
import Image from 'next/image';
import { Heart, Phone, ShoppingCart } from 'lucide-react';
import { SearchBar } from "../components/ui/search-bar";

export const Header = () => {
  const favoritesCount = 5;
  const cartCount = 7;

  return (
    <header className="top-0 z-50 sticky bg-white/95 supports-[backdrop-filter]:bg-white/60 backdrop-blur border-b w-full font-mono">
      <div className="px-4 md:px-8 lg:px-12">
        <div className="flex justify-between items-center h-16 md:h-20">
          
          <div className="flex flex-shrink-0 items-center">
            <Link href="/" className="flex items-center gap-1 md:gap-2">
              <div className="relative w-21 md:w-28 lg:w-28 h-21 md:h-28 lg:h-28">
                  <Image
                    src="/logo.png"
                    alt="Эльберд"
                    width={98} 
                    height={98}
                    priority
                    className="w-full h-full object-contain scale-125 md:scale-150"
                  />
                </div>

              
              <div className="flex flex-col">
                <span className="font-bold text-berd-primary text-lg md:text-xl lg:text-2xl">
                  Эльберд
                </span>
                <p className="text-gray-500 text-xs md:text-sm">
                  Доставка еды
                </p>
              </div>
            </Link>
          </div>

          <div className="hidden xl:block flex-1 mx-3 md:mx-6 lg:mx-8 min-w-0 max-w-2xl">
            <SearchBar />
          </div>

          <div className="flex flex-shrink-0 items-center gap-3 md:gap-4 lg:gap-6"> 
            <Link 
              href="/favorites" 
              className="relative flex items-center gap-2.5 md:gap-2.5 hover:text-red-500 transition-colors"
            >
              <div className="relative">
                <Heart className="w-5 md:w-6 h-5 md:h-6 text-gray-700" />
                {favoritesCount > 0 && (
                  <span className="-top-1.5 md:-top-2 -right-1.5 md:-right-2 absolute flex justify-center items-center bg-red-500 rounded-full w-4 md:w-5 h-4 md:h-5 font-semibold text-[10px] text-white md:text-xs">
                    {favoritesCount}
                  </span>
                )}
              </div>
              <span className="hidden lg:inline font-medium text-gray-700 text-sm">
                Избранное
              </span>
            </Link>

            <Link 
              href="/cart" 
              className="relative flex items-center gap-2 md:gap-2.5 hover:text-berd-primary transition-colors"
            >
              <div className="relative">
                <ShoppingCart className="w-5 md:w-6 h-5 md:h-6 text-gray-700" />
                {cartCount > 0 && (
                  <span className="-top-1.5 md:-top-2 -right-1.5 md:-right-2 absolute flex justify-center items-center bg-berd-primary rounded-full w-4 md:w-5 h-4 md:h-5 font-semibold text-[10px] text-black md:text-xs">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="hidden lg:inline font-medium text-gray-700 text-sm">
                Корзина
              </span>
            </Link>
            
            <div className="flex items-center">
              <a 
                href="tel:+79899194871" 
                className="lg:hidden flex justify-center items-center hover:bg-gray-100 rounded-full w-10 h-10 transition-colors"
                aria-label="Позвонить +7 (989) 919-48-71"
              >
                <Phone className="w-5 h-5 text-gray-700" />
              </a>
              
              <div className="hidden lg:flex items-center gap-3">
                <a 
                  href="tel:+79899194871" 
                  className="flex items-center gap-2 bg-berd-primary hover:bg-berd-primary/90 px-4 py-2 rounded-lg font-semibold text-white text-sm transition-colors"
                  aria-label="Позвонить по номеру +7 (989) 919-48-71"
                >
                  <Phone className="w-4 h-4" />
                  Позвонить
                </a>
                
                <div className="flex flex-col">
                  <span className="font-bold text-gray-900 text-sm">
                    +7 (989) 919-48-71
                  </span>
                  <p className="text-gray-500 text-xs">
                    время работы: 9:00-20:00
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};