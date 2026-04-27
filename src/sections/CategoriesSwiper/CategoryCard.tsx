import Link from "next/link";
import { ICONS } from "@/lib/icons";
import { Category } from "@/types";

export const CategoryCard = ({ name, icon, slug }: Category) => {
  const href = slug ? { pathname: "/catalog", query: { category: slug } } : "/catalog";

  const Icon = icon ? ICONS[icon as keyof typeof ICONS] : null;

  return (
    <Link
      href={href}
      prefetch={false}
      className="
    group flex flex-col items-center justify-center gap-[15px]
    w-[120px] sm:w-[130px] lg:w-[172px]
    h-[150px] sm:h-[160px] 
    px-3 py-3
    rounded-2xl border
    bg-[#FBF9F5] border-[#EAE2D6]
    transition-all duration-300
    hover:bg-[#FFF9EE] hover:border-[#D6B25E] hover:shadow-[0_6px_18px_rgba(122,90,31,0.16)]
  "
      aria-label={`Открыть категорию «${name}» в меню доставки EL’BERD`}
    >
      <div
        className="
      flex items-center justify-center
      w-11 h-11 sm:w-12 sm:h-12
      rounded-full bg-[#F2ECE3]
      transition-all duration-300
      group-hover:bg-[#F3E4C6]
    "
      >
        {Icon ? (
          <Icon className="w-5 h-5 text-[#5B4B38] transition-colors duration-300 group-hover:text-[#B28A3C]" />
        ) : null}
      </div>

      <div className="mt-2 text-center w-full">
        <h3
          className="
        font-semibold text-[14px] leading-[1.1]
        text-[#2C2318] transition-colors duration-300
        group-hover:text-[#B28A3C]
        line-clamp-2
      "
        >
          {name}
        </h3>
      </div>
    </Link>
  );
};
