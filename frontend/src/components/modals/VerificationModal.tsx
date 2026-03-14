"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ShieldCheck, Landmark, CheckCircle2, Loader2, Building2, CreditCard, Banknote, Search, ShieldAlert, Cpu } from "lucide-react";
import { useState, useEffect } from "react";

export type VerificationMode = 'pan' | 'bank';

interface VerificationModalProps {
    isOpen: boolean;
    mode: VerificationMode;
    onClose: () => void;
    onVerified: (data: any) => void;
}

type VerificationState = 'idle' | 'validating' | 'processing' | 'success';

export default function VerificationModal({ isOpen, mode, onClose, onVerified }: VerificationModalProps) {
    const [state, setState] = useState<VerificationState>('idle');
    const [formData, setFormData] = useState({
        pan: "",
        accountNumber: "",
        ifsc: "",
        accountName: ""
    });
    const [progress, setProgress] = useState(0);
    const [statusMessage, setStatusMessage] = useState("");

    const handleVerify = async () => {
        setState('validating');
        setProgress(0);
        
        if (mode === 'pan') {
            await simulatePanVerification();
        } else {
            await simulateBankVerification();
        }
    };

    const simulatePanVerification = async () => {
        setStatusMessage("Connecting to NSDL Vault...");
        await wait(800);
        setProgress(30);
        
        setStatusMessage("Extracting identity markers...");
        await wait(1000);
        setProgress(70);
        
        setStatusMessage("Validating PAN with ITD records...");
        await wait(1200);
        setProgress(100);
        
        setState('success');
    };

    const simulateBankVerification = async () => {
        setStatusMessage("Initiating Penny Drop Protocol...");
        await wait(800);
        setProgress(30);
        
        setStatusMessage("Transferring ₹1.00 to account...");
        await wait(1500);
        setProgress(60);
        
        setStatusMessage("Awaiting bank confirmation...");
        await wait(1200);
        setProgress(90);
        
        setStatusMessage("Account activity verified.");
        await wait(500);
        setProgress(100);
        
        setState('success');
    };

    const wait = (ms: number) => new Promise(r => setTimeout(r, ms));

    useEffect(() => {
        if (!isOpen) {
            setState('idle');
            setProgress(0);
            setStatusMessage("");
        }
    }, [isOpen]);

    const handleFinalize = () => {
        onVerified({
            verifiedAt: new Date().toISOString(),
            mode,
            id: mode === 'pan' ? formData.pan : formData.accountNumber
        });
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={state !== 'validating' ? onClose : undefined}
                        className="absolute inset-0 bg-[#012652]/40 backdrop-blur-sm"
                    />
                    
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-[#E2E8F0]"
                    >
                        {/* Header */}
                        <div className="px-8 py-6 border-b border-[#E2E8F0] flex items-center justify-between bg-[#F8FAFC]">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-[#0D94FB]/10 rounded-lg text-[#0D94FB]">
                                    {mode === 'pan' ? <ShieldCheck size={20} /> : <Landmark size={20} />}
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-[#012652]">
                                        {mode === 'pan' ? "Verify Organization PAN" : "Connect Bank Account"}
                                    </h3>
                                    <p className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Verification Phase</p>
                                </div>
                            </div>
                            {state !== 'validating' && (
                                <button onClick={onClose} className="p-2 hover:bg-white rounded-lg text-[#94A3B8] transition-all border border-transparent hover:border-[#E2E8F0]">
                                    <X size={18} />
                                </button>
                            )}
                        </div>

                        {/* Body */}
                        <div className="p-8">
                            {state === 'idle' && (
                                <div className="space-y-6 animate-in fade-in duration-500">
                                    <div className="p-4 bg-blue-50 border border-blue-100 rounded-xl flex gap-4">
                                        <div className="shrink-0 w-10 h-10 bg-white rounded-lg flex items-center justify-center text-[#0D94FB] shadow-sm">
                                            <Cpu size={20} />
                                        </div>
                                        <p className="text-[12px] text-[#012652] font-medium leading-relaxed">
                                            {mode === 'pan' 
                                                ? "Our system will perform a real-time handshake with NSDL servers to validate your organization's legal identity."
                                                : "We utilize the 'Penny Drop' mechanism. We will transfer ₹1.00 to your account to verify its activity and name match."}
                                        </p>
                                    </div>

                                    <div className="space-y-4">
                                        {mode === 'pan' ? (
                                            <div className="space-y-2">
                                                <label className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider">Commercial PAN Number</label>
                                                <input 
                                                    type="text" 
                                                    placeholder="e.g. ABCDE1234F"
                                                    value={formData.pan}
                                                    onChange={e => setFormData({...formData, pan: e.target.value.toUpperCase()})}
                                                    className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg px-4 py-3.5 text-sm font-bold text-[#012652] focus:ring-2 focus:ring-[#0D94FB]/10 focus:outline-none transition-all"
                                                />
                                            </div>
                                        ) : (
                                            <div className="grid grid-cols-1 gap-4">
                                                <div className="space-y-2">
                                                    <label className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider">Account Number</label>
                                                    <input 
                                                        type="text" 
                                                        placeholder="Enter Corporate Account No."
                                                        value={formData.accountNumber}
                                                        onChange={e => setFormData({...formData, accountNumber: e.target.value})}
                                                        className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg px-4 py-3.5 text-sm font-bold text-[#012652] focus:ring-2 focus:ring-[#0D94FB]/10 focus:outline-none transition-all"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider">IFSC Code</label>
                                                    <input 
                                                        type="text" 
                                                        placeholder="e.g. HDFC0001234"
                                                        value={formData.ifsc}
                                                        onChange={e => setFormData({...formData, ifsc: e.target.value.toUpperCase()})}
                                                        className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg px-4 py-3.5 text-sm font-bold text-[#012652] focus:ring-2 focus:ring-[#0D94FB]/10 focus:outline-none transition-all"
                                                    />
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    <button 
                                        onClick={handleVerify}
                                        className="w-full bg-[#0D94FB] text-white py-4 rounded-xl font-bold text-[12px] uppercase tracking-[0.2em] shadow-lg shadow-[#0D94FB]/20 hover:bg-[#012652] transition-all flex items-center justify-center gap-3"
                                    >
                                        <Search size={18} />
                                        Initiate Verification
                                    </button>
                                </div>
                            )}

                            {state === 'validating' && (
                                <div className="py-10 space-y-8 text-center animate-in fade-in zoom-in-95 duration-500">
                                    <div className="relative w-24 h-24 mx-auto">
                                        <svg className="w-full h-full -rotate-90">
                                            <circle
                                                cx="48"
                                                cy="48"
                                                r="44"
                                                stroke="currentColor"
                                                strokeWidth="8"
                                                fill="transparent"
                                                className="text-[#E2E8F0]"
                                            />
                                            <motion.circle
                                                cx="48"
                                                cy="48"
                                                r="44"
                                                stroke="currentColor"
                                                strokeWidth="8"
                                                fill="transparent"
                                                strokeDasharray="276"
                                                initial={{ strokeDashoffset: 276 }}
                                                animate={{ strokeDashoffset: 276 - (276 * progress) / 100 }}
                                                className="text-[#0D94FB]"
                                            />
                                        </svg>
                                        <div className="absolute inset-0 flex items-center justify-center flex-col">
                                            <span className="text-xl font-bold text-[#012652]">{progress}%</span>
                                        </div>
                                    </div>
                                    
                                    <div className="space-y-2">
                                        <p className="text-sm font-bold text-[#012652]">{statusMessage}</p>
                                        <div className="flex items-center justify-center gap-2">
                                            <Loader2 size={12} className="animate-spin text-[#0D94FB]" />
                                            <p className="text-[10px] font-bold text-[#64748B] uppercase tracking-[0.2em]">Compliance Check Active</p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {state === 'success' && (
                                <div className="py-10 space-y-8 text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
                                    <div className="w-20 h-20 bg-[#10B981]/10 rounded-full flex items-center justify-center mx-auto text-[#10B981]">
                                        <CheckCircle2 size={48} />
                                    </div>
                                    
                                    <div className="space-y-2">
                                        <h4 className="text-xl font-bold text-[#012652]">Verification Successful</h4>
                                        <p className="text-sm text-[#64748B] font-medium max-w-[280px] mx-auto">
                                            {mode === 'pan' 
                                                ? "PAN markers matched with NSDL database. Organization identity verified."
                                                : "Penny drop transfer of ₹1 successfully confirmed by bank gateway."}
                                        </p>
                                    </div>

                                    <div className="p-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-left space-y-3">
                                        <div className="flex justify-between items-center">
                                            <span className="text-[10px] font-bold text-[#64748B] uppercase">Reference ID</span>
                                            <span className="text-[10px] font-bold text-[#012652]">VRF-{Math.random().toString(36).substr(2, 9).toUpperCase()}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-[10px] font-bold text-[#64748B] uppercase">Timestamp</span>
                                            <span className="text-[10px] font-bold text-[#012652]">{new Date().toLocaleString()}</span>
                                        </div>
                                    </div>

                                    <button 
                                        onClick={handleFinalize}
                                        className="w-full bg-[#012652] text-white py-4 rounded-xl font-bold text-[12px] uppercase tracking-[0.2em] shadow-lg hover:bg-[#0D94FB] transition-all"
                                    >
                                        Finalize & Continue
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Footer Security Badge */}
                        <div className="px-8 py-4 bg-[#F8FAFC] border-t border-[#E2E8F0] flex items-center justify-center gap-3">
                            <ShieldAlert size={14} className="text-[#64748B]" />
                            <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-widest">End-to-End Encrypted Compliance Node</span>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
