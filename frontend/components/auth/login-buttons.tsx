"use client";

import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react"; // Using MessageCircle as generic icon or placeholder for Kakao
import Image from "next/image";

// Placeholder for Kakao Icon if we don't have SVG
// For authentic feel we'd use SVGs. Let's use simple buttons for now.

export function LoginButtons() {
    const handleLogin = (provider: string) => {
        // In real implementations, this redirects to backend auth URL
        // window.location.href = `http://localhost:8000/api/v1/auth/login/${provider}`;
        alert(`Redirecting to ${provider} Login... (Mock)`);
    };

    return (
        <div className="flex flex-col gap-3 w-full max-w-xs mx-auto md:mx-0">
            <button
                onClick={() => handleLogin('kakao')}
                className="w-full h-12 rounded-xl bg-[#FEE500] text-[#191919] font-medium flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
            >
                <div className="w-5 h-5 bg-black rounded-full flex items-center justify-center">
                    <span className="text-[#FEE500] text-[10px] font-bold">K</span>
                    {/* Placeholder for Kakao Logo */}
                </div>
                카카오로 시작하기
            </button>

            <button
                onClick={() => handleLogin('google')}
                className="w-full h-12 rounded-xl bg-white border border-gray-200 text-gray-700 font-medium flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors"
            >
                {/* Google G Logo Placeholder */}
                <div className="text-xl font-bold">G</div>
                구글로 시작하기
            </button>
        </div>
    )
}
