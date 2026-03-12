"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import { Clock, Calendar, CalendarCheck, CalendarOff, History, ChevronRight } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function AttendancePage() {
    return (
        <DashboardLayout>
            <div className="space-y-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <h1 className="text-3xl font-black text-[#0F172A] mb-2">Attendance & Leaves</h1>
                        <p className="text-[#475569] font-medium">Clock in, clock out, and track your time-off balances.</p>
                    </div>
                    <button className="bg-primary text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all">
                        Apply Leave
                    </button>
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
            </div>
        </DashboardLayout>
    );
}
