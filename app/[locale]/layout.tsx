import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

import "../globals.css";
import { ThemeProvider } from "../../components/ThemeProvider";
import { NavBar } from "../../components/ui/NavBar";
import { AmbientBackground } from "@/components/ui/AmbientBackground";
import { Analytics } from "@vercel/analytics/next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://naufal.dev";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const title = "Muhammad Naufal Arif | Software Engineer & Data QA";
  const description =
    locale === "id"
      ? "Portofolio Muhammad Naufal Arif. Saya membangun aplikasi web dan bekerja di bidang Data QA untuk sistem AI."
      : "Portfolio of Muhammad Naufal Arif. I build web applications and work in AI Data QA.";

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    authors: [{ name: "Muhammad Naufal Arif" }],
    keywords: ["Naufal Arif", "Muhammad Naufal Arif", "Software Engineer", "Data QA", "Next.js Developer"],
    alternates: {
      canonical: `/${locale}`,
      languages: { en: "/en", id: "/id" },
    },
    openGraph: {
      title,
      description,
      url: `/${locale}`,
      siteName: "Muhammad Naufal Arif",
      locale: locale === "id" ? "id_ID" : "en_US",
      type: "profile",
    },
    twitter: { card: "summary_large_image", title, description },
    robots: { index: true, follow: true },
    verification: {
      google: "KnAYFd12cNlngcBiogQilO-i8Xncig6f5iaBIf2b3c8",
    },
  };
}

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
    <html lang={locale} suppressHydrationWarning>
      <body
        className="antialiased min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 selection:bg-apple-electric/30 transition-colors duration-500"
        suppressHydrationWarning
      >
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange={false}
          >
            <AmbientBackground />
            <NavBar />
            <main className="flex flex-col items-center w-full overflow-x-hidden relative z-10">
              {children}
              <Analytics />
            </main>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}