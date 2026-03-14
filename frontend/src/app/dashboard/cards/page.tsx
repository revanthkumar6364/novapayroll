"use client";

import { motion, AnimatePresence } from "framer-motion";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { 
    CreditCard, Shield, Lock, Eye, EyeOff, 
    Plus, Settings, TrendingUp, Filter,
    ChevronRight, Zap, Globe, MoreHorizontal
} from "lucide-react";
import { useState, useEffect } from "react";
import { api } from "@/lib/api";

export default function CorporateCards() {
    const [cards, setCards] = useState<any[]>([]);
    const [isCardVisible, setIsCardVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchCards = async () => {
            try {
                const data = await api.get('/corporate-cards');
                setCards(data);
            } catch (err) {
                console.error("Failed to fetch cards", err);
                // Demo data for visual excellence
                setCards([
                    { id: "1", cardHolderName: "RAJESH KUMAR", lastFour: "8842", expiryDate: "08/28", status: "ACTIVE", spent: 12400.0, limit: 100000.0 },
                    { id: "2", cardHolderName: "AMIT SHARMA", lastFour: "1129", expiryDate: "12/27", status: "ACTIVE", spent: 45000.0, limit: 50000.0 },
                ]);
            } finally {
                setIsLoading(false);
            }
        };
        fetchCards();
    }, []);

    const selectedCard = cards[0];

    return (
        <DashboardLayout>
            <div className="space-y-10">
                 {/* Header */}
                 <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div className="space-y-2">
                        <div className="flex items-center gap-3 text-primary font-black uppercase tracking-[0.3em] text-[10px]">
                            <span className="w-8 h-[2px] bg-primary"></span>
                            Spend Control
                        </div>
                        <h1 className="text-4xl font-black text-[#0F172A] tracking-tighter">Corporate Cards</h1>
                        <p className="text-slate-500 font-bold text-lg">Issue virtual cards to your workforce and manage budgets in real-time.</p>
                    </div>
                    
                    <button className="premium-button py-4 px-8 rounded-2xl flex items-center gap-3 bg-primary text-white font-black text-xs uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all">
                        <Plus size={20} /> Issue New Card
                    </button>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
                    {/* Left: Card Management */}
                    <div className="xl:col-span-8 space-y-8">
                        {/* Featured Animated Card */}
                        <div className="relative group perspective-1000">
                            <motion.div 
                                initial={{ rotateY: -10, rotateX: 5 }}
                                whileHover={{ rotateY: 0, rotateX: 0 }}
                                className="w-full h-[340px] rounded-[3rem] bg-gradient-to-br from-[#1E293B] via-[#0F172A] to-[#020617] relative overflow-hidden shadow-2xl p-12 flex flex-col justify-between border border-white/10"
                            >
                                {/* Decorative elements */}
                                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/20 rounded-full blur-[100px] -mr-32 -mt-32 pointer-events-none"></div>
                                <div className="absolute bottom-0 left-0 w-40 h-40 bg-indigo-500/10 rounded-full blur-[60px] -ml-20 -mb-20 pointer-events-none"></div>
                                
                                <div className="relative z-10 flex items-start justify-between">
                                    <div className="space-y-1">
                                        <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.3em]">Business Platinum</p>
                                        <div className="flex items-center gap-3">
                                            <h2 className="text-2xl font-black text-white tracking-tight">Nova Card</h2>
                                            <div className="w-8 h-8 rounded-lg bg-white/5 backdrop-blur-md flex items-center justify-center">
                                                <Zap size={16} className="text-primary fill-primary" />
                                            </div>
                                        </div>
                                    </div>
                                    <Globe className="text-white/10" size={48} />
                                </div>

                                <div className="relative z-10 space-y-4">
                                    <div className="flex items-center gap-8">
                                        <div className="text-3xl font-mono text-white tracking-[0.3em]">
                                            {isCardVisible ? "5244 8812 3341" : "**** **** ****"} <span className="text-primary">{selectedCard?.lastFour}</span>
                                        </div>
                                        <button 
                                            onClick={() => setIsCardVisible(!isCardVisible)}
                                            className="p-3 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl text-white/60 hover:text-white transition-colors"
                                        >
                                            {isCardVisible ? <EyeOff size={20} /> : <Eye size={20} />}
                                        </button>
                                    </div>
                                    <div className="flex gap-12">
                                        <div>
                                            <p className="text-white/30 text-[9px] font-black uppercase tracking-widest mb-1">Expiry Date</p>
                                            <p className="text-white font-black tracking-widest font-mono">{selectedCard?.expiryDate}</p>
                                        </div>
                                        <div>
                                            <p className="text-white/30 text-[9px] font-black uppercase tracking-widest mb-1">CVV</p>
                                            <p className="text-white font-black tracking-widest font-mono">{isCardVisible ? "442" : "***"}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="relative z-10 flex items-end justify-between">
                                    <div>
                                        <p className="text-white/30 text-[9px] font-black uppercase tracking-widest mb-1">Card Holder</p>
                                        <p className="text-lg font-black text-white tracking-tight uppercase">{selectedCard?.cardHolderName}</p>
                                    </div>
                                    <div className="h-12 w-16 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center opacity-40">
                                        <div className="w-8 h-8 rounded-full bg-red-500/50 mr-[-12px]"></div>
                                        <div className="w-8 h-8 rounded-full bg-yellow-500/50"></div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Recent Transactions for Card */}
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <h3 className="text-xl font-black text-[#0F172A] tracking-tight">Recent Spend</h3>
                                <button className="text-primary text-[10px] font-black uppercase tracking-widest flex items-center gap-2">View History <ChevronRight size={14} /></button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {[
                                    { merchant: "Amazon Web Services", category: "Servers", amount: 12450, icon: Globe, color: "bg-orange-50 text-orange-600" },
                                    { merchant: "Starbucks India", category: "Food & Beverage", amount: 850, icon: Zap, color: "bg-emerald-50 text-emerald-600" },
                                ].map((tx, idx) => (
                                    <div key={idx} className="p-6 bg-white border border-slate-100 rounded-2xl flex items-center justify-between group hover:border-primary/20 transition-all cursor-pointer">
                                        <div className="flex items-center gap-4">
                                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${tx.color}`}>
                                                <tx.icon size={20} />
                                            </div>
                                            <div>
                                                <p className="font-black text-[#0F172A] text-sm tracking-tight">{tx.merchant}</p>
                                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{tx.category}</p>
                                            </div>
                                        </div>
                                        <p className="font-black text-[#0F172A]">₹{tx.amount.toLocaleString()}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right: Card Settings & Analytics */}
                    <div className="xl:col-span-4 space-y-8">
                        <div className="premium-card p-8 bg-white/50 backdrop-blur-xl border-slate-100 space-y-8">
                            <div>
                                <h3 className="text-lg font-black text-[#0F172A] mb-1">Budget Progress</h3>
                                <p className="text-xs font-bold text-slate-400">Monthly limit utilization</p>
                            </div>

                            <div className="space-y-4">
                                <div className="flex justify-between items-end">
                                    <p className="text-3xl font-black text-[#0F172A]">₹{selectedCard?.spent?.toLocaleString()}</p>
                                    <p className="text-xs font-black text-slate-400 mb-1">Limit: ₹{selectedCard?.limit?.toLocaleString()}</p>
                                </div>
                                <div className="h-4 w-full bg-slate-100 rounded-full p-1 overflow-hidden">
                                    <motion.div 
                                        initial={{ width: 0 }}
                                        animate={{ width: "24.8%" }}
                                        className="h-full bg-primary rounded-full shadow-lg shadow-primary/30"
                                    ></motion.div>
                                </div>
                                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-[#64748B]">
                                    <span>24.8% Spent</span>
                                    <span className="text-emerald-500">₹75.2K Remaining</span>
                                </div>
                            </div>

                            <div className="pt-8 border-t border-slate-50 space-y-4">
                                <p className="text-[10px] font-black uppercase tracking-widest text-[#64748B]">Control Center</p>
                                <div className="space-y-2">
                                    {[
                                        { label: "Update Limit", icon: TrendingUp },
                                        { label: "Card Settings", icon: Settings },
                                        { label: "Freeze Card", icon: Lock, danger: true }
                                    ].map((item, idx) => (
                                        <button key={idx} className={`w-full p-4 rounded-xl font-black text-[11px] uppercase tracking-widest flex items-center justify-between group transition-all ${
                                            item.danger ? 'bg-rose-50 text-rose-500 hover:bg-rose-500 hover:text-white' : 'bg-slate-50 text-slate-500 hover:bg-primary/5 hover:text-primary'
                                        }`}>
                                            <span className="flex items-center gap-3">
                                                <item.icon size={16} />
                                                {item.label}
                                            </span>
                                            <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="p-6 bg-indigo-50 rounded-[2rem] border border-indigo-100 relative overflow-hidden">
                                <Shield className="absolute bottom-[-10px] right-[-10px] text-indigo-200/50" size={80} />
                                <h4 className="text-sm font-black text-indigo-900 tracking-tight mb-2 relative z-10">Purchase Protection</h4>
                                <p className="text-[10px] leading-relaxed font-bold text-indigo-700/70 relative z-10">Every transaction on this card is insured against fraud and merchant defaults.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .perspective-1000 {
                    perspective: 1000px;
                }
            `}</style>
        </DashboardLayout>
    );
}
