import type { Category, SortKey } from "@/types";


export type CatalogUrlState = {
  categorySlug?: string;
  min?: number;
  max?: number;
  sort?: SortKey;
  tags?: string[];
};

const clamp = (n: number, min: number, max: number) => Math.min(max, Math.max(min, n));

const isSortKey = (v: string | null): v is SortKey =>
  v === "rating" || v === "price-asc" || v === "price-desc" || v === "new";

export function parseCatalogSearchParams({
  searchParams,
  categories,
  filters,
  priceLimits = { min: 50, max: 2600 },
}: {
  searchParams: URLSearchParams;
  categories: Category[];
  filters: { id: string }[];
  priceLimits?: { min: number; max: number };
}): CatalogUrlState {
  const categorySlugRaw = searchParams.get("category") || undefined;

  const categorySlug =
    categorySlugRaw && categories.some((c) => c.slug === categorySlugRaw)
      ? categorySlugRaw
      : undefined;

  const minRaw = searchParams.get("min");
  const maxRaw = searchParams.get("max");

  const minNum = minRaw ? Number(minRaw) : undefined;
  const maxNum = maxRaw ? Number(maxRaw) : undefined;

  const min =
    typeof minNum === "number" && Number.isFinite(minNum)
      ? clamp(minNum, priceLimits.min, priceLimits.max)
      : undefined;

  const max =
    typeof maxNum === "number" && Number.isFinite(maxNum)
      ? clamp(maxNum, priceLimits.min, priceLimits.max)
      : undefined;

  const normalizedMin = typeof min === "number" && min !== priceLimits.min ? min : undefined;
  const normalizedMax = typeof max === "number" && max !== priceLimits.max ? max : undefined;

  const sortRaw = searchParams.get("sort");
  const sort = isSortKey(sortRaw) ? sortRaw : undefined;

  const tagsRaw = searchParams.get("tags");
  const tags = tagsRaw
    ? tagsRaw
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean)
        .filter((id) => filters.some((f) => f.id === id))
    : undefined;

  return {
    categorySlug,
    min: normalizedMin,
    max: normalizedMax,
    sort,
    tags: tags?.length ? tags : undefined,
  };
}

export function buildCatalogQueryString({
  categorySlug,
  min,
  max,
  sort,
  tags,
  priceLimits = { min: 50, max: 2600 },
}: CatalogUrlState & { priceLimits?: { min: number; max: number } }) {
  const sp = new URLSearchParams();

  if (categorySlug) sp.set("category", categorySlug);

  if (typeof min === "number" && Number.isFinite(min) && min !== priceLimits.min) sp.set("min", String(min));
  if (typeof max === "number" && Number.isFinite(max) && max !== priceLimits.max) sp.set("max", String(max));

  if (sort && sort !== "rating") sp.set("sort", sort);

  if (tags?.length) sp.set("tags", tags.slice().sort().join(","));

  const qs = sp.toString();
  return qs ? `?${qs}` : "";
}

export function categoryIdFromSlug(categories: Category[], slug?: string) {
  if (!slug) return 0;
  return categories.find((c) => c.slug === slug)?.id ?? 0;
}

export function categorySlugFromId(categories: Category[], id: number) {
  if (!id || id === 0) return undefined;
  return categories.find((c) => c.id === id)?.slug;
}