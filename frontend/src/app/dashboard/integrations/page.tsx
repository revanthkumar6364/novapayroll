"use client";

import { motion } from "framer-motion";
import DashboardLayout from "@/components/layout/DashboardLayout";
import {
    Puzzle, ArrowUpRight, Search,
    CheckCircle2, Plus, Zap,
    Settings, ShieldCheck, CreditCard,
    MessageSquare, Landmark, Users, Calendar, Fingerprint, Activity, Webhook, Briefcase,
    Calculator, HeartPulse
} from "lucide-react";

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
    return (
        <DashboardLayout>
            <div className="space-y-8 pb-12">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <h1 className="text-3xl font-black text-[#0F172A] mb-2">Integrations & Ecosystem</h1>
                        <p className="text-[#475569] font-medium">Connect NovaPayroll with your enterprise stack to automate everything.</p>
                    </div>
                    <button className="bg-primary text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all flex items-center gap-2 active:scale-95 btn-elite">
                        <Plus size={18} /> Browse App Store
                    </button>
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
