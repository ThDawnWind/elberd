import { Advantages } from "@/sections/Advantages";
import { CategoriesSwiper } from "@/sections/CategoriesSwiper";
import { CategoriesGrid } from "@/sections/CategoriesSwiper/CategoriesGrid";
import { PopularDishes } from "@/sections/PopularDishes";
import { RecommendedDishes } from "@/sections/RecommendedDishes";
import { WallaperSwiper } from "@/sections/Swiper";

export default function Home() {
  return (
    <>
      <WallaperSwiper />

      <div className="mx-auto px-4 max-w-[1440px]">
        <div className="hidden md:block">
          <CategoriesSwiper />
        </div>
        <div className="block md:hidden">
          <CategoriesGrid />
        </div>
        <PopularDishes />
        <Advantages />
        <RecommendedDishes />
      </div>
    </>
  );
}
