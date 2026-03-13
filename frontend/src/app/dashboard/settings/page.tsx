"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import { 
    Shield, Settings,
    Bell, Users, Building2,
    RefreshCw, Copy, Check, ExternalLink,
    Code2, Terminal, ArrowRight, ShieldCheck
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import InviteModal from "@/components/modals/InviteModal";
import api from "@/lib/api"; // Assuming there is an api client

export default function SettingsPage() {
    const router = useRouter();
    const [copied, setCopied] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState("General");
    const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
    const [members, setMembers] = useState<any[]>([]);
    const [invites, setInvites] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const parseJwt = (token: string) => {
        try {
            return JSON.parse(atob(token.split('.')[1]));
        } catch (e) {
            return null;
        }
    };

    const fetchTeamData = async () => {
        setIsLoading(true);
        try {
            const token = localStorage.getItem('token');
            if (!token) return;
            const decoded = parseJwt(token);
            const orgId = decoded?.orgs?.[0]?.orgId; // Correct property from schema/token
            
            if (orgId) {
                const [membersData, invitesData] = await Promise.all([
                    api.get(`/org/${orgId}/members`),
                    api.get(`/invite/org/${orgId}`)
                ]);
                setMembers(membersData);
                setInvites(invitesData);
            }
        } catch (err) {
            console.error("Failed to fetch team data", err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (activeTab === "Team Members") {
            const fetchTeamData = async () => {
                setIsLoading(true);
                try {
                    const token = localStorage.getItem('token');
                    if (!token) return;
                    const decoded = parseJwt(token);
                    const orgId = decoded?.orgs?.[0]?.orgId; // Correct property from schema/token
                    
                    if (orgId) {
                        const [membersData, invitesData] = await Promise.all([
                            api.get(`/org/${orgId}/members`),
                            api.get(`/invite/org/${orgId}`)
                        ]);
                        setMembers(membersData);
                        setInvites(invitesData);
                    }
                } catch (err) {
                    console.error("Failed to fetch team data", err);
                } finally {
                    setIsLoading(false);
                }
            };
            fetchTeamData();
        }
    }, [activeTab]);

    const handleCopy = (text: string, id: string) => {
        navigator.clipboard.writeText(text);
        setCopied(id);
        setTimeout(() => setCopied(null), 2000);
    };

    const handleInvite = async (email: string, role: string) => {
        const token = localStorage.getItem('token');
        const decoded = parseJwt(token || '');
        const orgId = decoded?.orgs?.[0]?.orgId;

        if (!orgId) throw new Error("No organization ID found");

        await api.post('/invite', {
            email,
            role,
            orgId
        });
        
        fetchTeamData(); // Refresh list
    };

    return (
        <DashboardLayout>
            <div className="space-y-10">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <h1 className="text-3xl font-black text-[#0F172A] mb-2 flex items-center gap-3">
                            Settings & Developer Hub
                        </h1>
                        <p className="text-[#475569] font-medium">Manage your organization profile, security, and elite developer integrations.</p>
                    </div>
                </div>

                <div className="grid lg:grid-cols-4 gap-10">
                    {/* Sidebar Nav */}
                    <div className="lg:col-span-1 space-y-2">
                        {[
                            { label: "General", icon: Building2 },
                            { label: "Security", icon: Shield },
                            { label: "API & Webhooks", icon: Code2 },
                            { label: "Notifications", icon: Bell },
                            { label: "Team Members", icon: Users },
                        ].map((item) => (
                            <button 
                                key={item.label}
                                onClick={() => setActiveTab(item.label)}
                                className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-sm font-bold transition-all ${activeTab === item.label ? "bg-primary text-white shadow-lg shadow-primary/20" : "text-[#64748B] hover:bg-slate-50"}`}
                            >
                                <item.icon size={20} />
                                {item.label}
                            </button>
                        ))}
                    </div>

                    {/* Content */}
                    <div className="lg:col-span-3">
                        <AnimatePresence mode="wait">
                            {activeTab === "General" && (
                                <motion.div 
                                    key="general"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="space-y-8"
                                >
                                    {/* Existing General Content */}
                                    <div className="premium-card bg-[#0F172A] p-10 text-white border-none shadow-2xl relative overflow-hidden">
                                        {/* ... API & Webhooks content ... */}
                                        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] -mr-48 -mt-48 pointer-events-none"></div>
                                        <div className="relative z-10">
                                            <div className="flex items-center justify-between mb-10">
                                                <div className="flex items-center gap-4">
                                                    <div className="p-3 bg-primary/20 rounded-xl">
                                                        <Terminal className="text-primary" size={24} />
                                                    </div>
                                                    <div>
                                                        <h2 className="text-2xl font-black tracking-tight">Ecosystem Mastery</h2>
                                                        <p className="text-slate-400 text-sm font-medium italic">Developer DX & API Integrations</p>
                                                    </div>
                                                </div>
                                                <span className="px-4 py-2 bg-emerald-500/10 text-emerald-400 rounded-full text-[10px] font-black uppercase tracking-widest border border-emerald-500/20 flex items-center gap-2">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></div>
                                                    API Rails Live
                                                </span>
                                            </div>

                                            <div className="space-y-10">
                                                {/* API Keys */}
                                                <div className="space-y-6">
                                                    <h3 className="text-sm font-black uppercase tracking-widest text-slate-500">Sandbox API Credentials</h3>
                                                    <div className="grid md:grid-cols-2 gap-6">
                                                        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-4">
                                                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Client ID</p>
                                                            <div className="flex items-center justify-between bg-black/40 p-4 rounded-xl border border-white/5 group">
                                                                <code className="text-xs text-primary font-mono truncate">nova_sandbox_882x11_elite_q2</code>
                                                                <button onClick={() => handleCopy("nova_sandbox_882x11_elite_q2", "client_id")} className="text-slate-500 hover:text-white transition-colors">
                                                                    {copied === "client_id" ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
                                                                </button>
                                                            </div>
                                                        </div>
                                                        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-4">
                                                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Secret Key</p>
                                                            <div className="flex items-center justify-between bg-black/40 p-4 rounded-xl border border-white/5 group overflow-hidden">
                                                                <code className="text-xs text-primary font-mono blur-sm group-hover:blur-none transition-all">sk_test_9921_elite_x2x1121_nv</code>
                                                                <button className="text-slate-300 hover:text-primary transition-colors">
                                                                    <RefreshCw size={16} />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="p-8 rounded-2xl bg-primary/20 border border-primary/20 flex flex-col md:flex-row items-center justify-between gap-8 group">
                                                    <div className="flex items-center gap-6">
                                                        <div className="w-16 h-16 rounded-2xl bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/40 group-hover:scale-110 transition-transform">
                                                            <Code2 size={32} />
                                                        </div>
                                                        <div>
                                                            <h4 className="text-lg font-black tracking-tight">Launch Developer Docs</h4>
                                                            <p className="text-slate-400 text-sm font-medium">Explore the full SDK, integration guides, and API reference.</p>
                                                        </div>
                                                    </div>
                                                    <button 
                                                        onClick={() => router.push('/dashboard/docs')}
                                                        className="px-8 py-4 bg-white text-primary rounded-xl text-sm font-black hover:shadow-2xl transition-all flex items-center gap-3"
                                                    >
                                                        View Documentation <ArrowRight size={18} />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="premium-card bg-white p-10 border-[#F1F5F9]">
                                        <h3 className="text-lg font-black text-[#0F172A] mb-8">Organization Profile</h3>
                                        <div className="grid md:grid-cols-2 gap-8">
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black uppercase tracking-widest text-[#64748B]">Legal Name</label>
                                                <input value="Novapayroll Technologies India Pvt Ltd" className="w-full bg-slate-50 border border-slate-100 p-4 rounded-xl text-sm font-bold text-[#0F172A] outline-none" readOnly />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black uppercase tracking-widest text-[#64748B]">GSTIN (Sandbox Verified)</label>
                                                <div className="relative">
                                                    <input value="29AAAAA0000A1Z5" className="w-full bg-slate-50 border border-slate-100 p-4 rounded-xl text-sm font-bold text-[#0F172A] outline-none pl-12" readOnly />
                                                    <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-500" size={18} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {activeTab === "Team Members" && (
                                <motion.div 
                                    key="team"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="space-y-8"
                                >
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h2 className="text-2xl font-black text-[#0F172A]">Team Management</h2>
                                            <p className="text-[#64748B] text-sm font-medium mt-1">Manage your organization&apos;s administrators and specialized roles.</p>
                                        </div>
                                        <button 
                                            onClick={() => setIsInviteModalOpen(true)}
                                            className="px-6 py-3 bg-primary text-white rounded-xl text-sm font-bold hover:shadow-lg transition-all flex items-center gap-2"
                                        >
                                            Invite Member <ArrowRight size={18} />
                                        </button>
                                    </div>

                                    {isLoading ? (
                                        <div className="flex items-center justify-center py-20">
                                            <RefreshCw className="animate-spin text-primary" size={32} />
                                        </div>
                                    ) : (
                                        <div className="grid gap-10">
                                            {/* Existing Members */}
                                            <div className="space-y-4">
                                                <h3 className="text-[10px] font-black uppercase tracking-widest text-[#64748B] ml-1">Active Administrators</h3>
                                                <div className="grid gap-4">
                                                    {members.map((member) => (
                                                        <div key={member.id} className="premium-card bg-white p-6 flex items-center justify-between hover:border-primary/20 transition-all group">
                                                            <div className="flex items-center gap-6">
                                                                <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center font-black text-primary border-2 border-white ring-2 ring-slate-50 uppercase">
                                                                    {member.user.name?.[0] || member.user.email[0]}
                                                                </div>
                                                                <div>
                                                                    <h4 className="font-bold text-[#0F172A]">{member.user.name || "Unnamed User"}</h4>
                                                                    <p className="text-xs text-[#64748B] font-medium">{member.user.email}</p>
                                                                </div>
                                                            </div>
                                                            <div className="flex items-center gap-10">
                                                                <div className="text-right">
                                                                    <span className="px-3 py-1 bg-slate-100 rounded-lg text-[10px] font-black text-slate-500 uppercase tracking-widest">{member.role}</span>
                                                                    <p className="text-[10px] font-black uppercase tracking-widest mt-1 text-emerald-500">
                                                                        ACTIVE
                                                                    </p>
                                                                </div>
                                                                <button className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all">
                                                                    <Settings size={18} />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Pending Invitations */}
                                            {invites.length > 0 && (
                                                <div className="space-y-4">
                                                    <h3 className="text-[10px] font-black uppercase tracking-widest text-[#64748B] ml-1">Pending Invitations</h3>
                                                    <div className="grid gap-4">
                                                        {invites.map((invite) => (
                                                            <div key={invite.id} className="premium-card bg-slate-50/50 p-6 flex items-center justify-between border-dashed hover:border-primary/20 transition-all group">
                                                                <div className="flex items-center gap-6">
                                                                    <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center font-black text-slate-400 border border-slate-100">
                                                                        ?
                                                                    </div>
                                                                    <div>
                                                                        <h4 className="font-bold text-[#64748B] italic">Waiting for response...</h4>
                                                                        <p className="text-xs text-[#64748B] font-medium">{invite.email}</p>
                                                                    </div>
                                                                </div>
                                                                <div className="flex items-center gap-10">
                                                                    <div className="text-right">
                                                                        <span className="px-3 py-1 bg-white rounded-lg text-[10px] font-black text-slate-400 uppercase tracking-widest border border-slate-100">{invite.role}</span>
                                                                        <p className="text-[10px] font-black uppercase tracking-widest mt-1 text-amber-500">
                                                                            INVITED
                                                                        </p>
                                                                    </div>
                                                                    <div className="flex gap-2">
                                                                        <button className="p-2 text-slate-300 hover:text-primary hover:bg-white rounded-lg transition-all border border-transparent hover:border-slate-100">
                                                                            <RefreshCw size={18} />
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                <InviteModal 
                    isOpen={isInviteModalOpen}
                    onClose={() => setIsInviteModalOpen(false)}
                    onInvite={handleInvite}
                />
            </div>
        </DashboardLayout>
    );
}
