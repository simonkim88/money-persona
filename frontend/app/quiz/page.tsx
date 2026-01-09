"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useQuizStore } from "@/store/quiz-store";
import { QUIZ_QUESTIONS } from "@/data/quiz-data";
import { QuizCard } from "@/components/quiz/quiz-card";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2 } from "lucide-react";
import { quizApi } from '@/lib/api';
import { calculatePersona } from "@/lib/persona-logic";

import { useSearchParams } from "next/navigation";
// ... imports

import { Suspense } from "react";

function QuizContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { currentQuestionIndex, setAnswer, nextQuestion, scores, resetQuiz } = useQuizStore();
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Hydration fix for Zustand persist
    const [isHydrated, setIsHydrated] = useState(false);

    useEffect(() => {
        setIsHydrated(true);

        // Check for refresh param
        if (searchParams.get('refresh') === 'true') {
            resetQuiz();
            // Remove the param from URL without reloading (optional, but cleaner)
            router.replace('/quiz');
        }
    }, [searchParams, resetQuiz, router]);

    const currentQuestion = QUIZ_QUESTIONS[currentQuestionIndex];
    const progress = ((currentQuestionIndex) / QUIZ_QUESTIONS.length) * 100;

    const handleAnswer = async (value: number, index: number) => {
        setAnswer(currentQuestion.id, currentQuestion.axis, value, index);

        if (currentQuestionIndex < QUIZ_QUESTIONS.length - 1) {
            setTimeout(() => nextQuestion(), 250); // Small delay for better UX
        } else {
            finishQuiz();
        }
    };

    const finishQuiz = async () => {
        setIsSubmitting(true);

        // Construct answers array for backend
        // answers is Record<number, {value, choiceIndex}>
        const answersList = Object.entries(useQuizStore.getState().answers).map(([qid, data]) => ({
            question_id: Number(qid),
            choice_index: data.choiceIndex
        }));

        // Generate temporary user ID (guest)
        const userId = "guest-" + Math.random().toString(36).substr(2, 9);
        // Ideally we should check if we have a user ID in localStorage/authStore

        try {
            const response = await quizApi.submit({
                user_id: userId,
                answers: answersList
            });

            console.log("Submitted! Response:", response);
            // Navigate with real persona code from backend
            router.push('/result?code=' + response.persona_code);

        } catch (error) {
            console.error("Failed to submit quiz:", error);
            // Fallback to local calculation if offline/error
            const personaCode = calculatePersona(scores);
            router.push('/result?code=' + personaCode + '&fallback=true');
        }
    };

    if (!isHydrated) return null;

    if (isSubmitting) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-[#F5F5F7]">
                <Loader2 className="w-12 h-12 text-blue-600 animate-spin mb-4" />
                <h2 className="text-xl font-medium text-gray-700">Analyzing your financial soul...</h2>
            </div>
        );
    }

    // Safety check if index out of bounds
    if (!currentQuestion) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Button onClick={resetQuiz}>Restart Quiz</Button>
            </div>
        )
    }

    return (
        <main className="min-h-screen bg-[#F5F5F7] flex flex-col items-center py-12 px-4 md:px-0 relative overflow-hidden">

            {/* Progress Bar */}
            <div className="w-full max-w-2xl px-6 mb-8 mt-4">
                <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                        className="h-full bg-blue-500 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.5 }}
                    />
                </div>
                <div className="flex justify-between mt-2 text-sm text-gray-400 font-medium">
                    <span>Start</span>
                    <span>{Math.round(progress)}%</span>
                    <span>Finish</span>
                </div>
            </div>

            {/* Quiz Content */}
            <div className="w-full max-w-5xl flex-1 flex items-center justify-center relative z-10">
                <AnimatePresence mode="wait">
                    <QuizCard
                        key={currentQuestion.id}
                        question={currentQuestion}
                        onAnswer={handleAnswer}
                    />
                </AnimatePresence>
            </div>

        </main>
    );
}

export default function QuizPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center bg-[#F5F5F7]">
                <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
            </div>
        }>
            <QuizContent />
        </Suspense>
    );
}
