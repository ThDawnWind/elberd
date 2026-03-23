import { Suspense } from "react";
import { DishCard } from "@/components/ui/DishCard";
import { DishCardGridSkeleton } from "@/components/ui/DishCardSkeleton";
import { Reveal } from "./Reveal";
import { getRecommendedProducts } from "@/services/prismic/queries/products";

async function RecommendedDishesContent() {
  const recommendedProducts = await getRecommendedProducts(5);

  if (recommendedProducts.length === 0) {
    return (
      <p className="py-8 text-gray-500 text-center">
        Рекомендации скоро появятся
      </p>
    );
  }

  return (
    <ul className="justify-center gap-[4px] grid grid-cols-[repeat(auto-fill,265px)]">
      {recommendedProducts.map((product) => (
        <li key={product.id}>
          <Reveal>
            <DishCard price={product.price} product={product} variant="grid" />
          </Reveal>
        </li>
      ))}
    </ul>
  );
}

function RecommendedDishesSkeleton() {
  return (
    <ul className="justify-center gap-[4px] grid grid-cols-[repeat(auto-fill,265px)]">
      {Array.from({ length: 5 }).map((_, i) => (
        <li key={i}>
          <DishCardGridSkeleton />
        </li>
      ))}
    </ul>
  );
}

export const RecommendedDishes = () => {
  return (
    <section
      className="mb-[64px] xs:mb-[32px] px-4 sm:px-6 lg:px-8"
      aria-labelledby="recommended-dishes-title"
    >
      <header className="mb-8 sm:mb-10 lg:mb-12">
        <h2
          id="recommended-dishes-title"
          className="font-bold text-gray-900 text-xl sm:text-2xl lg:text-3xl"
        >
          Рекомендуем попробовать
        </h2>
      </header>

      <Suspense fallback={<RecommendedDishesSkeleton />}>
        <RecommendedDishesContent />
      </Suspense>
    </section>
  );
};