"use client";

import { motion } from "framer-motion";
import DashboardLayout from "@/components/layout/DashboardLayout";
import {
    Puzzle, ArrowUpRight, Search,
    CheckCircle2, Plus, Zap,
    Settings, ShieldCheck, CreditCard,
    MessageSquare, Landmark, Users, Calendar, Fingerprint, Activity, Webhook, Briefcase,
    Calculator, HeartPulse, ArrowLeft
} from "lucide-react";
import { useRouter } from "next/navigation";

const INTEGRATIONS = [
    { name: "Tally Prime", category: "Accounting", status: "Connected", desc: "Automate JV posting and sync payroll expenses directly to your ledger.", Icon: Briefcase },
    { name: "QuickBooks", category: "Accounting", status: "Available", desc: "Export salary journals and tax compliance data to QuickBooks Online.", Icon: Calculator },
    { name: "Plum Insurance", category: "Benefits", status: "Active", desc: "Real-time sync of employee additions and deletions for health insurance.", Icon: HeartPulse },
    { name: "Pazcare", category: "Benefits", status: "Disconnected", desc: "Manage corporate health wellness and active policy tracking.", Icon: Activity },
    { name: "eSSL Biometrics", category: "Hardware", status: "Active", desc: "Directly fetch punch-in/out logs from eSSL devices for attendance.", Icon: Fingerprint },
    { name: "Mantra Devices", category: "Hardware", status: "Disconnected", desc: "AADHAAR enabled biometric attendance system integration.", Icon: ShieldCheck },
    { name: "Custom Webhooks", category: "API", status: "Configured", desc: "Fire event payloads on salary processing, employee joining, etc.", Icon: Webhook },
    { name: "Slack", category: "Communication", status: "Connected", desc: "Notify employees about payslips, leaves, and reimbursement approvals.", Icon: MessageSquare },
];

export default function IntegrationsPage() {
    const router = useRouter();
    return (
        <DashboardLayout>
            <div className="space-y-8 pb-12 animate-in fade-in duration-500">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                        <button 
                            onClick={() => router.push('/dashboard')}
                            className="p-2 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-primary hover:border-primary transition-all shadow-sm group"
                        >
                            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                        </button>
                        <div>
                            <h1 className="text-3xl font-black text-[#0F172A] mb-1 tracking-tight">Integrations & Ecosystem</h1>
                            <p className="text-[#475569] font-medium">Connect NovaPayroll with your enterprise stack to automate everything.</p>
                        </div>
                    </div>
                    <button className="bg-primary text-white px-8 py-3.5 rounded-2xl font-black uppercase tracking-wider text-sm shadow-xl shadow-primary/20 hover:bg-primary/90 transition-all flex items-center gap-2 active:scale-95 border-b-4 border-slate-800 active:border-b-0 active:translate-y-1">
                        <Plus size={18} /> Browse App Store
                    </button>
                </div>

                {/* Social Nerve-Center Component */}
                <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-10 -mt-10"></div>
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-8 relative z-10">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[#245DF1] text-[10px] font-black uppercase tracking-widest mb-3 border border-blue-100">
                                <Zap size={12} fill="currentColor" /> Simulated Automation
                            </div>
                            <h3 className="text-2xl font-black text-[#0F172A] mb-2 flex items-center gap-3">
                                Social Nerve-Center
                            </h3>
                            <p className="text-[#64748B] font-medium max-w-lg">
                                Automate employee communications. Send instant WhatsApp & Slack updates for salary credits, compliance milestones, and approvals.
                            </p>
                        </div>
                        <div className="flex flex-col sm:flex-row items-center gap-4">
                             {/* WhatsApp Mock */}
                             <motion.div 
                                initial={{ x: 20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ duration: 0.5 }}
                                className="bg-[#25D366]/5 border border-[#25D366]/10 p-5 rounded-2xl flex items-center gap-4 w-full sm:w-auto hover:bg-[#25D366]/10 transition-colors"
                             >
                                <div className="w-12 h-12 bg-[#25D366] rounded-xl flex items-center justify-center text-white shadow-lg shadow-[#25D366]/20">
                                    <MessageSquare size={24} />
                                </div>
                                <div>
                                   <div className="flex items-center gap-2">
                                       <p className="text-[10px] font-black text-[#25D366] uppercase tracking-wider">WhatsApp Live</p>
                                       <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-ping"></span>
                                   </div>
                                   <p className="text-[14px] font-bold text-slate-800 tracking-tight">Salary Credited: ₹84,200</p>
                                </div>
                             </motion.div>
                             {/* Slack Mock */}
                             <motion.div 
                                initial={{ x: 20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                className="bg-[#4A154B]/5 border border-[#4A154B]/10 p-5 rounded-2xl flex items-center gap-4 w-full sm:w-auto hover:bg-[#4A154B]/10 transition-colors"
                             >
                                <div className="w-12 h-12 bg-[#4A154B] rounded-xl flex items-center justify-center text-white shadow-lg shadow-[#4A154B]/20">
                                    <Zap size={24} />
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                       <p className="text-[10px] font-black text-[#4A154B] uppercase tracking-wider">Slack Alert</p>
                                       <span className="w-1.5 h-1.5 rounded-full bg-[#4A154B] animate-ping"></span>
                                   </div>
                                   <p className="text-[14px] font-bold text-slate-800 tracking-tight">Leave Approved: 2 Days</p>
                                </div>
                             </motion.div>
                        </div>
                    </div>
                </div>

                {/* Featured Integration */}
                <div className="premium-card bg-slate-900 p-12 relative overflow-hidden text-white shadow-2xl border-0 rounded-[2rem]">
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] -mr-20 -mt-20 pointer-events-none"></div>
                    <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
                        <div className="w-32 h-32 bg-white/5 rounded-[2rem] p-6 shadow-2xl shrink-0 flex items-center justify-center border border-white/10 backdrop-blur-md group-hover:bg-white/10 transition-colors">
                            <Landmark size={64} className="text-primary fill-primary/20" />
                        </div>
                        <div className="flex-grow text-center md:text-left">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-primary/20 text-primary text-[10px] font-black uppercase tracking-widest mb-4 border border-primary/20">
                                <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                                Top Pick
                            </div>
                            <h2 className="text-4xl font-black mb-4 tracking-tight">ICICI Connected Banking API</h2>
                            <p className="text-[#64748B] font-medium max-w-xl text-lg leading-relaxed">Experience 1-click salary disbursement. Bind your corporate account for automated payouts and real-time transaction reconciliation.</p>
                        </div>
                        <button className="bg-primary text-white px-10 py-5 rounded-2xl font-black text-base hover:bg-primary/90 transition-all active:scale-95 btn-elite shadow-premium">
                            Connect Bank
                        </button>
                    </div>
                </div>

                {/* Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {INTEGRATIONS.map((app, i) => (
                        <motion.div
                            key={app.name}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                            className="premium-card p-8 bg-white border-[#F1F5F9] hover:border-primary/20 transition-all group cursor-pointer hover:-translate-y-1 shadow-sm hover:shadow-xl"
                        >
                            <div className="flex items-center justify-between mb-8">
                                <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-[#F1F5F9] p-3 flex items-center justify-center text-[#64748B] group-hover:text-primary group-hover:bg-primary/5 transition-colors group-hover:scale-110">
                                    <app.Icon size={32} />
                                </div>
                                <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                                    app.status === 'Active' || app.status === 'Connected' || app.status === 'Configured' 
                                    ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' 
                                    : 'bg-slate-50 text-[#64748B] border border-slate-200'
                                }`}>
                                    {app.status}
                                </div>
                            </div>
                            <h3 className="text-xl font-black text-[#0F172A] mb-3 group-hover:text-primary transition-colors">{app.name}</h3>
                            <p className="text-sm font-medium text-[#475569] leading-relaxed min-h-[4rem]">{app.desc}</p>

                            <div className="pt-8 flex items-center justify-between border-t border-slate-50 mt-8">
                                <span className="text-[10px] font-black uppercase tracking-widest text-[#CBD5E1] group-hover:text-[#64748B]">{app.category}</span>
                                <button className="text-[#64748B] group-hover:text-primary transition-colors bg-slate-50 group-hover:bg-primary/5 p-2 rounded-xl">
                                    <Settings size={18} />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </DashboardLayout>
    );
}
