"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Target, Code2, GraduationCap, type LucideIcon } from "lucide-react";

// Urutan tampil: spesialisasi dulu
const ITEMS: { id: string; icon: LucideIcon }[] = [
    { id: "qa", icon: Target },
    { id: "web", icon: Code2 },
    { id: "gpa", icon: GraduationCap },
];

export function Metrics() {
    const t = useTranslations("Metrics.items");
    const reduce = useReducedMotion();

    return (
        <section className="relative z-10 mx-auto w-full max-w-5xl px-6 pt-12 md:px-8 md:pt-16 pb-0">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                {ITEMS.map(({ id, icon: Icon }, i) => (
                    <motion.article
                        key={id}
                        initial={reduce ? false : { opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-40px" }}
                        transition={{ type: "spring", damping: 26, stiffness: 120, delay: reduce ? 0 : i * 0.08 }}
                        className="glass-lift apple-glass flex flex-col rounded-4xl p-7 lg:p-8"
                    >
                        <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-apple-electric/10 text-apple-electric">
                            <Icon className="h-6 w-6" strokeWidth={1.8} />
                        </div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                            {t(`${id}.title`)}
                        </p>
                        <h3 className="mt-1.5 text-2xl font-bold tracking-tight text-slate-900 lg:text-3xl dark:text-white">
                            {t(`${id}.value`)}
                        </h3>
                        <p className="mt-3 text-sm leading-relaxed text-slate-600 lg:text-base dark:text-slate-400">
                            {t(`${id}.description`)}
                        </p>
                    </motion.article>
                ))}
            </div>
        </section>
    );
}