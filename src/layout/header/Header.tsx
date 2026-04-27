"use client";

import Image from "next/image";
import Logo from "../../../public/logo.png";
import Link from "next/link";
import { CartLink } from "@/components/CartLink";
import { FavoritesLink } from "@/components/FavoritesLink";
import { SearchBar } from "@/components/ui/search-bar";
import { Product } from "@/types/product";
import clsx from "clsx";
import { Phone, Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { MobileMenu } from "./MobileMenu";

const NAVIGATION = [
  { name: "Главная", href: "/" },
  { name: "Меню", href: "/catalog" },
  { name: "О нас", href: "/about" },
  { name: "Магазины", href: "/where-to-buy" },
];

type HeaderProps = {
  searchProducts: Product[];
};

const Header = ({ searchProducts }: HeaderProps) => {
  const path = usePathname();

  return (
    <header className="top-0 z-50 sticky bg-white/95 supports-[backdrop-filter]:bg-white/60 backdrop-blur border-b-[2px] border-[#e8dcc8] shadow-[0_10px_14px_#fd74000f]">
      <div className="max-w-[1440px] w-full flex items-center gap-x-4 p-4 m-auto xs:justify-between xs:py-2">
        {/* Logo */}
        <div className="mr-5 max-w-[170px] h-[70px]">
          <Image className="w-full h-full" src={Logo} alt="Эльберд" />
        </div>

        {/* Desktop nav + search */}
        <div className="flex flex-1 px-2 border-l-2 border-r-2 xs:hidden">
          <nav>
            <ul className="flex gap-x-4 py-2">
              {NAVIGATION.map((item) => (
                <li
                  key={item.name}
                  className={clsx("text-base font-medium", {
                    "font-semibold text-[#d9a441]": item.href === path,
                  })}
                >
                  <Link href={item.href}>{item.name}</Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="hidden lg:block flex-1 mx-4 lg:mx-6 min-w-0 max-w-2xl w-full">
            <SearchBar products={searchProducts} />
          </div>
        </div>

        {/* Right side: favorites, cart, phone, burger */}
        <div className="flex items-center gap-x-4">
          <FavoritesLink />
          <CartLink />
          <Sheet>
            <SheetTrigger asChild>
              <button
                className="hidden xs:flex items-center justify-center w-10 h-10 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors ml-2"
                aria-label="Открыть меню"
              >
                <Menu className="w-5 h-5 text-gray-700" />
              </button>
            </SheetTrigger>
            <MobileMenu searchProducts={searchProducts} />
          </Sheet>
        </div>

        <a href="tel:+79991234567" className="flex items-center ml-3 gap-x-2 text-[16px] font-semibold xs:hidden">
          <Phone className="w-4 h-4 text-[#d9a441]" />
          <span>+7 (999) 123-45-67</span>
        </a>
      </div>
    </header>
  );
};

export default Header;
