import type { Metadata } from "next";
import FavoritesClient from "./FavoritesClient";
import { getProducts } from "@/services/prismic/queries/products";

export const metadata: Metadata = {
  title: "Избранное",
  description: "Сохранённые товары и блюда, которые вам понравились.",
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical: "/favorites",
  },
};

export default async function FavoritesPage() {
  const productsData = await getProducts({
    pageSize: 100,
  });

  return <FavoritesClient products={productsData.results} />;
}
