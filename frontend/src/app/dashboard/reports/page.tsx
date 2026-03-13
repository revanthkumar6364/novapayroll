"use client";

import { motion } from "framer-motion";
import DashboardLayout from "@/components/layout/DashboardLayout";
import {
    BarChart3, FileText, Download,
    Calendar, TrendingUp, ArrowUpRight,
    PieChart, Activity, Search, Filter,
    BrainCircuit, Zap, AlertTriangle, TrendingDown,
    ArrowRight
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

                {/* AI War Room Section */}
                <div className="grid lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 premium-card bg-[#0F172A] p-10 text-white border-none shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] -mr-48 -mt-48 pointer-events-none"></div>
                        <div className="relative z-10">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="p-3 bg-primary/20 rounded-xl">
                                    <BrainCircuit className="text-primary" size={28} />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-black tracking-tight">AI War Room</h2>
                                    <p className="text-slate-400 text-sm font-medium italic">Neural Financial Forecasting Engine Active</p>
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-10">
                                <div className="space-y-8">
                                    <div className="p-6 rounded-2xl bg-white/5 border border-white/10 transition-all hover:bg-white/10 group">
                                        <div className="flex items-center justify-between mb-4">
                                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Cashflow Runway (Q3-Q4)</span>
                                            <Zap size={16} className="text-yellow-400 fill-yellow-400 shadow-glow" />
                                        </div>
                                        <div className="flex items-end justify-between">
                                            <p className="text-4xl font-black text-white">9.4 Months</p>
                                            <div className="flex items-center gap-1 text-emerald-400 text-xs font-bold mb-1">
                                                <TrendingUp size={14} />
                                                Stable
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-6 rounded-2xl bg-white/5 border border-white/10 transition-all hover:bg-white/10">
                                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-4 block">Predicted Burn Rate (Neural)</span>
                                        <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden mt-4 mb-2">
                                            <motion.div 
                                                initial={{ width: 0 }}
                                                animate={{ width: "68%" }}
                                                transition={{ duration: 1.5, ease: "easeOut" }}
                                                className="h-full bg-primary shadow-glow"
                                            ></motion.div>
                                        </div>
                                        <div className="flex justify-between items-center text-[10px] font-black text-slate-500">
                                            <span>OPTIMAL</span>
                                            <span className="text-primary">68% UTILIZATION</span>
                                            <span>THRESHOLD</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <h3 className="text-sm font-black uppercase tracking-widest text-slate-500">Neural Forecast Insights</h3>
                                    <div className="space-y-4">
                                        {[
                                            { label: "Aug 2026 Prediction", val: "₹1.4Cr Disbursal", icon: TrendingUp, color: "text-emerald-400" },
                                            { label: "Tax Liability Drift", val: "₹2.4L Delta", icon: AlertTriangle, color: "text-yellow-400" },
                                            { label: "Hiring Attrition Offset", val: "₹12.2L Savings", icon: BarChart3, color: "text-indigo-400" }
                                        ].map((insight, idx) => (
                                            <div key={idx} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
                                                <div className="flex items-center gap-3">
                                                    <insight.icon size={16} className={insight.color} />
                                                    <span className="text-xs font-bold text-slate-300">{insight.label}</span>
                                                </div>
                                                <span className="text-[11px] font-black text-white">{insight.val}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <button className="w-full py-4 bg-primary rounded-xl text-sm font-black hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2">
                                        Open Full Simulator <ArrowRight size={18} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="premium-card bg-white p-8 border-[#F1F5F9] flex flex-col">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="p-3 bg-red-50 rounded-xl">
                                <AlertTriangle className="text-red-500" size={24} />
                            </div>
                            <h3 className="text-lg font-black text-[#0F172A]">Risk Monitor</h3>
                        </div>
                        
                        <div className="flex-grow space-y-6">
                            <div className="p-6 bg-red-50 rounded-2xl border border-red-100 border-dashed">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-widest text-red-600/60 mb-1">Cashflow Pulse</p>
                                        <p className="text-xl font-black text-red-600 underline decoration-red-200 underline-offset-4">ANOMALY DETECTED</p>
                                    </div>
                                    <div className="w-10 h-10 rounded-full border-4 border-red-200 border-t-red-500 animate-spin"></div>
                                </div>
                                <p className="text-xs font-medium text-red-700/80 leading-relaxed">
                                    Neural engine detected a 22% spike in predicted statutory liabilities for Karnataka Professional Tax in Q3. Verify state-wise accruals.
                                </p>
                            </div>

                            <div className="space-y-4">
                                <p className="text-[10px] font-black uppercase tracking-widest text-[#64748B]">Active Alerts</p>
                                {[
                                    { title: "PF Contribution Gap", status: "Critical", time: "2h ago" },
                                    { title: "LTA Drift Detected", status: "Warning", time: "5h ago" },
                                ].map((alert, idx) => (
                                    <div key={idx} className="flex items-center justify-between py-3 border-b border-slate-50 last:border-none">
                                        <div>
                                            <p className="text-xs font-bold text-[#0F172A]">{alert.title}</p>
                                            <p className="text-[10px] text-slate-400 font-medium">{alert.time}</p>
                                        </div>
                                        <span className={`text-[10px] font-black px-2 py-0.5 rounded ${alert.status === 'Critical' ? 'bg-red-100 text-red-600' : 'bg-yellow-100 text-yellow-600'}`}>
                                            {alert.status}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        
                        <button className="mt-8 py-3 border border-[#F1F5F9] rounded-xl text-xs font-black text-[#64748B] hover:bg-slate-50 transition-all">
                            View All Risks
                        </button>
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
