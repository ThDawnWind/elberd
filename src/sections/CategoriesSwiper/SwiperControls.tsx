// components/sections/CategoriesSwiper/SwiperControls.tsx
"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useSwiper } from "swiper/react";
import { useState, useEffect } from "react";

interface ControlsProps {
  position: "sides" | "bottom";
  totalSlides: number;
}

export const SwiperControls = ({ position, totalSlides }: ControlsProps) => {
  const swiper = useSwiper();
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  useEffect(() => {
    if (!swiper) return;

    const updateNavigation = () => {
      setIsBeginning(swiper.isBeginning);
      setIsEnd(swiper.isEnd);
    };

    updateNavigation();

    swiper.on('slideChange', updateNavigation);

    return () => {
      swiper.off('slideChange', updateNavigation);
    };
  }, [swiper]);

  if (!swiper || totalSlides <= 8) {
    return null;
  }

  const buttonClasses = (disabled: boolean) => `
    flex justify-center items-center 
    rounded-full w-10 h-10 md:w-12 md:h-12 
    transition-all duration-300 border shadow-md
    ${disabled 
      ? 'opacity-40 cursor-not-allowed bg-gray-100 border-gray-300' 
      : 'bg-white hover:bg-berd-primary border-gray-300 hover:border-berd-primary hover:shadow-lg cursor-pointer'
    }
  `;

  const iconClasses = (disabled: boolean) => 
    `w-5 h-5 md:w-6 md:h-6 ${disabled ? 'text-gray-400' : 'text-gray-700 hover:text-white'}`;


  if (position === "bottom") {
    return (
      <div className="flex justify-center items-center gap-4 mt-6">
        <button
          onClick={() => swiper.slidePrev()}
          disabled={isBeginning}
          aria-label="Предыдущий слайд"
          className={buttonClasses(isBeginning)}
        >
          <ChevronLeft className={iconClasses(isBeginning)} />
        </button>

        <button
          onClick={() => swiper.slideNext()}
          disabled={isEnd}
          aria-label="Следующий слайд"
          className={buttonClasses(isEnd)}
        >
          <ChevronRight className={iconClasses(isEnd)} />
        </button>
      </div>
    );
  }

  return (
    <div className="hidden top-1/2 right-0 left-0 z-20 absolute md:flex justify-between px-4 -translate-y-1/2">
      <button
        onClick={() => swiper.slidePrev()}
        disabled={isBeginning}
        aria-label="Предыдущий слайд"
        className={`${buttonClasses(isBeginning)} -translate-x-1/2`}
      >
        <ChevronLeft className={iconClasses(isBeginning)} />
      </button>

      <button
        onClick={() => swiper.slideNext()}
        disabled={isEnd}
        aria-label="Следующий слайд"
        className={`${buttonClasses(isEnd)} translate-x-1/2`}
      >
        <ChevronRight className={iconClasses(isEnd)} />
      </button>
    </div>
  );
};