"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import { HeartPulse, ShieldCheck, Users, Activity, Phone, FileText, ChevronRight, CheckCircle2, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function InsurancePage() {
    return (
        <DashboardLayout>
            <div className="space-y-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <h1 className="text-3xl font-black text-[#0F172A] mb-2">Health & Benefits</h1>
                        <p className="text-[#475569] font-medium">Manage group health insurance and employee wellness programs.</p>
                    </div>
                    <button className="bg-primary text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all flex items-center gap-2 active:scale-95">
                        Upgrade Plan
                    </button>
                </div>

                {/* Active Policy Overview */}
                <div className="premium-card bg-primary p-8 md:p-12 relative overflow-hidden text-primary-foreground">
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-500/10 rounded-full blur-[120px] -mr-40 -mt-40 pointer-events-none"></div>
                    <div className="relative z-10 flex flex-col lg:flex-row gap-12">
                        <div className="flex-1">
                            <div className="flex items-center gap-6 mb-6">
                                <div className="w-24 h-24 shrink-0 bg-white/10 rounded-2xl border border-white/20 backdrop-blur-md flex items-center justify-center shadow-inner overflow-hidden relative">
                                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
                                    <ShieldCheck size={44} className="text-white drop-shadow-md relative z-10" strokeWidth={1.5} />
                                </div>
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase tracking-widest border border-emerald-500/30 w-max">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                                    Active Policy
                                </div>
                            </div>

                            <h2 className="text-3xl font-black mb-2">Comprehensive Group Health</h2>
                            <p className="text-white/60 font-medium mb-8 max-w-lg leading-relaxed">Top-tier medical coverage for your employees and their dependents, underwritten by HDFC ERGO.</p>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                <div>
                                    <p className="text-[10px] text-white/40 font-bold uppercase tracking-wider mb-1">Coverage</p>
                                    <p className="text-xl font-black">₹5,00,000</p>
                                </div>
                                <div>
                                    <p className="text-[10px] text-white/40 font-bold uppercase tracking-wider mb-1">Enrolled</p>
                                    <p className="text-xl font-black">124 <span className="text-sm text-white/50 font-medium">/ 150</span></p>
                                </div>
                                <div>
                                    <p className="text-[10px] text-white/40 font-bold uppercase tracking-wider mb-1">Valid Until</p>
                                    <p className="text-xl font-black">Mar 2027</p>
                                </div>
                                <div>
                                    <p className="text-[10px] text-white/40 font-bold uppercase tracking-wider mb-1">Premium</p>
                                    <p className="text-xl font-black text-emerald-400">Paid</p>
                                </div>
                            </div>
                        </div>

                        <div className="w-full lg:w-72 shrink-0 bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-md relative overflow-hidden group">
                            <div className="absolute right-0 top-0 w-32 h-32 bg-white/5 rounded-full blur-2xl group-hover:bg-white/10 transition-colors"></div>
                            <Activity size={32} className="text-red-400 mb-4" />
                            <h3 className="text-lg font-black mb-2">Claim Assistance</h3>
                            <p className="text-sm text-white/50 mb-6">24/7 dedicated support desk for cashless hospitalization and reimbursements.</p>

                            <button className="w-full bg-white text-[#0F172A] py-3 rounded-xl font-bold text-sm shadow-xl hover:bg-white/90 transition-all flex items-center justify-center gap-2">
                                <Phone size={16} /> Contact Support
                            </button>
                        </div>
                    </div>
                </div>

                {/* Features Grid */}
                <div className="grid md:grid-cols-3 gap-6">
                    <motion.div
                        whileHover={{ y: -5 }}
                        className="premium-card p-8 bg-white border border-[#F1F5F9] hover:border-primary/20 transition-all cursor-pointer group"
                    >
                        <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-blue-500 group-hover:text-white transition-all">
                            <Users size={24} />
                        </div>
                        <h3 className="text-lg font-black text-[#0F172A] mb-2">Manage Dependents</h3>
                        <p className="text-sm text-[#475569] font-medium leading-relaxed mb-6">Add or remove spouses, children, and parents from the active policy.</p>

                        <div className="flex items-center text-primary font-bold text-sm">
                            View employee roster <ChevronRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                        </div>
                    </motion.div>

                    <motion.div
                        whileHover={{ y: -5 }}
                        className="premium-card p-8 bg-white border border-[#F1F5F9] hover:border-primary/20 transition-all cursor-pointer group"
                    >
                        <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-500 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-purple-500 group-hover:text-white transition-all">
                            <FileText size={24} />
                        </div>
                        <h3 className="text-lg font-black text-[#0F172A] mb-2">Policy Documents</h3>
                        <p className="text-sm text-[#475569] font-medium leading-relaxed mb-6">Download e-cards, policy wordings, and the list of network hospitals.</p>

                        <div className="flex items-center text-primary font-bold text-sm">
                            Access folder <ChevronRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                        </div>
                    </motion.div>

                    <motion.div
                        whileHover={{ y: -5 }}
                        className="premium-card p-8 bg-white border border-[#F1F5F9] hover:border-primary/20 transition-all cursor-pointer group relative overflow-hidden"
                    >
                        <div className="absolute -right-4 -top-4 w-24 h-24 bg-amber-50 rounded-full blur-2xl"></div>
                        <div className="relative z-10 w-12 h-12 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center mb-6 px-1">
                            <AlertCircle size={24} />
                        </div>
                        <h3 className="text-lg font-black text-[#0F172A] mb-2 relative z-10">Pending Endorsements</h3>
                        <p className="text-sm text-[#475569] font-medium leading-relaxed mb-6 relative z-10">12 new employees are waiting to be added to the health insurance roster.</p>

                        <button className="relative z-10 w-full bg-amber-50 hover:bg-amber-100 text-amber-600 font-bold py-2.5 rounded-lg text-sm transition-colors text-center">
                            Review Additions
                        </button>
                    </motion.div>
                </div>

                {/* Value Adds */}
                <div className="mt-8">
                    <h3 className="text-sm font-black uppercase tracking-widest text-[#64748B] mb-6">Included Wellness Benefits</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-white p-6 rounded-2xl border border-[#F1F5F9] flex items-center gap-4 hover:shadow-md transition-shadow">
                            <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500 shrink-0">
                                <CheckCircle2 size={20} />
                            </div>
                            <div>
                                <h4 className="font-bold text-[#0F172A] text-sm">Free Annual Tele-consultations</h4>
                                <p className="text-xs text-[#475569] mt-0.5">Unlimited access to general physicians on the app.</p>
                            </div>
                        </div>
                        <div className="bg-white p-6 rounded-2xl border border-[#F1F5F9] flex items-center gap-4 hover:shadow-md transition-shadow">
                            <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500 shrink-0">
                                <CheckCircle2 size={20} />
                            </div>
                            <div>
                                <h4 className="font-bold text-[#0F172A] text-sm">Discounted Health Checkups</h4>
                                <p className="text-xs text-[#475569] mt-0.5">Up to 40% off on comprehensive body checks at partner labs.</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </DashboardLayout>
    );
}
