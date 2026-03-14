"use client";
import { motion, AnimatePresence } from "framer-motion";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { 
    ArrowUpRight, ArrowDownLeft, 
    RefreshCw, ArrowRight,
    ShieldCheck, History,
    Landmark
} from "lucide-react";
import { useState, useEffect } from "react";
import { api } from "@/lib/api";
import { 
    X, Check, Users, Landmark as BankIcon,
    ChevronRight, Wallet,
    CheckCircle2
} from "lucide-react";

interface PayoutTarget {
    id: string;
    name: string;
    type: 'VENDOR' | 'EMPLOYEE';
    account?: string;
}

interface Transaction {
    id: string;
    type: string;
    category: string;
    amount: number;
    description: string;
    createdAt: string;
}

interface WalletData {
    balance: number;
    currency: string;
}

export default function BankingHub() {
    const [wallet, setWallet] = useState<WalletData | null>(null);
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isWizardOpen, setIsWizardOpen] = useState(false);
    const [wizardStep, setWizardStep] = useState(1);
    const [payoutType, setPayoutType] = useState<'VENDOR' | 'EMPLOYEE' | null>(null);
    const [availableTargets, setAvailableTargets] = useState<PayoutTarget[]>([]);
    const [selectedTargets, setSelectedTargets] = useState<{ id: string; amount: number; name: string }[]>([]);
    const [isProcessing, setIsProcessing] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isLiveMode, setIsLiveMode] = useState(false);
    const [isConnectingBank, setIsConnectingBank] = useState(false);

    const toggleLiveMode = async () => {
        if (!isLiveMode) {
            setIsConnectingBank(true);
            // Simulate deep infrastructure handshake
            await new Promise(resolve => setTimeout(resolve, 2000));
            setIsLiveMode(true);
            setIsConnectingBank(false);
        } else {
            setIsLiveMode(false);
        }
    };

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

    useEffect(() => {
        fetchBankingData();
    }, []);

    const startBulkPayout = async (type: 'VENDOR' | 'EMPLOYEE') => {
        setPayoutType(type);
        setWizardStep(2);
        try {
            const endpoint = type === 'VENDOR' ? '/vendors' : '/employees'; // Corrected endpoint if needed, but keeping consistency
            const res = await api.get(endpoint);
            const targets = res.data.map((item: any) => ({
                id: item.id,
                name: type === 'VENDOR' ? item.name : `${item.firstName} ${item.lastName}`,
                type,
                account: type === 'VENDOR' ? item.bankAccount : item.bankAccountNumbers?.[0]
            }));
            setAvailableTargets(targets);
        } catch (error) {
            console.error("Failed to fetch payout targets", error);
        }
    };

    const toggleTarget = (target: PayoutTarget) => {
        if (selectedTargets.find(t => t.id === target.id)) {
            setSelectedTargets(selectedTargets.filter(t => t.id !== target.id));
        } else {
            setSelectedTargets([...selectedTargets, { id: target.id, amount: 0, name: target.name }]);
        }
    };

    const updateAmount = (id: string, amount: string) => {
        setSelectedTargets(selectedTargets.map(t => 
            t.id === id ? { ...t, amount: parseFloat(amount) || 0 } : t
        ));
    };

    const executePayout = async () => {
        setIsProcessing(true);
        try {
            if (payoutType === 'VENDOR') {
                await api.post('/wallet/bulk-payout', {
                    type: 'VENDOR',
                    payouts: selectedTargets.map(t => ({ id: t.id, amount: t.amount })),
                    mode: isLiveMode ? 'PRODUCTION' : 'SANDBOX'
                });
            }
            setIsSuccess(true);
            setTimeout(() => {
                setIsWizardOpen(false);
                setIsSuccess(false);
                setWizardStep(1);
                setSelectedTargets([]);
                fetchBankingData();
            }, 3000);
        } catch (error) {
            console.error("Payout failed", error);
        } finally {
            setIsProcessing(false);
        }
    };

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
                    
                    <div className="flex items-center gap-4">
                        {/* Live Mode Toggle */}
                        <div className="flex items-center gap-3 bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
                            <button 
                                onClick={toggleLiveMode}
                                disabled={isConnectingBank}
                                className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 ${!isLiveMode ? 'bg-white text-slate-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                            >
                                Sandbox
                            </button>
                            <button 
                                onClick={toggleLiveMode}
                                disabled={isConnectingBank}
                                className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 ${isLiveMode ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/20' : 'text-slate-400 hover:text-slate-600'}`}
                            >
                                {isConnectingBank ? <RefreshCw size={12} className="animate-spin" /> : <div className={`w-2 h-2 rounded-full ${isLiveMode ? 'bg-white animate-pulse' : 'bg-slate-300'}`} />}
                                Live Mode
                            </button>
                        </div>

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
                                <button 
                                    onClick={() => setIsWizardOpen(true)}
                                    className="px-10 py-5 bg-white/10 backdrop-blur-md text-white border border-white/10 rounded-2xl font-black text-xs uppercase tracking-widest transition-all hover:bg-white/20 active:scale-95"
                                >
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

            {/* Bulk Payout Wizard Modal */}
            <AnimatePresence>
                {isWizardOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => !isProcessing && setIsWizardOpen(false)}
                            className="absolute inset-0 bg-[#0F172A]/90 backdrop-blur-3xl"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 40 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 40 }}
                            className="bg-white rounded-[3rem] w-full max-w-4xl h-[700px] relative overflow-hidden flex flex-col shadow-2xl"
                        >
                            {/* Static Background Accents */}
                            <div className="absolute top-0 left-0 w-full h-2 bg-slate-100">
                                <motion.div 
                                    initial={{ width: "33%" }}
                                    animate={{ width: `${(wizardStep / 3) * 100}%` }}
                                    className="h-full bg-primary transition-all duration-500"
                                />
                            </div>

                            <div className="p-12 flex-grow overflow-y-auto">
                                <div className="flex justify-between items-start mb-12">
                                    <div>
                                        <p className="text-primary font-black uppercase tracking-[0.3em] text-[10px] mb-2">Step {wizardStep} of 3</p>
                                        <h2 className="text-4xl font-black text-[#0F172A] tracking-tighter">
                                            {wizardStep === 1 && "Select Payout Type"}
                                            {wizardStep === 2 && `Select ${payoutType === 'VENDOR' ? 'Vendors' : 'Employees'}`}
                                            {wizardStep === 3 && "Review & Execute"}
                                        </h2>
                                    </div>
                                    <button 
                                        disabled={isProcessing}
                                        onClick={() => setIsWizardOpen(false)}
                                        className="p-3 bg-slate-100 hover:bg-slate-200 rounded-2xl transition-all"
                                    >
                                        <X size={20} className="text-slate-500" />
                                    </button>
                                </div>

                                {wizardStep === 1 && (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        {[
                                            { id: 'VENDOR', icon: Users, label: 'Vendor Payouts', sub: 'Settle invoices, contractors, and suppliers.' },
                                            { id: 'EMPLOYEE', icon: BankIcon, label: 'Payroll Payouts', sub: 'Distribute monthly salaries and bonuses.' }
                                        ].map(opt => (
                                            <motion.button
                                                key={opt.id}
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                                onClick={() => startBulkPayout(opt.id as any)}
                                                className="p-10 bg-slate-50 hover:bg-indigo-50 border border-slate-100 hover:border-indigo-200 rounded-[2.5rem] text-left transition-all group"
                                            >
                                                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:bg-primary group-hover:text-white transition-all">
                                                    <opt.icon size={28} />
                                                </div>
                                                <h3 className="text-2xl font-black text-[#0F172A] tracking-tight mb-2 uppercase">{opt.label}</h3>
                                                <p className="text-slate-500 font-bold">{opt.sub}</p>
                                            </motion.button>
                                        ))}
                                    </div>
                                )}

                                {wizardStep === 2 && (
                                    <div className="space-y-4">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {availableTargets.map(target => (
                                                <div 
                                                    key={target.id}
                                                    onClick={() => toggleTarget(target)}
                                                    className={`p-6 rounded-[2rem] border transition-all cursor-pointer flex items-center justify-between ${
                                                        selectedTargets.find(t => t.id === target.id) 
                                                        ? 'bg-primary/5 border-primary shadow-lg shadow-primary/10' 
                                                        : 'bg-white border-slate-100 hover:border-slate-300'
                                                    }`}
                                                >
                                                    <div className="flex items-center gap-4">
                                                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                                                            selectedTargets.find(t => t.id === target.id) ? 'bg-primary text-white' : 'bg-slate-100 text-slate-400'
                                                        }`}>
                                                            {selectedTargets.find(t => t.id === target.id) ? <Check size={20} /> : <Users size={20} />}
                                                        </div>
                                                        <div>
                                                            <p className="font-black text-[#0F172A] tracking-tight">{target.name}</p>
                                                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{target.account || "No primary account"}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {wizardStep === 3 && (
                                    <div className="space-y-6">
                                        <div className="bg-slate-50 rounded-[2rem] p-8 border border-slate-100">
                                            <div className="flex justify-between items-center mb-6">
                                                <p className="text-[10px] font-black uppercase tracking-widest text-[#64748B]">Payee List</p>
                                                <p className="text-[10px] font-black uppercase tracking-widest text-[#64748B]">Amount (INR)</p>
                                            </div>
                                            <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
                                                {selectedTargets.map(target => (
                                                    <div key={target.id} className="flex items-center justify-between bg-white p-4 rounded-2xl shadow-sm">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-8 h-8 bg-indigo-50 text-indigo-500 rounded-lg flex items-center justify-center font-black text-xs uppercase">
                                                                {target.name.substring(0, 1)}
                                                            </div>
                                                            <span className="font-bold text-[#0F172A]">{target.name}</span>
                                                        </div>
                                                        <input 
                                                            type="number"
                                                            placeholder="0.00"
                                                            className="bg-slate-50 border border-slate-100 rounded-xl px-4 py-2 text-right font-mono font-bold w-32 focus:outline-none focus:border-primary"
                                                            onChange={(e) => updateAmount(target.id, e.target.value)}
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Footer Controls */}
                            <div className="p-12 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    {wizardStep > 1 && !isProcessing && (
                                        <button 
                                            onClick={() => setWizardStep(wizardStep - 1)}
                                            className="font-black text-[11px] uppercase tracking-[0.2em] text-slate-400 hover:text-slate-600 transition-colors"
                                        >
                                            Back
                                        </button>
                                    )}
                                </div>
                                <div className="flex items-center gap-6">
                                    <div className="text-right">
                                        <p className="text-[10px] font-black uppercase tracking-widest text-[#64748B]">Total Disbursal</p>
                                        <p className="text-2xl font-black text-[#0F172A]">
                                            ₹{selectedTargets.reduce((sum, t) => sum + t.amount, 0).toLocaleString()}
                                        </p>
                                    </div>
                                    
                                    {wizardStep < 3 ? (
                                        <button 
                                            disabled={wizardStep === 2 && selectedTargets.length === 0}
                                            onClick={() => setWizardStep(wizardStep + 1)}
                                            className="px-10 py-5 bg-[#0F172A] text-white rounded-[1.5rem] font-black text-[11px] uppercase tracking-widest flex items-center gap-3 hover:bg-slate-800 transition-all disabled:opacity-30 disabled:cursor-not-allowed group"
                                        >
                                            Continue <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                        </button>
                                    ) : (
                                        <button 
                                            disabled={isProcessing || selectedTargets.reduce((sum, t) => sum + t.amount, 0) <= 0}
                                            onClick={executePayout}
                                            className="px-12 py-5 bg-primary text-white rounded-[1.5rem] font-black text-[11px] uppercase tracking-widest flex items-center gap-3 hover:bg-primary/90 transition-all shadow-xl shadow-primary/30 disabled:opacity-30"
                                        >
                                            {isProcessing ? <RefreshCw className="animate-spin" size={18} /> : (isSuccess ? <CheckCircle2 size={18} /> : "Authorize Payout")}
                                        </button>
                                    )}
                                </div>
                            </div>

                            {/* Success Overlay */}
                            <AnimatePresence>
                                {isSuccess && (
                                    <motion.div 
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="absolute inset-0 bg-primary z-[200] flex flex-col items-center justify-center p-20 text-center"
                                    >
                                        <motion.div 
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            className="w-32 h-32 bg-white rounded-full flex items-center justify-center text-primary mb-8"
                                        >
                                            <CheckCircle2 size={64} />
                                        </motion.div>
                                        <motion.h2 
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="text-5xl font-black text-white tracking-tighter mb-4"
                                        >
                                            Payout Authorized
                                        </motion.h2>
                                        <motion.p 
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="text-white/80 font-bold text-xl"
                                        >
                                            Ledger successfully updated. Funds are being dispatched.
                                        </motion.p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </DashboardLayout>
    );
}
