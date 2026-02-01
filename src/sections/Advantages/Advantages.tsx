import { CheckCircle, Clock, Shield, Truck, Wallet, Star, Award, Heart } from "lucide-react";

const advantages = [
  {
    id: 1,
    icon: <Truck className="w-8 h-8" />,
    title: "Быстрая доставка",
    description: "Доставим ваш заказ за 30-60 минут в любую точку города",
  },
  {
    id: 2,
    icon: <Wallet className="w-8 h-8" />,
    title: "Доступные цены",
    description: "Качественные блюда по честным ценам без наценок",
  },
  {
    id: 3,
    icon: <Award className="w-8 h-8" />,
    title: "Высшее качество",
    description: "Только свежие продукты и профессиональные повара",
  },
  {
    id: 4,
    icon: <Shield className="w-8 h-8" />,
    title: "Безопасность",
    description: "Соблюдаем все санитарные нормы и стандарты качества",
  },
  {
    id: 5,
    icon: <Clock className="w-8 h-8" />,
    title: "Круглосуточно",
    description: "Работаем 24/7 - заказывайте в любое время дня и ночи",
  },
  {
    id: 6,
    icon: <CheckCircle className="w-8 h-8" />,
    title: "Гарантия свежести",
    description: "Все блюда готовятся сразу после оформления заказа",
  },
  {
    id: 7,
    icon: <Star className="w-8 h-8" />,
    title: "Только лучшее",
    description: "Отбираем лучшие ингредиенты для наших рецептов",
  },
  {
    id: 8,
    icon: <Heart className="w-8 h-8" />,
    title: "С любовью",
    description: "Каждое блюдо готовим с душой и вниманием к деталям",
  },
];

export const Advantages = () => {
  return (
    <section className="bg-gradient-to-b from-white to-berd-primary/5 px-4 sm:px-6 lg:px-8 py-16 font-sans">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 sm:mb-16 text-center">
          <h2 className="mb-4 font-sans font-bold text-gray-900 text-3xl sm:text-4xl lg:text-5xl">
            Почему выбирают именно нас?
          </h2>
          <p className="mx-auto max-w-3xl font-sans text-gray-600 text-lg sm:text-xl">
            Мы создали сервис доставки, который станет вашим любимым. 
            Вот несколько причин довериться нам
          </p>
        </div>

        <div className="gap-6 sm:gap-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {advantages.map((advantage) => (
            <div
              key={advantage.id}
              className="group relative bg-white hover:shadow-xl p-6 sm:p-8 border border-gray-100 hover:border-berd-primary/30 rounded-2xl transition-all hover:-translate-y-2 duration-300"
            >
              <div className="top-0 left-0 absolute bg-gradient-to-r from-berd-primary/80 to-berd-primary opacity-0 group-hover:opacity-100 rounded-t-2xl w-full h-1 transition-opacity duration-300" />
              
              <div className="flex justify-center items-center bg-gradient-to-br from-berd-primary/10 group-hover:from-berd-primary/20 to-berd-primary/5 group-hover:to-berd-primary/10 mb-6 rounded-xl w-16 h-16 transition-all duration-300">
                <div className="text-berd-primary group-hover:text-berd-primary/90 transition-colors">
                  {advantage.icon}
                </div>
              </div>

              <h3 className="mb-3 font-sans font-bold text-gray-900 group-hover:text-berd-primary text-xl transition-colors">
                {advantage.title}
              </h3>

              <p className="font-sans text-gray-500 text-sm sm:text-base leading-relaxed">
                {advantage.description}
              </p>

              <div className="right-4 bottom-4 absolute opacity-0 group-hover:opacity-5 transition-opacity duration-500">
                <div className="text-berd-primary/30">
                  {advantage.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 sm:mt-16 text-center">
          <div className="inline-flex flex-wrap justify-center items-center gap-6 sm:gap-8 bg-white/80 backdrop-blur-sm px-6 py-4 border border-gray-200 rounded-2xl">
            <div className="text-center">
              <div className="font-sans font-bold text-berd-primary text-2xl sm:text-3xl">30+</div>
              <div className="font-sans text-gray-600 text-sm sm:text-base">минут доставка</div>
            </div>
            <div className="bg-gray-200 w-px h-8" />
            <div className="text-center">
              <div className="font-sans font-bold text-berd-primary text-2xl sm:text-3xl">1000+</div>
              <div className="font-sans text-gray-600 text-sm sm:text-base">довольных клиентов</div>
            </div>
            <div className="bg-gray-200 w-px h-8" />
            <div className="text-center">
              <div className="font-sans font-bold text-berd-primary text-2xl sm:text-3xl">150+</div>
              <div className="font-sans text-gray-600 text-sm sm:text-base">блюд в меню</div>
            </div>
            <div className="bg-gray-200 w-px h-8" />
          </div>
        </div>
      </div>
    </section>
  );
};