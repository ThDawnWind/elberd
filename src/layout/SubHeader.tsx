"use client";

import Link from "next/link";
import { Grid3X3, Home, Info, Menu, Store } from "lucide-react";
import { useState } from "react";

const mobileNavItems = [  
  { name: "Главная", href: "/", icon: Home },
  { name: "Меню", href: "/catalog", icon: Grid3X3 },
  { name: "О нас", href: "/about", icon: Info },
  { name: "Магазины", href: "/stores", icon: Store },
];

export const SubHeader = () => {
  const [activeLink, setActiveLink] = useState("/");

  return (
    <>
      <nav className="hidden lg:block bg-white border-b w-full">
        <div className="mx-4 md:mx-8 lg:mx-12 xl:mx-24">
          <div className="flex items-center gap-8 h-12">
            <div className="flex items-center gap-8">
              <Link 
                href="/catalog"
                onClick={() => setActiveLink("/catalog")}
                className={`group flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  activeLink === "/catalog" 
                    ? "bg-berd-primary text-white" 
                    : "hover:bg-berd-primary/10 text-gray-800"
                }`}
              >
                <Menu className="w-4 h-4" />
                <span className="font-medium text-sm">Меню</span>
              </Link>

              <Link
                href="/"
                onClick={() => setActiveLink("/")}
                className={`group flex items-center gap-2 py-1 font-medium text-sm transition-colors ${
                  activeLink === "/"
                    ? "text-berd-primary"
                    : "text-gray-700 hover:text-berd-primary"
                }`}
              >
                <Home className="w-4 h-4" />
                <span>Главная</span>
                <span 
                  className={`bottom-0 left-0 absolute bg-berd-primary h-0.5 transition-all duration-300 ${
                    activeLink === "/"
                      ? "w-full"
                      : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            </div>

            <div className="flex items-center gap-8 ml-auto">
          <Link
              href="/about"
              onClick={() => setActiveLink("/about")}
              className={`group relative py-1 font-medium text-sm transition-colors ${
                activeLink === "/about"
                  ? "text-berd-primary"
                  : "text-gray-700 hover:text-berd-primary"
              }`}
            >
              <span>О нас</span>
              <span className={`absolute bottom-0 left-0 bg-berd-primary h-0.5 transition-all duration-300 ${
                  activeLink === "/about" ? "w-full" : "w-0 group-hover:w-full"
                }`}
              />
            </Link>

              <Link
                href="/stores"
                onClick={() => setActiveLink("/stores")}
                className={`group relative py-1 font-medium text-sm transition-colors ${
                  activeLink === "/stores"
                    ? "text-berd-primary"
                    : "text-gray-700 hover:text-berd-primary"
                }`}
              >
                <span>Магазины</span> 
                <span 
                  className={`absolute bottom-0 left-0  bg-berd-primary h-0.5 transition-all duration-300 ${
                    activeLink === "/stores" ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <nav className="lg:hidden block right-0 bottom-0 left-0 z-50 fixed bg-white/95 shadow-lg backdrop-blur-lg border-t">
        <div className="flex justify-around items-center px-1 h-16">
          {mobileNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeLink === item.href;
            
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setActiveLink(item.href)}
                className={`flex flex-col justify-center items-center gap-1 px-2 py-1 rounded-xl min-w-[60px] transition-colors ${
                  isActive
                    ? "text-berd-primary"
                    : "text-gray-600 hover:text-berd-primary"
                }`}
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

      <div className="lg:hidden h-16" />
    </>
  );
};