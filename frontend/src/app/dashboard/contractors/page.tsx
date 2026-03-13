"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Users,
    Briefcase,
    FileText,
    Percent,
    ArrowRight,
    Plus,
    Search,
    Filter,
    CreditCard,
    ChevronRight,
    CheckCircle2,
    Clock,
    AlertCircle,
    Calendar,
    Wallet,
    Landmark,
    ShieldCheck,
    Download,
    X,
    TrendingUp,
    RefreshCw,
    Globe,
    Zap
} from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useRouter } from 'next/navigation';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1';

interface Vendor {
    id: string;
    name: string;
    email?: string;
    pan?: string;
    category: string;
    tdsCategory?: string;
    taxStatus: string;
}

interface ContractorPayment {
    id: string;
    vendorName: string;
    vendor: { name: string };
    amount: number;
    netAmount: number;
    tdsAmount: number;
    currency: string;
    status: string;
    date: string;
    paymentDate: string;
}

interface ForexRates {
    [key: string]: number;
}

export default function ContractorsPage() {
    const [vendors, setVendors] = useState<Vendor[]>([]);
    const [payments, setPayments] = useState<ContractorPayment[]>([]);
    const [loading, setLoading] = useState(true);
    const [isAddMode, setIsAddMode] = useState(false);
    const [isPayMode, setIsPayMode] = useState(false);
    const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);
    const [paymentAmount, setPaymentAmount] = useState("");
    const [tdsRate, setTdsRate] = useState(0.01);
    const [isProcessing, setIsProcessing] = useState(false);
    
    // Phase 8: Global Payouts State
    const [isGlobalMode, setIsGlobalMode] = useState(false);
    const [currencyRates, setCurrencyRates] = useState<ForexRates>({ USD: 0.012, EUR: 0.011, GBP: 0.0094 });
    const [selectedCurrency, setSelectedCurrency] = useState("USD");
    
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token') || localStorage.getItem('auth_token');
        if (!token) {
            router.push('/login');
            return;
        }
        fetchVendors(token);
        fetchPayments(token);
        fetchForexRates(token);
    }, [router]);

    const fetchForexRates = async (token: string) => {
        try {
            const res = await fetch(`${API_BASE}/forex/rates?base=INR`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await res.json();
            if (data) setCurrencyRates(data);
        } catch (e) {
            console.error("Forex API fail, using fallbacks:", e);
        }
    };

    const fetchVendors = async (token: string) => {
        try {
            const res = await fetch(`${API_BASE}/vendor`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await res.json();
            setVendors(Array.isArray(data) ? data : []);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    const fetchPayments = async (token: string) => {
        try {
            const res = await fetch(`${API_BASE}/vendor/payments`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await res.json();
            setPayments(Array.isArray(data) ? data : []);
        } catch (e) {
            console.error(e);
        }
    };

    const handleCreateVendor = async (e: React.FormEvent) => {
        e.preventDefault();
        const token = localStorage.getItem('token') || localStorage.getItem('auth_token');
        const formData = new FormData(e.target as HTMLFormElement);
        const dto = Object.fromEntries(formData.entries());

        try {
            const res = await fetch(`${API_BASE}/vendor`, {
                method: 'POST',
                headers: { 
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dto)
            });
            if (res.ok) {
                setIsAddMode(false);
                fetchVendors(token as string);
            }
        } catch (e) {
            console.error(e);
        }
    };

    const handleProcessPayment = async () => {
        if (!selectedVendor || !paymentAmount) return;
        setIsProcessing(true);
        const token = localStorage.getItem('token') || localStorage.getItem('auth_token');
        
        try {
            const res = await fetch(`${API_BASE}/vendor/${selectedVendor.id}/payment`, {
                method: 'POST',
                headers: { 
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    amount: paymentAmount,
                    tdsRate: tdsRate,
                    remarks: `Contractor Payment - ${selectedVendor.name}`
                })
            });
            if (res.ok) {
                setTimeout(() => {
                    setIsProcessing(false);
                    setIsPayMode(false);
                    setPaymentAmount("");
                    fetchPayments(token as string);
                }, 2000);
            }
        } catch (e) {
            console.error(e);
            setIsProcessing(false);
        }
    };

    const tdsCalculated = parseFloat(paymentAmount || "0") * tdsRate;
    const netPayable = parseFloat(paymentAmount || "0") - tdsCalculated;

    return (
        <DashboardLayout>
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-bold uppercase tracking-wider mb-3 border border-blue-100">
                            <Briefcase size={14} />
                            Enterprise Vendor Hub
                        </div>
                        <h1 className="text-4xl font-black text-[#0F172A] racking-tight">Contractor & TDS Hub</h1>
                        <p className="text-[#64748B] font-medium mt-1">Manage external vendors with automated tax deductions.</p>
                    </div>

                    <div className="flex gap-4 w-full md:w-auto">
                        <button 
                            onClick={() => setIsGlobalMode(!isGlobalMode)}
                            className={`px-6 py-3.5 rounded-2xl font-black uppercase tracking-wider text-xs border-b-4 transition-all flex items-center gap-2 ${isGlobalMode ? 'bg-emerald-500 text-white border-emerald-800' : 'bg-slate-100 text-slate-600 border-slate-300'}`}
                        >
                            <Globe size={16} /> {isGlobalMode ? 'Global Mode: ON' : 'Enable Global Payouts'}
                        </button>
                        <button 
                            onClick={() => setIsAddMode(true)}
                            className="bg-[#245DF1] text-white px-8 py-3.5 rounded-2xl font-black uppercase tracking-wider text-sm shadow-xl shadow-blue-500/20 hover:bg-blue-600 transition-all border-b-4 border-blue-800 active:border-b-0 active:translate-y-1 flex items-center justify-center gap-2 flex-grow md:flex-grow-0"
                        >
                            <Plus size={18} /> New Contractor
                        </button>
                    </div>
                </div>

                {/* Stat Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {[
                        { label: 'Active Vendors', value: vendors.length, icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
                        { label: 'Pending TDS', value: '₹14,500', icon: ShieldCheck, color: 'text-emerald-600', bg: 'bg-emerald-50' },
                        { label: 'Total Payouts', value: `₹${payments.reduce((acc, p) => acc + p.netAmount, 0).toLocaleString()}`, icon: Wallet, color: 'text-purple-600', bg: 'bg-purple-50' },
                        { label: '194C Adherence', value: '100%', icon: CheckCircle2, color: 'text-amber-600', bg: 'bg-amber-50' },
                    ].map((stat, i) => (
                        <div key={i} className="premium-card p-6 bg-white border border-[#F1F5F9] shadow-sm hover:shadow-md transition-shadow group">
                            <div className="flex items-center justify-between mb-4">
                                <div className={`w-12 h-12 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                                    <stat.icon size={24} />
                                </div>
                                <div className="text-right">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">{stat.label}</p>
                                    <p className="text-2xl font-black text-slate-800">{stat.value}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Contractor Registry */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white rounded-[2.5rem] p-8 border border-[#F1F5F9] shadow-xl shadow-slate-200/40 relative overflow-hidden">
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="text-xl font-black text-[#0F172A] tracking-tight">Contractor Registry</h2>
                                <div className="flex items-center gap-2">
                                    <div className="relative">
                                        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                        <input type="text" placeholder="Search vendors..." className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 w-48" />
                                    </div>
                                    <button className="p-2 bg-slate-50 border border-slate-100 rounded-xl text-slate-400 hover:text-primary transition-colors">
                                        <Filter size={18} />
                                    </button>
                                </div>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b border-slate-50">
                                            <th className="pb-4 text-left text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">SaaS Provider / Vendor</th>
                                            <th className="pb-4 text-left text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">TDS Category</th>
                                            <th className="pb-4 text-left text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Tax Status</th>
                                            <th className="pb-4 text-right text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-50">
                                        {vendors.map((vendor, i) => (
                                            <tr key={i} className="group hover:bg-slate-50/50 transition-all">
                                                <td className="py-5">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center font-black text-sm uppercase">
                                                            {vendor.name.charAt(0)}
                                                        </div>
                                                        <div>
                                                            <p className="text-sm font-black text-[#0F172A]">{vendor.name}</p>
                                                            <p className="text-[10px] text-slate-400 font-bold uppercase">{vendor.email || vendor.pan}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="py-5">
                                                    <span className="px-3 py-1 bg-slate-100 text-[#0F172A] rounded-lg text-[10px] font-black uppercase border border-slate-200">
                                                        {vendor.tdsCategory}
                                                    </span>
                                                </td>
                                                <td className="py-5">
                                                    <div className="flex items-center gap-2 text-emerald-600 bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-100 w-fit">
                                                        <ShieldCheck size={12} />
                                                        <span className="text-[10px] font-black uppercase">Verified</span>
                                                    </div>
                                                </td>
                                                <td className="py-5 text-right">
                                                    <button 
                                                        onClick={() => {
                                                            setSelectedVendor(vendor);
                                                            setTdsRate(vendor.tdsCategory === 'SECTION_194J' ? 0.1 : 0.01);
                                                            setIsPayMode(true);
                                                        }}
                                                        className="p-2 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-[#245DF1] hover:border-[#245DF1] transition-all"
                                                    >
                                                        <CreditCard size={18} />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {/* TDS Ledger */}
                    <div className="space-y-6">
                        <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-2xl">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl"></div>
                            <div className="relative z-10">
                                <div className="flex items-center justify-between mb-8">
                                    <h2 className="text-xl font-black tracking-tight">TDS Ledger</h2>
                                    <Download size={18} className="text-slate-500 cursor-pointer" />
                                </div>

                                <div className="space-y-4">
                                    {payments.slice(0, 5).map((payment, i) => (
                                        <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-4 hover:bg-white/10 transition-all group">
                                            <div className="flex items-center justify-between mb-2">
                                                <p className="text-xs font-black text-slate-400 uppercase tracking-widest">{new Date(payment.paymentDate).toLocaleDateString()}</p>
                                                <span className="text-[10px] bg-red-500/10 text-red-400 px-2 py-0.5 rounded-md font-bold flex items-center gap-1">
                                                    TDS: ₹{payment.tdsAmount.toLocaleString()}
                                                </span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <p className="font-bold text-sm">{payment.vendor.name}</p>
                                                <p className="font-black text-emerald-400">₹{payment.netAmount.toLocaleString()}</p>
                                            </div>
                                        </div>
                                    ))}
                                    {payments.length === 0 && (
                                        <div className="py-10 text-center">
                                            <Clock size={32} className="mx-auto text-slate-700 mb-2 opacity-20" />
                                            <p className="text-slate-600 text-sm font-medium">No payments settled yet.</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-[2rem] p-6 border border-amber-100 bg-gradient-to-br from-white to-amber-50/20">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-100">
                                    <AlertCircle size={20} />
                                </div>
                                <div>
                                    <h4 className="font-black text-slate-800 text-sm">TDS Compliance Alert</h4>
                                    <p className="text-[10px] text-slate-500 font-medium">You have ₹4,200 pending for filing by the 7th of next month.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Modals */}
                <AnimatePresence>
                    {isAddMode && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-4">
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                                className="bg-white rounded-[2.5rem] w-full max-w-lg overflow-hidden shadow-2xl"
                            >
                                <div className="p-8 border-b border-slate-100 flex items-center justify-between">
                                    <h2 className="text-2xl font-black text-slate-800 tracking-tight">Add New Contractor</h2>
                                    <button onClick={() => setIsAddMode(false)} className="p-2 hover:bg-slate-50 rounded-xl text-slate-400 transition-all">
                                        <X size={20} />
                                    </button>
                                </div>
                                <form onSubmit={handleCreateVendor} className="p-8 space-y-6">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-1">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Vendor Name</label>
                                            <input name="name" required className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-bold text-slate-700" placeholder="e.g. AWS Cloud" />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">TDS Section</label>
                                            <select name="tdsCategory" className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-bold text-slate-700 appearance-none">
                                                <option value="SECTION_194C">194C (Contractors)</option>
                                                <option value="SECTION_194J">194J (Professional)</option>
                                                <option value="SECTION_194I">194I (Rent)</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="space-y-1">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">PAN Number</label>
                                            <input name="pan" required className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-bold text-slate-700 uppercase" placeholder="ABCDE1234F" />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 pt-4">
                                        <div className="space-y-1 text-slate-800">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Bank Account</label>
                                            <input name="bankAccount" className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-bold text-slate-700" placeholder="000123456789" />
                                        </div>
                                        <div className="space-y-1 text-slate-800">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">IFSC Code</label>
                                            <input name="ifsc" className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-bold text-slate-700" placeholder="HDFC0001234" />
                                        </div>
                                    </div>
                                    <button type="submit" className="w-full bg-[#245DF1] text-white py-4 rounded-2xl font-black uppercase tracking-widest mt-4 shadow-xl shadow-blue-500/20 hover:bg-blue-600 transition-all border-b-4 border-blue-800 active:border-b-0 active:translate-y-1">
                                        Register Contractor
                                    </button>
                                </form>
                            </motion.div>
                        </div>
                    )}

                    {isPayMode && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-md p-4">
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="bg-white rounded-[2.5rem] w-full max-w-sm overflow-hidden shadow-2xl border border-white/20"
                            >
                                <div className="p-8 bg-slate-900 text-white relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl"></div>
                                    <button onClick={() => setIsPayMode(false)} className="absolute top-6 right-6 p-2 hover:bg-white/10 rounded-xl text-white/40 transition-all">
                                        <X size={18} />
                                    </button>
                                    <div className="relative z-10 text-center">
                                        <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/20">
                                            <CreditCard size={28} className="text-primary" />
                                        </div>
                                        <h3 className="text-xl font-black mb-1">Process Payment</h3>
                                        <p className="text-white/40 text-xs font-bold uppercase tracking-widest">{selectedVendor?.name}</p>
                                    </div>
                                </div>
                                <div className="p-8 space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Invoice Amount (INR)</label>
                                        <div className="relative">
                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 font-black text-slate-400">₹</span>
                                            <input 
                                                value={paymentAmount}
                                                onChange={(e) => setPaymentAmount(e.target.value)}
                                                className="w-full pl-8 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all font-black text-2xl text-slate-800" 
                                                placeholder="0.00" 
                                            />
                                        </div>
                                    </div>

                                    <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 space-y-3">
                                        <div className="flex justify-between items-center text-xs font-bold">
                                            <span className="text-slate-400 uppercase tracking-widest">TDS Rate ({tdsRate * 100}%)</span>
                                            <span className="text-red-500">- ₹{tdsCalculated.toLocaleString()}</span>
                                        </div>
                                        {isGlobalMode && (
                                            <div className="flex justify-between items-center text-xs font-bold pt-1">
                                                <span className="text-slate-400 uppercase tracking-widest">Exchange Rate (1 INR)</span>
                                                <div className="flex items-center gap-2">
                                                    <select 
                                                        value={selectedCurrency}
                                                        onChange={(e) => setSelectedCurrency(e.target.value)}
                                                        className="bg-white border border-slate-200 rounded px-1 py-0.5 text-[10px]"
                                                    >
                                                        {Object.keys(currencyRates).map(curr => <option key={curr} value={curr}>{curr}</option>)}
                                                    </select>
                                                    <span className="text-blue-500">{currencyRates[selectedCurrency]?.toFixed(4)}</span>
                                                </div>
                                            </div>
                                        )}
                                        <div className="h-px bg-slate-200"></div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm font-black text-slate-800 uppercase tracking-widest">Net Payable (INR)</span>
                                            <span className="text-xl font-black text-[#245DF1]">₹{netPayable.toLocaleString()}</span>
                                        </div>
                                        {isGlobalMode && (
                                            <motion.div 
                                                initial={{ opacity: 0, scale: 0.9 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                className="bg-emerald-500 text-white rounded-xl p-3 flex justify-between items-center mt-2 border-b-2 border-emerald-700"
                                            >
                                                <span className="text-[10px] font-black uppercase px-2 py-0.5 bg-white/20 rounded">Global Payout</span>
                                                <span className="text-lg font-black">{selectedCurrency} {(netPayable * currencyRates[selectedCurrency]).toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
                                            </motion.div>
                                        )}
                                    </div>

                                    <button 
                                        onClick={handleProcessPayment}
                                        disabled={isProcessing || !paymentAmount}
                                        className="w-full bg-[#245DF1] text-white py-4 rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-blue-500/20 hover:bg-blue-600 transition-all border-b-4 border-blue-800 active:border-b-0 active:translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed group"
                                    >
                                        {isProcessing ? (
                                            <RefreshCw className="mx-auto animate-spin" size={20} />
                                        ) : (
                                            <div className="flex items-center justify-center gap-2">
                                                Execute Instant Transfer <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                            </div>
                                        )}
                                    </button>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </DashboardLayout>
    );
}
