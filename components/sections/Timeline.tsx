"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Briefcase, ChevronDown } from "lucide-react";
import { SectionHeader } from "../ui/SectionHeader";

type Job = { role: string; company: string; period: string; description: string };

const EASE = [0.22, 1, 0.36, 1] as const;
const TRANSITION = { duration: 0.45, ease: EASE };
const VISIBLE_COUNT = 3;
const HIDDEN_COMPANY = "ibnu jauzi"; // entri ini disembunyikan dari timeline

function JobCard({ job, isFirst, isLast }: { job: Job; isFirst: boolean; isLast: boolean }) {
    return (
        <div className={`group relative pl-14 md:pl-24 ${isLast ? "" : "mb-8"}`}>
            {/* Garis dari ujung atas baris ke titik dot. Tidak ada di kartu pertama. */}
            {!isFirst && (
                <span className="absolute left-6 top-0 h-1/2 w-px -translate-x-1/2 bg-black/10 md:left-10 dark:bg-white/10" />
            )}
            {/* Garis dari titik dot menembus celah mb-8 ke kartu berikutnya. Tidak ada di kartu terakhir. */}
            {!isLast && (
                <span className="absolute left-6 top-1/2 -bottom-8 w-px -translate-x-1/2 bg-black/10 md:left-10 dark:bg-white/10" />
            )}
            {/* Dot tepat di tengah tinggi kartu */}
            <span className="absolute left-6 top-1/2 z-10 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-[2.5px] border-slate-400 bg-slate-200 transition-colors duration-300 group-hover:border-apple-electric group-hover:bg-apple-electric md:left-10 dark:border-slate-600 dark:bg-slate-800" />

            <article className="apple-glass relative overflow-hidden rounded-3xl p-6 lg:p-8">
                <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 bg-linear-to-r from-apple-electric/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                />

                <div className="relative z-1 mb-4 flex flex-col justify-between gap-3 md:flex-row md:items-start">
                    <div>
                        <h3 className="text-lg font-bold leading-tight text-slate-900 lg:text-xl dark:text-white">
                            {job.role}
                        </h3>
                        <p className="mt-1.5 flex items-center gap-1.5 text-xs font-semibold text-apple-electric lg:text-sm">
                            <Briefcase className="h-3.5 w-3.5" />
                            {job.company}
                        </p>
                    </div>
                    <span className="self-start whitespace-nowrap rounded-md bg-black/5 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-500 lg:text-xs dark:bg-white/5 dark:text-slate-400">
                        {job.period}
                    </span>
                </div>

                <p className="relative z-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                    {job.description}
                </p>
            </article>
        </div>
    );
}

export function Timeline() {
    const t = useTranslations("Experience");
    const jobs = (t.raw("jobs") as Job[]).filter(
        (job) => !job.company.toLowerCase().includes(HIDDEN_COMPANY),
    );

    const visible = jobs.slice(0, VISIBLE_COUNT);
    const hidden = jobs.slice(VISIBLE_COUNT);
    const hasMore = hidden.length > 0;

    const [expanded, setExpanded] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);

    const toggle = () => {
        if (expanded) sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        setExpanded((v) => !v);
    };

    // Kartu ke-3 menjadi kartu terakhir hanya saat blok tambahan tertutup atau tidak ada
    const visibleIsEnd = !expanded || !hasMore;

    return (
        <section
            ref={sectionRef}
            id="journey"
            className="relative z-10 mx-auto w-full max-w-4xl scroll-mt-28 px-6 pt-20 md:px-8 md:pt-28 pb-0"
        >
            <SectionHeader tag={t("sectionTag")} title={t("sectionTitle")} />

            <div className="relative">
                {visible.map((job, i) => (
                    <JobCard
                        key={job.role + job.company}
                        job={job}
                        isFirst={i === 0}
                        isLast={visibleIsEnd && i === visible.length - 1}
                    />
                ))}

                {hasMore && (
                    <motion.div
                        id="experience-more"
                        initial={false}
                        animate={{ height: expanded ? "auto" : 0, opacity: expanded ? 1 : 0 }}
                        transition={TRANSITION}
                        className="overflow-hidden"
                    >
                        {/* inert: saat tertutup, konten tidak bisa difokus atau dibaca screen reader */}
                        <div inert={!expanded}>
                            {hidden.map((job, i) => (
                                <JobCard
                                    key={job.role + job.company}
                                    job={job}
                                    isFirst={false}
                                    isLast={i === hidden.length - 1}
                                />
                            ))}
                        </div>
                    </motion.div>
                )}

                {hasMore && (
                    <div className="mt-6 flex justify-center">
                        <button
                            type="button"
                            onClick={toggle}
                            aria-expanded={expanded}
                            aria-controls="experience-more"
                            className="apple-glass group inline-flex items-center gap-2 rounded-full px-6 py-3 text-xs font-semibold text-slate-700 transition-colors apple-active-scale hover:text-apple-electric md:text-sm dark:text-slate-300"
                        >
                            <span>{expanded ? t("showLess") : t("showMore", { count: hidden.length })}</span>
                            <motion.span
                                animate={{ rotate: expanded ? 180 : 0 }}
                                transition={TRANSITION}
                                className="flex"
                            >
                                <ChevronDown className="h-4 w-4" />
                            </motion.span>
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
}