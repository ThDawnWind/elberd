"use client"

import { useState, useEffect } from 'react'
import { cn } from "@/lib/utils"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselApi,
} from "@/components/ui/carousel"
import Image from 'next/image'
import { CarouselWithDotsProps } from '@/types'

export function CarouselWithDots({
  images,
  alt,
  className,
  imageClassName,
  
}: CarouselWithDotsProps) {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (!api) {
      return
    }

    setCurrent(api.selectedScrollSnap())

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap())
    })
  }, [api])

  const handleDotClick = (index: number) => {
    if (api) {
      api.scrollTo(index)
    }
  }

  if (images.length <= 1) {
    return (
      <div className={cn("relative aspect-square", className)}>
        <Image
          src={images[0] || '/images/placeholder.jpg'}
          alt={alt}
          fill
          className={cn("object-cover", imageClassName)}
          sizes="510px"
        />
      </div>
    )
  }

  return (
    <div className={cn("relative", className)}>
      <Carousel setApi={setApi} className="w-full">
        <CarouselContent>
          {images.map((img, index) => (
            <CarouselItem key={index}>
              <div className="relative w-full h-[220px] aspect-square">
                <Image
                  src={img}
                  alt={`${alt} - фото ${index + 1}`}
                  fill
                  className={cn("object-cover", imageClassName)}
                  sizes="510px"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <div className="right-0 bottom-3 left-0 z-10 absolute flex justify-center">
          <div className="flex gap-1.5 bg-black/20 backdrop-blur-sm px-2 py-1.5">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={cn(
                  "rounded-full w-1.5 h-1.5 transition-all duration-300",
                  current === index 
                    ? "bg-white w-3"
                    : "bg-white/60 hover:bg-white"
                )}
                aria-label={`Перейти к фото ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </Carousel>
    </div>
  )
}