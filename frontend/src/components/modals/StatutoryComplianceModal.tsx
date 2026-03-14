"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ShieldCheck, FileText, Landmark, Info, CheckCircle2, ChevronRight, Upload, Building2, Scale, Briefcase, FileSearch, Loader2 } from "lucide-react";
import { useState } from "react";

interface StatutoryComplianceModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (data: any) => void;
}

type ComplianceTab = 'pf' | 'esi' | 'pt' | 'lwf';

export default function StatutoryComplianceModal({ isOpen, onClose, onSave }: StatutoryComplianceModalProps) {
    const [activeTab, setActiveTab] = useState<ComplianceTab>('pf');
    const [isSaving, setIsSaving] = useState(false);

    const [complianceData, setComplianceData] = useState({
        pf: { id: "", signatory: "", estDate: "" },
        esi: { id: "", localOffice: "", branch: "" },
        pt: { state: "Maharashtra", id: "", freq: "Monthly" },
        lwf: { enabled: true, id: "" }
    });

    const handleSave = async () => {
        setIsSaving(true);
        // Simulate institutional sync
        await new Promise(r => setTimeout(r, 1500));
        onSave(complianceData);
        setIsSaving(false);
    };

    const tabs = [
        { id: 'pf', label: 'Provident Fund (PF)', icon: Landmark },
        { id: 'esi', label: 'ESI Scheme', icon: ShieldCheck },
        { id: 'pt', label: 'Professional Tax', icon: Building2 },
        { id: 'lwf', label: 'Labour Welfare Fund', icon: Scale },
    ];

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
                        className="relative w-full max-w-5xl h-[80vh] bg-white rounded-xl shadow-2xl overflow-hidden border border-[#E2E8F0] flex"
                    >
                        {/* Sidebar Navigation */}
                        <div className="w-80 border-r border-[#E2E8F0] bg-[#F8FAFC] flex flex-col">
                            <div className="p-8 border-b border-[#E2E8F0] bg-white">
                                <div className="flex items-center gap-3 text-[#012652] mb-1">
                                    <Scale size={20} className="text-[#0D94FB]" />
                                    <h2 className="text-lg font-bold">Compliance Node</h2>
                                </div>
                                <p className="text-[10px] font-bold text-[#64748B] uppercase tracking-[0.15em]">Statutory Registrations</p>
                            </div>

                            <div className="flex-1 py-6">
                                {tabs.map((tab) => {
                                    const Icon = tab.icon;
                                    const isActive = activeTab === tab.id;
                                    return (
                                        <button
                                            key={tab.id}
                                            onClick={() => setActiveTab(tab.id as ComplianceTab)}
                                            className={`w-full flex items-center gap-4 px-8 py-4 text-left transition-all relative ${
                                                isActive 
                                                ? "bg-white text-[#0D94FB]" 
                                                : "text-[#64748B] hover:bg-[#F1F5F9] hover:text-[#012652]"
                                            }`}
                                        >
                                            {isActive && <motion.div layoutId="activeTab" className="absolute left-0 top-0 bottom-0 w-1 bg-[#0D94FB]" />}
                                            <Icon size={18} className={isActive ? "text-[#0D94FB]" : ""} />
                                            <span className="text-[13px] font-bold">{tab.label}</span>
                                        </button>
                                    );
                                })}
                            </div>

                            <div className="p-6 border-t border-[#E2E8F0] bg-white/50">
                                <div className="bg-[#0D94FB]/5 border border-[#0D94FB]/20 p-4 rounded-lg space-y-2">
                                    <div className="flex items-center gap-2 text-[#0D94FB]">
                                        <Info size={14} />
                                        <span className="text-[10px] font-bold uppercase tracking-wider">Legal Notice</span>
                                    </div>
                                    <p className="text-[10px] text-[#64748B] font-medium leading-relaxed">
                                        Registrations are verified against MCA & NSDL databases for tax filing compliance.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Content Area */}
                        <div className="flex-1 flex flex-col bg-white">
                            {/* Head Area */}
                            <div className="px-10 py-8 border-b border-[#E2E8F0] flex items-center justify-between">
                                <div className="space-y-1">
                                    <h3 className="text-xl font-bold text-[#012652]">{tabs.find(t => t.id === activeTab)?.label}</h3>
                                    <p className="text-sm text-[#64748B] font-medium italic">Configure your organization's legal mandate for this pillar.</p>
                                </div>
                                <button onClick={onClose} className="p-2 hover:bg-[#F8FAFC] rounded-lg text-[#94A3B8] transition-colors">
                                    <X size={20} />
                                </button>
                            </div>

                            {/* Scrollable Form Area */}
                            <div className="flex-1 overflow-y-auto p-12 space-y-10">
                                {activeTab === 'pf' && (
                                    <div className="max-w-xl space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                                        <div className="grid grid-cols-1 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider">PF Establishment ID</label>
                                                <input 
                                                    type="text" 
                                                    placeholder="e.g. MHBAN0012345000"
                                                    value={complianceData.pf.id}
                                                    onChange={e => setComplianceData({...complianceData, pf: {...complianceData.pf, id: e.target.value}})}
                                                    className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg px-4 py-3 text-sm font-bold text-[#012652] focus:ring-2 focus:ring-[#0D94FB]/10 focus:outline-none"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider">Authorized Signatory Name</label>
                                                <input 
                                                    type="text" 
                                                    placeholder="Full Legal Name"
                                                    value={complianceData.pf.signatory}
                                                    onChange={e => setComplianceData({...complianceData, pf: {...complianceData.pf, signatory: e.target.value}})}
                                                    className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg px-4 py-3 text-sm font-bold text-[#012652] focus:ring-2 focus:ring-[#0D94FB]/10 focus:outline-none"
                                                />
                                            </div>
                                        </div>

                                        <div className="p-8 border-2 border-dashed border-[#E2E8F0] rounded-xl bg-[#F8FAFC] text-center space-y-4 hover:border-[#0D94FB]/30 transition-all cursor-pointer group">
                                            <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mx-auto text-[#94A3B8] group-hover:text-[#0D94FB] shadow-sm transition-colors">
                                                <Upload size={24} />
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-sm font-bold text-[#012652]">Upload Registration Copy</p>
                                                <p className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">PDF, PNG or JPG (Max 5MB)</p>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'esi' && (
                                    <div className="max-w-xl space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                                        <div className="grid grid-cols-1 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider">ESI Code Number</label>
                                                <input 
                                                    type="text" 
                                                    placeholder="17 Digit Code"
                                                    value={complianceData.esi.id}
                                                    onChange={e => setComplianceData({...complianceData, esi: {...complianceData.esi, id: e.target.value}})}
                                                    className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg px-4 py-3 text-sm font-bold text-[#012652] focus:ring-2 focus:ring-[#0D94FB]/10 focus:outline-none"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider">ESI Local Office</label>
                                                <input 
                                                    type="text" 
                                                    placeholder="Branch / Region Office"
                                                    value={complianceData.esi.localOffice}
                                                    onChange={e => setComplianceData({...complianceData, esi: {...complianceData.esi, localOffice: e.target.value}})}
                                                    className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg px-4 py-3 text-sm font-bold text-[#012652] focus:ring-2 focus:ring-[#0D94FB]/10 focus:outline-none"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'pt' && (
                                    <div className="max-w-xl space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                                        <div className="grid grid-cols-1 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider">Registered State</label>
                                                <select 
                                                    value={complianceData.pt.state}
                                                    onChange={e => setComplianceData({...complianceData, pt: {...complianceData.pt, state: e.target.value}})}
                                                    className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg px-4 py-3 text-sm font-bold text-[#012652] focus:ring-2 focus:ring-[#0D94FB]/10 focus:outline-none"
                                                >
                                                    <option>Maharashtra</option>
                                                    <option>Karnataka</option>
                                                    <option>Tamil Nadu</option>
                                                    <option>Delhi</option>
                                                    <option>Telangana</option>
                                                </select>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider">PT Certificate Number</label>
                                                <input 
                                                    type="text" 
                                                    placeholder="State issued ID"
                                                    value={complianceData.pt.id}
                                                    onChange={e => setComplianceData({...complianceData, pt: {...complianceData.pt, id: e.target.value}})}
                                                    className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg px-4 py-3 text-sm font-bold text-[#012652] focus:ring-2 focus:ring-[#0D94FB]/10 focus:outline-none"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'lwf' && (
                                    <div className="max-w-xl space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                                        <div className="flex items-center justify-between p-6 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl">
                                            <div className="space-y-1">
                                                <p className="text-sm font-bold text-[#012652]">Apply Labour Welfare Fund (LWF)</p>
                                                <p className="text-[10px] text-[#64748B] font-medium leading-relaxed">Required for commercial establishments with 5+ employees in specific states.</p>
                                            </div>
                                            <button 
                                                onClick={() => setComplianceData({...complianceData, lwf: {...complianceData.lwf, enabled: !complianceData.lwf.enabled}})}
                                                className={`w-12 h-6 rounded-full transition-all relative ${complianceData.lwf.enabled ? 'bg-[#0D94FB]' : 'bg-[#CBD5E1]'}`}
                                            >
                                                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${complianceData.lwf.enabled ? 'left-7' : 'left-1'}`} />
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Footer Action */}
                            <div className="px-12 py-8 bg-[#F8FAFC] border-t border-[#E2E8F0] flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-[#10B981]/10 flex items-center justify-center text-[#10B981]">
                                        <ShieldCheck size={16} />
                                    </div>
                                    <span className="text-[11px] font-bold text-[#64748B] uppercase tracking-widest">AES-256 Vault Encryption Active</span>
                                </div>
                                <div className="flex gap-4">
                                    <button onClick={onClose} className="px-8 py-3 text-[12px] font-bold text-[#64748B] uppercase tracking-widest hover:text-[#012652] transition-colors">Draft Only</button>
                                    <button 
                                        onClick={handleSave}
                                        disabled={isSaving}
                                        className="px-12 py-3 bg-[#0D94FB] text-white rounded-xl font-bold text-[12px] uppercase tracking-[0.2em] shadow-lg shadow-[#0D94FB]/20 hover:bg-[#012652] transition-all flex items-center gap-3 disabled:opacity-50"
                                    >
                                        {isSaving ? <Loader2 size={16} className="animate-spin" /> : <CheckCircle2 size={18} />}
                                        {isSaving ? "Synchronizing..." : "Finalize Registration"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
