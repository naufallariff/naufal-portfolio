"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion, useMotionValue, animate, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, ExternalLink } from "lucide-react";

export type ProjectCategory = "all" | "ai" | "web" | "uiux" | "data";

export type ProjectItem = {
    id: string;
    categoryKey: ProjectCategory;
    titleKey: string;
    categoryKeyTranslation: string;
    descKey: string;
    image: string;
    tags: string[];
};

// Data dipindahkan ke luar render cycle agar referensi tidak terus di-recreate
const RAW_PROJECTS: ProjectItem[] = [
    {
        id: "dialectica",
        categoryKey: "web",
        titleKey: "projects.dialectica.title",
        categoryKeyTranslation: "projects.dialectica.category",
        descKey: "projects.dialectica.desc",
        image: "/images/projects/dialectica-app.jpg",
        tags: ["Next.js", "TypeScript", "AI Gemini", "Web3"]
    },
    {
        id: "lidar",
        categoryKey: "ai",
        titleKey: "projects.lidar.title",
        categoryKeyTranslation: "projects.lidar.category",
        descKey: "projects.lidar.desc",
        image: "/images/projects/semantic-occ.jpg", // PASTIKAN ekstensi (jpg/png/jpeg) sama persis di folder public!
        tags: ["3D LiDAR", "Semantic OCC", "Data QA"]
    },
    {
        id: "ecommerce",
        categoryKey: "web",
        titleKey: "projects.ecommerce.title",
        categoryKeyTranslation: "projects.ecommerce.category",
        descKey: "projects.ecommerce.desc",
        image: "/images/projects/ecommerce-laravel.jpg",
        tags: ["Laravel 12", "Livewire", "MySQL"]
    },
    {
        id: "uwais",
        categoryKey: "data",
        titleKey: "projects.uwais.title",
        categoryKeyTranslation: "projects.uwais.category",
        descKey: "projects.uwais.desc",
        image: "/images/projects/uwais-telur.jpg",
        tags: ["Node.js", "Express", "SQLite", "RAD"]
    },
    {
        id: "kostku",
        categoryKey: "uiux",
        titleKey: "projects.kostku.title",
        categoryKeyTranslation: "projects.kostku.category",
        descKey: "projects.kostku.desc",
        image: "/images/projects/kostku-ui.jpg",
        tags: ["React.js", "Agile", "Project Management"]
    }
];

// Map filter (Pendekatan DRY sesuai standar arsitektur bersih)
const FILTERS: { id: ProjectCategory; labelKey: string }[] = [
    { id: "all", labelKey: "filterAll" },
    { id: "ai", labelKey: "filterAI" },
    { id: "web", labelKey: "filterWeb" },
    { id: "uiux", labelKey: "filterUIUX" },
    { id: "data", labelKey: "filterData" },
];

export function ProjectSlider() {
    const t = useTranslations("Gallery");
    const carouselRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);

    const [activeFilter, setActiveFilter] = useState<ProjectCategory>("all");
    const [dragConstraints, setDragConstraints] = useState({ left: 0, right: 0 });
    const [isHolding, setIsHolding] = useState(false);

    const x = useMotionValue(0);

    const filteredProjects = useMemo(() => {
        if (activeFilter === "all") return RAW_PROJECTS;
        return RAW_PROJECTS.filter((p) => p.categoryKey === activeFilter);
    }, [activeFilter]);

    const updateConstraints = () => {
        if (carouselRef.current && trackRef.current) {
            const containerWidth = carouselRef.current.offsetWidth;
            const trackWidth = trackRef.current.scrollWidth;
            const maxScroll = trackWidth - containerWidth;
            setDragConstraints({ left: maxScroll > 0 ? -maxScroll : 0, right: 0 });
        }
    };

    useEffect(() => {
        updateConstraints();
        window.addEventListener("resize", updateConstraints);
        return () => window.removeEventListener("resize", updateConstraints);
    }, [filteredProjects]);

    const handleFilterChange = (category: ProjectCategory) => {
        setActiveFilter(category);
        animate(x, 0, { type: "spring", stiffness: 300, damping: 30 });
    };

    const handleStepScroll = (direction: "left" | "right") => {
        if (!carouselRef.current) return;
        const currentX = x.get();
        const step = carouselRef.current.offsetWidth * 0.75;
        const targetX = direction === "left" ? currentX + step : currentX - step;

        const clampedX = Math.max(dragConstraints.left, Math.min(0, targetX));
        animate(x, clampedX, { type: "spring", stiffness: 260, damping: 28 });
    };

    return (
        <section id="gallery" className="relative z-10 w-full py-20 overflow-hidden">
            <div className="max-w-6xl mx-auto px-6 mb-12 flex flex-col items-center text-center">
                <span className="px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-apple-electric/10 text-apple-electric mb-4 border border-apple-electric/25">
                    {t("sectionTag")}
                </span>
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white mb-8">
                    {t("sectionTitle")}
                </h2>

                <div className="p-1.5 rounded-full apple-glass shadow-apple-card flex flex-wrap justify-center items-center gap-1 max-w-full">
                    {FILTERS.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => handleFilterChange(tab.id)}
                            className={`relative px-5 py-2 text-xs md:text-sm font-semibold rounded-full transition-colors duration-300 apple-active-scale whitespace-nowrap cursor-pointer ${activeFilter === tab.id
                                    ? "text-slate-900 dark:text-white"
                                    : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
                                }`}
                        >
                            {activeFilter === tab.id && (
                                <motion.div
                                    layoutId="activeGalleryFilter"
                                    className="absolute inset-0 bg-white dark:bg-slate-800 rounded-full shadow-sm -z-10"
                                    transition={{ type: "spring", bounce: 0.15, duration: 0.4 }}
                                />
                            )}
                            {/* Memanggil t() secara dinamis dari map objek, bukan hardcode */}
                            {t(tab.labelKey)}
                        </button>
                    ))}
                </div>
            </div>

            <div ref={carouselRef} className="relative w-full max-w-6xl mx-auto px-6 overflow-hidden">
                <motion.div
                    ref={trackRef}
                    style={{ x }}
                    drag="x"
                    dragConstraints={dragConstraints}
                    dragElastic={0.12}
                    dragTransition={{ power: 0.2, timeConstant: 200 }}
                    onDragStart={() => setIsHolding(true)}
                    onDragEnd={() => setIsHolding(false)}
                    whileTap={{ cursor: "grabbing" }}
                    className="flex gap-6 w-max cursor-grab select-none py-2"
                >
                    <AnimatePresence mode="popLayout">
                        {filteredProjects.map((project) => (
                            <motion.div
                                key={project.id}
                                layout
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: isHolding ? 0.98 : 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                                className="relative flex-none w-[85vw] md:w-120 rounded-4xl apple-glass shadow-apple-card hover:shadow-apple-glass transition-all duration-300 overflow-hidden flex flex-col justify-between"
                            >
                                <div className="relative w-full aspect-video bg-slate-200 dark:bg-slate-800 overflow-hidden pointer-events-none">
                                    <Image
                                        src={project.image}
                                        alt={t(project.titleKey)}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                        sizes="(max-width: 768px) 85vw, 480px"
                                    />
                                    <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-60" />
                                </div>

                                <div className="p-8 flex flex-col justify-between grow">
                                    <div>
                                        <span className="text-xs font-semibold text-apple-electric uppercase tracking-wider">
                                            {t(project.categoryKeyTranslation)}
                                        </span>
                                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-1.5 mb-3 leading-tight">
                                            {t(project.titleKey)}
                                        </h3>
                                        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6">
                                            {t(project.descKey)}
                                        </p>
                                    </div>

                                    <div className="pt-4 border-t border-black/5 dark:border-white/10 flex flex-wrap items-center justify-between gap-4">
                                        <div className="flex flex-wrap gap-2">
                                            {project.tags.map((tag) => (
                                                <span key={tag} className="text-xs px-3 py-1 rounded-md bg-black/5 dark:bg-white/5 text-slate-600 dark:text-slate-400 font-medium">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>

                                        <span className="flex items-center gap-1.5 text-xs font-bold text-slate-900 dark:text-white group-hover:text-apple-electric transition-colors">
                                            Explore <ExternalLink className="w-3.5 h-3.5" />
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                <div className="flex items-center justify-end gap-3 mt-8 px-2">
                    <button
                        onClick={() => handleStepScroll("left")}
                        className="w-11 h-11 flex items-center justify-center rounded-full apple-glass text-slate-700 dark:text-slate-300 hover:text-apple-electric apple-active-scale transition-colors shadow-sm cursor-pointer"
                        aria-label="Previous slide"
                    >
                        <ArrowLeft className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => handleStepScroll("right")}
                        className="w-11 h-11 flex items-center justify-center rounded-full apple-glass text-slate-700 dark:text-slate-300 hover:text-apple-electric apple-active-scale transition-colors shadow-sm cursor-pointer"
                        aria-label="Next slide"
                    >
                        <ArrowRight className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </section>
    );
}