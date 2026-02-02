"use client";

import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { CategoryCard } from "./CategoryCard";
import { SwiperControls } from "./SwiperControls";
import { Beef, CookingPot, CupSoda, Grid3X3, Snowflake, PillBottle, SoupIcon, Droplets, ChevronRight } from "lucide-react";

interface CategoriesSwiper {
  id: number
  name: string
  icon: JSX.Element
}

const categories: CategoriesSwiper[] = [
  { id: 1, name: "Готовая еда", icon: <CookingPot /> },
  { id: 2, name: "Другие", icon: <Grid3X3/> },
  { id: 3, name: "Мясо и птица", icon: < Beef/> },
  { id: 4, name: "Напитки", icon: <CupSoda /> },
  { id: 5, name: "Полуфабрикаты", icon: <Snowflake />},
  { id: 6, name: "Салаты и консервы", icon: <PillBottle />},
  { id: 7, name: "Соусы и зажарки", icon: <Droplets/> },
  { id: 8, name: "Супы", icon: <SoupIcon/>},
  { id: 9, name: "Полуфабрикаты", icon: <Snowflake />},
  { id: 10, name: "Салаты и консервы", icon: <PillBottle />},
  { id: 11, name: "Соусы и зажарки", icon: <Droplets/> },
  { id: 12, name: "Супы", icon: <SoupIcon/>},
];

export const CategoriesSwiper = () => {
  return (
    <section className="mt-8 px-4 sm:px-6 lg:px-8">
      <div className="flex sm:flex-row flex-col justify-between items-start sm:items-end gap-4 mb-5">
       <div>
          <h2 className="font-sans font-bold text-gray-900 text-2xl sm:text-3xl lg:text-4xl">
            Категории
          </h2>
          <p className="mt-2 font-sans text-gray-500 text-sm sm:text-base">
            Выберите интересующую категорию
          </p>
        </div>
         <div className="flex items-center gap-4">
          <Link
            href="/catalog"
            className="flex items-center gap-1 hover:opacity-80 font-medium text-berd-primary text-sm sm:text-base"
          >
             <span className="font-semibold">Все категории</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      <div className="relative mx-[-16px] md:mx-[-24px] lg:mx-[-32px]">
        <div className="px-4 md:px-6 lg:px-8">
          <Swiper
            slidesPerView="auto"
            spaceBetween={12}
            breakpoints={{
              0: {
                spaceBetween: 12,
              },
              640: {
                spaceBetween: 16,
              },
              1024: {
                spaceBetween: 24,
              },
            }}
          >
            <div className="hidden md:block">
              <SwiperControls position="sides" totalSlides={categories.length} />
            </div>
            
            {categories.map((category) => (
              <SwiperSlide
                key={category.id}
                className="!w-[110px] sm:!w-[130px] md:!w-[150px] lg:!w-[135px]"
              >
                <CategoryCard category={category} />
              </SwiperSlide>
            ))}
            
            <div className="md:hidden block">
              <SwiperControls position="bottom" totalSlides={categories.length} />
            </div>
          </Swiper>
        </div>
      </div>
    </section>
  );
}; 