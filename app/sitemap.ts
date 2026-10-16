import type { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://naufal.dev";

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        { url: `${SITE_URL}/en`, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
        { url: `${SITE_URL}/id`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    ];
}