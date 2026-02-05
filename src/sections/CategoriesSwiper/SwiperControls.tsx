"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

export const SwiperControls = () => {
  return (
    <>
      <button 
        className="bottom--2 left-1/2 z-10 absolute bg-white hover:bg-berd-primary shadow rounded-full w-10 h-10 hover:text-white transition-all -translate-x-12 duration-300 custom-prev"
      >
        <ChevronLeft className="mx-auto w-5 h-5" />
      </button>
      
      <button 
        className="bottom--2 left-1/2 z-10 absolute bg-white hover:bg-berd-primary shadow rounded-full w-10 h-10 hover:text-white transition-all translate-x-2 duration-300 custom-next"
      >
        <ChevronRight className="mx-auto w-5 h-5" />
      </button>
    </>
  );
};