"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Landmark, Plus, Info, CheckCircle2, ChevronDown, ShieldCheck, ArrowLeft, Settings2, Calculator } from "lucide-react";
import { useState } from "react";

interface SalaryStructureModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (data: any) => void;
}

interface SalaryComponent {
    id: string;
    name: string;
    type: string;
    value: string;
    description: string;
    calculationType: 'percentage' | 'fixed' | 'balance';
    calculationBase?: 'Gross' | 'Basic' | 'CTC';
    percentageValue?: number;
    fixedAmount?: number;
}

const INITIAL_COMPONENTS: SalaryComponent[] = [
    { id: 'basic', name: 'Basic Salary', type: 'Fixed', value: '50%', description: 'Mandatory component, usually 50% of CTC.', calculationType: 'percentage', calculationBase: 'CTC', percentageValue: 50 },
    { id: 'hra', name: 'HRA', type: 'Fixed', value: '40% of Basic', description: 'House Rent Allowance for tax saving.', calculationType: 'percentage', calculationBase: 'Basic', percentageValue: 40 },
    { id: 'pf', name: 'Employer PF', type: 'Statutory', value: '12% of Basic', description: 'Statutory retirement benefit.', calculationType: 'percentage', calculationBase: 'Basic', percentageValue: 12 },
    { id: 'esi', name: 'Employer ESI', type: 'Statutory', value: '3.25% of Gross', description: 'Employee State Insurance.', calculationType: 'percentage', calculationBase: 'Gross', percentageValue: 3.25 },
    { id: 'special', name: 'Special Allowance', type: 'Fixed', value: 'Balance', description: 'Residual component to match CTC.', calculationType: 'balance' },
];

export default function SalaryStructureModal({ isOpen, onClose, onSave }: SalaryStructureModalProps) {
    const [components, setComponents] = useState<SalaryComponent[]>(INITIAL_COMPONENTS);
    const [editingComponent, setEditingComponent] = useState<SalaryComponent | null>(null);
    const [isAdding, setIsAdding] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [lastUpdatedId, setLastUpdatedId] = useState<string | null>(null);

    // Form states for adding/editing
    const [tempName, setTempName] = useState("");
    const [tempType, setTempType] = useState<any>("percentage");
    const [tempBase, setTempBase] = useState<any>("Basic");
    const [tempValue, setTempValue] = useState<number>(0);

    const openEditor = (comp: SalaryComponent | null) => {
        if (comp) {
            setEditingComponent(comp);
            setTempName(comp.name);
            setTempType(comp.calculationType);
            setTempBase(comp.calculationBase || "Basic");
            setTempValue(comp.percentageValue || comp.fixedAmount || 0);
        } else {
            setIsAdding(true);
            setTempName("");
            setTempType("percentage");
            setTempBase("Basic");
            setTempValue(10);
        }
    };

    const handleSaveComponent = () => {
        const valueStr = tempType === 'percentage' ? `${tempValue}% of ${tempBase}` : `₹${tempValue}`;
        
        const newComp: SalaryComponent = {
            id: editingComponent?.id || Math.random().toString(36).substr(2, 9),
            name: tempName,
            type: tempName.toLowerCase().includes('pf') || tempName.toLowerCase().includes('esi') ? 'Statutory' : 'Fixed',
            value: valueStr,
            description: `Custom ${tempType} component based on ${tempBase}.`,
            calculationType: tempType,
            calculationBase: tempBase,
            percentageValue: tempType === 'percentage' ? tempValue : undefined,
            fixedAmount: tempType === 'fixed' ? tempValue : undefined
        };

        if (editingComponent) {
            setComponents(prev => prev.map(c => c.id === editingComponent.id ? newComp : c));
            setLastUpdatedId(editingComponent.id);
        } else {
            // Keep "Special Allowance" (Balance) at the end
            const updated = [...components.filter(c => c.id !== 'special'), newComp, components.find(c => c.id === 'special')!];
            setComponents(updated);
            setLastUpdatedId(newComp.id);
        }
        
        setTimeout(() => setLastUpdatedId(null), 2000);
        setEditingComponent(null);
        setIsAdding(false);
    };

    const handleApply = async () => {
        setIsSaving(true);
        await new Promise(r => setTimeout(r, 1200));
        onSave(components);
        setIsSaving(false);
    };

    return (
        <AnimatePresence mode="wait">
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
                        className="relative w-full max-w-4xl h-[85vh] bg-white rounded-xl shadow-2xl overflow-hidden border border-[#E2E8F0] flex"
                    >
                        {/* Left Side: Component List (Institutional) */}
                        <div className={`flex flex-col border-r border-[#E2E8F0] transition-all duration-300 ${editingComponent || isAdding ? 'w-1/2 opacity-50 pointer-events-none grayscale-[0.5]' : 'w-full'}`}>
                            {/* Header */}
                            <div className="flex items-center justify-between px-8 py-6 border-b border-[#E2E8F0]">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-lg bg-[#0D94FB]/10 flex items-center justify-center text-[#0D94FB]">
                                        <Landmark size={20} />
                                    </div>
                                    <div className="space-y-0.5">
                                        <h2 className="text-xl font-bold text-[#012652]">Salary Structure Configuration</h2>
                                        <p className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider">Default Organization Policy</p>
                                    </div>
                                </div>
                                <button 
                                    onClick={onClose}
                                    className="p-2 hover:bg-[#F8FAFC] rounded-lg text-[#94A3B8] transition-colors"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            {/* Main List */}
                            <div className="flex-1 overflow-y-auto p-8 pt-6 space-y-6">
                                <div className="bg-[#F8FAFC] border border-[#E2E8F0] p-5 rounded-lg space-y-3">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2 text-[#0D94FB]">
                                            <ShieldCheck size={18} />
                                            <span className="text-sm font-bold tracking-tight">Standard Institutional Rules</span>
                                        </div>
                                        <span className="text-[9px] font-bold text-[#64748B] bg-white px-2 py-0.5 border border-[#E2E8F0] rounded">V2.4</span>
                                    </div>
                                    <p className="text-[12px] text-[#64748B] font-medium leading-relaxed">
                                        Defining your organization's default salary policy ensures consistency. These rules will be applied automatically during employee onboarding.
                                    </p>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-center justify-between px-2">
                                        <h3 className="text-[10px] font-bold text-[#64748B] uppercase tracking-[0.2em]">Live Components</h3>
                                        <button 
                                            onClick={() => openEditor(null)}
                                            className="flex items-center gap-1.5 text-[10px] font-bold text-[#0D94FB] hover:text-[#012652] transition-colors bg-[#0D94FB]/5 px-3 py-1.5 rounded-lg border border-[#0D94FB]/10"
                                        >
                                            <Plus size={14} strokeWidth={3} />
                                            ADD CUSTOM COMPONENT
                                        </button>
                                    </div>

                                    <div className="border border-[#E2E8F0] rounded-xl overflow-hidden divide-y divide-[#E2E8F0] shadow-sm">
                                        {components.map((comp) => (
                                            <motion.div 
                                                key={comp.id} 
                                                animate={lastUpdatedId === comp.id ? { 
                                                    backgroundColor: ["#ffffff", "#f0f9ff", "#ffffff"],
                                                    transition: { duration: 1.5 }
                                                } : {}}
                                                className="p-5 flex items-center justify-between hover:bg-[#F8FAFC] transition-colors group relative overflow-hidden"
                                            >
                                                {lastUpdatedId === comp.id && (
                                                    <motion.div 
                                                        initial={{ width: 0 }}
                                                        animate={{ width: '100%' }}
                                                        transition={{ duration: 1 }}
                                                        className="absolute bottom-0 left-0 h-0.5 bg-[#0D94FB]"
                                                    />
                                                )}
                                                <div className="flex-1 space-y-1.5">
                                                    <div className="flex items-center gap-3">
                                                        <span className="text-sm font-bold text-[#012652]">{comp.name}</span>
                                                        <span className={`px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider ${
                                                            comp.type === 'Statutory' 
                                                            ? 'bg-amber-50 text-amber-600 border border-amber-200/50' 
                                                            : 'bg-emerald-50 text-emerald-600 border border-emerald-200/50'
                                                        }`}>
                                                            {comp.type}
                                                        </span>
                                                    </div>
                                                    <p className="text-[11px] text-[#94A3B8] font-medium leading-normal max-w-sm">
                                                        {comp.description}
                                                    </p>
                                                </div>
                                                <div className="text-right shrink-0 px-6">
                                                    <div className="text-base font-bold text-[#012652] tracking-tight">{comp.value}</div>
                                                    {comp.id !== 'special' && (
                                                        <button 
                                                            onClick={() => openEditor(comp)}
                                                            className="text-[10px] font-bold text-[#0D94FB] uppercase border-b border-dashed border-[#0D94FB] hover:text-[#012652] hover:border-[#012652] transition-colors cursor-pointer"
                                                        >
                                                            Edit Rule
                                                        </button>
                                                    )}
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="px-8 py-6 bg-[#F8FAFC] border-t border-[#E2E8F0] flex items-center justify-between">
                                <div className="text-[11px] font-bold text-[#64748B] flex items-center gap-2">
                                    <Info size={14} className="text-[#0D94FB]" />
                                    <span>Changes apply to all future hires by default.</span>
                                </div>
                                <div className="flex gap-4">
                                    <button 
                                        onClick={onClose}
                                        className="px-6 py-2.5 rounded-lg text-[12px] font-bold text-[#64748B] hover:text-[#012652] transition-colors uppercase tracking-widest"
                                    >
                                        Cancel
                                    </button>
                                    <button 
                                        disabled={isSaving}
                                        onClick={handleApply}
                                        className="px-10 py-3 rounded-lg text-[12px] font-bold text-white shadow-xl bg-[#012652] hover:bg-[#0D94FB] shadow-[#012652]/20 transition-all flex items-center gap-3 uppercase tracking-widest"
                                    >
                                        {isSaving ? (
                                            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        ) : (
                                            <CheckCircle2 size={18} />
                                        )}
                                        {isSaving ? "Persisting..." : "Apply Policy"}
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Right Side: Editor (Dynamic Sub-Panel) */}
                        <AnimatePresence>
                            {(editingComponent || isAdding) && (
                                <motion.div 
                                    initial={{ x: '100%' }}
                                    animate={{ x: 0 }}
                                    exit={{ x: '100%' }}
                                    transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                                    className="w-1/2 bg-[#F8FAFC] border-l border-[#E2E8F0] flex flex-col shadow-[-20px_0_40px_rgba(0,0,0,0.05)] z-20"
                                >
                                    <div className="p-10 flex-1 space-y-10">
                                        <div className="flex items-center justify-between">
                                            <div className="space-y-1">
                                                <h3 className="text-lg font-bold text-[#012652]">{isAdding ? 'Assemble New Component' : 'Edit Calculation Rule'}</h3>
                                                <p className="text-[11px] font-bold text-[#64748B] uppercase tracking-[0.2em]">{editingComponent?.name || 'Custom Definition'}</p>
                                            </div>
                                            <button 
                                                onClick={() => { setEditingComponent(null); setIsAdding(false); }}
                                                className="w-8 h-8 rounded-full bg-white border border-[#E2E8F0] flex items-center justify-center text-[#64748B] hover:text-[#0D94FB] shadow-sm transition-colors"
                                            >
                                                <ArrowLeft size={16} />
                                            </button>
                                        </div>

                                        <div className="space-y-8">
                                            {/* Component Name */}
                                            <div className="space-y-3">
                                                <label className="text-[10px] font-bold text-[#64748B] uppercase tracking-widest">Component Display Name</label>
                                                <input 
                                                    type="text" 
                                                    value={tempName}
                                                    onChange={(e) => setTempName(e.target.value)}
                                                    onKeyDown={(e) => e.key === 'Enter' && handleSaveComponent()}
                                                    placeholder="e.g. Travel Stipend"
                                                    className="w-full bg-white border border-[#E2E8F0] rounded-xl px-5 py-3.5 text-sm font-bold text-[#012652] focus:ring-2 focus:ring-[#0D94FB]/20 focus:outline-none transition-all placeholder:text-[#CBD5E1]"
                                                />
                                            </div>

                                            {/* Calculation Logic Selector */}
                                            <div className="space-y-4">
                                                <label className="text-[10px] font-bold text-[#64748B] uppercase tracking-widest">Calculation Engine</label>
                                                <div className="grid grid-cols-2 gap-3">
                                                    <button 
                                                        onClick={() => setTempType('percentage')}
                                                        className={`p-4 rounded-xl border flex flex-col gap-2 text-left transition-all ${tempType === 'percentage' ? 'bg-white border-[#0D94FB] shadow-sm ring-1 ring-[#0D94FB]' : 'bg-white border-[#E2E8F0] hover:bg-gray-50'}`}
                                                    >
                                                        <Calculator size={20} className={tempType === 'percentage' ? 'text-[#0D94FB]' : 'text-[#64748B]'} />
                                                        <div>
                                                            <p className={`text-[12px] font-bold ${tempType === 'percentage' ? 'text-[#012652]' : 'text-[#64748B]'}`}>Dynamic %</p>
                                                            <p className="text-[10px] text-[#94A3B8]">Based on Gross/Basic</p>
                                                        </div>
                                                    </button>
                                                    <button 
                                                        onClick={() => setTempType('fixed')}
                                                        className={`p-4 rounded-xl border flex flex-col gap-2 text-left transition-all ${tempType === 'fixed' ? 'bg-white border-[#0D94FB] shadow-sm ring-1 ring-[#0D94FB]' : 'bg-white border-[#E2E8F0] hover:bg-gray-50'}`}
                                                    >
                                                        <Settings2 size={20} className={tempType === 'fixed' ? 'text-[#0D94FB]' : 'text-[#64748B]'} />
                                                        <div>
                                                            <p className={`text-[12px] font-bold ${tempType === 'fixed' ? 'text-[#012652]' : 'text-[#64748B]'}`}>Fixed Amount</p>
                                                            <p className="text-[10px] text-[#94A3B8]">Static currency value</p>
                                                        </div>
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Logic Details */}
                                            <div className="bg-white border border-[#E2E8F0] rounded-xl p-8 space-y-6 shadow-sm">
                                                {tempType === 'percentage' && (
                                                    <div className="space-y-6">
                                                        <div className="flex items-center justify-between">
                                                            <p className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider">Percentage of Base</p>
                                                            <div className="flex bg-[#F8FAFC] p-1 rounded-lg border border-[#E2E8F0]">
                                                                {['Gross', 'Basic', 'CTC'].map((b) => (
                                                                    <button 
                                                                        key={b}
                                                                        onClick={() => setTempBase(b)}
                                                                        className={`px-3 py-1 text-[10px] font-bold rounded ${tempBase === b ? 'bg-white text-[#0D94FB] shadow-sm' : 'text-[#94A3B8]'}`}
                                                                    >
                                                                        {b}
                                                                    </button>
                                                                ))}
                                                            </div>
                                                        </div>
                                                        <div className="relative">
                                                            <input 
                                                                type="number" 
                                                                value={tempValue}
                                                                onChange={(e) => setTempValue(Number(e.target.value))}
                                                                onKeyDown={(e) => e.key === 'Enter' && handleSaveComponent()}
                                                                className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg px-5 py-4 text-3xl font-bold text-[#012652] focus:outline-none pr-12"
                                                            />
                                                            <span className="absolute right-5 top-1/2 -translate-y-1/2 text-2xl font-bold text-[#CBD5E1]">%</span>
                                                        </div>
                                                    </div>
                                                )}

                                                {tempType === 'fixed' && (
                                                    <div className="space-y-6">
                                                        <p className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider">Absolute Monthly Amount</p>
                                                        <div className="relative">
                                                            <span className="absolute left-5 top-1/2 -translate-y-1/2 text-2xl font-bold text-[#CBD5E1]">₹</span>
                                                            <input 
                                                                type="number" 
                                                                value={tempValue}
                                                                onChange={(e) => setTempValue(Number(e.target.value))}
                                                                onKeyDown={(e) => e.key === 'Enter' && handleSaveComponent()}
                                                                className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg px-12 py-4 text-3xl font-bold text-[#012652] focus:outline-none"
                                                            />
                                                        </div>
                                                    </div>
                                                )}
                                                
                                                <div className="pt-4 border-t border-[#F1F5F9] flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-[#10B981]/10 flex items-center justify-center text-[#10B981]">
                                                        <ShieldCheck size={16} />
                                                    </div>
                                                    <p className="text-[11px] font-medium text-[#64748B]">This formula aligns with the current <span className="font-bold text-[#012652]">Income Tax Act</span> guidelines for payroll processing.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Sub-panel Footer */}
                                    <div className="p-8 border-t border-[#E2E8F0] flex gap-4">
                                        <button 
                                            disabled={!tempName || tempValue <= 0}
                                            onClick={handleSaveComponent}
                                            className="flex-1 bg-[#0D94FB] text-white py-4 rounded-xl font-bold text-sm uppercase tracking-widest shadow-lg shadow-[#0D94FB]/20 hover:bg-[#012652] transition-all disabled:opacity-50 disabled:grayscale"
                                        >
                                            Finalize Rule
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
