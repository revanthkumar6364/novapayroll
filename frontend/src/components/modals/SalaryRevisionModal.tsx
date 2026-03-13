"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, DollarSign, Calendar, FileText, CheckCircle2, AlertCircle, RefreshCw, TrendingUp } from "lucide-react";
import { useState } from "react";

interface SalaryRevisionModalProps {
    isOpen: boolean;
    onClose: () => void;
    employee: { id: string; name: string; currentCtc?: number } | null;
    onRevision: (revisionData: Record<string, unknown>) => Promise<void>;
}

export default function SalaryRevisionModal({ isOpen, onClose, employee, onRevision }: SalaryRevisionModalProps) {
    const [newCtc, setNewCtc] = useState("");
    const [effectiveDate, setEffectiveDate] = useState("");
    const [reason, setReason] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!employee) return;
        
        setIsLoading(true);
        setStatus("idle");

        try {
            await onRevision({
                employeeId: employee.id,
                oldCtc: employee.currentCtc || 0,
                newCtc: Number(newCtc),
                effectiveDate,
                reason
            });
            setStatus("success");
            setTimeout(() => {
                onClose();
                setStatus("idle");
                setNewCtc("");
                setEffectiveDate("");
                setReason("");
            }, 2000);
        } catch {
            setStatus("error");
        } finally {
            setIsLoading(false);
        }
    };

    const percentageChange = employee?.currentCtc 
        ? ((Number(newCtc) - employee.currentCtc) / employee.currentCtc) * 100 
        : 0;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-[#0F172A]/80 backdrop-blur-md"
                    />
                    
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative w-full max-w-lg bg-white rounded-[2.5rem] shadow-2xl shadow-black/50 overflow-hidden border border-white/20"
                    >
                        {/* Header */}
                        <div className="bg-slate-50 p-8 flex items-center justify-between border-b border-slate-100">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group transition-all">
                                    <TrendingUp size={24} className="group-hover:scale-110 transition-transform" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-black text-[#0F172A] tracking-tight">Update Salary</h2>
                                    <p className="text-sm font-bold text-[#64748B]">Revising CTC for {employee?.name}</p>
                                </div>
                            </div>
                            <button 
                                onClick={onClose}
                                className="w-10 h-10 rounded-full hover:bg-white hover:shadow-md flex items-center justify-center text-slate-400 hover:text-red-500 transition-all"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Content */}
                        <form onSubmit={handleSubmit} className="p-10 space-y-8">
                            <div className="space-y-6">
                                {/* Current vs New */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Current CTC</p>
                                        <p className="text-lg font-black text-slate-600">₹{employee?.currentCtc?.toLocaleString() || "0"}</p>
                                    </div>
                                    <div className={`p-4 rounded-2xl border transition-all ${Number(newCtc) > (employee?.currentCtc || 0) ? 'bg-emerald-50 border-emerald-100' : 'bg-slate-50 border-slate-100'}`}>
                                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Percentage Change</p>
                                        <p className={`text-lg font-black ${percentageChange >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                                            {percentageChange > 0 ? "+" : ""}{percentageChange.toFixed(1)}%
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#64748B] ml-1">New Annual CTC (INR)</label>
                                    <div className="relative group">
                                        <DollarSign className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={20} />
                                        <input 
                                            type="number"
                                            required
                                            value={newCtc}
                                            onChange={(e) => setNewCtc(e.target.value)}
                                            placeholder="e.g. 1500000"
                                            className="w-full bg-slate-50 border border-slate-100 outline-none pl-14 pr-6 py-4 rounded-[1.5rem] text-sm font-black text-[#0F172A] placeholder:text-slate-400 focus:ring-8 focus:ring-primary/5 focus:border-primary focus:bg-white transition-all shadow-inner"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#64748B] ml-1">Effective Date</label>
                                    <div className="relative group">
                                        <Calendar className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={20} />
                                        <input 
                                            type="date"
                                            required
                                            value={effectiveDate}
                                            onChange={(e) => setEffectiveDate(e.target.value)}
                                            className="w-full bg-slate-50 border border-slate-100 outline-none pl-14 pr-6 py-4 rounded-[1.5rem] text-sm font-black text-[#0F172A] focus:ring-8 focus:ring-primary/5 focus:border-primary focus:bg-white transition-all shadow-inner"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#64748B] ml-1">Revision Reason / Note</label>
                                    <div className="relative group">
                                        <FileText className="absolute left-5 top-6 text-slate-400 group-focus-within:text-primary transition-colors" size={20} />
                                        <textarea 
                                            value={reason}
                                            onChange={(e) => setReason(e.target.value)}
                                            placeholder="Annual appraisal, promotion, market adjustment..."
                                            className="w-full bg-slate-50 border border-slate-100 outline-none pl-14 pr-6 py-4 rounded-[1.5rem] text-sm font-black text-[#0F172A] placeholder:text-slate-400 focus:ring-8 focus:ring-primary/5 focus:border-primary focus:bg-white transition-all shadow-inner min-h-[120px] resize-none"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Action Button */}
                            <button 
                                type="submit"
                                disabled={isLoading || status === "success"}
                                className={`w-full py-5 rounded-[1.5rem] font-black text-sm uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 active:scale-[0.98] shadow-lg ${
                                    status === "success" 
                                    ? "bg-emerald-500 text-white shadow-emerald-200" 
                                    : status === "error"
                                    ? "bg-rose-500 text-white shadow-rose-200"
                                    : "bg-primary text-white shadow-primary/30 hover:shadow-primary/40 hover:-translate-y-0.5"
                                }`}
                            >
                                {isLoading ? (
                                    <RefreshCw className="animate-spin" size={20} />
                                ) : status === "success" ? (
                                    <>Revision Submitted <CheckCircle2 size={20} /></>
                                ) : status === "error" ? (
                                    <>System Error <AlertCircle size={20} /></>
                                ) : (
                                    <>Apply Revision <TrendingUp size={20} /></>
                                )}
                            </button>
                        </form>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
