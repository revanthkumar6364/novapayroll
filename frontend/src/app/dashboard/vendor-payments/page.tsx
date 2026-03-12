"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
    Building, Plus, UploadCloud, 
    FileText, CheckCircle2, AlertCircle,
    Search, Filter, PlayCircle, MoreVertical,
    ScanLine, ArrowUpRight, X, Eye, Download, Archive, History, Clock
} from "lucide-react";
import { useRef, useEffect } from "react";

const INITIAL_VENDORS = [
    { id: "INV-2026-041", vendor: "AWS India Pvt Ltd", amount: "₹4,50,000", dueDate: "Today", status: "Pending", type: "Cloud Infrastructure", accountNumber: "998877665544", ifsc: "ICIC0001242", isArchived: false },
    { id: "INV-2026-040", vendor: "WeWork India", amount: "₹12,45,000", dueDate: "Tomorrow", status: "Pending", type: "Office Rent", accountNumber: "112233445566", ifsc: "HDFC0000012", isArchived: false },
    { id: "INV-2026-039", vendor: "Google India", amount: "₹85,000", dueDate: "24 Mar 2026", status: "Paid", type: "Marketing", accountNumber: "445566778899", ifsc: "SBI0000123", isArchived: false },
    { id: "INV-2026-038", vendor: "Deloitte Touche", amount: "₹2,50,000", dueDate: "15 Mar 2026", status: "Paid", type: "Audit Services", accountNumber: "778899001122", ifsc: "AXIS0000987", isArchived: false },
];

export default function VendorPaymentsPage() {
    const [vendorsList, setVendorsList] = useState(INITIAL_VENDORS);
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");
    const [showFilterMenu, setShowFilterMenu] = useState(false);
    const [viewMode, setViewMode] = useState<'active' | 'archived'>('active');
    
    // Payout Flow State
    const [showPayoutModal, setShowPayoutModal] = useState(false);
    const [activePayoutInvoice, setActivePayoutInvoice] = useState<any>(null);
    const [payoutStep, setPayoutStep] = useState<'details' | 'otp' | 'processing' | 'success'>('details');
    const [otp, setOtp] = useState("");
    
    const [isUploading, setIsUploading] = useState(false);
    const [showAddVendor, setShowAddVendor] = useState(false);
    const [isPayingBulk, setIsPayingBulk] = useState(false);
    
    // More Actions State
    const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
    const [showActionModal, setShowActionModal] = useState(false);
    const [actionType, setActionType] = useState<'view' | 'download' | 'archive' | 'edit-vendor' | null>(null);
    const [activeActionData, setActiveActionData] = useState<any>(null);
    const [downloadProgress, setDownloadProgress] = useState(0);

    // Edit Vendor Form State
    const [editData, setEditData] = useState({ vendor: "", accountNumber: "", ifsc: "", amount: "" });

    const fileInputRef = useRef<HTMLInputElement>(null);

    // Close menu on click outside
    useEffect(() => {
        const handleClick = () => setActiveMenuId(null);
        window.addEventListener('click', handleClick);
        return () => window.removeEventListener('click', handleClick);
    }, []);

    const toggleSelection = (id: string) => {
        setSelectedIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
    };

    const handlePayNow = (invoice: any) => {
        setActivePayoutInvoice(invoice);
        setPayoutStep('details');
        setShowPayoutModal(true);
    };

    const handleFileUpload = () => {
        setIsUploading(true);
        setTimeout(() => {
            setIsUploading(false);
            // Simulate adding a new extracted invoice
            const newInvoice = {
                id: `INV-2026-${Math.floor(Math.random() * 1000)}`,
                vendor: "New Vendor Extracted",
                amount: "₹1,25,000",
                dueDate: "Next Week",
                status: "Pending" as const,
                type: "AI Processed",
                accountNumber: "998811223344",
                ifsc: "ICIC0001242",
                isArchived: false
            };
            setVendorsList(prev => [newInvoice, ...prev]);
        }, 3000);
    };

    const handleConfirmPayout = () => {
        setPayoutStep('otp');
    };

    const handleVerifyOtp = () => {
        setPayoutStep('processing');
        setTimeout(() => {
            if (activePayoutInvoice === 'BULK') {
                setVendorsList(prev => prev.map(v => selectedIds.includes(v.id) ? { ...v, status: 'Paid' } : v));
                setSelectedIds([]);
            } else {
                setVendorsList(prev => prev.map(v => v.id === activePayoutInvoice.id ? { ...v, status: 'Paid' } : v));
            }
            setPayoutStep('success');
        }, 2000);
    };

    const handleBulkPaymentClick = () => {
        if (selectedIds.length === 0) return;
        setActivePayoutInvoice('BULK');
        setPayoutStep('details');
        setShowPayoutModal(true);
    };

    const handleActionClick = (e: React.MouseEvent, id: string) => {
        e.stopPropagation();
        setActiveMenuId(activeMenuId === id ? null : id);
    };

    const triggerAction = (type: 'view' | 'download' | 'archive' | 'edit-vendor', data: any) => {
        setActionType(type);
        setActiveActionData(data);
        setShowActionModal(true);
        setActiveMenuId(null);

        if (type === 'edit-vendor') {
            setEditData({
                vendor: data.vendor,
                accountNumber: data.accountNumber,
                ifsc: data.ifsc,
                amount: data.amount
            });
        }

        if (type === 'download') {
            setDownloadProgress(0);
            const interval = setInterval(() => {
                setDownloadProgress(prev => {
                    if (prev >= 100) {
                        clearInterval(interval);
                        handleRealDownload(data);
                        return 100;
                    }
                    return prev + 10;
                });
            }, 150);
        }
    };

    const handleRealDownload = (data: any) => {
        // Create a professional receipt layout in a new window for printing/saving
        const receiptHtml = `
            <html>
                <head>
                    <title>Payment Receipt - ${data.id}</title>
                    <style>
                        body { font-family: 'Inter', sans-serif; padding: 40px; color: #0F172A; }
                        .header { display: flex; justify-content: space-between; border-bottom: 2px solid #F1F5F9; padding-bottom: 20px; margin-bottom: 40px; }
                        .logo { font-size: 24px; font-weight: 900; color: #2563EB; }
                        .receipt-title { font-size: 32px; font-weight: 900; margin-bottom: 8px; }
                        .meta { color: #64748B; font-size: 14px; }
                        .grid { display: grid; grid-template-cols: 1fr 1fr; gap: 40px; margin-bottom: 40px; }
                        .label { font-size: 10px; font-weight: 800; text-transform: uppercase; color: #94A3B8; letter-spacing: 1px; margin-bottom: 8px; }
                        .value { font-size: 16px; font-weight: 700; }
                        .amount-box { border: 2px solid #F1F5F9; padding: 24px; border-radius: 16px; background: #F8FAFC; }
                        .amount { font-size: 28px; font-weight: 900; color: #0F172A; }
                        .footer { margin-top: 60px; padding-top: 20px; border-top: 1px solid #F1F5F9; font-size: 12px; color: #94A3B8; text-align: center; }
                        @media print { .no-print { display: none; } }
                    </style>
                </head>
                <body>
                    <div class="header">
                        <div>
                            <div class="logo">NOVAPAYROLL</div>
                            <div class="meta">Professional Payment Confirmation</div>
                        </div>
                        <div style="text-align: right">
                            <div class="receipt-title">RECEIPT</div>
                            <div class="meta">ID: ${data.id}</div>
                        </div>
                    </div>
                    
                    <div class="grid">
                        <div>
                            <div class="label">Vendor Entity</div>
                            <div class="value">${data.vendor}</div>
                            <div style="margin-top: 20px">
                                <div class="label">Category</div>
                                <div class="value">${data.type}</div>
                            </div>
                        </div>
                        <div>
                            <div class="label">Payment Date</div>
                            <div class="value">${new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' })}</div>
                            <div style="margin-top: 20px">
                                <div class="label">Status</div>
                                <div class="value" style="color: #059669">SUCCESSFUL</div>
                            </div>
                        </div>
                    </div>

                    <div class="amount-box">
                        <div class="label">Settlement Amount</div>
                        <div class="amount">${data.amount}</div>
                    </div>

                    <div style="margin-top: 40px; display: grid; grid-template-cols: 1fr 1fr; gap: 40px;">
                        <div>
                            <div class="label">Beneficiary Account</div>
                            <div class="value">**** ${data.accountNumber?.slice(-4) || '8842'}</div>
                        </div>
                        <div>
                            <div class="label">IFSC Code</div>
                            <div class="value">${data.ifsc || 'ICIC0001242'}</div>
                        </div>
                    </div>

                    <div class="footer">
                        This is a computer-generated document. No signature required.<br>
                        © 2026 Novapayroll Technologies Inc. All rights reserved.
                    </div>
                    <script>
                        window.onload = () => { window.print(); };
                    </script>
                </body>
            </html>
        `;

        const blob = new Blob([receiptHtml], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        window.open(url, '_blank');
    };

    const confirmArchive = () => {
        setVendorsList(prev => prev.map(v => v.id === activeActionData.id ? { ...v, isArchived: true } : v));
        setShowActionModal(false);
    };

    const handleSaveEdit = () => {
        setVendorsList(prev => prev.map(v => v.id === activeActionData.id ? { 
            ...v, 
            vendor: editData.vendor, 
            accountNumber: editData.accountNumber, 
            ifsc: editData.ifsc,
            amount: editData.amount
        } : v));
        setShowActionModal(false);
    };

    const handleUnarchive = (id: string) => {
        setVendorsList(prev => prev.map(v => v.id === id ? { ...v, isArchived: false } : v));
    };


    const filteredVendors = vendorsList.filter(v => {
        const matchesSearch = v.vendor.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            v.id.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesFilter = statusFilter === "All" || v.status === statusFilter;
        const matchesView = viewMode === 'active' ? !v.isArchived : v.isArchived;
        return matchesSearch && matchesFilter && matchesView;
    });


    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Header section with elite illustration */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
                
                <div className="relative z-10 max-w-xl">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary uppercase tracking-wider text-[11px] font-black mb-4">
                        <Building size={14} /> Accounts Payable
                    </div>
                    <h1 className="text-3xl font-black text-[#0F172A] tracking-tight mb-3">
                        Vendor Payments
                    </h1>
                    <p className="text-[#475569] font-medium leading-relaxed">
                        Automate your accounts payable. Upload vendor invoices, extract details instantly using AI OCR, and execute bulk payouts via IMPS/NEFT/RTGS.
                    </p>
                </div>

                {/* Animated OCR Scanner Illustration */}
                <div className="relative z-10 shrink-0 hidden lg:block">
                    <motion.div 
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        className={`w-[280px] h-[220px] bg-[#F8FAFC] border border-slate-200 rounded-2xl shadow-lg relative overflow-hidden flex flex-col pt-4 transition-all duration-500 ${isUploading ? 'ring-4 ring-primary/20 scale-105' : ''}`}
                    >
                        {/* Background Data Grid Pattern */}
                        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#1D4ED8 1px, transparent 1px)', backgroundSize: '12px 12px' }}></div>
                        
                        <motion.div 
                            animate={{ opacity: isUploading ? [0.3, 0.6, 0.3] : [0.1, 0.2, 0.1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="absolute inset-0 bg-primary/5 z-0"
                        />


                        {/* Invoice Mockup */}
                        <div className="mx-6 bg-white border border-slate-200 rounded-t-xl shadow-sm flex-1 p-4 relative overflow-hidden">
                            <div className="w-12 h-4 bg-slate-200 rounded mb-4 relative overflow-hidden">
                                <motion.div animate={{ x: ["-100%", "200%"] }} transition={{ duration: isUploading ? 1 : 2.5, repeat: Infinity }} className="absolute inset-0 bg-gradient-to-r from-transparent via-white/80 to-transparent" />
                            </div>
                            <div className="w-full h-2 bg-slate-100 rounded mb-2 relative overflow-hidden">
                                <motion.div animate={{ x: ["-100%", "200%"] }} transition={{ duration: isUploading ? 1.2 : 3, repeat: Infinity }} className="absolute inset-0 bg-gradient-to-r from-transparent via-white/80 to-transparent" />
                            </div>
                            <div className="w-3/4 h-2 bg-slate-100 rounded mb-6 relative overflow-hidden">
                                <motion.div animate={{ x: ["-100%", "200%"] }} transition={{ duration: isUploading ? 0.8 : 2, repeat: Infinity }} className="absolute inset-0 bg-gradient-to-r from-transparent via-white/80 to-transparent" />
                            </div>
                            
                            <div className="flex justify-between items-center mb-2">
                                <div className="w-16 h-2 bg-slate-100 rounded relative overflow-hidden">
                                    <motion.div animate={{ x: ["-100%", "200%"] }} transition={{ duration: isUploading ? 1.5 : 4, repeat: Infinity }} className="absolute inset-0 bg-gradient-to-r from-transparent via-white/80 to-transparent" />
                                </div>
                                <div className="w-8 h-2 bg-slate-200 rounded relative overflow-hidden">
                                    <motion.div animate={{ x: ["-100%", "200%"] }} transition={{ duration: isUploading ? 1 : 2.2, repeat: Infinity }} className="absolute inset-0 bg-gradient-to-r from-transparent via-white/80 to-transparent" />
                                </div>
                            </div>
                            <div className="flex justify-between items-center mb-2">
                                <div className="w-20 h-2 bg-slate-100 rounded relative overflow-hidden">
                                    <motion.div animate={{ x: ["-100%", "200%"] }} transition={{ duration: isUploading ? 1.1 : 3.5, repeat: Infinity }} className="absolute inset-0 bg-gradient-to-r from-transparent via-white/80 to-transparent" />
                                </div>
                                <div className="w-10 h-2 bg-slate-200 rounded relative overflow-hidden">
                                    <motion.div animate={{ x: ["-100%", "200%"] }} transition={{ duration: isUploading ? 1.3 : 2.8, repeat: Infinity }} className="absolute inset-0 bg-gradient-to-r from-transparent via-white/80 to-transparent" />
                                </div>
                            </div>
                            
                            {/* Scanning Laser Line */}
                            <motion.div 
                                className="absolute left-0 w-full h-0.5 bg-primary shadow-[0_0_8px_rgba(var(--primary),0.8)] z-20"
                                animate={{ top: ["10%", "90%", "10%"] }}
                                transition={{ duration: isUploading ? 1.5 : 3, repeat: Infinity, ease: "linear" }}
                            />
                            {/* Scan Area Highlight */}
                            <motion.div 
                                className="absolute left-0 w-full bg-primary/5 z-10"
                                animate={{ top: "10%", height: ["0%", "80%", "0%"] }}
                                transition={{ duration: isUploading ? 1.5 : 3, repeat: Infinity, ease: "linear" }}
                            />
                        </div>
                        
                        {/* Status Bar */}
                        <div className="absolute bottom-0 w-full bg-white border-t border-slate-200 p-3 flex items-center justify-between z-30">
                            <div className="flex items-center gap-2 text-[11px] font-bold text-primary">
                                <ScanLine size={14} className={isUploading ? "animate-spin" : "animate-pulse"} /> {isUploading ? "AI EXTRACTING DATA..." : "AI IDLE (READY)..."}
                            </div>
                            <div className="flex gap-1">
                                <div className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0ms" }}></div>
                                <div className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" style={{ animationDelay: "150ms" }}></div>
                                <div className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" style={{ animationDelay: "300ms" }}></div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Actions Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                
                {/* Drag and Drop Zone */}
                <div 
                    onClick={() => fileInputRef.current?.click()}
                    className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 border-dashed p-8 flex flex-col items-center justify-center text-center hover:bg-slate-50 transition-colors cursor-pointer group relative"
                >
                    <input 
                        type="file" 
                        className="hidden" 
                        ref={fileInputRef} 
                        onChange={handleFileUpload}
                    />
                    
                    {isUploading ? (
                        <div className="flex flex-col items-center">
                            <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin mb-4" />
                            <h3 className="text-lg font-bold text-primary animate-pulse">AI Extracting Invoice...</h3>
                        </div>
                    ) : (
                        <>
                            <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                                <UploadCloud size={28} />
                            </div>
                            <h3 className="text-lg font-bold text-[#0F172A] mb-2">Upload Vendor Invoice</h3>
                            <p className="text-[#64748B] text-sm max-w-sm mb-6">
                                Drag and drop PDF, JPG, or PNG files here. Our AI will instantly extract the vendor details, amount, and due date.
                            </p>
                            <button className="bg-[#1D4ED8] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#1E40AF] transition-all shadow-lg shadow-blue-500/20 text-sm active:scale-95">
                                Browse Files
                            </button>
                        </>
                    )}
                </div>

                {/* Quick Add Vendor */}
                <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm flex flex-col">
                    <h3 className="text-lg font-bold text-[#0F172A] mb-1">Quick Actions</h3>
                    <p className="text-[#64748B] text-[13px] mb-6">Manage your payees and bulk actions.</p>
                    
                    <div className="space-y-3 mt-auto">
                        <button 
                            onClick={() => setShowAddVendor(true)}
                            className="w-full bg-white border border-[#E2E8F0] text-[#0F172A] px-4 py-3 rounded-xl font-bold hover:bg-slate-50 transition-colors flex items-center justify-between text-sm group"
                        >
                            <span className="flex items-center gap-3">
                                <Building size={18} className="text-[#64748B] group-hover:text-primary transition-colors" /> Add New Vendor
                            </span>
                            <Plus size={16} className="text-[#94A3B8]" />
                        </button>
                        <div className="p-4 bg-primary/5 rounded-2xl flex items-center justify-between group-hover:bg-primary/10 transition-colors cursor-pointer" onClick={handleBulkPaymentClick}>
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                                <PlayCircle size={28} />
                            </div>
                            <div>
                                <p className="text-[15px] font-bold text-[#0F172A]">Make Bulk Payment</p>
                                <p className="text-[12px] text-[#64748B]">{selectedIds.length > 0 ? `${selectedIds.length} invoices selected` : 'Select invoices to pay at once'}</p>
                            </div>
                        </div>
                        <ArrowUpRight size={20} className="text-[#94A3B8] group-hover:text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                    </div>
                    </div>
                </div>
            </div>

            {/* Invoices Table */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <h3 className="text-lg font-bold text-[#0F172A] flex items-center gap-2">
                        <FileText size={18} className="text-[#64748B]" /> Recent Invoices
                    </h3>
                    
                    <div className="flex items-center gap-3 relative">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" size={16} />
                            <input 
                                type="text"
                                placeholder="Search vendors..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-9 pr-4 py-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-[#0F172A] placeholder:text-[#94A3B8] w-full sm:w-64"
                            />
                        </div>
                        <div className="relative">
                            <button 
                                onClick={() => setShowFilterMenu(!showFilterMenu)}
                                className={`p-2 border border-[#E2E8F0] rounded-xl transition-colors ${statusFilter !== 'All' ? 'bg-primary/10 text-primary border-primary/20' : 'text-[#475569] hover:bg-[#F8FAFC]'}`}
                            >
                                <Filter size={18} />
                            </button>
                            
                            {showFilterMenu && (
                                <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-100 rounded-2xl shadow-xl z-50 p-2 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                                    {['All', 'Paid', 'Pending'].map((status) => (
                                        <button
                                            key={status}
                                            onClick={() => {
                                                setStatusFilter(status);
                                                setShowFilterMenu(false);
                                            }}
                                            className={`w-full text-left px-4 py-2.5 rounded-xl text-[13px] font-bold transition-colors ${statusFilter === status ? 'bg-primary/10 text-primary' : 'text-[#64748B] hover:bg-slate-50'}`}
                                        >
                                            {status} Invoices
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-[#F8FAFC] border-b border-slate-100">
                                <th className="p-4 text-[12px] font-bold uppercase tracking-wider text-[#64748B]">Invoice ID</th>
                                <th className="p-4 text-[12px] font-bold uppercase tracking-wider text-[#64748B]">Vendor</th>
                                <th className="p-4 text-[12px] font-bold uppercase tracking-wider text-[#64748B]">Due Date</th>
                                <th className="p-4 text-[12px] font-bold uppercase tracking-wider text-[#64748B] text-right">Amount</th>
                                <th className="p-4 text-[12px] font-bold uppercase tracking-wider text-[#64748B]">Status</th>
                                <th className="p-4 text-[12px] font-bold uppercase tracking-wider text-[#64748B] text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {filteredVendors.length > 0 ? (
                                filteredVendors.map((inv) => (
                                    <tr key={inv.id} className={`hover:bg-slate-50/50 transition-colors group ${selectedIds.includes(inv.id) ? 'bg-primary/5' : ''}`}>
                                        <td className="p-4">
                                            <div className="flex items-center gap-3">
                                                <div 
                                                    onClick={() => toggleSelection(inv.id)}
                                                    className={`w-5 h-5 rounded-md border-2 flex items-center justify-center cursor-pointer transition-all ${selectedIds.includes(inv.id) ? 'bg-primary border-primary text-white shadow-lg' : 'border-slate-200 bg-white hover:border-primary/50'}`}
                                                >
                                                    {selectedIds.includes(inv.id) && <CheckCircle2 size={12} />}
                                                </div>
                                                <div>
                                                    <div className="text-[14px] font-black text-[#0F172A] flex items-center gap-1.5">
                                                        {inv.vendor}
                                                        <span className="bg-emerald-50 text-emerald-600 text-[9px] px-1.5 py-0.5 rounded-full font-black uppercase tracking-tighter">Verified</span>
                                                    </div>
                                                    <div className="text-[11px] font-bold text-[#64748B] flex items-center gap-2">
                                                        {inv.id} • {inv.type}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <span className="text-[14px] font-black text-[#0F172A]">{inv.amount}</span>
                                        </td>
                                        <td className="p-4">
                                            <span className="text-[13px] font-bold text-[#64748B]">{inv.dueDate}</span>
                                        </td>
                                        <td className="p-4">
                                            <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wide
                                                ${inv.status === 'Paid' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                                                <div className={`w-1.5 h-1.5 rounded-full ${inv.status === 'Paid' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                                                {inv.status}
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex items-center justify-between gap-4">
                                                {inv.status === "Pending" && viewMode === 'active' ? (
                                                    <button 
                                                        onClick={() => handlePayNow(inv)}
                                                        className="bg-primary/10 hover:bg-primary text-primary hover:text-white px-4 py-1.5 rounded-full text-[12px] font-black uppercase tracking-wider transition-all"
                                                    >
                                                        Pay Now
                                                    </button>
                                                ) : viewMode === 'archived' ? (
                                                    <button 
                                                        onClick={() => handleUnarchive(inv.id)}
                                                        className="bg-slate-100 hover:bg-slate-200 text-[#64748B] px-4 py-1.5 rounded-full text-[12px] font-black uppercase tracking-wider transition-all flex items-center gap-1.5"
                                                    >
                                                        <ArrowUpRight size={14} /> Restore
                                                    </button>
                                                ) : (
                                                    <div className="flex items-center gap-1 text-emerald-600">
                                                        <CheckCircle2 size={16} />
                                                        <span className="text-[10px] font-black uppercase tracking-widest">Settled</span>
                                                    </div>
                                                )}
                                                
                                                <div className="relative">
                                                    <button 
                                                        onClick={(e) => handleActionClick(e, inv.id)}
                                                        className="p-2 text-slate-400 hover:text-slate-900 transition-colors"
                                                    >
                                                        <MoreVertical size={20} />
                                                    </button>
                                                    
                                                    {activeMenuId === inv.id && (
                                                        <motion.div 
                                                            initial={{ opacity: 0, scale: 0.95, y: -10 }}
                                                            animate={{ opacity: 1, scale: 1, y: 0 }}
                                                            className="absolute right-0 mt-2 w-48 bg-white border border-slate-100 rounded-2xl shadow-xl z-50 p-2 overflow-hidden"
                                                        >
                                                            <button 
                                                                onClick={() => triggerAction('view', inv)}
                                                                className="w-full text-left px-4 py-2.5 rounded-xl text-[13px] font-bold text-[#64748B] hover:bg-slate-50 hover:text-[#0F172A] transition-colors flex items-center gap-3"
                                                            >
                                                                <Eye size={16} /> View Invoice
                                                            </button>
                                                            <button 
                                                                onClick={() => triggerAction('edit-vendor', inv)}
                                                                className="w-full text-left px-4 py-2.5 rounded-xl text-[13px] font-bold text-[#64748B] hover:bg-slate-50 hover:text-[#0F172A] transition-colors flex items-center gap-3"
                                                            >
                                                                <ScanLine size={16} /> Edit Details
                                                            </button>
                                                            <button 
                                                                onClick={() => triggerAction('download', inv)}
                                                                className="w-full text-left px-4 py-2.5 rounded-xl text-[13px] font-bold text-[#64748B] hover:bg-slate-50 hover:text-[#0F172A] transition-colors flex items-center gap-3"
                                                            >
                                                                <Download size={16} /> Download PDF
                                                            </button>
                                                            <button 
                                                                onClick={() => triggerAction('archive', inv)}
                                                                className="w-full text-left px-4 py-2.5 rounded-xl text-[13px] font-bold text-danger hover:bg-danger/5 transition-colors flex items-center gap-3"
                                                            >
                                                                <Archive size={16} /> Cancel Invoice
                                                            </button>
                                                        </motion.div>
                                                    )}
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={6} className="py-24 text-center">
                                        <div className="flex flex-col items-center gap-4 text-slate-400">
                                            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center">
                                                <Archive size={32} />
                                            </div>
                                            <div>
                                                <p className="font-black text-slate-900">No {viewMode} invoices found</p>
                                                <p className="text-[13px] font-medium mt-1 uppercase tracking-wider text-slate-400">
                                                    {viewMode === 'active' ? 'Upload or add a new vendor to get started.' : 'Items you cancel will appear here for archival purposes.'}
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Payout Modal */}
            {showPayoutModal && (
                <div className="fixed inset-0 bg-[#0F172A]/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <motion.div 
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="bg-white rounded-[32px] w-full max-w-md overflow-hidden relative"
                    >
                        <button onClick={() => setShowPayoutModal(false)} className="absolute right-6 top-6 p-2 text-slate-400 hover:text-slate-900 transition-colors z-10">
                            <X size={20} />
                        </button>

                        <div className="p-8">
                            {payoutStep === 'details' && (
                                <div className="space-y-6">
                                    <div className="text-center">
                                        <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mx-auto mb-4">
                                            <Building size={32} />
                                        </div>
                                        <h3 className="text-xl font-bold text-[#0F172A]">Confirm Payout</h3>
                                        <p className="text-[#64748B] text-sm">Review vendor details and amount</p>
                                    </div>

                                    <div className="bg-[#F8FAFC] rounded-2xl p-6 space-y-4">
                                        <div className="flex justify-between items-center">
                                            <span className="text-[13px] text-[#64748B]">Vendor</span>
                                            <span className="text-[13px] font-bold text-[#0F172A]">{activePayoutInvoice === 'BULK' ? 'Multiple Vendors' : activePayoutInvoice.vendor}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-[13px] text-[#64748B]">Amount</span>
                                            <span className="text-[15px] font-bold text-primary">
                                                {activePayoutInvoice === 'BULK' ? 
                                                    `₹${vendorsList.filter(v => selectedIds.includes(v.id)).reduce((acc, curr) => acc + parseInt(curr.amount.replace(/[^0-9]/g, '')), 0).toLocaleString()}` : 
                                                    activePayoutInvoice.amount}
                                            </span>
                                        </div>
                                        {activePayoutInvoice !== 'BULK' && (
                                            <>
                                                <div className="pt-4 border-t border-slate-200">
                                                    <p className="text-[11px] font-bold text-[#94A3B8] uppercase tracking-wider mb-2">Account Details</p>
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-[13px] text-[#64748B]">A/C Number</span>
                                                        <span className="text-[13px] font-mono font-bold text-[#0F172A]">**** {activePayoutInvoice.accountNumber?.slice(-4) || '8842'}</span>
                                                    </div>
                                                    <div className="flex justify-between items-center mt-1">
                                                        <span className="text-[13px] text-[#64748B]">IFSC Code</span>
                                                        <span className="text-[13px] font-mono font-bold text-[#0F172A]">{activePayoutInvoice.ifsc || 'ICIC0001242'}</span>
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                    </div>

                                    <button 
                                        onClick={handleConfirmPayout}
                                        className="w-full bg-[#0F172A] text-white py-4 rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-lg active:scale-[0.98]"
                                    >
                                        Confirm & Send OTP
                                    </button>
                                </div>
                            )}

                            {payoutStep === 'otp' && (
                                <div className="space-y-6">
                                    <div className="text-center">
                                        <div className="w-16 h-16 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-500 mx-auto mb-4 border border-amber-100">
                                            <AlertCircle size={32} />
                                        </div>
                                        <h3 className="text-xl font-bold text-[#0F172A]">Verification</h3>
                                        <p className="text-[#64748B] text-sm">Enter the 4-digit OTP sent to your phone</p>
                                    </div>

                                    <div className="flex justify-center gap-3">
                                        {[1, 2, 3, 4].map((i) => (
                                            <input 
                                                key={i}
                                                type="text"
                                                maxLength={1}
                                                className="w-14 h-14 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-center text-xl font-bold focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                                                value={otp[i-1] || ""}
                                                onChange={(e) => {
                                                    const val = e.target.value;
                                                    if (/^[0-9]$/.test(val) || val === "") {
                                                        const newOtp = otp.split("");
                                                        newOtp[i-1] = val;
                                                        setOtp(newOtp.join(""));
                                                    }
                                                }}
                                            />
                                        ))}
                                    </div>

                                    <button 
                                        onClick={handleVerifyOtp}
                                        disabled={otp.length !== 4}
                                        className="w-full bg-primary text-white py-4 rounded-2xl font-bold hover:bg-primary/90 transition-all shadow-lg active:scale-[0.98] disabled:opacity-50"
                                    >
                                        Verify & Pay
                                    </button>
                                    
                                    <div className="text-center">
                                        <button className="text-[13px] text-primary font-bold hover:underline">Resend OTP</button>
                                    </div>
                                </div>
                            )}

                            {payoutStep === 'processing' && (
                                <div className="py-12 flex flex-col items-center justify-center space-y-6">
                                    <div className="relative">
                                        <motion.div 
                                            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                                            transition={{ duration: 1.5, repeat: Infinity }}
                                            className="w-24 h-24 bg-primary/10 rounded-full border-2 border-primary/20"
                                        />
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <PlayCircle size={40} className="text-primary animate-spin" />
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <h3 className="text-lg font-bold text-[#0F172A]">Processing Payment</h3>
                                        <p className="text-[#64748B] text-sm italic">Communicating with bank servers...</p>
                                    </div>
                                </div>
                            )}

                            {payoutStep === 'success' && (
                                <div className="space-y-6">
                                    <div className="text-center">
                                        <motion.div 
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center text-emerald-500 mx-auto mb-4"
                                        >
                                            <CheckCircle2 size={48} />
                                        </motion.div>
                                        <h3 className="text-2xl font-bold text-[#0F172A]">Payment Success!</h3>
                                        <p className="text-[#64748B] text-sm">Transferred to {activePayoutInvoice === 'BULK' ? 'multiple vendors' : activePayoutInvoice.vendor}</p>
                                    </div>

                                    <div className="bg-emerald-500/5 border border-emerald-500/10 rounded-2xl p-4 flex items-center gap-3">
                                        <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm text-emerald-500">
                                            <CheckCircle2 size={20} />
                                        </div>
                                        <div>
                                            <p className="text-[13px] font-bold text-[#0F172A]">Transaction Reference</p>
                                            <p className="text-[12px] font-mono text-slate-500 uppercase">TXN_2026_09941AC</p>
                                        </div>
                                    </div>

                                    <button 
                                        onClick={() => setShowPayoutModal(false)}
                                        className="w-full bg-[#0F172A] text-white py-4 rounded-2xl font-bold hover:bg-slate-800 transition-colors"
                                    >
                                        Back to Dashboard
                                    </button>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </div>
            )}

            {/* Action Meta Modals */}
            {showActionModal && (
                <div className="fixed inset-0 bg-[#0F172A]/80 backdrop-blur-sm z-[60] flex items-center justify-center p-4 text-[#0F172A]">
                    <motion.div 
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="bg-white rounded-[32px] w-full max-w-lg overflow-hidden relative shadow-2xl"
                    >
                        <button onClick={() => setShowActionModal(false)} className="absolute right-6 top-6 p-2 text-slate-400 hover:text-slate-900 transition-colors z-10 font-bold">
                            <X size={20} />
                        </button>

                        <div className="p-8">
                            {actionType === 'view' && activeActionData && (
                                <div className="space-y-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                                            <FileText size={28} />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold">{activeActionData.vendor}</h3>
                                            <p className="text-[#64748B] text-sm font-medium">Invoice ID: {activeActionData.id}</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="bg-[#F8FAFC] p-5 rounded-2xl border border-slate-100 flex flex-col gap-1">
                                            <p className="text-[10px] font-black text-[#94A3B8] uppercase tracking-[0.1em]">Total Amount</p>
                                            <p className="text-xl font-black text-primary leading-tight">{activeActionData.amount}</p>
                                        </div>
                                        <div className="bg-[#F8FAFC] p-5 rounded-2xl border border-slate-100 flex flex-col gap-1">
                                            <p className="text-[10px] font-black text-[#94A3B8] uppercase tracking-[0.1em]">Payment Date</p>
                                            <p className="text-[14px] font-bold text-[#0F172A] leading-tight">{activeActionData.dueDate}</p>
                                        </div>
                                    </div>

                                    <div className="bg-slate-50 border border-dashed border-slate-200 rounded-2xl p-4">
                                        <p className="text-[10px] font-black text-[#94A3B8] uppercase tracking-[0.1em] mb-3">Settlement Account</p>
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-[13px] text-[#64748B]">Beneficiary Account</span>
                                            <span className="text-[13px] font-mono font-bold">**** {activeActionData.accountNumber?.slice(-4) || '8842'}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-[13px] text-[#64748B]">IFSC Registry Code</span>
                                            <span className="text-[13px] font-mono font-bold text-[#0F172A]">{activeActionData.ifsc || 'ICIC0001242'}</span>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <h4 className="text-[11px] font-black text-[#0F172A] uppercase tracking-[0.1em] flex items-center gap-2">
                                            <History size={14} className="text-primary" /> Audit Trail & History
                                        </h4>
                                        <div className="space-y-5">
                                            <div className="flex gap-4 relative">
                                                <div className="absolute left-[15px] top-[30px] bottom-[-20px] w-0.5 bg-slate-100" />
                                                <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-lg shadow-emerald-500/20 z-10">
                                                    <CheckCircle2 size={16} />
                                                </div>
                                                <div>
                                                    <p className="text-[14px] font-bold text-[#0F172A]">Payment Successfully Processed</p>
                                                    <p className="text-[12px] text-[#64748B] font-medium">Transferred via IMPS. Ref: 9941AC098842</p>
                                                    <p className="text-[11px] text-[#94A3B8] font-bold mt-1">Today, 10:42 AM</p>
                                                </div>
                                            </div>
                                            <div className="flex gap-4">
                                                <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 z-10">
                                                    <Clock size={16} />
                                                </div>
                                                <div>
                                                    <p className="text-[14px] font-bold text-[#0F172A]">Data Extracted via AI OCR</p>
                                                    <p className="text-[12px] text-[#64748B] font-medium">Confidence Score: <span className="text-emerald-600 font-bold">99.4%</span></p>
                                                    <p className="text-[11px] text-[#94A3B8] font-bold mt-1">Yesterday, 04:15 PM</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <button 
                                        onClick={() => setShowActionModal(false)}
                                        className="w-full bg-[#0F172A] text-white py-4 rounded-2xl font-black text-sm uppercase tracking-wider hover:bg-slate-800 transition-all active:scale-[0.98] shadow-xl"
                                    >
                                        Dismiss Details
                                    </button>
                                </div>
                            )}

                            {actionType === 'edit-vendor' && activeActionData && (
                                <div className="space-y-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-14 h-14 bg-indigo-500/10 rounded-2xl flex items-center justify-center text-indigo-600">
                                            <Building size={28} />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold">Edit Payment Details</h3>
                                            <p className="text-[#64748B] text-sm">Reviewing {activeActionData.id}</p>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="space-y-1.5">
                                            <label className="text-[10px] font-black uppercase text-[#94A3B8] tracking-widest pl-1">Vendor Name</label>
                                            <input 
                                                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-[14px] font-bold outline-none focus:border-primary transition-all"
                                                value={editData.vendor}
                                                onChange={(e) => setEditData({...editData, vendor: e.target.value})}
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-1.5">
                                                <label className="text-[10px] font-black uppercase text-[#94A3B8] tracking-widest pl-1">Account Number</label>
                                                <input 
                                                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-[14px] font-bold outline-none focus:border-primary transition-all"
                                                    value={editData.accountNumber}
                                                    onChange={(e) => setEditData({...editData, accountNumber: e.target.value})}
                                                />
                                            </div>
                                            <div className="space-y-1.5">
                                                <label className="text-[10px] font-black uppercase text-[#94A3B8] tracking-widest pl-1">IFSC Code</label>
                                                <input 
                                                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-[14px] font-bold outline-none focus:border-primary transition-all uppercase"
                                                    value={editData.ifsc}
                                                    onChange={(e) => setEditData({...editData, ifsc: e.target.value})}
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-[10px] font-black uppercase text-[#94A3B8] tracking-widest pl-1">Invoice Amount (With GST)</label>
                                            <input 
                                                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-[14px] font-bold outline-none focus:border-primary transition-all"
                                                value={editData.amount}
                                                onChange={(e) => setEditData({...editData, amount: e.target.value})}
                                            />
                                        </div>
                                    </div>

                                    <div className="flex gap-4 pt-2">
                                        <button 
                                            onClick={() => setShowActionModal(false)}
                                            className="flex-1 bg-slate-100 text-[#64748B] py-4 rounded-2xl font-black text-sm uppercase tracking-wider hover:bg-slate-200 transition-all"
                                        >
                                            Cancel
                                        </button>
                                        <button 
                                            onClick={handleSaveEdit}
                                            className="flex-1 bg-primary text-white py-4 rounded-2xl font-black text-sm uppercase tracking-wider hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
                                        >
                                            Update Details
                                        </button>
                                    </div>
                                </div>
                            )}

                            {actionType === 'download' && (
                                <div className="space-y-8 py-6">
                                    <div className="text-center">
                                        <div className="w-24 h-24 bg-primary/5 rounded-3xl flex items-center justify-center text-primary mx-auto mb-6 relative border border-primary/10">
                                            <Download size={40} className={downloadProgress < 100 ? "animate-bounce" : ""} />
                                            {downloadProgress < 100 && (
                                                <svg className="absolute inset-0 w-full h-full -rotate-90">
                                                    <circle
                                                        cx="48" cy="48" r="44"
                                                        fill="transparent"
                                                        stroke="currentColor"
                                                        strokeWidth="4"
                                                        className="text-slate-100"
                                                    />
                                                    <motion.circle
                                                        cx="48" cy="48" r="44"
                                                        fill="transparent"
                                                        stroke="currentColor"
                                                        strokeWidth="4"
                                                        className="text-primary"
                                                        strokeDasharray="276"
                                                        initial={{ strokeDashoffset: 276 }}
                                                        animate={{ strokeDashoffset: 276 - (276 * downloadProgress) / 100 }}
                                                    />
                                                </svg>
                                            )}
                                        </div>
                                        <h3 className="text-2xl font-black">{downloadProgress < 100 ? "Generating Ledger..." : "Invoice Downloaded!"}</h3>
                                        <p className="text-[#64748B] text-[15px] font-medium max-w-[280px] mx-auto mt-2">
                                            {downloadProgress < 100 
                                                ? "Our compliance engine is digitally signing your payout receipt." 
                                                : "The professional payout receipt has been saved to your downloads folder."}
                                        </p>
                                    </div>

                                    <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-[10px] font-black uppercase text-[#94A3B8] tracking-widest">Progress</span>
                                            <span className="text-[12px] font-black text-primary">{downloadProgress}%</span>
                                        </div>
                                        <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                                            <motion.div 
                                                className="h-full bg-primary"
                                                initial={{ width: 0 }}
                                                animate={{ width: `${downloadProgress}%` }}
                                            />
                                        </div>
                                    </div>

                                    {downloadProgress === 100 && (
                                        <div className="flex flex-col gap-3 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                            <button 
                                                onClick={() => setShowActionModal(false)}
                                                className="w-full bg-emerald-500 text-white py-4 rounded-2xl font-black text-sm uppercase tracking-wider hover:bg-emerald-600 transition-all shadow-lg active:scale-[0.98]"
                                            >
                                                Close & Return
                                            </button>
                                        </div>
                                    )}
                                </div>
                            )}

                            {actionType === 'archive' && activeActionData && (
                                <div className="space-y-8">
                                    <div className="text-center">
                                        <div className="w-20 h-20 bg-red-50 text-red-500 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-red-100 shadow-sm">
                                            <Archive size={40} />
                                        </div>
                                        <h3 className="text-2xl font-black">Cancel Invoice?</h3>
                                        <p className="text-[#64748B] text-[15px] font-medium max-w-[320px] mx-auto mt-2">
                                            This will move <span className="text-[#0F172A] font-bold">{activeActionData.id}</span> to the archive. It will no longer appear in your active ledger.
                                        </p>
                                    </div>

                                    <div className="flex gap-4">
                                        <button 
                                            onClick={() => setShowActionModal(false)}
                                            className="flex-1 bg-slate-100 text-[#475569] py-4 rounded-2xl font-black text-sm uppercase tracking-wider hover:bg-slate-200 transition-colors"
                                        >
                                            Keep It
                                        </button>
                                        <button 
                                            onClick={confirmArchive}
                                            className="flex-1 bg-red-500 text-white py-4 rounded-2xl font-black text-sm uppercase tracking-wider hover:bg-red-600 transition-all shadow-xl shadow-red-500/20 active:scale-[0.98]"
                                        >
                                            Cancel Now
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </div>
            )}

            {/* Add Vendor Modal Mockup */}
            {showAddVendor && (
                <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <motion.div 
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden border border-slate-200"
                    >
                        <div className="p-8 border-b border-slate-100 flex justify-between items-center">
                            <div>
                                <h3 className="text-xl font-black text-[#0F172A]">Add New Vendor</h3>
                                <p className="text-[#64748B] text-sm mt-1">Setup banking details for payouts.</p>
                            </div>
                            <button onClick={() => setShowAddVendor(false)} className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                                <X size={20} className="text-[#64748B]" />
                            </button>
                        </div>
                        <div className="p-8 space-y-6">
                            <div className="space-y-2">
                                <label className="text-[11px] font-black uppercase tracking-widest text-[#64748B]">Vendor Entity Name</label>
                                <input className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-primary outline-none transition-colors" placeholder="e.g. AWS India Pvt Ltd" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-[11px] font-black uppercase tracking-widest text-[#64748B]">Account Number</label>
                                    <input className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none" placeholder="0000 8888 2222" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[11px] font-black uppercase tracking-widest text-[#64748B]">IFSC Code</label>
                                    <input className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none" placeholder="HDFC0001234" />
                                </div>
                            </div>
                        </div>
                        <div className="p-6 bg-slate-50 border-t border-slate-100 flex gap-3">
                            <button onClick={() => setShowAddVendor(false)} className="flex-1 px-4 py-3 rounded-xl font-bold text-sm text-[#475569] hover:bg-slate-200 transition-colors">Cancel</button>
                            <button onClick={() => setShowAddVendor(false)} className="flex-1 bg-[#1D4ED8] text-white px-4 py-3 rounded-xl font-bold text-sm hover:bg-[#1E40AF] transition-all shadow-lg shadow-blue-500/20">Create Vendor</button>
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    );
}
