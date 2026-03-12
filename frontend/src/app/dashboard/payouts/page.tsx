"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Landmark,
    ArrowRight,
    CheckCircle2,
    Clock,
    AlertCircle,
    Search,
    Filter,
    Download,
    ExternalLink,
    RefreshCcw,
    Zap,
    ShieldCheck,
    BarChart3,
    ChevronDown,
    ChevronRight,
    HelpCircle,
    History
} from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useRouter } from 'next/navigation';

// --- Types ---
interface PayoutBatch {
    id: string;
    status: 'PENDING' | 'PROCESSING' | 'SUCCESS' | 'FAILED';
    totalAmount: number;
    externalBatchId: string | null;
    createdAt: string;
    payrollRun?: {
        month: number;
        year: number;
    };
    _count?: {
        items: number;
    };
}

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1';

function parseJwt(token: string) {
    try {
        return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
        return null;
    }
}

export default function PayoutsHub() {
    const [batches, setBatches] = useState<PayoutBatch[]>([]);
    const [loading, setLoading] = useState(true);
    const [isProcessing, setIsProcessing] = useState(false);
    const [processingId, setProcessingId] = useState<string | null>(null);
    const [userRole, setUserRole] = useState("EMPLOYEE");
    const [isAuthLoaded, setIsAuthLoaded] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token') || localStorage.getItem('auth_token');
        if (!token) {
            router.push('/login');
            return;
        }
        const decoded = parseJwt(token);
        if (decoded) {
            setUserRole(decoded.orgs?.[0]?.role || "EMPLOYEE");
        }
        setIsAuthLoaded(true);
        fetchHistory(token);
    }, [router]);

    const fetchHistory = async (token: string) => {
        try {
            const response = await fetch(`${API_BASE}/payout/history`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await response.json();
            setBatches(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error('Failed to fetch payout history');
        } finally {
            setLoading(false);
        }
    };

    const initiatePayout = async (runId: string) => {
        setIsProcessing(true);
        setProcessingId(runId);

        try {
            const token = localStorage.getItem('token') || localStorage.getItem('auth_token');
            const response = await fetch(`${API_BASE}/payout/${runId}`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.ok) {
                setTimeout(() => fetchHistory(token as string), 6000);
            }
        } catch (error) {
            console.error('Payout failed');
        } finally {
            setTimeout(() => {
                setIsProcessing(false);
                setProcessingId(null);
            }, 5500);
        }
    };

    const getStatusStyle = (status: string) => {
        switch (status) {
            case 'SUCCESS': return 'badge-success';
            case 'PROCESSING': return 'badge-warning';
            case 'FAILED': return 'badge-danger';
            default: return 'badge-neutral';
        }
    };

    const hasAccess = ["OWNER", "ADMIN_FINANCE"].includes(userRole);

    if (!isAuthLoaded) {
        return <DashboardLayout><div className="flex h-[60vh] items-center justify-center">Loading...</div></DashboardLayout>;
    }

    if (!hasAccess) {
        return (
            <DashboardLayout>
                <div className="flex flex-col items-center justify-center p-20 text-center bg-white rounded-3xl border border-[#F1F5F9] shadow-sm mt-10">
                    <ShieldCheck className="w-20 h-20 text-danger mb-6 opacity-80" />
                    <h1 className="text-3xl font-black text-[#0F172A]">Security Clearance Required</h1>
                    <p className="text-[#475569] font-medium mt-3 max-w-md mx-auto">
                        Your current enterprise role (<span className="font-bold uppercase">{userRole.replace('_', ' ')}</span>) does not authorize access to the Payouts Hub. Only Finance Administrators and Owners can initiate bulk bank transfers.
                    </p>
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout>
            <div className="space-y-8 pb-12">
                {/* Header section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent text-primary rounded-full text-xs font-bold uppercase tracking-wide mb-3">
                            <Landmark size={14} />
                            Direct Bank Rails 2.0
                        </div>
                        <h1 className="text-3xl font-bold text-foreground">
                            Payouts Hub
                        </h1>
                        <p className="text-muted-foreground mt-1 text-sm">Manage 1-click salary transfers via instant bank APIs.</p>
                    </div>

                    <div className="flex gap-3">
                        <button className="flex items-center gap-2 px-4 py-2 bg-card text-foreground border border-border rounded-lg hover:bg-secondary transition-colors text-sm font-semibold">
                            <Filter size={16} className="text-muted-foreground" /> Filters
                        </button>
                        <button className="btn-primary flex items-center gap-2 px-5 py-2 text-sm">
                            <Zap size={16} /> Bulk Upload
                        </button>
                    </div>
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                        { label: 'Total Volume', value: '₹42.8M', change: '+12.5%', icon: Landmark, color: 'text-primary', bg: 'bg-primary/10' },
                        { label: 'Success Rate', value: '98.6%', change: '+0.3%', icon: ShieldCheck, color: 'text-success', bg: 'bg-success-bg' },
                        { label: 'Avg Settlement Time', value: '1.8 hours', change: '-15 mins', icon: Clock, color: 'text-warning', bg: 'bg-warning-bg' }
                    ].map((stat, i) => (
                        <div key={i} className="premium-card p-6 relative overflow-hidden">
                            <div className="flex justify-between items-start mb-4">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${stat.bg} ${stat.color}`}>
                                    <stat.icon size={20} />
                                </div>
                                <div className="text-right">
                                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">{stat.label}</p>
                                    <h3 className="text-2xl font-bold text-foreground mt-1">{stat.value}</h3>
                                </div>
                            </div>
                            <div className="flex items-center gap-1.5 mt-2">
                                <span className={`text-xs font-semibold ${stat.change.startsWith('+') ? 'text-success' : 'text-danger'}`}>
                                    {stat.change}
                                </span>
                                <span className="text-xs text-muted-foreground">vs last month</span>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 space-y-8">
                    {/* Pending Transfers Card */}
                    <div className="premium-card p-8">
                        <div className="flex justify-between items-start md:items-center flex-col md:flex-row gap-6 mb-8">
                            <div>
                                <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
                                    <AlertCircle className="w-5 h-5 text-warning" /> Pending Transfers
                                </h2>
                                <p className="text-muted-foreground text-sm mt-1">32 pending • Total ₹7.4M</p>
                            </div>
                            <button
                                onClick={() => initiatePayout('march-26-id')}
                                disabled={isProcessing}
                                className="btn-primary w-full md:w-auto px-6 py-2.5 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {isProcessing && processingId === 'march-26-id' ? (
                                    <> <RefreshCcw className="w-4 h-4 animate-spin" /> Processing... </>
                                ) : (
                                    <> <ArrowRight size={18} /> Execute 1-Click Payout </>
                                )}
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {[
                                { name: 'Acme Corp.', id: 'PX1092', amount: '₹1.2M' },
                                { name: 'Zenith Ltd.', id: 'PX1091', amount: '₹950k' }
                            ].map((item, i) => (
                                <div key={i} className="flex items-center justify-between p-4 bg-secondary rounded-lg border border-border">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-card flex items-center justify-center text-primary shadow-sm">
                                            <Landmark size={18} />
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-foreground">{item.name}</p>
                                            <p className="text-xs text-muted-foreground">#{item.id}</p>
                                        </div>
                                    </div>
                                    <p className="text-sm font-bold text-foreground">{item.amount}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* History Section */}
                    <div className="premium-card overflow-hidden">
                        <div className="p-6 border-b border-border flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                            <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
                                <History className="w-5 h-5 text-muted-foreground" /> Payout History
                            </h2>
                            <div className="flex items-center gap-3 w-full sm:w-auto">
                                <div className="relative flex-grow sm:flex-grow-0">
                                    <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                                    <input 
                                        type="text" 
                                        placeholder="Search..." 
                                        className="w-full sm:w-48 pl-9 pr-3 py-1.5 bg-secondary border border-border rounded-md text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                                    />
                                </div>
                                <button className="p-1.5 border border-border rounded-md hover:bg-secondary text-muted-foreground">
                                    <Download size={16} />
                                </button>
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr>
                                        <th className="table-header px-6 py-3">Recipient / Batch</th>
                                        <th className="table-header px-6 py-3">Batch ID</th>
                                        <th className="table-header px-6 py-3">Time</th>
                                        <th className="table-header px-6 py-3">Amount</th>
                                        <th className="table-header px-6 py-3 text-right">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {batches.length === 0 ? (
                                        <tr>
                                            <td colSpan={5} className="px-6 py-12 text-center text-muted-foreground text-sm">
                                                No payouts recorded yet.
                                            </td>
                                        </tr>
                                    ) : (
                                        batches.map((batch) => (
                                            <tr key={batch.id} className="table-row">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-8 h-8 rounded bg-accent flex items-center justify-center text-primary">
                                                            <Landmark size={14} />
                                                        </div>
                                                        <span className="text-sm font-semibold text-foreground">{batch.externalBatchId || 'Bulk Transfer'}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-xs font-mono text-muted-foreground">
                                                    #{batch.id.substring(0, 8).toUpperCase()}
                                                </td>
                                                <td className="px-6 py-4 text-sm text-muted-foreground">
                                                    {new Date(batch.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                </td>
                                                <td className="px-6 py-4 text-sm font-bold text-foreground">
                                                    ₹{batch.totalAmount.toLocaleString()}
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <span className={`px-2.5 py-1 rounded inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider ${getStatusStyle(batch.status)}`}>
                                                        {batch.status === 'SUCCESS' && <CheckCircle2 size={12} />}
                                                        {batch.status === 'PROCESSING' && <RefreshCcw size={12} className="animate-spin" />}
                                                        {batch.status === 'FAILED' && <AlertCircle size={12} />}
                                                        {batch.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                        <div className="px-6 py-3 bg-card border-t border-border flex justify-between items-center text-xs text-muted-foreground">
                            <span>Showing 1-1 of 1</span>
                            <div className="flex items-center gap-1">
                                <button className="px-2 py-1 border border-border rounded disabled:opacity-50">Prev</button>
                                <button className="px-2 py-1 border border-border rounded bg-secondary text-foreground font-medium">1</button>
                                <button className="px-2 py-1 border border-border rounded disabled:opacity-50">Next</button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Processing Modal Overlay */}
                <AnimatePresence>
                    {isProcessing && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/40 backdrop-blur-sm p-4"
                        >
                            <motion.div
                                initial={{ scale: 0.95, opacity: 0, y: 10 }}
                                animate={{ scale: 1, opacity: 1, y: 0 }}
                                exit={{ scale: 0.95, opacity: 0, y: 10 }}
                                className="premium-card p-8 max-w-sm w-full text-center"
                            >
                                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <RefreshCcw className="w-8 h-8 text-primary animate-spin" />
                                </div>
                                <h3 className="text-xl font-bold text-foreground mb-2">Processing Payout</h3>
                                <p className="text-sm text-muted-foreground mb-8">Establishing connection with bank node for real-time settlement.</p>
                                
                                <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                                    <motion.div 
                                        className="h-full bg-primary"
                                        initial={{ width: '0%' }}
                                        animate={{ width: '100%' }}
                                        transition={{ duration: 4 }}
                                    />
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </DashboardLayout>
    );
}
