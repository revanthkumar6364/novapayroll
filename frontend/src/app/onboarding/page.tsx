"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronRight, ChevronLeft, Building, Calculator, Gavel, Landmark, FileCheck, Users } from "lucide-react";
import { useRouter } from "next/navigation";
import Logo from "../../components/ui/Logo";

const STEPS = [
    { id: 1, title: "Company Details", icon: Building },
    { id: 2, title: "Payroll Settings", icon: Calculator },
    { id: 3, title: "Statutory Setup", icon: Gavel },
    { id: 4, title: "Bank Setup", icon: Landmark },
    { id: 5, title: "KYC Upload", icon: FileCheck },
    { id: 6, title: "Add Employees", icon: Users },
];

export default function OnboardingPage() {
    const [currentStep, setCurrentStep] = useState(1);
    const [isFinishing, setIsFinishing] = useState(false);
    const router = useRouter();

    const handleNext = () => {
        if (currentStep < 6) setCurrentStep(s => s + 1);
        else {
            setIsFinishing(true);
            setTimeout(() => router.push("/dashboard"), 1500);
        }
    };

    const handleBack = () => {
        if (currentStep > 1) setCurrentStep(s => s - 1);
    };

    return (
        <div className="min-h-screen bg-background flex flex-col">
            {/* Header */}
            <header className="h-20 border-b border-border bg-white flex items-center px-8 justify-between">
                <Logo />
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="bg-accent px-2 py-0.5 rounded text-accent-foreground font-medium">Draft</span>
                    <span>Account Setup ({currentStep}/6)</span>
                </div>
            </header>

            <div className="flex-grow flex">
                {/* Sidebar Progress */}
                <aside className="w-80 border-r border-border bg-slate-50 p-8 hidden lg:block">
                    <div className="space-y-8">
                        {STEPS.map((step) => {
                            const Icon = step.icon;
                            const isActive = step.id === currentStep;
                            const isCompleted = step.id < currentStep;

                            return (
                                <div key={step.id} className="flex items-center gap-4 group">
                                    <div className={`
                    w-10 h-10 rounded-xl flex items-center justify-center transition-all
                    ${isActive ? "bg-primary text-white shadow-lg shadow-primary/20 scale-110" : ""}
                    ${isCompleted ? "bg-green-100 text-green-600" : "bg-white text-slate-400 border border-slate-200"}
                  `}>
                                        {isCompleted ? <Check size={18} strokeWidth={3} /> : <Icon size={18} />}
                                    </div>
                                    <div>
                                        <h4 className={`text-sm font-semibold ${isActive ? "text-primary" : "text-slate-600"}`}>
                                            {step.title}
                                        </h4>
                                        <p className="text-[11px] text-slate-400 uppercase tracking-widest font-bold">Step 0{step.id}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </aside>

                {/* Content Area */}
                <main className="flex-grow flex flex-col items-center p-8 md:p-16 relative">
                    {/* Horizontal Progress Bar */}
                    <div className="w-full max-w-2xl mb-12 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-primary"
                            initial={{ width: 0 }}
                            animate={{ width: `${(currentStep / 6) * 100}%` }}
                            transition={{ duration: 0.5, ease: "circOut" }}
                        />
                    </div>

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentStep}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="w-full max-w-2xl"
                        >
                            <div className="mb-12">
                                <span className="text-primary font-bold text-sm tracking-widest uppercase mb-2 block">Step 0{currentStep}</span>
                                <h1 className="text-4xl font-bold mb-4">{STEPS[currentStep - 1].title}</h1>
                                <p className="text-muted-foreground text-lg">Please provide the details required to configure your {STEPS[currentStep - 1].title.toLowerCase()}.</p>
                            </div>

                            {/* Step Dynamic Content Simulation */}
                            <div className="space-y-6">
                                {currentStep === 1 && (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-4">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">Organization Legal Name</label>
                                            <input className="w-full px-4 py-3 rounded-xl border border-border outline-none focus:border-primary transition-all" placeholder="Nova Services Pvt Ltd" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">GSTIN (Optional)</label>
                                            <input className="w-full px-4 py-3 rounded-xl border border-border outline-none focus:border-primary transition-all" placeholder="27AAAAA0000A1Z5" />
                                        </div>
                                        <div className="col-span-2 space-y-2">
                                            <label className="text-sm font-medium">Registered Address</label>
                                            <textarea className="w-full px-4 py-3 rounded-xl border border-border outline-none focus:border-primary transition-all min-h-24" placeholder="123, Fintech Hub, Mumbai" />
                                        </div>
                                    </div>
                                )}

                                {currentStep > 1 && (
                                    <div className="premium-card p-12 flex flex-col items-center justify-center text-center opacity-60">
                                        <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mb-6">
                                            {(() => {
                                                const StepIcon = STEPS[currentStep - 1].icon;
                                                return <StepIcon className="text-accent-foreground" />;
                                            })()}
                                        </div>
                                        <h3 className="text-lg font-semibold">Form components for {STEPS[currentStep - 1].title}</h3>
                                        <p className="text-slate-400">Implementation progress: UI layout ready.</p>
                                    </div>
                                )}
                            </div>

                            <div className="mt-16 pt-8 border-t border-border flex items-center justify-between">
                                <button
                                    onClick={handleBack}
                                    disabled={currentStep === 1}
                                    className={`flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors ${currentStep === 1 ? "opacity-30 cursor-not-allowed" : ""}`}
                                >
                                    <ChevronLeft size={16} /> Back
                                </button>
                                <button
                                    onClick={handleNext}
                                    className="bg-primary text-white px-8 py-3 rounded-xl font-semibold shadow-lg shadow-primary/20 hover:bg-primary/90 flex items-center gap-2 active:scale-95 transition-all"
                                >
                                    {currentStep === 6 ? "Complete Setup" : "Save & Continue"}
                                    <ChevronRight size={16} />
                                </button>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Finish Loading Overlay */}
                    <AnimatePresence>
                        {isFinishing && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="absolute inset-0 z-50 bg-white/90 backdrop-blur-sm flex flex-col items-center justify-center"
                            >
                                <div className="mb-6 animate-bounce">
                                    <Logo showText={false} size={64} />
                                </div>
                                <h2 className="text-2xl font-bold mb-2">Finalizing your dashboard</h2>
                                <p className="text-muted-foreground">Setting up your premium workspace...</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </main>
            </div>
        </div>
    );
}
