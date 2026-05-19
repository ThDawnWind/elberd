import { MapPin, Phone, Mail, Clock } from "lucide-react";
import Image from "next/image";

const CONTACTS = [
  { icon: MapPin, text: "г. Грозный, пр. Исаева 3",      href: null              },
  { icon: Phone,  text: "+7 (989) 919-48-71",             href: "tel:+79899194871" },
  { icon: Mail,   text: "info@elberd.ru",                 href: "mailto:info@elberd.ru" },
  { icon: Clock,  text: "08:00 — 20:00, без выходных",   href: null              },
];

export const Footer = () => {
  return (
    <footer className="bg-[#2C2318] mb-14 sm:mb-0 lg:mb-0 text-white">
      <div className="mx-auto px-4 xs:px-4 py-12 xs:py-8 max-w-[1440px]">
        <div className="flex xs:flex-col gap-10 xs:gap-8">

          <div className="flex flex-col flex-1 gap-4">
            <div className="w-[130px] h-[60px] shrink-0">
              <Image
                src="/logo.png"
                alt="EL'BERD"
                width={130}
                height={60}
                className="w-full h-full object-contain"
              />
            </div>
            <p className="text-[#b89b6a] text-[13px] leading-[1.5]">
              Ваш надежный сервис доставки вкусной и свежей еды в Грозном.
              Гарантируем качество и заботимся о каждом клиенте.
            </p>
          </div>

          <div className="flex flex-col gap-3 w-[220px] xs:w-full">
            <p className="font-semibold text-[#e0c99a] text-[14px]">Контакты</p>
            <ul className="flex flex-col gap-3">
              {CONTACTS.map(({ icon: Icon, text, href }) => (
                <li key={text} className="flex items-start gap-2">
                  <Icon className="mt-[2px] w-[14px] h-[14px] text-[#d9a441] shrink-0" />
                  {href ? (
                    <a
                      href={href}
                      className="text-[#b89b6a] text-[13px] hover:text-[#d9a441] transition-colors"
                    >
                      {text}
                    </a>
                  ) : (
                    <span className="text-[#b89b6a] text-[13px]">{text}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>

        </div>

        <div className="mt-8 pt-4 border-white/[0.08] border-t text-center">
          <p className="text-[#8a7a5e] text-[12px]">
            © 2026 EL&apos;BERD — Вкус испокон веков. Все права защищены.
          </p>
        </div>

      </div>
    </footer>
  );
};
