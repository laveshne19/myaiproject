import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = `${site.url}${site.basePath}`;
  return [
    {
      url: `${base}/`,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${base}/#pricing`,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${base}/#faq`,
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];
}
