"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import { Clock, Calendar, CalendarCheck, CalendarOff, History, ChevronRight, MapPin, AlertTriangle, RefreshCw, ArrowLeft, Sparkles, FileText } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function AttendancePage() {
    const router = useRouter();

    return (
        <DashboardLayout>
            <div className="space-y-8 animate-in fade-in duration-500">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                        <button 
                            onClick={() => router.push('/dashboard')}
                            className="p-2 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-primary hover:border-primary transition-all shadow-sm group"
                        >
                            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                        </button>
                        <div>
                            <h1 className="text-3xl font-black text-[#0F172A] mb-1 tracking-tight">Attendance & Leaves</h1>
                            <p className="text-[#475569] font-medium">Clock in, clock out, and track your time-off balances.</p>
                        </div>
                    </div>
                    <button className="bg-[#245DF1] text-white px-8 py-3.5 rounded-2xl font-black uppercase tracking-wider text-sm shadow-xl shadow-blue-500/20 hover:bg-blue-600 transition-all border-b-4 border-blue-800 active:border-b-0 active:translate-y-1">
                        Apply Leave
                    </button>
                </div>

                {/* Automation & Security Indicators */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    {/* Geofencing Pulse UI */}
                    <div className="bg-emerald-50 border border-emerald-100 p-5 rounded-2xl flex items-center justify-between shadow-sm relative overflow-hidden group hover:scale-[1.02] transition-transform">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-200/20 rounded-full blur-3xl -mr-10 -mt-10"></div>
                        <div className="flex items-center gap-4 relative z-10">
                            <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-sm relative">
                                <MapPin size={24} className="text-emerald-600" />
                                <motion.div 
                                    animate={{ scale: [1, 2, 1], opacity: [0.5, 0, 0.5] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                    className="absolute inset-0 bg-emerald-400 rounded-xl"
                                />
                            </div>
                            <div>
                                <div className="flex items-center gap-2">
                                    <p className="text-[11px] font-black text-emerald-600 uppercase tracking-widest">Geofencing Active</p>
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                                </div>
                                <p className="text-[14px] font-bold text-slate-800">HQ Office Space <span className="text-slate-400 font-medium ml-1">(Verified)</span></p>
                            </div>
                        </div>
                        <div className="text-right relative z-10">
                            <p className="text-[20px] font-black text-emerald-700">200m</p>
                            <p className="text-[9px] font-bold text-emerald-600/60 uppercase tracking-tighter">Current Radius</p>
                        </div>
                    </div>

                    {/* Auto-LOP Guard */}
                    <div className="bg-amber-50 border border-amber-100 p-5 rounded-2xl flex items-center justify-between shadow-sm relative overflow-hidden group hover:scale-[1.02] transition-transform">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-200/20 rounded-full blur-3xl -mr-10 -mt-10"></div>
                        <div className="flex items-center gap-4 relative z-10">
                            <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-sm">
                                <AlertTriangle size={24} className="text-amber-600" />
                            </div>
                            <div>
                                <div className="flex items-center gap-2">
                                    <p className="text-[11px] font-black text-amber-600 uppercase tracking-widest">Smart LOP Guard</p>
                                    <RefreshCw size={10} className="text-amber-500 animate-spin" />
                                </div>
                                <p className="text-[14px] font-bold text-slate-800">Automated Accrual Sync</p>
                            </div>
                        </div>
                        <div className="text-right relative z-10">
                            <div className="bg-amber-500/10 text-amber-600 px-3 py-1 rounded-full text-[10px] font-black uppercase border border-amber-500/20">
                                Live Tracking
                            </div>
                        </div>
                    </div>
                </div>

                {/* Premium Banner */}
                <div className="premium-card bg-primary p-8 md:p-10 relative overflow-hidden text-primary-foreground flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-[100px] -mr-10 -mt-10"></div>
                    <div className="relative z-10 flex items-center gap-6">
                        <div className="w-24 h-24 shrink-0 bg-white/10 rounded-2xl border border-white/20 backdrop-blur-md flex items-center justify-center shadow-inner overflow-hidden relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
                            <Clock size={44} className="text-white drop-shadow-md relative z-10" strokeWidth={1.5} />
                        </div>
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-[10px] font-bold uppercase tracking-widest mb-2 border border-white/30 backdrop-blur-sm">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]"></span>
                                On the Clock
                            </div>
                            <h2 className="text-3xl font-black mb-1">09:14 AM</h2>
                            <p className="text-primary-foreground/80 text-sm font-medium">You clocked in 2 hours ago. Have a great day!</p>
                        </div>
                    </div>
                    <div className="relative z-10 flex flex-col items-end shrink-0 w-full md:w-auto mt-4 md:mt-0">
                        <button className="w-full md:w-auto bg-white text-primary font-bold py-3 px-8 rounded-xl transition-all shadow-md hover:bg-slate-50">
                            Web Clock Out
                        </button>
                    </div>
                </div>

                {/* Balance Cards */}
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="premium-card bg-white p-6 border border-[#F1F5F9] flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center shrink-0">
                            <CalendarCheck size={24} />
                        </div>
                        <div>
                            <p className="text-xs text-[#64748B] font-bold uppercase tracking-wider mb-1">Privilege Leave</p>
                            <p className="text-2xl font-black text-[#0F172A]">14.5 <span className="text-xs text-[#64748B] font-bold">Days</span></p>
                        </div>
                    </div>
                    <div className="premium-card bg-white p-6 border border-[#F1F5F9] flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-orange-50 text-orange-500 flex items-center justify-center shrink-0">
                            <CalendarOff size={24} />
                        </div>
                        <div>
                            <p className="text-xs text-[#64748B] font-bold uppercase tracking-wider mb-1">Sick Leave</p>
                            <p className="text-2xl font-black text-[#0F172A]">6.0 <span className="text-xs text-[#64748B] font-bold">Days</span></p>
                        </div>
                    </div>
                    <div className="premium-card bg-white p-6 border border-[#F1F5F9] flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-500 flex items-center justify-center shrink-0">
                            <Calendar size={24} />
                        </div>
                        <div>
                            <p className="text-xs text-[#64748B] font-bold uppercase tracking-wider mb-1">Comp Off</p>
                            <p className="text-2xl font-black text-[#0F172A]">0.0 <span className="text-xs text-[#64748B] font-bold">Days</span></p>
                        </div>
                    </div>
                </div>

                <div className="premium-card bg-white p-8 border border-[#F1F5F9] cursor-pointer hover:border-primary/20 transition-colors group flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-slate-50 flex items-center justify-center text-[#64748B] group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                            <History size={20} />
                        </div>
                        <div>
                            <h3 className="font-bold text-[#0F172A]">View Leave History & Calendar</h3>
                            <p className="text-xs text-[#475569] font-medium">See public holidays and tracked time.</p>
                        </div>
                    </div>
                    <ChevronRight className="text-slate-300 group-hover:translate-x-1 group-hover:text-primary transition-all" />
                </div>

                {/* Smart LOP Guard Audit Table */}
                <div className="space-y-6 pt-10 border-t border-slate-100">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-100">
                                <AlertTriangle size={20} />
                            </div>
                            <div>
                                <h3 className="text-xl font-black text-[#0F172A] tracking-tight">Smart LOP Guard Audit</h3>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Docked Attendance Log (Current Cycle)</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-[2rem] border border-[#F1F5F9] shadow-xl shadow-slate-200/40 overflow-hidden">
                        <table className="w-full">
                            <thead className="bg-slate-50/50">
                                <tr>
                                    <th className="px-8 py-5 text-left text-[10px] font-black uppercase tracking-[0.2em] text-[#CBD5E1]">Date Docked</th>
                                    <th className="px-8 py-5 text-left text-[10px] font-black uppercase tracking-[0.2em] text-[#CBD5E1]">Leakage Reason</th>
                                    <th className="px-8 py-5 text-left text-[10px] font-black uppercase tracking-[0.2em] text-[#CBD5E1]">System Action</th>
                                    <th className="px-8 py-5 text-right text-[10px] font-black uppercase tracking-[0.2em] text-[#CBD5E1]">Impact (Days)</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {[
                                    { date: '12 Mar 2026', reason: 'Unapproved Absence', action: 'Auto-Docked (No Balance)', days: '-1.0' },
                                    { date: '08 Mar 2026', reason: 'Cumulative Lateness', action: 'Triggered 0.5 Day Dock', days: '-0.5' },
                                    { date: '01 Mar 2026', reason: 'Geofence Exit Breach', action: 'Flagged & Docked by Admin', days: '-0.25' },
                                ].map((row, i) => (
                                    <tr key={i} className="hover:bg-slate-50/50 transition-all group">
                                        <td className="px-8 py-5">
                                            <p className="text-sm font-black text-[#0F172A]">{row.date}</p>
                                        </td>
                                        <td className="px-8 py-5">
                                            <div className="flex items-center gap-2">
                                                <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div>
                                                <p className="text-sm font-bold text-slate-600">{row.reason}</p>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5">
                                            <p className="text-xs font-medium text-slate-400 italic">{row.action}</p>
                                        </td>
                                        <td className="px-8 py-5 text-right">
                                            <span className="px-3 py-1 bg-red-50 text-red-600 rounded-lg text-xs font-black border border-red-100">
                                                {row.days}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="p-6 bg-slate-900 rounded-[2rem] text-white flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Sparkles className="text-primary" size={20} />
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Nova AI Insight</p>
                                <p className="text-sm font-bold">You can recover <span className="text-primary">1.5 days</span> by regularizing lateness via the Portal.</p>
                            </div>
                        </div>
                        <button className="px-6 py-2 bg-white/10 hover:bg-white/20 rounded-xl text-[10px] font-black uppercase tracking-widest border border-white/20 transition-all">
                            Regularize Now
                        </button>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
