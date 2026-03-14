"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Users, UserPlus, Upload, ShieldCheck, CheckCircle2, ChevronRight, Landmark, Mail, CreditCard, Wallet, FileSpreadsheet, Loader2 } from "lucide-react";
import { useState, useEffect, useRef } from "react";

interface AddEmployeeModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (employees: any[]) => void;
    salaryPolicy: any[]; // Inherited from Step 2
}

export default function AddEmployeeModal({ isOpen, onClose, onSave, salaryPolicy }: AddEmployeeModalProps) {
    const [activeTab, setActiveTab] = useState<'manual' | 'bulk'>('manual');
    const [isSaving, setIsSaving] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const fileInputRef = useRef<HTMLInputElement>(null);
    
    // Manual Form State
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        grossSalary: "",
        joiningDate: new Date().toISOString().split('T')[0],
        designation: ""
    });

    const [calculatedBreakdown, setCalculatedBreakdown] = useState<any[]>([]);

    // Logic: Calculate salary breakdown based on policy
    useEffect(() => {
        if (!formData.grossSalary || parseFloat(formData.grossSalary) <= 0) {
            setCalculatedBreakdown([]);
            return;
        }

        const annualGross = parseFloat(formData.grossSalary);
        const monthlyGross = annualGross / 12;
        
        // Simplified calculation logic for preview (working on monthly basis)
        const basicPercent = salaryPolicy.find(p => p.id === 'basic')?.percentageValue || 50;
        const monthlyBasic = (monthlyGross * basicPercent) / 100;

        const breakdown = salaryPolicy.map(policy => {
            let amount = 0;
            if (policy.calculationType === 'percentage') {
                const baseValue = policy.calculationBase === 'Basic' ? monthlyBasic : 
                                 policy.calculationBase === 'Gross' ? monthlyGross : monthlyGross; // Default to gross for CTC/Gross in monthly preview
                amount = (baseValue * (policy.percentageValue || 0)) / 100;
            } else if (policy.calculationType === 'fixed') {
                amount = (policy.fixedAmount || 0) / 12; // Convert fixed annual to monthly
            } else if (policy.calculationType === 'balance') {
                // Simplified balance calculation for monthly preview
                const otherComponentsSum = salaryPolicy
                    .filter(p => p.calculationType !== 'balance' && p.id !== policy.id)
                    .reduce((sum, p) => {
                        let pAmt = 0;
                        if (p.calculationType === 'percentage') {
                            const bVal = p.calculationBase === 'Basic' ? monthlyBasic : monthlyGross;
                            pAmt = (bVal * (p.percentageValue || 0)) / 100;
                        } else if (p.calculationType === 'fixed') {
                            pAmt = (p.fixedAmount || 0) / 12;
                        }
                        return sum + pAmt;
                    }, 0);
                amount = monthlyGross - otherComponentsSum;
            }
            return { ...policy, amount };
        });

        setCalculatedBreakdown(breakdown);
    }, [formData.grossSalary, salaryPolicy]);

    const handleSaveManual = async () => {
        setIsSaving(true);
        await new Promise(r => setTimeout(r, 1200));
        onSave([{ ...formData, breakdown: calculatedBreakdown }]);
        setIsSaving(false);
    };

    const handleDownloadTemplate = () => {
        const headers = ["Full Name", "Email", "Annual CTC", "Designation", "Joining Date"];
        const csvContent = "data:text/csv;charset=utf-8," + headers.join(",");
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "novapayroll_employee_template.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files?.length) return;
        
        setIsUploading(true);
        setUploadProgress(0);
        
        // Professional simulation of bulk processing
        const interval = setInterval(() => {
            setUploadProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(() => {
                        setIsUploading(false);
                        // Mock 5 employees added
                        onSave(Array(5).fill({
                            fullName: "Bulk Employee",
                            email: "bulk@company.com",
                            grossSalary: "1200000",
                            designation: "Software Engineer",
                            joiningDate: new Date().toISOString().split('T')[0]
                        }));
                    }, 500);
                    return 100;
                }
                return prev + 5;
            });
        }, 100);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-[#012652]/40 backdrop-blur-sm"
                    />
                    
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative w-full max-w-5xl h-[85vh] bg-white rounded-xl shadow-2xl overflow-hidden border border-[#E2E8F0] flex flex-col"
                    >
                        {/* Header */}
                        <div className="px-8 py-6 border-b border-[#E2E8F0] flex items-center justify-between bg-white relative z-10">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-lg bg-[#0D94FB]/10 flex items-center justify-center text-[#0D94FB]">
                                    <Users size={20} />
                                </div>
                                <div className="space-y-0.5">
                                    <h2 className="text-xl font-bold text-[#012652]">Onboard Workforce</h2>
                                    <p className="text-[11px] font-bold text-[#64748B] uppercase tracking-widest">Step 3: Identity & Compensation</p>
                                </div>
                            </div>
                            <div className="flex bg-[#F8FAFC] p-1 rounded-xl border border-[#E2E8F0]">
                                <button 
                                    onClick={() => setActiveTab('manual')}
                                    className={`px-6 py-2 text-[12px] font-bold rounded-lg transition-all flex items-center gap-2 ${activeTab === 'manual' ? 'bg-white text-[#0D94FB] shadow-sm' : 'text-[#64748B]'}`}
                                >
                                    <UserPlus size={16} />
                                    Manual Entry
                                </button>
                                <button 
                                    onClick={() => setActiveTab('bulk')}
                                    className={`px-6 py-2 text-[12px] font-bold rounded-lg transition-all flex items-center gap-2 ${activeTab === 'bulk' ? 'bg-white text-[#0D94FB] shadow-sm' : 'text-[#64748B]'}`}
                                >
                                    <Upload size={16} />
                                    Bulk Upload
                                </button>
                            </div>
                            <button onClick={onClose} className="p-2 hover:bg-[#F8FAFC] rounded-lg text-[#94A3B8] transition-colors">
                                <X size={20} />
                            </button>
                        </div>

                        {/* Content Scrollable */}
                        <div className="flex-1 overflow-y-auto bg-[#F8FAFC]/30 flex">
                            {activeTab === 'manual' ? (
                                <>
                                    {/* Form Section */}
                                    <div className="w-3/5 p-10 space-y-8 bg-white border-r border-[#E2E8F0]">
                                        <div className="space-y-6">
                                            <h3 className="text-[11px] font-bold text-[#64748B] uppercase tracking-[0.2em] px-1">Personal & Professional Info</h3>
                                            <div className="grid grid-cols-2 gap-6">
                                                <div className="space-y-2">
                                                    <label className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider">Full Legal Name</label>
                                                    <div className="relative">
                                                        <input 
                                                            type="text" 
                                                            placeholder="John Doe"
                                                            value={formData.fullName}
                                                            onChange={e => setFormData({...formData, fullName: e.target.value})}
                                                            className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg px-4 py-3 text-sm font-bold text-[#012652] focus:ring-2 focus:ring-[#0D94FB]/10 focus:outline-none"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider">Work Email Address</label>
                                                    <div className="relative flex items-center">
                                                        <Mail className="absolute left-3 text-[#94A3B8]" size={16} />
                                                        <input 
                                                            type="email" 
                                                            placeholder="john@company.com"
                                                            value={formData.email}
                                                            onChange={e => setFormData({...formData, email: e.target.value})}
                                                            className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg pl-10 pr-4 py-3 text-sm font-bold text-[#012652] focus:ring-2 focus:ring-[#0D94FB]/10 focus:outline-none"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider">Designation / Role</label>
                                                    <input 
                                                        type="text" 
                                                        placeholder="Product Manager"
                                                        value={formData.designation}
                                                        onChange={e => setFormData({...formData, designation: e.target.value})}
                                                        className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg px-4 py-3 text-sm font-bold text-[#012652] focus:ring-2 focus:ring-[#0D94FB]/10 focus:outline-none"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider">Joining Date</label>
                                                    <input 
                                                        type="date" 
                                                        value={formData.joiningDate}
                                                        onChange={e => setFormData({...formData, joiningDate: e.target.value})}
                                                        className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg px-4 py-3 text-sm font-bold text-[#012652] focus:ring-2 focus:ring-[#0D94FB]/10 focus:outline-none"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-6 pt-4">
                                            <h3 className="text-[11px] font-bold text-[#64748B] uppercase tracking-[0.2em] px-1 flex items-center justify-between">
                                                <span>Salary Configuration</span>
                                                <span className="text-[9px] bg-[#0D94FB]/10 text-[#0D94FB] px-2 py-0.5 rounded border border-[#0D94FB]/20">Inheriting Org Policy</span>
                                            </h3>
                                            <div className="space-y-4">
                                                <div className="space-y-2">
                                                    <label className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider text-[#012652]">Annual Gross CTC (INR)</label>
                                                    <div className="relative">
                                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg font-bold text-[#CBD5E1]">₹</span>
                                                        <input 
                                                            type="number" 
                                                            placeholder="e.g. 1200000"
                                                            value={formData.grossSalary}
                                                            onChange={e => setFormData({...formData, grossSalary: e.target.value})}
                                                            className="w-full bg-white border-2 border-[#E2E8F0] rounded-xl pl-10 pr-4 py-3.5 text-lg font-bold text-[#012652] focus:border-[#0D94FB] focus:outline-none transition-all"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Preview Section */}
                                    <div className="w-2/5 p-10 space-y-8 overflow-y-auto">
                                        <div className="space-y-2">
                                            <h3 className="text-[11px] font-bold text-[#64748B] uppercase tracking-[0.2em]">Calculation Preview</h3>
                                            <p className="text-[10px] text-[#94A3B8] font-medium italic">Estimated monthly breakdown based on organization rules.</p>
                                        </div>

                                        <div className="bg-white border border-[#E2E8F0] rounded-xl shadow-sm overflow-hidden">
                                            <div className="p-5 border-b border-[#E2E8F0] bg-[#F8FAFC] flex justify-between items-center">
                                                <div className="text-[11px] font-bold text-[#012652]">MONTHLY GROSS</div>
                                                <div className="text-sm font-bold text-[#012652]">
                                                    ₹{formData.grossSalary ? (parseFloat(formData.grossSalary) / 12).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '0.00'}
                                                </div>
                                            </div>
                                            <div className="divide-y divide-[#E2E8F0]">
                                                {calculatedBreakdown.length > 0 ? calculatedBreakdown.map((row, idx) => (
                                                    <div key={idx} className="p-4 flex justify-between items-center hover:bg-gray-50 transition-colors">
                                                        <div className="space-y-0.5">
                                                            <div className="text-[12px] font-bold text-[#012652]">{row.name}</div>
                                                            <div className="text-[9px] text-[#94A3B8] font-bold uppercase">{row.value}</div>
                                                        </div>
                                                        <div className="text-[13px] font-bold text-[#012652]">₹{row.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                                                    </div>
                                                ) ) : (
                                                    <div className="p-12 text-center space-y-3">
                                                        <Wallet className="mx-auto text-[#CBD5E1]" size={32} />
                                                        <p className="text-xs text-[#94A3B8] font-medium leading-relaxed">Enter an annual CTC to view the legal salary breakdown.</p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <div className="bg-[#10B981]/5 border border-[#10B981]/20 p-5 rounded-xl flex gap-4">
                                            <ShieldCheck className="text-[#10B981] shrink-0" size={20} />
                                            <div className="space-y-1">
                                                <p className="text-[12px] font-bold text-[#065F46]">Compliance Validated</p>
                                                <p className="text-[11px] text-[#065F46]/70 leading-relaxed font-medium">This breakdown satisfies all Professional Tax (PT), Provident Fund (PF), and ESI requirements for the current financial year.</p>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <div className="w-full flex items-center justify-center p-20">
                                    <div className="max-w-md w-full text-center space-y-8 bg-white p-12 rounded-2xl border border-[#E2E8F0] shadow-sm relative overflow-hidden">
                                        <AnimatePresence>
                                            {isUploading && (
                                                <motion.div 
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    className="absolute inset-0 bg-white/90 backdrop-blur-sm z-20 flex flex-col items-center justify-center p-8 space-y-6"
                                                >
                                                    <div className="relative w-20 h-20">
                                                        <svg className="w-full h-full" viewBox="0 0 100 100">
                                                            <circle className="text-[#F1F5F9] stroke-current" strokeWidth="8" cx="50" cy="50" r="40" fill="transparent"></circle>
                                                            <motion.circle 
                                                                className="text-[#0D94FB] stroke-current" 
                                                                strokeWidth="8" 
                                                                strokeLinecap="round" 
                                                                cx="50" 
                                                                cy="50" 
                                                                r="40" 
                                                                fill="transparent"
                                                                strokeDasharray="251.2"
                                                                animate={{ strokeDashoffset: 251.2 - (251.2 * uploadProgress) / 100 }}
                                                                transition={{ ease: "linear" }}
                                                            ></motion.circle>
                                                        </svg>
                                                        <div className="absolute inset-0 flex items-center justify-center">
                                                            <span className="text-[12px] font-bold text-[#0D94FB]">{uploadProgress}%</span>
                                                        </div>
                                                    </div>
                                                    <div className="space-y-1">
                                                        <p className="text-sm font-bold text-[#012652]">Parsing Directory...</p>
                                                        <p className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Mapping columns to registry</p>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>

                                        <div className="w-16 h-16 bg-[#0D94FB]/10 rounded-2xl flex items-center justify-center text-[#0D94FB] mx-auto">
                                            <FileSpreadsheet size={32} />
                                        </div>
                                        <div className="space-y-2">
                                            <h3 className="text-xl font-bold text-[#012652]">Import Bulk Directory</h3>
                                            <p className="text-sm text-[#64748B] leading-relaxed">Import your entire workforce from a CSV or XLSX file. We'll automatically map the columns for you.</p>
                                        </div>
                                        <div className="space-y-4">
                                            <input 
                                                type="file" 
                                                ref={fileInputRef}
                                                accept=".csv,.xlsx,.xls"
                                                className="hidden" 
                                                onChange={handleFileUpload}
                                            />
                                            <button 
                                                onClick={() => fileInputRef.current?.click()}
                                                className="w-full py-4 bg-[#012652] text-white rounded-xl font-bold text-sm shadow-xl shadow-[#012652]/20 hover:bg-[#0D94FB] transition-all flex items-center justify-center gap-3"
                                            >
                                                <Upload size={18} />
                                                Select File to Upload
                                            </button>
                                            <p 
                                                onClick={handleDownloadTemplate}
                                                className="text-[10px] font-bold text-[#64748B] uppercase tracking-widest cursor-pointer hover:text-[#0D94FB] flex items-center justify-center gap-2 group"
                                            >
                                                <span>Download Excel Template</span>
                                                <ChevronRight size={12} className="group-hover:translate-x-1 transition-transform" />
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        <div className="px-8 py-6 bg-white border-t border-[#E2E8F0] flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="text-[#0D94FB]" size={18} />
                                <span className="text-[11px] font-bold text-[#64748B]">All data is encrypted and saved to your secure cloud database.</span>
                            </div>
                            <div className="flex gap-4">
                                <button onClick={onClose} className="px-8 py-3 text-[12px] font-bold text-[#64748B] uppercase tracking-widest hover:text-[#012652] transition-colors">Discard</button>
                                <button 
                                    disabled={activeTab === 'manual' && (!formData.fullName || !formData.grossSalary) || isSaving}
                                    onClick={handleSaveManual}
                                    className="px-12 py-3 bg-[#0D94FB] text-white rounded-xl font-bold text-[12px] uppercase tracking-[0.2em] shadow-lg shadow-[#0D94FB]/20 hover:bg-[#012652] transition-all flex items-center gap-3 disabled:opacity-50 disabled:grayscale"
                                >
                                    {isSaving ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <ChevronRight size={18} />}
                                    {isSaving ? "Syncing..." : "Add to Registry"}
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
