"use client"

import { motion } from "motion/react"
import { CheckCircle, Clock, Shield, Truck, Wallet, Star, Award, Heart } from "lucide-react"

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
]

export const Advantages = () => {
  return (
    <section className="bg-gradient-to-b from-white to-berd-primary/5 px-4 sm:px-6 lg:px-8 py-12 sm:py-14 lg:py-16 font-sans">
      <div className="mx-auto max-w-7xl">

        <div className="mb-8 sm:mb-10 lg:mb-12 text-center">
          <h2 className="mb-3 sm:mb-4 font-bold text-gray-900 text-2xl sm:text-3xl lg:text-4xl">
            Почему выбирают именно нас?
          </h2>
          <p className="mx-auto max-w-3xl text-gray-600 text-sm sm:text-base lg:text-lg">
            Мы создали сервис доставки, который станет вашим любимым.
          </p>
        </div>

        <motion.div
          className="gap-4 sm:gap-5 lg:gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: {},
            show: {
              transition: { staggerChildren: 0.07 }
            }
          }}
        >
          {advantages.map((advantage) => (
            <motion.div
              key={advantage.id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0 }
              }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="group relative flex flex-col items-center bg-white hover:shadow-xl p-4 sm:p-5 lg:p-6 border border-gray-100 hover:border-berd-primary/30 rounded-xl sm:rounded-2xl text-center transition-all sm:hover:-translate-y-2 hover:-translate-y-1 duration-300"
            >
              <div className="flex justify-center items-center bg-berd-primary/10 mb-5 rounded-xl w-14 h-14">
                <div className="text-berd-primary">
                  {advantage.icon}
                </div>
              </div>

              <h3 className="mb-2 font-bold text-gray-900 group-hover:text-berd-primary text-base sm:text-lg transition-colors">
                {advantage.title}
              </h3>

              <p className="text-gray-500 text-sm leading-relaxed">
                {advantage.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}