"use client";

import { motion } from "framer-motion";
import DashboardLayout from "@/components/layout/DashboardLayout";
import {
    Users, UserPlus, Search, Filter,
    MoreHorizontal, Mail, Phone, Building,
    ChevronRight, ArrowUpRight, CheckCircle2
} from "lucide-react";

const EMPLOYEES = [
    { id: "E001", name: "Reva", email: "revanthkumar6364@gmail.com", role: "Product Owner", status: "Active", joinDate: "Jan 2026", type: "Full-time" },
    { id: "E002", name: "Aarav Sharma", email: "aarav@novacorp.io", role: "Lead Engineer", status: "Active", joinDate: "Feb 2026", type: "Full-time" },
    { id: "E003", name: "Isha Gupta", email: "isha@novacorp.io", role: "HR Manager", status: "Onboarding", joinDate: "Mar 2026", type: "Full-time" },
    { id: "E004", name: "Vikram Singh", email: "vikram@contractor.in", role: "UI Designer", status: "Active", joinDate: "Jan 2026", type: "Contractor" },
];

export default function PeoplePage() {
    return (
        <DashboardLayout>
            <div className="space-y-10">
                {/* Header */}
                <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-8">
                    <div className="space-y-2">
                        <motion.h1
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="text-4xl font-black text-[#0F172A] tracking-tight"
                        >
                            Workforce <span className="text-gradient">Directory.</span>
                        </motion.h1>
                        <p className="text-[#475569] font-bold text-lg">Manage your entire team—employees and contractors—in one sleek place.</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="group px-6 py-3.5 rounded-2xl font-black text-sm border-2 border-[#F1F5F9] bg-white hover:border-primary/20 hover:bg-primary/5 transition-all flex items-center gap-2 active:scale-95 shadow-sm">
                            <Filter size={20} className="text-[#64748B] group-hover:text-primary transition-colors" />
                            <span className="uppercase tracking-widest">Advanced Filters</span>
                        </button>
                        <button className="bg-primary text-white px-10 py-4 rounded-2xl font-black text-sm shadow-[0_15px_30px_-10px_rgba(36,93,241,0.5)] hover:bg-primary/90 transition-all flex items-center gap-3 active:scale-95 group">
                            <div className="w-6 h-6 rounded-lg bg-white/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                                <UserPlus size={16} />
                            </div>
                            <span className="uppercase tracking-widest">Add Person</span>
                        </button>
                    </div>
                </div>

                {/* Search & Tabs */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 bg-white/70 backdrop-blur-xl p-3 pl-8 rounded-[2rem] border border-[#F1F5F9] shadow-xl shadow-slate-200/40">
                    <div className="flex items-center gap-10">
                        {['All', 'Employees', 'Contractors', 'Onboarding'].map((tab, i) => (
                            <button key={tab} className={`relative py-4 text-[11px] font-black uppercase tracking-[0.2em] transition-all group ${i === 0 ? 'text-primary' : 'text-[#64748B] hover:text-slate-600'}`}>
                                {tab}
                                {i === 0 && (
                                    <motion.div
                                        layoutId="tab-underline"
                                        className="absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-full shadow-[0_-4px_8px_rgba(36,93,241,0.4)]"
                                    />
                                )}
                            </button>
                        ))}
                    </div>
                    <div className="relative w-full lg:w-[400px] group">
                        <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-[#CBD5E1] group-focus-within:text-primary transition-colors" size={20} />
                        <input
                            placeholder="Search by name, email, or ID..."
                            className="w-full bg-slate-50 border border-[#F1F5F9] outline-none pl-14 pr-6 py-4 rounded-[1.5rem] text-sm font-bold text-[#0F172A] placeholder:text-[#64748B] focus:ring-8 focus:ring-primary/5 focus:border-primary focus:bg-white transition-all shadow-inner"
                        />
                    </div>
                </div>

                {/* Directory Table */}
                <div className="premium-card bg-white/50 backdrop-blur-xl border-[#F1F5F9]/50 shadow-2xl shadow-slate-200/30 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-slate-50/50 border-b border-[#F1F5F9]">
                                    <th className="px-10 py-6 text-left text-[10px] font-black uppercase tracking-[0.3em] text-[#64748B]">Name & Identify</th>
                                    <th className="px-10 py-6 text-left text-[10px] font-black uppercase tracking-[0.3em] text-[#64748B]">Department / Role</th>
                                    <th className="px-10 py-6 text-left text-[10px] font-black uppercase tracking-[0.3em] text-[#64748B]">Employment Type</th>
                                    <th className="px-10 py-6 text-left text-[10px] font-black uppercase tracking-[0.3em] text-[#64748B]">Status</th>
                                    <th className="px-10 py-6 text-right text-[10px] font-black uppercase tracking-[0.3em] text-[#64748B]">Manage</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50/50">
                                {EMPLOYEES.map((person, i) => (
                                    <motion.tr
                                        key={person.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                        whileHover={{ backgroundColor: "rgba(36, 93, 241, 0.02)" }}
                                        className="group cursor-pointer transition-colors"
                                    >
                                        <td className="px-10 py-8">
                                            <div className="flex items-center gap-6">
                                                <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-[#F1F5F9] flex items-center justify-center font-black text-[#64748B] text-sm shadow-sm relative overflow-hidden group-hover:border-primary/20 transition-all">
                                                    <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                                    {person.name.substring(0, 2).toUpperCase()}
                                                </div>
                                                <div className="space-y-1">
                                                    <p className="font-black text-[#0F172A] group-hover:text-primary transition-colors text-base tracking-tight">{person.name}</p>
                                                    <p className="text-[10px] font-black text-[#64748B] uppercase tracking-widest">{person.id}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-10 py-8">
                                            <div className="space-y-1.5">
                                                <p className="text-[14px] font-black text-slate-800 leading-none">{person.role}</p>
                                                <div className="flex items-center gap-2 text-[12px] text-[#64748B] font-bold">
                                                    <Mail size={14} className="opacity-50" />
                                                    <span>{person.email}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-10 py-8">
                                            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-sm ${person.type === 'Full-time'
                                                ? 'bg-indigo-50/50 text-indigo-600 border border-indigo-100'
                                                : 'bg-orange-50/50 text-orange-600 border border-orange-100'
                                                }`}>
                                                <div className={`w-1.5 h-1.5 rounded-full ${person.type === 'Full-time' ? 'bg-indigo-600' : 'bg-orange-600'}`}></div>
                                                {person.type}
                                            </div>
                                        </td>
                                        <td className="px-10 py-8">
                                            <div className={`flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.2em] px-4 py-2 rounded-xl w-fit ${person.status === 'Active'
                                                ? 'text-emerald-600 bg-emerald-50/50 border border-emerald-100'
                                                : 'text-primary bg-primary/5 border border-primary/10'
                                                }`}>
                                                <div className={`w-2 h-2 rounded-full relative ${person.status === 'Active' ? 'bg-emerald-500' : 'bg-primary animate-pulse'}`}>
                                                    <div className={`absolute inset-0 rounded-full animate-ping ${person.status === 'Active' ? 'bg-emerald-500/40' : 'bg-primary/40'}`}></div>
                                                </div>
                                                {person.status}
                                            </div>
                                        </td>
                                        <td className="px-10 py-8 text-right">
                                            <button className="w-10 h-10 flex items-center justify-center hover:bg-slate-100 rounded-xl transition-all text-[#64748B] hover:text-primary active:scale-90 border border-transparent hover:border-slate-200">
                                                <MoreHorizontal size={20} />
                                            </button>
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="p-8 bg-slate-50/40 border-t border-[#F1F5F9] flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Users size={18} className="text-[#CBD5E1]" />
                            <p className="text-[11px] font-black text-[#64748B] uppercase tracking-widest">Showing 4 of 4 team members</p>
                        </div>
                        <div className="flex gap-4">
                            <button className="px-6 py-2 text-[10px] font-black uppercase tracking-widest text-[#64748B] hover:text-[#0F172A] transition-colors disabled:opacity-30" disabled>Previous</button>
                            <button className="px-8 py-2.5 bg-white border border-slate-200 rounded-xl text-[10px] font-black uppercase tracking-widest text-primary hover:border-primary/20 hover:bg-primary/5 transition-all shadow-sm active:scale-95">Next Page</button>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
