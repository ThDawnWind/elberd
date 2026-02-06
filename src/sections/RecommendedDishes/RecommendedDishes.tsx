import { DishCard } from "@/components/ui/DishCard";

const recommendedDishes = [
  {
    id: 1,
    name: "Пельмени",
    weight: "300г",
    price: 280,
    image: "/images/dishes/shashlik.jpg",
    description: "...",
    category: "...",
  },
  {
    id: 2,
    name: "Хинкали с мясом",
    weight: "450г",
    price: 270,
    image: "/images/dishes/lagman.jpg",
    description: "...",
    category: "...",
  },
  {
    id: 3,
    name: "Малиновое варенье",
    weight: "320г",
    price: 240,
    image: "/images/dishes/manty.jpg",
    description: "...",
    category: "...",
  },
  {
    id: 4,
    name: "Пирожки с капустой",   
    weight: "280г",
    price: 210,
    image: "/images/dishes/greek-salad.jpg",
    description: "...",
    category: "...",
  },
  {
    id: 5,
    name: "Мини чебуреки",
    weight: "400г",
    price: 450,
    image: "/images/dishes/steak.jpg",
    description: "...",
    category: "...",
  },
];

export const RecommendedDishes = () => {
  return (
    <section className="mt-8 px-4 sm:px-6 lg:px-8">
      <div className="mb-10 sm:mb-12">
        <h2 className="font-sans font-bold text-gray-900 text-2xl sm:text-3xl lg:text-4xl">
          Рекомендуем попробовать
        </h2>
        <p className="mt-2 font-sans text-gray-500 text-sm sm:text-base">
          Особенные блюда от нашего шеф-повара — лучший выбор для гурманов
        </p>
      </div>

      <div className="gap-2 sm:gap-4 lg:gap-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {recommendedDishes.map((dish) => (
          <DishCard key={dish.id} dish={dish} />
        ))}
      </div>
    </section>
  );
};