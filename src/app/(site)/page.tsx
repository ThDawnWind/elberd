import { Advantages } from "@/components/sections/Advantages";
import { CategoriesSwiper } from "@/components/sections/CategoriesSwiper/CategoriesSwiper";
import { PopularDishes } from "@/components/sections/PopularDishes";
import { RecommendedDishes } from "@/components/sections/RecommendedDishes";

import { WallaperSwiper } from "@/components/sections/Swiper";

export default function Home() {
  return (
    <>
      <WallaperSwiper />
      <main className="space-y-12 md:space-y-16 mx-4 md:mx-[90px] px-4 py-8 md:py-12">
      <CategoriesSwiper />
      <PopularDishes/>
      <Advantages/>
      <RecommendedDishes/>
      </main>
    </>
  );
}