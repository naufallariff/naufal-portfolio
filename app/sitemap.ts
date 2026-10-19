import type { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://naufalarif.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
    const lastModified = new Date();
    const languages = { en: `${SITE_URL}/en`, id: `${SITE_URL}/id` };

    return [
        {
            url: `${SITE_URL}/en`,
            lastModified,
            changeFrequency: "monthly",
            priority: 1,
            alternates: { languages },
        },
        {
            url: `${SITE_URL}/id`,
            lastModified,
            changeFrequency: "monthly",
            priority: 0.9,
            alternates: { languages },
        },
    ];
}