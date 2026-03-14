"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Activity, CheckCircle2, Shield, Landmark, Users, Calendar, ArrowRight, Loader2, Cpu, UserCheck, Briefcase } from "lucide-react";
import { useState } from "react";

interface FinalActivationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onActivate: (data: any) => void;
    onboardingData: any;
    employeeCount: number;
}

export default function FinalActivationModal({ isOpen, onClose, onActivate, onboardingData, employeeCount }: FinalActivationModalProps) {
    const [isActivating, setIsActivating] = useState(false);

    const handleActivate = async () => {
        setIsActivating(true);
        // Simulate finalize activation with professional delay
        await new Promise(resolve => setTimeout(resolve, 2500));
        setIsActivating(false);
        onActivate({
            activatedAt: new Date().toISOString(),
            status: 'LIVE'
        });
    };

    const summaryItems = [
        { label: "Payroll Cycle", value: `${onboardingData?.payrollSettings?.payDate}th of month`, icon: Calendar },
        { label: "Salary Policy", value: "Active", icon: Briefcase },
        { label: "Employee Registry", value: `${employeeCount} Active`, icon: Users },
        { label: "Statutory Compliance", value: "Verified", icon: Shield },
        { label: "Corporate Bank", value: "Linked", icon: Landmark },
        { label: "Identity (PAN)", value: "Validated", icon: CheckCircle2 },
    ];

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={!isActivating ? onClose : undefined}
                        className="absolute inset-0 bg-[#012652]/40 backdrop-blur-sm"
                    />
                    
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-[#E2E8F0]"
                    >
                        {/* Header */}
                        <div className="px-8 py-6 border-b border-[#E2E8F0] flex items-center justify-between bg-[#F8FAFC]">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-[#0D94FB]/10 rounded-lg text-[#0D94FB]">
                                    <Activity size={20} />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-[#012652]">Initialize First Payroll</h3>
                                    <p className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Final Activation Phase</p>
                                </div>
                            </div>
                            {!isActivating && (
                                <button onClick={onClose} className="p-2 hover:bg-white rounded-lg text-[#94A3B8] transition-all border border-transparent hover:border-[#E2E8F0]">
                                    <X size={18} />
                                </button>
                            )}
                        </div>

                        {/* Body */}
                        <div className="p-8 space-y-8 text-center">
                            {isActivating ? (
                                <div className="py-12 space-y-6">
                                    <div className="relative w-20 h-20 mx-auto">
                                        <Loader2 className="w-full h-full text-[#0D94FB] animate-spin" strokeWidth={1.5} />
                                        <div className="absolute inset-0 flex items-center justify-center text-[#012652]">
                                            <Cpu size={32} />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <h4 className="text-xl font-bold text-[#012652]">Synchronizing Ecosystem...</h4>
                                        <p className="text-xs font-bold text-[#64748B] uppercase tracking-widest">Deploying Compliance & Payroll Engine</p>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <div className="space-y-3">
                                        <h4 className="text-2xl font-bold text-[#012652]">Ready for Launch</h4>
                                        <p className="text-sm text-[#64748B] font-medium max-w-lg mx-auto leading-relaxed">
                                            All 6 configuration markers have been verified. Activating Step 7 will initialize your first live payroll register and officially bridge your organization to production.
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                        {summaryItems.map((item, i) => (
                                            <div key={i} className="p-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-left space-y-1 hover:border-[#0D94FB]/30 transition-all">
                                                <item.icon size={14} className="text-[#0D94FB] mb-1" />
                                                <p className="text-[9px] font-bold text-[#64748B] uppercase tracking-wider">{item.label}</p>
                                                <p className="text-[12px] font-bold text-[#012652]">{item.value}</p>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="p-6 bg-[#10B981]/5 border border-[#10B981]/20 rounded-2xl flex items-center gap-5 text-left group">
                                        <div className="w-12 h-12 bg-[#10B981]/10 rounded-full flex items-center justify-center text-[#10B981] group-hover:scale-110 transition-transform">
                                            <UserCheck size={24} />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-[#012652]">Registry Guard Active</p>
                                            <p className="text-[11px] text-[#64748B] font-medium leading-normal">
                                                By activating, you confirm the employee list and salary structures are legally accurate for the current disbursement cycle.
                                            </p>
                                        </div>
                                    </div>

                                    <button 
                                        onClick={handleActivate}
                                        className="w-full bg-[#0D94FB] text-white py-4 rounded-xl font-bold text-[13px] uppercase tracking-[0.2em] shadow-lg shadow-[#0D94FB]/20 hover:bg-[#012652] transition-all flex items-center justify-center gap-3 group"
                                    >
                                        Initialize & Go Live
                                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </>
                            )}
                        </div>

                        {/* Footer Security Badge */}
                        <div className="px-8 py-4 bg-[#F8FAFC] border-t border-[#E2E8F0] flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <Shield size={14} className="text-[#64748B]" />
                                <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-widest">Enterprise Activation Protocol</span>
                            </div>
                            <span className="text-[10px] font-bold text-[#CBD5E1]">v1.0.4-LOCKED</span>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
