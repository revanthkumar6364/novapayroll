"use client";

import { motion } from "framer-motion";
import { ArrowRight, ChevronRight, Globe, ShieldCheck } from "lucide-react";
import Link from "next/link";
import Logo from "./Logo";

interface PlaceholderProps {
    title: string;
    description: string;
    category: string;
}

export default function ProfessionalPlaceholder({ title, description, category }: PlaceholderProps) {
    return (
        <div className="min-h-screen bg-white flex flex-col">
            {/* Minimal Nav for these pages */}
            <header className="w-full h-24 border-b border-slate-100 flex items-center justify-between px-8 bg-white/80 backdrop-blur-md sticky top-0 z-50">
                <Logo size={40} variant="light" />
                <Link href="/" className="text-sm font-bold text-slate-500 hover:text-primary transition-colors flex items-center gap-2">
                    Back to Home <ChevronRight size={16} />
                </Link>
            </header>

            <main className="flex-grow flex flex-col items-center justify-center p-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="max-w-2xl space-y-10"
                >
                    <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-primary/5 text-primary text-[11px] font-black uppercase tracking-[0.2em] border border-primary/10">
                        {category}
                    </div>
                    
                    <h1 className="text-5xl lg:text-7xl font-black text-[#0B132B] tracking-tight leading-tight">
                        {title}
                    </h1>

                    <p className="text-xl text-slate-600 leading-relaxed font-medium">
                        {description}
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4">
                        <Link href="/signup" className="bg-[#245DF1] text-white px-10 py-5 rounded-2xl text-[14px] font-black hover:bg-[#1d4ed8] transition-all shadow-premium hover:-translate-y-1 flex items-center gap-3">
                            Start for Free <ArrowRight size={18} />
                        </Link>
                        <Link href="/login" className="px-10 py-5 rounded-2xl text-[14px] font-black text-slate-600 border border-slate-200 hover:bg-slate-50 transition-all">
                            Login to Dashboard
                        </Link>
                    </div>
                </motion.div>
            </main>

            {/* Micro Footer for context */}
            <footer className="py-12 border-t border-slate-100 bg-slate-50/50">
                <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8 opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all">
                    <div className="flex items-center gap-6 text-[10px] font-black uppercase tracking-widest text-[#0B132B]">
                        <div className="flex items-center gap-2 text-primary">
                            <ShieldCheck size={18} />
                            <span>PCI-DSS Secure</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Globe size={18} />
                            <span>ISO 27001 Certified</span>
                        </div>
                    </div>
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                        © 2026 Novapayroll Technologies Private Limited
                    </p>
                </div>
            </footer>
        </div>
    );
}
