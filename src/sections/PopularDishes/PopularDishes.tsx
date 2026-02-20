import { DishCard } from "@/components/ui/DishCard";
import { popProducts } from "@/lib/products";

export const PopularDishes = () => {
  return (
    <section className="mt-8 px-4 sm:px-6 lg:px-8">
      <div className="mb-8 sm:mb-10 lg:mb-12">
        <h2 className="font-sans font-bold text-gray-900 text-xl sm:text-2xl lg:text-3xl">
          Популярные блюда
        </h2>
        <p className="mt-2 font-sans text-gray-500 text-xs sm:text-sm lg:text-base">
          Самые любимые блюда наших гостей — проверенный выбор для идеального ужина
        </p>
      </div>

      <div className="gap-2 sm:gap-3 lg:gap-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {popProducts.map((product) => (
          <DishCard key={product.id} price={product.price} product={product} variant="grid" />
        ))}
      </div>
    </section>
  );
};