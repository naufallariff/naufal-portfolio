"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { Moon, Sun, Globe, Briefcase, LayoutGrid, Terminal, Award, Mail, Menu, X } from "lucide-react";

export function NavBar() {
    const { theme, setTheme } = useTheme();
    const pathname = usePathname();
    const t = useTranslations("Navigation");
    const [isOpen, setIsOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    // Logika Pintar: Sembunyikan saat scroll ke bawah, Munculkan saat scroll ke atas
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            if (currentScrollY > lastScrollY && currentScrollY > 80) {
                setIsVisible(false); // Scroll Down -> Sembunyi
            } else {
                setIsVisible(true);  // Scroll Up -> Muncul
            }
            setLastScrollY(currentScrollY);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollY]);

    const navItems = [
        { id: "journey", icon: Briefcase, href: "#journey" },
        { id: "gallery", icon: LayoutGrid, href: "#gallery" },
        { id: "stack", icon: Terminal, href: "#stack" },
        { id: "certs", icon: Award, href: "#certifications" },
        { id: "contact", icon: Mail, href: "#contact" },
    ];

    const switchLanguage = () => {
        if (!pathname) return;
        const currentLocale = pathname.startsWith('/id') ? 'id' : 'en';
        const nextLocale = currentLocale === 'en' ? 'id' : 'en';
        window.location.href = pathname.replace(`/${currentLocale}`, `/${nextLocale}`);
    };

    const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, href: string) => {
        e.preventDefault();
        setIsOpen(false);
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <>
            <motion.header
                initial={{ y: 0, opacity: 1 }}
                animate={{ y: isVisible ? 0 : -120, opacity: isVisible ? 1 : 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-4xl pointer-events-auto"
            >
                <nav className="flex items-center justify-between px-5 py-3 rounded-full apple-glass shadow-lg backdrop-blur-2xl">
                    <a
                        href="#home"
                        onClick={(e) => handleScroll(e, "#home")}
                        className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-black/5 dark:bg-white/10 apple-active-scale transition-colors hover:bg-black/10 dark:hover:bg-white/20"
                    >
                        <span className="w-3 h-3 rounded-full bg-apple-electric animate-pulse" />
                        <span className="font-bold text-sm tracking-tight text-slate-900 dark:text-white">NA</span>
                    </a>

                    <div className="hidden md:flex items-center gap-1.5 bg-black/5 dark:bg-white/5 rounded-full px-2.5 py-1">
                        {navItems.map((item) => (
                            <a
                                key={item.id}
                                href={item.href}
                                onClick={(e) => handleScroll(e, item.href)}
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
                            onClick={() => setIsOpen(!isOpen)}
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
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed inset-x-4 top-20 z-40 md:hidden apple-glass rounded-3xl p-6 shadow-2xl border border-black/10 dark:border-white/10 backdrop-blur-3xl"
                    >
                        <div className="flex flex-col gap-2">
                            {navItems.map((item) => (
                                <a
                                    key={item.id}
                                    href={item.href}
                                    onClick={(e) => handleScroll(e, item.href)}
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