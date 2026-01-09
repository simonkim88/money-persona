"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function HeroSection() {
    return (
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#F5F5F7] px-6 py-12 md:px-12">
            <div className="container max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
                {/* Left: Text Content */}
                <motion.div
                    className="flex-1 text-center md:text-left z-10"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                    >
                        <span className="inline-block px-4 py-1.5 mb-6 rounded-full bg-white/50 border border-white/20 backdrop-blur-sm text-sm font-medium text-slate-600 shadow-sm">
                            대한민국 10대를 위한 금융 성향 테스트 🇰🇷
                        </span>
                    </motion.div>

                    <motion.h1
                        className="text-5xl md:text-7xl font-bold tracking-tight text-[#1d1d1f] mb-6 leading-[1.1]"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                    >
                        나의 금융 <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0071E3] to-[#40C4FF]">
                            페르소나 찾기
                        </span>
                    </motion.h1>

                    <motion.p
                        className="text-xl text-[#86868B] mb-8 max-w-lg mx-auto md:mx-0 leading-relaxed word-keep-all"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.8 }}
                    >
                        나는 저축왕일까, 플렉스 달인일까? 12가지 질문으로 알아보는 나만의 금융 DNA와 류박사님의 맞춤 조언을 확인해보세요.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8, duration: 0.8 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
                    >
                        <Link href="/quiz?refresh=true">
                            <Button size="lg" className="rounded-full text-lg h-14 px-10 shadow-xl shadow-blue-500/20">
                                테스트 시작하기
                            </Button>
                        </Link>
                        <Link href="/about">
                            <Button variant="secondary" size="lg" className="rounded-full text-lg h-14 px-10">
                                자세히 보기
                            </Button>
                        </Link>
                    </motion.div>
                </motion.div>

                {/* Right: 3D Character */}
                <motion.div
                    className="flex-1 relative w-full max-w-[500px] aspect-square flex items-center justify-center"
                    initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ delay: 0.4, duration: 1, type: "spring" }}
                >
                    <div className="absolute inset-0 bg-gradient-to-tr from-blue-200/30 to-purple-200/30 rounded-full blur-3xl opacity-60 animate-pulse" />
                    <motion.div
                        animate={{ y: [0, -20, 0] }}
                        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                    >
                        <Image
                            src="/hero-character-v2.png"
                            alt="3D Finance Character"
                            width={800}
                            height={800}
                            className="relative z-10 drop-shadow-2xl object-contain"
                            priority
                        />
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
