"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { motion, HTMLMotionProps } from "framer-motion";

export interface ButtonProps extends HTMLMotionProps<"button"> {
    variant?: "primary" | "secondary" | "ghost" | "link" | "white";
    size?: "sm" | "md" | "lg" | "icon";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "primary", size = "md", children, ...props }, ref) => {

        const styleVariants = {
            primary: "bg-[#0071E3] text-white hover:bg-[#0077ED] shadow-sm active:bg-[#0062C3]",
            secondary: "bg-[#E8E8ED] text-[#1d1d1f] hover:bg-[#D2D2D7] active:bg-[#C7C7CC]",
            ghost: "hover:bg-black/5 text-[#1d1d1f] active:bg-black/10",
            link: "text-[#0066CC] hover:underline",
            white: "bg-white text-[#1d1d1f] shadow-md hover:shadow-lg active:shadow-sm"
        }

        const sizeVariants = {
            sm: "h-8 px-4 text-xs",
            md: "h-[44px] px-[22px] text-[17px] leading-tight font-normal",
            lg: "h-[56px] px-[30px] text-[19px] font-medium",
            icon: "h-[44px] w-[44px]",
        };

        const classes = cn(
            "inline-flex items-center justify-center whitespace-nowrap rounded-full transition-all focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 select-none",
            styleVariants[variant],
            sizeVariants[size],
            className
        );

        return (
            <motion.button
                className={classes}
                ref={ref}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                {...props}
            >
                {children}
            </motion.button>
        )
    }
);
Button.displayName = "Button";

export { Button };
