import type { Metadata } from "next";
import CartClient from "./CartClient";


export const metadata: Metadata = {
  title: "Корзина",
  description: "Оформление заказа и данные для доставки.",
  robots: { index: false, follow: true },
  alternates: { canonical: "/cart" },
};

export default function CartPage() {
  return <CartClient />;
}
