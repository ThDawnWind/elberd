import {
  Truck,
  Wallet,
  Award,
  Shield,
  Clock,
  CheckCircle,
  Star,
  Heart,
} from "lucide-react";
import { AdvantageReveal } from "./AdvantagesReaveal";

const advantages = [
  { id: 1, Icon: Truck, title: "Быстрая доставка", description: "Доставим ваш заказ за 60 минут в любую точку города" },
  { id: 2, Icon: Wallet, title: "Доступные цены", description: "Качественные блюда по честным ценам без наценок" },
  { id: 3, Icon: Award, title: "Высшее качество", description: "Только свежие продукты и профессиональные повара" },
  { id: 4, Icon: Shield, title: "Безопасность", description: "Соблюдаем все санитарные нормы и стандарты качества" },
  { id: 5, Icon: Clock, title: "Круглосуточно", description: "Работаем 24/7 — заказывайте в любое время дня и ночи" },
  { id: 6, Icon: CheckCircle, title: "Гарантия свежести", description: "Все блюда готовятся сразу после оформления заказа" },
  { id: 7, Icon: Star, title: "Только лучшее", description: "Отбираем лучшие ингредиенты для наших рецептов" },
  { id: 8, Icon: Heart, title: "С любовью", description: "Каждое блюдо готовим с душой и вниманием к деталям" },
];

export const Advantages = () => {
  return (
    <section
      className="bg-gradient-to-b from-white to-berd-primary/5 mb-[64px] xs:mb-[32px] px-4 sm:px-6 lg:px-8 py-12 sm:py-14 lg:py-16 font-sans"
      aria-labelledby="advantages-title"
    >
      <div className="mx-auto max-w-7xl">
        <header className="mb-8 sm:mb-10 lg:mb-12 text-center">
          <h2
            id="advantages-title"
            className="mb-3 sm:mb-4 font-mono font-bold text-gray-900 text-2xl sm:text-3xl lg:text-4xl"
          >
            Почему выбирают именно нас?
          </h2>
          <p className="mx-auto max-w-3xl font-sans font-normal text-gray-600 text-sm sm:text-base lg:text-lg">
            Мы создали сервис доставки, который станет вашим любимым.
          </p>
        </header>

        <ul className="gap-4 sm:gap-5 lg:gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {advantages.map((item, index) => (
            <li key={item.id}>
              <AdvantageReveal delay={index * 0.08}>
                <div className="group relative flex flex-col items-center bg-white hover:shadow-xl p-4 sm:p-5 lg:p-6 border border-gray-100 hover:border-berd-primary/30 rounded-xl sm:rounded-2xl text-center transition-all sm:hover:-translate-y-2 hover:-translate-y-1 duration-300">
                  <div className="flex justify-center items-center bg-berd-primary/10 mb-5 rounded-xl w-14 h-14">
                    <item.Icon
                      className="w-6 sm:w-7 lg:w-8 h-6 sm:h-7 lg:h-8 text-berd-primary"
                      aria-hidden="true"
                    />
                  </div>

                  <h3 className="mb-2 font-sans font-bold text-gray-900 group-hover:text-berd-primary text-base sm:text-lg transition-colors">
                    {item.title}
                  </h3>

                  <p className="font-mono text-gray-500 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </AdvantageReveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};