"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { 
    FileText, Download, Eye, 
    Clock, CheckCircle2, 
    Filter, IndianRupee, RefreshCw
} from "lucide-react";
import { api } from "@/lib/api";

interface Payslip {
    id: string;
    payrollRun: {
        month: number;
        year: number;
    };
    netPay: number;
    createdAt: string;
}

export default function PayslipsPage() {
    const [payslips, setPayslips] = useState<Payslip[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchPayslips = async () => {
        setIsLoading(true);
        try {
            const data = await api.get('/me/payroll/payslips');
            setPayslips(data);
        } catch (err) {
            console.error("Failed to fetch payslips", err);
            // Mock data for demo if API fails
            setPayslips([
                { id: "PS-001", payrollRun: { month: 2, year: 2026 }, netPay: 185200, createdAt: "2026-03-01T10:00:00Z" },
                { id: "PS-002", payrollRun: { month: 1, year: 2026 }, netPay: 185200, createdAt: "2026-02-01T10:00:00Z" },
                { id: "PS-003", payrollRun: { month: 12, year: 2025 }, netPay: 175000, createdAt: "2026-01-01T10:00:00Z" },
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchPayslips();
    }, []);

    const getMonthName = (month: number) => {
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        return months[month - 1];
    };

    return (
        <DashboardLayout>
            <div className="space-y-10">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div className="space-y-2">
                        <div className="flex items-center gap-3 text-primary font-black uppercase tracking-[0.3em] text-[10px]">
                            <span className="w-8 h-[2px] bg-primary"></span>
                            Financial Documents
                        </div>
                        <h1 className="text-4xl font-black text-[#0F172A] tracking-tighter">My Pay Slips</h1>
                        <p className="text-slate-500 font-bold text-lg">Securely view and download your monthly compensation statements.</p>
                    </div>
                    
                    <div className="flex items-center gap-3">
                        <button className="premium-button-secondary px-6 py-3 rounded-2xl flex items-center gap-2 group">
                            <Filter size={18} className="text-slate-400 group-hover:text-primary transition-colors" />
                            <span className="font-black text-[11px] uppercase tracking-widest text-[#64748B]">All Years</span>
                        </button>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                        { label: "Latest Net Pay", value: `₹${payslips[0]?.netPay?.toLocaleString() || "0"}`, icon: IndianRupee, color: "text-emerald-500", bg: "bg-emerald-50/50" },
                        { label: "Total Slips", value: payslips.length, icon: FileText, color: "text-primary", bg: "bg-primary/5" },
                        { label: "Next Scheduled", value: "Apr 01, 2026", icon: Clock, color: "text-indigo-500", bg: "bg-indigo-50/50" }
                    ].map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="premium-card p-8 bg-white/50 backdrop-blur-xl border-slate-100 flex items-center justify-between"
                        >
                            <div className="space-y-1">
                                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#64748B]">{stat.label}</p>
                                <p className="text-2xl font-black text-[#0F172A]">{stat.value}</p>
                            </div>
                            <div className={`w-14 h-14 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center`}>
                                <stat.icon size={24} />
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Payslips Table */}
                <div className="premium-card bg-white/50 backdrop-blur-xl border-slate-100 shadow-2xl shadow-slate-200/40 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-slate-50/50 border-b border-slate-100">
                                    <th className="px-10 py-6 text-left text-[10px] font-black uppercase tracking-[0.3em] text-[#64748B]">Month & Period</th>
                                    <th className="px-10 py-6 text-left text-[10px] font-black uppercase tracking-[0.3em] text-[#64748B]">Document ID</th>
                                    <th className="px-10 py-6 text-left text-[10px] font-black uppercase tracking-[0.3em] text-[#64748B]">Net Payout</th>
                                    <th className="px-10 py-6 text-left text-[10px] font-black uppercase tracking-[0.3em] text-[#64748B]">Status</th>
                                    <th className="px-10 py-6 text-right text-[10px] font-black uppercase tracking-[0.3em] text-[#64748B]">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50/50">
                                {isLoading ? (
                                    <tr>
                                        <td colSpan={5} className="px-10 py-20 text-center">
                                            <RefreshCw className="animate-spin text-primary inline-block mb-4" size={32} />
                                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Loading Documents...</p>
                                        </td>
                                    </tr>
                                ) : payslips.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="px-10 py-20 text-center">
                                            <div className="w-20 h-20 bg-slate-50 rounded-[2.5rem] flex items-center justify-center text-slate-300 mx-auto mb-6">
                                                <FileText size={40} />
                                            </div>
                                            <p className="text-lg font-black text-[#0F172A]">No pay slips found</p>
                                            <p className="text-[12px] font-black uppercase tracking-widest text-[#64748B] mt-2">Your historical documents will appear here.</p>
                                        </td>
                                    </tr>
                                ) : (
                                    payslips.map((slip: Payslip, i: number) => (
                                        <motion.tr
                                            key={slip.id}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: i * 0.1 }}
                                            className="group hover:bg-slate-50/50 transition-colors cursor-pointer"
                                        >
                                            <td className="px-10 py-8">
                                                <div className="flex items-center gap-6">
                                                    <div className="w-14 h-14 rounded-2xl bg-white border border-slate-100 shadow-sm flex flex-col items-center justify-center group-hover:border-primary/20 transition-all">
                                                        <span className="text-[10px] font-black uppercase tracking-tighter text-slate-400 leading-none mb-1">{slip.payrollRun.year}</span>
                                                        <span className="text-sm font-black text-primary leading-none uppercase">{getMonthName(slip.payrollRun.month).substring(0, 3)}</span>
                                                    </div>
                                                    <div className="space-y-1">
                                                        <p className="font-black text-[#0F172A] tracking-tight text-base">{getMonthName(slip.payrollRun.month)} {slip.payrollRun.year}</p>
                                                        <p className="text-[10px] font-black text-[#64748B] uppercase tracking-widest">Released {new Date(slip.createdAt).toLocaleDateString()}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-10 py-8">
                                                <div className="flex items-center gap-2 text-sm font-bold text-slate-500">
                                                    <span className="px-3 py-1 bg-slate-100 rounded-lg font-black text-[10px] text-slate-400 uppercase tracking-widest">NP-{slip.id.substring(0, 6)}</span>
                                                </div>
                                            </td>
                                            <td className="px-10 py-8">
                                                <div className="space-y-0.5">
                                                    <p className="text-[15px] font-black text-[#0F172A]">₹{slip.netPay.toLocaleString()}</p>
                                                    <p className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.2em]">Credited</p>
                                                </div>
                                            </td>
                                            <td className="px-10 py-8">
                                                <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 text-emerald-600 rounded-xl w-fit border border-emerald-100/50">
                                                    <CheckCircle2 size={14} />
                                                    <span className="text-[10px] font-black uppercase tracking-widest">Paid</span>
                                                </div>
                                            </td>
                                            <td className="px-10 py-8 text-right">
                                                <div className="flex items-center justify-end gap-3">
                                                    <button className="w-10 h-10 rounded-xl flex items-center justify-center hover:bg-white border border-transparent hover:border-slate-200 text-slate-400 hover:text-primary transition-all active:scale-90">
                                                        <Eye size={18} />
                                                    </button>
                                                    <button className="w-10 h-10 rounded-xl flex items-center justify-center bg-primary text-white shadow-lg shadow-primary/20 hover:shadow-xl hover:-translate-y-0.5 transition-all active:scale-90">
                                                        <Download size={18} />
                                                    </button>
                                                </div>
                                            </td>
                                        </motion.tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                    {payslips.length > 0 && (
                        <div className="p-8 bg-slate-50/40 border-t border-slate-100 flex items-center justify-between">
                            <p className="text-[11px] font-black text-[#64748B] uppercase tracking-widest">Official Payroll Certificates • Nova Corp</p>
                            <div className="flex gap-4">
                                <button className="px-8 py-3 bg-white border border-slate-200 rounded-xl text-[10px] font-black uppercase tracking-widest text-[#64748B] hover:border-primary/20 hover:bg-primary/5 hover:text-primary transition-all shadow-sm active:scale-95">Pagination Hidden</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </DashboardLayout>
    );
}
