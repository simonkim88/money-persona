"use client";

import { Button } from "@/components/ui/button";
import { Share2, Link as LinkIcon, Check } from "lucide-react";
import { useState } from "react";

export function ShareButtons() {
    const [copied, setCopied] = useState(false);

    const handleShare = async () => {
        const shareData = {
            title: 'My Financial Persona',
            text: 'I just discovered my Money Persona! Find out yours!',
            url: window.location.href,
        };

        if (navigator.share) {
            try {
                await navigator.share(shareData);
            } catch (err) {
                console.log('Error sharing:', err);
            }
        } else {
            handleCopy();
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="flex gap-3">
            <Button variant="secondary" onClick={handleShare}>
                <Share2 className="w-4 h-4 mr-2" />
                Share Analysis
            </Button>
            <Button variant="ghost" className="w-12 px-0" onClick={handleCopy}>
                {copied ? <Check className="w-4 h-4 text-green-600" /> : <LinkIcon className="w-4 h-4" />}
            </Button>
        </div>
    )
}
