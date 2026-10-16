"use client";

import { useEffect, useMemo, useRef } from "react";
import { animate, useReducedMotion } from "framer-motion";

// ViewBox diperbesar ukurannya sedikit agar kurva lebih landai
const VIEW_W = 1600;
const VIEW_H = 1000;
const SPAN = 480;

// Menggeser Y ke atas agar tidak terlalu mepet bawah.
// Jarak proporsional dengan ruang napas elegan (1 : 1.6 : 2.6)
const LANES: Lane[] = [
    { id: "a", y: 235, amp: 65, dir: 1, flight: 18, pause: 3.5 },
    { id: "b", y: 500, amp: -80, dir: -1, flight: 20, pause: 4 },
    { id: "c", y: 775, amp: 70, dir: 1, flight: 16, pause: 3 }
];

type Lane = {
    id: string;
    y: number;
    amp: number;
    dir: 1 | -1;
    flight: number;
    pause: number;
};

// Fungsi gelombang dengan kurva Bezier
function wavePath(y: number, amp: number) {
    const x0 = -SPAN / 3;
    let d = `M ${x0} ${y}`;
    for (let i = 0; i < 4; i++) {
        const x = x0 + SPAN * (i + 1);
        const cx = x - SPAN / 2;
        const sign = i % 2 === 0 ? -1 : 1;
        d += ` Q ${cx} ${y + sign * amp}, ${x} ${y}`;
    }
    return d;
}

const wait = (s: number) => new Promise<void>((r) => setTimeout(r, s * 1000));

function PaperPlaneLane({ lane, reduce }: { lane: Lane; reduce: boolean | null }) {
    const d = useMemo(() => wavePath(lane.y, lane.amp), [lane.y, lane.amp]);

    const pathRef = useRef<SVGPathElement>(null);
    const maskPathRef = useRef<SVGPathElement>(null);
    const planeWrapRef = useRef<SVGGElement>(null);
    const planeRef = useRef<SVGGElement>(null);

    useEffect(() => {
        const path = pathRef.current;
        const mask = maskPathRef.current;
        const wrap = planeWrapRef.current;
        const plane = planeRef.current;

        if (!path || !mask || !wrap || !plane) return;

        const L = path.getTotalLength();

        // Mengatur Masking pada garis putus-putus
        const reveal = (start: number, len: number) => {
            mask.setAttribute("stroke-dasharray", `${len} 2`);
            mask.setAttribute("stroke-dashoffset", `${-start}`);
        };

        // Menempatkan pesawat tepat di koordinat dengan arah rotasi akurat
        const place = (s: number, dir: 1 | -1) => {
            const pos = s * L;
            const p = path.getPointAtLength(pos);
            const ahead = dir === 1 ? Math.min(L, pos + 2) : Math.max(0, pos - 2);
            const q = path.getPointAtLength(ahead);

            const angle = (Math.atan2(q.y - p.y, q.x - p.x) * 180) / Math.PI;
            // Jika terbang mundur (kiri), balik orientasi sayap Y agar sayap bawah tetap menghadap bawah
            const flip = dir === 1 ? 1 : -1;

            wrap.setAttribute("transform", `translate(${p.x} ${p.y}) rotate(${angle}) scale(1 ${flip})`);
        };

        if (reduce) {
            // Jika prefer-reduced-motion aktif, gambar garis permanen tanpa pergerakan
            mask.removeAttribute("stroke-dasharray");
            wrap.style.opacity = "0";
            return;
        }

        let cancelled = false;

        const run = async () => {
            let dir = lane.dir;

            while (!cancelled) {
                // 1. Muncul dan terbang (menggambar garis)
                animate(wrap, { opacity: 1 }, { duration: 0.8 });
                await animate(0, 1, {
                    duration: lane.flight,
                    ease: "easeInOut",
                    onUpdate: (t) => {
                        reveal(dir === 1 ? 0 : 1 - t, t);
                        place(dir === 1 ? t : 1 - t, dir);
                    },
                });
                if (cancelled) return;

                // 2. Tiba di tujuan dan berhenti
                await wait(lane.pause);
                if (cancelled) return;

                // Pesawat memudar
                animate(wrap, { opacity: 0 }, { duration: 0.8 });

                // 3. Jejak garis terhapus pelan-pelan dari belakang
                await animate(0, 1, {
                    duration: 2.2, // Dibuat lebih santai (lambat) saat menghapus jejak
                    ease: "easeInOut",
                    onUpdate: (t) => reveal(dir === 1 ? t : 0, 1 - t),
                });
                if (cancelled) return;

                await wait(1.5);

                // Memutar haluan untuk putaran selanjutnya
                dir = dir === 1 ? -1 : 1;
            }
        };

        run();

        return () => {
            cancelled = true;
        };
    }, [lane, reduce]);

    return (
        <g>
            <defs>
                <mask
                    id={`mask-${lane.id}`}
                    maskUnits="userSpaceOnUse"
                    x={-400}
                    y={-400}
                    width={VIEW_W + 800}
                    height={VIEW_H + 800}
                >
                    <path
                        ref={maskPathRef}
                        d={d}
                        pathLength={1}
                        fill="none"
                        stroke="white"
                        strokeWidth={24}
                    />
                </mask>
            </defs>

            {/* Jalur referensi tak terlihat untuk perhitungan */}
            <path ref={pathRef} d={d} fill="none" stroke="none" />

            {/* Jejak putus-putus (Dotted Line) - Opasitas dan skala dinaikkan! */}
            <path
                d={d}
                fill="none"
                // Opasitas dinaikkan menjadi 15% (light) dan 20% (dark) agar lebih terlihat tanpa mengganggu
                className="stroke-slate-900/15 dark:stroke-white/20"
                // Ketebalan garis dan rasio putus-putus diperbesar
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeDasharray="4 8" // 4px isi, 8px kosong
                mask={`url(#mask-${lane.id})`}
            />

            {/* Kontainer Pesawat */}
            <g ref={planeWrapRef} opacity={0}>
                {/* Opasitas pesawat sedikit lebih menonjol dari garis */}
                <g ref={planeRef} className="text-slate-900/40 dark:text-white/45">
                    <path
                        // Skala pesawat dinaikkan dari 0.32 menjadi 0.5 (ukuran ideal)
                        transform="rotate(45) scale(0.5) translate(-24 -24)"
                        d="M4 22 L44 6 L28 42 L22 28 Z M22 28 L44 6"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2.5}
                        strokeLinejoin="round"
                    />
                </g>
            </g>
        </g>
    );
}

export function AmbientBackground() {
    const reduce = useReducedMotion();

    return (
        <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-transparent">
            <svg
                className="absolute inset-0 h-full w-full"
                viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
                preserveAspectRatio="xMidYMid slice"
            >
                {LANES.map((lane) => (
                    <PaperPlaneLane key={lane.id} lane={lane} reduce={reduce} />
                ))}
            </svg>
        </div>
    );
}