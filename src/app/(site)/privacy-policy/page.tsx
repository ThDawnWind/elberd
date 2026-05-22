export default function PrivacyPolicyPage() {
  return (
    <main className="bg-gray-50 min-h-screen">
      <section
        className="mx-auto px-4 xs:px-4 sm:px-6 lg:px-8 py-8 xs:py-10 sm:py-12 lg:py-12 max-w-full sm:max-w-3xl lg:max-w-3xl"
      >
        <div
          className="bg-white shadow-sm p-4 xs:p-5 sm:p-8 lg:p-8 border rounded-xl xs:rounded-2xl sm:rounded-2xl lg:rounded-2xl"
        >
          <p className="mb-2 font-medium text-berd-primary text-xs sm:text-sm lg:text-sm uppercase tracking-wide">
            EL’BERD
          </p>

          <h1
            className="mb-4 sm:mb-6 lg:mb-6 font-mono font-bold text-gray-900 text-2xl xs:text-2xl sm:text-3xl lg:text-3xl leading-tight"
          >
            Политика конфиденциальности
          </h1>

          <p className="mb-6 sm:mb-8 lg:mb-8 text-gray-600 text-sm sm:text-base lg:text-base leading-relaxed">
            Настоящая политика описывает, какие персональные данные мы собираем,
            зачем они нужны и как используются при оформлении заказа на сайте.
          </p>

          <div className="space-y-6 sm:space-y-8 lg:space-y-8 text-gray-700 text-sm sm:text-base lg:text-base leading-relaxed">
            <section>
              <h2 className="mb-2 sm:mb-3 lg:mb-3 font-semibold text-gray-900 text-lg sm:text-xl lg:text-xl">
                1. Какие данные мы собираем
              </h2>
              <p>
                Мы можем собирать имя, номер телефона, WhatsApp и адрес доставки.
                Эти данные нужны исключительно для оформления, подтверждения и
                выполнения заказа.
              </p>
            </section>

            <section>
              <h2 className="mb-2 sm:mb-3 lg:mb-3 font-semibold text-gray-900 text-lg sm:text-xl lg:text-xl">
                2. Для чего используются данные
              </h2>
              <p>
                Персональные данные используются для связи с клиентом, уточнения
                деталей заказа и организации доставки.
              </p>
            </section>

            <section>
              <h2 className="mb-2 sm:mb-3 lg:mb-3 font-semibold text-gray-900 text-lg sm:text-xl lg:text-xl">
                3. Передача данных третьим лицам
              </h2>
              <p>
                Мы не передаём персональные данные третьим лицам, кроме случаев,
                когда это необходимо для выполнения заказа или предусмотрено
                законодательством.
              </p>
            </section>

            <section>
              <h2 className="mb-2 sm:mb-3 lg:mb-3 font-semibold text-gray-900 text-lg sm:text-xl lg:text-xl">
                4. Согласие пользователя
              </h2>
              <p>
                Отправляя заказ, пользователь подтверждает согласие на обработку
                персональных данных в рамках настоящей политики.
              </p>
            </section>

            <section>
              <h2 className="mb-2 sm:mb-3 lg:mb-3 font-semibold text-gray-900 text-lg sm:text-xl lg:text-xl">
                5. Контакты
              </h2>
              <p>
                По вопросам обработки персональных данных можно связаться с нами
                через WhatsApp.
              </p>
            </section>
          </div>

          <div className="mt-8 sm:mt-10 lg:mt-10 pt-5 sm:pt-6 lg:pt-6 border-t text-gray-500 text-xs sm:text-sm lg:text-sm">
            Последнее обновление: 2026
          </div>
        </div>
      </section>
    </main>
  );
}