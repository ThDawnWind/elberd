import { DishCard } from "@/components/ui/DishCard";
import { Reveal } from "./Reveal";
import { getRecommendedProducts } from "@/services/prismic/queries/products";

export const RecommendedDishes = async () => {
  const recommendedProducts = await getRecommendedProducts(5);

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

      <ul className="justify-center gap-[4px] grid grid-cols-[repeat(auto-fill,265px)]">
        {recommendedProducts.map((product) => (
          <li key={product.id}>
            <Reveal>
              <DishCard
                price={product.price}
                product={product}
                variant="grid"
              />
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
};