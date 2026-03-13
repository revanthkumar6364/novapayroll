"use client";

import { motion } from "framer-motion";
import DashboardLayout from "@/components/layout/DashboardLayout";
import {
    Zap, CheckCircle2, Lock, ChevronRight,
    UserPlus, Clock, ShieldCheck, Landmark,
    Users, BarChart3, ArrowRight, ArrowUpRight, HelpCircle
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const SETUP_STEPS = [
    {
        category: "Basic details",
        duration: "5 mins",
        steps: [
            { title: "Set payroll date", status: "start", description: "Choose when your employees get paid each month." },
            { title: "Set employee salary structure", status: "locked", description: "Define base, HRA, and other allowances." },
        ]
    },
    {
        category: "Compliance and people",
        duration: "10 mins",
        steps: [
            { title: "Add employee details", status: "locked", description: "Import your team or add them manually." },
            { title: "Statutory compliance setup", status: "locked", description: "Configure PF, PT, ESI, and TDS." },
        ]
    },
    {
        category: "KYC verification",
        duration: "10 mins",
        steps: [
            { title: "Verify organization PAN", status: "locked", description: "Required for legal and tax purposes." },
            { title: "Bank account verification", status: "locked", description: "Securely link your account for payouts." },
        ]
    }
];

export default function DashboardOverview() {
    return (
        <DashboardLayout>
            <div className="space-y-12">
                {/* Welcome Header */}
                <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-10">
                    <div className="flex items-center gap-10">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="w-32 h-32 shrink-0 relative hidden sm:block group"
                        >
                            <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-700"></div>
                            
                            {/* Premium Code-Based UI Illustration */}
                            <div className="w-full h-full bg-white rounded-3xl border border-slate-200 shadow-premium flex items-center justify-center relative z-10 overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent"></div>
                                <BarChart3 size={48} className="text-primary relative z-10 drop-shadow-sm" strokeWidth={1.5} />
                                <div className="absolute bottom-3 right-3 text-[10px] font-black tracking-widest text-[#64748B] opacity-50">NOVA</div>
                            </div>
                        </motion.div>
                        <div className="space-y-3">
                            <motion.h1
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-4xl font-black text-[#0F172A] tracking-tight"
                            >
                                Let&apos;s build your <span className="text-gradient">Empire.</span>
                            </motion.h1>
                            <p className="text-[#475569] font-bold text-lg">Follow these steps to go live with NovaPayroll in minutes.</p>
                        </div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex flex-col gap-4 bg-white p-6 rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/50 min-w-[300px] relative overflow-hidden group"
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                        <div className="flex items-center justify-between relative z-10">
                            <div className="space-y-1">
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#64748B]">Onboarding Progress</span>
                                <h4 className="text-xl font-black text-[#0F172A]">0 / 7 Steps</h4>
                            </div>
                            <div className="w-16 h-16 rounded-2xl bg-primary/5 flex items-center justify-center">
                                <Zap size={28} className="text-primary animate-pulse" />
                            </div>
                        </div>
                        <div className="space-y-2 relative z-10">
                            <div className="flex justify-between text-[10px] font-bold text-[#64748B]">
                                <span>COMPLETION</span>
                                <span>5%</span>
                            </div>
                            <div className="w-full h-2.5 bg-slate-50 rounded-full border border-slate-100 overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: "5%" }}
                                    transition={{ duration: 1.2, delay: 0.5 }}
                                    className="h-full bg-premium-gradient shadow-[0_0_10px_rgba(36,93,241,0.4)]"
                                ></motion.div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Global Markets Monitor [NEW] */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                        { code: 'USD', rate: 0.012, trend: '+0.2%' },
                        { code: 'EUR', rate: 0.011, trend: '-0.1%' },
                        { code: 'GBP', rate: 0.0094, trend: '+0.5%' },
                    ].map((fx, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ y: -5 }}
                            className="premium-card p-6 bg-white border border-slate-100 flex items-center justify-between group"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-black text-xs uppercase">
                                    {fx.code}
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">1 INR to {fx.code}</p>
                                    <p className="text-xl font-black text-slate-800 tracking-tight">{fx.rate}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <span className={`text-[10px] font-black px-2 py-1 rounded-md ${fx.trend.startsWith('+') ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
                                    {fx.trend}
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Setup Checklist */}
                <div className="premium-card bg-white/70 backdrop-blur-xl border-slate-100/50 shadow-2xl shadow-slate-200/40 relative overflow-hidden">
                    <div className="absolute bottom-0 right-0 w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>

                    <div className="divide-y divide-slate-100/50">
                        {SETUP_STEPS.map((section, idx) => (
                            <div key={idx} className="p-12">
                                <div className="flex items-center justify-between mb-10">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center">
                                            <BarChart3 size={20} className="text-[#64748B]" />
                                        </div>
                                        <h3 className="text-[12px] font-black uppercase tracking-[0.25em] text-[#64748B]">{section.category}</h3>
                                    </div>
                                    <div className="flex items-center gap-3 px-4 py-2 bg-slate-50 rounded-full text-[11px] font-black text-[#475569] border border-slate-100">
                                        <Clock size={16} />
                                        <span>EST. {section.duration.toUpperCase()}</span>
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-8">
                                    {section.steps.map((step, sIdx) => {
                                        const isLocked = step.status === 'locked';
                                        return (
                                            <motion.div
                                                key={sIdx}
                                                whileHover={!isLocked ? { y: -5 } : {}}
                                                className={`group flex items-center justify-between p-8 rounded-[2rem] border transition-all relative overflow-hidden ${!isLocked
                                                    ? 'bg-white border-primary/20 shadow-premium cursor-pointer'
                                                    : 'bg-slate-50/50 border-slate-100 grayscale hover:grayscale-0 transition-all duration-700'
                                                    }`}
                                            >
                                                {!isLocked && <div className="absolute inset-0 bg-primary/[0.02] opacity-0 group-hover:opacity-100 transition-opacity"></div>}

                                                <div className="flex items-center gap-8 relative z-10">
                                                    <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center font-black text-sm italic transition-all ${!isLocked
                                                        ? 'bg-primary/5 border-primary/10 text-primary shadow-sm'
                                                        : 'bg-white border-slate-200 text-slate-300'}`}>
                                                        {idx * 2 + sIdx + 1}
                                                    </div>
                                                    <div>
                                                        <h4 className="font-black text-[#0F172A] group-hover:text-primary transition-colors">{step.title}</h4>
                                                        <p className="text-[13px] text-[#475569] mt-2 font-medium leading-relaxed max-w-[240px]">{step.description}</p>
                                                    </div>
                                                </div>

                                                {!isLocked ? (
                                                    <div className="w-12 h-12 rounded-xl bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
                                                        <ArrowRight size={20} />
                                                    </div>
                                                ) : (
                                                    <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-300">
                                                        <Lock size={20} />
                                                    </div>
                                                )}
                                            </motion.div>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="bg-slate-50/50 p-8 flex items-center justify-center gap-4 text-[#64748B] group cursor-pointer hover:text-primary transition-all border-t border-slate-100">
                        <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center border border-slate-100 group-hover:border-primary/20 group-hover:bg-primary/5 transition-all">
                            <HelpCircle size={22} className="group-hover:scale-110 transition-transform" />
                        </div>
                        <span className="text-sm font-black uppercase tracking-widest">Need expert setup help?</span>
                        <div className="flex items-center gap-2 text-primary font-black ml-4 opacity-0 group-hover:opacity-100 transition-all translate-x-[-10px] group-hover:translate-x-0">
                            <span>Book Session</span>
                            <ArrowUpRight size={18} />
                        </div>
                    </div>
                </div>

                {/* Accountant Invitation */}
                <div className="premium-card bg-[#04050a] p-16 md:p-20 relative overflow-hidden group border-white/5">
                    <div className="absolute top-0 right-0 w-[60%] h-full bg-primary/10 rounded-full blur-[150px] -mr-20 -mt-20 group-hover:bg-primary/20 transition-all duration-1000"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-[100px] -ml-20 -mb-20"></div>

                    <div className="relative z-10 flex flex-col xl:flex-row items-center justify-between gap-16">
                        <div className="text-center xl:text-left max-w-3xl space-y-6">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/50 text-[10px] font-black uppercase tracking-widest"
                            >
                                Speed Up Setup
                            </motion.div>
                            <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">Setup your account 3x faster by inviting your <span className="text-primary italic">Auditor.</span></h2>
                            <p className="text-white/40 font-bold text-lg leading-relaxed">Let your account managers handle the technical legalities. Your CA can configure compliance, taxations, and payroll structures effortlessly.</p>
                        </div>

                        <div className="shrink-0">
                            <button className="group relative bg-white text-[#04050a] px-14 py-7 rounded-[2rem] font-black text-xl shadow-[0_25px_50px_-12px_rgba(255,255,255,0.15)] hover:bg-slate-50 active:scale-95 transition-all flex items-center gap-4 overflow-hidden">
                                <span className="relative z-10">Invite Delegate</span>
                                <UserPlus size={24} className="relative z-10 group-hover:scale-125 transition-transform" />
                                <div className="absolute inset-0 bg-primary/5 -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}


// Removed redundant HelpCircle function
