"use client";

import { motion } from "framer-motion";
import DashboardLayout from "@/components/layout/DashboardLayout";
import React, { useState } from "react";
import {
    FileText, CheckCircle2, XCircle,
    ArrowUpRight, Clock, AlertCircle,
    ChevronRight, User, Shield, 
    Zap, ListFilter, Settings2, Sliders,
    Network, ArrowRight, PlusCircle, Trash2,
    Lock, Layers
} from "lucide-react";
import Image from "next/image";

const APPROVALS = [
    { id: "APP-001", type: "Salary Revision", applicant: "Aarav Sharma", detail: "+ ₹15,000 / month", date: "Today", priority: "High" },
    { id: "APP-002", type: "Bank Account Change", applicant: "Isha Gupta", detail: "HDFC Bank (**** 4521)", date: "Yesterday", priority: "Medium" },
    { id: "APP-003", type: "Travel Expense", applicant: "Vikram Singh", detail: "₹4,250 (Mumbai Trip)", date: "2 days ago", priority: "Medium" },
    { id: "APP-004", type: "PF KYC Update", applicant: "Ananya Roy", detail: "Aadhar Linkage", date: "3 days ago", priority: "Urgent" },
];

export default function ApprovalsPage() {
    const [activeTab, setActiveTab] = useState<'All' | 'Policies'>('All');
    const [policies, setPolicies] = useState([
        { id: 'POL-01', name: 'Standard Expense Policy', description: 'Default for travel & meals', rule: 'Amount > ₹5,000 → Manager → Finance', status: 'Active' },
        { id: 'POL-02', name: 'High Value Payouts', description: 'For vendor payments', rule: 'Amount > ₹10L → Owner', status: 'Active' },
        { id: 'POL-03', name: 'Payroll Approval', description: 'Monthly salary runs', rule: 'All → Finance → Owner', status: 'Active' },
    ]);

    return (
        <DashboardLayout>
            <div className="space-y-10 pb-20">
                {/* Header Banner */}
                <div className="premium-card bg-[#0F172A] p-8 md:p-10 relative overflow-hidden text-white flex flex-col md:flex-row items-center justify-between gap-8 mb-2">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[80px] -mr-10 -mt-10"></div>
                    <div className="relative z-10 flex items-center gap-6">
                        <div className="w-20 h-20 shrink-0 bg-white/10 rounded-[2rem] border border-white/10 backdrop-blur-md flex items-center justify-center shadow-2xl relative overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <Shield size={36} className="text-primary group-hover:text-white transition-colors" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-black mb-1 tracking-tight">Governance Hub</h1>
                            <p className="text-slate-400 font-medium text-sm">Review pending authorizations and manage approval guardrails.</p>
                        </div>
                    </div>
                    <div className="relative z-10 flex flex-col items-end gap-2">
                        <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-xl backdrop-blur-md border border-white/10 text-white font-bold text-xs shadow-xl">
                            <Zap className="text-yellow-400" size={14} />
                            <span>Policy Engine Active</span>
                        </div>
                    </div>
                </div>

                {/* Tab Navigation */}
                <div className="flex items-center gap-2 p-1 bg-slate-100 rounded-2xl w-fit border border-slate-200 shadow-inner">
                    <button 
                        onClick={() => setActiveTab('All')}
                        className={`px-8 py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all ${activeTab === 'All' ? 'bg-white shadow-lg text-primary' : 'text-slate-400 hover:text-slate-600'}`}
                    >
                        Pending Actions
                    </button>
                    <button 
                        onClick={() => setActiveTab('Policies')}
                        className={`px-8 py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all ${activeTab === 'Policies' ? 'bg-white shadow-lg text-primary' : 'text-slate-400 hover:text-slate-600'}`}
                    >
                        Policy Engine
                    </button>
                </div>

                {activeTab === 'All' ? (
                    <>
                        {/* Approvals List */}
                        <div className="space-y-4">
                            {APPROVALS.map((app, i) => (
                                <motion.div
                                    key={app.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                    className="premium-card bg-white border-[#F1F5F9] p-8 flex flex-col md:flex-row items-center justify-between gap-8 hover:border-primary/20 transition-all group shadow-xl shadow-slate-200/30 rounded-[2rem]"
                                >
                                    <div className="flex items-center gap-6 flex-grow">
                                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${app.priority === 'Urgent' ? 'bg-red-50 text-red-500 shadow-red-100 shadow-lg' :
                                            app.priority === 'High' ? 'bg-orange-50 text-orange-500 shadow-orange-100 shadow-lg' : 'bg-blue-50 text-blue-500 shadow-blue-100 shadow-lg'
                                            }`}>
                                            <FileText size={24} />
                                        </div>
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-3">
                                                <h3 className="text-xl font-black text-[#0F172A]">{app.type}</h3>
                                                <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full ${app.priority === 'Urgent' ? 'bg-red-100 text-red-600' : 'bg-slate-100 text-[#475569]'
                                                    }`}>{app.priority}</span>
                                            </div>
                                            <div className="flex items-center gap-4 text-sm font-medium text-[#475569]">
                                                <div className="flex items-center gap-1.5">
                                                    <User size={14} className="text-[#94A3B8]" />
                                                    <span>{app.applicant}</span>
                                                </div>
                                                <div className="w-1 h-1 rounded-full bg-slate-200"></div>
                                                <span className="text-primary font-bold">{app.detail}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-6 w-full md:w-auto mt-4 md:mt-0 pt-4 md:pt-0 border-t md:border-t-0 border-slate-50">
                                        <div className="text-right hidden lg:block mr-4">
                                            <p className="text-[10px] font-black uppercase tracking-widest text-[#94A3B8]">Requested</p>
                                            <p className="text-sm font-bold text-[#0F172A]">{app.date}</p>
                                        </div>
                                        <div className="flex items-center gap-3 w-full md:w-auto">
                                            <button className="flex-grow md:flex-none p-3 border border-[#F1F5F9] text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all">
                                                <XCircle size={24} />
                                            </button>
                                            <button className="flex-grow md:flex-none p-3 border border-[#F1F5F9] text-slate-300 hover:text-emerald-500 hover:bg-emerald-50 rounded-xl transition-all">
                                                <CheckCircle2 size={24} />
                                            </button>
                                            <button className="flex-grow md:flex-none bg-[#245DF1] text-white px-8 py-3.5 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-xl shadow-blue-500/20 hover:bg-blue-600 transition-all border-b-4 border-blue-800 active:border-b-0 active:translate-y-1">
                                                Authorize
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </>
                ) : (
                    <div className="space-y-8 animate-in fade-in zoom-in-95 duration-500">
                        {/* Policy Engine Content */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <div className="lg:col-span-2 space-y-6">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-2xl font-black text-slate-800 tracking-tight">Active Policies</h2>
                                    <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-105 transition-all">
                                        <PlusCircle size={14} /> New Policy
                                    </button>
                                </div>

                                {policies.map((policy, i) => (
                                    <div key={policy.id} className="premium-card bg-white p-8 border border-slate-100 hover:border-primary/20 transition-all group overflow-hidden relative rounded-[2.5rem]">
                                        <div className="flex items-start justify-between relative z-10">
                                            <div className="space-y-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 border border-slate-100 group-hover:text-primary transition-colors">
                                                        <Settings2 size={20} />
                                                    </div>
                                                    <div>
                                                        <h4 className="text-lg font-black text-slate-800 tracking-tight">{policy.name}</h4>
                                                        <p className="text-xs text-slate-400 font-medium">{policy.description}</p>
                                                    </div>
                                                </div>
                                                
                                                <div className="flex items-center gap-4 py-4 px-6 bg-slate-50 rounded-[1.5rem] border border-slate-100">
                                                    <Network className="text-primary" size={18} />
                                                    <div className="flex items-center gap-3">
                                                        <span className="text-[11px] font-black text-slate-500 uppercase tracking-widest">Logic:</span>
                                                        <span className="text-[11px] font-black text-slate-800 uppercase tracking-widest flex items-center gap-2">
                                                            {policy.rule.split(' → ').map((step, si) => (
                                                                <React.Fragment key={si}>
                                                                    <span className={si === 0 ? 'text-blue-600' : ''}>{step}</span>
                                                                    {si < policy.rule.split(' → ').length - 1 && <ArrowRight size={12} className="text-slate-300" />}
                                                                </React.Fragment>
                                                            ))}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex flex-col items-end gap-2">
                                                <span className="px-3 py-1 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-full text-[10px] font-black uppercase tracking-widest">
                                                    {policy.status}
                                                </span>
                                                <div className="flex gap-2 mt-4 opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
                                                    <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all">
                                                        <Sliders size={18} />
                                                    </button>
                                                    <button className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-all">
                                                        <Trash2 size={18} />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-8">
                                <div className="premium-card bg-[#245DF1] p-8 text-white relative overflow-hidden rounded-[2.5rem] shadow-2xl shadow-blue-500/40">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full blur-3xl opacity-50"></div>
                                    <h3 className="text-xl font-black relative z-10 mb-4 tracking-tight">Policy Insights</h3>
                                    <p className="text-xs text-white/70 relative z-10 leading-relaxed font-medium mb-8">
                                        Multi-level approvals reduced unauthorized spending by <b>24%</b> last quarter. Current average approval time: <b>4.2 hours</b>.
                                    </p>
                                    <div className="p-6 bg-white/10 rounded-3xl border border-white/10 backdrop-blur-md space-y-4">
                                        <div className="flex items-center justify-between">
                                            <span className="text-[10px] font-black uppercase tracking-widest opacity-60">Security Level</span>
                                            <span className="text-[10px] font-black uppercase tracking-widest text-[#FFD700]">Optimized</span>
                                        </div>
                                        <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                                            <div className="h-full bg-white w-4/5"></div>
                                        </div>
                                    </div>
                                </div>

                                <div className="premium-card bg-orange-50 p-8 border border-orange-100 rounded-[2.5rem]">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center text-orange-500 border border-orange-200 shadow-sm">
                                            <Lock size={20} />
                                        </div>
                                        <h4 className="font-black text-orange-800 tracking-tight">Access Control</h4>
                                    </div>
                                    <p className="text-[11px] text-orange-600 font-bold mb-4 uppercase tracking-widest">Policy Administrators</p>
                                    <div className="space-y-3">
                                        {['Rohan K. (Owner)', 'Finance Admin (Lead)'].map((u, i) => (
                                            <div key={i} className="flex items-center justify-between text-[13px] font-black text-slate-800">
                                                {u}
                                                <ChevronRight size={14} className="text-orange-300" />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Empty State Hint */}
                {activeTab === 'All' && (
                    <div className="text-center py-12">
                        <p className="text-[#64748B] font-medium text-sm italic">You&apos;re all caught up! No more pending approvals for now.</p>
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
}
