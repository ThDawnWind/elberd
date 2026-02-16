import { Advantages } from "@/sections/Advantages";
import { CategoriesSwiper } from "@/sections/CategoriesSwiper";
import { PopularDishes } from "@/sections/PopularDishes";
import { RecommendedDishes } from "@/sections/RecommendedDishes";
import { WallaperSwiper } from "@/sections/Swiper";

export default function Home() {
  return (
    <>
      <WallaperSwiper />

      <CategoriesSwiper />
      <PopularDishes />
      <Advantages />
      <RecommendedDishes />
    </>
  );
}