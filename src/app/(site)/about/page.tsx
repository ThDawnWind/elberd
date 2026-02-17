import { Button } from "@/components/ui/button"
import { 
  Clock, 
  Truck, 
  Phone, 
  MapPin, 
  CheckCircle,
  Package,
  Instagram
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "О нас | EL.BERD - Доставка продуктов в Грозном",
  description: "Производство и продажа продуктов питания с доставкой в Грозном",
};

export default function AboutPage() {
  return (
    <div className="bg-gradient-to-b from-white to-gray-50 min-w-screen">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-berd-primary/10 to-amber-100/30" />
        
        <div className="relative mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 lg:py-16 max-w-7xl">
          <div className="text-center">
            <h1 className="mb-3 sm:mb-4 font-sans font-bold text-berd-primaryq text-2xl sm:text-3xl lg:text-4xl">
              <span className="text-berd-primary">EL&apos;BERD</span>
            </h1>
            <p className="mx-auto max-w-3xl font-sans text-gray-600 text-base sm:text-lg lg:text-xl">
              Производство и продажа продуктов питания с доставкой в Грозном
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 max-w-7xl">
        <div className="gap-6 lg:gap-8 grid lg:grid-cols-2">
          
          <div>
            <div className="mb-4 sm:mb-5">
              <h2 className="mb-3 sm:mb-4 font-sans font-bold text-gray-900 text-xl sm:text-2xl lg:text-3xl">
                О нас
              </h2>
              <div className="space-y-2 sm:space-y-3 font-sans text-gray-600 text-sm sm:text-base">
                <p>
                EL’BERD — семейное дело с историей более 20 лет.
                Всё начиналось с домашних заготовок и варенья, которые готовились по семейным рецептам, но со временем это переросло во что-то большее.
                Название «Эльберд», что в переводе означает «Владыка холмов», отражает суть нашего проекта. Оно напрямую связано с нашими предками, нашей землёй и нашими корнями.
                Через наши блюда мы стремимся передать людям красоту и ценность традиций, которые существуют испокон веков и бережно сохраняются в нашей семье.
                Спасибо, что выбираете нас!
                </p>
              </div>
            </div>

            <div className="bg-white shadow p-4 sm:p-5 lg:p-6 border border-gray-100 rounded-lg sm:rounded-xl">
              <div className="flex items-center gap-2 mb-4 sm:mb-5">
                <div className="flex justify-center items-center bg-gradient-to-br from-berd-primary/10 to-amber-100 rounded-lg w-9 sm:w-10 h-9 sm:h-10">
                  <Clock className="w-4 sm:w-5 h-4 sm:h-5 text-berd-primary" />
                </div>
                <h3 className="font-sans font-bold text-gray-900 text-lg sm:text-xl">
                  Режим работы
                </h3>
              </div>
              
              <div className="space-y-2 sm:space-y-3">
                <div className="flex sm:flex-row flex-col sm:justify-between sm:items-center gap-1.5 bg-gray-50 p-2.5 sm:p-3 rounded-md sm:rounded-lg">
                  <div className="flex items-center gap-2 sm:gap-2.5">
                    <Package className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-berd-primary" />
                    <span className="font-sans font-medium text-gray-700 text-xs sm:text-sm">
                      Самовывоз
                    </span>
                  </div>
                  <span className="font-sans font-bold text-gray-900 text-sm sm:text-base">
                    9:00 - 20:00
                  </span>
                </div>
                
                <div className="flex sm:flex-row flex-col sm:justify-between sm:items-center gap-1.5 bg-gray-50 p-2.5 sm:p-3 rounded-md sm:rounded-lg">
                  <div className="flex items-center gap-2 sm:gap-2.5">
                    <Truck className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-berd-primary" />
                    <span className="font-sans font-medium text-gray-700 text-xs sm:text-sm">
                      Доставка
                    </span>
                  </div>
                  <span className="font-sans font-bold text-gray-900 text-sm sm:text-base">
                    9:00 - 20:00
                  </span>
                </div>
                
                <div className="flex items-center gap-1.5 font-sans font-medium text-green-600 text-xs sm:text-sm">
                  <CheckCircle className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
                  <span>Работаем без выходных</span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4 sm:space-y-5 mt-6 lg:mt-0">
            
            <div className="bg-white shadow p-4 sm:p-5 lg:p-6 border border-gray-100 rounded-lg sm:rounded-xl">
              <div className="flex items-center gap-2 mb-4 sm:mb-5">
                <div className="flex justify-center items-center bg-gradient-to-br from-berd-primary/10 to-amber-100 rounded-lg w-9 sm:w-10 h-9 sm:h-10">
                  <Phone className="w-4 sm:w-5 h-4 sm:h-5 text-berd-primary" />
                </div>
                <h3 className="font-sans font-bold text-gray-900 text-lg sm:text-xl">
                  Контакты
                </h3>
              </div>
              
              <div className="space-y-2 sm:space-y-3">
                <div className="flex items-center gap-2.5">
                  <Phone className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-gray-400" />
                  <div>
                    <div className="font-sans text-gray-500 text-xs">Телефон</div>
                    <a 
                      href="tel:+79380031333" 
                      className="font-sans font-bold text-gray-900 hover:text-berd-primary text-base sm:text-lg transition-colors"
                    >
                      +7 (989) 919-48-71
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-2.5">
                  <MapPin className="mt-0.5 w-3.5 sm:w-4 h-3.5 sm:h-4 text-gray-400" />
                  <div>
                    <div className="font-sans text-gray-500 text-xs">Города доставки</div>
                    <div className="flex flex-wrap gap-1.5 mt-1">
                      <span className="bg-berd-primary/10 px-2 sm:px-2.5 py-0.5 rounded-full font-sans font-medium text-black text-xs">
                        Грозный
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-berd-primary/5 to-amber-50 p-4 sm:p-5 lg:p-6 border border-berd-primary/20 rounded-lg sm:rounded-xl">
              <div className="flex items-center gap-2 mb-4 sm:mb-5">
                <div className="flex justify-center items-center bg-gradient-to-br from-berd-primary to-amber-600 rounded-lg w-9 sm:w-10 h-9 sm:h-10">
                  <Truck className="w-4 sm:w-5 h-4 sm:h-5 text-white" />
                </div>
                <h3 className="font-sans font-bold text-gray-900 text-lg sm:text-xl">
                  Условия доставки
                </h3>
              </div>
              
              <div className="space-y-2 sm:space-y-3">
                <div className="bg-white p-2.5 sm:p-3 border border-gray-200 rounded-md sm:rounded-lg">
                  <div className="flex sm:flex-row flex-col sm:justify-between sm:items-center gap-1.5 mb-2">
                    <span className="font-sans font-medium text-gray-700 text-xs sm:text-sm">
                      Доставка по городу Грозный
                    </span>
                    <span className="bg-green-100 px-1.5 py-0.5 rounded font-sans font-medium text-green-800 text-xs">
                      Активно
                    </span>
                  </div>
                  
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-1.5">
                      <div className="bg-green-500 rounded-full w-1.5 h-1.5" />
                      <span className="font-sans text-gray-600 text-xs sm:text-sm">
                        при заказе от <span className="font-sans font-bold text-gray-900">8000₽</span> — бесплатно
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-1.5">
                      <div className="bg-blue-500 rounded-full w-1.5 h-1.5" />
                      <span className="font-sans text-gray-600 text-xs sm:text-sm">
                        до <span className="font-sans font-bold text-gray-900">8000₽</span> — по тарифу курьерской службы
                      </span>
                    </div>
                  </div>
                </div>
            
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 sm:mt-14 text-center">
          <div className="bg-gradient-to-r from-berd-primary/10 to-amber-50 p-4 sm:p-6 lg:p-8 border border-berd-primary/20 rounded-xl sm:rounded-2xl">
            <h3 className="mb-2 sm:mb-3 font-sans font-bold text-gray-900 text-lg sm:text-xl lg:text-2xl">
              Готовы сделать заказ?
            </h3>
            <p className="mx-auto mb-4 sm:mb-6 max-w-2xl font-sans text-gray-600 text-sm sm:text-base">
              Присоединяйтесь к тысячам довольных клиентов, которые уже оценили
              качество наших продуктов и скорость доставки
            </p>
            
            <div className="flex sm:flex-row flex-col justify-center items-center gap-2 sm:gap-3">
              <Link
                href="/catalog"
                className="bg-gradient-to-r from-berd-primary hover:from-amber-600 to-amber-600 hover:to-amber-700 hover:shadow px-5 sm:px-6 py-2 sm:py-2.5 rounded-lg sm:rounded-xl w-80 font-sans font-bold text-black hover:text-white text-xs sm:text-sm transition-all hover:-translate-y-0.5"
              >
                Перейти в каталог
              </Link>
              <a
                href="tel:+79899194871"
                className="bg-white hover:bg-berd-primary px-5 sm:px-6 py-2 sm:py-2.5 border-2 border-berd-primary rounded-lg sm:rounded-xl w-80 font-sans font-bold text-gray-900 hover:text-black text-xs sm:text-sm transition-all"
              >
                Позвонить сейчас
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 sm:mt-10">
          <div className="mb-6 sm:mb-8 text-center">
            <h2 className="mb-2 sm:mb-3 font-sans font-bold text-gray-900 text-xl sm:text-2xl lg:text-3xl">
              Мы в социальных сетях
            </h2>
            <p className="mx-auto mb-4 sm:mb-6 max-w-2xl font-sans text-gray-600 text-sm sm:text-base">
              Следите за нашими новостями, акциями и новинками
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
            <Button asChild variant="outline" className="hover:bg-pink-50 border-gray-200 hover:border-pink-200">
              <a
                href="https://www.instagram.com/el.berd_?igsh=MWM0amx4OXhuaWx4cg=="
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 sm:gap-2"
              >
                <Instagram className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
                <span className="font-medium text-xs sm:text-sm">Instagram</span>
              </a>
            </Button>
            
            <Button asChild variant="outline" className="hover:bg-green-50 border-gray-200 hover:border-green-200">
              <a
                href="https://wa.me/79380031333"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 sm:gap-2"
                aria-label="WhatsApp"
              >
                <div className="relative w-3.5 sm:w-4 h-3.5 sm:h-4">
                  <Image 
                    src="/icons/whatsapp.svg" 
                    alt="WhatsApp"
                    width={14}
                    height={14}
                    className="brightness-0 invert filter"
                  />
                </div>
                <span className="font-medium text-xs sm:text-sm">WhatsApp</span>
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}