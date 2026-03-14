"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, Info, CheckCircle2 } from "lucide-react";
import { useState } from "react";

interface PayrollDateModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (date: number) => void;
}

export default function PayrollDateModal({ isOpen, onClose, onSave }: PayrollDateModalProps) {
    const [selectedDate, setSelectedDate] = useState<number | null>(null);
    const [isSaving, setIsSaving] = useState(false);

    const handleSave = async () => {
        if (selectedDate === null) return;
        setIsSaving(true);
        // Simulate API call for now, parent will handle real sync
        await new Promise(r => setTimeout(r, 1000));
        onSave(selectedDate);
        setIsSaving(false);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-[#012652]/40 backdrop-blur-sm"
                    />
                    
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative w-full max-w-lg bg-white rounded-xl shadow-2xl overflow-hidden border border-[#E2E8F0]"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between px-8 py-6 border-b border-[#E2E8F0]">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-lg bg-[#0D94FB]/10 flex items-center justify-center text-[#0D94FB]">
                                    <Calendar size={20} />
                                </div>
                                <h2 className="text-xl font-bold text-[#012652]">Set Payroll Date</h2>
                            </div>
                            <button 
                                onClick={onClose}
                                className="p-2 hover:bg-[#F8FAFC] rounded-lg text-[#94A3B8] transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="p-8 space-y-8">
                            <div className="bg-[#F8FAFC] border border-[#E2E8F0] p-4 rounded-lg flex gap-3">
                                <Info size={18} className="text-[#0D94FB] shrink-0 mt-0.5" />
                                <p className="text-sm text-[#64748B] leading-relaxed">
                                    The payroll date is the day of the month when salaries are disbursed to employees. Most organizations in India prefer the <span className="text-[#012652] font-bold">1st or 30th</span>.
                                </p>
                            </div>

                            <div className="space-y-4">
                                <label className="text-[11px] font-bold text-[#64748B] uppercase tracking-widest">
                                    Select Day of Month
                                </label>
                                <div className="grid grid-cols-7 gap-2">
                                    {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                                        <button
                                            key={day}
                                            onClick={() => setSelectedDate(day)}
                                            className={`h-10 rounded-lg text-sm font-bold transition-all border ${
                                                selectedDate === day
                                                ? "bg-[#012652] text-white border-[#012652] shadow-lg shadow-[#012652]/20"
                                                : "bg-white text-[#64748B] border-[#E2E8F0] hover:border-[#0D94FB] hover:text-[#0D94FB]"
                                            }`}
                                        >
                                            {day}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="px-8 py-6 bg-[#F8FAFC] border-t border-[#E2E8F0] flex justify-end gap-4">
                            <button 
                                onClick={onClose}
                                className="px-6 py-2.5 rounded-lg text-sm font-bold text-[#64748B] hover:text-[#012652] transition-colors"
                            >
                                Cancel
                            </button>
                            <button 
                                disabled={selectedDate === null || isSaving}
                                onClick={handleSave}
                                className={`px-8 py-2.5 rounded-lg text-sm font-bold text-white shadow-lg transition-all flex items-center gap-2 ${
                                    selectedDate === null || isSaving
                                    ? "bg-[#CBD5E1] cursor-not-allowed"
                                    : "bg-[#0D94FB] hover:bg-[#012652] shadow-[#0D94FB]/20"
                                }`}
                            >
                                {isSaving ? (
                                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <CheckCircle2 size={18} />
                                )}
                                {isSaving ? "Saving..." : "Confirm Date"}
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
