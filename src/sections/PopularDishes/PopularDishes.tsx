import { DishCard } from "@/components/ui/DishCard";
import { Reveal } from "./Reveal";
import { getPopularProducts } from "@/services/prismic/queries/products";

export const PopularDishes = async () => {
  const popularProducts = await getPopularProducts(5);
  
  return (
    <section
      className="mb-[64px] xs:mb-[32px] px-4 sm:px-6 lg:px-8"
      aria-labelledby="popular-dishes-title"
    >
      <header className="mb-8 sm:mb-10 lg:mb-12">
        <h2
          id="popular-dishes-title"
          className="font-bold text-gray-900 text-xl sm:text-2xl lg:text-3xl"
        >
          Популярные блюда
        </h2>
      </header>

<ul className="justify-center gap-[4px] grid grid-cols-[repeat(auto-fill,265px)]">
        {popularProducts.map((product) => (
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
  //  {loading 
  //       ? Array.from({ length: 5 }).map((_, i) => (
  //       <li key={i}>
  //         <DishCardGridSkeleton />
  //       </li>
  //     )) :