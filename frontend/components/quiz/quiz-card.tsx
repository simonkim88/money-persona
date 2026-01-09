"use client";

import { motion } from "framer-motion";
import { Question } from "@/data/quiz-data";
import { Button } from "@/components/ui/button";

import Image from "next/image";

interface QuizCardProps {
    question: Question;
    onAnswer: (value: number, index: number) => void;
}

export function QuizCard({ question, onAnswer }: QuizCardProps) {
    return (
        <motion.div
            key={question.id}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5, type: "spring", stiffness: 300, damping: 30 }}
            className="w-full max-w-2xl mx-auto p-6 md:p-10 bg-white rounded-3xl shadow-xl shadow-black/5"
        >
            <div className="mb-8 text-center">
                <span className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-blue-600 uppercase bg-blue-50 rounded-full">
                    Question {question.id}
                </span>

                {question.image && (
                    <div className="relative w-full aspect-square max-w-[400px] mb-6 rounded-2xl overflow-hidden shadow-sm mx-auto">
                        <Image
                            src={question.image}
                            alt={`Question ${question.id} Illustration`}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 600px"
                            priority
                        />
                    </div>
                )}

                <h2 className="text-2xl md:text-3xl font-bold leading-tight text-gray-900">
                    {question.story}
                </h2>
            </div>


            <div className="flex flex-col gap-4">
                {question.choices.map((choice, index) => (
                    <Button
                        key={index}
                        variant="secondary"
                        size="lg"
                        className="w-full h-auto py-6 text-lg justify-start px-8 text-left whitespace-normal hover:bg-blue-50 hover:text-blue-700 transition-colors border border-transparent hover:border-blue-100"
                        onClick={() => onAnswer(choice.value, index)}
                    >
                        <span className="mr-4 text-gray-400 font-medium font-mono text-sm">
                            {String.fromCharCode(65 + index)}
                        </span>
                        {choice.text}
                    </Button>
                ))}
            </div>
        </motion.div>
    );
}
