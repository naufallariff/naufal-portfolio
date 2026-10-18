"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useTheme } from "next-themes";
import { usePathname, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { Moon, Sun, Globe, Briefcase, Terminal, Award, Mail, Menu, X } from "lucide-react";

const BRAND = "Naufal Arif";

// Rasio redaman sekitar 1.07, jadi navbar bergerak tanpa memantul
const SPRING = { type: "spring", stiffness: 280, damping: 34, mass: 0.9 } as const;
const REDUCED = { duration: 0.01 } as const;

const HIDE_AFTER_Y = 120;
const DIRECTION_MIN = 6;
const LEAVE_DELAY = 350;

const NAV_ITEMS = [
    { id: "journey", icon: Briefcase, href: "#journey" },
    { id: "stack", icon: Terminal, href: "#stack" },
    { id: "certs", icon: Award, href: "#certifications" },
    { id: "contact", icon: Mail, href: "#contact" },
] as const;

const ICON_BTN =
    "flex h-10 w-10 items-center justify-center rounded-full text-slate-700 transition-colors hover:bg-black/5 apple-active-scale dark:text-slate-300 dark:hover:bg-white/10";

export function NavBar() {
    const { resolvedTheme, setTheme } = useTheme();
    const pathname = usePathname();
    const router = useRouter();
    const t = useTranslations("Navigation");
    const reduce = useReducedMotion();
    const transition = reduce ? REDUCED : SPRING;

    const [isOpen, setIsOpen] = useState(false);
    const [visible, setVisible] = useState(true);

    const isOpenRef = useRef(false);
    const hoverRef = useRef(false);
    const lastYRef = useRef(0);
    const timerRef = useRef(0);

    // Navbar tampil saat terlihat atau saat menu mobile terbuka
    const shown = visible || isOpen;

    const show = useCallback(() => {
        window.clearTimeout(timerRef.current);
        setVisible(true);
    }, []);

    const hide = useCallback(() => {
        if (hoverRef.current || isOpenRef.current) return;
        setVisible(false);
    }, []);

    useEffect(() => {
        isOpenRef.current = isOpen;
    }, [isOpen]);

    // Scroll naik = tampil, turun = sembunyi. Dibatch per frame.
    useEffect(() => {
        let frame = 0;

        const onScroll = () => {
            if (frame) return;
            frame = requestAnimationFrame(() => {
                frame = 0;
                const y = window.scrollY;
                const delta = y - lastYRef.current;
                lastYRef.current = y;

                if (y < HIDE_AFTER_Y || delta < -DIRECTION_MIN) show();
                else if (delta > DIRECTION_MIN) hide();
            });
        };

        window.addEventListener("scroll", onScroll, { passive: true });
        return () => {
            window.removeEventListener("scroll", onScroll);
            cancelAnimationFrame(frame);
            window.clearTimeout(timerRef.current);
        };
    }, [show, hide]);

    // Escape menutup menu mobile
    useEffect(() => {
        if (!isOpen) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") setIsOpen(false);
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [isOpen]);

    const onEnter = () => {
        hoverRef.current = true;
        show();
    };

    const onLeave = () => {
        hoverRef.current = false;
        if (window.scrollY < HIDE_AFTER_Y || isOpenRef.current) return;
        window.clearTimeout(timerRef.current);
        timerRef.current = window.setTimeout(hide, LEAVE_DELAY);
    };

    const toggleLocale = () => {
        const next = pathname.startsWith("/id") ? "en" : "id";
        router.replace(pathname.replace(/^\/(en|id)(?=\/|$)/, `/${next}`));
    };

    return (
        <>
            {/* Pemicu tak terlihat di tepi atas untuk desktop */}
            <div
                aria-hidden
                onPointerEnter={show}
                className="fixed inset-x-0 top-0 z-40 hidden h-6 md:block"
            />

            <motion.header
                initial={false}
                animate={{ y: shown ? 0 : -140, opacity: shown ? 1 : 0, scale: shown ? 1 : 0.98 }}
                transition={transition}
                onPointerEnter={onEnter}
                onPointerLeave={onLeave}
                className={`fixed left-1/2 top-4 z-50 w-[92%] max-w-4xl -translate-x-1/2 will-change-transform ${shown ? "pointer-events-auto" : "pointer-events-none"
                    }`}
            >
                <nav className="apple-glass flex items-center justify-between rounded-full py-2.5 pl-2.5 pr-3 md:px-5 md:py-3">
                    <a
                        href="#home"
                        aria-label={BRAND}
                        className="flex items-center gap-2.5 rounded-full py-1 pl-1 pr-3 transition-colors hover:bg-black/5 apple-active-scale dark:hover:bg-white/10"
                    >
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-apple-electric text-[11px] font-bold tracking-tight text-white">
                            NA
                        </span>
                        <span className="hidden text-sm font-semibold tracking-tight text-slate-900 sm:block dark:text-white">
                            {BRAND}
                        </span>
                    </a>

                    <div className="hidden items-center gap-1 rounded-full bg-black/5 p-1 md:flex dark:bg-white/5">
                        {NAV_ITEMS.map((item) => (
                            <a
                                key={item.id}
                                href={item.href}
                                className="rounded-full px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-white/70 hover:text-apple-electric dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white"
                            >
                                {t(item.id)}
                            </a>
                        ))}
                    </div>

                    <div className="flex items-center gap-1">
                        <button type="button" onClick={toggleLocale} className={ICON_BTN} title={t("switchLang")} aria-label={t("switchLang")}>
                            <Globe className="h-4 w-4" />
                        </button>

                        <button
                            type="button"
                            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
                            className={ICON_BTN}
                            title={t("toggleTheme")}
                            aria-label={t("toggleTheme")}
                        >
                            <Sun className="hidden h-4 w-4 dark:block" />
                            <Moon className="h-4 w-4 dark:hidden" />
                        </button>

                        <button
                            type="button"
                            onClick={() => setIsOpen((v) => !v)}
                            aria-expanded={isOpen}
                            aria-label={t("menu")}
                            className={`${ICON_BTN} md:hidden`}
                        >
                            {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
                        </button>
                    </div>
                </nav>
            </motion.header>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        key="mobile-menu"
                        initial={{ opacity: 0, y: -12, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -12, scale: 0.98 }}
                        transition={transition}
                        className="apple-glass fixed inset-x-4 top-20 z-40 rounded-4xl p-3 md:hidden"
                    >
                        {NAV_ITEMS.map((item) => {
                            const Icon = item.icon;
                            return (
                                <a
                                    key={item.id}
                                    href={item.href}
                                    onClick={() => setIsOpen(false)}
                                    className="flex items-center gap-3 rounded-2xl px-4 py-3.5 text-base font-semibold text-slate-800 transition-colors hover:bg-black/5 dark:text-slate-200 dark:hover:bg-white/10"
                                >
                                    <Icon className="h-5 w-5 text-apple-electric" />
                                    {t(item.id)}
                                </a>
                            );
                        })}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}