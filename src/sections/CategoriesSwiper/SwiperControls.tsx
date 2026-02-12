"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

export const SwiperControls = () => {
  return (
    <div className="flex justify-center items-center gap-4 mt-10">
      <button 
        className="bottom-0 left-1/2 z-10 absolute bg-white hover:bg-berd-primary shadow rounded-full w-8 sm:w-10 lg:w-10 h-8 sm:h-10 lg:h-10 hover:text-white transition-all -translate-x-12 sm:-translate-x-14 lg:-translate-x-16 duration-300 custom-prev"
      >
        <ChevronLeft className="mx-auto w-4 sm:w-5 lg:w-5 h-4 sm:h-5 lg:h-5" />
      </button>
      
      <button 
        className="bottom-0 left-1/2 z-10 absolute bg-white hover:bg-berd-primary shadow rounded-full w-8 sm:w-10 lg:w-10 h-8 sm:h-10 lg:h-10 hover:text-white transition-all translate-x-4 sm:translate-x-6 lg:translate-x-8 duration-300 custom-next"
      >
        <ChevronRight className="mx-auto w-4 sm:w-5 lg:w-5 h-4 sm:h-5 lg:h-5" />
      </button>
    </div>
  );
};