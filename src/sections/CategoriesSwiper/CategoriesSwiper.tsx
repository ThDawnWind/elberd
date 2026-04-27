"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { CategoryCard } from "./CategoryCard";
import {  CATEGORIES } from "@/lib/constants";
// import { allCategory } from "@/lib/constants";
import "swiper/css";
import "swiper/css/navigation";
import { SwiperControls } from "./SwiperControls";
import { motion } from "motion/react";
import { useState, useEffect } from "react";

export const CategoriesSwiper = () => {
  const [isShowSwiperControls, setIsShowSwiperControls] = useState(false);

  useEffect(() => {
    const check = () => setIsShowSwiperControls(window.innerWidth <= 1280);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative mb-[64px] xs:mb-[32px]"
    >
      <Swiper
        modules={[Navigation]}
        navigation={{
          nextEl: ".custom-next",
          prevEl: ".custom-prev",
          disabledClass: "opacity-30",
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
            slidesPerView: 7,
            spaceBetween: 19,
          },
        }}
      >
        {/* <SwiperSlide key={allCategory.id}>
          <CategoryCard {...allCategory} />
        </SwiperSlide> */}
        {CATEGORIES.map((category) => (
          <SwiperSlide key={category.id}>
            <CategoryCard {...category} />
          </SwiperSlide>
        ))}
      </Swiper>
      {isShowSwiperControls && <SwiperControls />}
    </motion.section>
  );
};
