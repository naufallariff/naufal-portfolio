"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ArrowRight, Download } from "lucide-react";
import Image from "next/image";

export function Hero() {
    const t = useTranslations("Hero");

    const handleScrollToGallery = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const target = document.querySelector("#gallery");
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section id="home" className="relative flex items-center justify-center min-h-[82vh] px-6 pt-32 pb-8 overflow-hidden max-w-6xl mx-auto">
            {/* Background Glow - Linter Fix: Menggunakan canonical class w-125 h-125 untuk 500px */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-apple-electric/15 dark:bg-apple-navy/30 rounded-full blur-[140px] -z-10 pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center w-full">

                {/* Kolom Kiri: Foto Profil (Diperbesar Skalanya) */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8, x: -30 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    transition={{ type: "spring", damping: 20, stiffness: 100 }}
                    className="lg:col-span-5 flex justify-center lg:justify-start relative z-10"
                >
                    <div className="relative group">
                        {/* Glow Hover Effect di belakang foto */}
                        <div className="absolute inset-0 bg-apple-electric/30 blur-3xl rounded-full scale-110 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                        
                        {/* 
                            Frame Kaca (Apple Glass) diperbesar secara bertahap (Responsive):
                            Mobile: 18rem (288px)
                            Tablet: 20rem (320px)
                            Desktop: 24rem (384px)
                        */}
                        <div className="relative w-72 h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-[2.5rem] overflow-hidden apple-glass shadow-apple-glass p-2.5 apple-active-scale cursor-pointer">
                            <div className="relative w-full h-full rounded-[2.1rem] overflow-hidden bg-slate-200 dark:bg-slate-800 flex items-center justify-center">
                                <Image
                                    src="/images/profile/profile1.jpeg"
                                    alt="Muhammad Naufal Arif"
                                    width={500}
                                    height={500}
                                    // Posisikan object center sedikit ke atas (20%) agar komposisi wajah pas
                                    className="object-cover object-[center_20%] w-full h-full transition-transform duration-700 group-hover:scale-105"
                                    priority
                                />
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Kolom Kanan: Teks & Informasi */}
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ type: "spring", damping: 20, delay: 0.1, stiffness: 100 }}
                    className="lg:col-span-7 flex flex-col items-start text-left relative z-10"
                >
                    {/* Status Badge */}
                    <div className="mb-5 inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full apple-glass border border-black/5 dark:border-white/10 shadow-sm">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                            {t("badge")}
                        </span>
                    </div>

                    {/* Headline */}
                    <h1 className="font-semibold text-4xl md:text-5xl lg:text-6xl xl:text-7xl tracking-[-0.03em] leading-[1.08] text-slate-900 dark:text-white transition-colors duration-500">
                        {t("titlePrefix")}<span className="text-apple-electric">{t("titleHighlight")}</span>{t("titleSuffix")}
                    </h1>

                    {/* Subtitle */}
                    <p className="mt-5 text-base md:text-lg lg:text-xl text-slate-600 dark:text-slate-400 leading-relaxed font-normal max-w-2xl">
                        {t("subtitle")}
                    </p>

                    {/* CTA Buttons */}
                    <div className="mt-8 flex flex-wrap items-center gap-4">
                        <button
                            onClick={handleScrollToGallery}
                            className="group flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold text-sm md:text-base apple-active-scale transition-all hover:opacity-90 shadow-lg cursor-pointer"
                        >
                            {t("btnExplore")}
                            <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1.5 transition-transform" />
                        </button>

                        <a
                            href="/docs/cv-naufal.pdf"
                            download="CV-Muhammad-Naufal-Arif.pdf"
                            className="group flex items-center justify-center gap-2 px-7 py-3.5 rounded-full apple-glass border border-black/10 dark:border-white/10 font-semibold text-sm md:text-base text-slate-800 dark:text-slate-200 apple-active-scale transition-all hover:bg-black/5 dark:hover:bg-white/10 shadow-sm"
                        >
                            <Download className="w-4 h-4 md:w-5 md:h-5 text-slate-500 dark:text-slate-400 group-hover:-translate-y-0.5 transition-transform" />
                            {t("btnDownload")}
                        </a>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}