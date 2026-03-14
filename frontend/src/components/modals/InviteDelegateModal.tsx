"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, UserPlus, Shield, Mail, ArrowRight, Loader2, CheckCircle2, Lock } from "lucide-react";
import { useState } from "react";

interface InviteDelegateModalProps {
    isOpen: boolean;
    onClose: () => void;
    onInvite: (email: string, role: string) => void;
}

export default function InviteDelegateModal({ isOpen, onClose, onInvite }: InviteDelegateModalProps) {
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("CA");
    const [isInviting, setIsInviting] = useState(false);
    const [isSent, setIsSent] = useState(false);

    const handleInvite = async () => {
        if (!email) return;
        setIsInviting(true);
        // Simulate secure invite generation
        await new Promise(resolve => setTimeout(resolve, 1800));
        setIsInviting(false);
        setIsSent(true);
        setTimeout(() => {
            onInvite(email, role);
            setIsSent(false);
            setEmail("");
            onClose();
        }, 1500);
    };

    const roles = [
        { id: "CA", title: "Chartered Accountant", desc: "Full access to statutory filings and tax registers." },
        { id: "FIN", title: "Finance Executive", desc: "Manage payroll disbursement and bank reconciliations." },
    ];

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={!isInviting ? onClose : undefined}
                        className="absolute inset-0 bg-[#012652]/40 backdrop-blur-sm"
                    />
                    
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden border border-[#E2E8F0]"
                    >
                        {/* Header */}
                        <div className="px-6 py-5 border-b border-[#E2E8F0] flex items-center justify-between bg-[#F8FAFC]">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-[#0D94FB]/10 rounded-lg text-[#0D94FB]">
                                    <UserPlus size={18} />
                                </div>
                                <div>
                                    <h3 className="text-sm font-bold text-[#012652]">Invite Financial Delegate</h3>
                                    <p className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Secure Access Provisioning</p>
                                </div>
                            </div>
                            <button onClick={onClose} className="p-2 hover:bg-white rounded-lg text-[#94A3B8] transition-all border border-transparent hover:border-[#E2E8F0]">
                                <X size={16} />
                            </button>
                        </div>

                        <div className="p-6 space-y-6">
                            {isSent ? (
                                <div className="py-12 text-center space-y-4">
                                    <div className="w-16 h-16 bg-[#10B981]/10 rounded-full flex items-center justify-center text-[#10B981] mx-auto">
                                        <CheckCircle2 size={32} />
                                    </div>
                                    <div className="space-y-1">
                                        <h4 className="text-lg font-bold text-[#012652]">Invitation Dispatched</h4>
                                        <p className="text-sm text-[#64748B] font-medium leading-relaxed">
                                            A secure access link has been sent to <span className="text-[#012652] font-bold">{email}</span>.
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <div className="space-y-4">
                                        <div className="space-y-1.5">
                                            <label className="text-[10px] font-bold text-[#64748B] uppercase tracking-widest pl-1">Email Address</label>
                                            <div className="relative">
                                                <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
                                                <input 
                                                    type="email"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    placeholder="accountant@company.com"
                                                    className="w-full pl-11 pr-4 py-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-sm font-medium focus:ring-2 focus:ring-[#0D94FB]/20 focus:border-[#0D94FB] outline-none transition-all"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-3">
                                            <label className="text-[10px] font-bold text-[#64748B] uppercase tracking-widest pl-1">Target Permission Set</label>
                                            <div className="space-y-2">
                                                {roles.map((r) => (
                                                    <div 
                                                        key={r.id}
                                                        onClick={() => setRole(r.id)}
                                                        className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex items-start gap-4 ${
                                                            role === r.id 
                                                            ? "bg-[#0D94FB]/5 border-[#0D94FB]" 
                                                            : "bg-white border-[#E2E8F0] hover:border-[#CBD5E1]"
                                                        }`}
                                                    >
                                                        <div className={`mt-1 w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                                                            role === r.id ? "border-[#0D94FB] bg-[#0D94FB]" : "border-[#CBD5E1]"
                                                        }`}>
                                                            {role === r.id && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                                                        </div>
                                                        <div className="space-y-0.5">
                                                            <p className="text-sm font-bold text-[#012652]">{r.title}</p>
                                                            <p className="text-[11px] text-[#64748B] font-medium leading-normal">{r.desc}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl flex gap-3">
                                        <Shield size={16} className="text-[#64748B] shrink-0" />
                                        <p className="text-[10px] text-[#64748B] leading-normal font-medium">
                                            By inviting a delegate, you grant them access to PII and corporate banking details relevant to their role. This action is recorded in the <span className="font-bold text-[#012652]">Audit Shield</span> log.
                                        </p>
                                    </div>

                                    <button 
                                        disabled={!email || isInviting}
                                        onClick={handleInvite}
                                        className="w-full bg-[#0D94FB] text-white py-4 rounded-xl font-bold text-xs uppercase tracking-[0.2em] shadow-lg shadow-[#0D94FB]/20 hover:bg-[#012652] disabled:opacity-50 transition-all flex items-center justify-center gap-3 group"
                                    >
                                        {isInviting ? (
                                            <>
                                                <Loader2 size={16} className="animate-spin" />
                                                Provisioning Access...
                                            </>
                                        ) : (
                                            <>
                                                Send Invitation
                                                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                            </>
                                        )}
                                    </button>
                                </>
                            )}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
