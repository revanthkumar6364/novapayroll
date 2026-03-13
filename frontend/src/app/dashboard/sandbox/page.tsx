"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { 
    Terminal, Play, RefreshCcw, ShieldCheck, 
    Hash, CreditCard, Landmark, CheckCircle2, 
    AlertCircle, Copy, Code, Save, Zap
} from "lucide-react";

export default function SandboxPage() {
    const [activeTab, setActiveTab] = useState("gst");
    const [loading, setLoading] = useState(false);
    const [logs, setLogs] = useState<{ id: string; time: string; type: 'info' | 'success' | 'warn'; msg: string }[]>([]);
    const [inputs, setInputs] = useState({
        gstin: "29AAAAA0000A1Z5",
        pan: "ABCDE1234F",
        vpa: "sandbox@oknova"
    });

    const addLog = (msg: string, type: 'info' | 'success' | 'warn' = 'info') => {
        const id = Math.random().toString(36).substring(7);
        const time = new Date().toLocaleTimeString();
        setLogs(prev => [...prev, { id, time, type, msg }].slice(-10));
    };

    const runSimulation = async (type: string) => {
        setLoading(true);
        addLog(`Initiating ${type.toUpperCase()} simulation...`, 'info');
        
        try {
            // Simulate API Call
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            if (type === 'gst') {
                addLog(`Connected to GST Network (Sandbox Gateway)`, 'info');
                addLog(`Verifying GSTIN: ${inputs.gstin}`, 'info');
                await new Promise(resolve => setTimeout(resolve, 1000));
                addLog(`Verification Successful: Entity Found (NOVA PVT LTD)`, 'success');
            } else if (type === 'pan') {
                addLog(`Querying NSDL Sandbox API...`, 'info');
                addLog(`PAN: ${inputs.pan} matches Aadhaar data`, 'success');
            } else if (type === 'upi') {
                addLog(`NPCI Verification: Pinging VPA ${inputs.vpa}`, 'info');
                addLog(`VPA Active: Name Res 'SANDBOX USER'`, 'success');
            }
        } catch (error) {
            addLog(`Simulation Failed: Network Timeout`, 'warn');
        } finally {
            setLoading(false);
        }
    };

    return (
        <DashboardLayout>
            <div className="space-y-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <div className="px-2 py-0.5 rounded bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest">Dev Protocol</div>
                            <span className="text-muted-foreground">•</span>
                            <span className="text-[10px] text-muted-foreground font-bold font-mono">NODE_ENV: SANDBOX</span>
                        </div>
                        <h1 className="text-4xl font-black text-foreground tracking-tight flex items-center gap-3">
                            <Terminal className="text-primary" /> Developer Sandbox
                        </h1>
                        <p className="text-muted-foreground font-medium mt-1">Test mission-critical verifications in a zero-risk environment.</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="px-4 py-2 bg-secondary hover:bg-secondary/80 text-foreground font-bold rounded-xl border border-border flex items-center gap-2 transition-all">
                            <Code size={18} /> API Docs
                        </button>
                        <button 
                            onClick={() => setLogs([])}
                            className="px-4 py-2 bg-card hover:bg-secondary text-muted-foreground font-bold rounded-xl border border-border flex items-center gap-2 transition-all"
                        >
                            <RefreshCcw size={18} /> Flush Logs
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Simulator Controls */}
                    <div className="lg:col-span-7 space-y-6">
                        <div className="bg-card border border-border rounded-[2rem] overflow-hidden shadow-sm">
                            <div className="flex border-b border-border bg-secondary/30 p-1">
                                {[
                                    { id: 'gst', label: 'GST Verification', icon: Landmark },
                                    { id: 'pan', label: 'PAN Analysis', icon: ShieldCheck },
                                    { id: 'upi', label: 'UPI VPA Check', icon: Zap }
                                ].map(tab => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === tab.id ? 'bg-card text-primary shadow-sm ring-1 ring-border' : 'text-muted-foreground hover:text-foreground hover:bg-secondary'}`}
                                    >
                                        <tab.icon size={16} /> {tab.label}
                                    </button>
                                ))}
                            </div>

                            <div className="p-8">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={activeTab}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="space-y-6"
                                    >
                                        {activeTab === 'gst' && (
                                            <div className="space-y-4">
                                                <p className="text-sm text-muted-foreground font-medium bg-secondary/50 p-4 rounded-2xl border border-border/50">
                                                    Simulates real-time GSTIN lookup via government portal. Updates organization status to KYC Verified on success.
                                                </p>
                                                <div className="space-y-2">
                                                    <label className="text-[11px] font-black text-muted-foreground uppercase tracking-widest px-1">GSTIN (India)</label>
                                                    <div className="relative group">
                                                        <Hash className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-hover:text-primary transition-colors" size={18} />
                                                        <input 
                                                            type="text" 
                                                            value={inputs.gstin}
                                                            onChange={(e) => setInputs({...inputs, gstin: e.target.value})}
                                                            className="w-full bg-secondary border border-border outline-none pl-12 pr-4 py-4 rounded-2xl text-sm font-bold text-foreground focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all uppercase" 
                                                            placeholder="Enter 15-digit GSTIN"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {activeTab === 'pan' && (
                                            <div className="space-y-4">
                                                <p className="text-sm text-muted-foreground font-medium bg-secondary/50 p-4 rounded-2xl border border-border/50">
                                                    NSDL-grade PAN verification simulation. Validates against name-matching logic for employees and directors.
                                                </p>
                                                <div className="space-y-2">
                                                    <label className="text-[11px] font-black text-muted-foreground uppercase tracking-widest px-1">PAN Number</label>
                                                    <div className="relative group">
                                                        <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-hover:text-primary transition-colors" size={18} />
                                                        <input 
                                                            type="text" 
                                                            value={inputs.pan}
                                                            onChange={(e) => setInputs({...inputs, pan: e.target.value})}
                                                            className="w-full bg-secondary border border-border outline-none pl-12 pr-4 py-4 rounded-2xl text-sm font-bold text-foreground focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all uppercase" 
                                                            placeholder="Example: ABCDE1234F"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {activeTab === 'upi' && (
                                            <div className="space-y-4">
                                                <p className="text-sm text-muted-foreground font-medium bg-secondary/50 p-4 rounded-2xl border border-border/50">
                                                    Real-time NPCI ping simulation. Validates virtual payment addresses (VPA) for instant employee payouts.
                                                </p>
                                                <div className="space-y-2">
                                                    <label className="text-[11px] font-black text-muted-foreground uppercase tracking-widest px-1">VPA / UPI ID</label>
                                                    <div className="relative group">
                                                        <Zap className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-hover:text-primary transition-colors" size={18} />
                                                        <input 
                                                            type="text" 
                                                            value={inputs.vpa}
                                                            onChange={(e) => setInputs({...inputs, vpa: e.target.value})}
                                                            className="w-full bg-secondary border border-border outline-none pl-12 pr-4 py-4 rounded-2xl text-sm font-bold text-foreground focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all" 
                                                            placeholder="username@vpa"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        <button 
                                            onClick={() => runSimulation(activeTab)}
                                            disabled={loading}
                                            className="w-full py-4 bg-primary text-white font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-primary/30 hover:shadow-primary/40 active:scale-95 transition-all flex items-center justify-center gap-2 group disabled:opacity-50"
                                        >
                                            <Play size={20} className={loading ? 'animate-spin' : 'group-hover:translate-x-1 transition-transform'} />
                                            {loading ? 'Executing Script...' : 'Run Simulation'}
                                        </button>
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                        </div>

                        {/* API Stats */}
                        <div className="grid grid-cols-3 gap-4">
                            {[
                                { label: 'Response Time', val: '240ms', color: 'text-indigo-500' },
                                { label: 'Uptime', val: '99.99%', color: 'text-emerald-500' },
                                { label: 'Rate Limit', val: '100/min', color: 'text-amber-500' }
                            ].map(s => (
                                <div key={s.label} className="bg-card border border-border p-4 rounded-2xl">
                                    <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">{s.label}</p>
                                    <p className={`text-lg font-black ${s.color}`}>{s.val}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Console Output */}
                    <div className="lg:col-span-5 flex flex-col h-full min-h-[500px]">
                        <div className="bg-[#0D1117] text-[#C9D1D9] flex-grow rounded-[2rem] border border-white/5 shadow-2xl overflow-hidden flex flex-col font-mono text-[13px]">
                            <div className="bg-[#161B22] px-6 py-4 border-b border-white/5 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                                    <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
                                    <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
                                    <span className="ml-3 text-[11px] font-bold text-white/40 tracking-widest uppercase">Nova-System-Terminal</span>
                                </div>
                                <div className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 text-[10px] font-bold">STABLE</div>
                            </div>
                            
                            <div className="p-6 flex-grow overflow-y-auto space-y-2 custom-scrollbar">
                                {logs.length === 0 && (
                                    <p className="text-white/20 italic">No activity detected. Execute a simulation to start monitoring...</p>
                                )}
                                {logs.map(log => (
                                    <div key={log.id} className="flex gap-4 animate-in fade-in slide-in-from-left-2 transition-all">
                                        <span className="text-white/20 shrink-0">[{log.time}]</span>
                                        <span className={`${log.type === 'success' ? 'text-emerald-400' : log.type === 'warn' ? 'text-amber-400' : 'text-blue-400'} shrink-0 uppercase font-black tracking-widest`}>
                                            {log.type}:
                                        </span>
                                        <span className="leading-relaxed">{log.msg}</span>
                                    </div>
                                ))}
                                {loading && (
                                    <div className="flex gap-4 animate-pulse">
                                        <span className="text-white/20">[{new Date().toLocaleTimeString()}]</span>
                                        <span className="text-primary font-black uppercase tracking-widest">SYSTEM:</span>
                                        <span className="flex gap-1 items-center">
                                            Processing <span className="w-1 h-1 bg-white rounded-full animate-bounce"></span>
                                            <span className="w-1 h-1 bg-white rounded-full animate-bounce delay-75"></span>
                                            <span className="w-1 h-1 bg-white rounded-full animate-bounce delay-150"></span>
                                        </span>
                                    </div>
                                )}
                            </div>

                            <div className="p-4 bg-[#161B22] border-t border-white/5 flex items-center gap-3">
                                <div className="shrink-0 text-emerald-400 select-none">nova@system:~$</div>
                                <input 
                                    readOnly
                                    placeholder="Listening for protocol commands..." 
                                    className="bg-transparent border-none outline-none w-full text-white/50 italic cursor-default"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx global>{`
                .custom-scrollbar::-webkit-scrollbar { width: 6px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: #30363D; border-radius: 10px; }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #484F58; }
            `}</style>
        </DashboardLayout>
    );
}
