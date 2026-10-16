"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { Briefcase, ChevronDown } from "lucide-react";

type JobType = {
    role: string;
    company: string;
    period: string;
    description: string;
};

// Satu sumber ritme animasi fisik (Apple-like momentum)
const EASE = [0.22, 1, 0.36, 1] as const;
const COLLAPSE = { duration: 0.45, ease: EASE };

// --- Sub-komponen JobCard ---
// Mengontrol garis dan dot-nya sendiri berdasarkan posisinya di urutan timeline.
function JobCard({
    job,
    isFirst,
    isLast,
}: {
    job: JobType;
    isFirst: boolean;
    isLast: boolean;
}) {
    return (
        // mb-8 memastikan ada celah antar kartu (terkecuali kartu terakhir)
        <div className={`relative pl-14 md:pl-24 group ${isLast ? "" : "mb-8"}`}>

            {/* 1. SEGMEN ATAS: Dari puncak kartu (garis batas atas baris ini) turun ke titik dot. 
                Tidak digambar pada kartu urutan pertama agar timeline punya titik mulai (start). */}
            {!isFirst && (
                <div className="absolute left-6 md:left-10 top-0 h-1/2 w-px -translate-x-1/2 bg-black/10 dark:bg-white/10" />
            )}

            {/* 2. SEGMEN BAWAH: Dari titik dot, turun tembus ke bawah melewati margin-bottom (mb-8)
                untuk menyambung ke kartu berikutnya. Tidak digambar di kartu terakhir. */}
            {!isLast && (
                <div className="absolute left-6 md:left-10 top-1/2 -bottom-8 w-px -translate-x-1/2 bg-black/10 dark:bg-white/10" />
            )}

            {/* 3. DOT KARDINAL: Tepat berada di sumbu tengah (vertikal & horizontal) relatif terhadap tinggi container pembungkus */}
            <div className="absolute left-6 md:left-10 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-slate-200 dark:bg-slate-800 border-[2.5px] border-slate-400 dark:border-slate-600 group-hover:border-apple-electric group-hover:bg-apple-electric transition-colors duration-300 z-10" />

            {/* Konten Kartu Utama */}
            <div className="apple-glass p-6 lg:p-8 rounded-3xl shadow-apple-card hover:shadow-apple-glass transition-shadow duration-300 relative overflow-hidden">
                <div className="absolute inset-0 bg-linear-to-r from-apple-electric/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <div className="flex flex-col md:flex-row md:items-start justify-between gap-3 mb-4 relative z-10">
                    <div>
                        <h3 className="text-lg lg:text-xl font-bold text-slate-900 dark:text-white leading-tight">
                            {job.role}
                        </h3>
                        <p className="text-xs lg:text-sm font-semibold text-apple-electric mt-1.5 flex items-center gap-1.5">
                            <Briefcase className="w-3.5 h-3.5" />
                            {job.company}
                        </p>
                    </div>
                    <span className="text-[10px] lg:text-xs font-bold tracking-wider uppercase text-slate-500 dark:text-slate-400 bg-black/5 dark:bg-white/5 px-2.5 py-1 rounded-md whitespace-nowrap self-start">
                        {job.period}
                    </span>
                </div>

                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed relative z-10">
                    {job.description}
                </p>
            </div>
        </div>
    );
}

// --- Komponen Timeline Utama ---
export function Timeline() {
    const t = useTranslations("Experience");
    const allJobs = t.raw("jobs") as JobType[];
    const jobs = allJobs.filter((job) => !job.company.toLowerCase().includes("ibnu jauzi"));

    const visibleJobs = jobs.slice(0, 3);
    const hiddenJobs = jobs.slice(3);
    const hasMore = hiddenJobs.length > 0;

    const [isExpanded, setIsExpanded] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);

    const handleToggle = () => {
        if (isExpanded) {
            sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        }
        setIsExpanded((v) => !v);
    };

    // Ini kunci logikanya: 
    // Blok "kartu pertama (visibleJobs)" menganggap kartu ketiganya (index 2) sebagai "kartu terakhir" 
    // HANYA jika list dalam kondisi tertutup (!isExpanded) ATAU tidak ada hidden list (!hasMore).
    const visibleIsLastBlock = !isExpanded || !hasMore;

    return (
        <section
            ref={sectionRef}
            id="journey"
            className="relative z-10 w-full max-w-4xl mx-auto px-6 py-16 scroll-mt-28"
        >
            <div className="flex flex-col items-center text-center mb-12">
                <span className="px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-apple-electric/10 text-apple-electric mb-4 border border-apple-electric/25">
                    {t("sectionTag")}
                </span>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
                    {t("sectionTitle")}
                </h2>
            </div>

            <div className="relative w-full">
                {/* 
                  1. Mapping barisan pertama (Visible). 
                  Kartu ini selalu dirender berapapun statenya. 
                */}
                {visibleJobs.map((job, i) => (
                    <JobCard
                        key={job.role + job.company}
                        job={job}
                        isFirst={i === 0}
                        isLast={visibleIsLastBlock && i === visibleJobs.length - 1}
                    />
                ))}

                {/* 
                  2. Mapping barisan kedua (Hidden) di bawah kontrol Animasi Framer Motion. 
                  Garis dari visibleJob terakhir akan otomatis menjuntai ke kartu pertama di blok ini
                  karena saat `isExpanded == true`, `isLast` pada visibleJobs index terakhir dicabut. 
                */}
                <AnimatePresence initial={false}>
                    {isExpanded && hasMore && (
                        <motion.div
                            key="more-jobs"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={COLLAPSE}
                            className="overflow-hidden"
                        >
                            {hiddenJobs.map((job, i) => (
                                <JobCard
                                    key={job.role + job.company}
                                    job={job}
                                    isFirst={false} // Selalu false karena merupakan sambungan dari visible list
                                    isLast={i === hiddenJobs.length - 1} // Disinilah garis baru benar-benar terpotong mati
                                />
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Tombol Tampil Lebih Banyak */}
                {hasMore && (
                    <div className="flex justify-center pl-6 md:pl-24 mt-6">
                        <button
                            onClick={handleToggle}
                            className="group flex items-center gap-2 px-6 py-3 rounded-full apple-glass border border-black/10 dark:border-white/10 text-xs md:text-sm font-semibold text-slate-700 dark:text-slate-300 hover:text-apple-electric apple-active-scale transition-colors shadow-sm cursor-pointer"
                        >
                            <span>
                                {isExpanded ? "Collapse Timeline" : `Show More Experience (${hiddenJobs.length})`}
                            </span>
                            <motion.span
                                animate={{ rotate: isExpanded ? 180 : 0 }}
                                transition={COLLAPSE}
                                className="flex"
                            >
                                <ChevronDown className="w-4 h-4" />
                            </motion.span>
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
}