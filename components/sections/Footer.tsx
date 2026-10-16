"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Mail, Check, ArrowUpRight } from "lucide-react";

export function Footer() {
    const t = useTranslations("Footer");
    const [copied, setCopied] = useState(false);
    const [currentTime, setCurrentTime] = useState("");

    // Real-time operational clock (WIB / Jakarta)
    useEffect(() => {
        const updateClock = () => {
            const now = new Date();
            const timeString = now.toLocaleTimeString("en-US", {
                timeZone: "Asia/Jakarta",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: true,
            });
            setCurrentTime(`${timeString} WIB`);
        };
        updateClock();
        const interval = setInterval(updateClock, 1000);
        return () => clearInterval(interval);
    }, []);

    const handleCopyEmail = () => {
        navigator.clipboard.writeText("naufalarif09@gmail.com");
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <footer id="contact" className="relative z-10 w-full max-w-6xl mx-auto px-6 py-16 mb-12">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", damping: 25, stiffness: 100 }}
                className="relative flex flex-col items-center text-center p-10 md:p-16 rounded-4xl apple-glass shadow-apple-glass overflow-hidden"
            >
                {/* Latar Belakang Cahaya Aura Dinamis */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-32 bg-apple-electric/20 dark:bg-apple-navy/30 blur-[80px] -z-10 pointer-events-none" />

                {/* Status Bar Kecil (Command Center Indicator) */}
                <div className="mb-8 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 text-xs font-semibold tracking-wider text-slate-600 dark:text-slate-300">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Jakarta, Indonesia • {currentTime || "Loading..."}</span>
                </div>

                <h2 className="max-w-3xl text-3xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white leading-[1.1] mb-10">
                    {t("headline")}
                </h2>

                <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center">
                    {/* Tombol Utama Kirim Email / Salin Email */}
                    <button
                        onClick={handleCopyEmail}
                        className="group flex items-center justify-center gap-2 px-8 py-4 w-full sm:w-auto rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold apple-active-scale transition-all hover:opacity-90 shadow-lg cursor-pointer"
                    >
                        {copied ? (
                            <>
                                <Check className="w-5 h-5 text-emerald-400 dark:text-emerald-600" />
                                <span>Copied to Clipboard!</span>
                            </>
                        ) : (
                            <>
                                <Mail className="w-5 h-5" />
                                <span>{t("emailText")}</span>
                                <ArrowUpRight className="w-4 h-4 opacity-70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                            </>
                        )}
                    </button>

                    {/* Tombol Sosial Media (LinkedIn & GitHub) */}
                    <div className="flex gap-4">
                        {/* LinkedIn Pure SVG */}
                        <a
                            href="https://www.linkedin.com/in/muhammadnaufalarif/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center w-14 h-14 rounded-full apple-glass border border-black/10 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 apple-active-scale transition-colors hover:bg-black/5 dark:hover:bg-white/10 shadow-sm"
                            title="LinkedIn Profile"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                                <rect x="2" y="9" width="4" height="12"></rect>
                                <circle cx="4" cy="4" r="2"></circle>
                            </svg>
                        </a>

                        {/* GitHub Pure SVG */}
                        <a
                            href="https://github.com/naufallariff"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center w-14 h-14 rounded-full apple-glass border border-black/10 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white apple-active-scale transition-colors hover:bg-black/5 dark:hover:bg-white/10 shadow-sm"
                            title="GitHub Repository"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                            </svg>
                        </a>
                    </div>
                </div>

                <p className="mt-16 text-xs md:text-sm font-medium text-slate-500 dark:text-slate-400 tracking-wide">
                    {t("rights")}
                </p>
            </motion.div>
        </footer>
    );
}