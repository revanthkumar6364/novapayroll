"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DashboardLayout from "@/components/layout/DashboardLayout";
import {
    Calculator, CheckCircle2, AlertCircle,
    ArrowRight, Landmark, Zap, ShieldCheck,
    Users, DollarSign, PieChart, ChevronRight, History,
    Upload, Database, Activity, Search, X, ArrowLeft
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function PayrollRunPage() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<'Standard' | 'Arrears' | 'Revisions'>('Standard');

    // Bulk CSV Engine State
    const [isBulkUploading, setIsBulkUploading] = useState(false);
    const [bulkProgress, setBulkProgress] = useState(0);
    const [bulkStep, setBulkStep] = useState(0); // 0: Idle, 1: Loading, 2: Parsing, 3: Validating, 4: Integrity Check, 5: Done
    const [bulkStats, setBulkStats] = useState({ total: 0, valid: 0, errors: 0 });

    // Multi-Bank Routing State
    const [isRouting, setIsRouting] = useState(false);
    const [routingProgress, setRoutingProgress] = useState(0);
    const [routingComplete, setRoutingComplete] = useState(false);

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

    const handleBulkUploadTrigger = () => {
        setIsBulkUploading(true);
        setBulkStep(1);
        setBulkProgress(0);

        // Simulate 50k rows processing
        setTimeout(() => { setBulkStep(2); setBulkProgress(20); }, 1000);
        setTimeout(() => { setBulkStep(3); setBulkProgress(50); }, 2500);
        setTimeout(() => { setBulkStep(4); setBulkProgress(85); }, 4500);
        setTimeout(() => { 
            setBulkStep(5); 
            setBulkProgress(100);
            setBulkStats({ total: 54128, valid: 54128, errors: 0 });
        }, 6500);
    };

    const handleReleaseFunds = () => {
        setIsRouting(true);
        setRoutingProgress(0);
        setRoutingComplete(false);

        const interval = setInterval(() => {
            setRoutingProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setRoutingComplete(true);
                    return 100;
                }
                return prev + 2;
            });
        }, 80);
    };

    return (
        <DashboardLayout>
            <div className="max-w-6xl mx-auto space-y-16 py-10">
                {/* Header Section */}
                <div className="text-center relative">
                    <button 
                        onClick={() => router.push('/dashboard')}
                        className="absolute left-0 top-0 p-3 bg-white border border-slate-200 rounded-2xl text-slate-400 hover:text-primary hover:border-primary transition-all shadow-sm group active:scale-95 z-20"
                    >
                        <ArrowLeft size={22} className="group-hover:-translate-x-1 transition-transform" />
                    </button>
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

                    {/* Elite Bulk Upload Trigger */}
                    <div className="mt-10 flex justify-center">
                        <motion.button
                            whileHover={{ scale: 1.02, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handleBulkUploadTrigger}
                            className="bg-white border-2 border-slate-100 p-2 rounded-2xl flex items-center gap-4 hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5 transition-all group"
                        >
                            <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                                <Landmark size={24} />
                            </div>
                            <div className="text-left pr-6">
                                <p className="text-[11px] font-black text-[#94A3B8] uppercase tracking-widest mb-0.5">Engine v2.4</p>
                                <p className="text-sm font-black text-[#0F172A]">Run Bulk CSV Disbursement</p>
                            </div>
                            <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-[#94A3B8] group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                                <ChevronRight size={18} />
                            </div>
                        </motion.button>
                    </div>
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
                    <button 
                        onClick={handleReleaseFunds}
                        className="group relative bg-primary text-white px-16 py-7 rounded-[2.5rem] text-2xl font-black shadow-[0_30px_60px_-15px_rgba(36,93,241,0.5)] hover:bg-primary/90 hover:scale-105 active:scale-95 transition-all flex items-center gap-6 overflow-hidden"
                    >
                        <span className="relative z-10">Confirm & Release Funds</span>
                        <ArrowRight size={28} className="relative z-10 group-hover:translate-x-2 transition-transform" />
                        <div className="absolute inset-0 bg-white/10 -translate-x-full group-hover:translate-x-0 transition-transform duration-700"></div>
                    </button>
                    <p className="text-[#64748B] font-bold text-xs uppercase tracking-widest">funds will be debited from your linked corporate account</p>
                </div>
            </div>

            {/* Multi-Bank Routing Visualization Modal */}
            <AnimatePresence>
                {isRouting && (
                    <div className="fixed inset-0 bg-[#0F172A]/90 backdrop-blur-2xl z-[150] flex items-center justify-center p-4">
                        <motion.div 
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-white rounded-[4rem] w-full max-w-5xl overflow-hidden relative shadow-2xl"
                        >
                            <div className="p-20">
                                <div className="flex items-center justify-between mb-16">
                                    <div className="space-y-4">
                                        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 text-primary rounded-full text-[10px] font-black uppercase tracking-widest">
                                            <Activity size={14} className="animate-pulse" /> Payout Routing Intelligent Engine
                                        </div>
                                        <h3 className="text-5xl font-black text-[#0F172A] tracking-tighter">
                                            Routing <span className="text-gradient">₹3,80,000.00</span>
                                        </h3>
                                        <p className="text-[#64748B] text-lg font-medium">Split-disbursement active across 3 high-priority bank nodes.</p>
                                    </div>
                                    <div className="text-right flex flex-col items-end gap-2">
                                        <div className="px-4 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 rounded-lg text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                                            <ShieldCheck size={12} /> Success Rate: 99.9%
                                        </div>
                                        <p className="text-5xl font-black text-primary tracking-tighter">{Math.min(routingProgress, 100)}%</p>
                                        <p className="text-[10px] font-black text-[#94A3B8] uppercase tracking-widest">Uptime Optimized</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                                    {/* Bank Nodes */}
                                    {[
                                        { name: "ICICI Bank Node", type: "Bulk Payout", split: "40%", icon: Landmark, delay: 0 },
                                        { name: "HDFC Primary", type: "Priority IMPS", split: "35%", icon: ShieldCheck, delay: 0.2 },
                                        { name: "YES Bank Node", type: "Failover Route", split: "25%", icon: Zap, delay: 0.4 },
                                    ].map((node, i) => (
                                        <div key={i} className="relative group">
                                            <div className="bg-slate-50 p-10 rounded-[2.5rem] border border-slate-100 space-y-6 relative z-10">
                                                <div className="w-16 h-16 rounded-[1.5rem] bg-white shadow-sm flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                                                    <node.icon size={32} />
                                                </div>
                                                <div>
                                                    <p className="text-2xl font-black text-[#0F172A]">{node.name}</p>
                                                    <p className="text-[11px] font-black text-[#94A3B8] uppercase tracking-widest mt-1">{node.type}</p>
                                                </div>
                                                <div className="pt-4 space-y-2">
                                                    <div className="flex items-center justify-between text-[11px] font-black uppercase tracking-widest">
                                                        <span className="text-[#64748B]">Node Load</span>
                                                        <span className="text-primary">{node.split}</span>
                                                    </div>
                                                    <div className="h-2 bg-white rounded-full overflow-hidden">
                                                        <motion.div 
                                                            initial={{ width: 0 }}
                                                            animate={{ width: routingProgress > (i * 30) ? node.split : 0 }}
                                                            className="h-full bg-primary"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            {/* Data Flow Animation */}
                                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border-2 border-primary/5 rounded-[4rem] -z-10 group-hover:border-primary/20 transition-all"></div>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-16 bg-[#0F172A] rounded-[3rem] p-12 relative overflow-hidden">
                                    <div className="flex items-center justify-between relative z-10">
                                        <div className="flex items-center gap-8">
                                            <div className="w-20 h-20 bg-primary/20 rounded-[2rem] flex items-center justify-center">
                                                <Activity size={40} className="text-primary" />
                                            </div>
                                            <div>
                                                <h4 className="text-2xl font-black text-white">Live Routing Insights</h4>
                                                <p className="text-white/40 font-bold">Multiple routes established. Latency: 42ms. Stability: 99.99%.</p>
                                            </div>
                                        </div>
                                        {routingComplete ? (
                                            <div className="flex items-center gap-4">
                                                <div className="text-right">
                                                    <p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">Disbursement Lock</p>
                                                    <p className="text-xs font-bold text-white/60">Verified via ICICI/HDFC/YES</p>
                                                </div>
                                                <motion.button 
                                                    initial={{ scale: 0.9, opacity: 0 }}
                                                    animate={{ scale: 1, opacity: 1 }}
                                                    onClick={() => setIsRouting(false)}
                                                    className="bg-emerald-500 text-white px-12 py-5 rounded-[2rem] font-black text-sm uppercase tracking-widest shadow-xl shadow-emerald-500/20 hover:bg-emerald-600 transition-all font-sans"
                                                >
                                                    Finish Disbursement
                                                </motion.button>
                                            </div>
                                        ) : (
                                            <div className="flex flex-col items-end gap-2">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-2 h-2 bg-primary rounded-full animate-ping"></div>
                                                    <span className="text-primary font-black text-[11px] uppercase tracking-widest">Optimizing Node Affinity...</span>
                                                </div>
                                                <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest animate-pulse">Switching to Failover: Node 3 Active</p>
                                            </div>
                                        )}
                                    </div>
                                    
                                    {/* Data Stream Visual */}
                                    <div className="absolute inset-x-0 bottom-0 h-1 flex gap-1 opacity-20">
                                        {[...Array(50)].map((_, i) => (
                                            <motion.div 
                                                key={i}
                                                className="h-full w-4 bg-primary"
                                                animate={{ opacity: [0.1, 1, 0.1], scaleY: [1, 2, 1] }}
                                                transition={{ duration: 1, repeat: Infinity, delay: i * 0.05 }}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Bulk Validation Pulse Modal */}
            <AnimatePresence>
                {isBulkUploading && (
                    <div className="fixed inset-0 bg-[#0F172A]/90 backdrop-blur-xl z-[100] flex items-center justify-center p-4">
                        <motion.div 
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-white rounded-[4rem] w-full max-w-4xl overflow-hidden relative shadow-2xl border border-white/10"
                        >
                            <div className="p-16">
                                <div className="flex items-start justify-between mb-16">
                                    <div className="space-y-4">
                                        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 text-primary rounded-full text-[11px] font-black uppercase tracking-widest">
                                            <Activity size={14} className="animate-pulse" /> Data Validation Engine Active
                                        </div>
                                        <h3 className="text-5xl font-black text-[#0F172A] tracking-tighter leading-tight">
                                            Validating <span className="text-gradient">50,000+ Records.</span>
                                        </h3>
                                        <p className="text-[#64748B] text-lg font-medium max-w-md">Running deep integrity audits, bank account verification, and statutory consistency checks.</p>
                                    </div>
                                    <div className="text-right">
                                        <div className="w-24 h-24 rounded-3xl bg-slate-50 border border-slate-100 flex flex-col items-center justify-center mb-2">
                                            <p className="text-3xl font-black text-primary">{bulkProgress}%</p>
                                        </div>
                                        <p className="text-[10px] font-black text-[#94A3B8] uppercase tracking-widest">Global Progress</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                                    {/* Left: Engine Pulse Visual */}
                                    <div className="md:col-span-2 space-y-8">
                                        <div className="aspect-[21/9] bg-[#0F172A] rounded-[2.5rem] relative overflow-hidden group">
                                            {/* Data Rows Simulation */}
                                            <div className="absolute inset-0 p-8 flex flex-col gap-3">
                                                {[...Array(6)].map((_, i) => (
                                                    <motion.div 
                                                        key={i}
                                                        initial={{ x: -100, opacity: 0 }}
                                                        animate={{ x: 0, opacity: 1 }}
                                                        className="h-6 w-full flex gap-4"
                                                    >
                                                        <div className="w-24 h-full bg-slate-800/50 rounded-lg" />
                                                        <div className="w-full h-full bg-slate-800/20 rounded-lg relative overflow-hidden">
                                                            <motion.div 
                                                                className="absolute inset-0 bg-primary/20"
                                                                animate={{ x: ["-100%", "200%"] }}
                                                                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                                                            />
                                                        </div>
                                                        <div className="w-32 h-full bg-slate-800/50 rounded-lg" />
                                                    </motion.div>
                                                ))}
                                            </div>
                                            
                                            {/* The "Pulse" Gate */}
                                            <motion.div 
                                                className="absolute top-0 bottom-0 w-1 bg-primary/50 shadow-[0_0_40px_rgba(36,93,241,1)] z-10"
                                                animate={{ left: ["0%", "100%", "0%"] }}
                                                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                            />
                                            
                                            <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-transparent to-transparent opacity-60 pointer-events-none" />
                                        </div>

                                        <div className="grid grid-cols-3 gap-6">
                                            {[
                                                { label: "Total Rows", value: bulkStats.total ? bulkStats.total.toLocaleString() : "---", icon: Database, color: "text-slate-900" },
                                                { label: "Valid Records", value: bulkStats.valid ? bulkStats.valid.toLocaleString() : "---", icon: CheckCircle2, color: "text-emerald-500" },
                                                { label: "Errors Found", value: "0", icon: AlertCircle, color: "text-red-500" },
                                            ].map((stat, i) => (
                                                <div key={i} className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
                                                    <div className={`w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center mb-4 ${stat.color}`}>
                                                        <stat.icon size={20} />
                                                    </div>
                                                    <p className={`text-2xl font-black ${stat.color}`}>{stat.value}</p>
                                                    <p className="text-[10px] font-black text-[#94A3B8] uppercase tracking-widest mt-1">{stat.label}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Right: Steps and Action */}
                                    <div className="flex flex-col justify-between">
                                        <div className="space-y-8">
                                            {[
                                                { id: 1, label: "Stream Parsing", desc: "Reading 50k CSV buffers" },
                                                { id: 2, label: "Schema Validation", desc: "Checking field type integrity" },
                                                { id: 3, label: "Identity Verification", desc: "Bank Account & IFSC lookups" },
                                                { id: 4, label: "Anomaly Detection", desc: "Duplicate payment scan" },
                                            ].map((step) => (
                                                <div key={step.id} className={`flex gap-4 transition-all duration-500 ${bulkStep < step.id ? 'opacity-20' : 'opacity-100'}`}>
                                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-black ${bulkStep > step.id ? 'bg-emerald-500 text-white' : bulkStep === step.id ? 'bg-primary text-white animate-pulse' : 'bg-slate-100 text-[#94A3B8]'}`}>
                                                        {bulkStep > step.id ? <CheckCircle2 size={16} /> : step.id}
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-black text-[#0F172A]">{step.label}</p>
                                                        <p className="text-[11px] font-bold text-[#64748B]">{step.desc}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        {bulkStep === 5 && (
                                            <motion.div 
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="space-y-4 pt-8"
                                            >
                                                <button 
                                                    onClick={() => setIsBulkUploading(false)}
                                                    className="w-full py-5 bg-[#0F172A] text-white rounded-[2rem] font-black text-sm uppercase tracking-[0.2em] shadow-2xl hover:bg-slate-800 transition-all hover:scale-[1.02] active:scale-95"
                                                >
                                                    Confirm & Load Session
                                                </button>
                                                <button 
                                                    onClick={() => setIsBulkUploading(false)}
                                                    className="w-full text-[11px] font-black text-[#64748B] uppercase tracking-widest hover:text-primary transition-colors"
                                                >
                                                    Discard Results
                                                </button>
                                            </motion.div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </DashboardLayout>
    );
}
