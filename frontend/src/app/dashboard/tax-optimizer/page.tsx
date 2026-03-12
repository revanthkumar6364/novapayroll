"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calculator, Zap, Sparkles, TrendingUp, ChevronRight, Info, ShieldCheck, ArrowRight } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";

export default function TaxOptimizerPage() {
    const [income, setIncome] = useState(1500000);
    const [savings, setSavings] = useState(45000);
    const [isOptimizing, setIsOptimizing] = useState(false);

    const handleOptimize = () => {
        setIsOptimizing(true);
        setTimeout(() => {
            setIsOptimizing(false);
            setSavings(Math.floor(Math.random() * 20000) + 40000);
        }, 2000);
    };

    return (
        <DashboardLayout>
            <div className="space-y-12 pb-20">
                {/* Hero Header */}
                <div className="relative rounded-[3rem] bg-premium-gradient p-12 lg:p-20 overflow-hidden shadow-premium group">
                    <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
                    <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-[100px] group-hover:scale-150 transition-transform duration-1000"></div>

                    <div className="relative z-10 flex flex-col lg:flex-row items-center gap-16">
                        <div className="flex-1 space-y-8 text-center lg:text-left">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/10 text-white text-[10px] font-black uppercase tracking-[0.2em] border border-white/10"
                            >
                                <Sparkles size={14} className="animate-pulse" />
                                AI-Powered Financial Health
                            </motion.div>
                            <h1 className="text-5xl lg:text-7xl font-black text-white leading-tight tracking-tighter">
                                Maximize your <span className="underline decoration-white/20 underline-offset-[12px]">Take-home</span> Pay.
                            </h1>
                            <p className="text-[#CBD5E1] text-xl font-medium max-w-xl">
                                Our AI analyzes your salary structure and compares tax regimes in real-time to find the most efficient path for your wealth.
                            </p>
                        </div>
                        <div className="w-full lg:w-[450px] bg-white/10 backdrop-blur-3xl rounded-[2.5rem] border border-white/10 p-10 shadow-2xl relative overflow-hidden group-hover:scale-105 transition-transform duration-700">
                            <div className="space-y-8 relative z-10">
                                <div className="space-y-4">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-white/40">Annual Gross Salary (₹)</label>
                                    <div className="relative">
                                        <span className="absolute left-6 top-1/2 -translate-y-1/2 text-white/40 font-black text-lg">₹</span>
                                        <input
                                            type="number"
                                            value={income}
                                            onChange={(e) => setIncome(Number(e.target.value))}
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-12 pr-6 text-2xl font-black text-white outline-none focus:ring-4 focus:ring-white/5 transition-all"
                                        />
                                    </div>
                                </div>
                                <button
                                    onClick={handleOptimize}
                                    disabled={isOptimizing}
                                    className="w-full bg-white text-[#04050a] py-6 rounded-2xl font-black flex items-center justify-center gap-4 hover:bg-slate-50 transition-all active:scale-95 shadow-xl shadow-black/20 btn-elite"
                                >
                                    {isOptimizing ? (
                                        <>
                                            <div className="w-5 h-5 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                                            Calculating...
                                        </>
                                    ) : (
                                        <>
                                            Analyze with Nova AI
                                            <Sparkles size={18} />
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Results Section */}
                <div className="grid lg:grid-cols-3 gap-10">
                    <div className="lg:col-span-2 space-y-10">
                        <div className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-[#F1F5F9] overflow-hidden relative group">
                            <div className="absolute top-0 right-0 p-8">
                                <TrendingUp className="text-emerald-500 w-12 h-12 opacity-10 group-hover:opacity-20 transition-opacity" />
                            </div>
                            <h3 className="text-xl font-black text-[#0F172A] mb-8 flex items-center gap-3">
                                <Calculator className="text-primary" size={24} />
                                Regime Comparison
                            </h3>

                            <div className="grid grid-cols-2 gap-8 relative z-10">
                                <div className="p-8 rounded-[2rem] bg-slate-50 border border-[#F1F5F9] space-y-4">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-[#64748B]">Old Tax Regime</p>
                                    <p className="text-4xl font-black text-[#0F172A]">₹2,84,500</p>
                                    <p className="text-xs font-bold text-[#64748B] italic">With 80C & HRA benefits</p>
                                </div>
                                <div className="p-8 rounded-[2rem] bg-primary/5 border border-primary/10 space-y-4 relative overflow-hidden group/card shadow-sm">
                                    <div className="absolute top-0 right-0 bg-primary text-white text-[9px] font-black px-4 py-1.5 rounded-bl-xl uppercase tracking-widest">Recommended</div>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-primary">New Tax Regime</p>
                                    <p className="text-4xl font-black text-[#0F172A]">₹2,39,500</p>
                                    <div className="flex items-center gap-2 text-emerald-500 font-black text-sm">
                                        <TrendingUp size={16} />
                                        ₹{savings.toLocaleString()} Extra Savings
                                    </div>
                                </div>
                            </div>

                            <div className="mt-10 p-6 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center gap-6">
                                <div className="w-12 h-12 rounded-xl bg-emerald-500 flex items-center justify-center text-white shadow-lg shadow-emerald-200 shrink-0">
                                    <Zap size={24} fill="white" />
                                </div>
                                <div>
                                    <p className="text-sm font-black text-emerald-900">AI Recommendation</p>
                                    <p className="text-sm text-emerald-700 font-medium leading-relaxed">Based on your ₹15L CTC, switching to the New Regime will increase your monthly take-home by ₹3,750 without any extra investments.</p>
                                </div>
                            </div>
                        </div>

                        {/* Visual Breakdown Placeholder */}
                        <div className="bg-[#04050a] rounded-[2.5rem] p-10 shadow-2xl overflow-hidden relative">
                            <div className="absolute inset-0 mesh-gradient opacity-20 pointer-events-none"></div>
                            <div className="flex items-center justify-between mb-8 relative z-10">
                                <h3 className="text-xl font-black text-white flex items-center gap-3">
                                    <Info className="text-primary" size={24} />
                                    Take-home Breakdown
                                </h3>
                                <button className="text-[11px] font-black text-white/40 uppercase tracking-widest hover:text-white transition-colors">Details</button>
                            </div>
                            <div className="h-64 flex flex-col justify-end gap-6 relative z-10">
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between text-[11px] font-black uppercase tracking-widest text-white/40">
                                        <span>Base Pay</span>
                                        <span>₹11,40,000</span>
                                    </div>
                                    <div className="h-4 bg-white/5 rounded-full overflow-hidden">
                                        <div className="h-full bg-premium-gradient w-[76%] shadow-[0_0_20px_rgba(36,93,241,0.4)]"></div>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between text-[11px] font-black uppercase tracking-widest text-white/40">
                                        <span>Tax (TDS)</span>
                                        <span>₹2,39,500</span>
                                    </div>
                                    <div className="h-4 bg-white/5 rounded-full overflow-hidden">
                                        <div className="h-full bg-red-500 w-[16%] shadow-[0_0_20px_rgba(239,68,68,0.4)]"></div>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between text-[11px] font-black uppercase tracking-widest text-white/40">
                                        <span>Employer PF</span>
                                        <span>₹1,20,500</span>
                                    </div>
                                    <div className="h-4 bg-white/5 rounded-full overflow-hidden">
                                        <div className="h-full bg-amber-500 w-[8%] shadow-[0_0_20px_rgba(245,158,11,0.4)]"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-10">
                        <div className="premium-card p-10 bg-white space-y-8 group overflow-hidden">
                            <div className="w-16 h-16 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 transition-transform group-hover:scale-110 group-hover:rotate-6">
                                <ShieldCheck size={32} />
                            </div>
                            <h4 className="text-2xl font-black text-[#0F172A] tracking-tight">Compliance Guard</h4>
                            <p className="text-[#475569] font-medium leading-relaxed">Our AI automatically updates your tax projections based on the latest 2026-27 Union Budget changes.</p>
                            <button className="w-full py-4 rounded-xl border border-[#F1F5F9] font-black text-sm text-[#0F172A] hover:bg-slate-50 transition-all flex items-center justify-center gap-3 active:scale-95 btn-elite">
                                Export Projection
                                <ArrowRight size={18} />
                            </button>
                        </div>

                        <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-[2.5rem] p-10 text-white relative overflow-hidden group shadow-2xl">
                            <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
                            <h4 className="text-xl font-black mb-4 flex items-center gap-2">
                                <Sparkles size={20} />
                                Next Step
                            </h4>
                            <p className="text-white/70 font-medium mb-8">Switching to the recommended regime can be done in one click. We'll update your payroll structure automatically.</p>
                            <button className="w-full bg-white text-indigo-600 py-5 rounded-2xl font-black shadow-xl hover:scale-105 transition-all active:scale-95 btn-elite">
                                Declare Regime
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
