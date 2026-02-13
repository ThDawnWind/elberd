import { CheckCircle, Clock, Shield, Truck, Wallet, Star, Award, Heart } from "lucide-react";

const advantages = [
  {
    id: 1,
    icon: <Truck className="w-6 sm:w-7 lg:w-8 h-6 sm:h-7 lg:h-8" />,
    title: "Быстрая доставка",
    description: "Доставим ваш заказ за 60 минут в любую точку города",
  },
  {
    id: 2,
    icon: <Wallet className="w-6 sm:w-7 lg:w-8 h-6 sm:h-7 lg:h-8" />,
    title: "Доступные цены",
    description: "Качественные блюда по честным ценам без наценок",
  },
  {
    id: 3,
    icon: <Award className="w-6 sm:w-7 lg:w-8 h-6 sm:h-7 lg:h-8" />,
    title: "Высшее качество",
    description: "Только свежие продукты и профессиональные повара",
  },
  {
    id: 4,
    icon: <Shield className="w-6 sm:w-7 lg:w-8 h-6 sm:h-7 lg:h-8" />,
    title: "Безопасность",
    description: "Соблюдаем все санитарные нормы и стандарты качества",
  },
  {
    id: 5,
    icon: <Clock className="w-6 sm:w-7 lg:w-8 h-6 sm:h-7 lg:h-8" />,
    title: "Круглосуточно",
    description: "Работаем 24/7 - заказывайте в любое время дня и ночи",
  },
  {
    id: 6,
    icon: <CheckCircle className="w-6 sm:w-7 lg:w-8 h-6 sm:h-7 lg:h-8" />,
    title: "Гарантия свежести",
    description: "Все блюда готовятся сразу после оформления заказа",
  },
  {
    id: 7,
    icon: <Star className="w-6 sm:w-7 lg:w-8 h-6 sm:h-7 lg:h-8" />,
    title: "Только лучшее",
    description: "Отбираем лучшие ингредиенты для наших рецептов",
  },
  {
    id: 8,
    icon: <Heart className="w-6 sm:w-7 lg:w-8 h-6 sm:h-7 lg:h-8" />,
    title: "С любовью",
    description: "Каждое блюдо готовим с душой и вниманием к деталям",
  },
];

export const Advantages = () => {
  return (
    <section className="bg-gradient-to-b from-white to-berd-primary/5 px-4 sm:px-6 lg:px-8 py-12 sm:py-14 lg:py-16 font-sans">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 sm:mb-10 lg:mb-12 text-center">
          <h2 className="mb-3 sm:mb-4 font-sans font-bold text-gray-900 text-2xl sm:text-3xl lg:text-4xl">
            Почему выбирают именно нас?
          </h2>
          <p className="mx-auto max-w-3xl font-sans text-gray-600 text-sm sm:text-base lg:text-lg">
            Мы создали сервис доставки, который станет вашим любимым. 
            Вот несколько причин довериться нам
          </p>
        </div>

    <div className="gap-4 sm:gap-5 lg:gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
  {advantages.map((advantage) => (
    <div
      key={advantage.id}
      className="group relative flex flex-col items-center bg-white hover:shadow-xl p-4 sm:p-5 lg:p-6 border border-gray-100 hover:border-berd-primary/30 rounded-xl sm:rounded-2xl text-center transition-all sm:hover:-translate-y-2 hover:-translate-y-1 duration-300"
    >
      <div className="top-0 left-0 absolute bg-gradient-to-r from-berd-primary/80 to-berd-primary opacity-0 group-hover:opacity-100 rounded-t-xl sm:rounded-t-2xl w-full h-1 transition-opacity duration-300" />
      
      <div className="flex justify-center items-center bg-gradient-to-br from-berd-primary/10 group-hover:from-berd-primary/20 to-berd-primary/5 group-hover:to-berd-primary/10 mb-4 sm:mb-5 lg:mb-6 rounded-lg sm:rounded-xl w-12 sm:w-14 lg:w-16 h-12 sm:h-14 lg:h-16 transition-all duration-300">
        <div className="text-berd-primary group-hover:text-berd-primary/90 transition-colors">
          {advantage.icon}
        </div>
      </div>

      <h3 className="mb-2 sm:mb-3 font-sans font-bold text-gray-900 group-hover:text-berd-primary text-base sm:text-lg lg:text-xl transition-colors">
        {advantage.title}
      </h3>

      <p className="font-sans text-gray-500 text-xs sm:text-sm lg:text-base leading-relaxed">
        {advantage.description}
      </p>

      <div className="right-3 sm:right-4 bottom-3 sm:bottom-4 absolute opacity-0 group-hover:opacity-5 transition-opacity duration-500">
        <div className="text-berd-primary/30">
          {advantage.icon}
        </div>
      </div>
    </div>
  ))}
</div>

        <div className="mt-10 sm:mt-12 lg:mt-14 text-center">
          <div className="inline-flex flex-wrap justify-center items-center gap-4 sm:gap-5 lg:gap-6 bg-white/80 backdrop-blur-sm px-4 sm:px-5 lg:px-6 py-3 sm:py-4 border border-gray-200 rounded-xl sm:rounded-2xl">
            <div className="text-center">
              <div className="font-sans font-bold text-berd-primary text-xl sm:text-2xl lg:text-3xl">60+</div>
              <div className="font-sans text-gray-600 text-xs sm:text-sm lg:text-base">минут доставка</div>
            </div>
            <div className="bg-gray-200 w-px h-6 sm:h-8" />
            <div className="text-center">
              <div className="font-sans font-bold text-berd-primary text-xl sm:text-2xl lg:text-3xl">1000+</div>
              <div className="font-sans text-gray-600 text-xs sm:text-sm lg:text-base">довольных клиентов</div>
            </div>
            <div className="bg-gray-200 w-px h-6 sm:h-8" />
            <div className="text-center">
              <div className="font-sans font-bold text-berd-primary text-xl sm:text-2xl lg:text-3xl">100+</div>
              <div className="font-sans text-gray-600 text-xs sm:text-sm lg:text-base">позиций в меню</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};