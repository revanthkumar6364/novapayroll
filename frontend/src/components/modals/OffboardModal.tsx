"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Calculator, FileCheck, LogOut, CheckCircle2, RefreshCw, ChevronRight, ChevronLeft } from "lucide-react";
import { useState } from "react";

interface OffboardModalProps {
    isOpen: boolean;
    onClose: () => void;
    employee: { id: string; name: string } | null;
    onOffboard: (settlementData: Record<string, unknown>) => Promise<void>;
}

export default function OffboardModal({ isOpen, onClose, employee, onOffboard }: OffboardModalProps) {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        exitDate: "",
        lastWorkingDay: "",
        noticePeriodDays: 30,
        leaveEncashment: 0,
        gratuity: 0,
        bonus: 0,
        deductions: 0,
        notes: ""
    });
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

    const netPayable = (Number(formData.leaveEncashment) + Number(formData.gratuity) + Number(formData.bonus)) - Number(formData.deductions);

    const handleNext = () => setStep(s => s + 1);
    const handleBack = () => setStep(s => s - 1);

    const handleSubmit = async () => {
        if (!employee) return;
        setIsLoading(true);
        try {
            await onOffboard({
                employeeId: employee.id,
                ...formData,
                netPayable: netPayable > 0 ? netPayable : 0
            });
            setStatus("success");
            setTimeout(() => {
                onClose();
                setStep(1);
                setStatus("idle");
            }, 2000);
        } catch {
            setStatus("error");
        } finally {
            setIsLoading(false);
        }
    };

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
                        className="relative w-full max-w-xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-white/20"
                    >
                        {/* Header */}
                        <div className="bg-slate-50 p-8 flex items-center justify-between border-b border-slate-100">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-rose-50 flex items-center justify-center text-rose-500">
                                    <LogOut size={24} />
                                </div>
                                <div>
                                    <h2 className="text-xl font-black text-[#0F172A] tracking-tight">Process Exit</h2>
                                    <p className="text-sm font-bold text-[#64748B]">Full & Final for {employee?.name}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                {[1, 2, 3].map(s => (
                                    <div key={s} className={`h-1.5 w-6 rounded-full transition-all ${step >= s ? 'bg-primary' : 'bg-slate-200'}`} />
                                ))}
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-10">
                            {step === 1 && (
                                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                                    <div className="space-y-4">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-1">
                                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Exit Date</label>
                                                <input type="date" value={formData.exitDate} onChange={e => setFormData({...formData, exitDate: e.target.value})} className="premium-input w-full p-4 rounded-xl bg-slate-50 border-slate-100 font-bold" />
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Last Working Day</label>
                                                <input type="date" value={formData.lastWorkingDay} onChange={e => setFormData({...formData, lastWorkingDay: e.target.value})} className="premium-input w-full p-4 rounded-xl bg-slate-50 border-slate-100 font-bold" />
                                            </div>
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Notice Period Adjusted (Days)</label>
                                            <input type="number" value={formData.noticePeriodDays} onChange={e => setFormData({...formData, noticePeriodDays: Number(e.target.value)})} className="premium-input w-full p-4 rounded-xl bg-slate-50 border-slate-100 font-bold" />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Exit Reason / Notes</label>
                                            <textarea value={formData.notes} onChange={e => setFormData({...formData, notes: e.target.value})} placeholder="Resignation, Termination, etc." className="premium-input w-full p-4 rounded-xl bg-slate-50 border-slate-100 font-bold min-h-[100px] resize-none" />
                                        </div>
                                    </div>
                                    <button onClick={handleNext} className="w-full py-4 bg-primary text-white rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-primary/90 transition-all">
                                        Next Component <ChevronRight size={18} />
                                    </button>
                                </motion.div>
                            )}

                            {step === 2 && (
                                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-1">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Leave Encashment (INR)</label>
                                            <input type="number" value={formData.leaveEncashment} onChange={e => setFormData({...formData, leaveEncashment: Number(e.target.value)})} className="premium-input w-full p-4 rounded-xl bg-slate-50 border-slate-100 font-bold" />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Gratuity (INR)</label>
                                            <input type="number" value={formData.gratuity} onChange={e => setFormData({...formData, gratuity: Number(e.target.value)})} className="premium-input w-full p-4 rounded-xl bg-slate-50 border-slate-100 font-bold" />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Bonus / Other Dues (INR)</label>
                                            <input type="number" value={formData.bonus} onChange={e => setFormData({...formData, bonus: Number(e.target.value)})} className="premium-input w-full p-4 rounded-xl bg-slate-50 border-slate-100 font-bold" />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1 text-rose-500">Deductions (INR)</label>
                                            <input type="number" value={formData.deductions} onChange={e => setFormData({...formData, deductions: Number(e.target.value)})} className="premium-input w-full p-4 rounded-xl bg-rose-50 border-rose-100 font-bold text-rose-600" />
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <button onClick={handleBack} className="flex-1 py-4 border-2 border-slate-100 text-slate-400 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-slate-50 transition-all">
                                            <ChevronLeft size={18} /> Back
                                        </button>
                                        <button onClick={handleNext} className="flex-[2] py-4 bg-primary text-white rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
                                            Calculate Final Dues <Calculator size={18} />
                                        </button>
                                    </div>
                                </motion.div>
                            )}

                            {step === 3 && (
                                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
                                    <div className="p-8 bg-slate-50 rounded-[2rem] border border-slate-100 space-y-6">
                                        <div className="flex items-center justify-between">
                                            <p className="text-sm font-bold text-slate-500">Gross Payable</p>
                                            <p className="text-lg font-black text-slate-800">+ ₹{(formData.leaveEncashment + formData.gratuity + formData.bonus).toLocaleString()}</p>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <p className="text-sm font-bold text-slate-500">Total Deductions</p>
                                            <p className="text-lg font-black text-rose-500">- ₹{(formData.deductions).toLocaleString()}</p>
                                        </div>
                                        <div className="pt-6 border-t border-slate-200 flex items-center justify-between">
                                            <p className="text-base font-black text-slate-800 uppercase tracking-widest">Net Settlement Amount</p>
                                            <p className="text-3xl font-black text-primary">₹{netPayable.toLocaleString()}</p>
                                        </div>
                                    </div>
                                    
                                    <div className="flex gap-4">
                                        <button onClick={handleBack} className="flex-1 py-4 border-2 border-slate-100 text-slate-400 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-slate-50 transition-all">
                                            <ChevronLeft size={18} /> Back
                                        </button>
                                        <button 
                                            onClick={handleSubmit} 
                                            disabled={isLoading || status === "success"}
                                            className={`flex-[2] py-4 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-3 transition-all ${
                                                status === "success" ? "bg-emerald-500 text-white" : "bg-primary text-white hover:shadow-xl active:scale-95"
                                            }`}
                                        >
                                            {isLoading ? <RefreshCw className="animate-spin" size={20} /> : 
                                             status === "success" ? <>Settlement Finalized <CheckCircle2 size={18} /></> : 
                                             <>Confirm Termination <FileCheck size={18} /></>}
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
