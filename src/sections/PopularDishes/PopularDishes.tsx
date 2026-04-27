import { Suspense, use } from "react";
import { DishCardGridSkeleton } from "@/components/ui/DishCardSkeleton";
import { DishCard } from "@/components/ui/DishCard";
import { Reveal } from "./Reveal";
import { getPopularProducts } from "@/services/prismic/queries/products";
import { Product } from "@/types/product";

const popularProductsPromise = getPopularProducts(4);

function PopularDishesContent() {
  const popularProducts = use(popularProductsPromise);

  if (popularProducts.length === 0) {
    return <p className="py-8 text-gray-500 text-center">Популярные блюда скоро появятся</p>;
  }

  return (
    <div className="justify-between gap-[4px] grid grid-cols-[repeat(auto-fill,330px)] xs:grid-cols-2 xs:gap-2.5">
      {popularProducts.map((product: Product) => (
          <Reveal key={product.id}> 
            <DishCard price={product.price} product={product} variant="grid" />
          </Reveal>
      ))}
    </div>
  );
}

function PopularDishesSkeleton() {
  return (
    <ul className="justify-between gap-[4px] grid grid-cols-[repeat(auto-fill,265px)]">
      {Array.from({ length: 4 }).map((_, i) => (
        <li key={i}>
          <DishCardGridSkeleton />
        </li>
      ))}
    </ul>
  );
}

export const PopularDishes = () => {
  return (
    <section className="mb-[64px] xs:mb-[32px]" aria-labelledby="popular-dishes-title">
      <h2 id="popular-dishes-title" className="font-bold text-gray-900 text-xl sm:text-2xl lg:text-3xl mb-8 sm:mb-10 lg:mb-12">
        Популярные блюда
      </h2>

      <Suspense fallback={<PopularDishesSkeleton />}>
        <PopularDishesContent />
      </Suspense>
    </section>
  );
};
