"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Loader2, Mail, Lock, User, Building, Phone, Users as UsersIcon, Briefcase, ChevronRight, CheckCircle2, ShieldCheck, Zap } from "lucide-react";
import Logo from "../../components/ui/Logo";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function SignupPage() {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        orgName: "",
        password: "",
        phone: "",
        orgSize: "1-10",
        title: "Founder/CEO"
    });
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api/v1'}/auth/signup`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                // Request OTP for the phone number
                await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/auth/otp/request`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ destination: formData.phone, channel: 'phone' }),
                });
                router.push(`/signup/verify?destination=${encodeURIComponent(formData.phone)}`);
            } else {
                const error = await res.json();
                alert(error.message || "Signup failed");
            }
        } catch (err) {
            console.error(err);
            alert("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen grid lg:grid-cols-2">
            {/* Visual Side */}
            {/* Visual Side */}
            <div className="hidden lg:flex flex-col justify-between bg-primary text-primary-foreground p-16 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/10 rounded-full blur-[140px] -mr-80 -mt-80"></div>
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#475569]/20 rounded-full blur-[140px] -ml-80 -mb-80"></div>

                <div className="relative z-10">
                    <Logo variant="dark" size={48} />
                </div>

                <div className="relative z-10 max-w-md mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-12"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 border border-white/30 text-xs font-black mb-8 tracking-widest uppercase text-white backdrop-blur-sm">
                            <CheckCircle2 size={14} className="text-white" />
                            <span>Premium HR Experience</span>
                        </div>
                        <h2 className="text-5xl font-black mb-8 leading-tight text-white drop-shadow-sm">
                            Build Your <span className="text-white italic opacity-100">High-Performance</span> Team.
                        </h2>
                    </motion.div>

                    <ul className="space-y-8 mb-16">
                        {[
                            "Automated Compliance (PF, ESI, TDS)",
                            "Instant Salary Payouts via API",
                            "State-of-the-Art Employee Portal"
                        ].map((item, i) => (
                            <motion.li
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 + (i * 0.1) }}
                                key={i}
                                className="flex items-center gap-6 text-primary-foreground/90 font-medium"
                            >
                                <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center text-white flex-shrink-0 backdrop-blur-sm shadow-sm">
                                    <CheckCircle2 size={18} />
                                </div>
                                <span className="text-base font-bold">{item}</span>
                            </motion.li>
                        ))}
                    </ul>
                </div>

                <div className="relative z-10 flex justify-center gap-8 text-primary-foreground/60 text-xs font-bold uppercase tracking-widest">
                    <div className="flex items-center gap-2"><ShieldCheck size={14} /> CERTIFIED SECURE</div>
                    <div className="flex items-center gap-2"><UsersIcon size={14} /> 1M+ EMPLOYEES PAID</div>
                </div>
            </div>

            {/* Form Side */}
            <div className="flex flex-col justify-center p-8 md:p-20 bg-white relative">
                <div className="lg:hidden absolute top-8 left-8">
                    <Logo />
                </div>

                <div className="max-w-xl w-full mx-auto">
                    <div className="mb-12">
                        <h1 className="text-4xl font-black mb-3">Get Started</h1>
                        <p className="text-muted-foreground font-medium">Join 10,000+ companies using NovaPayroll.</p>
                    </div>

                    <form onSubmit={handleSignup} className="space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[13px] font-black uppercase tracking-wider text-[#0F172A]">Full Name</label>
                                <div className="relative">
                                    <User size={18} className="absolute left-4 top-4 text-[#64748B]" />
                                    <input
                                        required
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        type="text"
                                        placeholder="Full Name"
                                        className="w-full pl-12 pr-4 py-4 rounded-xl border border-[#E2E8F0] bg-white focus:bg-white focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all font-semibold text-[#0F172A]"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[13px] font-black uppercase tracking-wider text-[#0F172A]">Work Email</label>
                                <div className="relative">
                                    <Mail size={18} className="absolute left-4 top-4 text-[#64748B]" />
                                    <input
                                        required
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        type="email"
                                        placeholder="work@company.com"
                                        className="w-full pl-12 pr-4 py-4 rounded-xl border border-[#E2E8F0] bg-white focus:bg-white focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all font-semibold text-[#0F172A]"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[13px] font-black uppercase tracking-wider text-[#0F172A]">Company Name</label>
                                <div className="relative">
                                    <Building size={18} className="absolute left-4 top-4 text-[#64748B]" />
                                    <input
                                        required
                                        name="orgName"
                                        value={formData.orgName}
                                        onChange={handleChange}
                                        type="text"
                                        placeholder="Nova Corp"
                                        className="w-full pl-12 pr-4 py-4 rounded-xl border border-border bg-white focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all font-medium"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[13px] font-black uppercase tracking-wider text-[#0F172A]">Phone Number</label>
                                <div className="relative">
                                    <Phone size={18} className="absolute left-4 top-4 text-[#64748B]" />
                                    <input
                                        required
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        type="tel"
                                        placeholder="+91 98765 43210"
                                        className="w-full pl-12 pr-4 py-4 rounded-xl border border-border bg-white focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all font-medium"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[13px] font-black uppercase tracking-wider text-[#0F172A]">Team Size</label>
                                <div className="relative">
                                    <UsersIcon size={18} className="absolute left-4 top-4 text-[#64748B]" />
                                    <select
                                        name="orgSize"
                                        value={formData.orgSize}
                                        onChange={handleChange}
                                        className="w-full pl-12 pr-4 py-4 rounded-xl border border-border bg-white focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all appearance-none font-medium"
                                    >
                                        <option>1-10</option>
                                        <option>11-50</option>
                                        <option>51-200</option>
                                        <option>201-500</option>
                                        <option>500+</option>
                                    </select>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[13px] font-black uppercase tracking-wider text-[#0F172A]">Your Role</label>
                                <div className="relative">
                                    <Briefcase size={18} className="absolute left-4 top-4 text-[#64748B]" />
                                    <select
                                        name="title"
                                        value={formData.title}
                                        onChange={handleChange}
                                        className="w-full pl-12 pr-4 py-4 rounded-xl border border-border bg-white focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all appearance-none font-medium"
                                    >
                                        <option>Founder/CEO</option>
                                        <option>HR Manager</option>
                                        <option>Finance Manager</option>
                                        <option>Operations Manager</option>
                                        <option>Other</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[13px] font-black uppercase tracking-wider text-[#0F172A]">Create Password</label>
                            <div className="relative">
                                <Lock size={18} className="absolute left-4 top-4 text-[#64748B]" />
                                <input
                                    required
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    type="password"
                                    placeholder="••••••••"
                                    className="w-full pl-12 pr-4 py-4 rounded-xl border border-border bg-white focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all font-medium"
                                />
                            </div>
                        </div>

                        <div className="pt-6">
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-primary text-white py-5 rounded-xl font-black shadow-2xl shadow-primary/30 hover:bg-primary/90 active:scale-[0.98] transition-all flex items-center justify-center gap-3"
                            >
                                {loading ? <Loader2 className="animate-spin" size={24} /> : "Create Premium Account"}
                                {!loading && <ChevronRight size={20} />}
                            </button>
                        </div>
                    </form>

                    <p className="mt-12 text-center text-base text-[#0F172A]">
                        Already using NovaPayroll? <Link href="/login" className="text-primary font-black hover:underline underline-offset-4 decoration-2">Login now</Link>
                    </p>

                    <p className="mt-16 text-[11px] text-center text-[#64748B] font-bold uppercase tracking-widest leading-loose">
                        By signing up, you agree to our <Link href="#" className="text-primary">Terms of Service</Link> and <Link href="#" className="text-primary">Privacy Policy</Link>.
                        <br />NovaPayroll is a trademark of Nova Corp.
                    </p>
                </div>
            </div>
        </div>
    );
}
