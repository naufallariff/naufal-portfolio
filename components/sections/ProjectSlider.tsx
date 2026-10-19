"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion, useMotionValue, animate, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import { SectionHeader } from "../ui/SectionHeader";

type Category = "all" | "ai" | "web" | "uiux" | "data";
type Project = { id: string; category: Exclude<Category, "all">; image: string };

// Gambar harus ada di public/images/projects/ dengan nama yang sama persis.
const PROJECTS: Project[] = [
    { id: "lidar", category: "ai", image: "/images/projects/semantic-occ.jpg" },
    { id: "dialectica", category: "web", image: "/images/projects/dialectica-app.jpg" },
    { id: "ecommerce", category: "web", image: "/images/projects/ecommerce-laravel.jpg" },
    { id: "uwais", category: "data", image: "/images/projects/uwais-telur.jpg" },
    { id: "kostku", category: "uiux", image: "/images/projects/kostku-ui.jpg" },
];

const FILTERS: { id: Category; labelKey: string }[] = [
    { id: "all", labelKey: "filterAll" },
    { id: "ai", labelKey: "filterAI" },
    { id: "web", labelKey: "filterWeb" },
    { id: "uiux", labelKey: "filterUIUX" },
    { id: "data", labelKey: "filterData" },
];

const SPRING = { type: "spring", damping: 26, stiffness: 180 } as const;
const STEP_RATIO = 0.75;

export function ProjectSlider() {
    const t = useTranslations("Gallery");
    const viewportRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);

    const [filter, setFilter] = useState<Category>("all");
    const [constraints, setConstraints] = useState({ left: 0, right: 0 });
    const [dragging, setDragging] = useState(false);

    const items = useMemo(
        () => (filter === "all" ? PROJECTS : PROJECTS.filter((p) => p.category === filter)),
        [filter],
    );

    // Ukur batas geser saat mount, saat filter berubah, dan saat ukuran berubah.
    useEffect(() => {
        const measure = () => {
            const view = viewportRef.current;
            const track = trackRef.current;
            if (!view || !track) return;
            const max = Math.max(0, track.scrollWidth - view.clientWidth);
            setConstraints({ left: -max, right: 0 });
        };

        const frame = requestAnimationFrame(measure);
        const observer = new ResizeObserver(measure);
        if (viewportRef.current) observer.observe(viewportRef.current);
        if (trackRef.current) observer.observe(trackRef.current);

        return () => {
            cancelAnimationFrame(frame);
            observer.disconnect();
        };
    }, [items]);

    const changeFilter = (next: Category) => {
        setFilter(next);
        animate(x, 0, SPRING);
    };

    const go = (dir: "prev" | "next") => {
        const view = viewportRef.current;
        if (!view) return;
        const delta = view.clientWidth * STEP_RATIO;
        const target = dir === "prev" ? x.get() + delta : x.get() - delta;
        animate(x, Math.min(0, Math.max(constraints.left, target)), SPRING);
    };

    return (
        <section id="gallery" className="relative z-10 w-full pt-20 md:pt-28">
            <div className="mx-auto max-w-6xl px-6 md:px-8">
                <SectionHeader tag={t("sectionTag")} title={t("sectionTitle")} />

                <div className="-mt-6 mb-10 flex justify-center">
                    <div className="apple-glass flex max-w-full flex-wrap justify-center gap-1 rounded-full p-1.5">
                        {FILTERS.map((f) => {
                            const active = filter === f.id;
                            return (
                                <button
                                    key={f.id}
                                    type="button"
                                    aria-pressed={active}
                                    onClick={() => changeFilter(f.id)}
                                    className={`relative whitespace-nowrap rounded-full px-5 py-2 text-xs font-semibold transition-colors md:text-sm apple-active-scale ${active
                                            ? "text-slate-900 dark:text-white"
                                            : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
                                        }`}
                                >
                                    {active && (
                                        <motion.span
                                            layoutId="gallery-filter"
                                            className="absolute inset-0 -z-10 rounded-full bg-white shadow-sm dark:bg-slate-800"
                                            transition={SPRING}
                                        />
                                    )}
                                    {t(f.labelKey)}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>

            <div ref={viewportRef} className="overflow-hidden">
                <motion.div
                    ref={trackRef}
                    style={{ x }}
                    drag="x"
                    dragConstraints={constraints}
                    dragElastic={0.12}
                    dragTransition={{ power: 0.2, timeConstant: 200 }}
                    onDragStart={() => setDragging(true)}
                    onDragEnd={() => setDragging(false)}
                    className="touch-pan-y flex w-max cursor-grab gap-6 px-6 py-4 select-none active:cursor-grabbing md:px-8"
                >
                    <AnimatePresence mode="popLayout">
                        {items.map((p) => {
                            const title = t(`projects.${p.id}.title`);
                            const tags = t.raw(`projects.${p.id}.tags`) as string[];

                            return (
                                <motion.article
                                    key={p.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.96 }}
                                    animate={{ opacity: 1, scale: dragging ? 0.985 : 1 }}
                                    exit={{ opacity: 0, scale: 0.96 }}
                                    transition={SPRING}
                                    className="glass-lift apple-glass group flex w-[85vw] flex-none flex-col overflow-hidden rounded-4xl md:w-120"
                                >
                                    <div className="relative aspect-video w-full overflow-hidden bg-slate-200 dark:bg-slate-800">
                                        <Image
                                            src={p.image}
                                            alt={title}
                                            fill
                                            draggable={false}
                                            sizes="(max-width: 768px) 85vw, 480px"
                                            className="object-cover transition-transform duration-700 ease-apple group-hover:scale-105"
                                        />
                                    </div>

                                    <div className="flex flex-1 flex-col justify-between gap-6 p-7 md:p-8">
                                        <div>
                                            <p className="text-xs font-semibold uppercase tracking-wider text-apple-electric">
                                                {t(`projects.${p.id}.category`)}
                                            </p>
                                            <h3 className="mb-3 mt-1.5 text-2xl font-bold leading-tight text-slate-900 dark:text-white">
                                                {title}
                                            </h3>
                                            <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                                                {t(`projects.${p.id}.desc`)}
                                            </p>
                                        </div>

                                        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-black/5 pt-4 dark:border-white/10">
                                            <div className="flex flex-wrap gap-2">
                                                {tags.map((tag) => (
                                                    <span
                                                        key={tag}
                                                        className="rounded-md bg-black/5 px-3 py-1 text-xs font-medium text-slate-600 dark:bg-white/5 dark:text-slate-400"
                                                    >
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>

                                            <span className="flex items-center gap-1.5 text-xs font-bold text-slate-900 transition-colors group-hover:text-apple-electric dark:text-white">
                                                {t("explore")}
                                                <ExternalLink className="h-3.5 w-3.5" />
                                            </span>
                                        </div>
                                    </div>
                                </motion.article>
                            );
                        })}
                    </AnimatePresence>
                </motion.div>
            </div>

            <div className="mx-auto mt-8 flex max-w-6xl justify-end gap-3 px-6 md:px-8">
                <button
                    type="button"
                    aria-label="Previous"
                    onClick={() => go("prev")}
                    className="apple-glass flex h-11 w-11 items-center justify-center rounded-full text-slate-700 transition-colors hover:text-apple-electric apple-active-scale dark:text-slate-300"
                >
                    <ArrowLeft className="h-4 w-4" />
                </button>
                <button
                    type="button"
                    aria-label="Next"
                    onClick={() => go("next")}
                    className="apple-glass flex h-11 w-11 items-center justify-center rounded-full text-slate-700 transition-colors hover:text-apple-electric apple-active-scale dark:text-slate-300"
                >
                    <ArrowRight className="h-4 w-4" />
                </button>
            </div>
        </section>
    );
}