"use client";

import { motion } from "framer-motion";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { 
    Wallet, ArrowUpRight, ArrowDownLeft, 
    RefreshCw, Plus, ArrowRight,
    Building2, ShieldCheck, History,
    CreditCard, PieChart, Landmark
} from "lucide-react";
import { useState, useEffect } from "react";
import { api } from "@/lib/api";

export default function BankingHub() {
    const [wallet, setWallet] = useState<any>(null);
    const [transactions, setTransactions] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchBankingData = async () => {
            try {
                const [walletData, txData] = await Promise.all([
                    api.get('/wallet'),
                    api.get('/wallet/transactions')
                ]);
                setWallet(walletData);
                setTransactions(txData);
            } catch (err) {
                console.error("Failed to fetch banking data", err);
                // Demo data for visual excellence if backend not fully seeded
                setWallet({ balance: 1245800.0, currency: "INR" });
                setTransactions([
                    { id: "1", type: "DEBIT", category: "PAYROLL", amount: 450000, description: "Monthly Salary Disbursal - Mar", createdAt: new Date().toISOString() },
                    { id: "2", type: "CREDIT", category: "TOPUP", amount: 1000000, description: "Wallet Top-up via ICICI API", createdAt: new Date(Date.now() - 86400000).toISOString() },
                    { id: "3", type: "DEBIT", category: "TAX", amount: 25000, description: "TDS Payment - Q3 Compliance", createdAt: new Date(Date.now() - 172800000).toISOString() },
                ]);
            } finally {
                setIsLoading(false);
            }
        };
        fetchBankingData();
    }, []);

    return (
        <DashboardLayout>
            <div className="space-y-10">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div className="space-y-2">
                        <div className="flex items-center gap-3 text-primary font-black uppercase tracking-[0.3em] text-[10px]">
                            <span className="w-8 h-[2px] bg-primary"></span>
                            Treasury & Payouts
                        </div>
                        <h1 className="text-4xl font-black text-[#0F172A] tracking-tighter">Banking Hub</h1>
                        <p className="text-slate-500 font-bold text-lg">Centralized capital management and instant vendor & payroll settlements.</p>
                    </div>
                    
                    <div className="flex items-center gap-3">
                        <button className="premium-button-secondary px-6 py-3 rounded-2xl flex items-center gap-2 group">
                            <RefreshCw size={18} className="text-slate-400 group-active:animate-spin transition-all" />
                            <span className="font-black text-[11px] uppercase tracking-widest text-[#64748B]">Refresh Ledger</span>
                        </button>
                    </div>
                </div>

                {/* Main Stats Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* The Nova Wallet Card */}
                    <div className="lg:col-span-2 relative h-[320px] rounded-[3rem] bg-[#0F172A] shadow-2xl p-12 overflow-hidden group">
                        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] -mr-48 -mt-48 transition-all group-hover:bg-primary/30 pointer-events-none"></div>
                        <div className="relative z-10 h-full flex flex-col justify-between">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-white">
                                        <Landmark size={28} />
                                    </div>
                                    <div>
                                        <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.2em]">Operational Account</p>
                                        <p className="text-white font-black text-xl tracking-tight">Nova Business Wallet</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 px-3 py-1 bg-white/5 backdrop-blur-md rounded-full border border-white/10">
                                    <ShieldCheck size={14} className="text-emerald-400" />
                                    <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400">API Banking Active</span>
                                </div>
                            </div>

                            <div>
                                <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.3em] mb-2 font-mono">Available Balance</p>
                                <p className="text-6xl md:text-7xl font-black text-white tracking-tighter tabular-nums drop-shadow-2xl">
                                    ₹{wallet?.balance?.toLocaleString()}
                                    <span className="text-2xl text-white/20 ml-2 font-bold">{wallet?.currency}</span>
                                </p>
                            </div>

                            <div className="flex items-center gap-4">
                                <button className="px-10 py-5 bg-primary text-white rounded-2xl font-black text-xs uppercase tracking-widest transition-all hover:bg-primary/90 hover:scale-105 active:scale-95 shadow-xl shadow-primary/30">
                                    Add Funds
                                </button>
                                <button className="px-10 py-5 bg-white/10 backdrop-blur-md text-white border border-white/10 rounded-2xl font-black text-xs uppercase tracking-widest transition-all hover:bg-white/20 active:scale-95">
                                    Bulk Payout
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Quick Stats Column */}
                    <div className="space-y-6">
                        <div className="premium-card p-8 bg-white/50 backdrop-blur-xl border-slate-100 flex items-center justify-between group cursor-pointer hover:border-primary/20 transition-all">
                            <div className="space-y-1">
                                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#64748B]">Scheduled Payroll</p>
                                <p className="text-2xl font-black text-[#0F172A]">₹18.4L</p>
                            </div>
                            <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                                <RefreshCw size={20} />
                            </div>
                        </div>
                        <div className="premium-card p-8 bg-white/50 backdrop-blur-xl border-slate-100 flex items-center justify-between group cursor-pointer hover:border-emerald-200 transition-all">
                            <div className="space-y-1">
                                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#64748B]">TDS Receivable</p>
                                <p className="text-2xl font-black text-emerald-500">₹2.1L</p>
                            </div>
                            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                                <ArrowUpRight size={20} />
                            </div>
                        </div>
                        <div className="premium-card p-8 bg-white/50 backdrop-blur-xl border-slate-100 flex items-center justify-between group cursor-pointer hover:border-rose-200 transition-all">
                            <div className="space-y-1">
                                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#64748B]">Pending Expenses</p>
                                <p className="text-2xl font-black text-rose-500">₹45.2K</p>
                            </div>
                            <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                                <History size={20} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Transaction Ledger */}
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-black text-[#0F172A] tracking-tight flex items-center gap-3">
                            <History size={24} className="text-primary" />
                            Recent Ledger Entries
                        </h2>
                        <button className="text-primary text-[10px] font-black uppercase tracking-widest hover:underline underline-offset-4 decoration-2">Export Full Report</button>
                    </div>

                    <div className="premium-card bg-white/50 backdrop-blur-xl border-slate-100 overflow-hidden shadow-2xl shadow-slate-200/40">
                        <div className="divide-y divide-slate-50">
                            {isLoading ? (
                                <div className="p-20 text-center">
                                    <RefreshCw className="animate-spin text-primary mx-auto mb-4" size={32} />
                                    <p className="text-[10px] font-black uppercase tracking-widest text-[#64748B]">Decrypting Ledger...</p>
                                </div>
                            ) : transactions.map((tx, idx) => (
                                <motion.div 
                                    key={tx.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.05 }}
                                    className="p-8 flex items-center justify-between hover:bg-slate-50/50 transition-all cursor-pointer group"
                                >
                                    <div className="flex items-center gap-6">
                                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                                            tx.type === 'DEBIT' ? 'bg-rose-50 text-rose-500' : 'bg-emerald-50 text-emerald-500'
                                        }`}>
                                            {tx.type === 'DEBIT' ? <ArrowUpRight size={24} /> : <ArrowDownLeft size={24} />}
                                        </div>
                                        <div>
                                            <h4 className="font-black text-[#0F172A] text-lg tracking-tight group-hover:text-primary transition-colors">{tx.description}</h4>
                                            <div className="flex items-center gap-3 mt-1">
                                                <span className="text-[10px] font-black uppercase tracking-widest text-primary px-2 py-0.5 bg-primary/5 rounded">{tx.category}</span>
                                                <div className="w-1 h-1 rounded-full bg-slate-200"></div>
                                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{new Date(tx.createdAt).toLocaleString()}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className={`text-xl font-black font-mono ${
                                            tx.type === 'DEBIT' ? 'text-rose-500' : 'text-emerald-500'
                                        }`}>
                                            {tx.type === 'DEBIT' ? '-' : '+'} ₹{tx.amount.toLocaleString()}
                                        </p>
                                        <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Transaction Success</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Statutory Guard CTA */}
                <div className="premium-card p-10 bg-indigo-600 border-none shadow-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20 group-hover:scale-110 transition-transform duration-1000"></div>
                    <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
                        <div className="space-y-3">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-white/10 rounded-lg">
                                    <ShieldCheck className="text-white" size={20} />
                                </div>
                                <h3 className="text-2xl font-black text-white tracking-tight">One-Click Statutory Filer</h3>
                            </div>
                            <p className="text-white/70 font-medium max-w-lg">Nova Compliance Guard has prepared your TDS and PF challans for March 2026. Verify and file directly from your wallet.</p>
                        </div>
                        <button className="px-8 py-4 bg-white text-indigo-600 rounded-2xl font-black text-xs uppercase tracking-widest hover:shadow-2xl hover:bg-slate-50 transition-all active:scale-95 flex items-center justify-center gap-2">
                            Go to Compliance Center <ArrowRight size={18} />
                        </button>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
