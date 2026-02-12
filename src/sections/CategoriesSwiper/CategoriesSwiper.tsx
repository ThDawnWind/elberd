'use client'

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { CategoryCard } from './CategoryCard';
import { CATEGORIES } from '@/lib/constants';
import 'swiper/css';
import 'swiper/css/navigation';
import { SwiperControls } from './SwiperControls';

export const CategoriesSwiper = () => {
  return (
    <div className="relative px-2 sm:px-4 lg:px-4">
      <Swiper
        modules={[Navigation]}
        navigation={{
          nextEl: '.custom-next',
          prevEl: '.custom-prev',
          disabledClass: 'opacity-30 pointer-events-none',
        }}
          slidesPerView={2.5}     
          spaceBetween={8}          
          breakpoints={{
            490: {                 
              slidesPerView: 2.5,
              spaceBetween: 5,
            },
            768: {                 
              slidesPerView: 4,
              spaceBetween: 5,
            },
            1024: {                 
              slidesPerView: 6,
              spaceBetween: 5,
            },
            1280: {                 
              slidesPerView: 9,
              spaceBetween: 24,
            },
          }}
        className="!pb-2"
      >
        {CATEGORIES.map((category) => (
          <SwiperSlide key={category.id}>
            <CategoryCard {...category} />
          </SwiperSlide>
        ))}
      </Swiper>
      
      <SwiperControls />
    </div>
  );
};
