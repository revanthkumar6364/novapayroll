"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DashboardLayout from "@/components/layout/DashboardLayout";
import {
    Receipt, Plus, Search, Filter,
    CheckCircle2, Clock,
    AlertCircle, FileText, ArrowRight,
    Sparkles, Upload, X, Scan, Zap,
    TrendingUp, ShieldCheck
} from "lucide-react";

const REIMBURSEMENTS = [
    { id: "R-7821", employee: "Reva", amount: "₹4,250", type: "Travel", status: "Approved", date: "02 Mar 2026", desc: "Client site visit taxi fare" },
    { id: "R-7822", employee: "Aarav Sharma", amount: "₹12,800", type: "Equipments", status: "Pending", date: "04 Mar 2026", desc: "Ergonomic chair for home office" },
    { id: "R-7823", employee: "Isha Gupta", amount: "₹1,500", type: "Internet", status: "Processing", date: "05 Mar 2026", desc: "Broadband bill - Feb" },
    { id: "R-7824", employee: "Vikram Singh", amount: "₹5,600", type: "Medical", status: "Rejected", date: "28 Feb 2026", desc: "Health checkup - non-covered" },
];

export default function ReimbursementsPage() {
    const [isScanning, setIsScanning] = useState(false);
    const [showScanner, setShowScanner] = useState(false);

    const handleFileUpload = () => {
        setIsScanning(true);
        setTimeout(() => {
            setIsScanning(false);
            setShowScanner(false);
        }, 3000);
    };

    return (
        <DashboardLayout>
            <div className="space-y-12 pb-20">
                {/* Header Section */}
                <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-10">
                    <div className="space-y-4">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 text-primary text-[10px] font-black uppercase tracking-[0.2em] border border-primary/10">
                            <Zap size={14} className="fill-primary" />
                            Fast-Track Payouts
                        </div>
                        <h1 className="text-5xl font-black text-[#0F172A] tracking-tighter">Claims & <span className="text-gradient">Refunds.</span></h1>
                        <p className="text-[#475569] font-medium text-lg max-w-2xl">Automate your expense policies with AI-powered receipt scanning and instant approval workflows.</p>
                    </div>
                    <div className="flex items-center gap-6">
                        <button
                            onClick={() => setShowScanner(true)}
                            className="bg-primary text-white px-10 py-5 rounded-2xl font-black shadow-premium hover:bg-primary/90 transition-all flex items-center gap-4 active:scale-95 btn-elite"
                        >
                            <Plus size={20} /> Smart Scan
                        </button>
                    </div>
                </div>

                <AnimatePresence>
                    {showScanner && (
                        <motion.div
                            initial={{ opacity: 0, y: -20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -20, scale: 0.95 }}
                            className="relative bg-white rounded-[3rem] p-12 border-2 border-dashed border-primary/20 shadow-2xl overflow-hidden group"
                        >
                            {isScanning && (
                                <motion.div
                                    initial={{ top: "-100%" }}
                                    animate={{ top: "100%" }}
                                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                    className="absolute inset-x-0 h-40 bg-gradient-to-b from-transparent via-primary/10 to-transparent pointer-events-none z-10"
                                />
                            )}
                            <button
                                onClick={() => setShowScanner(false)}
                                className="absolute top-8 right-8 text-[#CBD5E1] hover:text-[#0F172A] transition-colors p-2 hover:bg-slate-50 rounded-xl"
                            >
                                <X size={24} />
                            </button>

                            <div className="flex flex-col items-center justify-center space-y-8 text-center py-10 relative z-10">
                                <div className="w-24 h-24 rounded-[2.5rem] bg-primary/5 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-700">
                                    {isScanning ? <Scan size={44} className="animate-pulse" /> : <Upload size={44} />}
                                </div>
                                <div className="space-y-4">
                                    <h3 className="text-3xl font-black text-[#0F172A] tracking-tight">
                                        {isScanning ? "AI Extracting Data..." : "Drop your receipts here"}
                                    </h3>
                                    <p className="text-[#475569] font-medium max-w-md mx-auto">
                                        Nova AI will automatically extract amount, merchant, and tax details from your receipt images.
                                    </p>
                                </div>
                                {!isScanning && (
                                    <div className="flex items-center gap-6 pt-4">
                                        <button onClick={handleFileUpload} className="px-10 py-4 bg-slate-900 text-white rounded-2xl font-black hover:bg-slate-800 transition-all btn-elite shadow-xl">Select Files</button>
                                        <p className="text-[#CBD5E1] font-black uppercase text-[10px] tracking-widest">or</p>
                                        <div className="flex items-center gap-3 text-primary font-black text-sm cursor-pointer hover:underline">
                                            <Zap size={18} /> Take a Photo
                                        </div>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    <div className="premium-card p-10 bg-white border-[#F1F5F9] group">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                                <Clock size={24} />
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#64748B]">Total Pending</span>
                        </div>
                        <p className="text-4xl font-black text-[#0F172A] tracking-tight">₹12,800</p>
                        <div className="mt-6 flex items-center gap-3 py-2 px-4 rounded-xl bg-orange-50/50 w-fit">
                            <div className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse"></div>
                            <span className="text-xs font-black uppercase tracking-widest text-orange-600">Pending Review</span>
                        </div>
                    </div>
                    <div className="premium-card p-10 bg-white border-[#F1F5F9] group">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                                <CheckCircle2 size={24} />
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#64748B]">Approved This Month</span>
                        </div>
                        <p className="text-4xl font-black text-[#0F172A] tracking-tight">₹4,250</p>
                        <div className="mt-6 flex items-center gap-2 text-emerald-500 font-black text-[11px]">
                            <TrendingUp size={16} />
                            Ready for Next Payout
                        </div>
                    </div>
                    <div className="premium-card p-10 bg-[#04050a] text-white border-none shadow-2xl shadow-primary/30 relative overflow-hidden group">
                        <div className="absolute inset-0 mesh-gradient opacity-20 pointer-events-none"></div>
                        <div className="flex items-center gap-4 mb-6 relative z-10">
                            <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                                <ShieldCheck size={24} />
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Compliance Health</span>
                        </div>
                        <p className="text-4xl font-black tracking-tight relative z-10">98.4%</p>
                        <p className="mt-4 text-[11px] text-white/40 font-medium tracking-tight relative z-10">All claims match GST & Tax patterns</p>
                    </div>
                </div>

                {/* Table Section */}
                <div className="space-y-8">
                    <div className="flex items-center justify-between pb-4 border-b border-[#F1F5F9]">
                        <div className="flex items-center gap-12">
                            {['All Requests', 'Pending', 'Approved', 'Rejected'].map((tab, i) => (
                                <button key={tab} className={`text-sm font-black tracking-tight pb-4 border-b-4 transition-all relative ${i === 0 ? 'text-primary border-primary' : 'text-[#CBD5E1] border-transparent hover:text-slate-600'}`}>
                                    {tab}
                                </button>
                            ))}
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="relative group/search">
                                <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-[#CBD5E1] group-focus-within/search:text-primary transition-colors" size={17} />
                                <input
                                    placeholder="Search receipts..."
                                    className="bg-slate-50 border border-[#F1F5F9] outline-none pl-12 pr-6 py-3 rounded-2xl text-[13px] font-bold text-[#0F172A] placeholder:text-[#64748B] focus:ring-8 focus:ring-primary/5 focus:border-primary transition-all w-64"
                                />
                            </div>
                            <button className="p-3 border border-[#F1F5F9] rounded-2xl hover:bg-slate-50 transition-colors text-[#64748B]">
                                <Filter size={20} />
                            </button>
                        </div>
                    </div>

                    <div className="bg-white rounded-[2.5rem] border border-[#F1F5F9] shadow-xl shadow-slate-200/40 overflow-hidden">
                        <table className="w-full">
                            <thead className="bg-slate-50/50">
                                <tr>
                                    <th className="table-cell-premium text-left text-[10px] font-black uppercase tracking-[0.2em] text-[#CBD5E1]">Transaction & Source</th>
                                    <th className="table-cell-premium text-left text-[10px] font-black uppercase tracking-[0.2em] text-[#CBD5E1]">Category</th>
                                    <th className="table-cell-premium text-left text-[10px] font-black uppercase tracking-[0.2em] text-[#CBD5E1]">Amount</th>
                                    <th className="table-cell-premium text-left text-[10px] font-black uppercase tracking-[0.2em] text-[#CBD5E1]">Verification</th>
                                    <th className="table-cell-premium text-right text-[10px] font-black uppercase tracking-[0.2em] text-[#CBD5E1]">Review</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {REIMBURSEMENTS.map((claim, i) => (
                                    <motion.tr
                                        key={claim.id}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                        className="hover:bg-slate-50/80 transition-all group group/row"
                                    >
                                        <td className="table-cell-premium">
                                            <div className="flex items-center gap-5">
                                                <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center text-[#64748B] transition-all group-hover/row:bg-primary group-hover/row:text-white group-hover/row:scale-110 shadow-sm">
                                                    <FileText size={24} />
                                                </div>
                                                <div>
                                                    <p className="text-[10px] font-black text-[#CBD5E1] uppercase tracking-widest">{claim.id}</p>
                                                    <p className="text-base font-black text-[#0F172A] group-hover/row:text-primary transition-colors">{claim.employee}</p>
                                                    <p className="text-xs text-[#64748B] font-medium">Filed on {claim.date}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="table-cell-premium">
                                            <div className="px-4 py-2 bg-slate-100 rounded-xl text-[11px] font-black uppercase tracking-widest text-slate-600 w-fit">
                                                {claim.type}
                                            </div>
                                        </td>
                                        <td className="table-cell-premium text-lg font-black text-[#0F172A]">
                                            {claim.amount}
                                        </td>
                                        <td className="table-cell-premium">
                                            <div className={`inline-flex items-center gap-2.5 text-[10px] font-black uppercase tracking-widest ${claim.status === 'Approved' ? 'text-emerald-500' :
                                                    claim.status === 'Pending' ? 'text-orange-500' :
                                                        claim.status === 'Rejected' ? 'text-red-400' : 'text-primary'
                                                }`}>
                                                <div className={`w-2 h-2 rounded-full ${claim.status === 'Approved' ? 'bg-emerald-500 shadow-[0_0_8px_#10b981]' :
                                                        claim.status === 'Pending' ? 'bg-orange-500 animate-pulse' :
                                                            claim.status === 'Rejected' ? 'bg-red-400' : 'bg-primary'
                                                    }`}></div>
                                                {claim.status}
                                            </div>
                                        </td>
                                        <td className="table-cell-premium text-right">
                                            <button className="w-12 h-12 rounded-xl border border-[#F1F5F9] flex items-center justify-center text-[#64748B] hover:text-primary hover:border-primary hover:bg-primary/5 transition-all group/btn active:scale-95">
                                                <ArrowRight size={20} className="group-hover/btn:translate-x-1 transition-transform" />
                                            </button>
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
