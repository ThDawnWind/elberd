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

function getPrismicOrderings(sort: ProductSort) {
  if (sort === "price_asc") {
    return [{ field: "my.product.price", direction: "asc" as const }];
  }

  if (sort === "price_desc") {
    return [{ field: "my.product.price", direction: "desc" as const }];
  }

  return [
    {
      field: "document.first_publication_date",
      direction: "desc" as const,
    },
  ];
}

export async function getProducts(
  params: GetProductsParams = {}
): Promise<GetProductsResult> {
  const {
    categorySlug,
    search,
    sort = "newest",
    page = 1,
    pageSize = 8,
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

    if (isNew) {
      filters.push(prismic.filter.at("my.product.is_new", true));
    }

    if (isHit) {
      filters.push(prismic.filter.at("my.product.is_hit", true));
    }

    if (Number.isFinite(min)) {
      filters.push(prismic.filter.numberGreaterThan("my.product.price", min - 1));
    }

    if (Number.isFinite(max)) {
      filters.push(prismic.filter.numberLessThan("my.product.price", max + 1));
    }

    if (search?.trim()) {
      filters.push(prismic.filter.fulltext("my.product.name", search.trim()));
    }

    const response = await getProductsByTypeSafe(client, {
      filters,
      orderings: getPrismicOrderings(sort),
      page,
      pageSize,
    });

    return {
      page: response.page,
      pageSize,
      results_per_page: response.results_per_page,
      results_size: response.results_size,
      total_results_size: response.total_results_size,
      total_pages: response.total_pages,
      next_page: response.next_page ? response.page + 1 : null,
      prev_page: response.prev_page ? response.page - 1 : null,
      results: response.results.map(mapProduct),
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