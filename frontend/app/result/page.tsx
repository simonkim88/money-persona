"use client";

import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import { Suspense } from 'react';
import { useQuizStore } from "@/store/quiz-store";
import { PersonaRadar } from "@/components/charts/persona-radar";
import { PersonaCard } from "@/components/result/persona-card";
import { ShareButtons } from "@/components/social/share-buttons";
import { LoginButtons } from "@/components/auth/login-buttons";
import { motion } from "framer-motion";

function ResultContent() {
    const searchParams = useSearchParams();
    const code = searchParams.get("code") || "UNKNOWN";

    // In a real app, strict mode might block this hydration mismatch if accessing store directly in render?
    // But we are client side.
    const { scores } = useQuizStore();

    return (
        <div className="min-h-screen bg-[#F5F5F7]">
            <div className="max-w-7xl mx-auto px-6 py-12 md:py-20 flex flex-col md:flex-row gap-8 md:gap-12 items-stretch">

                {/* Left Column: Persona Card */}
                <div className="w-full md:w-[42%] flex-shrink-0">
                    <PersonaCard code={code} />
                </div>

                {/* Right Column: Analysis & Dashboard */}
                <motion.div
                    className="w-full md:w-[58%] h-full flex flex-col gap-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <div className="bg-white rounded-3xl p-8 shadow-sm flex-1">
                        <h2 className="text-2xl font-bold mb-6 text-gray-900">금융 DNA 분석</h2>
                        <div className="flex flex-col md:flex-row gap-8 items-center">
                            <div className="w-full md:w-1/2">
                                <PersonaRadar scores={scores} />
                            </div>
                            <div className="w-full md:w-1/2 text-gray-600 leading-relaxed word-keep-all">
                                <p className="mb-4">
                                    당신은 <strong>안정성(Security)</strong>과 <strong>효율성(Efficiency)</strong> 사이의 균형을 잘 맞추고 계시네요.
                                    충동적인 결정보다는 계산된 판단을 내리는 경향이 있습니다.
                                </p>
                                <p className="mb-6 bg-blue-50 p-4 rounded-xl border border-blue-100">
                                    <strong>💡 류박사의 팁:</strong><br />
                                    용돈의 10%는 죄책감 없이 즐길 수 있는 '행복 비용'으로 따로 떼어 두세요! 삶의 활력소가 될 것입니다.
                                </p>

                                <div className="pt-4 border-t border-gray-100">
                                    <ShareButtons />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-white rounded-3xl p-6 shadow-sm">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="font-semibold text-gray-900">나의 레벨</h3>
                                    <p className="text-sm text-gray-400">가입하고 기록을 저장하세요</p>
                                </div>
                                <span className="bg-blue-100 text-blue-600 text-xs font-bold px-2 py-1 rounded">GUEST</span>
                            </div>

                            <div className="mb-4">
                                <LoginButtons />
                            </div>
                        </div>

                        <div className="bg-white rounded-3xl p-6 shadow-sm flex flex-col justify-center">
                            <h3 className="font-semibold text-gray-900 mb-2">획득한 경험치</h3>
                            <div className="text-4xl font-bold text-purple-600 mb-1">+100 XP</div>
                            <div className="text-sm text-gray-500 mb-4">레벨업하여 새로운 아바타를 얻으세요!</div>
                            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                                <div className="h-full bg-purple-500 w-[20%]" />
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-center md:justify-start pt-4 pb-0 mt-auto">
                        <Link href="/">
                            <Button size="lg" className="rounded-full px-8 py-6 text-lg shadow-lg shadow-blue-500/20">홈으로 돌아가기</Button>
                        </Link>
                    </div>
                </motion.div>

            </div>
        </div>
    );
}

export default function ResultPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading result...</div>}>
            <ResultContent />
        </Suspense>
    )
}
