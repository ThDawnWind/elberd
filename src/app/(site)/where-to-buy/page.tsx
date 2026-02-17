export default function WhereToBuyPage() {
  return (
    <section className="bg-white w-full min-h-screen">
      <div className="mx-auto px-4 xs:py-10 lg:py-16 s:py-8 sm:py-12 max-w-5xl">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center bg-amber-100 px-3 py-1 rounded-full font-medium text-amber-800 s:text-xs xs:text-sm sm:text-sm lg:text-base">
            Скоро
          </span>
        </div>

        <h1 className="mt-3 font-sans font-bold text-gray-900 s:text-2xl xs:text-3xl sm:text-4xl lg:text-5xl leading-tight">
          Где купить
        </h1>

        <div className="bg-gradient-to-br from-gray-50 to-white shadow-sm mt-5 sm:mt-6 lg:mt-8 p-4 xs:p-5 sm:p-7 lg:p-10 border border-gray-200 rounded-2xl">
          <p className="font-sans text-gray-700 s:text-sm xs:text-base sm:text-lg lg:text-xl leading-relaxed">
            Раздел «Где купить» находится в разработке.
            <br />
            В ближайшее время здесь появится полный список точек продаж.
          </p>

          <p className="mt-3 text-gray-500 s:text-xs xs:text-sm sm:text-sm lg:text-base">
            Спасибо за ваше терпение 💛
          </p>
        </div>
      </div>
    </section>
  );
}

