// app/about/page.tsx
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
    <div className="bg-gradient-to-b from-white to-gray-50 min-h-screen">
      {/* Hero секция */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-berd-primary/10 to-amber-100/30" />
        
        <div className="relative mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-20 max-w-7xl">
          <div className="text-center">
            <h1 className="mb-4 sm:mb-6 font-sans font-bold text-gray-900 text-3xl sm:text-4xl lg:text-5xl">
              EL<span className="text-berd-primary">.BERD</span>
            </h1>
            <p className="mx-auto max-w-3xl font-sans text-gray-600 text-lg sm:text-xl lg:text-2xl">
              Производство и продажа продуктов питания с доставкой в Грозном
            </p>
          </div>
        </div>
      </div>

      {/* Основной контент */}
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-7xl">
        <div className="gap-8 lg:gap-12 grid lg:grid-cols-2">
          
          {/* Левая колонка */}
          <div>
            {/* О компании */}
            <div className="mb-6 sm:mb-8">
              <h2 className="mb-4 sm:mb-6 font-sans font-bold text-gray-900 text-2xl sm:text-3xl lg:text-4xl">
                О нас
              </h2>
              <div className="space-y-3 sm:space-y-4 font-sans text-gray-600 text-base sm:text-lg">
                <p>
                  Мы занимаемся производством и продажей продуктов питания, 
                  а также оказываем услуги по доставке в городе Грозный.
                </p>
                <p>
                  Наша миссия — обеспечить вас свежими, качественными продуктами 
                  и готовыми блюдами с доставкой до двери.
                </p>
              </div>
            </div>

            {/* Режим работы */}
            <div className="bg-white shadow-lg p-5 sm:p-6 lg:p-8 border border-gray-100 rounded-xl sm:rounded-2xl">
              <div className="flex items-center gap-3 mb-5 sm:mb-6">
                <div className="flex justify-center items-center bg-gradient-to-br from-berd-primary/10 to-amber-100 rounded-xl w-10 sm:w-12 h-10 sm:h-12">
                  <Clock className="w-5 sm:w-6 h-5 sm:h-6 text-berd-primary" />
                </div>
                <h3 className="font-sans font-bold text-gray-900 text-xl sm:text-2xl">
                  Режим работы
                </h3>
              </div>
              
              <div className="space-y-3 sm:space-y-4">
                {/* Самовывоз */}
                <div className="flex sm:flex-row flex-col sm:justify-between sm:items-center gap-2 bg-gray-50 p-3 sm:p-4 rounded-lg sm:rounded-xl">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <Package className="w-4 sm:w-5 h-4 sm:h-5 text-berd-primary" />
                    <span className="font-sans font-medium text-gray-700 text-sm sm:text-base">
                      Самовывоз
                    </span>
                  </div>
                  <span className="font-sans font-bold text-gray-900 text-base sm:text-lg">
                    9:00 - 00:00
                  </span>
                </div>
                
                {/* Доставка */}
                <div className="flex sm:flex-row flex-col sm:justify-between sm:items-center gap-2 bg-gray-50 p-3 sm:p-4 rounded-lg sm:rounded-xl">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <Truck className="w-4 sm:w-5 h-4 sm:h-5 text-berd-primary" />
                    <span className="font-sans font-medium text-gray-700 text-sm sm:text-base">
                      Доставка
                    </span>
                  </div>
                  <span className="font-sans font-bold text-gray-900 text-base sm:text-lg">
                    9:00 - 21:00
                  </span>
                </div>
                
                {/* Без выходных */}
                <div className="flex items-center gap-2 font-sans font-medium text-green-600 text-sm sm:text-base">
                  <CheckCircle className="w-4 sm:w-5 h-4 sm:h-5" />
                  <span>Работаем без выходных</span>
                </div>
              </div>
            </div>
          </div>

          {/* Правая колонка */}
          <div className="space-y-6 sm:space-y-8 mt-8 lg:mt-0">
            
            {/* Контакты */}
            <div className="bg-white shadow-lg p-5 sm:p-6 lg:p-8 border border-gray-100 rounded-xl sm:rounded-2xl">
              <div className="flex items-center gap-3 mb-5 sm:mb-6">
                <div className="flex justify-center items-center bg-gradient-to-br from-berd-primary/10 to-amber-100 rounded-xl w-10 sm:w-12 h-10 sm:h-12">
                  <Phone className="w-5 sm:w-6 h-5 sm:h-6 text-berd-primary" />
                </div>
                <h3 className="font-sans font-bold text-gray-900 text-xl sm:text-2xl">
                  Контакты
                </h3>
              </div>
              
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center gap-3">
                  <Phone className="w-4 sm:w-5 h-4 sm:h-5 text-gray-400" />
                  <div>
                    <div className="font-sans text-gray-500 text-xs sm:text-sm">Телефон</div>
                    <a 
                      href="tel:+79380031333" 
                      className="font-sans font-bold text-gray-900 hover:text-berd-primary text-lg sm:text-xl transition-colors"
                    >
                      +7 (938) 003-13-33
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 w-4 sm:w-5 h-4 sm:h-5 text-gray-400" />
                  <div>
                    <div className="font-sans text-gray-500 text-xs sm:text-sm">Города доставки</div>
                    <div className="flex flex-wrap gap-2 mt-1">
                      <span className="bg-berd-primary/10 px-2 sm:px-3 py-1 rounded-full font-sans font-medium text-berd-primary text-xs sm:text-sm">
                        Грозный
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-berd-primary/5 to-amber-50 p-5 sm:p-6 lg:p-8 border border-berd-primary/20 rounded-xl sm:rounded-2xl">
              <div className="flex items-center gap-3 mb-5 sm:mb-6">
                <div className="flex justify-center items-center bg-gradient-to-br from-berd-primary to-amber-600 rounded-xl w-10 sm:w-12 h-10 sm:h-12">
                  <Truck className="w-5 sm:w-6 h-5 sm:h-6 text-white" />
                </div>
                <h3 className="font-sans font-bold text-gray-900 text-xl sm:text-2xl">
                  Условия доставки
                </h3>
              </div>
              
              <div className="space-y-3 sm:space-y-4">
                <div className="bg-white p-3 sm:p-4 border border-gray-200 rounded-lg sm:rounded-xl">
                  <div className="flex sm:flex-row flex-col sm:justify-between sm:items-center gap-2 mb-2">
                    <span className="font-sans font-medium text-gray-700 text-sm sm:text-base">
                      Доставка по городу Грозный
                    </span>
                    <span className="bg-green-100 px-2 py-1 rounded font-sans font-medium text-green-800 text-xs sm:text-sm">
                      Активно
                    </span>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="bg-green-500 rounded-full w-2 h-2" />
                      <span className="font-sans text-gray-600 text-sm sm:text-base">
                        при заказе от <span className="font-sans font-bold text-gray-900">3000₽</span> — бесплатно
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <div className="bg-blue-500 rounded-full w-2 h-2" />
                      <span className="font-sans text-gray-600 text-sm sm:text-base">
                        до <span className="font-sans font-bold text-gray-900">3000₽</span> — по тарифу курьерской службы
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="font-sans text-gray-500 text-xs sm:text-sm">
                  *Минимальная сумма заказа для доставки — 500₽
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 sm:mt-16">
          <div className="mb-8 sm:mb-10 text-center">
            <h2 className="mb-3 sm:mb-4 font-sans font-bold text-gray-900 text-2xl sm:text-3xl lg:text-4xl">
              Мы в социальных сетях
            </h2>
            <p className="mx-auto mb-6 sm:mb-8 max-w-2xl font-sans text-gray-600 text-base sm:text-lg">
              Следите за нашими новостями, акциями и новинками
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
            <a
              href="https://instagram.com/elberd"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 sm:gap-3 bg-gradient-to-r from-pink-500 hover:from-pink-600 to-purple-600 hover:to-purple-700 hover:shadow-lg px-4 sm:px-5 py-2.5 sm:py-3 rounded-lg sm:rounded-xl font-sans text-white transition-all duration-300"
              aria-label="Instagram"
            >
              <Instagram className="w-4 sm:w-5 h-4 sm:h-5" />
              <span className="font-medium text-sm sm:text-base">Instagram</span>
            </a>
            
            <a
              href="https://wa.me/79380031333"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 sm:gap-3 bg-gradient-to-r from-green-500 hover:from-green-600 to-green-600 hover:to-green-700 hover:shadow-lg px-4 sm:px-5 py-2.5 sm:py-3 rounded-lg sm:rounded-xl font-sans text-white transition-all duration-300"
              aria-label="WhatsApp"
            >
              <div className="relative w-4 sm:w-5 h-4 sm:h-5">
                <Image 
                  src="/icons/whatsapp.svg" 
                  alt="WhatsApp"
                  width={16}
                  height={16}
                  className="brightness-0 invert filter"
                />
              </div>
              <span className="font-medium text-sm sm:text-base">WhatsApp</span>
            </a>
          </div>
        </div>

        <div className="mt-16 sm:mt-20 text-center">
          <div className="bg-gradient-to-r from-berd-primary/10 to-amber-50 p-6 sm:p-8 lg:p-12 border border-berd-primary/20 rounded-2xl sm:rounded-3xl">
            <h3 className="mb-3 sm:mb-4 font-sans font-bold text-gray-900 text-xl sm:text-2xl lg:text-3xl">
              Готовы сделать заказ?
            </h3>
            <p className="mx-auto mb-6 sm:mb-8 max-w-2xl font-sans text-gray-600 text-base sm:text-lg">
              Присоединяйтесь к тысячам довольных клиентов, которые уже оценили
              качество наших продуктов и скорость доставки
            </p>
            
            <div className="flex sm:flex-row flex-col justify-center gap-3 sm:gap-4">
              <Link
                href="/catalog"
                className="bg-gradient-to-r from-berd-primary hover:from-amber-600 to-amber-600 hover:to-amber-700 hover:shadow-xl px-6 sm:px-8 py-3 sm:py-4 rounded-lg sm:rounded-xl font-sans font-bold text-white text-sm sm:text-base transition-all hover:-translate-y-0.5"
              >
                Перейти в каталог
              </Link>
              <a
                href="tel:+79380031333"
                className="bg-white hover:bg-berd-primary px-6 sm:px-8 py-3 sm:py-4 border-2 border-berd-primary rounded-lg sm:rounded-xl font-sans font-bold text-gray-900 hover:text-white text-sm sm:text-base transition-all"
              >
                Позвонить сейчас
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}