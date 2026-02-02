// components/layout/SubHeader.tsx
"use client";

import Link from "next/link";
import { Menu } from "lucide-react";

const navItems = [
  { name: "Главная", href: "/" },
  { name: "О нас", href: "/about" },
  { name: "Магазины", href: "/stores" },
];

export const SubHeader = () => {
  return (
    <nav className="bg-white border-b w-full">
      <div className="mx-4 md:mx-[90px] px-4">
        <div className="hidden md:flex justify-between items-center h-12">
          <div className="flex items-center gap-6">
            <Link 
              href="/catalog"
              className="group flex items-center gap-2 hover:bg-berd-primary px-4 py-2 rounded-lg focus:outline-2 active:outline-black text-black transition-colors"
            >
              <Menu className="w-4 h-4" />
              <span className="font-medium">Меню</span>
            </Link>
            
            <div>
              <Link
                href="/"
                className="group relative py-1 font-medium text-gray-700 text-sm transition-colors hover:berd-primary"
              >
                Главная
                <span className="bottom-0 left-0 absolute bg-berd-primary w-0 group-hover:w-full h-0.5 transition-all duration-300" />
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <Link
              href="/about"
              className="group relative py-1 font-medium text-gray-700 hover:text-berd-primary text-sm transition-colors"
            >
              О нас
              <span className="bottom-0 left-0 absolute bg-berd-primary w-0 group-hover:w-full h-0.5 transition-all duration-300" />
            </Link>
            <Link
              href="/stores"
              className="group relative py-1 font-medium text-gray-700 hover:text-berd-primary text-sm transition-colors"
            >
              Наши магазины
              <span className="bottom-0 left-0 absolute bg-berd-primary group-hover:w-full h-0.5 transition-all duration-300" />
            </Link>
          </div>
        </div>

        <div className="md:hidden py-3">
          <div className="flex flex-col space-y-3">
            <Link 
              href="/catalog"
              className="flex items-center gap-3 bg-berd-primary hover:bg-berd-primary px-4 py-3 rounded-lg text-white transition-colors"
            >
              <Menu className="w-5 h-5" />
              <span className="font-medium">Меню</span>
            </Link>

            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center hover:bg-gray-50 px-4 py-3 rounded-lg text-gray-700 hover:text-berd-primary transition-colors"
              >
                <span className="font-medium text-sm">{item.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};