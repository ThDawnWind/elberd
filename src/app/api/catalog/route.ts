import { getProducts } from "@/services/prismic/queries/products";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const page = Number(searchParams.get("page") ?? 1);
  const pageSize = Number(searchParams.get("pageSize") ?? 8);

  const categorySlug = searchParams.get("category") ?? undefined;
  const search = searchParams.get("search")?.trim() || undefined;

  const sortParam = searchParams.get("sort");
  const sort =
    sortParam === "price_asc" || sortParam === "price_desc" || sortParam === "newest"
      ? sortParam
      : "newest";

  const min = Number(searchParams.get("min") ?? 50);
  const max = Number(searchParams.get("max") ?? 2600);

  const isHit = searchParams.get("hit") === "true";
  const isNew = searchParams.get("new") === "true";

  try {
    const result = await getProducts({
      page,
      pageSize,
      categorySlug,
      search,
      sort,
      min,
      max,
      isHit,
      isNew,
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("[api/catalog] GET error:", error);

    return NextResponse.json(
      { message: "Не удалось загрузить товары" },
      { status: 500 }
    );
  }
}