"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useCallback } from "react";
import "swiper/css";
import "swiper/css/effect-fade";

const slides = [
  {
    id: 1,
    title: "EL’BERD — вкус, проверенный временем!",
    subtitle: "Наши шеф-повара",
    description: "Семейное дело, выросшее из многолетнего опыта которому уже более 20-ти лет",
    image: "https://tasty-team.ru/upload/iblock/fbb/fbb3e6ebf039530a9b64c861d7dfb700.jpg",
    buttonText: "Узнать о команде",
    buttonLink: "/about",
  },
  {
    id: 2,
    title: "Чистота и стерильность",
    subtitle: "Чистота прежде всего",
    description: "Мы строго соблюдаем санитарные нормы на всех этапах — от отбора сырья до упаковки",
    image: "https://fitlabs.ru/wp-content/uploads/2017/07/123.jpg",
    buttonText: "Смотреть меню",
    buttonLink: "/catalog",
  },
    {
    id: 3,
    title: "Натуральный состав",
    subtitle: "Качество прежде всего",
    description: "Только натуральные ингредиенты без искусственных добавок, усилителей вкуса и красителей",
    image: "https://fitlabs.ru/wp-content/uploads/2017/07/123.jpg",
    buttonText: "Смотреть меню",
    buttonLink: "/catalog",
  },
];

export const WallaperSwiper = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);

  const handlePrev = useCallback(() => {
    if (swiperInstance) swiperInstance.slidePrev();
  }, [swiperInstance]);

  const handleNext = useCallback(() => {
    if (swiperInstance) swiperInstance.slideNext();
  }, [swiperInstance]);

  const goToSlide = useCallback((index: number) => {
    if (swiperInstance) swiperInstance.slideTo(index);
  }, [swiperInstance]);

  return (
    <div className="group relative mt-4 w-full h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden">
      <Swiper
        onSwiper={setSwiperInstance}
        modules={[Autoplay, EffectFade]}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        speed={800}
        loop={true}
        className="h-full"
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative rounded-xl md:rounded-2xl w-full h-full">
              <div className="z-10 absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent rounded-xl md:rounded-2xl" />
              <div className="absolute inset-0">
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  className="object-cover"
                  priority={slide.id === 1}
                  sizes="100vw"
                />
              </div>
              
              <div className="z-20 relative flex flex-col justify-end p-6 md:p-12 lg:p-16 h-full">
                <div className="max-w-2xl">
                  <div className="mb-2 md:mb-4">
                    <span className="inline-block bg-berd-primary px-3 py-1 rounded-full font-semibold text-gray-900 text-xs md:text-sm">
                      {slide.subtitle}
                    </span>
                  </div>
                  
                  <h1 className="mb-3 md:mb-6 font-bold text-white text-3xl md:text-5xl lg:text-6xl">
                    {slide.title}
                  </h1>
                  
                  <p className="mb-6 md:mb-8 max-w-xl text-white/90 text-base md:text-xl lg:text-2xl">
                    {slide.description}
                  </p>
                  
                  <Link
                    href={slide.buttonLink}
                    className="inline-flex items-center gap-2 bg-berd-primary hover:bg-berd-primary/90 shadow-lg hover:shadow-xl px-6 md:px-8 py-3 md:py-4 rounded-lg font-semibold text-gray-900 transition-all duration-300"
                  >
                    {slide.buttonText}
                    <ChevronRight className="w-4 md:w-5 h-4 md:h-5" />
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <button
        onClick={handlePrev}
        className="top-1/2 left-4 z-30 absolute flex justify-center items-center bg-white/20 hover:bg-white/30 opacity-0 group-hover:opacity-100 backdrop-blur-sm rounded-full w-10 md:w-12 h-10 md:h-12 transition-all -translate-y-1/2 duration-300"
        aria-label="Предыдущий слайд"
      >
        <ChevronLeft className="w-5 md:w-6 h-5 md:h-6 text-white" />
      </button>
      
      <button
        onClick={handleNext}
        className="top-1/2 right-4 z-30 absolute flex justify-center items-center bg-white/20 hover:bg-white/30 opacity-0 group-hover:opacity-100 backdrop-blur-sm rounded-full w-10 md:w-12 h-10 md:h-12 transition-all -translate-y-1/2 duration-300"
        aria-label="Следующий слайд"
      >
        <ChevronRight className="w-5 md:w-6 h-5 md:h-6 text-white" />
      </button>

      <div className="bottom-6 left-1/2 z-30 absolute flex items-center gap-2 -translate-x-1/2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
              activeIndex === index 
                ? 'bg-berd-primary w-6 md:w-8' 
                : 'bg-white/50'
            }`}
            aria-label={`Перейти к слайду ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};