import { create } from "zustand";
import { persist } from "zustand/middleware";

interface QuizState {
    currentQuestionIndex: number;
    answers: Record<number, { value: number; choiceIndex: number }>; // questionId -> { value, choiceIndex }
    scores: {
        Command: number;
        Time: number;
        Play: number;
        Value: number;
    };
    setAnswer: (questionId: number, axis: string, value: number, choiceIndex: number) => void;
    nextQuestion: () => void;
    prevQuestion: () => void; // Optional if we want to allow going back
    resetQuiz: () => void;
}

export const useQuizStore = create<QuizState>()(
    persist(
        (set) => ({
            currentQuestionIndex: 0,
            answers: {},
            scores: {
                Command: 0,
                Time: 0,
                Play: 0,
                Value: 0,
            },
            setAnswer: (questionId, axis, value, choiceIndex) =>
                set((state) => {
                    const newAnswers = { ...state.answers, [questionId]: { value, choiceIndex } };

                    // Recalculate scores from scratch to be safe/simple
                    // Or just update delta. Let's update delta for now but usually recalculating is safer.
                    // Let's actually just store the answer and compute derived score if needed, 
                    // or update the score map directly.

                    const newScores = { ...state.scores, [axis]: (state.scores[axis as keyof typeof state.scores] || 0) + value };

                    return {
                        answers: newAnswers,
                        scores: newScores,
                    };
                }),
            nextQuestion: () =>
                set((state) => ({ currentQuestionIndex: state.currentQuestionIndex + 1 })),
            prevQuestion: () =>
                set((state) => ({
                    currentQuestionIndex: Math.max(0, state.currentQuestionIndex - 1)
                })),
            resetQuiz: () => set({
                currentQuestionIndex: 0,
                answers: {},
                scores: { Command: 0, Time: 0, Play: 0, Value: 0 }
            }),
        }),
        {
            name: "money-persona-quiz-storage",
        }
    )
);
