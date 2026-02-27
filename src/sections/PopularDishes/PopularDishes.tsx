import { DishCard } from "@/components/ui/DishCard";
import { popularProducts } from "@/lib/products";
import { Reveal } from "./Reveal";

export const PopularDishes = () => {
  return (
    <section
      className="mt-8 px-4 sm:px-6 lg:px-8"
      aria-labelledby="popular-dishes-title"
    >
      <header className="mb-8 sm:mb-10 lg:mb-12">
        <h2
          id="popular-dishes-title"
          className="font-mono font-bold text-gray-900 text-xl sm:text-2xl lg:text-3xl"
        >
          Популярные блюда
        </h2>
        <p className="mt-2 font-mono text-gray-500 text-xs sm:text-sm lg:text-base">
          Самые любимые блюда наших гостей — проверенный выбор для идеального ужина
        </p>
      </header>

      <ul className="gap-2 sm:gap-3 lg:gap-4 grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {popularProducts.map((product) => (
          <li key={product.id}>
            <Reveal>
              <DishCard price={product.price} product={product} variant="grid" />
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
};