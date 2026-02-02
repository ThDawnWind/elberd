import Link from "next/link";
import { ChefHat,  Heart, ShoppingCart } from 'lucide-react';
import { SearchBar } from "../components/ui/search-bar";

export const Header = () => {
  const favoritesCount = 5;
  const cartCount = 7;

  return (
  <header className="top-0 bg-white/95 supports-[backdrop-filter]:bg-white/60 backdrop-blur border-b w-full font-mono">
    <div className="mx-4 md:mx-[90px] px-4">
        <div className="flex justify-between items-center w-100 h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex justify-center items-center bg-gradient-to-br from-primary-500 to-primary-600 rounded-full w-10 h-10">
               <ChefHat />
              </div>
              <div className="hidden md:block">
               <span className="font-bold text-berd-primary text-2xl">EL.BERD</span>
                <p className="-mt-1 text-gray-500 text-xs">доставка готовых блюд</p>
              </div>
            </Link>
          </div>
            <SearchBar/>
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
        <span className="-top-2 -right-2 absolute flex justify-center items-center bg-berd-primary rounded-full w-5 h-5 text-black text-xs">
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