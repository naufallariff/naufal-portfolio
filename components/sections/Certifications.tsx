"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Award, ArrowUpRight } from "lucide-react";
import { SectionHeader } from "../ui/SectionHeader";

const ITEMS = [
    { key: "ibm", year: "2025" },
    { key: "gamelab", year: "2024" },
    { key: "infinite", year: "2023" },
];

export function Certifications() {
    const t = useTranslations("Certifications");
    const reduce = useReducedMotion();

    return (
        <section id="certifications" className="relative z-10 mx-auto w-full max-w-5xl px-6 pt-20 md:px-8 md:pt-28 pb-0">
            <div className="flex flex-col gap-10 md:flex-row md:gap-16">
                <div className="md:sticky md:top-32 md:w-1/3 md:self-start">
                    <SectionHeader tag={t("sectionTag")} title={t("sectionTitle")} align="left" />
                </div>

                <ul className="flex flex-1 flex-col gap-4">
                    {ITEMS.map(({ key, year }, i) => (
                        <motion.li
                            key={key}
                            initial={reduce ? false : { opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-30px" }}
                            transition={{ type: "spring", damping: 26, stiffness: 120, delay: reduce ? 0 : i * 0.06 }}
                            className="glass-lift apple-glass group flex items-center gap-5 rounded-3xl p-6 md:p-7"
                        >
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-apple-electric/10 text-apple-electric">
                                <Award className="h-6 w-6" strokeWidth={1.8} />
                            </div>

                            <div className="min-w-0 flex-1">
                                <h3 className="text-base font-semibold leading-snug text-slate-900 md:text-lg dark:text-white">
                                    {t(`items.${key}`)}
                                </h3>
                                <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                    {t("issued")} {year}
                                </p>
                            </div>

                            <ArrowUpRight className="h-5 w-5 shrink-0 text-slate-400 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-apple-electric" />
                        </motion.li>
                    ))}
                </ul>
            </div>
        </section>
    );
}