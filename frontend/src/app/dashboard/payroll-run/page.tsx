"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DashboardLayout from "@/components/layout/DashboardLayout";
import {
    Calculator, CheckCircle2, AlertCircle,
    ArrowRight, Landmark, Zap, ShieldCheck,
    Users, DollarSign, PieChart, ChevronRight, History
} from "lucide-react";

export default function PayrollRunPage() {
    const [activeTab, setActiveTab] = useState<'Standard' | 'Arrears' | 'Revisions'>('Standard');

    const downloadPayrollReport = () => {
        const reportContent = `NOVAPAYROLL - PAYROLL BREAKDOWN REPORT
----------------------------------------
Period: March 2026
Personnel Processed: 24 (All Active)
Gross Liability: ₹4,25,000
Net Disbursement: ₹3,80,000

BREAKDOWN:
- Salaries & Performance Bonuses: ₹3,72,000 (Integrity Checked)
- Statutory Deductions (EPF/ESI): ₹38,000 (System Verified)
- Tax Deductions (TDS/LWF): ₹15,000 (Auto Calculated)

Status: Ready for Disbursement
Verified by: Nova AI Compliance Guard
----------------------------------------
Generated securely by Novapayroll Engine.`;

        const blob = new Blob([reportContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `Payroll_Breakdown_Mar2026.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return (
        <DashboardLayout>
            <div className="max-w-6xl mx-auto space-y-16 py-10">
                {/* Header Section */}
                <div className="text-center relative">
                    <div className="absolute inset-0 mesh-gradient opacity-10 blur-3xl -z-10 animate-pulse"></div>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-primary/5 border border-primary/20 text-primary text-[11px] font-black uppercase tracking-[0.25em] mb-8"
                    >
                        <div className="w-2.5 h-2.5 rounded-full bg-primary relative">
                            <div className="absolute inset-0 rounded-full bg-primary animate-ping opacity-40"></div>
                        </div>
                        <span>March 2026 Payroll Session</span>
                    </motion.div>
                    <h1 className="text-5xl md:text-6xl font-black text-[#0F172A] tracking-tighter mb-4 leading-tight">
                        Power your <span className="text-gradient">Disbursements.</span>
                    </h1>
                    <p className="text-[#475569] font-bold text-xl max-w-2xl mx-auto leading-relaxed">
                        Automate mass payouts, statutory filings, and compliance reports with absolute precision and speed.
                    </p>
                </div>

                {/* Sophisticated Step Indicators */}
                <div className="flex items-center justify-center gap-6">
                    {[
                        { step: 1, label: "Review Data", status: "active", icon: Zap },
                        { step: 2, label: "Tax Compliance", status: "pending", icon: ShieldCheck },
                        { step: 3, label: "Release Funds", status: "pending", icon: DollarSign },
                    ].map((s, i) => {
                        const Icon = s.icon;
                        const isActive = s.status === 'active';
                        return (
                            <div key={i} className="flex items-center gap-6">
                                <motion.div
                                    whileHover={{ y: -5 }}
                                    className={`flex items-center gap-4 px-8 py-4 rounded-[2rem] border-2 transition-all relative overflow-hidden ${isActive
                                        ? 'bg-white border-primary shadow-[0_20px_40px_-15px_rgba(36,93,241,0.25)] text-[#0F172A] group'
                                        : 'bg-slate-50/50 border-[#F1F5F9] text-[#64748B] opacity-60'
                                        }`}>
                                    {isActive && <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>}
                                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-[12px] font-black shadow-sm ${isActive ? 'bg-primary text-white' : 'bg-slate-100 text-[#64748B]'
                                        }`}>
                                        <Icon size={16} />
                                    </div>
                                    <span className="text-[11px] font-black uppercase tracking-[0.2em]">{s.label}</span>
                                </motion.div>
                                {i < 2 && (
                                    <div className="w-12 h-0.5 bg-slate-100 relative">
                                        <div className={`absolute inset-0 bg-primary/20 transition-all ${i === 0 ? 'w-full' : 'w-0'}`}></div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* Tabs */}
                <div className="flex items-center justify-center gap-2 p-1.5 bg-slate-100/50 rounded-2xl w-fit mx-auto border border-slate-200/50 mb-8">
                    {(['Standard', 'Arrears', 'Revisions'] as const).map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-8 py-3 rounded-xl font-bold text-sm transition-all ${
                                activeTab === tab 
                                ? 'bg-white text-primary shadow-sm ring-1 ring-slate-200/50 flex items-center gap-2' 
                                : 'text-[#475569] hover:text-slate-700 hover:bg-slate-200/30'
                            }`}
                        >
                            {tab === 'Arrears' && <History size={16} />}
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Advanced Summary Card */}
                <div className="premium-card bg-white/70 backdrop-blur-3xl border-[#F1F5F9]/50 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.1)] p-12 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-[30%] h-[30%] bg-primary/5 rounded-full blur-[100px] pointer-events-none group-hover:bg-primary/10 transition-colors"></div>

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="grid lg:grid-cols-3 gap-16 mb-16 border-b border-[#F1F5F9]/50 pb-16"
                        >
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.25em] text-[#64748B]">
                                <div className="w-8 h-8 rounded-xl bg-slate-50 flex items-center justify-center border border-[#F1F5F9]">
                                    <Users size={16} className="text-[#64748B]" />
                                </div>
                                Personnel
                            </div>
                            <div className="flex items-baseline gap-3">
                                <p className="text-4xl font-black text-[#0F172A]">24</p>
                                <span className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-lg text-[10px] font-black uppercase tracking-widest border border-emerald-100">All Active</span>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.25em] text-[#64748B]">
                                <div className="w-8 h-8 rounded-xl bg-slate-50 flex items-center justify-center border border-[#F1F5F9]">
                                    <DollarSign size={16} className="text-[#64748B]" />
                                </div>
                                Net Disbursement
                            </div>
                            <p className="text-4xl font-black text-[#0F172A] tracking-tighter">₹3,80,000</p>
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.25em] text-[#64748B]">
                                <div className="w-8 h-8 rounded-xl bg-primary/5 flex items-center justify-center border border-primary/10">
                                    <Landmark size={16} className="text-primary" />
                                </div>
                                Gross Liability
                            </div>
                            <div className="flex items-baseline gap-3">
                                <p className="text-4xl font-black text-primary tracking-tighter">₹4,25,000</p>
                            </div>
                        </div>
                        </motion.div>
                    </AnimatePresence>

                    <div className="space-y-10">
                        <div className="flex items-center justify-between">
                            <div className="space-y-1">
                                <h3 className="text-xl font-black text-[#0F172A]">Breakdown Analysis</h3>
                                <p className="text-sm font-bold text-[#64748B]">Detailed tax and bonus distribution for this period.</p>
                            </div>
                            <button onClick={downloadPayrollReport} className="px-6 py-2.5 rounded-xl border border-[#F1F5F9] bg-white text-[11px] font-black uppercase tracking-widest text-primary shadow-sm hover:border-primary/20 hover:bg-primary/5 transition-all active:scale-95">Download PDF</button>
                        </div>

                        <div className="grid md:grid-cols-1 gap-4">
                            {[
                                { label: "Salaries & Performance Bonuses", value: "₹3,72,000", status: "Integrity Checked", color: "emerald", icon: Zap },
                                { label: "Statutory Deductions (EPF/ESI)", value: "₹38,000", status: "System Verified", color: "indigo", icon: ShieldCheck },
                                { label: "Tax Deductions (TDS/LWF)", value: "₹15,000", status: "Auto Calculated", color: "amber", icon: PieChart },
                            ].map((item, i) => {
                                const ItemIcon = item.icon;
                                const colorMap = {
                                    emerald: 'text-emerald-600 bg-emerald-50 border-emerald-100',
                                    indigo: 'text-indigo-600 bg-indigo-50 border-indigo-100',
                                    amber: 'text-amber-600 bg-amber-50 border-amber-100'
                                };
                                const dotMap = {
                                    emerald: 'bg-emerald-500',
                                    indigo: 'bg-indigo-500',
                                    amber: 'bg-amber-500'
                                };
                                return (
                                    <motion.div
                                        key={i}
                                        whileHover={{ x: 10 }}
                                        className="flex items-center justify-between p-8 rounded-3xl bg-slate-50/30 border border-transparent hover:border-primary/20 hover:bg-white transition-all cursor-pointer group shadow-sm hover:shadow-xl hover:shadow-slate-200/40"
                                    >
                                        <div className="flex items-center gap-6">
                                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${colorMap[item.color as keyof typeof colorMap]} transition-transform group-hover:rotate-6 shadow-sm`}>
                                                <ItemIcon size={20} />
                                            </div>
                                            <div>
                                                <span className="text-base font-black text-slate-800 tracking-tight">{item.label}</span>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <div className={`w-1.5 h-1.5 rounded-full ${dotMap[item.color as keyof typeof dotMap]}`}></div>
                                                    <span className="text-[10px] font-black uppercase tracking-widest text-[#64748B]">{item.status}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-8">
                                            <span className="text-xl font-black text-[#0F172A] pr-4">{item.value}</span>
                                            <div className="w-10 h-10 rounded-xl bg-white border border-[#F1F5F9] flex items-center justify-center text-[#CBD5E1] group-hover:text-primary group-hover:border-primary/20 transition-all shadow-sm">
                                                <ChevronRight size={18} />
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Integration Trust Banner */}
                <div className="bg-[#04050a] p-12 rounded-[3rem] relative overflow-hidden group border border-white/5">
                    <div className="absolute top-0 right-0 w-[40%] h-full bg-primary/10 rounded-full blur-[100px] pointer-events-none group-hover:bg-primary/20 transition-all duration-1000"></div>
                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10 text-center md:text-left">
                        <div className="flex flex-col md:flex-row items-center gap-8">
                            <div className="w-16 h-16 rounded-[1.5rem] bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.2)]">
                                <ShieldCheck size={32} />
                            </div>
                            <div>
                                <h3 className="text-2xl font-black text-white mb-2">Compliance Guard Active</h3>
                                <p className="text-white/40 font-bold max-w-lg">We automatically verify your PAN, Aadhaar, and Bank linkages to ensure 100% successful disbursements.</p>
                            </div>
                        </div>
                        <div className="px-8 py-3 bg-white/5 rounded-2xl border border-white/10 text-white/60 font-black text-[10px] uppercase tracking-[0.3em]">
                            Verified by Razorpay Node
                        </div>
                    </div>
                </div>

                {/* Final Execution Button */}
                <div className="pt-10 flex flex-col items-center gap-6">
                    <button className="group relative bg-primary text-white px-16 py-7 rounded-[2.5rem] text-2xl font-black shadow-[0_30px_60px_-15px_rgba(36,93,241,0.5)] hover:bg-primary/90 hover:scale-105 active:scale-95 transition-all flex items-center gap-6 overflow-hidden">
                        <span className="relative z-10">Confirm & Release Funds</span>
                        <ArrowRight size={28} className="relative z-10 group-hover:translate-x-2 transition-transform" />
                        <div className="absolute inset-0 bg-white/10 -translate-x-full group-hover:translate-x-0 transition-transform duration-700"></div>
                    </button>
                    <p className="text-[#64748B] font-bold text-xs uppercase tracking-widest">funds will be debited from your linked corporate account</p>
                </div>
            </div>
        </DashboardLayout>
    );
}
