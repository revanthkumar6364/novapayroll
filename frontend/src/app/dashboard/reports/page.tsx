"use client";

import { motion } from "framer-motion";
import DashboardLayout from "@/components/layout/DashboardLayout";
import {
    BarChart3, FileText, Download,
    Calendar, TrendingUp, ArrowUpRight,
    PieChart, Activity, Search, Filter
} from "lucide-react";

const REPORTS = [
    { name: "Monthly Payroll Summary", category: "Payroll", lastRun: "01 Mar 2026", format: "PDF, CSV" },
    { name: "EPF Statutory Return", category: "Statutory", lastRun: "15 Feb 2026", format: "Excel" },
    { name: "Professional Tax Report", category: "Compliance", lastRun: "28 Feb 2026", format: "PDF" },
    { name: "Employee TDS Forecast", category: "Tax", lastRun: "Now", format: "PDF, Excel" },
    { name: "Attendance & Leaves", category: "HR", lastRun: "Yesterday", format: "CSV" },
];

export default function ReportsPage() {
    return (
        <DashboardLayout>
            <div className="space-y-10">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <h1 className="text-3xl font-black text-[#0F172A] mb-2">Reports</h1>
                        <p className="text-[#475569] font-medium">Gain deep insights into your payroll, compliance, and workforce trends.</p>
                    </div>
                </div>

                {/* Dashboard Stats */}
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="premium-card p-8 bg-white border-[#F1F5F9] flex flex-col gap-6">
                        <div className="flex items-center justify-between">
                            <div className="w-12 h-12 rounded-2xl bg-primary/5 text-primary flex items-center justify-center">
                                <TrendingUp size={24} />
                            </div>
                            <div className="text-emerald-500 text-xs font-black bg-emerald-50 px-3 py-1 rounded-full">+14.2%</div>
                        </div>
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-[#64748B] mb-1">Annual Payroll Growth</p>
                            <p className="text-3xl font-black text-[#0F172A]">₹45.2L</p>
                        </div>
                    </div>
                    <div className="premium-card p-8 bg-white border-[#F1F5F9] flex flex-col gap-6">
                        <div className="flex items-center justify-between">
                            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                                <PieChart size={24} />
                            </div>
                            <div className="text-indigo-500 text-xs font-black bg-indigo-50 px-3 py-1 rounded-full">Optimized</div>
                        </div>
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-[#64748B] mb-1">Tax Savings (LTA/LTA)</p>
                            <p className="text-3xl font-black text-[#0F172A]">₹2.8L</p>
                        </div>
                    </div>
                    <div className="premium-card p-8 bg-primary text-primary-foreground border-none flex flex-col gap-6 shadow-xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl -mr-10 -mt-10"></div>
                        <div className="flex items-center justify-between relative z-10">
                            <div className="w-12 h-12 rounded-2xl bg-white/10 text-white flex items-center justify-center">
                                <Activity size={24} />
                            </div>
                            <div className="text-white/40 text-[10px] font-black uppercase tracking-widest">Real-time</div>
                        </div>
                        <div className="relative z-10">
                            <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-1">Compliance Score</p>
                            <p className="text-3xl font-black">98.5%</p>
                        </div>
                    </div>
                </div>

                {/* Report List */}
                <div className="premium-card bg-white border-[#F1F5F9] shadow-xl shadow-slate-200/50 overflow-hidden">
                    <div className="p-8 border-b border-slate-50 flex items-center justify-between gap-6">
                        <div className="relative flex-grow max-w-md">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#CBD5E1]" size={18} />
                            <input
                                placeholder="Search reports..."
                                className="w-full bg-slate-50 border border-[#F1F5F9] outline-none pl-12 pr-4 py-3 rounded-2xl text-sm font-medium focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all"
                            />
                        </div>
                        <button className="p-3 border border-[#F1F5F9] rounded-2xl hover:bg-slate-50 transition-colors text-[#64748B]">
                            <Filter size={18} />
                        </button>
                    </div>

                    <div className="divide-y divide-slate-50">
                        {REPORTS.map((report, i) => (
                            <motion.div
                                key={report.name}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.05 }}
                                className="p-8 flex items-center justify-between hover:bg-slate-50/50 transition-colors group cursor-pointer"
                            >
                                <div className="flex items-center gap-6">
                                    <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-[#64748B] group-hover:bg-primary/10 group-hover:text-primary transition-all">
                                        <FileText size={24} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-[#0F172A] text-lg group-hover:text-primary transition-colors">{report.name}</h3>
                                        <div className="flex items-center gap-4 mt-1">
                                            <span className="text-[10px] font-black uppercase tracking-widest text-[#CBD5E1]">{report.category}</span>
                                            <div className="w-1 h-1 rounded-full bg-slate-200"></div>
                                            <span className="text-[10px] font-black uppercase tracking-widest text-[#CBD5E1]">Last run: {report.lastRun}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-6">
                                    <span className="text-xs font-bold text-[#64748B]">{report.format}</span>
                                    <button className="p-3 bg-slate-50 text-[#64748B] rounded-xl hover:bg-primary hover:text-white transition-all shadow-sm group-hover:shadow-lg group-hover:shadow-primary/20">
                                        <Download size={18} />
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
