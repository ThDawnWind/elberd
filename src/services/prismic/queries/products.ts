import * as prismic from "@prismicio/client";
import { createClient } from "../client";
import { mapProduct } from "../mapProduct";
import { Product } from "@/types/product";
import { normalizePrismicError, ProductsServiceError } from "@/lib/products.errors";
import { Content } from "@prismicio/client";

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

export type GetProductsResult = {
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

function createEmptyProductsResult(
  page: number,
  pageSize: number
): GetProductsResult {
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

async function getCategoryBySlugSafe(
  client: prismic.Client,
  categorySlug: string
) {
  try {
    return await client.getByUID("category", categorySlug);
  } catch (error) {
    const normalized = normalizePrismicError(
      error,
      `Не удалось получить категорию "${categorySlug}"`
    );

    if (normalized.code === "NOT_FOUND") {
      return null;
    }

    throw normalized;
  }
}

async function getProductsByTypeSafe(
  client: prismic.Client,
  params: Parameters<typeof client.getByType<Content.ProductDocument>>[1]
) {
  try {
    return await client.getByType<Content.ProductDocument>("product", params);
  } catch (error) {
    throw normalizePrismicError(error, "Не удалось получить список товаров");
  }
}


export async function getProducts(
  params: GetProductsParams = {}
): Promise<GetProductsResult> {
  const {
    categorySlug,
    search,
    sort = "newest",
    page = 1,
    pageSize = 12,
    min = 50,
    max = 2600,
    isHit = false,
    isNew = false,
  } = params;

  try {
    const client = createClient();
    const filters = [];

    if (categorySlug && categorySlug !== "all") {
      const categoryDoc = await getCategoryBySlugSafe(client, categorySlug);

      if (!categoryDoc) {
        return createEmptyProductsResult(page, pageSize);
      }

      filters.push(prismic.filter.at("my.product.category", categoryDoc.id));
    }

    const response = await getProductsByTypeSafe(client, {
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
      const matchesPrice =
        Number.isFinite(price) && price >= min && price <= max;

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
  } catch (error) {
    console.error("[getProducts] Prismic error:", error);
    return createEmptyProductsResult(page, pageSize);
  }
}

export async function getRecommendedProducts(limit = 5): Promise<Product[]> {
  const client = createClient();

  try {
    const response = await client.getByType<Content.ProductDocument>("product", {
      filters: [prismic.filter.at("my.product.is_recommend", true)],
      page: 1,
      pageSize: limit,
    });

    return response.results.map(mapProduct);
  } catch (error) {
    console.error("[getRecommendedProducts]", error);
    return [];
  }
}

export async function getPopularProducts(limit = 5): Promise<Product[]> {
  const client = createClient();

  try {
    const response = await client.getByType<Content.ProductDocument>("product", {
      filters: [prismic.filter.at("my.product.is_popular", true)],
      page: 1,
      pageSize: limit,
    });

    return response.results.map(mapProduct);
  } catch (error) {
    console.error("[getPopularProducts]", error);
    return [];
  }
}

export { ProductsServiceError };