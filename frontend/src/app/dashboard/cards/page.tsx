"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { 
    CreditCard, Plus, ArrowUpRight, 
    ArrowDownLeft, Settings, ShieldAlert,
    History, Lock, Search, Filter,
    Eye, EyeOff, ArrowLeft, X, CheckCircle2
} from "lucide-react";

const INITIAL_CARDS = [
    { id: "CARD-1001", name: "SaaS & Software Card", last4: "5542", limit: "₹2.5L", status: "Active", theme: "dark", type: "Virtual" },
    { id: "CARD-1002", name: "Travel & Mktg", last4: "9102", limit: "₹5.0L", status: "Active", theme: "white", type: "Physical" },
    { id: "CARD-1003", name: "Operational Expenses", last4: "4412", limit: "₹1.5L", status: "Active", theme: "dark", type: "Virtual" },
    { id: "CARD-1004", name: "Team Outing", last4: "8821", limit: "₹50k", status: "Paused", theme: "white", type: "Virtual" },
    { id: "CARD-1005", name: "AWS Direct", last4: "1190", limit: "₹10L", status: "Active", theme: "dark", type: "Physical" },
    { id: "CARD-1006", name: "Petty Cash", last4: "3321", limit: "₹25k", status: "Active", theme: "white", type: "Virtual" },
];

const TRANSACTIONS = [
    { id: "TX-1002", merchant: "AWS Services", amount: "₹45,200", date: "Today, 10:42 AM", status: "Completed", type: "debit" },
    { id: "TX-1001", merchant: "Card Reload", amount: "₹5,00,000", date: "Yesterday, 09:00 AM", status: "Completed", type: "credit" },
    { id: "TX-1000", merchant: "Google Workspace", amount: "₹12,450", date: "10 Mar, 02:15 PM", status: "Completed", type: "debit" },
    { id: "TX-0999", merchant: "WeWork", amount: "₹1,25,000", date: "01 Mar, 11:30 AM", status: "Completed", type: "debit" },
];

export default function CorporateCardsPage() {
    const router = useRouter();
    const [showCardNumber, setShowCardNumber] = useState(false);
    const [balance, setBalance] = useState(1250000);
    const [showAddFunds, setShowAddFunds] = useState(false);
    const [showAllCards, setShowAllCards] = useState(false);
    const [showIssueCard, setShowIssueCard] = useState(false);
    const [cards, setCards] = useState(INITIAL_CARDS);
    
    // Transactions Filtering state
    const [searchQuery, setSearchQuery] = useState("");
    const [filterType, setFilterType] = useState<"all" | "debit" | "credit">("all");
    const [showFilterMenu, setShowFilterMenu] = useState(false);

    // New Card Form State
    const [newCardName, setNewCardName] = useState("");
    const [newCardLimit, setNewCardLimit] = useState("");
    const [newCardTheme, setNewCardTheme] = useState<"dark" | "white">("dark");
    const [isIssuing, setIsIssuing] = useState(false);

    const handleIssueCard = () => {
        setIsIssuing(true);
        setTimeout(() => {
            const newCard = {
                id: `CARD-${Date.now()}`,
                name: newCardName || "New Corporate Card",
                last4: Math.floor(1000 + Math.random() * 9000).toString(),
                limit: `₹${(parseInt(newCardLimit) / 100000).toFixed(1)}L`,
                status: "Active" as const,
                theme: newCardTheme,
                type: "Virtual" as const,
            };
            setCards(prev => [newCard, ...prev]);
            setIsIssuing(false);
            setShowIssueCard(false);
            setNewCardName("");
            setNewCardLimit("");
        }, 1500);
    };
    const [addAmount, setAddAmount] = useState("");
    const [isAdding, setIsAdding] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleAddFunds = () => {
        setIsAdding(true);
        setTimeout(() => {
            setBalance(prev => prev + (parseInt(addAmount) || 0));
            setIsAdding(false);
            setIsSuccess(true);
            setTimeout(() => {
                setIsSuccess(false);
                setShowAddFunds(false);
                setAddAmount("");
            }, 2000);
        }, 1500);
    };

    const filteredTransactions = TRANSACTIONS.filter(tx => {
        const matchesSearch = tx.merchant.toLowerCase().includes(searchQuery.toLowerCase()) || 
                             tx.id.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesFilter = filterType === "all" || tx.type === filterType;
        return matchesSearch && matchesFilter;
    });

    const handleDownloadCSV = () => {
        const headers = ["Transaction ID", "Merchant", "Date & Time", "Amount", "Type", "Status"];
        const rows = filteredTransactions.map(tx => [
            tx.id,
            tx.merchant,
            tx.date,
            tx.amount.replace("₹", ""),
            tx.type === 'credit' ? 'CREDIT' : 'DEBIT',
            tx.status
        ]);

        const csvContent = [
            headers.join(","),
            ...rows.map(row => row.join(","))
        ].join("\n");

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", `Nova_Statement_${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Header section with elite illustration */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
                
                <div className="relative z-10 max-w-xl">
                    <button 
                        onClick={() => router.push('/dashboard')}
                        className="group flex items-center gap-2 text-[#64748B] hover:text-primary transition-colors mb-6 text-sm font-bold"
                    >
                        <div className="p-1.5 rounded-lg bg-slate-50 group-hover:bg-primary/10 transition-colors">
                            <ArrowLeft size={16} />
                        </div>
                        Back to Dashboard
                    </button>
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
                        <h3 className="text-3xl font-black text-[#0F172A] tracking-tight">₹{balance.toLocaleString()}<span className="text-sm font-medium text-[#94A3B8]">.00</span></h3>
                    </div>
                    <div className="mt-6 flex flex-wrap gap-3">
                        <button 
                            onClick={() => setShowIssueCard(true)}
                            className="flex-1 bg-[#1D4ED8] text-white px-4 py-2.5 rounded-xl font-bold hover:bg-[#1E40AF] transition-all shadow-md shadow-blue-500/20 flex items-center justify-center gap-2 text-sm active:scale-95"
                        >
                            <Plus size={16} /> Issue Card
                        </button>
                        <button 
                            onClick={() => setShowAddFunds(true)}
                            className="flex-1 bg-white border border-[#E2E8F0] text-[#0F172A] px-4 py-2.5 rounded-xl font-bold hover:bg-slate-50 transition-colors flex items-center justify-center gap-2 text-sm active:scale-95"
                        >
                            <ArrowUpRight size={16} /> Add Funds
                        </button>
                    </div>
                </div>

                {/* Active Cards Summary */}
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm md:col-span-2">
                    <div className="flex justify-between items-center mb-6">
                        <h4 className="text-lg font-bold text-[#0F172A]">Your Cards</h4>
                        <button 
                            onClick={() => setShowAllCards(true)}
                            className="text-primary text-sm font-bold hover:underline"
                        >
                            View All
                        </button>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {cards.slice(0, 2).map((card) => (
                            <div key={card.id} className="border border-slate-100 rounded-xl p-4 flex gap-4 items-center bg-slate-50/50 hover:bg-slate-50 transition-colors group cursor-pointer">
                                <div className={`w-16 h-10 rounded-lg shadow-inner flex flex-col justify-between p-1.5 border relative overflow-hidden ${card.theme === 'dark' ? 'bg-gradient-to-br from-[#0F172A] to-[#334155] border-slate-800' : 'bg-white border-slate-200'}`}>
                                    <div className="flex justify-between items-start">
                                        <svg viewBox="0 0 40 40" fill="none" className={`w-2.5 h-2.5 ${card.theme === 'dark' ? 'text-white' : 'text-primary'}`}>
                                            <path d="M10 34L26 6H36L20 34H10Z" fill="currentColor" />
                                            <path d="M2 34L14 12H24L12 34H2Z" fill="currentColor" className="opacity-40" />
                                        </svg>
                                        <div className="flex -space-x-1">
                                            <div className="w-2.5 h-2.5 rounded-full bg-[#EB001B]"></div>
                                            <div className="w-2.5 h-2.5 rounded-full bg-[#F79E1B] opacity-80"></div>
                                        </div>
                                    </div>
                                    <div className={`text-[4px] font-mono tracking-widest ${card.theme === 'dark' ? 'text-white/40' : 'text-slate-300'}`}>
                                        •••• {card.last4}
                                    </div>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h5 className="text-[14px] font-bold text-[#0F172A] truncate">{card.name}</h5>
                                    <p className="text-[12px] text-[#64748B] font-mono mt-0.5">•••• {card.last4}</p>
                                </div>
                                <div className="text-right shrink-0">
                                    <span className="block text-[14px] font-bold text-[#0F172A]">{card.limit}</span>
                                    <span className={`block text-[11px] font-bold ${card.status === 'Active' ? 'text-emerald-500' : 'text-amber-500'}`}>{card.status}</span>
                                </div>
                            </div>
                        ))}
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
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-9 pr-4 py-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-[#0F172A] placeholder:text-[#94A3B8] w-full sm:w-64"
                            />
                        </div>
                        <div className="relative">
                            <button 
                                onClick={() => setShowFilterMenu(!showFilterMenu)}
                                className={`p-2 border rounded-xl transition-colors flex items-center gap-2 ${filterType !== 'all' ? 'bg-primary/5 border-primary text-primary' : 'border-[#E2E8F0] text-[#475569] hover:bg-[#F8FAFC]'}`}
                            >
                                <Filter size={18} />
                                {filterType !== 'all' && <span className="text-[10px] font-black uppercase">{filterType}</span>}
                            </button>

                            {showFilterMenu && (
                                <div className="absolute right-0 mt-2 w-40 bg-white border border-slate-100 rounded-2xl shadow-xl z-30 py-2 overflow-hidden animate-in fade-in slide-in-from-top-2">
                                    <div className="px-3 py-1 mb-1 border-b border-slate-50">
                                        <span className="text-[10px] font-black text-[#94A3B8] uppercase tracking-widest">Filter by type</span>
                                    </div>
                                    <button 
                                        onClick={() => { setFilterType("all"); setShowFilterMenu(false); }}
                                        className={`w-full text-left px-4 py-2 text-[13px] font-bold hover:bg-slate-50 transition-colors ${filterType === 'all' ? 'text-primary' : 'text-[#475569]'}`}
                                    >
                                        All Transactions
                                    </button>
                                    <button 
                                        onClick={() => { setFilterType("debit"); setShowFilterMenu(false); }}
                                        className={`w-full text-left px-4 py-2 text-[13px] font-bold hover:bg-slate-50 transition-colors ${filterType === 'debit' ? 'text-primary' : 'text-[#475569]'}`}
                                    >
                                        Spending (Debits)
                                    </button>
                                    <button 
                                        onClick={() => { setFilterType("credit"); setShowFilterMenu(false); }}
                                        className={`w-full text-left px-4 py-2 text-[13px] font-bold hover:bg-slate-50 transition-colors ${filterType === 'credit' ? 'text-primary' : 'text-[#475569]'}`}
                                    >
                                        Reloads (Credits)
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-[#F8FAFC] border-b border-slate-100">
                                <th className="p-4 text-[12px] font-bold uppercase tracking-wider text-[#64748B]">Transaction ID</th>
                                <th className="p-4 text-[12px] font-bold uppercase tracking-wider text-[#64748B]">Merchant</th>
                                <th className="p-4 text-[12px] font-bold uppercase tracking-wider text-[#64748B]">Date & Time</th>
                                <th className="p-4 text-[12px] font-bold uppercase tracking-wider text-[#64748B] text-center">Amount</th>
                                <th className="p-4 text-[12px] font-bold uppercase tracking-wider text-[#64748B] text-center">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {filteredTransactions.length > 0 ? (
                                filteredTransactions.map((tx) => (
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
                                        <td className="p-4 text-center">
                                            <span className={`text-[14px] font-bold ${tx.type === 'credit' ? 'text-[#10B981]' : 'text-[#0F172A]'}`}>
                                                {tx.type === 'credit' ? '+' : '-'}{tx.amount}
                                            </span>
                                        </td>
                                        <td className="p-4 text-center">
                                            <div className="inline-flex items-center gap-1.5 bg-[#F0FDF4] text-[#15803D] px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wide border border-[#DCFCE7]">
                                                <div className="w-1.5 h-1.5 rounded-full bg-[#15803D]"></div>
                                                Completed
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="p-20 text-center">
                                        <div className="flex flex-col items-center gap-4">
                                            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center border border-slate-100 italic font-black text-[#94A3B8]">
                                                ?
                                            </div>
                                            <div>
                                                <p className="font-bold text-[#0F172A]">No transactions found</p>
                                                <p className="text-sm text-[#64748B]">Try adjusting your search or filter</p>
                                            </div>
                                            <button 
                                                onClick={() => { setSearchQuery(""); setFilterType("all"); }}
                                                className="text-primary text-xs font-black uppercase tracking-widest hover:underline"
                                            >
                                                Reset search
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <div className="p-6 border-t border-slate-100 bg-slate-50/30 flex justify-center">
                    <button 
                        onClick={handleDownloadCSV}
                        className="bg-white border border-[#E2E8F0] text-[#0F172A] px-6 py-2.5 rounded-xl font-bold hover:bg-slate-50 hover:border-slate-300 transition-all flex items-center gap-2 text-sm shadow-sm active:scale-95"
                    >
                        <ArrowDownLeft size={16} className="text-[#64748B]" /> Download Statement (.CSV)
                    </button>
                </div>
            </div>

            {/* Add Funds Modal */}
            {showAddFunds && (
                <div className="fixed inset-0 bg-[#0F172A]/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <motion.div 
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden border border-slate-200"
                    >
                        <div className="p-8 border-b border-slate-100 flex justify-between items-center">
                            <div>
                                <h3 className="text-xl font-black text-[#0F172A]">Add Funds</h3>
                                <p className="text-[#64748B] text-sm mt-1">Top up your available primary limit.</p>
                            </div>
                            <button onClick={() => setShowAddFunds(false)} className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                                <X size={20} className="text-[#64748B]" />
                            </button>
                        </div>
                        <div className="p-8 space-y-6">
                            {isSuccess ? (
                                <div className="py-8 text-center space-y-4">
                                    <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-2 border border-emerald-100">
                                        <CheckCircle2 size={40} />
                                    </div>
                                    <h4 className="text-xl font-black text-[#0F172A]">Funds Added!</h4>
                                    <p className="text-[#64748B] text-sm">Your primary limit has been updated successfully.</p>
                                </div>
                            ) : (
                                <>
                                    <div className="space-y-2">
                                        <label className="text-[11px] font-black uppercase tracking-widest text-[#64748B]">Amount to Add (₹)</label>
                                        <div className="relative">
                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg font-bold text-[#0F172A]">₹</span>
                                            <input 
                                                type="number"
                                                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-4 text-xl font-black focus:border-[#1D4ED8] outline-none transition-colors" 
                                                placeholder="0.00"
                                                value={addAmount}
                                                onChange={(e) => setAddAmount(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-3 gap-3">
                                        {["50000", "100000", "500000"].map(amt => (
                                            <button 
                                                key={amt}
                                                onClick={() => setAddAmount(amt)}
                                                className="py-2 bg-slate-50 border border-slate-200 rounded-lg text-[12px] font-bold text-[#475569] hover:bg-slate-100 transition-colors"
                                            >
                                                +₹{(parseInt(amt)/1000)}k
                                            </button>
                                        ))}
                                    </div>
                                    <button 
                                        onClick={handleAddFunds}
                                        disabled={!addAmount || isAdding}
                                        className="w-full bg-[#1D4ED8] text-white py-4 rounded-2xl font-black shadow-lg shadow-blue-500/20 hover:bg-[#1E40AF] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                    >
                                        {isAdding ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <ArrowUpRight size={20} />}
                                        {isAdding ? "Processing..." : "Confirm Top Up"}
                                    </button>
                                </>
                            )}
                        </div>
                    </motion.div>
                </div>
            )}

            {/* View All Cards Modal */}
            {showAllCards && (
                <div className="fixed inset-0 bg-[#0F172A]/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <motion.div 
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="bg-white rounded-[2rem] shadow-2xl w-full max-w-2xl overflow-hidden border border-slate-200"
                    >
                        <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                            <div>
                                <h3 className="text-xl font-black text-[#0F172A]">Your Corporate Cards</h3>
                                <p className="text-[#64748B] text-sm mt-1">Manage and monitor all issued credit cards.</p>
                            </div>
                            <button onClick={() => setShowAllCards(false)} className="p-2 hover:bg-white rounded-xl transition-colors border border-slate-200">
                                <X size={20} className="text-[#64748B]" />
                            </button>
                        </div>
                        <div className="p-8 max-h-[60vh] overflow-y-auto">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {cards.map((card) => (
                                    <div key={card.id} className="border border-slate-100 rounded-2xl p-5 flex gap-4 items-center bg-slate-50/30 hover:bg-slate-50 transition-all group cursor-pointer">
                                        <div className={`w-20 h-12 rounded-xl shadow-md flex flex-col justify-between p-2 border relative overflow-hidden shrink-0 ${card.theme === 'dark' ? 'bg-gradient-to-br from-[#0F172A] to-[#334155] border-slate-800' : 'bg-white border-slate-200'}`}>
                                            <div className="flex justify-between items-start">
                                                <svg viewBox="0 0 40 40" fill="none" className={`w-3.5 h-3.5 ${card.theme === 'dark' ? 'text-white' : 'text-primary'}`}>
                                                    <path d="M10 34L26 6H36L20 34H10Z" fill="currentColor" />
                                                    <path d="M2 34L14 12H24L12 34H2Z" fill="currentColor" className="opacity-40" />
                                                </svg>
                                                <div className="flex -space-x-1.5">
                                                    <div className="w-3.5 h-3.5 rounded-full bg-[#EB001B]"></div>
                                                    <div className="w-3.5 h-3.5 rounded-full bg-[#F79E1B] opacity-80"></div>
                                                </div>
                                            </div>
                                            <div className={`text-[6px] font-mono tracking-widest ${card.theme === 'dark' ? 'text-white/40' : 'text-slate-300'}`}>
                                                •••• {card.last4}
                                            </div>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h5 className="text-[15px] font-black text-[#0F172A] leading-tight truncate">{card.name}</h5>
                                            <div className="flex items-center gap-2 mt-1">
                                                <span className="text-[11px] font-black uppercase text-[#94A3B8] tracking-widest font-mono">{card.last4}</span>
                                                <span className="w-1 h-1 rounded-full bg-slate-300" />
                                                <span className="text-[11px] font-black uppercase text-[#94A3B8] tracking-widest">{card.type}</span>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-[15px] font-black text-primary leading-tight">{card.limit}</p>
                                            <div className={`inline-flex items-center gap-1 mt-1 px-1.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-tighter ${card.status === 'Active' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                                                {card.status}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-center">
                            <button 
                                onClick={() => {
                                    setShowAllCards(false);
                                    setShowIssueCard(true);
                                }}
                                className="text-primary text-sm font-black uppercase tracking-widest hover:underline flex items-center gap-2"
                            >
                                <Plus size={16} /> Issue New Corporate Card
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}

            {/* Issue Card Modal */}
            {showIssueCard && (
                <div className="fixed inset-0 bg-[#0F172A]/40 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
                    <motion.div 
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="bg-white rounded-[2rem] shadow-2xl w-full max-w-md overflow-hidden border border-slate-200"
                    >
                        <div className="p-8 border-b border-slate-100 flex justify-between items-center">
                            <div>
                                <h3 className="text-xl font-black text-[#0F172A]">Issue New Card</h3>
                                <p className="text-[#64748B] text-sm mt-1">Configure your new corporate credit card.</p>
                            </div>
                            <button onClick={() => setShowIssueCard(false)} className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                                <X size={20} className="text-[#64748B]" />
                            </button>
                        </div>
                        
                        <div className="p-8 space-y-6">
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-[11px] font-black uppercase tracking-widest text-[#64748B]">Cardholder Name / Purpose</label>
                                    <input 
                                        type="text"
                                        placeholder="e.g. Marketing Ops"
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 font-bold focus:border-primary outline-none transition-colors"
                                        value={newCardName}
                                        onChange={(e) => setNewCardName(e.target.value)}
                                    />
                                </div>
                                
                                <div className="space-y-2">
                                    <label className="text-[11px] font-black uppercase tracking-widest text-[#64748B]">Monthly Limit (₹)</label>
                                    <input 
                                        type="number"
                                        placeholder="e.g. 100000"
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 font-bold focus:border-primary outline-none transition-colors"
                                        value={newCardLimit}
                                        onChange={(e) => setNewCardLimit(e.target.value)}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[11px] font-black uppercase tracking-widest text-[#64748B]">Card Theme</label>
                                    <div className="flex gap-3">
                                        <button 
                                            onClick={() => setNewCardTheme('dark')}
                                            className={`flex-1 py-3 rounded-xl border-2 transition-all flex items-center justify-center gap-2 font-bold ${newCardTheme === 'dark' ? 'border-primary bg-primary/5 text-primary' : 'border-slate-100 bg-white text-slate-400'}`}
                                        >
                                            <div className="w-4 h-4 rounded-full bg-[#0F172A]" /> Dark
                                        </button>
                                        <button 
                                            onClick={() => setNewCardTheme('white')}
                                            className={`flex-1 py-3 rounded-xl border-2 transition-all flex items-center justify-center gap-2 font-bold ${newCardTheme === 'white' ? 'border-primary bg-primary/5 text-primary' : 'border-slate-100 bg-white text-slate-400'}`}
                                        >
                                            <div className="w-4 h-4 rounded-full bg-white border border-slate-200" /> White
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <button 
                                onClick={handleIssueCard}
                                disabled={!newCardName || !newCardLimit || isIssuing}
                                className="w-full bg-[#1D4ED8] text-white py-4 rounded-2xl font-black shadow-lg shadow-blue-500/20 hover:bg-[#1E40AF] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 active:scale-[0.98]"
                            >
                                {isIssuing ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Plus size={20} />}
                                {isIssuing ? "Issuing Card..." : "Confirm & Issue Card"}
                            </button>
                            
                            <p className="text-[10px] text-[#64748B] text-center font-bold px-4 leading-relaxed">
                                By issuing this card, you agree to the corporate spending policy and limit controls.
                            </p>
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    );
}


// Delete redundant X and CheckCircle2 functions as they are now imported from lucide-react
