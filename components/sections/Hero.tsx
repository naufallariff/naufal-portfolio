"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { ArrowRight, Download } from "lucide-react";

const spring = (delay = 0) => ({ type: "spring" as const, damping: 26, stiffness: 140, delay });

export function Hero() {
    const t = useTranslations("Hero");
    const reduce = useReducedMotion();

    const reveal = (delay: number) => ({
        initial: reduce ? false : { opacity: 0, y: 18 },
        animate: { opacity: 1, y: 0 },
        transition: reduce ? { duration: 0 } : spring(delay),
    });

    return (
        <section
            id="home"
            className="relative mx-auto flex min-h-[88svh] w-full max-w-5xl items-center overflow-hidden px-6 pb-8 pt-32 md:px-8 md:pt-36"
        >
            <div
                aria-hidden
                className="pointer-events-none absolute left-1/2 top-1/2 -z-10 size-128 -translate-x-1/2 -translate-y-1/2 rounded-full bg-apple-electric/15 blur-[140px] dark:bg-apple-navy/35"
            />

            <div className="grid w-full grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
                <motion.div {...reveal(0)} className="flex justify-center lg:col-span-5 lg:justify-start">
                    <div className="group relative h-64 w-64 sm:h-72 sm:w-72 md:h-80 md:w-80 lg:h-104 lg:w-104">
                        <div
                            aria-hidden
                            className="absolute inset-6 rounded-full bg-apple-electric/30 opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-100"
                        />
                        <div className="apple-glass apple-active-scale relative h-full w-full rounded-5xl p-2.5">
                            <div className="relative h-full w-full overflow-hidden rounded-[2.1rem] bg-slate-200 dark:bg-slate-800">
                                <Image
                                    src="/images/profile/profile1.jpeg"
                                    alt={t("name")}
                                    fill
                                    priority
                                    sizes="(min-width: 1024px) 26rem, (min-width: 640px) 18rem, 16rem"
                                    className="object-cover object-[center_20%] transition-transform duration-700 ease-apple group-hover:scale-105"
                                />
                            </div>
                        </div>
                    </div>
                </motion.div>

                <motion.div {...reveal(0.08)} className="flex flex-col items-start lg:col-span-7">
                    <span className="apple-glass mb-6 inline-flex items-center gap-2.5 rounded-full px-4 py-1.5">
                        <span className="relative flex h-2 w-2">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60" />
                            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                        </span>
                        <span className="text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                            {t("badge")}
                        </span>
                    </span>

                    <h1 className="text-[2.6rem] font-semibold leading-[1.04] tracking-[-0.035em] text-slate-900 sm:text-6xl lg:text-7xl dark:text-white">
                        {t("name")}
                    </h1>

                    <p className="mt-4 text-lg font-medium text-apple-electric md:text-xl">{t("role")}</p>

                    <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-600 md:text-lg dark:text-slate-400">
                        {t("about")}
                    </p>

                    <div className="mt-10 flex flex-wrap items-center gap-3">
                        <a
                            href="#journey"
                            className="group inline-flex items-center gap-2 rounded-full bg-slate-900 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-slate-900/20 transition-opacity hover:opacity-90 apple-active-scale md:text-base dark:bg-white dark:text-slate-900"
                        >
                            {t("btnExplore")}
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </a>

                        <a
                            href="/docs/cv-muhammad-naufal-arif.pdf"
                            download="CV-Muhammad-Naufal-Arif.pdf"
                            className="apple-glass group inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold text-slate-800 transition-colors hover:bg-black/5 apple-active-scale md:text-base dark:text-slate-200 dark:hover:bg-white/10"
                        >
                            <Download className="h-4 w-4 text-slate-500 transition-transform group-hover:-translate-y-0.5 dark:text-slate-400" />
                            {t("btnDownload")}
                        </a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}