"use client";

import { motion } from "framer-motion";
import DashboardLayout from "@/components/layout/DashboardLayout";
import {
    FileText, CheckCircle2, XCircle,
    ArrowUpRight, Clock, AlertCircle,
    ChevronRight, User
} from "lucide-react";
import Image from "next/image";

const APPROVALS = [
    { id: "APP-001", type: "Salary Revision", applicant: "Aarav Sharma", detail: "+ ₹15,000 / month", date: "Today", priority: "High" },
    { id: "APP-002", type: "Bank Account Change", applicant: "Isha Gupta", detail: "HDFC Bank (**** 4521)", date: "Yesterday", priority: "Medium" },
    { id: "APP-003", type: "Travel Expense", applicant: "Vikram Singh", detail: "₹4,250 (Mumbai Trip)", date: "2 days ago", priority: "Medium" },
    { id: "APP-004", type: "PF KYC Update", applicant: "Ananya Roy", detail: "Aadhar Linkage", date: "3 days ago", priority: "Urgent" },
];

export default function ApprovalsPage() {
    return (
        <DashboardLayout>
            <div className="space-y-10">
                {/* Header Banner */}
                <div className="premium-card bg-primary p-8 md:p-10 relative overflow-hidden text-primary-foreground flex flex-col md:flex-row items-center justify-between gap-8 mb-2">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[80px] -mr-10 -mt-10"></div>
                    <div className="relative z-10 flex items-center gap-6">
                        <div className="w-24 h-24 shrink-0 bg-white/10 rounded-2xl border border-white/20 backdrop-blur-md flex items-center justify-center shadow-inner overflow-hidden relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
                            <CheckCircle2 size={44} className="text-white drop-shadow-md relative z-10" strokeWidth={1.5} />
                        </div>
                        <div>
                            <h1 className="text-3xl font-black mb-1">Approvals</h1>
                            <p className="text-white/60 font-medium">Review pending requests that require your authorization.</p>
                        </div>
                    </div>
                    <div className="relative z-10 flex items-center gap-2 bg-white/10 px-4 py-2 rounded-xl backdrop-blur-md border border-white/20 text-white font-bold text-sm shadow-xl">
                        <AlertCircle className="text-orange-400" size={18} />
                        <span>{APPROVALS.length} Pending Actions</span>
                    </div>
                </div>

                {/* Filter Tabs */}
                <div className="flex items-center gap-8 border-b border-[#F1F5F9] pb-2">
                    {['All Approvals', 'Salary Tasks', 'Expenses', 'Statutory'].map((tab, i) => (
                        <button key={tab} className={`text-sm font-bold tracking-tight pb-2 border-b-2 transition-all ${i === 0 ? 'text-primary border-primary' : 'text-[#64748B] border-transparent hover:text-[#1E293B]'
                            }`}>
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Approvals List */}
                <div className="space-y-4">
                    {APPROVALS.map((app, i) => (
                        <motion.div
                            key={app.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                            className="premium-card bg-white border-[#F1F5F9] p-8 flex flex-col md:flex-row items-center justify-between gap-8 hover:border-primary/20 transition-all group shadow-xl shadow-slate-200/30"
                        >
                            <div className="flex items-center gap-6 flex-grow">
                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${app.priority === 'Urgent' ? 'bg-red-50 text-red-500' :
                                    app.priority === 'High' ? 'bg-orange-50 text-orange-500' : 'bg-blue-50 text-blue-500'
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
                                    <button className="flex-grow md:flex-none p-3 border border-[#F1F5F9] text-[#64748B] hover:text-red-500 hover:bg-red-50 rounded-xl transition-all">
                                        <XCircle size={24} />
                                    </button>
                                    <button className="flex-grow md:flex-none p-3 border border-[#F1F5F9] text-[#64748B] hover:text-emerald-500 hover:bg-emerald-50 rounded-xl transition-all">
                                        <CheckCircle2 size={24} />
                                    </button>
                                    <button className="flex-grow md:flex-none bg-primary text-white px-8 py-3 rounded-xl font-black text-sm shadow-xl shadow-primary/20 hover:bg-primary/90 transition-all active:scale-95">
                                        Review
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Empty State Hint */}
                <div className="text-center py-12">
                    <p className="text-[#64748B] font-medium text-sm italic">You're all caught up! No more pending approvals for now.</p>
                </div>
            </div>
        </DashboardLayout>
    );
}
