"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselApi,
} from "@/components/ui/carousel";
import { CarouselWithDotsProps } from "@/types";

export function CarouselWithDots({
  images,
  alt,
  className,
  imageClassName,
  heightClass,
  sizes = "510px",
}: CarouselWithDotsProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  const handleDotClick = (index: number) => {
    api?.scrollTo(index);
  };

  const normalizedImages =
    images?.filter((img): img is string => Boolean(img?.trim())) ?? [];

  const safeImages = normalizedImages.length
    ? normalizedImages
    : ["/images/placeholder.png"];

  if (safeImages.length <= 1) {
    return (
      <div className={cn("relative w-full h-full overflow-hidden", heightClass, className)}>
        <Image
          src={safeImages[0]}
          alt={alt}
          fill
          className={cn("object-center object-cover", imageClassName)}
          sizes={sizes}
          priority
        />
      </div>
    );
  }

  return (
    <div className={cn("relative w-full h-full overflow-hidden", heightClass, className)}>
      <Carousel setApi={setApi} className="h-full">
        <CarouselContent className="h-full">
          {safeImages.map((img, index) => (
            <CarouselItem className="h-full" key={`${img}-${index}`}>
              <div className={cn("relative w-full h-full overflow-hidden", heightClass)}>
                <Image
                  src={img}
                  alt={`${alt} - фото ${index + 1}`}
                  width={260}
                  height={214}
                  className={cn("w-full h-full", imageClassName)}
                  priority={index === 0}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <div className="right-0 bottom-3 left-0 z-10 absolute flex justify-center pointer-events-none">
          <div className="flex gap-1.5 bg-black/20 backdrop-blur-sm px-2 py-1.5 rounded-md pointer-events-auto">
            {safeImages.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => handleDotClick(index)}
                className={cn(
                  "rounded-full h-1.5 transition-all duration-300",
                  current === index
                    ? "w-3 bg-white"
                    : "w-1.5 bg-white/60 hover:bg-white"
                )}
                aria-label={`Перейти к фото ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </Carousel>
    </div>
  );
}
