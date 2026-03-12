"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import { Download, Calculator, ShieldCheck, Info, ArrowUpRight, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function TaxDeductionsPage() {
    return (
        <DashboardLayout>
            <div className="space-y-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <h1 className="text-3xl font-black text-[#0F172A] mb-2">Tax Deductions & TDS</h1>
                        <p className="text-[#475569] font-medium">Manage your tax declarations, view projections, and download Form 16.</p>
                    </div>
                </div>
                {/* Premium Banner */}
                <div className="premium-card bg-primary p-8 md:p-10 relative overflow-hidden text-primary-foreground flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/20 rounded-full blur-[100px] -mr-10 -mt-10"></div>
                    <div className="relative z-10 flex items-center gap-6">
                        <div className="w-24 h-24 shrink-0 bg-white/10 rounded-2xl border border-white/20 backdrop-blur-md flex items-center justify-center shadow-inner overflow-hidden relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
                            <Calculator size={44} className="text-white drop-shadow-md relative z-10" strokeWidth={1.5} />
                        </div>
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 text-[10px] font-black uppercase tracking-widest mb-2 border border-amber-500/30">
                                <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                                FY 2026-27 Active
                            </div>
                            <h2 className="text-2xl font-black mb-1">Tax Regime: New</h2>
                            <p className="text-white/60 text-sm font-medium">Based on your selections, the New Tax Regime is more beneficial for you.</p>
                        </div>
                    </div>
                    <div className="relative z-10 flex flex-col items-end shrink-0 w-full md:w-auto">
                        <p className="text-xs font-bold text-white/50 tracking-wider uppercase mb-1">Projected Total Tax</p>
                        <p className="text-3xl font-black text-amber-400">₹1,24,500</p>
                    </div>
                </div>

                {/* Cards */}
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="premium-card bg-white p-8 border border-[#F1F5F9] hover:border-primary/20 transition-all group">
                        <h3 className="text-lg font-black text-[#0F172A] mb-6 flex items-center justify-between">
                            Investment Declarations
                            <span className="text-[10px] bg-primary/10 text-primary px-2 py-1 rounded-md uppercase tracking-wider">Action Needed</span>
                        </h3>
                        <p className="text-sm text-[#475569] font-medium mb-8 leading-relaxed">
                            Submit your proofs for Section 80C, 80D, and HRA before Mar 15 to avoid excess TDS deduction in the final quarter.
                        </p>
                        <button className="w-full bg-slate-50 hover:bg-slate-100 text-primary font-bold py-3 rounded-xl transition-colors border border-[#F1F5F9] flex items-center justify-center gap-2">
                            <Calculator size={18} /> Add Declarations
                        </button>
                    </div>
                    <div className="premium-card bg-white p-8 border border-[#F1F5F9] hover:border-primary/20 transition-all group">
                        <h3 className="text-lg font-black text-[#0F172A] mb-6 flex items-center justify-between">
                            Form 16
                            <span className="text-[10px] bg-emerald-50 text-emerald-600 px-2 py-1 rounded-md uppercase tracking-wider">Ready</span>
                        </h3>
                        <p className="text-sm text-[#475569] font-medium mb-8 leading-relaxed">
                            Your Form 16 (Part A & Part B) for the previous financial year is generated and digitally signed.
                        </p>
                        <button className="w-full bg-primary text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-primary/20 hover:bg-primary/90 flex items-center justify-center gap-2">
                            <Download size={18} /> Download Form 16
                        </button>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
