import { Product } from "@/types/product";
import { createClient } from "../client";
import { mapProduct } from "../mapProduct";

export async function getSearchProducts(): Promise<Product[]> {
  const client = createClient();

  const response = await client.getByType("product", {
    page: 1,
    pageSize: 10,
  });

  return response.results.map(mapProduct);
}