import { CATEGORIES } from "@/lib/constants";
import { Content } from "@prismicio/client";
import { Product } from "@/types/product";

type CategoryField =
  | { uid?: string | null; slug?: string | null }
  | string
  | null
  | undefined;

export function mapProduct(product: Content.ProductDocument): Product {
  if (!product.uid) {
    throw new Error(`Product document ${product.id} has no uid`);
  }

  const categoryField = product.data.category as CategoryField;

  const categorySlug =
    typeof categoryField === "string"
      ? categoryField
      : categoryField?.uid ?? "";

  const matchedCategory = CATEGORIES.find((c) => c.slug === categorySlug);

  const gallery =
    product.data.gallery
      ?.map((item) => item.img?.url?.trim())
      .filter((url): url is string => Boolean(url)) ?? [];

  const mainImage =
    product.data.image?.url?.trim()
      ? product.data.image.url.trim()
      : gallery[0] ?? "";

  const allImages = [mainImage, ...gallery].filter(
    (url, index, arr): url is string =>
      Boolean(url) && arr.indexOf(url) === index
  );

  return {
    id: product.id,
    uid: product.uid,
    name: product.data.name ?? "",
    price: product.data.price ?? 0,
    weight: product.data.weight ?? "",
    image: mainImage,
    images: allImages,
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