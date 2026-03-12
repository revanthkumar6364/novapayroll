"use client";

import { useState } from "react";
import { Loader2, Mail, Lock, ShieldCheck, ArrowRight } from "lucide-react";
import Logo from "../../components/ui/Logo";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function LoginPage() {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api/v1'}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                const data = await res.json();
                localStorage.setItem('token', data.access_token);
                router.push("/dashboard");
            } else {
                const error = await res.json();
                alert(error.message || "Login failed");
            }
        } catch (err) {
            console.error(err);
            alert("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#F7F9FC] flex flex-col items-center justify-center p-6 selection:bg-primary/20 selection:text-primary relative overflow-hidden">
            {/* Background elements for premium feel */}
            <div className="absolute top-0 w-full h-96 bg-primary/5 [clip-path:polygon(0_0,100%_0,100%_40%,0_100%)]"></div>
            
            <div className="w-full max-w-[420px] relative z-10">
                <div className="flex justify-center mb-10">
                    <Logo size={54} variant="light" />
                </div>

                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="bg-white rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] border border-slate-100 overflow-hidden"
                >
                    <div className="p-10">
                        <div className="mb-10 text-center flex flex-col items-center">
                            <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                                <Lock size={20} className="text-[#1E293B]" />
                            </div>
                            <h1 className="text-3xl font-black text-[#0F172A] mb-2 tracking-tight">Enterprise Access</h1>
                            <p className="text-[#1E293B] font-semibold text-base">Secure authorization required.</p>
                        </div>

                        <form onSubmit={handleLogin} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-[11px] font-black uppercase tracking-[0.1em] text-[#0F172A]">Corporate Email</label>
                                <div className="relative">
                                    <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#64748B]" />
                                    <input
                                        required
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        type="email"
                                        placeholder="executive@company.com"
                                        className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-[#E2E8F0] bg-white focus:bg-white focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all font-medium text-[#0F172A]"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <label className="text-[11px] font-black uppercase tracking-[0.1em] text-[#0F172A]">Security Key</label>
                                </div>
                                <div className="relative">
                                    <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#64748B]" />
                                    <input
                                        required
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        type="password"
                                        placeholder="••••••••"
                                        className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-[#E2E8F0] bg-white focus:bg-white focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all font-medium text-[#0F172A]"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-black active:scale-[0.98] transition-all shadow-xl shadow-slate-900/20 disabled:opacity-70 disabled:active:scale-100"
                            >
                                {loading ? (
                                    <Loader2 className="animate-spin" size={20} />
                                ) : (
                                    <>
                                        Authorize Access <ArrowRight size={18} />
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                    <div className="bg-slate-50 p-6 border-t border-slate-100 text-center flex items-center justify-center gap-2 text-xs font-bold text-[#64748B]">
                        <ShieldCheck size={16} className="text-green-500" /> 
                        256-BIT ENCRYPTED SESSION
                    </div>
                </motion.div>

                <div className="mt-12 text-center text-base font-bold text-[#0F172A]">
                    Need infrastructure access? <Link href="/signup" className="text-primary font-black hover:underline underline-offset-4 decoration-2">Apply for an account</Link>
                </div>
            </div>
        </div>
    );
}
