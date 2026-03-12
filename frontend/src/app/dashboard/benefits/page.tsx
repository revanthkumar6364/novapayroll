"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import {
    ShieldCheck, CreditCard, Heart, Zap,
    ChevronRight, ArrowUpRight, Plus, Info
} from "lucide-react";
import { motion } from "framer-motion";

const BENEFITS = [
    {
        title: "Group Health Insurance",
        provider: "Plum / ICICI Lombard",
        status: "Active",
        coverage: "₹5,00,000",
        icon: <Heart className="text-pink-500" size={24} />,
        color: "bg-pink-50"
    },
    {
        title: "Advance Salary / Loans",
        provider: "Nova Capital",
        status: "Enabled",
        coverage: "Up to 3x Salary",
        icon: <CreditCard className="text-blue-500" size={24} />,
        color: "bg-blue-50"
    },
    {
        title: "Corporate NPS",
        provider: "NSDL",
        status: "Optional",
        coverage: "Tax Savings",
        icon: <ShieldCheck className="text-green-500" size={24} />,
        color: "bg-green-50"
    }
];

export default function BenefitsPage() {
    return (
        <DashboardLayout>
            <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight">Employee Benefits</h1>
                <p className="text-muted-foreground mt-1">Manage insurance, advance salary, and tax-saving perks.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                {BENEFITS.map((b, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="premium-card p-6 flex flex-col justify-between hover:border-primary/30 transition-all cursor-pointer group"
                    >
                        <div>
                            <div className={`w-12 h-12 rounded-2xl ${b.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                                {b.icon}
                            </div>
                            <h3 className="font-bold text-lg mb-1">{b.title}</h3>
                            <p className="text-xs text-muted-foreground mb-4">{b.provider}</p>

                            <div className="flex items-center justify-between py-3 border-y border-slate-50 mb-4">
                                <span className="text-[10px] font-bold uppercase text-slate-400">Coverage</span>
                                <span className="text-sm font-bold">{b.coverage}</span>
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <span className="px-2 py-1 rounded-lg bg-green-100 text-green-700 text-[10px] font-bold uppercase">
                                {b.status}
                            </span>
                            <ChevronRight size={16} className="text-slate-300 group-hover:text-primary transition-colors" />
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Loans Table */}
                <div className="premium-card">
                    <div className="p-6 border-b border-border flex items-center justify-between">
                        <h3 className="font-bold flex items-center gap-2">
                            <Zap size={18} className="text-yellow-500" />
                            Active Advances & Loans
                        </h3>
                        <button className="text-primary text-xs font-bold hover:underline">View All</button>
                    </div>
                    <div className="p-0 overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-slate-50">
                                <tr>
                                    <th className="px-6 py-3 text-[10px] font-bold uppercase text-slate-400">Employee</th>
                                    <th className="px-6 py-3 text-[10px] font-bold uppercase text-slate-400">Amount</th>
                                    <th className="px-6 py-3 text-[10px] font-bold uppercase text-slate-400">EMI</th>
                                    <th className="px-6 py-3 text-[10px] font-bold uppercase text-slate-400">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {[
                                    { name: "Rahul Verma", amount: "₹50,000", emi: "5,000/mo", status: "Active" },
                                    { name: "Sneha Reddy", amount: "₹1,20,000", emi: "12,000/mo", status: "Active" },
                                ].map((l, i) => (
                                    <tr key={i} className="hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-4 text-sm font-medium">{l.name}</td>
                                        <td className="px-6 py-4 text-sm font-bold">{l.amount}</td>
                                        <td className="px-6 py-4 text-sm text-slate-500">{l.emi}</td>
                                        <td className="px-6 py-4">
                                            <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 text-[10px] font-bold uppercase">
                                                {l.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <button className="w-full py-4 text-sm font-bold text-primary hover:bg-slate-50 transition-all border-t border-border flex items-center justify-center gap-2">
                        <Plus size={16} /> New Advance Application
                    </button>
                </div>

                {/* AI Insight Card */}
                <div className="premium-card bg-slate-900 text-white p-8 relative overflow-hidden flex flex-col justify-between">
                    <div className="absolute -right-10 -top-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl"></div>
                    <div>
                        <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center mb-6">
                            <Info size={24} className="text-primary-foreground" />
                        </div>
                        <h3 className="text-2xl font-bold mb-3">Policy AI Assistant</h3>
                        <p className="text-slate-400 text-sm leading-relaxed mb-8">
                            "Ask Nova" can answer complex compliance queries about loan interest rates, insurance enrollment windows, and tax-saving perks.
                        </p>
                    </div>

                    <div className="space-y-3">
                        <div className="bg-white/5 border border-white/10 p-3 rounded-xl text-xs flex items-center justify-between hover:bg-white/10 transition-all cursor-pointer group">
                            <span>What is the maximum loan tenure allowed?</span>
                            <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <div className="bg-white/5 border border-white/10 p-3 rounded-xl text-xs flex items-center justify-between hover:bg-white/10 transition-all cursor-pointer group">
                            <span>How do I sync insurance data with Plum?</span>
                            <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <button className="w-full bg-primary text-white py-3 rounded-xl font-bold mt-4 hover:bg-primary/90 transition-all">
                            Initialize Nova AI
                        </button>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
