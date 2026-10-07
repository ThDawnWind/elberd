import type { Metadata } from "next";
import { Advantages } from "@/sections/Advantages";
import { CategoriesSwiper } from "@/sections/CategoriesSwiper";
import { CategoriesGrid } from "@/sections/CategoriesSwiper/CategoriesGrid";
import { PopularDishes } from "@/sections/PopularDishes";
import { RecommendedDishes } from "@/sections/RecommendedDishes";
import { WallaperSwiper } from "@/sections/Swiper";

export const metadata: Metadata = {
  title: "Доставка готовых блюд и продуктов в Грозном",
  description:
    "EL’BERD — готовые блюда, полуфабрикаты и продукты с доставкой и самовывозом в Грозном. Выбирайте товары в каталоге и оформляйте заказ.",
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  return (
    <>
      <WallaperSwiper />

      <section className="mx-auto px-4 py-8 max-w-[1440px]">
        <h1 className="font-bold text-gray-900 text-2xl sm:text-3xl lg:text-4xl">
          EL’BERD — готовые блюда и продукты в Грозном
        </h1>
      </section>

      <div className="mx-auto px-4 max-w-[1440px]">
        <div className="hidden md:block">
          <CategoriesSwiper />
        </div>
        <div className="md:hidden block">
          <CategoriesGrid />
        </div>
        <PopularDishes />
        <Advantages />
        <RecommendedDishes />
      </div>
    </>
  );
}
