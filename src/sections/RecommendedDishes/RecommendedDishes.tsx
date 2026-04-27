import { Suspense } from "react";
import { DishCard } from "@/components/ui/DishCard";
import { DishCardGridSkeleton } from "@/components/ui/DishCardSkeleton";
import { Reveal } from "./Reveal";
import { getRecommendedProducts } from "@/services/prismic/queries/products";

async function RecommendedDishesContent() {
  const recommendedProducts = await getRecommendedProducts(4);

  if (recommendedProducts.length === 0) {
    return <p className="py-8 text-gray-500 text-center">Рекомендации скоро появятся</p>;
  }

  return (
    <div className="justify-between gap-[4px] grid grid-cols-[repeat(auto-fill,330px)] xs:grid-cols-2 xs:gap-2.5">
      {recommendedProducts.map((product) => (
          <Reveal key={product.id}>
            <DishCard price={product.price} product={product} variant="grid" />
          </Reveal>
      ))}
    </div>
  );
}

function RecommendedDishesSkeleton() {
  return (
    <ul className="justify-between gap-[4px] grid grid-cols-[repeat(auto-fill,330px)]">
      {Array.from({ length: 4 }).map((_, i) => (
        <li key={i}>
          <DishCardGridSkeleton />
        </li>
      ))}
    </ul>
  );
}

export const RecommendedDishes = () => {
  return (
    <section className="mb-[64px] xs:mb-[32px]" aria-labelledby="recommended-dishes-title">
      <h2
        id="recommended-dishes-title"
        className="font-bold text-gray-900 text-xl sm:text-2xl lg:text-3xl mb-8 sm:mb-10 lg:mb-7"
      >
        Рекомендуем попробовать
      </h2>

      <Suspense fallback={<RecommendedDishesSkeleton />}>
        <RecommendedDishesContent />
      </Suspense>
    </section>
  );
};
