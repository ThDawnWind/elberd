import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="place-items-center grid bg-white min-h-screen">
      <div className="mx-auto px-4 s:py-8 xs:py-10 sm:py-12 lg:py-12 w-full max-w-4xl">
        <div className="bg-white shadow-xl s:p-6 xs:p-8 sm:p-12 lg:p-12 border border-berd-primary/20 rounded-3xl text-center">
          <div className="place-items-center grid mx-auto mb-4 border-4 border-berd-primary/40 rounded-full s:w-20 xs:w-24 sm:w-28 lg:w-28 s:h-20 xs:h-24 sm:h-28 lg:h-28 font-sans font-black text-berd-primary s:text-2xl xs:text-3xl sm:text-4xl lg:text-4xl animate-pulse">
            404
          </div>

          <h1 className="font-sans font-bold text-gray-900 s:text-2xl xs:text-3xl sm:text-4xl lg:text-4xl">
            Упс, такой страницы нет
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-gray-600 s:text-xs xs:text-sm sm:text-base lg:text-base">
            Но это не проблема — нужные товары уже ждут вас в каталоге.
          </p>

          <div className="flex xs:flex-row justify-center gap-2 mt-7">
            <Link
              href="/catalog"
              className="inline-flex justify-center items-center bg-berd-primary px-4 py-2 rounded-lg font-medium text-gray-900 hover:text-white s:text-xs xs:text-sm sm:text-sm lg:text-sm transition"
            >
              Открыть каталог
            </Link>
            <Link
              href="/"
              className="inline-flex justify-center items-center hover:bg-gray-50 px-4 py-2 border border-gray-300 rounded-lg font-medium text-gray-900 s:text-xs xs:text-sm sm:text-sm lg:text-sm transition"
            >
              Вернуться на главную
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}