"use client";

import { motion } from "framer-motion";
import { GraduationCap, Target, Code2 } from "lucide-react";
import { useTranslations } from "next-intl";

export function Metrics() {
    const t = useTranslations("Metrics.items");

    const metricsConfig = [
        {
            id: "gpa",
            icon: GraduationCap,
            color: "text-blue-500",
            delay: 0.1,
        },
        {
            id: "qa",
            icon: Target,
            color: "text-emerald-500",
            delay: 0.2,
        },
        {
            id: "web",
            icon: Code2,
            color: "text-purple-500",
            delay: 0.3,
        }
    ];

    return (
        <section className="relative z-10 w-full max-w-6xl mx-auto px-6 py-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {metricsConfig.map((metric) => (
                    <motion.div
                        key={metric.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-20px" }}
                        transition={{ type: "spring", damping: 25, stiffness: 120, delay: metric.delay }}
                        className="group relative flex flex-col p-6 lg:p-8 rounded-4xl apple-glass shadow-apple-card hover:shadow-apple-glass transition-all duration-500 overflow-hidden"
                    >
                        <div className="absolute -inset-px bg-linear-to-b from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-4xl pointer-events-none" />

                        <div className={`w-12 h-12 flex items-center justify-center rounded-2xl bg-black/5 dark:bg-white/10 ${metric.color} mb-5 group-hover:scale-105 transition-transform duration-500`}>
                            <metric.icon className="w-6 h-6" />
                        </div>

                        <h3 className="text-2xl lg:text-3xl font-bold tracking-tight text-slate-900 dark:text-white mb-1.5">
                            {t(`${metric.id}.value`)}
                        </h3>
                        <p className="text-xs font-semibold tracking-wide text-slate-500 dark:text-slate-400 uppercase mb-3">
                            {t(`${metric.id}.title`)}
                        </p>
                        <p className="text-sm lg:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
                            {t(`${metric.id}.description`)}
                        </p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}