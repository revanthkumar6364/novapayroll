"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Receipt,
    Plus,
    Search,
    Filter,
    CheckCircle2,
    Clock,
    AlertCircle,
    X,
    FileText,
    Download,
    Eye,
    Landmark,
    TrendingUp,
    Camera,
    Upload,
    ArrowUpRight,
    History,
    RefreshCcw,
    Sparkles,
    User,
    ShieldCheck
} from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useRouter } from 'next/navigation';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1';

interface ReimbursementRequest {
    id: string;
    description: string;
    amount: number;
    status: string;
    createdAt: string;
    employee?: {
        firstName: string;
        lastName: string;
    };
}

export default function ReimbursementsHub() {
    const [requests, setRequests] = useState<ReimbursementRequest[]>([]);
    const [loading, setLoading] = useState(true);
    const [isAddMode, setIsAddMode] = useState(false);
    const [isViewMode, setIsViewMode] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState<ReimbursementRequest | null>(null);
    const [userRole, setUserRole] = useState("EMPLOYEE");
    const [isProcessing, setIsProcessing] = useState(false);
    const [ocrSimulating, setOcrSimulating] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token') || localStorage.getItem('auth_token');
        if (!token) {
            router.push('/login');
            return;
        }
        fetchRequests(token);
    }, [router]);

    const fetchRequests = async (token: string) => {
        try {
            const res = await fetch(`${API_BASE}/reimbursement`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await res.json();
            setRequests(Array.isArray(data) ? data : []);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateRequest = async (e: React.FormEvent) => {
        e.preventDefault();
        const token = localStorage.getItem('token') || localStorage.getItem('auth_token');
        const formData = new FormData(e.target as HTMLFormElement);
        const dto = Object.fromEntries(formData.entries());

        // Simulate OCR extraction for a second
        setOcrSimulating(true);
        setTimeout(async () => {
            try {
                const res = await fetch(`${API_BASE}/reimbursement`, {
                    method: 'POST',
                    headers: { 
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        ...dto,
                        employeeId: 'EMP-OWNER-ID' // Simplified for demo
                    })
                });
                if (res.ok) {
                    setIsAddMode(false);
                    setOcrSimulating(false);
                    fetchRequests(token as string);
                }
            } catch (e) {
                console.error(e);
                setOcrSimulating(false);
            }
        }, 1500);
    };

    const handleUpdateStatus = async (id: string, status: string) => {
        const token = localStorage.getItem('token') || localStorage.getItem('auth_token');
        try {
            const res = await fetch(`${API_BASE}/reimbursement/${id}/status`, {
                method: 'PATCH',
                headers: { 
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ status })
            });
            if (res.ok) {
                fetchRequests(token as string);
                if (selectedRequest?.id === id) {
                    setIsViewMode(false);
                }
            }
        } catch (e) {
            console.error(e);
        }
    };

    const getStatusStyle = (status: string) => {
        switch (status) {
            case 'APPROVED': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
            case 'REJECTED': return 'bg-rose-50 text-rose-600 border-rose-100';
            default: return 'bg-amber-50 text-amber-600 border-amber-100';
        }
    };

    return (
        <DashboardLayout>
            <div className="space-y-8 pb-12">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div className="animate-in slide-in-from-left duration-700">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-[10px] font-black uppercase tracking-widest mb-3 border border-primary/20">
                            <Sparkles size={12} className="text-primary" />
                            AI-Powered Claims Engine
                        </div>
                        <h1 className="text-4xl font-black text-[#0F172A] tracking-tight">Claims Hub</h1>
                        <p className="text-[#64748B] font-medium mt-1">Submit receipts and track reimbursements in real-time.</p>
                    </div>

                    <div className="flex gap-4 w-full md:w-auto animate-in slide-in-from-right duration-700">
                        <button 
                            onClick={() => setIsAddMode(true)}
                            className="bg-[#245DF1] text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-blue-500/20 hover:bg-blue-600 transition-all border-b-4 border-blue-800 active:border-b-0 active:translate-y-1 flex items-center justify-center gap-2 flex-grow md:flex-grow-0"
                        >
                            <Camera size={18} /> New Claim
                        </button>
                    </div>
                </div>

                {/* Stat Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                        { label: 'Pending Approval', value: requests.filter(r => r.status === 'PENDING').length, sub: '₹24,500 Total', icon: Clock, color: 'text-amber-500', bg: 'bg-amber-50', border: 'border-amber-100' },
                        { label: 'Approved This Month', value: requests.filter(r => r.status === 'APPROVED').length, sub: '₹1.2L Set for payout', icon: CheckCircle2, color: 'text-emerald-500', bg: 'bg-emerald-50', border: 'border-emerald-100' },
                        { label: 'OCR Accuracy', value: '99.4%', sub: 'AI Verification Active', icon: Sparkles, color: 'text-blue-500', bg: 'bg-blue-50', border: 'border-blue-100' }
                    ].map((stat, i) => (
                        <div key={i} className={`premium-card p-6 bg-white border ${stat.border} shadow-sm group hover:scale-[1.02] transition-all`}>
                            <div className="flex items-center gap-4">
                                <div className={`w-14 h-14 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center`}>
                                    <stat.icon size={28} />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
                                    <h3 className="text-2xl font-black text-slate-800">{stat.value}</h3>
                                    <p className="text-[10px] text-slate-500 font-bold">{stat.sub}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Main Content Areas */}
                <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
                    {/* Active Claims Table */}
                    <div className="xl:col-span-3 space-y-6">
                        <div className="premium-card bg-white border border-[#F1F5F9] shadow-xl shadow-slate-200/40 rounded-[2.5rem] overflow-hidden">
                            <div className="p-8 border-b border-slate-50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                <div>
                                    <h2 className="text-xl font-black text-[#0F172A] tracking-tight flex items-center gap-2">
                                        <History className="text-slate-400" size={20} />
                                        Claim Registry
                                    </h2>
                                    <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mt-1">Showing all recent submissions</p>
                                </div>
                                <div className="flex items-center gap-2 w-full sm:w-auto">
                                    <div className="relative flex-grow sm:flex-grow-0">
                                        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                        <input type="text" placeholder="Search claims..." className="w-full sm:w-48 pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold text-slate-600 focus:outline-none focus:ring-2 focus:ring-primary/20" />
                                    </div>
                                    <button className="p-2.5 bg-slate-50 border border-slate-100 rounded-xl text-slate-400 hover:text-primary transition-all">
                                        <Download size={18} />
                                    </button>
                                </div>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b border-slate-50">
                                            <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Employee & Description</th>
                                            <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Date</th>
                                            <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Amount</th>
                                            <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                                            <th className="px-8 py-5 text-right text-[10px] font-black text-slate-400 uppercase tracking-widest">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-50/50">
                                        {requests.map((request, i) => (
                                            <tr key={i} className="hover:bg-slate-50/50 transition-colors group">
                                                <td className="px-8 py-5">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 shadow-sm border border-slate-200 group-hover:bg-primary group-hover:text-white transition-all">
                                                            <Receipt size={18} />
                                                        </div>
                                                        <div>
                                                            <p className="text-[13px] font-black text-slate-800">{request.description}</p>
                                                            <div className="flex items-center gap-1 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                                                                <User size={10} />
                                                                {request.employee?.firstName} {request.employee?.lastName}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-8 py-5 text-[12px] font-bold text-slate-500 uppercase">
                                                    {new Date(request.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}
                                                </td>
                                                <td className="px-8 py-5 text-sm font-black text-[#245DF1]">
                                                    ₹{request.amount.toLocaleString()}
                                                </td>
                                                <td className="px-8 py-5">
                                                    <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase border ${getStatusStyle(request.status)}`}>
                                                        {request.status}
                                                    </span>
                                                </td>
                                                <td className="px-8 py-5 text-right">
                                                    <button 
                                                        onClick={() => {
                                                            setSelectedRequest(request);
                                                            setIsViewMode(true);
                                                        }}
                                                        className="p-2.5 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-primary hover:border-primary transition-all shadow-sm"
                                                    >
                                                        <Eye size={18} />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                        {requests.length === 0 && !loading && (
                                            <tr>
                                                <td colSpan={5} className="py-20 text-center">
                                                    <div className="max-w-xs mx-auto text-center space-y-4">
                                                        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto opacity-50">
                                                            <Receipt size={32} className="text-slate-400" />
                                                        </div>
                                                        <div>
                                                            <h3 className="font-black text-slate-800 tracking-tight">Vault Empty</h3>
                                                            <p className="text-xs text-slate-500 font-medium">No expense claims have been filed in this period.</p>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {/* OCR Sandbox / Side Panel */}
                    <div className="space-y-8">
                        <div className="premium-card bg-slate-900 border-none p-8 text-white relative overflow-hidden shadow-2xl">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl opacity-50"></div>
                            <div className="relative z-10">
                                <div className="flex items-center gap-3 mb-8">
                                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center border border-white/10">
                                        <Upload size={20} className="text-primary" />
                                    </div>
                                    <h3 className="text-xl font-black tracking-tight">Receipt OCR</h3>
                                </div>
                                <div className="p-8 border-2 border-dashed border-white/10 rounded-[2rem] flex flex-col items-center justify-center text-center space-y-4 hover:border-primary/50 transition-all cursor-pointer group">
                                    <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <Camera className="text-slate-500 group-hover:text-primary transition-colors" size={32} />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-white">Upload Receipt</p>
                                        <p className="text-[10px] text-slate-500 font-medium mt-1">Drop receipt image or PDF</p>
                                    </div>
                                </div>
                                <div className="mt-8 space-y-3">
                                    <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-slate-500">
                                        <span>AI Processing Nodes</span>
                                        <span className="text-primary">8 active</span>
                                    </div>
                                    <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                                        <div className="h-full bg-primary w-2/3 shadow-[0_0_10px_rgba(36,93,241,0.5)]"></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-[#245DF1] to-blue-700 rounded-[2.5rem] p-8 text-white shadow-xl shadow-blue-500/30">
                            <div className="flex items-center justify-between mb-6">
                                <h4 className="font-black tracking-tight">Smart Policy</h4>
                                <ShieldCheck size={20} className="text-white/50" />
                            </div>
                            <p className="text-xs text-white/80 leading-relaxed font-medium">
                                Your expense policy limits travel to <b>₹45,000/month</b> for {userRole}.
                            </p>
                            <div className="mt-8 flex items-baseline gap-1">
                                <span className="text-3xl font-black">₹12,400</span>
                                <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Utilized</span>
                            </div>
                            <div className="mt-4 flex gap-1">
                                {[1,2,3,4,5,6,7,8,9,10].map(i => (
                                    <div key={i} className={`h-1.5 flex-grow rounded-full ${i <= 3 ? 'bg-white' : 'bg-white/10'}`}></div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Submit Claim Modal */}
                <AnimatePresence>
                    {isAddMode && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-4">
                            <motion.div 
                                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 50, scale: 0.95 }}
                                className="bg-white rounded-[2.5rem] w-full max-w-lg shadow-2xl overflow-hidden relative"
                            >
                                {ocrSimulating && (
                                    <div className="absolute inset-0 z-10 bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center text-center p-8">
                                        <RefreshCcw className="text-primary animate-spin mb-6" size={48} />
                                        <h2 className="text-2xl font-black text-slate-800 tracking-tight">AI OCR Extraction</h2>
                                        <p className="text-sm text-slate-500 font-bold mt-2 uppercase tracking-widest animate-pulse">Scanning receipt data points...</p>
                                    </div>
                                )}

                                <div className="p-8 border-b border-slate-50 flex items-center justify-between">
                                    <h2 className="text-2xl font-black text-slate-800 tracking-tight">Submit Claim</h2>
                                    <button onClick={() => setIsAddMode(false)} className="p-2 hover:bg-slate-50 rounded-xl text-slate-400 transition-all">
                                        <X size={20} />
                                    </button>
                                </div>
                                <form onSubmit={handleCreateRequest} className="p-8 space-y-6">
                                    <div className="space-y-4">
                                        <div className="p-8 border-2 border-dashed border-slate-200 rounded-[2rem] bg-slate-50 flex flex-col items-center justify-center cursor-pointer hover:border-primary transition-all group">
                                            <Upload className="text-slate-300 group-hover:text-primary transition-colors h-10 w-10 mb-2" />
                                            <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Select Receipt Image</span>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-1">
                                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Amount (INR)</label>
                                                <input required name="amount" type="number" placeholder="1200" className="w-full px-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl font-black text-slate-800 focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all" />
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Category</label>
                                                <select className="w-full px-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl font-black text-slate-800 focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all appearance-none">
                                                    <option>Travel</option>
                                                    <option>Food & Dining</option>
                                                    <option>Office Supplies</option>
                                                    <option>Other</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Description</label>
                                            <input required name="description" placeholder="Client meeting at Taj Hotel" className="w-full px-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl font-black text-slate-800 focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all" />
                                        </div>
                                    </div>
                                    <button type="submit" className="w-full bg-[#245DF1] text-white py-4 rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-blue-500/20 hover:bg-blue-600 transition-all border-b-4 border-blue-800 active:border-b-0 active:translate-y-1 mt-4">
                                        Analyze & Submit
                                    </button>
                                </form>
                            </motion.div>
                        </div>
                    )}

                    {/* View/Approve Modal */}
                    {isViewMode && selectedRequest && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-md p-4">
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="bg-white rounded-[2.5rem] w-full max-w-sm overflow-hidden shadow-2xl"
                            >
                                <div className="p-6 bg-slate-900 text-white flex items-center justify-between">
                                    <h4 className="font-black text-sm uppercase tracking-widest opacity-60">Claim Details</h4>
                                    <button onClick={() => setIsViewMode(false)} className="text-white/40 hover:text-white transition-colors">
                                        <X size={18} />
                                    </button>
                                </div>
                                <div className="p-8 space-y-8">
                                    <div className="text-center">
                                        <div className="inline-flex px-4 py-1.5 bg-primary/10 text-primary border border-primary/20 rounded-full text-[10px] font-black uppercase tracking-widest mb-4">
                                            Category: Travel
                                        </div>
                                        <h3 className="text-4xl font-black text-slate-900">₹{selectedRequest.amount.toLocaleString()}</h3>
                                        <p className="text-sm font-bold text-slate-500 uppercase mt-2 tracking-tight">{selectedRequest.description}</p>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between py-3 border-b border-slate-50">
                                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Employee</span>
                                            <span className="text-sm font-black text-slate-800 uppercase">{selectedRequest.employee?.firstName} {selectedRequest.employee?.lastName}</span>
                                        </div>
                                        <div className="flex items-center justify-between py-3 border-b border-slate-50">
                                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</span>
                                            <span className={`px-2 py-0.5 rounded-lg text-[10px] font-black uppercase border ${getStatusStyle(selectedRequest.status)}`}>
                                                {selectedRequest.status}
                                            </span>
                                        </div>
                                        <div className="py-4">
                                            <div className="w-full aspect-[4/3] bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-center p-6 group cursor-zoom-in hover:border-primary/30 transition-all">
                                                <FileText className="text-slate-300 mb-2" size={32} />
                                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest group-hover:text-primary transition-colors underline">View Attached Receipt</span>
                                            </div>
                                        </div>
                                    </div>

                                    {selectedRequest.status === 'PENDING' && (
                                        <div className="grid grid-cols-2 gap-4">
                                            <button 
                                                onClick={() => handleUpdateStatus(selectedRequest.id, 'REJECTED')}
                                                className="py-4 rounded-2xl font-black uppercase tracking-widest text-[11px] text-slate-400 border border-slate-200 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 transition-all"
                                            >
                                                Reject 
                                            </button>
                                            <button 
                                                onClick={() => handleUpdateStatus(selectedRequest.id, 'APPROVED')}
                                                className="py-4 bg-[#245DF1] text-white rounded-2xl font-black uppercase tracking-widest text-[11px] shadow-lg shadow-blue-500/20 hover:bg-blue-600 border-b-4 border-blue-800 active:border-b-0 active:translate-y-1 transition-all"
                                            >
                                                Approve
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </DashboardLayout>
    );
}
