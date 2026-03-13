"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import {
    ShieldCheck, CreditCard, Heart, Zap,
    ChevronRight, ArrowUpRight, Plus, Info, ArrowLeft, CheckCircle2,
    Activity, Shield, Star, Award, RefreshCw, Users, HeartPulse
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";

const BENEFITS = [
    {
        title: "Group Health Plan",
        provider: "Plum Premium",
        status: "Active",
        coverage: "₹5,00,000",
        icon: <Heart className="text-[#FF2E79]" size={24} />,
        color: "bg-[#FF2E79]/5",
        desc: "0% Co-pay, unlimited consultations."
    },
    {
        title: "Salary Advance",
        provider: "Nova Instant",
        status: "Enabled",
        coverage: "Up to 3x Salary",
        icon: <CreditCard className="text-[#245DF1]" size={24} />,
        color: "bg-[#245DF1]/5",
        desc: "Interest-free advances for essentials."
    },
    {
        title: "Corporate NPS",
        provider: "PFRDA / NSDL",
        status: "Optional",
        coverage: "Tax Savings",
        icon: <ShieldCheck className="text-[#059669]" size={24} />,
        color: "bg-[#059669]/5",
        desc: "Save up to 10% extra on tax."
    }
];

export default function BenefitsPage() {
    const router = useRouter();
    const [isProcessing, setIsProcessing] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const handleApplyAdvance = () => {
        setIsProcessing(true);
        setTimeout(() => {
            setIsProcessing(false);
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 5000);
        }, 3000);
    };

    return (
        <DashboardLayout>
            <div className="space-y-8 animate-in fade-in duration-500 pb-20">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                        <button 
                            onClick={() => router.push('/dashboard')}
                            className="p-2 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-primary hover:border-primary transition-all shadow-sm group"
                        >
                            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                        </button>
                        <div>
                            <h1 className="text-3xl font-black text-[#0F172A] mb-1 tracking-tight">Nova Perks & Benefits</h1>
                            <p className="text-[#475569] font-medium">Manage your premium coverage and financial well-being.</p>
                        </div>
                    </div>
                </div>

                {/* Hero section: Nova Benefits Ecosystem */}
                <div className="premium-card bg-[#0F172A] p-10 relative overflow-hidden text-white rounded-[2.5rem]">
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] -mr-20 -mt-20"></div>
                    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px] -ml-20 -mb-20"></div>
                    
                    <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-primary/20 text-primary text-[10px] font-black uppercase tracking-widest mb-4 border border-primary/20">
                                <Award size={12} fill="currentColor" /> Elite Membership
                            </div>
                            <h2 className="text-4xl font-black mb-6 tracking-tight leading-tight">
                                Your Financial Health <br /> 
                                <span className="text-primary">Fully Accelerated.</span>
                            </h2>
                            <p className="text-[#94A3B8] font-medium text-lg leading-relaxed mb-8 max-w-lg">
                                Access group insurance, interest-free salary advances, and 1-click tax savings. Powered by the Nova Neural Ledger.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl">
                                    <Shield size={16} className="text-primary" />
                                    <span className="text-xs font-bold">100% Secure</span>
                                </div>
                                <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl">
                                    <Star size={16} className="text-yellow-500" />
                                    <span className="text-xs font-bold">Priority Support</span>
                                </div>
                            </div>
                        </div>

                        {/* Salary Advance Mini-App Simulation */}
                        <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-[2rem] shadow-2xl relative">
                            <h4 className="text-lg font-black mb-1 flex items-center justify-between">
                                Salary Advance Accelerator
                                <Zap size={18} className="text-yellow-400 fill-yellow-400/20" />
                            </h4>
                            <p className="text-slate-400 text-sm mb-6">Eligible Limit: <span className="text-white font-bold">₹1,50,000</span></p>
                            
                            <div className="space-y-4 mb-8">
                                <div className="bg-white/10 p-4 rounded-xl flex justify-between items-center border border-white/5">
                                    <span className="text-xs font-bold text-slate-400 uppercase">Apply For</span>
                                    <span className="text-xl font-black text-white">₹50,000</span>
                                </div>
                                <div className="flex justify-between text-[10px] font-black uppercase text-slate-500 tracking-widest px-2">
                                    <span>Interest Rate: 0%</span>
                                    <span>Tenure: 3 Months</span>
                                </div>
                            </div>

                            <AnimatePresence mode="wait">
                                {isProcessing ? (
                                    <motion.div 
                                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                        className="w-full bg-primary/20 text-primary py-4 rounded-xl flex items-center justify-center gap-3 font-bold text-sm border border-primary/20"
                                    >
                                        <RefreshCw size={18} className="animate-spin" /> Verifying Eligibility...
                                    </motion.div>
                                ) : showSuccess ? (
                                    <motion.div 
                                        initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                                        className="w-full bg-emerald-500 text-white py-4 rounded-xl flex items-center justify-center gap-3 font-bold text-sm shadow-lg shadow-emerald-500/20"
                                    >
                                        <CheckCircle2 size={18} /> Payout Successful!
                                    </motion.div>
                                ) : (
                                    <button 
                                        onClick={handleApplyAdvance}
                                        className="w-full bg-primary text-white py-4 rounded-xl font-black text-sm uppercase tracking-wider hover:bg-primary/90 transition-all shadow-xl shadow-primary/25 border-b-4 border-blue-900 active:border-b-0 active:translate-y-1"
                                    >
                                        1-Click Instant Payout
                                    </button>
                                )}
                            </AnimatePresence>
                            <p className="text-center text-[10px] text-slate-500 font-bold uppercase mt-4 tracking-tighter">Funds credited via IMPS instantly</p>
                        </div>
                    </div>
                </div>

                {/* Benefits Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {BENEFITS.map((b, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="premium-card p-8 bg-white border-[#F1F5F9] hover:border-primary/20 transition-all group cursor-pointer hover:-translate-y-2 shadow-sm hover:shadow-xl rounded-[2rem]"
                        >
                            <div className="flex items-center justify-between mb-8">
                                <div className={`w-14 h-14 rounded-2xl ${b.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                                    {b.icon}
                                </div>
                                <div className="flex gap-1">
                                    <div className="w-1.5 h-1.5 rounded-full bg-primary/20"></div>
                                    <div className="w-1.5 h-1.5 rounded-full bg-primary/40"></div>
                                    <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                                </div>
                            </div>
                            <h3 className="text-xl font-black text-[#0F172A] mb-1">{b.title}</h3>
                            <p className="text-xs font-bold text-[#64748B] mb-4">{b.provider}</p>
                            <p className="text-sm font-medium text-[#475569] leading-relaxed mb-6">{b.desc}</p>

                            <div className="flex items-center justify-between py-4 border-y border-slate-50 mb-6">
                                <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Enrollment Status</span>
                                <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase rounded-lg border border-emerald-100">{b.status}</span>
                            </div>
                            
                            <div className="flex items-center justify-between text-primary font-bold text-sm group/btn">
                                <span>Manage Policy</span>
                                <ArrowUpRight size={18} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Plum Insurance Portal Mockup Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 premium-card bg-white border-[#F1F5F9] rounded-[2.5rem] overflow-hidden flex flex-col">
                        <div className="p-8 border-b border-slate-50 bg-[#FF2E79]/5 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-[#FF2E79] rounded-2xl flex items-center justify-center text-white shadow-lg shadow-[#FF2E79]/20">
                                    <HeartPulse size={24} fill="white" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-black text-[#0F172A]">Group Health Insurance</h3>
                                    <p className="text-xs font-bold text-[#FF2E79] uppercase tracking-widest">Policy No: NOVA-PLM-2026-X882</p>
                                </div>
                            </div>
                            <button className="px-4 py-2 border border-[#FF2E79]/20 text-[#FF2E79] font-black text-[11px] uppercase rounded-xl hover:bg-[#FF2E79]/5 transition-colors">
                                View E-Card
                            </button>
                        </div>
                        <div className="p-8 flex-1 grid md:grid-cols-2 gap-8">
                            <div className="space-y-6">
                                <div>
                                    <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-3">Covered Members</p>
                                    <div className="space-y-3">
                                        {['Self (Active)', 'Spouse (Active)', 'Child (Processing)'].map((m, i) => (
                                            <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-slate-400">
                                                        <Users size={16} />
                                                    </div>
                                                    <span className="text-sm font-bold text-slate-700">{m}</span>
                                                </div>
                                                <CheckCircle2 size={16} className={i < 2 ? "text-emerald-500" : "text-amber-500"} />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <button className="w-full py-4 border-2 border-dashed border-slate-200 rounded-2xl text-slate-400 font-black text-xs uppercase tracking-widest hover:border-primary hover:text-primary transition-all">
                                    + Add New Dependent
                                </button>
                            </div>
                            <div className="space-y-6">
                                <div>
                                    <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-3">Quick Claims</p>
                                    <div className="bg-slate-900 rounded-3xl p-6 text-white relative overflow-hidden">
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl"></div>
                                        <div className="relative z-10">
                                            <h4 className="text-lg font-black mb-2 tracking-tight">Need Hospitalization?</h4>
                                            <p className="text-slate-400 text-xs font-medium leading-relaxed mb-6">
                                                Click below to find 5000+ cashless network hospitals near you instantly.
                                            </p>
                                            <button className="w-full bg-[#FF2E79] py-3 rounded-xl font-bold text-sm hover:shadow-lg shadow-[#FF2E79]/20 transition-all">
                                                Find Cashless Hospital
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-center gap-4">
                                    <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center text-white shadow-inner">
                                        <Activity size={20} />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-slate-600">Free Health Checkup</p>
                                        <p className="text-[10px] text-emerald-600 font-black uppercase">Voucher Available</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Tax Savings Side Card */}
                    <div className="premium-card bg-white border-[#F1F5F9] rounded-[2.5rem] p-8 flex flex-col">
                        <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-6">
                            <Shield size={28} />
                        </div>
                        <h3 className="text-2xl font-black mb-2">Tax Saver NPS</h3>
                        <p className="text-[#64748B] font-medium text-sm leading-relaxed mb-8">
                            Reduce your taxable income by contributing to Corporate NPS. Nova auto-syncs your 80CCD(1B) proofs.
                        </p>
                        <div className="flex-1 space-y-4">
                            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Estimated Savings</p>
                                <p className="text-2xl font-black text-[#0F172A]">₹16,400 <span className="text-xs text-emerald-600">/Year</span></p>
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between text-xs font-bold">
                                    <span className="text-[#64748B]">Contribution Progress</span>
                                    <span>75%</span>
                                </div>
                                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                                    <motion.div 
                                        initial={{ width: 0 }}
                                        animate={{ width: "75%" }}
                                        className="h-full bg-indigo-500"
                                    />
                                </div>
                            </div>
                        </div>
                        <button className="w-full bg-white border-2 border-indigo-600 text-indigo-600 py-4 rounded-2xl font-black text-sm uppercase tracking-wider hover:bg-indigo-50 transition-all mt-8">
                            Modify Contribution
                        </button>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}

