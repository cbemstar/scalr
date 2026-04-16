import type { MetadataRoute } from "next"
import { siteConfig } from "@/config/site"

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url
  const routes: {
    path: string
    changeFrequency: MetadataRoute.Sitemap[0]["changeFrequency"]
    priority: number
  }[] = [
    { path: "/", changeFrequency: "weekly", priority: 1 },
    { path: "/services/integrations", changeFrequency: "monthly", priority: 0.85 },
    { path: "/privacy", changeFrequency: "yearly", priority: 0.5 },
    { path: "/terms", changeFrequency: "yearly", priority: 0.5 },
    { path: "/cookies", changeFrequency: "yearly", priority: 0.5 },
    { path: "/security", changeFrequency: "yearly", priority: 0.5 },
  ]

  return routes.map(({ path, changeFrequency, priority }) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }))
}
