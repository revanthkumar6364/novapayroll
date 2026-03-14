"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DashboardLayout from "@/components/layout/DashboardLayout";
import {
    ShieldCheck, AlertTriangle, FileDown,
    CheckCircle2, Clock, Search, Filter,
    Sparkles, Info, X, Zap, ArrowRight,
    Lock, Calendar, ArrowLeft, FileText,
    DownloadCloud
} from "lucide-react";
import { useRouter } from "next/navigation";

interface Anomaly {
    type: string;
    name: string;
    severity: 'LOW' | 'MEDIUM' | 'HIGH';
    message: string;
    details: string;
    recommendation: string;
    impact: string;
}

interface AuditResult {
    complianceScore: number;
    anomalyCount: number;
    anomalies: Anomaly[];
}

export default function ComplianceHub() {
    const router = useRouter();
    const [auditRunning, setAuditRunning] = useState(false);
    const [auditResult, setAuditResult] = useState<AuditResult | null>(null);
    const [selectedAnomaly, setSelectedAnomaly] = useState<Anomaly | null>(null);
    const [isRemitting, setIsRemitting] = useState<'PF' | 'ESI' | null>(null); 
    const [remittanceStep, setRemittanceStep] = useState(0); 
    const [activeTab, setActiveTab] = useState<'PF_ESI' | 'TAX_TDS'>('PF_ESI');
    const [isTransmitting, setIsTransmitting] = useState(false);
    const [transmitStatus, setTransmitStatus] = useState<string>("");

    const handleTransmit = async (type: string, runMonth: string) => {
        setIsTransmitting(true);
        setTransmitStatus(`Connecting to ${type} Govt Portal...`);
        await new Promise(r => setTimeout(r, 1500));
        setTransmitStatus(`Authenticating Digital Signature (DSC)...`);
        await new Promise(r => setTimeout(r, 1500));
        setTransmitStatus(`Uploading ECR / Annexure documents...`);
        await new Promise(r => setTimeout(r, 2000));
        setTransmitStatus(`${type} Filing Successful! ARN Generated: ${Math.random().toString(36).substring(7).toUpperCase()}`);
        await new Promise(r => setTimeout(r, 2000));
        setIsTransmitting(false);
    };

    const runAudit = () => {
        setAuditRunning(true);
        setAuditResult(null);
        setTimeout(() => {
            setAuditResult({
                complianceScore: 92,
                anomalyCount: 2,
                anomalies: [
                    { 
                        type: 'PF_CEILING_BREACH', 
                        name: 'Aarav Sharma', 
                        severity: 'MEDIUM', 
                        message: 'PF deduction exceeds statutory cap for basic ₹45,000.',
                        details: 'Statutory limit for mandatory PF is ₹15,000. Employee basic is ₹45,000. System detected deduction on full basic without VPF flag.',
                        recommendation: 'Enable VPF (Voluntary Provident Fund) flag or cap deduction to ₹1,800/month.',
                        impact: 'Potential litigation or portal rejection during ECR filing.'
                    },
                    { 
                        type: 'ESI_ELIGIBILITY_ERROR', 
                        name: 'Reva Reddy', 
                        severity: 'HIGH', 
                        message: 'ESI deducted for gross ₹42,500 which exceeds limit.',
                        details: 'ESI eligibility is capped at ₹21,000 Gross Salary. Employee gross is ₹42,500.',
                        recommendation: 'Stop ESI deduction and move to Corporate Medical Insurance.',
                        impact: 'Financial loss to employee and administrative overhead for refund.'
                    }
                ]
            });
            setAuditRunning(false);
        }, 4000);
    };

    const handleRemittance = (type: 'PF' | 'ESI') => {
        setIsRemitting(type);
        setRemittanceStep(1);
        
        // Multi-bank verification pulse
        setTimeout(() => setRemittanceStep(2), 1500); // Token generation
        setTimeout(() => setRemittanceStep(3), 3500); // Bank API Handshake
        setTimeout(() => setRemittanceStep(4), 5500); // Success
    };

    const downloadECR = (type: 'PF' | 'ESI', runMonth: string) => {
        // Parse month and year from string like "March 2026"
        const [monthName, year] = runMonth.split(' ');
        const monthMap: Record<string, number> = {
            'January': 1, 'February': 2, 'March': 3, 'April': 4, 'May': 5, 'June': 6,
            'July': 7, 'August': 8, 'September': 9, 'October': 10, 'November': 11, 'December': 12
        };
        const monthNum = monthMap[monthName] || 3;
        
        const endpoint = type === 'PF' ? '/api/compliance/pf-ecr' : '/api/compliance/esi-ecr';
        const url = `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}${endpoint}?month=${monthNum}&year=${year}`;
        
        // Open in new tab to trigger download
        window.open(url, '_blank');
    };

    return (
        <DashboardLayout>
            <div className="space-y-12 pb-20">
                {/* Header Section */}
                <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-10">
                    <div className="flex gap-6 items-start">
                        <button 
                            onClick={() => router.push('/dashboard')}
                            className="mt-1 p-2 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-primary hover:border-primary transition-all shadow-sm group shadow-slate-200/50"
                        >
                            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                        </button>
                        <div className="space-y-4">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-[0.2em] border border-emerald-100">
                                <ShieldCheck size={14} className="fill-emerald-500" />
                                Statutory Compliance Auto-Pilot
                            </div>
                            <h1 className="text-5xl font-black text-[#0F172A] tracking-tighter">Compliance <span className="text-gradient">Hub.</span></h1>
                            <div className="flex items-center gap-4">
                                <p className="text-[#475569] font-medium text-lg leading-tight">Automated e-filing for PF, ESI, and TDS.</p>
                                <div className="h-4 w-[1px] bg-slate-200"></div>
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                                    <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Govt Portal: Authenticated</p>
                                </div>
                            </div>
                        </div>
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
                                        <div className="flex items-center gap-4">
                                            <span className="px-4 py-2 bg-white rounded-xl text-xs font-black text-orange-600 uppercase tracking-widest border border-orange-100">
                                                {auditResult.anomalyCount} Anomalies Flagged
                                            </span>
                                            <div className="px-4 py-2 bg-[#0F172A] text-white rounded-xl text-[9px] font-black uppercase tracking-widest flex items-center gap-2 shadow-lg shadow-black/10">
                                                <Lock size={10} /> Digitally Signed
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        {auditResult.anomalies.map((anom: Anomaly, i: number) => (
                                            <motion.div 
                                                key={i} 
                                                whileHover={{ x: 10 }}
                                                onClick={() => setSelectedAnomaly(anom)}
                                                className="bg-white p-6 rounded-2xl border border-orange-100 flex items-start gap-5 group cursor-pointer hover:shadow-xl hover:shadow-orange-500/5 transition-all relative overflow-hidden"
                                            >
                                                <div className={`w-2 h-12 rounded-full ${anom.severity === 'HIGH' ? 'bg-red-500' : 'bg-orange-400'}`}></div>
                                                <div className="flex-1">
                                                    <div className="flex items-center justify-between mb-1">
                                                        <p className="text-sm font-black text-[#0F172A]">{anom.name}</p>
                                                        <span className="text-[10px] font-black opacity-40 uppercase tracking-widest">{anom.type}</span>
                                                    </div>
                                                    <p className="text-sm text-[#475569] font-medium leading-relaxed">{anom.message}</p>
                                                </div>
                                                <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2 text-orange-600 font-bold text-[10px] uppercase tracking-widest">
                                                    View HUD Details <ArrowRight size={14} />
                                                </div>
                                            </motion.div>
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

                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <h3 className="text-xl font-black text-slate-800 tracking-tight">Statutory Calendar</h3>
                        <div className="flex items-center gap-4">
                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Governance Level: <span className="text-emerald-500 italic">Absolute</span></span>
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                        </div>
                    </div>
                    
                    <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
                        {[
                            { date: '15 Mar', title: 'PF Deposit', type: 'EPFO', status: 'Upcoming', color: 'bg-emerald-500' },
                            { date: '15 Mar', title: 'ESI Deposit', type: 'ESIC', status: 'Upcoming', color: 'bg-primary' },
                            { date: '21 Mar', title: 'PT Payment', type: 'Govt', status: 'Upcoming', color: 'bg-orange-500' },
                            { date: '07 Apr', title: 'TDS Deposit', type: 'Income Tax', status: 'Locked', color: 'bg-slate-400' },
                            { date: '10 Apr', title: 'GSTR-1', type: 'GSTN', status: 'Locked', color: 'bg-slate-400' },
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ scale: 1.02 }}
                                className="min-w-[240px] premium-card p-6 bg-white border border-slate-100 flex flex-col justify-between h-44 group cursor-pointer"
                            >
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div className={`px-2 py-1 rounded text-[8px] font-black text-white uppercase tracking-widest ${item.color}`}>
                                            {item.type}
                                        </div>
                                        <span className="text-xs font-black text-slate-300">#{i+102}</span>
                                    </div>
                                    <div>
                                        <p className="text-2xl font-black text-slate-800 tracking-tighter">{item.date}</p>
                                        <p className="text-sm font-bold text-slate-600 mt-1">{item.title}</p>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between border-t border-slate-50 pt-4">
                                    <div className="flex items-center gap-2">
                                        <div className={`w-1.5 h-1.5 rounded-full ${item.status === 'Upcoming' ? 'bg-orange-400 animate-pulse' : 'bg-slate-200'}`}></div>
                                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{item.status}</span>
                                    </div>
                                    <ArrowRight size={14} className="text-slate-300 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                <div className="space-y-10">
                        <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-2xl w-fit">
                            <button 
                                onClick={() => setActiveTab('PF_ESI')}
                                className={`px-8 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'PF_ESI' ? 'bg-white text-primary shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                            >
                                PF & ESI Statutory
                            </button>
                            <button 
                                onClick={() => setActiveTab('TAX_TDS')}
                                className={`px-8 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'TAX_TDS' ? 'bg-white text-primary shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                            >
                                TDS (Form 16) & Tax Returns
                            </button>
                        </div>

                        {activeTab === 'PF_ESI' ? (
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
                                                    <div className="flex flex-col gap-2">
                                                        <button onClick={() => downloadECR('PF', run.month)} className="flex items-center gap-2 text-emerald-600 font-bold text-[10px] hover:bg-emerald-50 px-4 py-2 rounded-xl transition-all uppercase tracking-widest border border-emerald-100">
                                                            <FileDown size={14} /> Download ECR
                                                        </button>
                                                        <button 
                                                            onClick={() => handleRemittance('PF')}
                                                            className="flex items-center gap-2 text-white font-black text-[10px] hover:scale-105 active:scale-95 bg-emerald-500 px-4 py-2.5 rounded-xl transition-all shadow-md shadow-emerald-500/20 group/upload uppercase tracking-widest"
                                                        >
                                                            <Sparkles size={14} className="group-hover/upload:animate-pulse" /> Pay PF Now
                                                        </button>
                                                        {run.status === 'Paid' && (
                                                            <button 
                                                                onClick={() => handleTransmit('EPFO', run.month)}
                                                                className="flex items-center gap-2 text-indigo-600 font-black text-[10px] hover:bg-indigo-50 px-4 py-2.5 rounded-xl transition-all border border-indigo-200 uppercase tracking-widest"
                                                            >
                                                                <Zap size={14} /> Transmit to Portal
                                                            </button>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="table-cell-premium">
                                                    <div className="flex flex-col gap-2">
                                                        <button onClick={() => downloadECR('ESI', run.month)} className="flex items-center gap-2 text-primary font-bold text-[10px] hover:bg-primary/5 px-4 py-2 rounded-xl transition-all uppercase tracking-widest border border-primary/10">
                                                            <FileDown size={14} /> Download Monthly
                                                        </button>
                                                        <button 
                                                            onClick={() => handleRemittance('ESI')}
                                                            className="flex items-center gap-2 text-white font-black text-[10px] hover:scale-105 active:scale-95 bg-primary px-4 py-2.5 rounded-xl transition-all shadow-md shadow-primary/20 group/upload uppercase tracking-widest"
                                                        >
                                                            <Sparkles size={14} className="group-hover/upload:animate-pulse" /> Pay ESI Now
                                                        </button>
                                                        {run.status === 'Paid' && (
                                                            <button 
                                                                onClick={() => handleTransmit('ESIC', run.month)}
                                                                className="flex items-center gap-2 text-indigo-600 font-black text-[10px] hover:bg-indigo-50 px-4 py-2.5 rounded-xl transition-all border border-indigo-200 uppercase tracking-widest"
                                                            >
                                                                <Zap size={14} /> Direct File
                                                            </button>
                                                        )}
                                                    </div>
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
                        ) : (
                            <div className="grid md:grid-cols-2 gap-10">
                                <div className="premium-card bg-white border-[#F1F5F9] p-10 space-y-8">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                                                <FileText size={24} />
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-black text-[#0F172A]">Form 16 (Part A & B)</h3>
                                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Digitally Signed by CA</p>
                                            </div>
                                        </div>
                                        <button className="p-3 bg-slate-50 rounded-xl text-slate-400 hover:text-primary hover:bg-primary/5 transition-all">
                                            <DownloadCloud size={20} />
                                        </button>
                                    </div>
                                    <div className="space-y-4">
                                        {[
                                            { year: "FY 2025-26", status: "GEN-IN-PROGRESS", count: "Scanning Proofs..." },
                                            { year: "FY 2024-25", status: "COMPLETED", count: "24 Forms Generated" }
                                        ].map((item, i) => (
                                            <div key={i} className="p-5 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between group">
                                                <div>
                                                    <p className="font-black text-[#0F172A] text-sm">{item.year}</p>
                                                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{item.count}</p>
                                                </div>
                                                <div className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${item.status === 'COMPLETED' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-orange-50 text-orange-600 border border-orange-100 animate-pulse'}`}>
                                                    {item.status}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="premium-card bg-[#0F172A] border-none p-10 text-white relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -mr-10 -mt-10"></div>
                                    <div className="relative z-10 space-y-8">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-2xl bg-white/5 text-primary flex items-center justify-center">
                                                <ShieldCheck size={24} />
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-black tracking-tight">Tax Returns (24Q / 26Q)</h3>
                                                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Quarterly Govt Submission</p>
                                            </div>
                                        </div>
                                        <div className="p-6 bg-white/5 rounded-2xl border border-white/10 flex items-center justify-between">
                                            <div className="flex items-center gap-4">
                                                <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-glow"></div>
                                                <p className="text-xs font-bold text-slate-300">Q4 (Jan - Mar 2026)</p>
                                            </div>
                                            <span className="text-[9px] font-black text-primary uppercase tracking-widest">READY TO FILE</span>
                                        </div>
                                        <button className="w-full py-4 bg-primary text-white rounded-xl font-black text-xs uppercase tracking-widest hover:shadow-2xl hover:shadow-primary/40 transition-all flex items-center justify-center gap-3">
                                            Sync & File with TRACES <ArrowRight size={16} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
            </div>

            {/* Anomaly HUD Detail Modal */}
            <AnimatePresence>
                {selectedAnomaly && (
                    <div className="fixed inset-0 bg-[#0F172A]/80 backdrop-blur-xl z-[150] flex items-center justify-center p-4">
                        <motion.div 
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-white rounded-[4rem] w-full max-w-2xl overflow-hidden relative shadow-2xl"
                        >
                            <div className="p-16 space-y-10">
                                <div className="flex items-start justify-between">
                                    <div className="space-y-4">
                                        <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${selectedAnomaly.severity === 'HIGH' ? 'bg-red-50 text-red-600' : 'bg-orange-50 text-orange-600'}`}>
                                            <AlertTriangle size={14} /> Critical Audit Finding
                                        </div>
                                        <h3 className="text-4xl font-black text-[#0F172A] tracking-tighter leading-tight">
                                            {selectedAnomaly.name} <br/>
                                            <span className="text-gradient">{selectedAnomaly.type}</span>
                                        </h3>
                                    </div>
                                    <button onClick={() => setSelectedAnomaly(null)} className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-[#64748B] hover:bg-slate-100 transition-all">
                                        <X size={24} />
                                    </button>
                                </div>

                                <div className="space-y-8">
                                    <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 space-y-4">
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Finding Details</p>
                                        <p className="text-lg font-medium text-[#475569] leading-relaxed">{selectedAnomaly.details}</p>
                                    </div>

                                    <div className="grid grid-cols-2 gap-6">
                                        <div className="bg-emerald-50/50 p-8 rounded-[2rem] border border-emerald-100 border-dashed">
                                            <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-3">AI Recommendation</p>
                                            <p className="text-sm font-bold text-emerald-900">{selectedAnomaly.recommendation}</p>
                                        </div>
                                        <div className="bg-red-50/50 p-8 rounded-[2rem] border border-red-100 border-dashed">
                                            <p className="text-[10px] font-black text-red-600 uppercase tracking-widest mb-3">Risk Impact</p>
                                            <p className="text-sm font-bold text-red-900">{selectedAnomaly.impact}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-6 flex gap-4">
                                    <button 
                                        onClick={() => setSelectedAnomaly(null)}
                                        className="flex-1 py-5 bg-[#0F172A] text-white rounded-[2rem] font-black text-sm uppercase tracking-[0.2em] shadow-2xl hover:bg-slate-800 transition-all hover:scale-[1.02]"
                                    >
                                        Auto-Fix Record
                                    </button>
                                    <button 
                                        onClick={() => setSelectedAnomaly(null)}
                                        className="px-10 py-5 bg-slate-50 text-[#64748B] rounded-[2rem] font-black text-sm uppercase tracking-[0.2em] hover:bg-slate-100 transition-all"
                                    >
                                        Ignore
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Remittance Simulation Modal */}
            <AnimatePresence>
                {isRemitting && (
                    <div className="fixed inset-0 bg-[#0F172A]/90 backdrop-blur-2xl z-[200] flex items-center justify-center p-4">
                        <motion.div 
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-white rounded-[4rem] w-full max-w-3xl overflow-hidden relative shadow-2xl"
                        >
                            <div className="p-20 text-center space-y-12">
                                <div className="space-y-4">
                                    <div className="w-24 h-24 bg-primary/10 rounded-[2.5rem] flex items-center justify-center text-primary mx-auto mb-8 relative">
                                        {remittanceStep < 4 ? <Zap size={40} className="animate-pulse" /> : <ShieldCheck size={40} className="text-emerald-500" />}
                                        {remittanceStep < 4 && <div className="absolute inset-0 rounded-[2.5rem] border-4 border-primary border-t-transparent animate-spin"></div>}
                                    </div>
                                    <h3 className="text-5xl font-black text-[#0F172A] tracking-tighter">
                                        {isRemitting === 'PF' ? 'EPFO' : 'ESIC'} <span className="text-gradient">Remittance.</span>
                                    </h3>
                                    <p className="text-xl font-bold text-[#64748B]">Secure multi-bank gateway handshake in progress.</p>
                                </div>

                                <div className="max-w-md mx-auto space-y-6">
                                    {[
                                        { id: 1, label: "Compliance Token Generation" },
                                        { id: 2, label: "Multi-Bank Handshake (ICICI/HDFC)" },
                                        { id: 3, label: "Statutory Portal Auth" },
                                        { id: 4, label: "Payment Success" },
                                    ].map((step) => (
                                        <div key={step.id} className={`flex items-center gap-4 transition-all duration-500 ${remittanceStep < step.id ? 'opacity-20 grayscale' : 'opacity-100'}`}>
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-black ${remittanceStep > step.id ? 'bg-emerald-500 text-white' : remittanceStep === step.id ? 'bg-primary text-white animate-pulse' : 'bg-slate-100 text-[#94A3B8]'}`}>
                                                {remittanceStep > step.id ? <CheckCircle2 size={16} /> : step.id}
                                            </div>
                                            <p className={`text-sm font-black ${remittanceStep === step.id ? 'text-[#0F172A]' : 'text-[#64748B]'}`}>{step.label}</p>
                                            {remittanceStep === step.id && <div className="ml-auto flex gap-1"><div className="w-1 h-1 bg-primary rounded-full animate-bounce"></div><div className="w-1 h-1 bg-primary rounded-full animate-bounce [animation-delay:0.2s]"></div><div className="w-1 h-1 bg-primary rounded-full animate-bounce [animation-delay:0.4s]"></div></div>}
                                        </div>
                                    ))}
                                </div>

                                {remittanceStep === 4 && (
                                    <motion.div
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        className="space-y-6"
                                    >
                                        <div className="inline-flex items-center gap-2 px-6 py-2 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-emerald-100">
                                            <Lock size={12} /> Transaction Digitally Signed by Nova CA
                                        </div>
                                        <br />
                                        <button 
                                            onClick={() => setIsRemitting(null)}
                                            className="px-16 py-6 bg-emerald-500 text-white rounded-[2rem] font-black text-sm uppercase tracking-[0.2em] shadow-xl hover:bg-emerald-600 transition-all"
                                        >
                                            Return to Dashboard
                                        </button>
                                    </motion.div>
                                )}
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
            {/* Portal Transmission HUD */}
            <AnimatePresence>
                {isTransmitting && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-[#0F172A]/90 backdrop-blur-2xl z-[300] flex items-center justify-center p-4"
                    >
                        <motion.div 
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            className="bg-white rounded-[4rem] w-full max-w-2xl p-20 text-center space-y-12 shadow-2xl"
                        >
                            <div className="w-24 h-24 bg-indigo-50 rounded-[2.5rem] flex items-center justify-center text-indigo-600 mx-auto mb-8 relative">
                                <Zap size={40} className="animate-pulse" />
                                <div className="absolute inset-0 rounded-[2.5rem] border-4 border-indigo-600 border-t-transparent animate-spin"></div>
                            </div>
                            <div className="space-y-4">
                                <h3 className="text-4xl font-black text-[#0F172A] tracking-tighter">Direct Portal <span className="text-gradient">Handshake.</span></h3>
                                <p className="text-xl font-bold text-[#64748B]">{transmitStatus}</p>
                            </div>
                            <div className="flex items-center justify-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-indigo-600 animate-bounce"></div>
                                <div className="w-2 h-2 rounded-full bg-indigo-600 animate-bounce [animation-delay:0.2s]"></div>
                                <div className="w-2 h-2 rounded-full bg-indigo-600 animate-bounce [animation-delay:0.4s]"></div>
                            </div>
                            <div className="pt-8 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">
                                Secured by Nova Digital Signature Infrastructure
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </DashboardLayout>
    );
}
