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
    <footer className="bg-[#2C2318] text-white">
      <div className="max-w-[1440px] mx-auto px-4 py-12 xs:px-4 xs:py-8">

        <div className="flex gap-10 xs:flex-col xs:gap-8">

          <div className="flex-1 flex flex-col gap-4">
            <div className="w-[130px] h-[60px] shrink-0">
              <Image
                src="/logo.png"
                alt="EL'BERD"
                width={130}
                height={60}
                className="w-full h-full object-contain"
              />
            </div>
            <p className="text-[13px] leading-[1.5] text-[#b89b6a] ">
              Ваш надежный сервис доставки вкусной и свежей еды в Грозном.
              Гарантируем качество и заботимся о каждом клиенте.
            </p>
          </div>

          <div className="w-[220px] xs:w-full flex flex-col gap-3">
            <p className="text-[14px] font-semibold text-[#e0c99a]">Контакты</p>
            <ul className="flex flex-col gap-3">
              {CONTACTS.map(({ icon: Icon, text, href }) => (
                <li key={text} className="flex items-start gap-2">
                  <Icon className="w-[14px] h-[14px] mt-[2px] shrink-0 text-[#d9a441]" />
                  {href ? (
                    <a
                      href={href}
                      className="text-[13px] text-[#b89b6a] hover:text-[#d9a441] transition-colors"
                    >
                      {text}
                    </a>
                  ) : (
                    <span className="text-[13px] text-[#b89b6a]">{text}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>

        </div>

        <div className="mt-8 pt-4 border-t border-white/[0.08] text-center">
          <p className="text-[12px] text-[#8a7a5e]">
            © 2026 EL&apos;BERD — Вкус испокон веков. Все права защищены.
          </p>
        </div>

      </div>
    </footer>
  );
};
