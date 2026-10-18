"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { BrainCircuit, Code, Database, Workflow, type LucideIcon } from "lucide-react";
import { SectionHeader } from "../ui/SectionHeader";

const ITEMS: { id: string; icon: LucideIcon; span: string }[] = [
    { id: "ai", icon: BrainCircuit, span: "md:col-span-2" },
    { id: "web", icon: Code, span: "md:col-span-1" },
    { id: "data", icon: Database, span: "md:col-span-1" },
    { id: "cert", icon: Workflow, span: "md:col-span-2" },
];

export function Stack() {
    const t = useTranslations("Stack");
    const reduce = useReducedMotion();

    return (
        <section id="stack" className="relative z-10 mx-auto w-full max-w-5xl px-6 pt-20 md:px-8 md:pt-28 pb-0">
            <SectionHeader tag={t("sectionTag")} title={t("sectionTitle")} />

            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                {ITEMS.map(({ id, icon: Icon, span }, i) => (
                    <motion.div
                        key={id}
                        initial={reduce ? false : { opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ type: "spring", damping: 26, stiffness: 120, delay: reduce ? 0 : i * 0.06 }}
                        className={`glass-lift apple-glass group rounded-4xl p-7 md:p-8 ${span}`}
                    >
                        <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-black/5 text-apple-electric transition-transform duration-500 group-hover:scale-105 dark:bg-white/10">
                            <Icon className="h-6 w-6" strokeWidth={1.8} />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white">{t(`${id}.title`)}</h3>
                        <p className="mt-2 text-sm leading-relaxed text-slate-600 md:text-base dark:text-slate-400">
                            {t(`${id}.desc`)}
                        </p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}