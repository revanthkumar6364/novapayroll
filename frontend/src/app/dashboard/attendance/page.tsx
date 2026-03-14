"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import { 
    Clock, 
    Calendar, 
    CalendarCheck, 
    CalendarOff, 
    History, 
    ChevronRight, 
    MapPin, 
    AlertTriangle, 
    RefreshCw, 
    ArrowLeft, 
    Sparkles, 
    FileText,
    Download,
    Globe,
    Lock,
    Users,
    CheckCircle2,
    Search,
    Filter,
    MoreHorizontal,
    ArrowUpRight
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function AttendancePage() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState('Daily Logs');
    const [userRole, setUserRole] = useState<'employee' | 'owner'>('owner'); // Demonstrating Owner view
    const [isClockedIn, setIsClockedIn] = useState(true);
    const [isVerifying, setIsVerifying] = useState(false);
    const [workDuration, setWorkDuration] = useState("02:14:45");
    
    // Modal & Card States
    const [isLeaveModalOpen, setIsLeaveModalOpen] = useState(false);
    const [isRegModalOpen, setIsRegModalOpen] = useState(false);
    const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
    const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
    const [isPolicyModalOpen, setIsPolicyModalOpen] = useState(false);
    const [isAllRequestsModalOpen, setIsAllRequestsModalOpen] = useState(false);
    const [showAbsenceCard, setShowAbsenceCard] = useState(false);
    
    // Data & Workflow States
    const [isProcessingLeave, setIsProcessingLeave] = useState(false);
    const [notifications, setNotifications] = useState<{ id: number, text: string, type: 'info' | 'success' }[]>([]);
    const [leaveRequests, setLeaveRequests] = useState<{ type: string, days: string, status: string, date: string }[]>([]);
    const [absentEmployees, setAbsentEmployees] = useState([
        { name: 'Aditya Verma', role: 'UI Engineer', type: 'Sick Leave', avatar: 'AV' },
        { name: 'Priya Sharma', role: 'Product Manager', type: 'Privilege Leave', avatar: 'PS' },
        { name: 'Rahul Nair', role: 'Backend Lead', type: 'Absent Today', avatar: 'RN' },
        { name: 'Sneha Kapur', role: 'QA Analyst', type: 'Unpaid Leave', avatar: 'SK' },
        { name: 'Vikram Singh', role: 'DevOps', type: 'Sick Leave', avatar: 'VS' },
        { name: 'Zoya Khan', role: 'HR Manager', type: 'Absent Today', avatar: 'ZK' },
    ]);

    const addNotification = (text: string, type: 'info' | 'success' = 'info') => {
        const id = Date.now();
        setNotifications(prev => [...prev.slice(-2), { id, text, type }]);
        setTimeout(() => setNotifications(prev => prev.filter(n => n.id !== id)), 4000);
    };

    const handleClockAction = () => {
        setIsVerifying(true);
        setTimeout(() => {
            setIsClockedIn(!isClockedIn);
            setIsVerifying(false);
        }, 1500);
    };

    const handleApplyLeave = (leaveType: string) => {
        setIsProcessingLeave(true);
        addNotification(`Encrypting application for ${leaveType}...`, 'info');
        
        // Simulating Multi-Department Notification
        setTimeout(() => {
            addNotification("Dispatching to HR Channel...", 'info');
            setTimeout(() => {
                addNotification("Notifying Dept Manager...", 'info');
                setTimeout(() => {
                    const newUser = { 
                        name: 'Karan Mehra', 
                        role: 'CEO & Founder', 
                        type: leaveType, 
                        avatar: 'KM' 
                    };
                    setAbsentEmployees(prev => [newUser, ...prev]);
                    setLeaveRequests([{ type: leaveType, days: '1.0', status: 'Pending Approval', date: 'Now' }, ...leaveRequests]);
                    setShowAbsenceCard(true);
                    setIsProcessingLeave(false);
                    addNotification("Application Logged & Notified", 'success');
                }, 1000);
            }, 1000);
        }, 1000);
    };

    const handleViewRequests = () => {
        setIsAllRequestsModalOpen(true);
    };

    const handleOpenHistory = () => {
        setIsHistoryModalOpen(true);
    };

    const handleOpenPolicy = () => {
        setIsPolicyModalOpen(true);
    };

    const handleDownloadReport = (type: string) => {
        addNotification(`Synthesizing ${type}...`, 'info');
        
        setTimeout(() => {
            // Generate Professional Report Content
            const now = new Date().toLocaleString();
            const orgHeader = "NOVAPAYROLL INDUSTRIAL HUB - LOGISTICS & COMPLIANCE\n";
            const reportHeader = `REPORT: ${type}\nPERIOD: MARCH 2026\nGENERATED AT: ${now}\nSTATUS: REGULATORY VERIFIED\n`;
            const border = "--------------------------------------------------------------------------------\n";
            
            let content = border + orgHeader + reportHeader + border + "\n";
            
            if (type.includes('Attendance')) {
                content += "DATE       | IN       | OUT      | DURATION | STATUS    | AUDIT\n";
                content += "-----------|----------|----------|----------|-----------|-----------\n";
                content += "12-MAR-26  | 09:02 AM | 06:14 PM | 9h 12m   | PRESENT   | VERIFIED\n";
                content += "11-MAR-26  | 09:05 AM | 06:02 PM | 8h 57m   | PRESENT   | VERIFIED\n";
                content += "10-MAR-26  | 09:42 AM | 06:05 PM | 8h 23m   | LATE      | ANOMALY\n";
            } else if (type.includes('Security')) {
                content += "TIMESTAMP  | EVENT           | ZONE              | IP ADDRESS     | AUTH\n";
                content += "-----------|-----------------|-------------------|----------------|-------\n";
                content += "14-MAR-26  | PORTAL_SYNC     | HQ_OFFICE_SPACE   | 192.168.1.45   | OK\n";
                content += "13-MAR-26  | REGISTRY_GUARD  | REMOTE_STATION    | 110.22.45.189  | OK\n";
            } else {
                content += "REGISTRY CODE | COMPLIANCE STATUS | AUDITOR REMARKS\n";
                content += "--------------|-------------------|----------------\n";
                content += "RE-459021     | SECURE            | IMMUTABLE LOGS SYNCED\n";
            }

            content += "\n" + border + "END OF INTELLIGENCE EXPORT\n" + border;

            // Trigger Real Download
            const blob = new Blob([content], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `${type.replace(/\s+/g, '_')}_MARCH_2026.txt`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);

            addNotification(`${type} created. Initializing secure download...`, 'success');
        }, 2000);
    };

    const tabs = [
        { name: 'Daily Logs', icon: Clock },
        { name: 'Leaves', icon: CalendarOff },
        { name: 'Holidays', icon: Globe },
        { name: 'Regularization', icon: RefreshCw },
    ];

    return (
        <DashboardLayout>
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                        <button 
                            onClick={() => router.push('/dashboard')}
                            className="p-2.5 bg-white border border-[#E2E8F0] rounded-xl text-[#64748B] hover:text-[#0D94FB] hover:border-[#0D94FB]/30 transition-all shadow-sm group"
                        >
                            <ArrowLeft size={18} className="group-hover:-translate-x-0.5 transition-transform" />
                        </button>
                        <div>
                            <div className="flex items-center gap-2 mb-0.5">
                                <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-[0.2em]">Institutional Hub</span>
                                <span className="w-1 h-1 rounded-full bg-[#CBD5E1]"></span>
                                <button 
                                    onClick={() => setUserRole(userRole === 'owner' ? 'employee' : 'owner')}
                                    className="text-[10px] font-bold text-[#0D94FB] uppercase tracking-[0.2em] hover:underline cursor-pointer"
                                >
                                    Role: {userRole === 'owner' ? 'Administrator' : 'Employee'} v4.0
                                </button>
                            </div>
                            <h1 className="text-2xl font-black text-[#012652] tracking-tight">Attendance & Leaves</h1>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <button 
                            onClick={() => setIsDownloadModalOpen(true)}
                            className="px-5 py-2.5 bg-white border border-[#E2E8F0] rounded-xl text-xs font-bold text-[#012652] hover:bg-[#F8FAFC] transition-all flex items-center gap-2"
                        >
                            <Download size={14} /> Download Report
                        </button>
                        <button 
                            onClick={() => setIsLeaveModalOpen(true)}
                            disabled={isProcessingLeave}
                            className={`${isProcessingLeave ? 'bg-slate-100 text-slate-400' : 'bg-[#0D94FB] text-white hover:bg-blue-600 shadow-lg shadow-blue-500/20'} px-6 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center gap-2`}
                        >
                            {isProcessingLeave ? <RefreshCw size={14} className="animate-spin" /> : 'Apply Leave'} <ArrowUpRight size={14} />
                        </button>
                    </div>
                </div>

                {/* Status Hero Section - Role Based */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                        <AnimatePresence mode="wait">
                            {userRole === 'owner' ? (
                                <motion.div 
                                    key="owner-hero"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="h-full bg-[#012652] border border-[#012652] rounded-3xl p-8 relative overflow-hidden shadow-2xl shadow-blue-900/10"
                                >
                                    <div className="absolute top-0 right-0 w-96 h-full bg-[#0D94FB]/10 skew-x-[-15deg] -mr-48" />
                                    <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8 h-full">
                                        <div className="flex items-center gap-6">
                                            <div className="w-16 h-16 bg-white/10 rounded-2xl border border-white/20 backdrop-blur-md flex items-center justify-center">
                                                <Users size={28} className="text-[#0D94FB]" />
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-2 mb-1.5">
                                                    <span className="px-2 py-0.5 bg-[#10B981]/20 text-[#10B981] text-[9px] font-black uppercase tracking-widest rounded-full border border-[#10B981]/20">
                                                        Registry Guard Active
                                                    </span>
                                                    <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Global Sync Status: OK</span>
                                                </div>
                                                <h2 className="text-xl font-black text-white tracking-tight">Organization Attendance Management</h2>
                                                <p className="text-blue-100/60 text-[10px] font-medium mt-1 uppercase tracking-widest">
                                                    Live Headcount: <span className="text-[#0D94FB] font-black">124 / 130 Online</span>
                                                </p>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4 shrink-0">
                                            <div className="px-4 py-2 bg-white/5 rounded-xl border border-white/10">
                                                <p className="text-[8px] font-black text-white/40 uppercase tracking-widest mb-0.5">Avg Shift Login</p>
                                                <p className="text-sm font-black text-white">09:12 AM</p>
                                            </div>
                                            <button 
                                                onClick={() => setShowAbsenceCard(!showAbsenceCard)}
                                                className={`px-4 py-2 rounded-xl border transition-all text-left group ${
                                                    showAbsenceCard ? 'bg-[#0D94FB] border-[#0D94FB]' : 'bg-white/5 border-white/10 hover:bg-white/10'
                                                }`}
                                            >
                                                <p className={`text-[8px] font-black uppercase tracking-widest mb-0.5 ${
                                                    showAbsenceCard ? 'text-white/60' : 'text-white/40'
                                                }`}>Absent Today</p>
                                                <div className="flex items-center justify-between">
                                                    <p className="text-sm font-black text-white">{absentEmployees.length} Employees</p>
                                                    <ChevronRight size={14} className={`text-white transition-transform ${showAbsenceCard ? 'rotate-90' : 'group-hover:translate-x-0.5'}`} />
                                                </div>
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.div 
                                    key="employee-hero"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="h-full bg-white border border-[#E2E8F0] rounded-3xl p-8 relative overflow-hidden shadow-xl shadow-slate-200/40"
                                >
                                    <div className="absolute top-0 right-0 w-96 h-full bg-[#F8FAFC]/50 skew-x-[-15deg] -mr-48" />
                                    <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8 h-full">
                                        <div className="flex items-center gap-6">
                                            <div className="w-16 h-16 bg-[#F8FAFC] rounded-2xl border border-[#F1F5F9] flex flex-col items-center justify-center">
                                                <Clock size={28} className="text-[#0D94FB]" />
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-2 mb-1.5">
                                                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest border ${
                                                        isClockedIn ? 'bg-[#10B981]/10 text-[#10B981] border-[#10B981]/20' : 'bg-slate-100 text-slate-500 border-slate-200'
                                                    }`}>
                                                        {isClockedIn ? 'Online & Present' : 'Currently Offline'}
                                                    </span>
                                                    <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-widest">Shift: 09:00 - 18:00</span>
                                                </div>
                                                <h2 className="text-xl font-black text-[#012652] tracking-tight">Standard Professional Shift</h2>
                                                <p className="text-[#64748B] text-[10px] font-medium mt-1 uppercase tracking-widest">Session Active: <span className="text-[#012652] font-black">{workDuration}</span></p>
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-2 shrink-0">
                                            <button 
                                                onClick={handleClockAction}
                                                disabled={isVerifying}
                                                className={`px-10 py-3 font-black text-xs uppercase tracking-widest rounded-xl transition-all shadow-lg min-w-[180px] flex items-center justify-center gap-2 ${
                                                    isVerifying 
                                                        ? 'bg-slate-100 text-[#64748B] cursor-not-allowed shadow-none'
                                                        : isClockedIn 
                                                            ? 'bg-[#012652] text-white hover:bg-blue-900 shadow-blue-900/10' 
                                                            : 'bg-[#0D94FB] text-white hover:bg-blue-600 shadow-blue-500/20'
                                                }`}
                                            >
                                                {isVerifying ? (
                                                    <>
                                                        <RefreshCw size={14} className="animate-spin" /> Verifying...
                                                    </>
                                                ) : isClockedIn ? 'Web Clock Out' : 'Web Clock In'}
                                            </button>
                                            <div className="flex items-center justify-center gap-2">
                                                <div className={`w-1.5 h-1.5 rounded-full ${isVerifying ? 'bg-[#0D94FB] animate-pulse' : 'bg-[#10B981]'}`}></div>
                                                <p className="text-[9px] text-[#64748B] font-bold uppercase tracking-widest">
                                                    {isVerifying ? 'Identity Check in progress' : 'MFA Verification active'}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <div className="bg-white border border-[#E2E8F0] rounded-3xl p-8 space-y-6 flex flex-col justify-center shadow-sm">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-[#F8FAFC] rounded-xl flex items-center justify-center border border-[#F1F5F9]">
                                    <MapPin size={20} className="text-[#0D94FB]" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-[#64748B] uppercase tracking-widest">Security Zone</p>
                                    <p className="text-sm font-bold text-[#012652]">HQ Office Space</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 px-3 py-1 bg-[#10B981]/10 rounded-full border border-[#10B981]/10">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse"></span>
                                <span className="text-[9px] font-bold text-[#10B981] uppercase tracking-widest">Locked</span>
                            </div>
                        </div>
                        
                        <div className="space-y-4">
                            <div className="flex items-center justify-between text-xs font-bold border-b border-[#F1F5F9] pb-3">
                                <span className="text-[#64748B]">Geofence Radius</span>
                                <span className="text-[#012652]">200m <span className="text-[10px] opacity-40 uppercase">(Authorized)</span></span>
                            </div>
                            <div className="flex items-center justify-between text-xs font-bold border-b border-[#F1F5F9] pb-3">
                                <span className="text-[#64748B]">IP Restriction</span>
                                <span className="text-[#10B981]">Active <span className="text-[10px] opacity-40 uppercase">(Static)</span></span>
                            </div>
                            <div className="flex items-center justify-between text-xs font-bold">
                                <span className="text-[#64748B]">Audit Logging</span>
                                <span className="text-[#0D94FB]">Immutable</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Role-Based Insights Row */}
                <AnimatePresence>
                    {userRole === 'owner' && showAbsenceCard && (
                        <motion.div 
                            initial={{ opacity: 0, height: 0, marginTop: 0 }}
                            animate={{ opacity: 1, height: 'auto', marginTop: 24 }}
                            exit={{ opacity: 0, height: 0, marginTop: 0 }}
                            className="bg-white border border-[#E2E8F0] rounded-3xl overflow-hidden shadow-sm"
                        >
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-[#F8FAFC] rounded-xl flex items-center justify-center border border-[#F1F5F9]">
                                            <Users size={20} className="text-[#0D94FB]" />
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-black text-[#012652] uppercase tracking-wider">Who's Out Today</h3>
                                            <p className="text-[10px] font-bold text-red-500 uppercase tracking-widest mt-0.5">{absentEmployees.length.toString().padStart(2, '0')} Employees on Leave / Absent</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <button className="text-[10px] font-black text-[#64748B] border border-[#E2E8F0] px-3 py-1.5 rounded-lg hover:bg-slate-50 transition-all uppercase tracking-widest">
                                            Export List
                                        </button>
                                        <button className="text-[10px] font-black text-[#0D94FB] border border-[#0D94FB]/20 px-3 py-1.5 rounded-lg hover:bg-blue-50 transition-all uppercase tracking-widest">
                                            Notify Managers
                                        </button>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {absentEmployees.map((emp, i) => (
                                        <motion.div 
                                            key={emp.name} 
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: i * 0.05 }}
                                            className="flex items-center justify-between p-3 rounded-2xl bg-[#F8FAFC] border border-[#F1F5F9] hover:border-[#0D94FB]/30 transition-all group"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-[#012652] text-white text-[10px] font-black flex items-center justify-center border-2 border-white shadow-sm ring-2 ring-[#0D94FB]/10">
                                                    {emp.avatar}
                                                </div>
                                                <div>
                                                    <p className="text-xs font-black text-[#012652]">{emp.name}</p>
                                                    <p className="text-[9px] font-bold text-[#64748B] uppercase tracking-widest">{emp.role}</p>
                                                </div>
                                            </div>
                                            <span className={`px-2 py-0.5 rounded-lg text-[8px] font-black uppercase tracking-widest border ${
                                                emp.type.includes('Absent') ? 'bg-red-50 text-red-600 border-red-100' : 'bg-blue-50 text-blue-600 border-blue-100'
                                            }`}>
                                                {emp.type}
                                            </span>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                        { label: 'Total Work Hours', val: '156.5h', trend: '+12%', sub: 'vs last month', color: '#0D94FB' },
                        { label: 'Avg Punch In', val: '09:05 AM', trend: 'Strict', sub: 'Policy: 09:00 AM', color: '#10B981' },
                        { label: 'Late Arrivals', val: '02 Days', trend: '-20%', sub: 'Significant drop', color: '#F59E0B' },
                        { label: 'Pending Regularization', val: '01 Request', trend: 'Active', sub: 'Needs approval', color: '#6366F1' },
                    ].map((metric, i) => (
                        <div key={i} className="bg-white border border-[#E2E8F0] p-5 rounded-3xl shadow-sm hover:shadow-md transition-all">
                            <p className="text-[10px] font-black text-[#64748B] uppercase tracking-widest mb-1">{metric.label}</p>
                            <div className="flex items-baseline gap-2">
                                <h4 className="text-xl font-black text-[#012652]">{metric.val}</h4>
                                <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-md ${
                                    metric.trend.startsWith('+') || metric.trend === 'Strict' ? 'bg-[#10B981]/10 text-[#10B981]' : 
                                    metric.trend.startsWith('-') ? 'bg-blue-50 text-blue-600' : 'bg-indigo-50 text-indigo-600'
                                }`}>
                                    {metric.trend}
                                </span>
                            </div>
                            <p className="text-[10px] font-medium text-[#94A3B8] mt-1">{metric.sub}</p>
                        </div>
                    ))}
                </div>

                {/* Tabbed Interface */}
                <div className="space-y-6">
                    <div className="flex items-center gap-1 p-1 bg-[#F1F5F9] rounded-2xl w-fit border border-[#E2E8F0]">
                        {tabs.map((tab) => (
                            <button
                                key={tab.name}
                                onClick={() => setActiveTab(tab.name)}
                                className={`px-6 py-2.5 rounded-xl text-[11px] font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${
                                    activeTab === tab.name 
                                    ? 'bg-white text-[#012652] shadow-md border border-[#E2E8F0]' 
                                    : 'text-[#64748B] hover:text-[#012652]'
                                }`}
                            >
                                <tab.icon size={14} className={activeTab === tab.name ? 'text-[#0D94FB]' : ''} />
                                {tab.name}
                            </button>
                        ))}
                    </div>

                    <AnimatePresence mode="wait">
                        {activeTab === 'Daily Logs' && <DailyLogsTab key="logs" />}
                        {activeTab === 'Leaves' && <LeavesTab key="leaves" leaveRequests={leaveRequests} onInitiate={() => setIsLeaveModalOpen(true)} onViewAll={handleViewRequests} onOpenHistory={handleOpenHistory} onOpenPolicy={handleOpenPolicy} />}
                        {activeTab === 'Holidays' && <HolidaysTab key="holidays" />}
                        {activeTab === 'Regularization' && <RegularizationTab key="regularize" onOpenModal={() => setIsRegModalOpen(true)} />}
                    </AnimatePresence>
                </div>

                {/* AI Guard Rails */}
                <div className="p-6 bg-[#012652] rounded-[2rem] text-white flex items-center justify-between relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    <div className="flex items-center gap-6 relative z-10">
                        <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center border border-white/10 text-[#0D94FB]">
                            <Sparkles size={24} />
                        </div>
                        <div>
                            <p className="text-[10px] font-bold text-blue-100/40 uppercase tracking-[0.2em] mb-1">Intelligence Guard v2.0</p>
                            <p className="text-sm font-bold text-white tracking-wide">
                                You can recover 1.5 days by regularizing lateness via the Portal.
                            </p>
                        </div>
                    </div>
                    <button 
                        onClick={() => setIsRegModalOpen(true)}
                        className="relative z-10 px-8 py-3 bg-white/10 hover:bg-[#0D94FB] rounded-xl text-[10px] font-black uppercase tracking-widest border border-white/20 transition-all shadow-inner"
                    >
                        Sync regularizations
                    </button>
                </div>
            </div>

            {/* Application Modals */}
            <LeaveApplicationModal 
                isOpen={isLeaveModalOpen} 
                onClose={() => setIsLeaveModalOpen(false)} 
                onSubmit={handleApplyLeave}
            />
            <RegularizationModal isOpen={isRegModalOpen} onClose={() => setIsRegModalOpen(false)} />
            <DownloadReportModal 
                isOpen={isDownloadModalOpen} 
                onClose={() => setIsDownloadModalOpen(false)} 
                onDownload={handleDownloadReport}
            />
            <LeaveHistoryModal 
                isOpen={isHistoryModalOpen} 
                onClose={() => setIsHistoryModalOpen(false)} 
            />
            <PolicyModal 
                isOpen={isPolicyModalOpen} 
                onClose={() => setIsPolicyModalOpen(false)} 
            />
            <AllRequestsModal 
                isOpen={isAllRequestsModalOpen} 
                onClose={() => setIsAllRequestsModalOpen(false)} 
                requests={leaveRequests}
            />

            {/* Notification Overlay */}
            <div className="fixed bottom-6 right-6 z-[200] flex flex-col gap-3">
                <AnimatePresence>
                    {notifications.map((n) => (
                        <motion.div
                            key={n.id}
                            initial={{ opacity: 0, x: 20, scale: 0.9 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                            className={`px-4 py-3 rounded-xl border flex items-center gap-3 shadow-lg backdrop-blur-md ${
                                n.type === 'success' 
                                ? 'bg-[#10B981]/10 border-[#10B981]/30 text-[#012652]' 
                                : 'bg-white border-[#E2E8F0] text-[#012652]'
                            }`}
                        >
                            <div className={`w-2 h-2 rounded-full ${n.type === 'success' ? 'bg-[#10B981]' : 'bg-[#0D94FB]'} animate-pulse`} />
                            <p className="text-[10px] font-black uppercase tracking-widest">{n.text}</p>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </DashboardLayout>
    );
}

function DownloadReportModal({ isOpen, onClose, onDownload }: { isOpen: boolean, onClose: () => void, onDownload: (type: string) => void }) {
    const reports = [
        { name: 'Monthly Attendance Summary', desc: 'Standard payroll-ready document.', format: 'PDF', icon: FileText },
        { name: 'Detailed Security Audit Log', desc: 'Clock-in locations & IP addresses.', format: 'CSV', icon: Lock },
        { name: 'Compliance Registry Guard', desc: 'Regulatory proof of attendance.', format: 'XLSX', icon: CheckCircle2 },
    ];

    const handleAction = (type: string) => {
        onDownload(type);
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-[#012652]/60 backdrop-blur-sm" />
                    <motion.div 
                        initial={{ scale: 0.95, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 20 }}
                        className="relative w-full max-w-lg bg-white rounded-[2rem] shadow-2xl overflow-hidden border border-[#E2E8F0]"
                    >
                        <div className="p-8 border-b border-[#F1F5F9] bg-[#F8FAFC]">
                            <h3 className="text-xl font-black text-[#012652]">Export Intelligence</h3>
                            <p className="text-xs font-bold text-[#64748B] uppercase tracking-widest mt-1">Select Report Type for Generation</p>
                        </div>
                        <div className="p-8 space-y-3">
                            {reports.map((report) => (
                                <button 
                                    key={report.name}
                                    onClick={() => handleAction(report.name)}
                                    className="w-full p-4 rounded-2xl bg-[#F8FAFC] border border-[#F1F5F9] hover:border-[#0D94FB]/30 hover:bg-white transition-all text-left flex items-center justify-between group"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center border border-[#F1F5F9] text-[#64748B] group-hover:text-[#0D94FB]">
                                            <report.icon size={20} />
                                        </div>
                                        <div>
                                            <p className="text-xs font-black text-[#012652]">{report.name}</p>
                                            <p className="text-[9px] font-bold text-[#64748B] uppercase tracking-widest mt-0.5">{report.desc}</p>
                                        </div>
                                    </div>
                                    <span className="px-2 py-1 bg-white border border-[#E2E8F0] rounded text-[8px] font-black text-[#64748B] uppercase tracking-widest">{report.format}</span>
                                </button>
                            ))}
                        </div>
                        <div className="p-8 bg-[#F8FAFC] border-t border-[#F1F5F9]">
                            <button onClick={onClose} className="w-full px-6 py-3 bg-white border border-[#E2E8F0] text-[#64748B] font-bold text-[10px] uppercase tracking-widest rounded-xl hover:bg-white/50 transition-all">
                                Dismiss Overlay
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}

function LeaveHistoryModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
    const history = [
        { type: 'Privilege Leave', date: '12 Feb 2026', days: '2.0', status: 'Approved', action: 'System Credit' },
        { type: 'Sick Leave', date: '05 Jan 2026', days: '1.0', status: 'Approved', action: 'Availed' },
        { type: 'Carry Forward', date: '01 Jan 2026', days: '12.0', status: 'Approved', action: 'Annual Sync' },
    ];

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-[#012652]/60 backdrop-blur-sm" />
                    <motion.div 
                        initial={{ scale: 0.95, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 20 }}
                        className="relative w-full max-w-2xl bg-white rounded-[2rem] shadow-2xl overflow-hidden border border-[#E2E8F0]"
                    >
                        <div className="p-8 border-b border-[#F1F5F9] bg-[#F8FAFC] flex justify-between items-center">
                            <div>
                                <h3 className="text-xl font-black text-[#012652]">Leave History</h3>
                                <p className="text-[10px] font-black text-[#64748B] uppercase tracking-widest mt-1">Audit Trail & Accruals</p>
                            </div>
                            <History className="text-[#0D94FB]" size={24} />
                        </div>
                        <div className="p-8">
                            <div className="space-y-4">
                                {history.map((h, i) => (
                                    <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-[#F8FAFC] border border-[#F1F5F9]">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center border border-[#E2E8F0] text-[#64748B]">
                                                <CalendarCheck size={20} />
                                            </div>
                                            <div>
                                                <p className="text-xs font-black text-[#012652]">{h.type}</p>
                                                <p className="text-[9px] font-bold text-[#64748B] uppercase tracking-widest mt-0.5">{h.date} • {h.action}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-xs font-black text-[#012652]">{h.days} Days</p>
                                            <p className="text-[9px] font-bold text-[#10B981] uppercase tracking-widest mt-0.5">{h.status}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="p-8 bg-[#F8FAFC] border-t border-[#F1F5F9]">
                            <button onClick={onClose} className="w-full px-6 py-3 bg-white border border-[#E2E8F0] text-[#64748B] font-bold text-[10px] uppercase tracking-widest rounded-xl hover:bg-white/50 transition-all">
                                Dismiss History
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}

function PolicyModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
    const policies = [
        { label: 'Privilege Leave', rule: '24 Days / Year', accrual: '2 days per month' },
        { label: 'Sick Leave', rule: '12 Days / Year', accrual: '1 day per month' },
        { label: 'Carry Forward', rule: 'Max 30 Days', accrual: 'End of Financial Year' },
        { label: 'Notice Period', rule: '2 Weeks for PL', accrual: 'Managerial Approval Required' },
    ];

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-[#012652]/60 backdrop-blur-sm" />
                    <motion.div 
                        initial={{ scale: 0.95, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 20 }}
                        className="relative w-full max-w-xl bg-white rounded-[2rem] shadow-2xl overflow-hidden border border-[#E2E8F0]"
                    >
                        <div className="p-8 border-b border-[#F1F5F9] bg-[#012652] text-white">
                            <h3 className="text-xl font-black">Institutional Protocols</h3>
                            <p className="text-[10px] font-bold opacity-60 uppercase tracking-widest mt-1">Leave & Attendance Policy v2.4</p>
                        </div>
                        <div className="p-8 space-y-4">
                            {policies.map((p, i) => (
                                <div key={i} className="p-4 rounded-2xl bg-[#F8FAFC] border border-[#F1F5F9] flex items-center gap-4">
                                    <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center border border-[#E2E8F0] text-[#0D94FB]">
                                        <Lock size={16} />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex justify-between items-center">
                                            <p className="text-[10px] font-black text-[#012652] uppercase tracking-tight">{p.label}</p>
                                            <p className="text-[10px] font-bold text-[#0D94FB]">{p.rule}</p>
                                        </div>
                                        <p className="text-[10px] font-medium text-[#64748B] mt-1">{p.accrual}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="p-8 bg-[#F8FAFC] border-t border-[#F1F5F9]">
                            <button onClick={onClose} className="w-full px-6 py-3 bg-[#012652] text-white font-bold text-[10px] uppercase tracking-widest rounded-xl hover:bg-[#012652]/90 transition-all shadow-lg shadow-blue-900/20">
                                Acknowledge Policy
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}

function AllRequestsModal({ isOpen, onClose, requests }: { isOpen: boolean, onClose: () => void, requests: any[] }) {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-[#012652]/60 backdrop-blur-sm" />
                    <motion.div 
                        initial={{ scale: 0.95, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 20 }}
                        className="relative w-full max-w-2xl bg-white rounded-[2rem] shadow-2xl overflow-hidden border border-[#E2E8F0]"
                    >
                        <div className="p-8 border-b border-[#F1F5F9] bg-[#F8FAFC]">
                            <h3 className="text-xl font-black text-[#012652]">All Leave Requests</h3>
                            <p className="text-[10px] font-black text-[#64748B] uppercase tracking-widest mt-1">Pending & Recently Synchronized</p>
                        </div>
                        <div className="p-8 max-h-[60vh] overflow-y-auto">
                            {requests.length > 0 ? (
                                <div className="space-y-4">
                                    {requests.map((req, i) => (
                                        <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-[#F8FAFC] border border-[#F1F5F9]">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center border border-[#E2E8F0] text-[#0D94FB]">
                                                    <Calendar size={20} />
                                                </div>
                                                <div>
                                                    <p className="text-xs font-black text-[#012652]">{req.type}</p>
                                                    <p className="text-[9px] font-bold text-[#64748B] uppercase tracking-widest mt-0.5">{req.date} • {req.days} Day(s)</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2 px-3 py-1 bg-amber-50 rounded-full border border-amber-100">
                                                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                                                <span className="text-[9px] font-black text-amber-600 uppercase tracking-widest">{req.status}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-12">
                                    <p className="text-sm font-bold text-[#64748B]">No requests found in this cycle.</p>
                                </div>
                            )}
                        </div>
                        <div className="p-8 bg-[#F8FAFC] border-t border-[#F1F5F9]">
                            <button onClick={onClose} className="w-full px-6 py-3 bg-white border border-[#E2E8F0] text-[#64748B] font-bold text-[10px] uppercase tracking-widest rounded-xl hover:bg-white/50 transition-all">
                                Dismiss Registry
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}

function LeaveApplicationModal({ isOpen, onClose, onSubmit }: { isOpen: boolean, onClose: () => void, onSubmit: (type: string) => void }) {
    const [leaveType, setLeaveType] = useState('Privilege Leave');
    
    const handleSubmit = () => {
        onSubmit(leaveType);
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-[#012652]/60 backdrop-blur-sm"
                    />
                    <motion.div 
                        initial={{ scale: 0.95, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.95, opacity: 0, y: 20 }}
                        className="relative w-full max-w-lg bg-white rounded-[2rem] shadow-2xl overflow-hidden border border-[#E2E8F0]"
                    >
                        <div className="p-8 border-b border-[#F1F5F9] bg-[#F8FAFC]">
                            <h3 className="text-xl font-black text-[#012652]">Apply Leave</h3>
                            <p className="text-xs font-bold text-[#64748B] uppercase tracking-widest mt-1">Leave Management System</p>
                        </div>
                        <div className="p-8 space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase text-[#64748B]">Leave Type</label>
                                    <select 
                                        value={leaveType}
                                        onChange={(e) => setLeaveType(e.target.value)}
                                        className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-4 py-3 text-xs font-bold outline-none focus:border-[#0D94FB]"
                                    >
                                        <option>Privilege Leave</option>
                                        <option>Sick Leave</option>
                                        <option>Unpaid Leave</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase text-[#64748B]">Duration</label>
                                    <select className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-4 py-3 text-xs font-bold outline-none focus:border-[#0D94FB]">
                                        <option>Full Day</option>
                                        <option>First Half</option>
                                        <option>Second Half</option>
                                    </select>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase text-[#64748B]">Select Dates</label>
                                <div className="grid grid-cols-2 gap-4">
                                    <input type="date" className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-4 py-3 text-xs font-bold outline-none" />
                                    <input type="date" className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-4 py-3 text-xs font-bold outline-none" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase text-[#64748B]">Reason for Leave</label>
                                <textarea className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-4 py-3 text-xs font-bold outline-none h-24 resize-none" placeholder="Briefly explain your absence..."></textarea>
                            </div>
                        </div>
                        <div className="p-8 bg-[#F8FAFC] border-t border-[#F1F5F9] flex gap-3">
                            <button onClick={onClose} className="flex-1 px-6 py-3 bg-white border border-[#E2E8F0] text-[#64748B] font-bold text-[10px] uppercase tracking-widest rounded-xl hover:bg-white/50 transition-all">
                                Cancel
                            </button>
                            <button 
                                onClick={handleSubmit}
                                className="flex-2 px-10 py-3 bg-[#0D94FB] text-white font-bold text-[10px] uppercase tracking-widest rounded-xl shadow-lg shadow-blue-500/20 hover:bg-blue-600 transition-all"
                            >
                                Submit Application
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}

function RegularizationModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-[#012652]/60 backdrop-blur-sm" />
                    <motion.div 
                        initial={{ scale: 0.95, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 20 }}
                        className="relative w-full max-w-lg bg-white rounded-[2rem] shadow-2xl overflow-hidden border border-[#E2E8F0]"
                    >
                        <div className="p-8 border-b border-[#F1F5F9] bg-amber-50">
                            <div className="flex items-center gap-3 mb-1">
                                <AlertTriangle className="text-amber-600" size={20} />
                                <h3 className="text-xl font-black text-[#012652]">Attendance Regularization</h3>
                            </div>
                            <p className="text-[10px] font-black text-amber-600 uppercase tracking-widest">Correction Request v1.0</p>
                        </div>
                        <div className="p-8 space-y-6">
                            <div className="p-4 bg-amber-500/5 border border-amber-200/50 rounded-2xl flex items-center gap-4">
                                <Clock className="text-amber-600" size={24} />
                                <div>
                                    <p className="text-xs font-bold text-[#012652]">Detected Anomaly: 10 Mar 2026</p>
                                    <p className="text-[10px] font-medium text-amber-600">Late clock-in (09:42 AM) vs Shift Start (09:00 AM)</p>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase text-[#64748B]">Regularization Category</label>
                                    <select className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-4 py-3 text-xs font-bold outline-none focus:border-amber-500">
                                        <option>Late Arrival Correction</option>
                                        <option>Missed Punch (Forgot to Clock In)</option>
                                        <option>Outdoor Client Visit</option>
                                        <option>System/Technical Issue</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase text-[#64748B]">Explanation</label>
                                    <textarea className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-4 py-3 text-xs font-bold outline-none h-24 resize-none" placeholder="Provide reason for adjustment..."></textarea>
                                </div>
                            </div>
                        </div>
                        <div className="p-8 bg-[#F8FAFC] border-t border-[#F1F5F9] flex gap-3">
                            <button onClick={onClose} className="flex-1 px-6 py-3 bg-white border border-[#E2E8F0] text-[#64748B] font-bold text-[10px] uppercase tracking-widest rounded-xl hover:bg-white/50 transition-all">
                                Cancel
                            </button>
                            <button className="flex-2 px-10 py-3 bg-amber-600 text-white font-bold text-[10px] uppercase tracking-widest rounded-xl shadow-lg shadow-amber-500/20 hover:bg-amber-700 transition-all">
                                Submit Correction
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}

function DailyLogsTab() {
    const [searchTerm, setSearchTerm] = useState("");
    const [activeFilter, setActiveFilter] = useState("All");
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const logs = [
        { date: '12 Mar 2026', in: '09:02 AM', out: '06:14 PM', status: 'Present', duration: '9h 12m', leakage: '---' },
        { date: '11 Mar 2026', in: '09:05 AM', out: '06:02 PM', status: 'Present', duration: '8h 57m', leakage: '---' },
        { date: '10 Mar 2026', in: '09:42 AM', out: '06:05 PM', status: 'Late arrival', duration: '8h 23m', leakage: '0.5 Day Dock' },
        { date: '09 Mar 2026', in: '09:00 AM', out: '06:10 PM', status: 'Present', duration: '9h 10m', leakage: '---' },
        { date: '08 Mar 2026', in: '---', out: '---', status: 'Absent', duration: '---', leakage: '1.0 Day Dock' },
    ];

    const filteredLogs = logs.filter(log => {
        const matchesSearch = log.date.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = activeFilter === "All" || log.status === activeFilter;
        return matchesSearch && matchesFilter;
    });

    const suggestions = logs
        .map(l => l.date)
        .filter(d => searchTerm && d.toLowerCase().includes(searchTerm.toLowerCase()) && d !== searchTerm)
        .slice(0, 3);

    return (
        <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-4"
        >
            <div className="flex items-center justify-between px-2">
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl focus-within:border-[#0D94FB]/50 transition-all">
                            <Search size={14} className="text-[#64748B]" />
                            <input 
                                type="text" 
                                placeholder="Search date..." 
                                value={searchTerm}
                                onChange={(e) => {
                                    setSearchTerm(e.target.value);
                                    setShowSuggestions(true);
                                }}
                                onFocus={() => setShowSuggestions(true)}
                                className="bg-transparent border-none outline-none text-[11px] font-bold placeholder-[#94A3B8] w-32" 
                            />
                        </div>
                        
                        {/* Auto-suggest Dropdown */}
                        <AnimatePresence>
                            {showSuggestions && suggestions.length > 0 && (
                                <motion.div 
                                    initial={{ opacity: 0, y: 5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 5 }}
                                    className="absolute top-full left-0 mt-2 w-full bg-white border border-[#E2E8F0] rounded-xl shadow-xl z-50 overflow-hidden"
                                >
                                    {suggestions.map((s) => (
                                        <button 
                                            key={s}
                                            onClick={() => {
                                                setSearchTerm(s);
                                                setShowSuggestions(false);
                                            }}
                                            className="w-full px-4 py-2 text-left text-[10px] font-bold text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#0D94FB] transition-colors"
                                        >
                                            {s}
                                        </button>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <div className="relative">
                        <button 
                            onClick={() => setIsFilterOpen(!isFilterOpen)}
                            className={`p-2 rounded-xl border transition-all ${
                                isFilterOpen || activeFilter !== "All" 
                                ? 'bg-[#0D94FB] border-[#0D94FB] text-white shadow-lg shadow-blue-500/20' 
                                : 'bg-[#F8FAFC] border-[#E2E8F0] text-[#64748B] hover:text-[#012652]'
                            }`}
                        >
                            <Filter size={16} />
                        </button>

                        {/* Filter Dropdown */}
                        <AnimatePresence>
                            {isFilterOpen && (
                                <>
                                    <div className="fixed inset-0 z-40" onClick={() => setIsFilterOpen(false)} />
                                    <motion.div 
                                        initial={{ opacity: 0, y: 5, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 5, scale: 0.95 }}
                                        className="absolute top-full left-0 mt-2 w-48 bg-white border border-[#E2E8F0] rounded-xl shadow-2xl z-50 overflow-hidden p-1"
                                    >
                                        <p className="px-3 py-2 text-[8px] font-black text-[#64748B] uppercase tracking-widest border-b border-[#F1F5F9] mb-1">Filter by Status</p>
                                        {['All', 'Present', 'Late arrival', 'Absent'].map((f) => (
                                            <button 
                                                key={f}
                                                onClick={() => {
                                                    setActiveFilter(f);
                                                    setIsFilterOpen(false);
                                                }}
                                                className={`w-full px-3 py-2 text-left text-[10px] font-bold rounded-lg transition-colors flex items-center justify-between ${
                                                    activeFilter === f 
                                                    ? 'bg-[#F8FAFC] text-[#0D94FB]' 
                                                    : 'text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#012652]'
                                                }`}
                                            >
                                                {f}
                                                {activeFilter === f && <CheckCircle2 size={12} />}
                                            </button>
                                        ))}
                                    </motion.div>
                                </>
                            )}
                        </AnimatePresence>
                    </div>

                    {activeFilter !== "All" && (
                        <button 
                            onClick={() => setActiveFilter("All")}
                            className="text-[9px] font-black text-[#64748B] border-b border-dashed border-[#64748B]/30 hover:text-red-500 hover:border-red-500/30 transition-all uppercase tracking-widest"
                        >
                            Reset
                        </button>
                    )}
                </div>
                <p className="text-[10px] font-bold text-[#64748B] uppercase tracking-widest">Reporting Period: Mar 2026</p>
            </div>

            <div className="bg-white rounded-3xl border border-[#E2E8F0] overflow-hidden shadow-xl shadow-slate-200/40 min-h-[300px]">
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-[#F8FAFC]/50 border-b border-[#E2E8F0]">
                            <th className="px-6 py-4 text-[9px] font-black text-[#64748B] uppercase tracking-widest">Log Date</th>
                            <th className="px-6 py-4 text-[9px] font-black text-[#64748B] uppercase tracking-widest">Clock In</th>
                            <th className="px-6 py-4 text-[9px] font-black text-[#64748B] uppercase tracking-widest">Clock Out</th>
                            <th className="px-6 py-4 text-[9px] font-black text-[#64748B] uppercase tracking-widest">Duration</th>
                            <th className="px-6 py-4 text-[9px] font-black text-[#64748B] uppercase tracking-widest">Status</th>
                            <th className="px-6 py-4 text-[9px] font-black text-[#64748B] uppercase tracking-widest text-right">Guard Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F1F5F9]">
                        <AnimatePresence mode="popLayout">
                            {filteredLogs.length > 0 ? (
                                filteredLogs.map((log, i) => (
                                    <motion.tr 
                                        key={log.date} 
                                        layout
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="hover:bg-[#F8FAFC]/80 transition-all cursor-pointer group"
                                    >
                                        <td className="px-6 py-4">
                                            <p className="text-xs font-bold text-[#012652]">{log.date}</p>
                                        </td>
                                        <td className="px-6 py-4 text-xs font-medium text-[#64748B]">{log.in}</td>
                                        <td className="px-6 py-4 text-xs font-medium text-[#64748B]">{log.out}</td>
                                        <td className="px-6 py-4 text-xs font-bold text-[#012652]">{log.duration}</td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest ${
                                                log.status === 'Present' ? 'bg-[#10B981]/10 text-[#10B981]' : 
                                                log.status === 'Late arrival' ? 'bg-amber-100 text-amber-600' : 'bg-red-50 text-red-600'
                                            }`}>
                                                {log.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            {log.leakage !== '---' ? (
                                                <span className="text-[10px] font-black text-red-600 uppercase tracking-tighter bg-red-50 px-2 py-0.5 rounded border border-red-100">
                                                    {log.leakage}
                                                </span>
                                            ) : (
                                                <span className="text-[10px] font-bold text-[#94A3B8]">---</span>
                                            )}
                                        </td>
                                    </motion.tr>
                                ))
                            ) : (
                                <motion.tr initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                    <td colSpan={6} className="px-6 py-20 text-center">
                                        <div className="flex flex-col items-center gap-2">
                                            <div className="w-12 h-12 bg-[#F8FAFC] rounded-2xl flex items-center justify-center border border-[#F1F5F9] text-[#CBD5E1]">
                                                <Search size={24} />
                                            </div>
                                            <p className="text-sm font-bold text-[#012652]">No logs found</p>
                                            <p className="text-[10px] font-medium text-[#64748B]">Adjust your search or filters to see more results.</p>
                                        </div>
                                    </td>
                                </motion.tr>
                            )}
                        </AnimatePresence>
                    </tbody>
                </table>
            </div>
        </motion.div>
    );
}

function LeavesTab({ leaveRequests, onInitiate, onViewAll, onOpenHistory, onOpenPolicy }: { leaveRequests: { type: string, days: string, status: string, date: string }[], onInitiate: () => void, onViewAll: () => void, onOpenHistory: () => void, onOpenPolicy: () => void }) {
    const balances = [
        { label: 'Privilege Leave', val: '14.5', total: '24', color: '#0D94FB' },
        { label: 'Sick Leave', val: '6.0', total: '12', color: '#6366F1' },
        { label: 'Unpaid Leave', val: '0.0', total: '0', color: '#64748B' },
    ];

    return (
        <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="grid lg:grid-cols-3 gap-6"
        >
            <div className="lg:col-span-1 space-y-6">
                <div className="bg-white border border-[#E2E8F0] rounded-3xl p-6 space-y-6">
                    <h3 className="text-sm font-black text-[#012652] uppercase tracking-wider">Leave Balances</h3>
                    <div className="space-y-6">
                        {balances.map((b, i) => (
                            <div key={i} className="space-y-2">
                                <div className="flex justify-between text-[11px] font-bold tracking-tight">
                                    <span className="text-[#64748B]">{b.label}</span>
                                    <span className="text-[#012652]">{b.val} / {b.total}</span>
                                </div>
                                <div className="h-1.5 bg-[#F1F5F9] rounded-full overflow-hidden">
                                    <motion.div 
                                        initial={{ width: 0 }}
                                        animate={{ width: `${(parseFloat(b.val) / (parseFloat(b.total) || 1)) * 100}%` }}
                                        transition={{ duration: 1 }}
                                        className="h-full rounded-full"
                                        style={{ backgroundColor: b.color }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div 
                    onClick={onOpenPolicy}
                    className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-3xl p-6 hover:border-[#0D94FB]/30 transition-all cursor-pointer group"
                >
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center border border-[#E2E8F0] text-[#64748B] group-hover:text-[#0D94FB]">
                            <History size={20} />
                        </div>
                        <ChevronRight size={16} className="text-[#CBD5E1]" />
                    </div>
                    <p className="text-sm font-bold text-[#012652]">History & Policy</p>
                    <p className="text-[10px] font-medium text-[#64748B] mt-1">View past leaves and institutional leave protocols.</p>
                </div>
            </div>

            <div className="lg:col-span-2 bg-white border border-[#E2E8F0] rounded-3xl p-8 space-y-6">
                <div className="flex items-center justify-between">
                    <h3 className="text-sm font-black text-[#012652] uppercase tracking-wider">Upcoming Requests</h3>
                    <button 
                        onClick={onViewAll}
                        className="text-[10px] font-bold text-[#0D94FB] border-b border-dashed border-[#0D94FB]/30 uppercase tracking-widest"
                    >
                        View All
                    </button>
                </div>

                {leaveRequests.length > 0 ? (
                    <div className="space-y-4">
                        {leaveRequests.map((req, i) => (
                            <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-[#F8FAFC] border border-[#F1F5F9]">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center border border-[#E2E8F0] text-[#0D94FB]">
                                        <Calendar size={20} />
                                    </div>
                                    <div>
                                        <p className="text-xs font-black text-[#012652]">{req.type}</p>
                                        <p className="text-[9px] font-bold text-[#64748B] uppercase tracking-widest mt-0.5">{req.date} • {req.days} Day(s)</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 px-3 py-1 bg-amber-50 rounded-full border border-amber-100">
                                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                                    <span className="text-[9px] font-black text-amber-600 uppercase tracking-widest">{req.status}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-12 text-center space-y-3">
                        <div className="w-16 h-16 bg-[#F8FAFC] rounded-2xl flex items-center justify-center text-[#CBD5E1]">
                            <Calendar size={32} />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-[#012652]">No Pending Requests</p>
                            <p className="text-xs font-medium text-[#64748B]">All leave applications have been processed for this cycle.</p>
                        </div>
                        <button 
                            onClick={onInitiate}
                            className="mt-4 px-6 py-2 bg-[#F1F5F9] text-[#64748B] font-bold text-[10px] uppercase tracking-widest rounded-xl hover:bg-[#E2E8F0] transition-all"
                        >
                            Initiate Application
                        </button>
                    </div>
                )}
            </div>
        </motion.div>
    );
}

function HolidaysTab() {
    const holidays = [
        { name: 'Holi', date: '14 Mar 2026', day: 'Saturday', type: 'Mandatory' },
        { name: 'Ugadi', date: '29 Mar 2026', day: 'Sunday', type: 'Optional' },
        { name: 'Eid al-Fitr', date: '31 Mar 2026', day: 'Tuesday', type: 'Mandatory' },
        { name: 'Good Friday', date: '03 Apr 2026', day: 'Friday', type: 'Mandatory' },
    ];

    return (
        <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
        >
            <div className="bg-white border border-[#E2E8F0] rounded-3xl overflow-hidden shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-[#F1F5F9]">
                    {holidays.map((h, i) => (
                        <div key={i} className="p-6 hover:bg-[#F8FAFC] transition-colors group cursor-pointer">
                            <div className="flex items-center justify-between mb-4">
                                <div className={`px-2 py-1 rounded text-[8px] font-black uppercase tracking-widest ${
                                    h.type === 'Mandatory' ? 'bg-blue-50 text-blue-600' : 'bg-slate-50 text-slate-500'
                                }`}>
                                    {h.type}
                                </div>
                                <Calendar size={14} className="text-[#CBD5E1] group-hover:text-[#0D94FB] transition-colors" />
                            </div>
                            <h4 className="text-sm font-bold text-[#012652]">{h.name}</h4>
                            <p className="text-xs font-bold text-[#64748B] mt-1">{h.date}</p>
                            <p className="text-[10px] font-medium text-[#94A3B8] mt-0.5">{h.day}</p>
                        </div>
                    ))}
                </div>
            </div>
            
            <div className="p-6 border border-dashed border-[#E2E8F0] rounded-3xl flex items-center justify-between bg-[#F8FAFC]/50">
                <div className="flex items-center gap-4">
                    <Globe size={20} className="text-[#64748B]" />
                    <p className="text-xs font-medium text-[#64748B]">Regional holiday calendar is synced with <span className="font-bold text-[#012652]">Karnataka State Guidelines</span>.</p>
                </div>
                <button className="text-[10px] font-bold text-[#0D94FB] uppercase tracking-widest hover:text-[#012652] transition-colors">Change Region</button>
            </div>
        </motion.div>
    );
}

function RegularizationTab({ onOpenModal }: { onOpenModal: () => void }) {
    return (
        <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-white border border-[#E2E8F0] rounded-3xl p-12 text-center space-y-6"
        >
            <div className="w-20 h-20 bg-[#F8FAFC] rounded-3xl flex items-center justify-center text-[#CBD5E1] mx-auto border border-[#F1F5F9]">
                <RefreshCw size={40} />
            </div>
            <div className="max-w-md mx-auto space-y-2">
                <h3 className="text-xl font-bold text-[#012652]">Attendance Regularization</h3>
                <p className="text-sm text-[#64748B] font-medium leading-relaxed">
                    Missed a punch? Frequent outside-office activity? Request a correction for your attendance logs here.
                </p>
            </div>
            <div className="flex items-center justify-center gap-4">
                <button 
                    onClick={onOpenModal}
                    className="px-8 py-3 bg-[#0D94FB] text-white font-bold text-xs uppercase tracking-widest rounded-xl shadow-lg shadow-blue-500/20 hover:bg-blue-600 transition-all"
                >
                    Initiate Request
                </button>
                <button className="px-8 py-3 bg-white border border-[#E2E8F0] text-[#64748B] font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-[#F8FAFC] transition-all">
                    View Guidelines
                </button>
            </div>
        </motion.div>
    );
}
