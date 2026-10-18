import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { Analytics } from "@vercel/analytics/next";

import "../globals.css";
import { ThemeProvider } from "../../components/ThemeProvider";
import { NavBar } from "../../components/ui/NavBar";
import { AmbientBackground } from "@/components/ui/AmbientBackground";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://naufalarif.vercel.app";
const NAME = "Muhammad Naufal Arif";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Meta" });
  const title = t("title");
  const description = t("description");

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    authors: [{ name: NAME }],
    alternates: {
      canonical: `/${locale}`,
      languages: { en: "/en", id: "/id", "x-default": "/en" },
    },
    openGraph: {
      title,
      description,
      url: `/${locale}`,
      siteName: NAME,
      locale: locale === "id" ? "id_ID" : "en_US",
      type: "profile",
    },
    twitter: { card: "summary_large_image", title, description },
    robots: { index: true, follow: true },
    verification: { google: "KnAYFd12cNlngcBiogQilO-i8Xncig6f5iaBIf2b3c8" },
  };
}

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: NAME,
  alternateName: ["Naufal Arif", "M. Naufal Arif"],
  url: SITE_URL,
  jobTitle: "Quality Assurance Specialist",
  knowsAbout: ["Quality Assurance", "Data QA", "AI Data Annotation", "Next.js", "Web Development"],
  sameAs: [
    "https://www.linkedin.com/in/muhammadnaufalarif/",
    "https://github.com/naufallariff",
  ],
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  const messages = await getMessages({ locale });

  return (
    <html lang={locale} data-scroll-behavior="smooth" suppressHydrationWarning>
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
            <AmbientBackground />
            <NavBar />
            <main className="relative z-10 flex w-full flex-col items-center">{children}</main>
          </ThemeProvider>
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  );
}