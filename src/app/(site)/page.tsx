import { Advantages } from "@/sections/Advantages";
import { CategoriesSwiper } from "@/sections/CategoriesSwiper";
import { PopularDishes } from "@/sections/PopularDishes";
import { RecommendedDishes } from "@/sections/RecommendedDishes";
import { WallaperSwiper } from "@/sections/Swiper";

export default function Home() {
  return (
    <>
      <WallaperSwiper />

      <div className="mx-auto px-4 max-w-[1440px]">
        <CategoriesSwiper />
        <PopularDishes />
        <Advantages />
        <RecommendedDishes />
      </div>
    </>
  );
}