import { CATEGORIES } from "@/lib/constants";
import type { PrismicProduct } from "@/types/prismic";
import { Product } from "@/types/product";

export function mapProduct(product: PrismicProduct): Product {
  const categoryField = product.data.category as
    | { uid?: string }
    | string
    | null
    | undefined;

  const categorySlug =
    typeof categoryField === "string"
      ? categoryField
      : categoryField?.uid ?? "";

  const matchedCategory = CATEGORIES.find((c) => c.slug === categorySlug);

  const gallery =
    product.data.gallery_image
      ?.map((item) => item.images?.url)
      .filter((url): url is string => Boolean(url)) ?? [];

  const mainImage =
    product.data.image?.url && product.data.image.url.trim()
      ? product.data.image.url
      : gallery[0] ?? "";

  return {
    id: product.id,
    uid: product.uid,
    name: product.data.name ?? "",
    price: product.data.price ?? 0,
    weight: product.data.weight ?? "",

    image: mainImage,
    images: gallery.length ? gallery : mainImage ? [mainImage] : [],

    category: matchedCategory?.name ?? categorySlug,
    categorySlug,

    rating: product.data.rating ?? 0,
    content: product.data.content ?? "",
    shelfLife: product.data.shelf_life ?? "",

    isNew: product.data.is_new ?? false,
    isHit: product.data.is_hit ?? false,
    isPopular: product.data.is_popular ?? false,
    isRecommend: product.data.is_recommend ?? false,
  };
}