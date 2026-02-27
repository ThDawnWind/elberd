import type { Category, Product, SortKey, FilterItem } from "@/types";

export function filterProducts({
  products,
  categories,
  filters,
  selectedCategoryId,
  priceRange,
  selectedTags,
  sort,
}: {
  products: Product[];
  categories: Category[];
  filters: FilterItem[];
  selectedCategoryId: number;
  priceRange: [number, number];
  selectedTags: string[];
  sort: SortKey;
}) {
  let result = products.slice();

  if (selectedCategoryId !== 0) {
    const category = categories.find((c) => c.id === selectedCategoryId);
    if (category) result = result.filter((p) => p.category === category.name);
  }

  const [minPrice, maxPrice] = priceRange;
  result = result.filter((p) => p.price >= minPrice && p.price <= maxPrice);

  for (const filterId of selectedTags) {
    const f = filters.find((x) => x.id === filterId);
    if (f?.condition) result = result.filter(f.condition);
  }

  result.sort((a, b) => {
    switch (sort) {
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      case "rating":
        return (b.rating || 0) - (a.rating || 0);
      case "new":
        if (a.isNew && !b.isNew) return -1;
        if (!a.isNew && b.isNew) return 1;
        return 0;
      default:
        return (b.rating || 0) - (a.rating || 0);
    }
  });

  return result;
}