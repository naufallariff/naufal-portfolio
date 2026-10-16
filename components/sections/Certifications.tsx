"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Award, ArrowUpRight } from "lucide-react";

export function Certifications() {
    const t = useTranslations("Certifications");

    const certs = [
        { key: "ibm", year: "2025" },
        { key: "gamelab", year: "2024" },
        { key: "infinite", year: "2023" }
    ];

    return (
        <section id="certifications" className="relative z-10 w-full max-w-6xl mx-auto px-6 py-16">
            <div className="flex flex-col md:flex-row gap-10 md:gap-16 items-start">

                {/* Bagian Judul Sisi Kiri */}
                <div className="md:w-1/3 md:sticky md:top-28">
                    <span className="px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-amber-500/10 text-amber-600 dark:text-amber-400 mb-4 border border-amber-500/20 inline-block">
                        {t("sectionTag")}
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white mt-3 leading-tight">
                        {t("sectionTitle")}
                    </h2>
                </div>

                {/* Daftar Kartu Sertifikasi Sisi Kanan */}
                <div className="md:w-2/3 flex flex-col gap-4 w-full">
                    {certs.map((cert, index) => (
                        <motion.div
                            key={cert.key}
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-30px" }}
                            transition={{ type: "spring", damping: 25, stiffness: 120, delay: index * 0.08 }}
                            className="flex items-center justify-between p-6 md:p-8 rounded-3xl apple-glass shadow-apple-card hover:shadow-apple-glass transition-all duration-300 group cursor-pointer relative overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-linear-to-r from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                            <div className="flex items-center gap-5 relative z-10">
                                <div className="w-12 h-12 shrink-0 flex items-center justify-center rounded-2xl bg-amber-500/10 text-amber-500 group-hover:scale-110 transition-transform duration-300">
                                    <Award className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900 dark:text-white text-base md:text-lg leading-snug">
                                        {t(`items.${cert.key}`)}
                                    </h4>
                                    <p className="text-xs font-semibold tracking-wider uppercase text-slate-500 dark:text-slate-400 mt-1">
                                        Issued {cert.year}
                                    </p>
                                </div>
                            </div>

                            <div className="w-10 h-10 shrink-0 flex items-center justify-center rounded-full bg-black/5 dark:bg-white/5 text-slate-400 group-hover:text-amber-500 group-hover:bg-amber-500/10 transition-all duration-300 relative z-10">
                                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                            </div>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
}