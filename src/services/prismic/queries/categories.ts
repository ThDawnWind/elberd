import { createClient } from "../client";

export async function getCategories() {
  const client = createClient();

  return client.getAllByType("category", {
    orderings: [{ field: "my.category.category_name", direction: "asc" }],
  });
}