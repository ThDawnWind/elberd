import { Product } from "@/types/product";
import { HeaderClient } from "./HeaderClient";

type HeaderProps = {
  searchProducts: Product[];
};

export const Header = ({ searchProducts }: HeaderProps) => {
  return <HeaderClient searchProducts={searchProducts} />;
};