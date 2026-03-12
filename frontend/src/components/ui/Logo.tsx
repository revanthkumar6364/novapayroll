"use client";

import Link from "next/link";
import { motion } from "framer-motion";

interface LogoProps {
    className?: string;
    showText?: boolean;
    size?: number;
    animate?: boolean;
    variant?: 'dark' | 'light' | 'white'; // light = dark text (for white bg), dark = white text (for primary/dark bg), white = all white
}

export default function Logo({ 
    className = "", 
    showText = true, 
    size = 36, 
    animate = true,
    variant = 'light'
}: LogoProps) {
    // Exact Razorpay-style high-contrast hex overrides
    const textColor = variant === 'light' ? 'text-[#0F172A]' : 'text-white';
    const subTextColor = variant === 'light' ? 'text-primary' : (variant === 'white' ? 'text-white/90' : 'text-[#38BDF8]');
    const logoColor = (variant === 'white') ? 'text-white' : 'text-primary';
    const subTextTagColor = variant === 'light' ? 'text-[#94A3B8]' : 'text-white/60';
    
    return (
        <Link href="/" className={`flex items-center gap-2.5 hover:opacity-100 group transition-all ${className}`}>
            <motion.div
                className="relative flex items-center justify-center shrink-0"
                style={{ width: size, height: size }}
                whileHover={animate ? { scale: 1.05 } : {}}
            >
                {/* Crisp, Box-less Razorpay-style Vector Monogram */}
                <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={`w-full h-full ${logoColor} transition-transform group-hover:scale-105 duration-500`}>
                    {/* Primary Sharp Slash (N-slash 1) */}
                    <path d="M10 34L26 6H36L20 34H10Z" fill="currentColor" />
                    {/* Secondary Sharp Slash (N-slash 2) */}
                    <path d="M2 34L14 12H24L12 34H2Z" fill="currentColor" className="opacity-40" />
                </svg>
            </motion.div>

            {showText && (
                <div className="flex flex-col justify-center">
                    <span className={`font-black tracking-tighter leading-none transition-colors duration-300 ${textColor}`} style={{ fontSize: size * 0.75 }}>
                        Nova<span className={`font-medium tracking-tight ${subTextColor}`}>payroll</span>
                    </span>
                    <span className={`text-[8.5px] font-black uppercase tracking-[0.25em] mt-1 hidden sm:block ${subTextTagColor}`}>
                        Enterprise Finance
                    </span>
                </div>
            )}
        </Link>
    );
}
