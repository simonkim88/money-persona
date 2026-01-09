import axios from 'axios';

// In production, this should be an env variable
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

export const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export interface SubmitQuizRequest {
    user_id: string; // UUID
    answers: {
        question_id: number;
        choice_index: number;
    }[];
}

export interface SubmitQuizResponse {
    persona_code: string;
    xp_gained: number;
}

export const quizApi = {
    submit: async (data: SubmitQuizRequest): Promise<SubmitQuizResponse> => {
        const response = await api.post<SubmitQuizResponse>('/quiz/submit', data);
        return response.data;
    },
};

export interface ChatRequest {
    user_id: string;
    message: string;
    session_id?: string;
}

export interface ChatResponse {
    reply: string;
}

export const chatApi = {
    sendMessage: async (data: ChatRequest): Promise<ChatResponse> => {
        const response = await api.post<ChatResponse>('/chat/message', data);
        return response.data;
    }
}
