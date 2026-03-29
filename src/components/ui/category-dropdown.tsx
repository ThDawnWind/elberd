"use client";

import { useState } from "react";
import { CATEGORIES } from "@/lib/constants";
import { usePathname, useRouter } from "next/navigation";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { CategoryDropdownProps } from "@/types";
import { AnimatePresence, motion } from "motion/react";
import { ICONS } from "@/lib/icons";

export function CategoryDropdown({
  selectedCategory,
  setSelectedCategory,
  trigger,
}: CategoryDropdownProps) {
  const pathname = usePathname();
  const router = useRouter();
  const isCatalogPage = pathname === "/catalog";

  const [open, setOpen] = useState(false);

  if (isCatalogPage) return <>{trigger}</>;

  return (
    <HoverCard
      open={open}
      onOpenChange={setOpen}
      openDelay={100}
      closeDelay={200}
    >
      <HoverCardTrigger asChild>{trigger}</HoverCardTrigger>

      <AnimatePresence>
        {open && (
          <HoverCardContent className="p-0 w-60" align="start" sideOffset={8}>
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.98 }}
              transition={{ duration: 0.35 }}
            >
              <div className="py-1 max-h-[400px] overflow-y-auto">
                {CATEGORIES.map((category) => {
                  const Icon = ICONS[category.icon];
                  const isAllCategories = category.name === "Все категории";
                  const isSelected = isAllCategories
                    ? selectedCategory === "all"
                    : selectedCategory === category.id.toString();

                  return (
                    <button
                      key={category.id}
                      className={`
                        flex w-full items-center gap-2 p-2 text-left text-sm font-medium
                        transition-colors hover:bg-berd-primary hover:text-white
                        ${isSelected ? "bg-berd-primary/10 text-berd-primary" : ""}
                      `}
                      onClick={() => {
                        if (isAllCategories) setSelectedCategory("all");
                        else setSelectedCategory(category.id.toString());

                        setOpen(false);
                        router.push(`/catalog?category=${category.slug}`);
                      }}
                    >
                      <div className="flex justify-center items-center w-6 h-6">
                        <Icon className="w-4 h-4" />
                      </div>

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
        )}
      </AnimatePresence>
    </HoverCard>
  );
}