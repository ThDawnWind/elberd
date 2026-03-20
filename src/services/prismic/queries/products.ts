import * as prismic from "@prismicio/client";
import { createClient } from "../client";

import { mapProduct } from "../mapProduct";
import { Product } from "@/types/product";

export type ProductSort = "newest" | "price_asc" | "price_desc";

type GetProductsParams = {
  categorySlug?: string;
  search?: string;
  sort?: ProductSort;
  page?: number;
  pageSize?: number;
  min?: number;
  max?: number;
  isNew?: boolean;
  isHit?: boolean;
};

type GetProductsResult = {
  page: number;
  pageSize: number;
  results_per_page: number;
  results_size: number;
  total_results_size: number;
  total_pages: number;
  next_page: number | null;
  prev_page: number | null;
  results: Product[];
};

export async function getProducts({
  categorySlug,
  search,
  sort = "newest",
  page = 1,
  pageSize = 12,
  min = 50,
  max = 2600,
  isHit = false,
  isNew = false,
}: GetProductsParams = {}): Promise<GetProductsResult> {
  const client = createClient();
  const filters = [];

  if (categorySlug && categorySlug !== "all") {
    const categoryDoc = await client
      .getByUID("category", categorySlug)
      .catch(() => null);

    if (categoryDoc) {
      filters.push(prismic.filter.at("my.product.category", categoryDoc.id));
    } else {
      return {
        page,
        pageSize,
        results_per_page: pageSize,
        results_size: 0,
        total_results_size: 0,
        total_pages: 1,
        next_page: null,
        prev_page: null,
        results: [],
      };
    }
  }

  const response = await client.getByType("product", {
    filters,
    page: 1,
    pageSize: 100,
  });

  const query = search?.trim().toLowerCase();

  let filtered = response.results.filter((item) => {
    const matchesSearch = query
      ? String(item.data.name ?? "").toLowerCase().includes(query)
      : true;

    const price = Number(item.data.price ?? 0);
    const matchesPrice = price >= min && price <= max;

    return matchesSearch && matchesPrice;
  });

  if (isNew) {
    filtered = filtered.filter((item) => item.data.is_new === true);
  }

  if (isHit) {
    filtered = filtered.filter((item) => item.data.is_hit === true);
  }

  filtered.sort((a, b) => {
    if (sort === "price_asc") {
      return Number(a.data.price ?? 0) - Number(b.data.price ?? 0);
    }

    if (sort === "price_desc") {
      return Number(b.data.price ?? 0) - Number(a.data.price ?? 0);
    }

    return (
      new Date(b.first_publication_date).getTime() -
      new Date(a.first_publication_date).getTime()
    );
  });

  const total_results_size = filtered.length;
  const total_pages = Math.max(1, Math.ceil(total_results_size / pageSize));
  const safePage = Math.min(Math.max(page, 1), total_pages);
  const start = (safePage - 1) * pageSize;

  const pagedResults = filtered.slice(start, start + pageSize).map(mapProduct);

  return {
    page: safePage,
    pageSize,
    results_per_page: pageSize,
    results_size: pagedResults.length,
    total_results_size,
    total_pages,
    next_page: safePage < total_pages ? safePage + 1 : null,
    prev_page: safePage > 1 ? safePage - 1 : null,
    results: pagedResults,
  };
}

export async function getRecommendedProducts(limit = 5): Promise<Product[]> {
  const client = createClient();

  const response = await client.getByType("product", {
    filters: [prismic.filter.at("my.product.is_recommend", true)],
    page: 1,
    pageSize: limit,
  });

  
  return response.results.map(mapProduct);
}

export async function getPopularProducts(limit = 5): Promise<Product[]> {
  const client = createClient();

  const response = await client.getByType("product", {
    filters: [prismic.filter.at("my.product.is_popular", true)],
    page: 1,
    pageSize: limit,
  });

  return response.results.map(mapProduct);
}