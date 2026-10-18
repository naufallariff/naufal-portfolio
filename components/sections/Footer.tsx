"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Mail, Check, ArrowUpRight } from "lucide-react";

const EMAIL = "naufalarif09@gmail.com";
const LINKEDIN = "https://www.linkedin.com/in/muhammadnaufalarif/";
const GITHUB = "https://github.com/naufallariff";

// Dibuat sekali, tidak dibuat ulang setiap detik
const clock = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Jakarta",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
});

export function Footer() {
    const t = useTranslations("Footer");
    const reduce = useReducedMotion();
    const [copied, setCopied] = useState(false);
    const [time, setTime] = useState("");
    const resetRef = useRef(0);

    useEffect(() => {
        const id = window.setInterval(() => setTime(clock.format(new Date())), 1000);
        return () => window.clearInterval(id);
    }, []);

    useEffect(() => () => window.clearTimeout(resetRef.current), []);

    const copyEmail = async () => {
        try {
            await navigator.clipboard.writeText(EMAIL);
        } catch {
            return;
        }
        setCopied(true);
        window.clearTimeout(resetRef.current);
        resetRef.current = window.setTimeout(() => setCopied(false), 2000);
    };

    return (
        <footer id="contact" className="relative z-10 mx-auto w-full max-w-5xl px-6 pb-12 pt-20 md:px-8 md:pb-16 md:pt-28">
            <motion.div
                initial={reduce ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ type: "spring", damping: 26, stiffness: 120 }}
                className="apple-glass relative flex flex-col items-center overflow-hidden rounded-5xl px-6 py-14 text-center md:px-16 md:py-20"
            >
                <div
                    aria-hidden
                    className="pointer-events-none absolute left-1/2 top-0 -z-10 h-40 w-4/5 -translate-x-1/2 rounded-full bg-apple-electric/25 blur-[90px]"
                />

                <span className="apple-glass mb-8 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold tracking-wide text-slate-600 dark:text-slate-300">
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                    <span>
                        {t("location")} · <span className="tabular-nums">{time || "--:--:--"}</span> WIB
                    </span>
                </span>

                <h2 className="max-w-3xl text-3xl font-bold leading-[1.12] tracking-tight text-slate-900 md:text-5xl dark:text-white">
                    {t("headline")}
                </h2>

                <div className="mt-10 flex w-full flex-col items-center justify-center gap-4 sm:flex-row">
                    <button
                        type="button"
                        onClick={copyEmail}
                        className="group inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-slate-900 px-8 py-4 font-semibold text-white shadow-lg shadow-slate-900/20 transition-opacity hover:opacity-90 apple-active-scale sm:w-auto dark:bg-white dark:text-slate-900"
                    >
                        {copied ? (
                            <>
                                <Check className="h-5 w-5 text-emerald-500" />
                                <span>{t("copied")}</span>
                            </>
                        ) : (
                            <>
                                <Mail className="h-5 w-5" />
                                <span>{t("emailText")}</span>
                                <ArrowUpRight className="h-4 w-4 opacity-70 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                            </>
                        )}
                    </button>

                    <div className="flex gap-3">
                        <a
                            href={LINKEDIN}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="LinkedIn"
                            className="apple-glass flex h-14 w-14 items-center justify-center rounded-full text-slate-700 transition-colors hover:text-apple-electric apple-active-scale dark:text-slate-300"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                                <rect x="2" y="9" width="4" height="12" />
                                <circle cx="4" cy="4" r="2" />
                            </svg>
                        </a>
                        <a
                            href={GITHUB}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="GitHub"
                            className="apple-glass flex h-14 w-14 items-center justify-center rounded-full text-slate-700 transition-colors hover:text-slate-900 apple-active-scale dark:text-slate-300 dark:hover:text-white"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                            </svg>
                        </a>
                    </div>
                </div>

                <p className="mt-16 text-xs font-medium tracking-wide text-slate-500 md:text-sm dark:text-slate-400">
                    {t("rights")}
                </p>
            </motion.div>
        </footer>
    );
}