"use client";

import { motion, AnimatePresence } from "framer-motion";
import DashboardLayout from "@/components/layout/DashboardLayout";
import {
    Zap, CheckCircle2, Lock, ChevronRight,
    UserPlus, Clock, Landmark,
    Users, BarChart3, ArrowRight, ArrowUpRight, HelpCircle,
    Shield, Briefcase, FileText, UserCheck
} from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import PayrollDateModal from "@/components/modals/PayrollDateModal";
import SalaryStructureModal from "@/components/modals/SalaryStructureModal";
import AddEmployeeModal from "@/components/modals/AddEmployeeModal";
import StatutoryComplianceModal from "@/components/modals/StatutoryComplianceModal";
import VerificationModal, { VerificationMode } from "@/components/modals/VerificationModal";
import FinalActivationModal from "@/components/modals/FinalActivationModal";
import InviteDelegateModal from "@/components/modals/InviteDelegateModal";
import ResourceHubModal, { ResourceTab } from "@/components/modals/ResourceHubModal";

const SETUP_STEPS = [
    {
        category: "Basic details",
        steps: [
            { id: 1, title: "Set payroll date", status: "active", duration: "2 mins", description: "Define the salary disbursement cycle for your organization." },
            { id: 2, title: "Set employee salary structure", status: "locked", duration: "5 mins", description: "Configure base, HRA, LTA and other statutory components." },
        ]
    },
    {
        category: "Compliance and people",
        steps: [
            { id: 3, title: "Add employee details", status: "locked", duration: "10 mins", description: "Onboard your workforce via bulk upload or manual entry." },
            { id: 4, title: "Statutory compliance setup", status: "locked", duration: "8 mins", description: "Link PF, ESI, Professional Tax and LWF registrations." },
        ]
    },
    {
        category: "Verification",
        steps: [
            { id: 5, title: "Verify organization PAN", status: "locked", duration: "1 min", description: "Validate legal identity for tax filing and bank mandates." },
            { id: 6, title: "Bank account verification", status: "locked", duration: "3 mins", description: "Connect corporate account for automated fund transfers." },
        ]
    },
    {
        category: "Live Execution",
        steps: [
            { id: 7, title: "Initialize first payroll", status: "locked", duration: "5 mins", description: "Generate the first salary register for your onboarded employees." }
        ]
    }
];

export default function DashboardOverview() {
    const [isDateModalOpen, setIsDateModalOpen] = useState(false);
    const [isSalaryModalOpen, setIsSalaryModalOpen] = useState(false);
    const [isEmployeeModalOpen, setIsEmployeeModalOpen] = useState(false);
    const [isComplianceModalOpen, setIsComplianceModalOpen] = useState(false);
    const [isVerificationModalOpen, setIsVerificationModalOpen] = useState(false);
    const [isFinalModalOpen, setIsFinalModalOpen] = useState(false);
    const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
    const [isResourceModalOpen, setIsResourceModalOpen] = useState(false);
    const [resourceTab, setResourceTab] = useState<ResourceTab>('Docs');
    const [verificationMode, setVerificationMode] = useState<VerificationMode>('pan');
    const [onboardingData, setOnboardingData] = useState<any>(null);
    const [employees, setEmployees] = useState<any[]>([]);
    const [currentStep, setCurrentStep] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [showSuccessToast, setShowSuccessToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("Configuration saved successfully");

    // Mock orgId for now - in production this comes from Auth Context
    const orgId = "123e4567-e89b-12d3-a456-426614174000"; 

    useEffect(() => {
        fetchOrgData();
    }, []);

    const fetchOrgData = async () => {
        try {
            // Priority 1: Check Local Storage (for persistent demo experience)
            const savedData = localStorage.getItem('nova_onboarding_data');
            const savedEmployees = localStorage.getItem('nova_employees');
            
            if (savedData) {
                const parsedData = JSON.parse(savedData);
                setOnboardingData(parsedData);
                setCurrentStep(parsedData.onboardingStep || 1);
                
                if (savedEmployees) {
                    setEmployees(JSON.parse(savedEmployees));
                }
                
                setIsLoading(false);
                return;
            }

            // Priority 2: Simulate API delay for first-time users
            setTimeout(() => {
                setOnboardingData({
                    onboardingStep: 1,
                    payrollSettings: null
                });
                setIsLoading(false);
            }, 500);
        } catch (error) {
            console.error("Failed to fetch org data", error);
            setIsLoading(false);
        }
    };

    // Professional Persistence Engine: Sync state to LocalStorage
    useEffect(() => {
        if (onboardingData) {
            const dataToSave = {
                ...onboardingData,
                onboardingStep: currentStep
            };
            localStorage.setItem('nova_onboarding_data', JSON.stringify(dataToSave));
        }
        if (employees.length > 0) {
            localStorage.setItem('nova_employees', JSON.stringify(employees));
        }
    }, [onboardingData, employees, currentStep]);

    const handleStepClick = (stepId: number) => {
        if (stepId === 1) {
            setIsDateModalOpen(true);
        } else if (stepId === 2) {
            setIsSalaryModalOpen(true);
        } else if (stepId === 3) {
            setIsEmployeeModalOpen(true);
        } else if (stepId === 4) {
            setIsComplianceModalOpen(true);
        } else if (stepId === 5) {
            setVerificationMode('pan');
            setIsVerificationModalOpen(true);
        } else if (stepId === 6) {
            setVerificationMode('bank');
            setIsVerificationModalOpen(true);
        } else if (stepId === 7) {
            // This will be implemented with a new modal
            setIsFinalModalOpen(true);
        }
    };

    const handleSaveDate = async (date: number) => {
        try {
            // Show professional completion feedback
            setShowSuccessToast(true);
            
            // Simulating API persistence
            setTimeout(() => {
                setOnboardingData((prev: any) => ({
                    ...prev,
                    onboardingStep: 2,
                    payrollSettings: { payDate: date }
                }));
                setCurrentStep(2);
                setIsDateModalOpen(false);
                setShowSuccessToast(false);
            }, 800);
        } catch (error) {
            console.error("Failed to save payroll date", error);
        }
    };

    const handleSaveSalary = async (data: any) => {
        try {
            setShowSuccessToast(true);
            setTimeout(() => {
                setOnboardingData((prev: any) => ({
                    ...prev,
                    onboardingStep: 3,
                    salaryComponents: data
                }));
                setCurrentStep(3);
                setIsSalaryModalOpen(false);
                setShowSuccessToast(false);
            }, 800);
        } catch (error) {
            console.error("Failed to save salary structure", error);
        }
    };

    const handleSaveEmployees = async (newEmployees: any[]) => {
        try {
            setShowSuccessToast(true);
            setTimeout(() => {
                setEmployees(prev => [...prev, ...newEmployees]);
                // Automatically move to next step or update count
                setOnboardingData((prev: any) => ({
                    ...prev,
                    onboardingStep: 4,
                }));
                setCurrentStep(4);
                setIsEmployeeModalOpen(false);
                setShowSuccessToast(false);
            }, 1200);
        } catch (error) {
            console.error("Failed to save employees", error);
        }
    };

    const handleSaveCompliance = async (data: any) => {
        try {
            setShowSuccessToast(true);
            setTimeout(() => {
                setOnboardingData((prev: any) => ({
                    ...prev,
                    onboardingStep: 5,
                    compliance: data
                }));
                setCurrentStep(5);
                setIsComplianceModalOpen(false);
                setShowSuccessToast(false);
            }, 1500);
        } catch (error) {
            console.error("Failed to save compliance", error);
        }
    };

    const handleVerificationComplete = async (data: any) => {
        try {
            setShowSuccessToast(true);
            const isPan = data.mode === 'pan';
            const nextStep = isPan ? 6 : 7;
            
            setTimeout(() => {
                setOnboardingData((prev: any) => ({
                    ...prev,
                    onboardingStep: nextStep,
                    [isPan ? 'panVerification' : 'bankVerification']: data
                }));
                setCurrentStep(nextStep);
                setIsVerificationModalOpen(false);
                setShowSuccessToast(false);
            }, 1000);
        } catch (error) {
            console.error("Verification failed", error);
        }
    };

    const handleFinalActivation = async (data: any) => {
        try {
            setToastMessage("Organization Activation Complete");
            setShowSuccessToast(true);
            setTimeout(() => {
                setOnboardingData((prev: any) => ({
                    ...prev,
                    onboardingStep: 8,
                    activation: data
                }));
                setCurrentStep(8);
                setIsFinalModalOpen(false);
                setShowSuccessToast(false);
            }, 1000);
        } catch (error) {
            console.error("Final activation failed", error);
        }
    };

    const triggerToast = (message: string) => {
        setToastMessage(message);
        setShowSuccessToast(true);
        setTimeout(() => setShowSuccessToast(false), 2500);
    };

    const openResource = (tab: ResourceTab) => {
        setResourceTab(tab);
        setIsResourceModalOpen(true);
    };

    const steps = SETUP_STEPS.map(section => ({
        ...section,
        steps: section.steps.map(step => {
            const isCompleted = step.id < currentStep;
            const isActive = step.id === currentStep;
            const isLocked = step.id > currentStep;
            
            let summary = null;
            if (isCompleted && step.id === 1) {
                summary = `Monthly • ${onboardingData?.payrollSettings?.payDate}${getOrdinal(onboardingData?.payrollSettings?.payDate)} of month`;
            }
            if (isCompleted && step.id === 2) {
                summary = "Active (PF, ESI, HRA included)";
            }
            if (isCompleted && step.id === 3) {
                summary = `${employees.length} employee${employees.length > 1 ? 's' : ''} added to registry`;
            }
            if (isCompleted && step.id === 4) {
                summary = `Linked (PF: ${onboardingData?.compliance?.pf?.id || 'Active'})`;
            }
            if (isCompleted && step.id === 5) {
                summary = `Identity Validated (${onboardingData?.panVerification?.id || 'Active'})`;
            }
            if (isCompleted && step.id === 6) {
                summary = "Account Connected (Penny Drop Verified)";
            }
            if (isCompleted && step.id === 7) {
                summary = "Active (Live Execution Phase)";
            }

            return {
                ...step,
                status: isCompleted ? 'completed' : isActive ? 'active' : 'locked',
                summary
            };
        })
    }));

    function getOrdinal(n: number) {
        const s = ["th", "st", "nd", "rd"];
        const v = n % 100;
        return s[(v - 20) % 10] || s[v] || s[0];
    }

    const progress = Math.round(((currentStep - 1) / 7) * 100);

    return (
        <DashboardLayout>
            <PayrollDateModal 
                isOpen={isDateModalOpen} 
                onClose={() => setIsDateModalOpen(false)} 
                onSave={handleSaveDate}
            />
            <SalaryStructureModal 
                isOpen={isSalaryModalOpen}
                onClose={() => setIsSalaryModalOpen(false)}
                onSave={handleSaveSalary}
            />
            <AddEmployeeModal 
                isOpen={isEmployeeModalOpen}
                onClose={() => setIsEmployeeModalOpen(false)}
                onSave={handleSaveEmployees}
                salaryPolicy={onboardingData?.salaryComponents || []}
            />
            <StatutoryComplianceModal 
                isOpen={isComplianceModalOpen}
                onClose={() => setIsComplianceModalOpen(false)}
                onSave={handleSaveCompliance}
            />
            <VerificationModal 
                isOpen={isVerificationModalOpen}
                mode={verificationMode}
                onClose={() => setIsVerificationModalOpen(false)}
                onVerified={handleVerificationComplete}
            />
            <FinalActivationModal 
                isOpen={isFinalModalOpen}
                onClose={() => setIsFinalModalOpen(false)}
                onActivate={handleFinalActivation}
                onboardingData={onboardingData}
                employeeCount={employees.length}
            />
            <InviteDelegateModal 
                isOpen={isInviteModalOpen}
                onClose={() => setIsInviteModalOpen(false)}
                onInvite={(email, role) => {
                    triggerToast(`Invitation sent to ${email} as ${role}`);
                }}
            />
            <ResourceHubModal 
                isOpen={isResourceModalOpen}
                onClose={() => setIsResourceModalOpen(false)}
                initialTab={resourceTab}
            />
            {/* Success Toast */}
            <AnimatePresence>
                {showSuccessToast && (
                    <motion.div 
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] bg-[#012652] text-white px-6 py-3 rounded-lg shadow-2xl flex items-center gap-3 border border-white/10"
                    >
                        <CheckCircle2 size={18} className="text-[#10B981]" />
                        <span className="text-sm font-bold tracking-tight">{toastMessage}</span>
                    </motion.div>
                )}
            </AnimatePresence>
            <div className="min-h-screen bg-[#F8FAFC]">
                {/* Razorpay-Style Sticky Subheader */}
                <div className="bg-white border-b border-[#E2E8F0] px-4 sm:px-8 py-6 sticky top-0 z-20">
                    <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="space-y-1">
                            <div className="flex items-center gap-2 text-[11px] font-bold text-[#64748B] uppercase tracking-wider">
                                <span>Dashboard</span>
                                <ChevronRight size={12} strokeWidth={3} className="text-[#CBD5E1]" />
                                <span className="text-[#012652]">Onboarding</span>
                            </div>
                            <h1 className="text-2xl font-bold text-[#012652]">Organization Activation</h1>
                        </div>
                        
                        <div className="flex items-center gap-6 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg px-6 py-3">
                            <div className="space-y-1">
                                <div className="flex justify-between items-center w-48">
                                    <span className="text-[10px] font-bold text-[#64748B] uppercase">Setup Progress</span>
                                    <span className="text-[10px] font-bold text-[#0D94FB]">{progress}%</span>
                                </div>
                                <div className="h-1.5 w-48 bg-[#E2E8F0] rounded-full overflow-hidden">
                                    <motion.div 
                                        initial={{ width: 0 }}
                                        animate={{ width: `${progress}%` }}
                                        transition={{ duration: 1, ease: "easeOut" }}
                                        className="h-full bg-[#0D94FB]"
                                    />
                                </div>
                            </div>
                            <div className="h-8 w-[1px] bg-[#E2E8F0]"></div>
                            <div className="text-right">
                                <p className="text-[10px] font-bold text-[#64748B] uppercase">Steps Completed</p>
                                <p className="text-sm font-bold text-[#012652]">{Math.min(7, currentStep - 1)} of 7</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="max-w-6xl mx-auto px-4 sm:px-8 py-10 space-y-10">
                    {/* Razorpay-Style Task List */}
                    <div className="space-y-6">
                                {SETUP_STEPS.map((section, idx) => (
                                    <div key={idx} className="space-y-4">
                                        <div className="flex items-center gap-3">
                                            <h3 className="text-[11px] font-bold text-[#64748B] uppercase tracking-[0.15em]">{section.category}</h3>
                                            <div className="h-[1px] flex-1 bg-[#E2E8F0]"></div>
                                        </div>
                                        <div className="bg-white border border-[#E2E8F0] rounded-lg overflow-hidden divide-y divide-[#E2E8F0] shadow-sm">
                                            {section.steps.map((stepData: any) => {
                                                const step = steps.find(s => s.category === section.category)?.steps.find(s => s.id === stepData.id) as any;
                                                if (!step) return null;

                                                const isCompleted = step.status === 'completed';
                                                const isActive = step.status === 'active';
                                                const isLocked = step.status === 'locked';

                                                return (
                                                    <div 
                                                        key={step.id} 
                                                        onClick={() => isActive && handleStepClick(step.id)}
                                                        className={`group flex items-center gap-6 p-5 transition-colors ${
                                                            isActive ? "hover:bg-[#F8FAFC] cursor-pointer" : "bg-white"
                                                        } ${isCompleted ? "opacity-75" : ""}`}
                                                    >
                                                        <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold border transition-colors ${
                                                            isCompleted 
                                                            ? "bg-[#10B981] text-white border-[#10B981]" 
                                                            : isActive 
                                                            ? "bg-[#012652] text-white border-[#012652]" 
                                                            : "bg-white text-[#CBD5E1] border-[#E2E8F0]"
                                                        }`}>
                                                            {isCompleted ? <CheckCircle2 size={14} /> : step.id}
                                                        </div>

                                                        <div className="flex-1 space-y-1">
                                                            <div className="flex items-center gap-3">
                                                                <h4 className={`text-sm font-bold ${isLocked ? "text-[#94A3B8]" : "text-[#012652]"} ${isCompleted ? "line-through text-[#94A3B8]" : ""}`}>
                                                                    {step.title}
                                                                </h4>
                                                                {isActive && (
                                                                    <span className="px-2 py-0.5 rounded bg-[#0D94FB]/10 text-[#0D94FB] text-[9px] font-bold uppercase tracking-wider">
                                                                        Continue
                                                                    </span>
                                                                )}
                                                                {isCompleted && (
                                                                    <span className="px-2 py-0.5 rounded bg-[#10B981]/10 text-[#10B981] text-[9px] font-bold uppercase tracking-wider">
                                                                        Done
                                                                    </span>
                                                                )}
                                                            </div>
                                                            <p className={`text-[12px] font-medium leading-normal ${isLocked || isCompleted ? "text-[#CBD5E1]" : "text-[#64748B]"}`}>
                                                                {step.summary || step.description}
                                                            </p>
                                                        </div>

                                                        <div className="flex items-center gap-8 text-right shrink-0">
                                                            <div className="space-y-0.5">
                                                                <p className="text-[10px] font-bold text-[#CBD5E1] uppercase tracking-wider">Estimated Time</p>
                                                                <div className="flex items-center justify-end gap-1.5 text-[12px] font-bold text-[#64748B]">
                                                                    <Clock size={12} />
                                                                    {step.duration}
                                                                </div>
                                                            </div>

                                                            <div className="w-10 flex justify-center">
                                                                {isLocked ? (
                                                                    <Lock size={16} className="text-[#CBD5E1]" />
                                                                ) : isCompleted ? (
                                                                    <CheckCircle2 size={20} className="text-[#10B981]" />
                                                                ) : (
                                                                    <ChevronRight size={20} className="text-[#0D94FB] group-hover:translate-x-1 transition-transform" />
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Industrial Utility Callout: Accountant Delegation */}
                            <div className="bg-[#012652] rounded-lg p-10 flex flex-col md:flex-row items-center gap-10 shadow-lg relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-48 h-full bg-white/5 skew-x-[-20deg] -mr-24 transform origin-right"></div>
                                
                                <div className="shrink-0 w-20 h-20 rounded-2xl bg-[#0D94FB] flex items-center justify-center text-white shadow-xl shadow-[#0D94FB]/20 relative z-10">
                                    <Shield size={40} />
                                </div>

                                <div className="flex-1 space-y-4 relative z-10">
                                    <div className="inline-block px-3 py-1 rounded-md bg-[#0D94FB]/20 border border-[#0D94FB]/30 text-[#0D94FB] text-[10px] font-bold uppercase tracking-widest">
                                        Expert Assistance
                                    </div>
                                    <h2 className="text-2xl font-bold text-white tracking-tight">Delegated Compliance Setup</h2>
                                    <p className="text-blue-100/60 text-sm font-medium leading-relaxed max-w-xl">
                                        Invite your Chartered Accountant or Finance Lead to finalize statutory registrations and tax mandates. 
                                        <span className="text-[#0D94FB] font-bold ml-1">Secure restricted access implementation.</span>
                                    </p>
                                </div>

                                <div className="shrink-0 relative z-10 w-full md:w-auto">
                                    <motion.button 
                                        whileHover={{ backgroundColor: "#0D94FB", scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => setIsInviteModalOpen(true)}
                                        className="w-full md:w-auto bg-white text-[#012652] px-8 py-4 rounded-lg font-bold text-sm uppercase tracking-widest flex items-center justify-center gap-3 shadow-lg hover:text-white transition-all"
                                    >
                                        <UserPlus size={18} />
                                        Invite Delegate
                                    </motion.button>
                                </div>
                            </div>

                    {/* Razorpay-Style Support Section */}
                    <div className="pt-12 border-t border-[#E2E8F0] flex flex-col md:flex-row items-center justify-between gap-8">
                        <div className="flex items-center gap-6">
                            <div className="w-12 h-12 bg-white border border-[#E2E8F0] rounded-lg flex items-center justify-center text-[#64748B] shadow-sm">
                                <HelpCircle size={24} />
                            </div>
                            <div className="space-y-0.5">
                                <p className="text-sm font-bold text-[#012652]">Product Support Command</p>
                                <p className="text-[12px] font-medium text-[#64748B]">Resolution in &lt; 24h • Mon-Fri 09:00 - 18:00 IST</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-6">
                            {(['Docs', 'Pricing', 'Security', 'Compliance'] as ResourceTab[]).map((tab) => (
                                <button
                                    key={tab} 
                                    onClick={() => openResource(tab)}
                                    className="text-[11px] font-bold text-[#64748B] uppercase tracking-widest hover:text-[#0D94FB] transition-colors"
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
