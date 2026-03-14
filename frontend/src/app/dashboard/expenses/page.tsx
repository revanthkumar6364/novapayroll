"use client";

import { motion, AnimatePresence } from "framer-motion";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { 
    FileText, Plus, Scan, CheckCircle2, 
    XCircle, Clock, Search, Filter,
    ChevronRight, ArrowUpRight, Upload, Cloud,
    ImageIcon, MoreVertical, Brain
} from "lucide-react";
import { useState, useEffect } from "react";
import { api } from "@/lib/api";

export default function ExpenseManagement() {
    const [expenses, setExpenses] = useState<any[]>([]);
    const [isScanning, setIsScanning] = useState(false);
    const [scanProgress, setScanProgress] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchExpenses = async () => {
            try {
                const data = await api.get('/expenses');
                setExpenses(data);
            } catch (err) {
                console.error("Failed to fetch expenses", err);
                setExpenses([
                    { id: "1", employee: { name: "Rajesh Kumar" }, amount: 4500, description: "Travel to Mumbai Client Site", status: "PENDING", createdAt: new Date().toISOString() },
                    { id: "2", employee: { name: "Amit Sharma" }, amount: 1200, description: "Team Lunch - Project Kickoff", status: "ACTIVE", createdAt: new Date(Date.now() - 86400000).toISOString() },
                    { id: "3", employee: { name: "Priya Singh" }, amount: 28000, description: "Marketing Ad Spend (Meta)", status: "PENDING", createdAt: new Date(Date.now() - 172800000).toISOString() },
                ]);
            } finally {
                setIsLoading(false);
            }
        };
        fetchExpenses();
    }, []);

    const startScan = () => {
        setIsScanning(true);
        setScanProgress(0);
        const interval = setInterval(() => {
            setScanProgress(p => {
                if (p >= 100) {
                    clearInterval(interval);
                    setTimeout(() => setIsScanning(false), 500);
                    return 100;
                }
                return p + 2;
            });
        }, 30);
    };

    return (
        <DashboardLayout>
            <div className="space-y-10">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div className="space-y-2">
                        <div className="flex items-center gap-3 text-primary font-black uppercase tracking-[0.3em] text-[10px]">
                            <span className="w-8 h-[2px] bg-primary"></span>
                            Reimbursement Flow
                        </div>
                        <h1 className="text-4xl font-black text-[#0F172A] tracking-tighter">Expense Claims</h1>
                        <p className="text-slate-500 font-bold text-lg">Manage employee claims with automated AI verification and instant wallet payouts.</p>
                    </div>
                    
                    <button 
                        onClick={startScan}
                        className="premium-button py-4 px-8 rounded-2xl flex items-center gap-3 bg-[#0F172A] text-white font-black text-xs uppercase tracking-widest shadow-2xl hover:bg-[#1E293B] transition-all active:scale-95"
                    >
                        <Scan size={20} className="text-primary" /> Scan New Receipt
                    </button>
                </div>

                {/* AI Scanning Overlay */}
                <AnimatePresence>
                    {isScanning && (
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0F172A]/80 backdrop-blur-xl p-4"
                        >
                            <motion.div 
                                initial={{ scale: 0.9, y: 20 }}
                                animate={{ scale: 1, y: 0 }}
                                className="w-full max-w-md bg-white rounded-[3rem] p-12 text-center space-y-8 shadow-2xl"
                            >
                                <div className="w-24 h-24 bg-primary/10 rounded-[2rem] flex items-center justify-center mx-auto relative overflow-hidden">
                                    <Brain className="text-primary" size={40} />
                                    <motion.div 
                                        animate={{ y: [-40, 40] }}
                                        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                                        className="absolute inset-0 bg-primary/20 w-full h-1"
                                    ></motion.div>
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-2xl font-black text-[#0F172A] tracking-tight">Neural Bill Extraction</h3>
                                    <p className="text-[#64748B] font-bold text-sm">Identifying amounts, GST, and merchants...</p>
                                </div>
                                <div className="space-y-3">
                                    <div className="h-4 w-full bg-slate-100 rounded-full overflow-hidden p-1 shadow-inner">
                                        <motion.div 
                                            className="h-full bg-primary rounded-full shadow-lg shadow-primary/30"
                                            style={{ width: `${scanProgress}%` }}
                                        ></motion.div>
                                    </div>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-primary">{scanProgress}% Computed</p>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Main Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        { label: "Pending Approval", value: "₹72,400", icon: Clock, color: "text-amber-500", bg: "bg-amber-50" },
                        { label: "Approved (Paid)", value: "₹1,24,000", icon: CheckCircle2, color: "text-emerald-500", bg: "bg-emerald-50" },
                        { label: "Rejection Rate", value: "1.2%", icon: XCircle, color: "text-rose-500", bg: "bg-rose-50" }
                    ].map((stat, i) => (
                        <div key={i} className="premium-card p-8 bg-white/50 backdrop-blur-xl border-slate-100 flex items-center justify-between">
                            <div className="space-y-1">
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{stat.label}</p>
                                <p className="text-3xl font-black text-[#0F172A]">{stat.value}</p>
                            </div>
                            <div className={`w-14 h-14 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center`}>
                                <stat.icon size={24} />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Expense List */}
                <div className="premium-card bg-white/50 backdrop-blur-xl border-slate-100 overflow-hidden shadow-2xl shadow-slate-200/40">
                    <div className="p-8 border-b border-slate-50 flex items-center justify-between gap-6">
                        <div className="relative flex-grow max-w-md">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#CBD5E1]" size={18} />
                            <input
                                placeholder="Filter by employee or description..."
                                className="w-full bg-slate-50 border border-slate-100 outline-none pl-12 pr-4 py-3 rounded-2xl text-sm font-medium focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all"
                            />
                        </div>
                        <div className="flex items-center gap-3">
                            <button className="p-3 bg-white border border-slate-100 rounded-2xl text-slate-400 hover:text-primary transition-colors">
                                <Filter size={18} />
                            </button>
                        </div>
                    </div>

                    <div className="divide-y divide-slate-50">
                        {isLoading ? (
                            <div className="p-20 text-center text-slate-400 font-black uppercase tracking-widest text-[10px]">
                                Loading Claims...
                            </div>
                        ) : expenses.map((claim, idx) => (
                            <motion.div 
                                key={claim.id}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.05 }}
                                className="p-10 flex items-center justify-between hover:bg-slate-50/50 transition-all group"
                            >
                                <div className="flex items-center gap-8">
                                    <div className="w-16 h-16 rounded-2xl bg-white border border-slate-100 shadow-sm flex items-center justify-center text-slate-300 group-hover:border-primary/20 group-hover:text-primary transition-all">
                                        <FileText size={28} />
                                    </div>
                                    <div>
                                        <h4 className="font-black text-[#0F172A] text-xl tracking-tight leading-none mb-2">{claim.description}</h4>
                                        <div className="flex items-center gap-4">
                                            <p className="text-xs font-bold text-slate-500">By {claim.employee.name}</p>
                                            <div className="w-1 h-1 rounded-full bg-slate-300"></div>
                                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{new Date(claim.createdAt).toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-12">
                                    <div className="text-right">
                                        <p className="text-2xl font-black text-[#0F172A]">₹{claim.amount.toLocaleString()}</p>
                                        <div className={`flex items-center gap-1.5 justify-end px-2 py-0.5 rounded-full ${
                                            claim.status === 'PENDING' ? 'bg-amber-50 text-amber-600' : 'bg-emerald-50 text-emerald-600'
                                        }`}>
                                            <div className={`w-1.5 h-1.5 rounded-full ${
                                                claim.status === 'PENDING' ? 'bg-amber-400 animate-pulse' : 'bg-emerald-400'
                                            }`}></div>
                                            <span className="text-[9px] font-black uppercase tracking-widest">
                                                {claim.status === 'PENDING' ? 'Awating Approval' : 'Settled'}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        {claim.status === 'PENDING' ? (
                                            <>
                                                <button className="h-12 w-12 rounded-xl border border-slate-100 flex items-center justify-center text-slate-400 hover:bg-rose-50 hover:text-rose-500 hover:border-rose-100 transition-all">
                                                    <XCircle size={20} />
                                                </button>
                                                <button className="h-12 px-6 bg-primary text-white rounded-xl font-black text-xs uppercase tracking-widest shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all">
                                                    Approve & Pay
                                                </button>
                                            </>
                                        ) : (
                                            <button className="h-12 w-12 rounded-xl border border-emerald-100 bg-emerald-50 flex items-center justify-center text-emerald-500 cursor-default">
                                                <CheckCircle2 size={20} />
                                            </button>
                                        )}
                                        <button className="p-3 text-slate-300 hover:text-slate-600 transition-colors">
                                            <MoreVertical size={20} />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Payout Channel Info */}
                <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm">
                            <ArrowUpRight size={18} className="text-primary" />
                        </div>
                        <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Payout Channel: <span className="text-slate-900 font-black">Nova Internal Wallet (IMPS/NEFT Sandbox)</span></p>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
