import { DishCard } from "@/components/ui/DishCard";

const popularDishes = [
  {
    id: 1,
    name: "Манты",
    weight: "350г",
    price: 250,
    image: "/images/dishes/hingalsh.jpg",
    description: "...",
    category: "...",
  },
  {
    id: 2,
    name: "Чебуреки (готовые)",
    weight: "420г",
    price: 320,
    image: "/images/dishes/jizhig.jpg",
    description: "...",
    category: "...",
  },
  {
    id: 3,
    name: "Вареники с творогом",
    weight: "280г",
    price: 180,
    image: "/images/dishes/chepalgash.jpg",
    description: "",
    category: "",
  },
  {
    id: 4,
    name: "Катлеты по киевски",
    weight: "550г",
    price: 299,
    image: "/images/dishes/pizza.jpg",
    description: "...",
    category: "...",
  },
  {
    id: 5,
    name: "Голубцы",
    weight: "320г",
    price: 220,
    image: "/images/dishes/burger.jpg",
    description: "...",
    category: "...",
  }
];

export const PopularDishes = () => {
  return (
    <section className="mt-8 px-4 sm:px-6 lg:px-8">
      <div className="mb-10 sm:mb-12">
        <h2 className="font-sans font-bold text-gray-900 text-2xl sm:text-3xl lg:text-4xl">
          Популярные блюда
        </h2>
        <p className="mt-2 font-sans text-gray-500 text-sm sm:text-base">
          Самые любимые блюда наших гостей — проверенный выбор для идеального ужина
        </p>
      </div>

      <div className="gap-2 sm:gap-4 lg:gap-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {popularDishes.map((dish) => (
          <DishCard key={dish.id} dish={dish} />
        ))}
      </div>
    </section>
  );
};