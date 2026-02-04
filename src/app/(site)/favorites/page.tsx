"use client";

import { useState } from "react";
import { DishCard } from "@/components/ui/DishCard";
import { 
  Heart, 
  ShoppingBag,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

const favoriteDishes = [
  {
    id: 1,
    name: "Хингалш с мясом",
    weight: "350г",
    price: 250,
    image: "/images/dishes/hingalsh.jpg",
    isNew: true,
    description: "Традиционное чеченское блюдо с сочной говядиной",
    category: "Чеченская кухня",
  },
  {
    id: 2,
    name: "Жижиг-галнаш",
    weight: "420г",
    price: 320,
    image: "/images/dishes/jizhig.jpg",
    description: "Мясо с галушками по-чеченски",
    category: "Чеченская кухня",
  },
  {
    id: 3,
    name: "Шашлык из баранины",
    weight: "300г",
    price: 280,
    image: "/images/dishes/shashlik.jpg",
    isNew: true,
    description: "Нежный шашлык на мангале с ароматными травами",
    category: "Гриль",
  },
  {
    id: 4,
    name: "Лагман домашний",
    weight: "450г",
    price: 270,
    image: "/images/dishes/lagman.jpg",
    description: "Традиционная узбекская лапша с овощами и мясом",
    category: "Узбекская кухня",
  },
  {
    id: 5,
    name: "Пицца Маргарита",
    weight: "550г",
    price: 299,
    image: "/images/dishes/pizza.jpg",
    description: "Классическая итальянская пицца",
    category: "Итальянская кухня",
  },
  {
    id: 6,
    name: "Стейк Рибай",
    weight: "400г",
    price: 450,
    image: "/images/dishes/steak.jpg",
    isNew: true,
    description: "Премиальный стейк средней прожарки с розмарином",
    category: "Европейская кухня",
  },
  {
    id: 7,
    name: "Чизкейк Нью-Йорк",
    weight: "180г",
    price: 170,
    image: "/images/dishes/cheesecake.jpg",
    description: "Нежный десерт на песочном основании с ягодным соусом",
    category: "Десерты",
  },
  {
    id: 8,
    name: "Бургер Классик",
    weight: "320г",
    price: 220,
    image: "/images/dishes/burger.jpg",
    description: "Сочная говяжья котлета с овощами",
    category: "Американская кухня",
  },
  {
    id: 9,
    name: "Манты с говядиной",
    weight: "320г",
    price: 240,
    image: "/images/dishes/manty.jpg",
    description: "Парные пельмени с сочной начинкой и специями",
    category: "Центральноазиатская",
  },
  {
    id: 10,
    name: "Греческий салат",
    weight: "280г",
    price: 210,
    image: "/images/dishes/greek-salad.jpg",
    description: "Свежие овощи, фета, оливки и оливковое масло",
    category: "Средиземноморская",
  },
  {
    id: 11,
    name: "Суп Харчо",
    weight: "400г",
    price: 190,
    image: "/images/dishes/harcho.jpg",
    isNew: true,
    description: "Острый грузинский суп с говядиной и рисом",
    category: "Грузинская кухня",
  },
  {
    id: 12,
    name: "Чахохбили",
    weight: "350г",
    price: 260,
    image: "/images/dishes/chahohbili.jpg",
    description: "Грузинское рагу из курицы с томатами и специями",
    category: "Грузинская кухня",
  },
  {
    id: 13,
    name: "Цыпленок табака",
    weight: "500г",
    price: 380,
    image: "/images/dishes/tabaka.jpg",
    description: "Цыпленок, жаренный под прессом с чесноком",
    category: "Грузинская кухня",
  },
  {
    id: 14,
    name: "Шурпа",
    weight: "450г",
    price: 230,
    image: "/images/dishes/shurpa.jpg",
    description: "Наваристый суп из баранины с овощами",
    category: "Узбекская кухня",
  },
  {
    id: 15,
    name: "Плов узбекский",
    weight: "400г",
    price: 290,
    image: "/images/dishes/plov.jpg",
    isNew: true,
    description: "Традиционный плов с бараниной и морковью",
    category: "Узбекская кухня",
  },
  {
    id: 16,
    name: "Самса с мясом",
    weight: "180г",
    price: 120,
    image: "/images/dishes/samsa.jpg",
    description: "Слоеные пирожки с сочной мясной начинкой",
    category: "Узбекская кухня",
  },
  {
    id: 17,
    name: "Пицца Пепперони",
    weight: "600г",
    price: 350,
    image: "/images/dishes/pepperoni.jpg",
    description: "Острая пицца с колбасой пепперони и сыром",
    category: "Итальянская кухня",
  },
  {
    id: 18,
    name: "Паста Карбонара",
    weight: "350г",
    price: 270,
    image: "/images/dishes/carbonara.jpg",
    description: "Спагетти с беконом, яйцом и пармезаном",
    category: "Итальянская кухня",
  },
  {
    id: 19,
    name: "Лазанья Болоньезе",
    weight: "400г",
    price: 320,
    image: "/images/dishes/lasagna.jpg",
    isNew: true,
    description: "Слоеная паста с мясным соусом и сыром",
    category: "Итальянская кухня",
  },
]

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState(favoriteDishes);

  const clearAllFavorites = () => {
    setFavorites([]);
  };

  return (
    <div className="bg-white w-full min-h-screen">
      <div className="mx-auto px-4 md:px-[90px] py-6 sm:py-8 w-full">
        <div className="mb-8 sm:mb-10">
          <div className="flex sm:flex-row flex-col justify-between items-start sm:items-center gap-4 mb-6">
            <div className="flex-1 min-w-0">
              <h1 className="mb-2 font-sans font-bold text-gray-900 md:text-2.3xl text-xl sm:text-2xl lg:text-4xl leading-tight">
                Избранные товары
              </h1>

              <p className="max-w-3xl font-sans text-gray-600 md:text-1.2xl text-sm sm:text-base lg:text-xl leading-relaxed">
                Ваши любимые блюда всегда под рукой
              </p>
            </div>
            
       <div className="flex flex-shrink-0 items-center gap-2 sm:gap-3">
        <Badge className="bg-berd-primary px-3 sm:px-4 py-1.5 sm:py-2 font-sans text-white text-xs sm:text-sm whitespace-nowrap">
            {favorites.length} товаров
        </Badge>
        
        {favorites.length > 0 && (
            <Button
            variant="outline"
            size="sm"
            onClick={clearAllFavorites}
            className="hover:bg-red-50 px-2 sm:px-3 border-red-200 h-8 sm:h-9 font-sans text-red-600 hover:text-red-700 whitespace-nowrap"
            >
            <Trash2 className="mr-1 sm:mr-2 w-3 sm:w-4 h-3 sm:h-4" />
            <span className="text-xs sm:text-sm">Очистить все</span>
            </Button>
        )}
        </div>
          </div>
          
          <div className="bg-gray-200 w-full h-px"></div>
        </div>

        {favorites.length === 0 ? (
          <div className="py-12 sm:py-20 text-center">
            <div className="flex justify-center items-center bg-gray-100 mx-auto mb-6 rounded-full w-20 h-20">
              <Heart className="w-10 h-10 text-gray-300" />
            </div>
            <h3 className="mb-3 font-sans font-bold text-gray-900 text-xl sm:text-2xl">
              В избранном пока ничего нет
            </h3>
            <p className="mx-auto mb-8 max-w-md font-sans text-gray-600 text-sm sm:text-base">
              Добавляйте понравившиеся товары в избранное, 
              нажимая на сердечко в карточке товара
            </p>
            <Button
              asChild
              className="bg-berd-primary hover:bg-berd-primary/90 px-6 py-3 font-sans text-base"
            >
              <Link href="/catalog">
                <ShoppingBag className="mr-2 w-5 h-5" />
                Перейти в каталог
              </Link>
            </Button>
          </div>
        ) : (
          <div className="w-full">
             <div className="justify-items-center gap-4 md:gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
              {favorites.map(dish => (
                <div 
                  key={dish.id} 
                  className="relative"
                >
                  <DishCard dish={dish} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
