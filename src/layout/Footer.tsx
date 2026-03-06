import { Instagram, Mail, MapPin, Phone, Clock, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="bg-black pb-4 font-sans text-white">
      <div className="px-4 sm:px-6 lg:px-8 py-12 sm:py-14 lg:py-16">
        <div className="mx-auto max-w-7xl">
          <div className="flex lg:flex-row flex-col gap-8 sm:gap-10 lg:gap-16 xl:gap-24">

            <div className="flex-1">
              <div className="flex items-center gap-3 mb-6">
                <div className="relative max-w-[63px] max-h-[63px]">
                  <Image
                    src="/logo.png"
                    alt="EL’BERD — доставка еды в Грозном"
                    width={695}
                    height={792}
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="font-mono font-semibold text-berd-primary text-xl sm:text-2xl">
                  EL&apos;BERD
                </span>
              </div>

              <p className="mb-8 max-w-md font-sans font-light text-gray-300 text-sm sm:text-base">
                Ваш надежный сервис доставки вкусной и свежей еды в Грозном.
                Гарантируем качество и заботимся о каждом клиенте.
              </p>

              <address className="space-y-5 font-sans text-sm sm:text-base not-italic">

                <div className="flex items-start gap-4">
                  <MapPin aria-hidden="true" className="flex-shrink-0 mt-0.5 w-5 h-5 text-berd-primary" />
                  <div>
                    <p className="font-semibold text-gray-200">Адрес:</p>
                    <p className="text-gray-400">
                      г. Грозный, пр. Исаева 3
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Phone aria-hidden="true" className="flex-shrink-0 mt-0.5 w-5 h-5 text-berd-primary" />
                  <div>
                    <p className="font-semibold text-gray-200">Телефон:</p>
                    <a
                      href="tel:+79899194871"
                      className="text-gray-400 hover:text-berd-primary transition-colors"
                    >
                      +7 (989) 919-48-71
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Mail aria-hidden="true" className="flex-shrink-0 mt-0.5 w-5 h-5 text-berd-primary" />
                  <div>
                    <p className="font-semibold text-gray-200">Email:</p>
                    <a
                      href="mailto:info@elberd.ru"
                      className="text-gray-400 hover:text-berd-primary transition-colors"
                    >
                      info@elberd.ru
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Clock aria-hidden="true" className="flex-shrink-0 mt-0.5 w-5 h-5 text-berd-primary" />
                  <div>
                    <p className="font-semibold text-gray-200">Часы работы:</p>
                    <p className="text-gray-400">08:00 — 20:00</p>
                    <p className="text-gray-400">Без выходных</p>
                  </div>
                </div>

              </address>
            </div>
            <div className="flex-1 gap-10 grid grid-cols-1 sm:grid-cols-2 font-mono font-light">
              <div>
                <h3 className="mb-6 font-bold text-lg sm:text-xl">
                  Навигация
                </h3>

                <ul className="space-y-3 text-sm sm:text-base">
                  {[
                    { label: "Главная", href: "/" },
                    { label: "Каталог", href: "/catalog" },
                    { label: "Избранное", href: "/favorites" },
                    { label: "О доставке", href: "/about" },
                    { label: "Наши магазины", href: "/where-to-buy" },
                  ].map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="group flex items-center gap-2 text-gray-400 hover:text-berd-primary transition-colors"
                      >
                        <ChevronRight
                          aria-hidden="true"
                          className="opacity-0 group-hover:opacity-100 w-4 h-4 transition-opacity"
                        />
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="mb-4 font-bold text-lg sm:text-xl">
                  Мы в соцсетях
                </h3>

                <p className="mb-6 text-gray-300 text-sm sm:text-base">
                  Подписывайтесь, чтобы не пропустить новинки и акции.
                </p>

                <div className="flex xs:justify-center gap-4 mb-3">
                  <a
                    href="https://wa.me/79899194871"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="WhatsApp EL’BERD"
                    className="flex justify-center items-center rounded-full w-12 h-12 hover:scale-110 transition-transform"
                  >
                    <Image
                      src="/icons/whatsapp.svg"
                      alt="WhatsApp"
                      width={24}
                      height={24}
                    />
                  </a>

                  <a
                    href="https://www.instagram.com/el.berd_"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram EL’BERD"
                    className="flex justify-center items-center bg-gradient-to-br rounded-full w-12 h-12 text-berd-primary hover:scale-110 transition-transform"
                  >
                    <Instagram aria-hidden="true" className="w-6 h-6" />
                  </a>

                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </footer>
  );
};