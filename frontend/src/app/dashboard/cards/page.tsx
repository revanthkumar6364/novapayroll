"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
    CreditCard, Plus, ArrowUpRight, 
    ArrowDownLeft, Settings, ShieldAlert,
    History, Lock, Search, Filter,
    Eye, EyeOff
} from "lucide-react";

const TRANSACTIONS = [
    { id: "TX-1002", merchant: "AWS Services", amount: "₹45,200", date: "Today, 10:42 AM", status: "Completed", type: "debit" },
    { id: "TX-1001", merchant: "Card Reload", amount: "₹5,00,000", date: "Yesterday, 09:00 AM", status: "Completed", type: "credit" },
    { id: "TX-1000", merchant: "Google Workspace", amount: "₹12,450", date: "10 Mar, 02:15 PM", status: "Completed", type: "debit" },
    { id: "TX-0999", merchant: "WeWork", amount: "₹1,25,000", date: "01 Mar, 11:30 AM", status: "Completed", type: "debit" },
];

export default function CorporateCardsPage() {
    const [showCardNumber, setShowCardNumber] = useState(false);

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Header section with elite illustration */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
                
                <div className="relative z-10 max-w-xl">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary uppercase tracking-wider text-[11px] font-black mb-4">
                        <CreditCard size={14} /> Corporate Spend
                    </div>
                    <h1 className="text-3xl font-black text-[#0F172A] tracking-tight mb-3">
                        Expense Cards
                    </h1>
                    <p className="text-[#475569] font-medium leading-relaxed">
                        Issue physical or virtual corporate cards instantly. Track SaaS, travel, and operational expenses with granular per-employee limits.
                    </p>
                </div>

                {/* Animated 3D-like Card Representation using standard CSS */}
                <div className="relative z-10 shrink-0 hidden lg:block">
                    <motion.div 
                        initial={{ rotateY: 20, rotateX: 15 }}
                        animate={{ rotateY: 0, rotateX: 0 }}
                        transition={{ duration: 1.5, type: "spring", bounce: 0.4 }}
                        className="w-[320px] h-[200px] rounded-2xl p-6 text-white shadow-2xl relative overflow-hidden group border border-[#334155]"
                        style={{
                            background: "linear-gradient(135deg, #0F172A 0%, #1E293B 100%)",
                            transformStyle: "preserve-3d",
                        }}
                    >
                        {/* Shimmer effect */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-1000"></div>
                        
                        <div className="flex justify-between items-start mb-12">
                            <div className="flex items-center gap-2">
                                {/* Geometric Nova Logo Monogram */}
                                <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-white">
                                    <path d="M10 34L26 6H36L20 34H10Z" fill="currentColor" />
                                    <path d="M2 34L14 12H24L12 34H2Z" fill="currentColor" className="opacity-40" />
                                </svg>
                                <span className="font-bold tracking-tight text-white/90">Nova.</span>
                            </div>
                            <svg width="40" height="25" viewBox="0 0 40 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="12.5" cy="12.5" r="12.5" fill="#EB001B"/>
                                <circle cx="27.5" cy="12.5" r="12.5" fill="#F79E1B" fillOpacity="0.8"/>
                            </svg>
                        </div>
                        
                        <div className="font-mono text-xl tracking-[0.15em] mb-4 drop-shadow-md text-white/90">
                            {showCardNumber ? "4532  8891  0213  5542" : "••••  ••••  ••••  5542"}
                        </div>
                        
                        <div className="flex justify-between items-end">
                            <div>
                                <div className="text-[10px] text-white/50 uppercase tracking-wider mb-1">Cardholder</div>
                                <div className="font-medium tracking-wide text-[13px] text-white/90">Rahul Executive</div>
                            </div>
                            <div>
                                <div className="text-[10px] text-white/50 uppercase tracking-wider mb-1">Valid Thru</div>
                                <div className="font-medium tracking-wide text-[13px] text-white/90">12/28</div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Quick Actions & Balances */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
                    <div>
                        <p className="text-[#64748B] text-sm font-semibold mb-1">Available Primary Limit</p>
                        <h3 className="text-3xl font-black text-[#0F172A] tracking-tight">₹12,50,000<span className="text-sm font-medium text-[#94A3B8]">.00</span></h3>
                    </div>
                    <div className="mt-6 flex flex-wrap gap-3">
                        <button className="flex-1 bg-primary text-white px-4 py-2.5 rounded-xl font-bold hover:bg-primary/90 transition-colors shadow-md shadow-primary/20 flex items-center justify-center gap-2 text-sm">
                            <Plus size={16} /> Issue Card
                        </button>
                        <button className="flex-1 bg-white border border-[#E2E8F0] text-[#0F172A] px-4 py-2.5 rounded-xl font-bold hover:bg-slate-50 transition-colors flex items-center justify-center gap-2 text-sm">
                            <ArrowUpRight size={16} /> Add Funds
                        </button>
                    </div>
                </div>

                {/* Active Cards Summary */}
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm md:col-span-2">
                    <div className="flex justify-between items-center mb-6">
                        <h4 className="text-lg font-bold text-[#0F172A]">Your Cards</h4>
                        <button className="text-primary text-sm font-bold hover:underline">View All</button>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Elite Card Render */}
                        <div className="border border-slate-100 rounded-xl p-4 flex gap-4 items-center bg-slate-50/50 hover:bg-slate-50 transition-colors group cursor-pointer">
                            <div className="w-16 h-12 bg-gradient-to-br from-[#0F172A] to-[#334155] rounded-md shadow-inner flex items-center justify-end p-2 border border-slate-800 relative overflow-hidden">
                                 <svg width="24" height="15" viewBox="0 0 40 25" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute right-1 bottom-1">
                                    <circle cx="12.5" cy="12.5" r="12.5" fill="#EB001B"/>
                                    <circle cx="27.5" cy="12.5" r="12.5" fill="#F79E1B" fillOpacity="0.8"/>
                                </svg>
                            </div>
                            <div className="flex-1 min-w-0">
                                <h5 className="text-[14px] font-bold text-[#0F172A] truncate">SaaS & Software Card</h5>
                                <p className="text-[12px] text-[#64748B] font-mono mt-0.5">•••• 5542</p>
                            </div>
                            <div className="text-right shrink-0">
                                <span className="block text-[14px] font-bold text-[#0F172A]">₹2.5L</span>
                                <span className="block text-[11px] font-bold text-[#10B981]">Active</span>
                            </div>
                        </div>

                        {/* Elite Card Render 2 */}
                        <div className="border border-slate-100 rounded-xl p-4 flex gap-4 items-center bg-slate-50/50 hover:bg-slate-50 transition-colors group cursor-pointer">
                           <div className="w-16 h-12 bg-gradient-to-br from-[#E2E8F0] to-[#F8FAFC] rounded-md shadow-inner flex items-center justify-end p-2 border border-slate-200 relative overflow-hidden">
                                 <svg width="24" height="15" viewBox="0 0 40 25" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute right-1 bottom-1">
                                    <circle cx="12.5" cy="12.5" r="12.5" fill="#EB001B"/>
                                    <circle cx="27.5" cy="12.5" r="12.5" fill="#F79E1B" fillOpacity="0.8"/>
                                </svg>
                            </div>
                            <div className="flex-1 min-w-0">
                                <h5 className="text-[14px] font-bold text-[#0F172A] truncate">Travel & Mktg</h5>
                                <p className="text-[12px] text-[#64748B] font-mono mt-0.5">•••• 9102</p>
                            </div>
                            <div className="text-right shrink-0">
                                <span className="block text-[14px] font-bold text-[#0F172A]">₹5.0L</span>
                                <span className="block text-[11px] font-bold text-[#10B981]">Active</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Transactions Table */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <h3 className="text-lg font-bold text-[#0F172A] flex items-center gap-2">
                        <History size={18} className="text-[#64748B]" /> Recent Transactions
                    </h3>
                    
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" size={16} />
                            <input 
                                type="text"
                                placeholder="Search txns..."
                                className="pl-9 pr-4 py-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-[#0F172A] placeholder:text-[#94A3B8] w-full sm:w-64"
                            />
                        </div>
                        <button className="p-2 border border-[#E2E8F0] rounded-xl text-[#475569] hover:bg-[#F8FAFC] transition-colors">
                            <Filter size={18} />
                        </button>
                    </div>
                </div>
                
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-[#F8FAFC] border-b border-slate-100">
                                <th className="p-4 text-[12px] font-bold uppercase tracking-wider text-[#64748B]">Transaction ID</th>
                                <th className="p-4 text-[12px] font-bold uppercase tracking-wider text-[#64748B]">Merchant</th>
                                <th className="p-4 text-[12px] font-bold uppercase tracking-wider text-[#64748B]">Date & Time</th>
                                <th className="p-4 text-[12px] font-bold uppercase tracking-wider text-[#64748B] text-right">Amount</th>
                                <th className="p-4 text-[12px] font-bold uppercase tracking-wider text-[#64748B] text-right">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {TRANSACTIONS.map((tx) => (
                                <tr key={tx.id} className="hover:bg-slate-50/50 transition-colors group">
                                    <td className="p-4">
                                        <span className="text-[13px] font-mono text-[#475569] bg-slate-100 px-2 py-0.5 rounded border border-slate-200">{tx.id}</span>
                                    </td>
                                    <td className="p-4">
                                        <p className="text-[14px] font-bold text-[#0F172A] flex items-center gap-2">
                                            {tx.merchant}
                                        </p>
                                    </td>
                                    <td className="p-4 text-[13px] text-[#475569] font-medium">{tx.date}</td>
                                    <td className="p-4 text-right">
                                        <span className={`text-[14px] font-bold ${tx.type === 'credit' ? 'text-[#10B981]' : 'text-[#0F172A]'}`}>
                                            {tx.type === 'credit' ? '+' : '-'}{tx.amount}
                                        </span>
                                    </td>
                                    <td className="p-4 text-right">
                                        <div className="inline-flex items-center gap-1.5 bg-[#F0FDF4] text-[#15803D] px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wide border border-[#DCFCE7]">
                                            <div className="w-1.5 h-1.5 rounded-full bg-[#15803D]"></div>
                                            Completed
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="p-4 border-t border-slate-100 bg-[#F8FAFC] text-center">
                    <button className="text-[13px] font-bold text-primary hover:underline">Download Statement (.CSV)</button>
                </div>
            </div>
        </div>
    );
}
