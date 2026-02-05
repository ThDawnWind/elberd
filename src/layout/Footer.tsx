import { Instagram, Mail, MapPin, Phone, Clock, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const Footer = () => {

  return (
    <footer className="bg-black font-sans text-white">
      <div className="mx-4 md:mx-[90px] px-4 py-12 sm:py-16">
        <div className="mx-auto max-w-7xl">
          <div className="flex lg:flex-row flex-col gap-10 lg:gap-16 xl:gap-24">
            
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-8">
                <div className="flex justify-center items-center w-10 h-10">
             <div className="relative w-24 md:w-28 lg:w-32 h-24 md:h-28 lg:h-32">
                <Image
                  src="/logo.png"
                  alt="Эльберд"
                  width={128} 
                  height={128}
                  priority
                  className="w-full h-full object-contain scale-125 md:scale-150"
                />
              </div>
                </div>
                <span className="bg-clip-text font-sans text-berd-primary text-2xl">
                  EL&apos;BERD
                </span>
              </div>

              <p className="mb-8 max-w-md text-gray-300">
                Ваш надежный партнер в доставке вкусной и свежей еды. 
                Мы заботимся о каждом клиенте и гарантируем качество.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <MapPin className="flex-shrink-0 mt-0.5 w-5 h-5 text-berd-primary" />
                  <div>
                    <h4 className="mb-1 font-semibold text-gray-200">Адрес:</h4>
                    <p className="text-gray-400">г. Грозный, пр. Исаева 3</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <Phone className="flex-shrink-0 w-5 h-5 text-berd-primary" />
                  <div>
                    <h4 className="mb-1 font-semibold text-gray-200">Телефон:</h4>
                    <a 
                      href="tel:+79899194871" 
                      className="text-gray-400 hover:text-berd-primary transition-colors"
                    >
                      +7 (989) 919-48-71
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <Mail className="flex-shrink-0 w-5 h-5 text-berd-primary" />
                  <div>
                    <h4 className="mb-1 font-semibold text-gray-200">Email:</h4>
                    <a 
                      href="mailto:groceyish@contact.com" 
                      className="text-gray-400 hover:text-berd-primary transition-colors"
                    >
                      groceyish@contact.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Clock className="flex-shrink-0 mt-0.5 w-5 h-5 text-berd-primary" />
                  <div>
                    <h4 className="mb-1 font-semibold text-gray-200">Часы работы:</h4>
                    <p className="text-gray-400">8:00 - 20:00</p>
                    <p className="text-gray-400 text-sm">Без выходных</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-1 gap-10 grid grid-cols-1 sm:grid-cols-2">
              
              <div>
                <h3 className="mb-6 font-bold text-white text-xl">Быстрые ссылки</h3>
                <ul className="space-y-3">
                  {[
                    { label: "Главная", href: "/" },
                    { label: "Каталог", href: "/catalog" },
                    { label: "Избранное", href: "/favorites" },
                    { label: "О нас", href: "/about" },
                    { label: "Наши магазины", href: "/where-to-buy" },
                  ].map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="group flex items-center gap-2 text-gray-400 hover:text-berd-primary transition-colors"
                      >
                        <ChevronRight className="opacity-0 group-hover:opacity-100 w-4 h-4 transition-opacity" />
                        <span>{link.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="mb-6 font-bold text-white text-xl">Следите за нами</h3>
                <p className="mb-6 text-gray-300">
                  Будьте в курсе наших новинок и специальных предложений
                </p>

                <div className="flex gap-4 mb-8">
                <a
                    href="https://wa.me/79899194871"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex justify-center items-center bg-gradient-to-br from-green-500 to-green-600 hover:shadow-lg rounded-full w-12 h-12 hover:scale-110 transition-transform"
                    aria-label="WhatsApp"
                    >
                    <div className="relative w-6 h-6">
                        <Image 
                        src="/icons/whatsapp.svg" 
                        alt="WhatsApp"
                        width={35}
                        height={35}
                        />
                    </div>
                </a>
                  
                  <a
                    href="https://www.instagram.com/el.berd_?igsh=MWM0amx4OXhuaWx4cg=="
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex justify-center items-center bg-gradient-to-br from-pink-500 to-purple-600 hover:shadow-lg rounded-full w-12 h-12 hover:scale-110 transition-transform"
                    aria-label="Instagram"
                  >
                    <Instagram className="w-6 h-6" />
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

