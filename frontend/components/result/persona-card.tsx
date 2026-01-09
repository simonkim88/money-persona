"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface PersonaCardProps {
    code: string;
}

// Helper to map code letters to meanings
const getAcronymData = (char: string, index: number) => {
    // Index 0: Command (C) / Saver (S)
    // Index 1: Fast (F) / Slow (S)
    // Index 2: Play (P) / Realistic (R)
    // Index 3: Value (V) / Individual (I)

    // Note: 'S' appears in index 0 and 1. We must distinguish by index but the char alone is ambiguous if we don't know the index.
    // The loop below passes the index.

    const map: Record<number, Record<string, { en: string, ko: string }>> = {
        0: {
            "C": { en: "Commander", ko: "주도형" },
            "S": { en: "Saver", ko: "수호형" }
        },
        1: {
            "F": { en: "Fast", ko: "속도형" },
            "S": { en: "Steady", ko: "신중형" } // Using Steady to distinguish S
        },
        2: {
            "P": { en: "Playful", ko: "유희형" },
            "R": { en: "Realistic", ko: "현실형" }
        },
        3: {
            "V": { en: "Value", ko: "가치형" },
            "I": { en: "Individual", ko: "실속형" }
        }
    };

    return map[index]?.[char] || { en: "Unknown", ko: "미정" };
};

const AVAILABLE_CHARACTERS = [
    "CSRI", "CFPV", "SSRI", "CFPI", "SSPV", "SFRI", "CSPV",
    "CSPI", "CSRV", "CFRI", "CFRV", "SSPI",
    "SSRV", "SFPI", "SFPV", "SFRV"
];

export function PersonaCard({ code }: PersonaCardProps) {
    const letters = code.split("").slice(0, 4);

    // Check if we have a specific image for this code, otherwise use default
    const characterImage = AVAILABLE_CHARACTERS.includes(code)
        ? `/hero-character-${code}.png`
        : "/hero-character-v2.png";

    return (
        <motion.div
            className="perspective-1000 w-full h-full"
            initial={{ opacity: 0, rotateY: 90 }}
            animate={{ opacity: 1, rotateY: 0 }}
            transition={{ duration: 0.8, type: "spring" }}
        >
            <div className="relative w-full h-full min-h-[750px] rounded-[2.5rem] overflow-hidden shadow-2xl bg-gradient-to-br from-white to-gray-50 border border-white/40 flex flex-col hover:shadow-3xl transition-shadow duration-500">
                {/* Background Decor */}
                <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-blue-500/10 to-transparent" />

                {/* Content */}
                <div className="relative z-10 flex flex-1 flex-col items-center px-6 pt-8 pb-0 text-center">
                    <div className="mt-2 mb-2">
                        <span className="px-5 py-1.5 rounded-full bg-blue-100/50 text-blue-600 font-bold tracking-widest text-sm border border-blue-200">
                            TYPE
                        </span>
                    </div>

                    <h2 className="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-1 tracking-tight">
                        {code}
                    </h2>

                    <div className="space-y-1 mb-6">
                        <p className="text-2xl text-gray-800 font-bold">미래를 그리는 투자자</p>
                        <p className="text-base text-gray-400 font-medium tracking-wide">The Visionary Investor</p>
                    </div>

                    {/* Acronym Breakdown */}
                    <div className="flex gap-3 mb-4 relative z-20">
                        {letters.map((char, idx) => {
                            const data = getAcronymData(char, idx);
                            return (
                                <div key={idx} className="flex flex-col items-center justify-center bg-white/60 p-2.5 rounded-2xl border border-white/50 shadow-sm min-w-[68px]">
                                    <span className="text-xl font-black text-blue-600 mb-0.5 leading-none">{char}</span>
                                    <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">{data.en}</span>
                                    <span className="text-[11px] text-gray-700 font-bold">{data.ko}</span>
                                </div>
                            );
                        })}
                    </div>

                    {/* Character */}
                    <div className="flex-1 w-full relative min-h-[380px] -mb-4 mt-2">
                        <Image
                            src={characterImage}
                            alt="Persona Character"
                            fill
                            className="object-contain drop-shadow-2xl scale-110 origin-bottom"
                            sizes="(max-width: 768px) 100vw, 33vw"
                            priority
                        />
                    </div>
                </div>
            </div>
        </motion.div>
    )
}
