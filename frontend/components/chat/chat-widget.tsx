"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MessageSquare, X, Send, Loader2 } from "lucide-react";
import { chatApi } from "@/lib/api";
import { cn } from "@/lib/utils";

interface Message {
    id: string;
    sender: "user" | "bot";
    text: string;
}

export function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { id: "1", sender: "bot", text: "안녕하세요! 금융 멘토 류박사입니다. 궁금한 점이 있으신가요?" }
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const toggleChat = () => setIsOpen(!isOpen);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const userMsg: Message = {
            id: Date.now().toString(),
            sender: "user",
            text: input
        };

        setMessages(prev => [...prev, userMsg]);
        setInput("");
        setIsLoading(true);

        try {
            // Use temporary or actual user ID
            const userId = "guest-chat-" + Math.random().toString(36).substr(2, 5);
            const response = await chatApi.sendMessage({
                user_id: userId,
                message: userMsg.text
            });

            const botMsg: Message = {
                id: (Date.now() + 1).toString(),
                sender: "bot",
                text: response.reply
            };
            setMessages(prev => [...prev, botMsg]);
        } catch (error) {
            console.error("Chat error:", error);
            setMessages(prev => [...prev, {
                id: "error-" + Date.now(),
                sender: "bot",
                text: "죄송합니다. 현재 금융 데이터베이스에 연결하는 데 문제가 발생했습니다."
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") handleSend();
    }

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="mb-4 w-[350px] md:w-[400px] h-[500px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-100"
                    >
                        {/* Header */}
                        <div className="p-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white flex justify-between items-center shadow-sm">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                                    🧐
                                </div>
                                <div>
                                    <h3 className="font-semibold text-sm">류박사</h3>
                                    <p className="text-xs text-blue-100">AI 금융 멘토</p>
                                </div>
                            </div>
                            <button onClick={toggleChat} className="text-white/80 hover:text-white transition-colors">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50">
                            {messages.map((msg) => (
                                <div
                                    key={msg.id}
                                    className={cn(
                                        "max-w-[80%] p-3 text-sm rounded-2xl leading-relaxed shadow-sm",
                                        msg.sender === "user"
                                            ? "bg-blue-600 text-white self-end ml-auto rounded-tr-none"
                                            : "bg-white text-gray-700 border border-gray-100 self-start mr-auto rounded-tl-none"
                                    )}
                                >
                                    {msg.text}
                                </div>
                            ))}
                            {isLoading && (
                                <div className="bg-white border border-gray-100 p-3 rounded-2xl rounded-tl-none self-start flex items-center gap-2 text-gray-400 text-xs">
                                    <Loader2 className="w-3 h-3 animate-spin" /> 생각 중...
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <div className="p-3 bg-white border-t border-gray-100 flex gap-2">
                            <input
                                className="flex-1 bg-gray-50 border-transparent focus:bg-white focus:border-blue-500 rounded-xl px-4 text-sm outline-none transition-all placeholder:text-gray-400"
                                placeholder="용돈 관리법을 물어보세요..."
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={handleKeyDown}
                            />
                            <Button
                                size="icon"
                                className="rounded-xl w-10 h-10 shrink-0"
                                onClick={handleSend}
                                disabled={isLoading || !input.trim()}
                            >
                                <Send className="w-4 h-4 ml-0.5" />
                            </Button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <Button
                size="lg"
                className="rounded-full w-14 h-14 shadow-lg shadow-blue-500/30 p-0"
                onClick={toggleChat}
            >
                <MessageSquare className="w-6 h-6" />
            </Button>

        </div>
    );
}
