"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { Moon, Sun, Globe, Briefcase, Terminal, Award, Mail, Menu, X } from "lucide-react";

const SPRING = { type: "spring", stiffness: 280, damping: 34, mass: 0.9 } as const;
const HIDE_AFTER_Y = 120;
const DIRECTION_MIN = 6;
const LEAVE_DELAY = 350;

const NAV_ITEMS = [
    { id: "journey", icon: Briefcase, href: "#journey" },
    // { id: "gallery", icon: LayoutGrid, href: "#gallery" },
    { id: "stack", icon: Terminal, href: "#stack" },
    { id: "certs", icon: Award, href: "#certifications" },
    { id: "contact", icon: Mail, href: "#contact" },
] as const;

export function NavBar() {
    const { theme, setTheme } = useTheme();
    const pathname = usePathname();
    const t = useTranslations("Navigation");
    const reduce = useReducedMotion();

    const [isOpen, setIsOpen] = useState(false);
    const [visible, setVisible] = useState(true);

    const isOpenRef = useRef(false);
    const hoveringRef = useRef(false);
    const lastYRef = useRef(0);
    const leaveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    // Sinkronkan ref tanpa setState. Ini tidak memicu render ulang.
    useEffect(() => {
        isOpenRef.current = isOpen;
    }, [isOpen]);

    // Navbar dianggap tampil saat terlihat ATAU saat menu mobile terbuka.
    const shown = visible || isOpen;

    const clearLeaveTimer = useCallback(() => {
        if (leaveTimerRef.current) {
            clearTimeout(leaveTimerRef.current);
            leaveTimerRef.current = null;
        }
    }, []);

    const show = useCallback(() => {
        clearLeaveTimer();
        setVisible(true);
    }, [clearLeaveTimer]);

    const hide = useCallback(() => {
        if (hoveringRef.current || isOpenRef.current) return;
        setVisible(false);
    }, []);

    // Scroll: naik = muncul, turun = sembunyi. Dibatch per frame.
    useEffect(() => {
        let frame = 0;

        const onScroll = () => {
            if (frame) return;
            frame = requestAnimationFrame(() => {
                frame = 0;
                const y = window.scrollY;
                const delta = y - lastYRef.current;
                lastYRef.current = y;

                if (y < HIDE_AFTER_Y || delta < -DIRECTION_MIN) {
                    show();
                } else if (delta > DIRECTION_MIN) {
                    hide();
                }
            });
        };

        window.addEventListener("scroll", onScroll, { passive: true });
        return () => {
            window.removeEventListener("scroll", onScroll);
            if (frame) cancelAnimationFrame(frame);
            clearLeaveTimer();
        };
    }, [show, hide, clearLeaveTimer]);

    const onHeaderEnter = () => {
        hoveringRef.current = true;
        show();
    };

    const onHeaderLeave = () => {
        hoveringRef.current = false;
        if (window.scrollY < HIDE_AFTER_Y || isOpenRef.current) return;
        clearLeaveTimer();
        leaveTimerRef.current = setTimeout(hide, LEAVE_DELAY);
    };

    const switchLanguage = () => {
        if (!pathname) return;
        const currentLocale = pathname.startsWith("/id") ? "id" : "en";
        const nextLocale = currentLocale === "en" ? "id" : "en";
        window.location.href = pathname.replace(`/${currentLocale}`, `/${nextLocale}`);
    };

    const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        setIsOpen(false);
        document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    };

    const transition = reduce ? { duration: 0.01 } : SPRING;

    return (
        <>
            <div
                aria-hidden="true"
                onPointerEnter={show}
                className="fixed inset-x-0 top-0 z-40 h-6 hidden md:block"
            />

            <motion.header
                initial={false}
                animate={{
                    y: shown ? 0 : -140,
                    opacity: shown ? 1 : 0,
                    scale: shown ? 1 : 0.98,
                }}
                transition={transition}
                onPointerEnter={onHeaderEnter}
                onPointerLeave={onHeaderLeave}
                className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-4xl will-change-transform ${
                    shown ? "pointer-events-auto" : "pointer-events-none"
                }`}
            >
                <nav className="flex items-center justify-between px-5 py-3 rounded-full apple-glass shadow-lg backdrop-blur-2xl">
                    <a
                        href="#home"
                        onClick={(e) => handleNav(e, "#home")}
                        className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-black/5 dark:bg-white/10 apple-active-scale transition-colors hover:bg-black/10 dark:hover:bg-white/20"
                    >
                        <span className="w-3 h-3 rounded-full bg-apple-electric animate-pulse" />
                        <span className="font-bold text-sm tracking-tight text-slate-900 dark:text-white">NA</span>
                    </a>

                    <div className="hidden md:flex items-center gap-1.5 bg-black/5 dark:bg-white/5 rounded-full px-2.5 py-1">
                        {NAV_ITEMS.map((item) => (
                            <a
                                key={item.id}
                                href={item.href}
                                onClick={(e) => handleNav(e, item.href)}
                                className="px-4 py-2 text-sm font-medium rounded-full text-slate-700 dark:text-slate-300 hover:text-apple-electric dark:hover:text-white hover:bg-white/60 dark:hover:bg-white/10 apple-active-scale transition-all duration-300"
                            >
                                {t(item.id)}
                            </a>
                        ))}
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={switchLanguage}
                            className="w-10 h-10 flex items-center justify-center rounded-full text-slate-700 dark:text-slate-300 hover:bg-black/5 dark:hover:bg-white/10 apple-active-scale transition-colors cursor-pointer"
                            title="Switch Language"
                        >
                            <Globe className="w-4 h-4" />
                        </button>

                        <button
                            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                            className="w-10 h-10 flex items-center justify-center rounded-full text-slate-700 dark:text-slate-300 hover:bg-black/5 dark:hover:bg-white/10 apple-active-scale transition-colors cursor-pointer"
                            title="Toggle Theme"
                        >
                            <Sun className="w-4 h-4 hidden dark:block" />
                            <Moon className="w-4 h-4 block dark:hidden" />
                        </button>

                        <button
                            onClick={() => setIsOpen((v) => !v)}
                            className="md:hidden w-10 h-10 flex items-center justify-center rounded-full bg-black/5 dark:bg-white/10 text-slate-800 dark:text-slate-200 apple-active-scale cursor-pointer"
                            aria-label="Toggle Menu"
                        >
                            {isOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
                        </button>
                    </div>
                </nav>
            </motion.header>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.98 }}
                        transition={transition}
                        className="fixed inset-x-4 top-20 z-40 md:hidden apple-glass rounded-3xl p-6 shadow-2xl border border-black/10 dark:border-white/10 backdrop-blur-3xl"
                    >
                        <div className="flex flex-col gap-2">
                            {NAV_ITEMS.map((item) => (
                                <a
                                    key={item.id}
                                    href={item.href}
                                    onClick={(e) => handleNav(e, item.href)}
                                    className="flex items-center gap-3 px-4 py-3 rounded-2xl text-base font-semibold text-slate-800 dark:text-slate-200 hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                                >
                                    <item.icon className="w-5 h-5 text-apple-electric" />
                                    {t(item.id)}
                                </a>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}