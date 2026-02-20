'use client'

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { CategoryCard } from './CategoryCard';
import { allCategory, CATEGORIES } from '@/lib/constants';
import 'swiper/css';
import 'swiper/css/navigation';
import { SwiperControls } from './SwiperControls';

export const CategoriesSwiper = () => {
  return (
    <div className="relative lg:px-4">
      <Swiper
        modules={[Navigation]}
        navigation={{
          nextEl: '.custom-next',
          prevEl: '.custom-prev',
          disabledClass: 'opacity-30',
        }}
          slidesPerView={2.5}     
          spaceBetween={12}          
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
              slidesPerView: 8,
              spaceBetween: 19,
            },
             1439: {                 
              slidesPerView: 8,
              spaceBetween: 19,
            },
          }}
        className="!pb-2"
      >
        <SwiperSlide key={allCategory.id}>
          <CategoryCard {...allCategory} />
        </SwiperSlide>
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
