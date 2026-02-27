import type { Metadata } from "next";
import FavoritesClient from "./FavoritesClient";

export const metadata: Metadata = {
  title: "Избранное | EL’BERD",
  description: "Сохранённые товары и блюда, которые вам понравились.",
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical: "/favorites",
  },
};

export default function FavoritesPage() {
  return <FavoritesClient />;
}