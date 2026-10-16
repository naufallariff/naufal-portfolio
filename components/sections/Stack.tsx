"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { BrainCircuit, Code, Database, Award } from "lucide-react";

export function Stack() {
    const t = useTranslations("Stack");

    const stacks = [
        {
            id: "ai",
            title: t("ai.title"),
            desc: t("ai.desc"),
            icon: BrainCircuit,
            color: "text-blue-500",
            colSpan: "md:col-span-2",
        },
        {
            id: "web",
            title: t("web.title"),
            desc: t("web.desc"),
            icon: Code,
            color: "text-emerald-500",
            colSpan: "md:col-span-1",
        },
        {
            id: "data",
            title: t("data.title"),
            desc: t("data.desc"),
            icon: Database,
            color: "text-purple-500",
            colSpan: "md:col-span-1",
        },
        {
            id: "cert",
            title: t("cert.title"),
            desc: t("cert.desc"),
            icon: Award,
            color: "text-amber-500",
            colSpan: "md:col-span-2",
        }
    ];

    return (
        <section id="stack" className="relative z-10 w-full max-w-6xl mx-auto px-6 py-16">
            <div className="flex flex-col items-center text-center mb-12">
                <span className="px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-slate-500/10 text-slate-600 dark:text-slate-400 mb-4 border border-slate-500/20">
                    {t("sectionTag")}
                </span>
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
                    {t("sectionTitle")}
                </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {stacks.map((stack, index) => (
                    <motion.div
                        key={stack.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ type: "spring", damping: 25, stiffness: 120, delay: index * 0.08 }}
                        className={`group relative p-8 rounded-4xl apple-glass shadow-apple-card hover:shadow-apple-glass transition-all duration-500 ${stack.colSpan}`}
                    >
                        <div className="absolute inset-0 bg-white/5 dark:bg-white/0 group-hover:dark:bg-white/5 transition-colors duration-500 rounded-4xl pointer-events-none" />

                        <div className={`w-12 h-12 flex items-center justify-center rounded-2xl bg-black/5 dark:bg-white/10 ${stack.color} mb-6 group-hover:scale-105 transition-transform duration-500`}>
                            <stack.icon className="w-6 h-6" />
                        </div>

                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                            {stack.title}
                        </h3>
                        <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base leading-relaxed">
                            {stack.desc}
                        </p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}