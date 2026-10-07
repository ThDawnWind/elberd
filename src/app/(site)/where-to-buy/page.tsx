import Link from "next/link"
import { MapPin } from "lucide-react"

export const metadata = {
  title: "Где купить",
  robots: {
    index: false,
    follow: true,
  },
};

export default function WhereToBuyPage() {
  return (
    <section className="bg-white w-full min-h-screen">
      <div className="mx-auto px-4 s:py-8 xs:py-10 sm:py-12 lg:py-16 max-w-5xl">
        
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center bg-amber-100 px-3 py-1 rounded-full font-medium text-amber-800 s:text-xs xs:text-sm sm:text-sm lg:text-base animate-pulse">
            Скоро
          </span>
        </div>

        <h1 className="mt-3 font-bold text-gray-900 s:text-1xl sm:text-1xl xs:text-2xl lg:text-2xl leading-tight">
          Где купить продукцию EL’BERD в Грозном
        </h1>

        <div className="bg-gradient-to-br from-gray-50 to-white shadow-sm hover:shadow-md mt-5 sm:mt-6 lg:mt-8 p-4 xs:p-5 sm:p-7 lg:p-10 border border-gray-200 rounded-2xl transition">
          
          <div className="flex justify-center mb-6">
            <div className="flex justify-center items-center bg-amber-100 rounded-full w-16 h-16">
              <MapPin className="w-8 h-8 text-amber-600" />
            </div>
          </div>

          <p className="font-light text-gray-700 s:text-sm xs:text-base sm:text-lg lg:text-xl text-center leading-relaxed">
            Раздел «Где купить» находится в разработке.
            <br />
            В ближайшее время здесь появится полный список точек продаж.
          </p>

          <p className="mt-3 font-semibold text-gray-500 s:text-xs xs:text-sm sm:text-sm lg:text-base text-center">
            Спасибо за ваше терпение 💛
          </p>

          <div className="flex justify-center mt-6">
            <Link
              href="/catalog"
              className="inline-flex justify-center items-center bg-berd-primary px-6 py-3 rounded-lg font-medium text-gray-900 hover:text-white transition"
            >
              Перейти в каталог
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
