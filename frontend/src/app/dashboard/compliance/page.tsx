"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DashboardLayout from "@/components/layout/DashboardLayout";
import {
    ShieldCheck, AlertTriangle, FileDown,
    CheckCircle2, Clock, Search, Filter,
    Sparkles, Info, X, Zap, ArrowRight,
    Lock, Calendar
} from "lucide-react";

export default function ComplianceHub() {
    const [auditRunning, setAuditRunning] = useState(false);
    const [auditResult, setAuditResult] = useState<any>(null);

    const runAudit = () => {
        setAuditRunning(true);
        setTimeout(() => {
            setAuditResult({
                complianceScore: 92,
                anomalyCount: 2,
                anomalies: [
                    { type: 'PF_CEILING_BREACH', name: 'Aarav Sharma', severity: 'MEDIUM', message: 'PF deduction exceeds statutory cap for basic ₹45,000. Verify voluntary contribution status.' },
                    { type: 'ESI_ELIGIBILITY_ERROR', name: 'Reva', severity: 'HIGH', message: 'ESI deducted for gross ₹42,500 which exceeds the ₹21,000 threshold.' }
                ]
            });
            setAuditRunning(false);
        }, 3000);
    };

    const downloadECR = (type: 'PF' | 'ESI', month: string) => {
        let content = '';
        if (type === 'PF') {
            content = `ECR FORMAT (EPFO)\nUAN# MemberName# GrossWages# EPF_Wages# EPS_Wages# EDLI_Wages# EPF_Contri# EPS_Contri# EPF_Diff# NCP_Days# Refund\n101234567890 Aarav_Sharma 45000 15000 15000 15000 1800 1250 550 0 0\n101234567891 Sneha_Patel 38000 15000 15000 15000 1800 1250 550 0 0\n... (Generated for ${month})`;
        } else {
            content = `ESIC MONTHLY CONTRIBUTION\nIP_Number# IP_Name# No_of_Days# Total_Monthly_Wages# Reason_Code# Last_Working_Day\n1112345678 Reva 31 18500 0\n1112345679 Amit 31 19000 0\n... (Generated for ${month})`;
        }
        
        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${type}_Statement_${month.replace(' ', '_')}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return (
        <DashboardLayout>
            <div className="space-y-12 pb-20">
                {/* Header Section */}
                <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-10">
                    <div className="space-y-4">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-[0.2em] border border-emerald-100">
                            <ShieldCheck size={14} className="fill-emerald-500" />
                            Statutory Compliance Auto-Pilot
                        </div>
                        <h1 className="text-5xl font-black text-[#0F172A] tracking-tighter">Compliance <span className="text-gradient">Hub.</span></h1>
                        <p className="text-[#475569] font-medium text-lg max-w-2xl">Automated e-filing for PF, ESI, and TDS with AI-driven compliance auditing.</p>
                    </div>
                    <div className="flex items-center gap-6">
                        <button
                            onClick={runAudit}
                            disabled={auditRunning}
                            className={`bg-slate-900 text-white px-10 py-5 rounded-2xl font-black shadow-premium hover:bg-slate-800 transition-all flex items-center gap-4 active:scale-95 btn-elite ${auditRunning ? 'opacity-50 animate-pulse' : ''}`}
                        >
                            {auditRunning ? <Zap size={20} className="animate-spin" /> : <Sparkles size={20} />}
                            {auditRunning ? 'Auditing Payroll...' : 'Run Compliance Guard'}
                        </button>
                    </div>
                </div>

                <AnimatePresence>
                    {auditResult && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="grid grid-cols-1 xl:grid-cols-3 gap-10"
                        >
                            <div className="xl:col-span-2 space-y-8">
                                <div className="bg-orange-50/50 border border-orange-100 rounded-[3rem] p-10 space-y-6">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center">
                                                <AlertTriangle size={24} />
                                            </div>
                                            <h3 className="text-2xl font-black text-[#0F172A] tracking-tight">AI Guard Findings</h3>
                                        </div>
                                        <span className="px-4 py-2 bg-white rounded-xl text-xs font-black text-orange-600 uppercase tracking-widest border border-orange-100">
                                            {auditResult.anomalyCount} Anomalies Flagged
                                        </span>
                                    </div>
                                    <div className="space-y-4">
                                        {auditResult.anomalies.map((anom: any, i: number) => (
                                            <div key={i} className="bg-white p-6 rounded-2xl border border-orange-100 flex items-start gap-5 group hover:shadow-lg transition-all">
                                                <div className={`w-2 h-12 rounded-full ${anom.severity === 'HIGH' ? 'bg-red-500' : 'bg-orange-400'}`}></div>
                                                <div className="flex-1">
                                                    <div className="flex items-center justify-between mb-1">
                                                        <p className="text-sm font-black text-[#0F172A]">{anom.name}</p>
                                                        <span className="text-[10px] font-black opacity-40 uppercase tracking-widest">{anom.type}</span>
                                                    </div>
                                                    <p className="text-sm text-[#475569] font-medium leading-relaxed">{anom.message}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="premium-card bg-primary rounded-[3rem] p-10 text-primary-foreground relative overflow-hidden group">
                                <div className="relative z-10 space-y-10">
                                    <div className="space-y-2">
                                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-foreground/60">Compliance Health Score</p>
                                        <p className="text-7xl font-black tracking-tighter text-white">{auditResult.complianceScore}%</p>
                                    </div>
                                    <div className="space-y-6">
                                        <p className="text-sm text-primary-foreground/80 font-medium leading-relaxed">Your payroll run has minor statutory discrepancies that may lead to portal rejection.</p>
                                        <button className="w-full py-4 bg-white text-primary rounded-2xl font-black hover:bg-slate-50 transition-all shadow-md">
                                            Auto-Correct with Nova AI
                                        </button>
                                    </div>
                                </div>
                            </div>

                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Statutory Downloads Section */}
                <div className="space-y-8">
                    <div className="flex items-center justify-between">
                        <h2 className="text-3xl font-black text-[#0F172A] tracking-tight">Ready for <span className="text-gradient">E-Filing.</span></h2>
                        <div className="flex items-center gap-4">
                            <div className="relative group/search">
                                <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-[#CBD5E1] group-focus-within/search:text-primary transition-colors" size={17} />
                                <input
                                    placeholder="Search payroll runs..."
                                    className="bg-slate-50 border border-[#F1F5F9] outline-none pl-12 pr-6 py-3 rounded-2xl text-[13px] font-bold text-[#0F172A] placeholder:text-[#64748B] focus:ring-8 focus:ring-primary/5 focus:border-primary transition-all w-64"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-[2.5rem] border border-[#F1F5F9] shadow-xl shadow-slate-200/40 overflow-hidden">
                        <table className="w-full">
                            <thead className="bg-slate-50/50">
                                <tr>
                                    <th className="table-cell-premium text-left text-[10px] font-black uppercase tracking-[0.2em] text-[#CBD5E1]">Payroll Period</th>
                                    <th className="table-cell-premium text-left text-[10px] font-black uppercase tracking-[0.2em] text-[#CBD5E1]">Status</th>
                                    <th className="table-cell-premium text-left text-[10px] font-black uppercase tracking-[0.2em] text-[#CBD5E1]">PF ECR File</th>
                                    <th className="table-cell-premium text-left text-[10px] font-black uppercase tracking-[0.2em] text-[#CBD5E1]">ESI Monthly</th>
                                    <th className="table-cell-premium text-right text-[10px] font-black uppercase tracking-[0.2em] text-[#CBD5E1]">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {[
                                    { month: 'March 2026', status: 'Locked', employees: 24 },
                                    { month: 'February 2026', status: 'Paid', employees: 22 },
                                    { month: 'January 2026', status: 'Paid', employees: 22 },
                                ].map((run, i) => (
                                    <tr key={i} className="hover:bg-slate-50/80 transition-all group group/row">
                                        <td className="table-cell-premium">
                                            <div className="flex items-center gap-5">
                                                <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center text-[#64748B] group-hover/row:bg-primary group-hover/row:text-white transition-all">
                                                    <Calendar size={24} />
                                                </div>
                                                <div>
                                                    <p className="text-base font-black text-[#0F172A]">{run.month}</p>
                                                    <p className="text-xs text-[#64748B] font-medium">{run.employees} Employees processed</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="table-cell-premium">
                                            <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-600 w-fit">
                                                {run.status === 'Locked' ? <Lock size={12} className="text-orange-500" /> : <CheckCircle2 size={12} className="text-emerald-500" />}
                                                {run.status}
                                            </div>
                                        </td>
                                        <td className="table-cell-premium">
                                            <button onClick={() => downloadECR('PF', run.month)} className="flex items-center gap-2 text-white font-black text-[10px] hover:scale-105 active:scale-95 bg-emerald-500 px-4 py-2.5 rounded-xl transition-all shadow-md shadow-emerald-500/20 group/upload">
                                                <Sparkles size={14} className="group-hover/upload:animate-pulse" /> AUTO-FILE EPFO
                                            </button>
                                        </td>
                                        <td className="table-cell-premium">
                                            <button onClick={() => downloadECR('ESI', run.month)} className="flex items-center gap-2 text-white font-black text-[10px] hover:scale-105 active:scale-95 bg-primary px-4 py-2.5 rounded-xl transition-all shadow-md shadow-primary/20 group/upload">
                                                <Sparkles size={14} className="group-hover/upload:animate-pulse" /> AUTO-FILE ESIC
                                            </button>
                                        </td>
                                        <td className="table-cell-premium text-right">
                                            <button className="w-12 h-12 rounded-xl border border-[#F1F5F9] flex items-center justify-center text-[#64748B] hover:text-primary hover:border-primary hover:bg-primary/5 transition-all group/btn">
                                                <ArrowRight size={20} className="group-hover/btn:translate-x-1 transition-transform" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
