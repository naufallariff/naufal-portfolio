import Link from "next/link";
import { getLocale, getTranslations } from "next-intl/server";

export default async function NotFound() {
    const locale = await getLocale();
    const t = await getTranslations("NotFound");

    return (
        <section className="mx-auto flex min-h-[70svh] w-full max-w-2xl flex-col items-center justify-center px-6 pb-20 pt-36 text-center">
            <p className="text-sm font-semibold tracking-wider text-apple-electric">404</p>
            <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl dark:text-white">
                {t("title")}
            </h1>
            <p className="mt-4 text-base text-slate-600 dark:text-slate-400">{t("description")}</p>
            <Link
                href={`/${locale}`}
                className="apple-glass apple-active-scale mt-10 inline-flex rounded-full px-7 py-3.5 text-sm font-semibold text-slate-800 dark:text-slate-200"
            >
                {t("back")}
            </Link>
        </section>
    );
}