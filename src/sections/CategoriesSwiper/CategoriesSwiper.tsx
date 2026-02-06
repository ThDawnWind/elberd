// components/sections/CategoriesSwiper/index.tsx
"use client";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { CategoryCard } from './CategoryCard';
import { CATEGORIES } from '@/lib/constants';
import 'swiper/css';
import 'swiper/css/navigation';
import { SwiperControls } from './SwiperControls';

export const CategoriesSwiper = () => {
  return (
    <div className="relative px-2 md:px-4">
      <Swiper
        modules={[Navigation]}
        navigation={{
          nextEl: '.custom-next',
          prevEl: '.custom-prev',
          disabledClass: 'opacity-30 pointer-events-none',
        }}
        slidesPerView={7}
        breakpoints={{
          320: {
            slidesPerView: 1.3,
            spaceBetween: 1,
          },
          375: {
            slidesPerView: 2,
            spaceBetween: 1, 
          },
          425: {
            slidesPerView: 2,
            spaceBetween: 1.5,
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 2, 
            centeredSlides: false, 
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 2, 
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 4, 
          },
           1440: {
            slidesPerView: 8,
            spaceBetween: 4,
          },
        }}
        className="!pb-2"
      >
        {CATEGORIES.map((category) => (
          <SwiperSlide 
            key={category.id} 
          >
              <CategoryCard {...category} />
          </SwiperSlide>
        ))}
      </Swiper>
      
      <SwiperControls />
    </div>
  );
};