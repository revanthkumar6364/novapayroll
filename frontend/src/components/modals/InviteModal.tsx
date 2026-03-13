"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, Shield, ArrowRight, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { useState } from "react";

interface InviteModalProps {
    isOpen: boolean;
    onClose: () => void;
    onInvite: (email: string, role: string) => Promise<void>;
}

export default function InviteModal({ isOpen, onClose, onInvite }: InviteModalProps) {
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("ADMIN_HR");
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        try {
            await onInvite(email, role);
            setSuccess(true);
            setTimeout(() => {
                setSuccess(false);
                setEmail("");
                onClose();
            }, 2000);
        } catch (err: any) {
            setError(err.message || "Failed to send invitation");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-[#0F172A]/80 backdrop-blur-sm"
                    />
                    
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative w-full max-w-lg bg-white rounded-[32px] shadow-2xl overflow-hidden border border-slate-100"
                    >
                        {success ? (
                            <div className="p-12 text-center space-y-6">
                                <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                                    <CheckCircle2 size={40} />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-black text-[#0F172A]">Invitation Sent!</h3>
                                    <p className="text-[#64748B] font-medium mt-2">An invitation has been sent to {email}.</p>
                                </div>
                            </div>
                        ) : (
                            <div className="p-8">
                                <div className="flex items-center justify-between mb-8">
                                    <div className="flex items-center gap-4">
                                        <div className="p-3 bg-primary/10 rounded-xl">
                                            <Shield className="text-primary" size={24} />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-black text-[#0F172A]">Invite Team Member</h3>
                                            <p className="text-[#64748B] text-xs font-medium">Add a new administrator to your workspace.</p>
                                        </div>
                                    </div>
                                    <button onClick={onClose} className="p-2 hover:bg-slate-50 rounded-full transition-all text-[#64748B]">
                                        <X size={20} />
                                    </button>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-[#64748B] ml-1">Email Address</label>
                                        <div className="relative">
                                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                            <input 
                                                required
                                                type="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                placeholder="colleague@company.com"
                                                className="w-full bg-slate-50 border border-slate-100 p-4 pl-12 rounded-2xl text-sm font-bold text-[#0F172A] outline-none focus:border-primary/30 focus:ring-4 focus:ring-primary/5 transition-all"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-[#64748B] ml-1">Assigned Role</label>
                                        <div className="grid md:grid-cols-2 gap-3">
                                            {[
                                                { id: "ADMIN_HR", label: "HR Admin", desc: "Manage people & docs" },
                                                { id: "ADMIN_FINANCE", label: "Finance Admin", desc: "Manage payroll & treasury" },
                                                { id: "EMPLOYEE", label: "Employee", desc: "Self-service access" },
                                            ].map((r) => (
                                                <button
                                                    key={r.id}
                                                    type="button"
                                                    onClick={() => setRole(r.id)}
                                                    className={`p-4 rounded-2xl border-2 text-left transition-all ${role === r.id ? "bg-primary/5 border-primary shadow-sm" : "border-slate-50 bg-slate-50 hover:border-slate-200"}`}
                                                >
                                                    <p className={`text-sm font-black ${role === r.id ? "text-primary" : "text-[#0F172A]"}`}>{r.label}</p>
                                                    <p className="text-[10px] text-[#64748B] font-medium mt-1">{r.desc}</p>
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {error && (
                                        <div className="p-4 bg-red-50 rounded-xl flex items-center gap-3 text-red-600 text-xs font-bold border border-red-100">
                                            <AlertCircle size={16} />
                                            {error}
                                        </div>
                                    )}

                                    <button 
                                        type="submit"
                                        disabled={isLoading}
                                        className="w-full py-5 bg-primary text-white rounded-2xl font-black text-sm hover:shadow-xl hover:shadow-primary/20 transition-all disabled:opacity-50 flex items-center justify-center gap-3"
                                    >
                                        {isLoading ? <Loader2 className="animate-spin" size={20} /> : <>Send Invitation <ArrowRight size={18} /></>}
                                    </button>
                                </form>
                            </div>
                        )}
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
