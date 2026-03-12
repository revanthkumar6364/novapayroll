"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DashboardLayout from "@/components/layout/DashboardLayout";
import {
    Users, UserPlus, Briefcase, FileSignature, 
    CheckCircle2, Clock, XCircle, Search, 
    Filter, MoreHorizontal, FileText, ArrowRight
} from "lucide-react";

type Candidate = {
    id: string;
    name: string;
    role: string;
    stage: 'Sourced' | 'Interviewing' | 'Offered' | 'Onboarding';
    score: number;
    date: string;
};

const INITIAL_CANDIDATES: Candidate[] = [
    { id: "1", name: "Rahul Verma", role: "Sr. Frontend Eng.", stage: "Interviewing", score: 92, date: "2d ago" },
    { id: "2", name: "Sneha Patel", role: "Product Manager", stage: "Offered", score: 95, date: "1d ago" },
    { id: "3", name: "Amit Kumar", role: "DevOps Engineer", stage: "Sourced", score: 78, date: "3h ago" },
    { id: "4", name: "Priya Singh", role: "UX Designer", stage: "Onboarding", score: 88, date: "Just now" },
];

export default function RecruitmentHub() {
    const [candidates, setCandidates] = useState(INITIAL_CANDIDATES);
    const [activeTab, setActiveTab] = useState<'ATS' | 'Onboarding' | 'Exits'>('ATS');

    const stages = ['Sourced', 'Interviewing', 'Offered', 'Onboarding'];

    return (
        <DashboardLayout>
            <div className="space-y-8 pb-12">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <h1 className="text-3xl font-black text-[#0F172A] mb-2">Smart HR & Recruitment</h1>
                        <p className="text-[#475569] font-medium">Manage the complete employee lifecycle from source to separation.</p>
                    </div>
                    <div className="flex gap-4">
                        <button className="bg-white text-slate-700 px-6 py-3 rounded-xl font-bold shadow-sm border border-slate-200 hover:bg-slate-50 transition-all flex items-center gap-2">
                            <Filter size={18} /> Filters
                        </button>
                        <button className="bg-primary text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all flex items-center gap-2 active:scale-95 btn-elite">
                            <UserPlus size={18} /> New Hire
                        </button>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex items-center gap-2 p-1.5 bg-slate-100/50 rounded-2xl w-fit border border-slate-200/50">
                    {(['ATS', 'Onboarding', 'Exits'] as const).map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-8 py-2.5 rounded-xl font-bold text-sm transition-all ${
                                activeTab === tab 
                                ? 'bg-white text-primary shadow-sm ring-1 ring-slate-200/50' 
                                : 'text-[#475569] hover:text-slate-700 hover:bg-slate-200/30'
                            }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                <AnimatePresence mode="wait">
                    {/* ATS KANBAN VIEW */}
                    {activeTab === 'ATS' && (
                        <motion.div
                            key="ats"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="grid grid-cols-1 md:grid-cols-4 gap-6"
                        >
                            {stages.map(stage => {
                                const columnCandidates = candidates.filter(c => c.stage === stage);
                                return (
                                    <div key={stage} className="flex flex-col gap-4">
                                        <div className="flex items-center justify-between mb-2 px-2">
                                            <h3 className="font-bold text-slate-700 text-sm uppercase tracking-wider">{stage}</h3>
                                            <span className="bg-slate-200 text-slate-600 text-xs font-bold px-2 py-0.5 rounded-full">{columnCandidates.length}</span>
                                        </div>
                                        
                                        {columnCandidates.map(candidate => (
                                            <div key={candidate.id} className="premium-card p-5 bg-white border border-[#F1F5F9] hover:border-primary/20 transition-all group cursor-pointer hover:shadow-md">
                                                <div className="flex justify-between items-start mb-4">
                                                    <div>
                                                        <h4 className="font-bold text-[#0F172A]">{candidate.name}</h4>
                                                        <p className="text-xs font-semibold text-primary">{candidate.role}</p>
                                                    </div>
                                                    <button className="text-[#CBD5E1] hover:text-slate-600">
                                                        <MoreHorizontal size={16} />
                                                    </button>
                                                </div>
                                                
                                                <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-50">
                                                    <div className="flex items-center gap-1.5">
                                                        <div className={`w-2 h-2 rounded-full ${candidate.score > 90 ? 'bg-emerald-500' : 'bg-amber-500'}`}></div>
                                                        <span className="text-xs font-bold text-[#475569]">{candidate.score}% Match</span>
                                                    </div>
                                                    <span className="text-[10px] font-bold text-[#64748B] capitalize">{candidate.date}</span>
                                                </div>
                                            </div>
                                        ))}
                                        
                                        {columnCandidates.length === 0 && (
                                            <div className="h-32 border-2 border-dashed border-slate-200 rounded-2xl flex items-center justify-center text-[#64748B] text-sm font-medium">
                                                Drop candidates here
                                            </div>
                                        )}
                                    </div>
                                )
                            })}
                        </motion.div>
                    )}

                    {/* ONBOARDING VIEW */}
                    {activeTab === 'Onboarding' && (
                        <motion.div
                            key="onboarding"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="bg-white rounded-[2rem] border border-[#F1F5F9] p-8 shadow-sm"
                        >
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="text-xl font-black text-[#0F172A]">Active Onboarding Flows</h2>
                            </div>
                            
                            <div className="space-y-4">
                                {[
                                    { name: "Priya Singh", role: "UX Designer", progress: 65, tasks: "8/12" },
                                    { name: "Kunal Shah", role: "Marketing Lead", progress: 20, tasks: "2/10" }
                                ].map((flow, i) => (
                                    <div key={i} className="flex items-center justify-between p-6 rounded-2xl border border-[#F1F5F9] hover:border-primary/20 transition-colors group cursor-pointer hover:bg-slate-50/50">
                                        <div className="flex items-center gap-6 w-1/3">
                                            <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold relative overflow-hidden">
                                                {flow.name.substring(0,2).toUpperCase()}
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-[#0F172A]">{flow.name}</h4>
                                                <p className="text-xs font-semibold text-[#475569]">{flow.role}</p>
                                            </div>
                                        </div>
                                        
                                        <div className="w-1/3 px-8">
                                            <div className="flex justify-between text-xs font-bold mb-2">
                                                <span className="text-[#475569]">Progress</span>
                                                <span className="text-primary">{flow.progress}%</span>
                                            </div>
                                            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                                                <div className="h-full bg-primary rounded-full transition-all duration-1000" style={{ width: `${flow.progress}%` }}></div>
                                            </div>
                                        </div>
                                        
                                        <div className="flex items-center gap-8 w-1/3 justify-end">
                                            <div className="text-right hidden md:block">
                                                <p className="text-xs font-bold text-[#0F172A]">{flow.tasks} Tasks</p>
                                                <p className="text-[10px] text-[#64748B] font-semibold uppercase">Completed</p>
                                            </div>
                                            <button className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-[#64748B] group-hover:text-primary group-hover:border-primary transition-all shadow-sm group-hover:shadow-md">
                                                <ArrowRight size={18} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {/* EXITS VIEW */}
                    {activeTab === 'Exits' && (
                        <motion.div
                            key="exits"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="bg-white rounded-[2rem] border border-[#F1F5F9] p-8 shadow-sm flex flex-col items-center justify-center text-center py-20"
                        >
                            <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-6">
                                <FileSignature size={32} className="text-[#CBD5E1]" />
                            </div>
                            <h2 className="text-2xl font-black text-[#0F172A] mb-2">No Active Exits</h2>
                            <p className="text-[#475569] font-medium max-w-sm mb-8">All Full & Final (F&F) settlements are cleared. Initiate an exit to process calculations automatically.</p>
                            <button className="bg-slate-900 text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-slate-900/20 hover:bg-slate-800 transition-all flex items-center gap-2 active:scale-95">
                                Initiate F&F Settlement
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </DashboardLayout>
    );
}
