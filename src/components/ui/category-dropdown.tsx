"use client";

import { CATEGORIES } from "@/lib/constants";
import { usePathname } from "next/navigation";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { CategoryDropdownProps } from "@/types";
import { motion } from "motion/react";

export function CategoryDropdown({
  selectedCategory,
  setSelectedCategory,
  trigger,
}: CategoryDropdownProps) {
  const pathname = usePathname();
  const isCatalogPage = pathname === "/catalog";

  if (isCatalogPage) {
    return <>{trigger}</>;
  }

  return (
    <HoverCard openDelay={100} closeDelay={200}>
      <HoverCardTrigger asChild>
        {trigger}
      </HoverCardTrigger>

      <HoverCardContent 
        className="p-0 w-60" 
        align="start"
        sideOffset={8}
      >
        <motion.div
        initial={{ opacity: 0, y: 8, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 8, scale: 0.98 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      >
            <div className="py-1 max-h-[400px] overflow-y-auto">
          {CATEGORIES.map((category) => {
            const Icon = category.icon;
            const isAllCategories = category.name === "Все категории";
            const isSelected = isAllCategories
              ? selectedCategory === "all"
              : selectedCategory === category.id.toString();

            return (
              <button
                key={category.id}
                className={`
                  flex items-center gap-2 w-full p-2 text-left font-sens text-sm
                  hover:bg-berd-primary hover:text-white transition-colors
                  ${isSelected ? "bg-berd-primary/10 text-berd-primary" : ""}
                `}
                onClick={() => {
                  if (isAllCategories) {
                    setSelectedCategory("all");
                  } else {
                    setSelectedCategory(category.id.toString());
                  }
                }}
              >
                <Icon className="w-4 h-4" />
                <span className="flex-1">{category.name}</span>
                {isSelected && (
                  <div className="bg-berd-primary rounded-full w-2 h-2" />
                )}
              </button>
            );
          })}
        </div>
        </motion.div>
      </HoverCardContent>
    </HoverCard>
  );
}