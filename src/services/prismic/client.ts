import * as prismic from "@prismicio/client";
import { enableAutoPreviews } from "@prismicio/next";

export const repositoryName = "elberd";

export function createClient(config: prismic.ClientConfig = {}) {
  const client = prismic.createClient(repositoryName, {
    accessToken: process.env.PRISMIC_ACCESS_TOKEN,

    fetchOptions:
      process.env.NODE_ENV === "production"
        ? {
            next: {
              revalidate: 60,
              tags: ["prismic"],
            },
          }
        : {
            next: { revalidate: 60 },
          },

    ...config,
  });

  enableAutoPreviews({ client });

  return client;
}