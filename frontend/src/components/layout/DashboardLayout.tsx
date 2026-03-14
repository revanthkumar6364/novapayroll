"use client";

import {
    LayoutDashboard, Users, Calculator,
    ShieldCheck, Receipt, BarChart3, Settings,
    Bell, Search, ChevronDown, User,
    CalendarCheck, FileText, Landmark, Puzzle,
    ChevronRight, HelpCircle,
    FolderOpen, HeartPulse, Sparkles, CreditCard, Building, PlusCircle,
    LucideIcon,
    Brain
} from "lucide-react";
import Logo from "../ui/Logo";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
    LogOut, User as UserIcon, CheckCircle2,
    Calendar
} from "lucide-react";

function parseJwt(token: string) {
    try {
        return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
        return null;
    }
}

interface NavigationItem {
    label: string;
    icon?: LucideIcon;
    href: string;
    type?: string;
    subLabel?: string;
}

interface SearchResult {
    label: string;
    href: string;
    type: string;
    subLabel?: string;
    icon?: LucideIcon;
}

interface NavigationSection {
    title: string | null;
    roles: string[];
    items: NavigationItem[];
}

const ALL_SECTIONS: NavigationSection[] = [
    {
        title: null,
        roles: ["OWNER", "ADMIN_FINANCE", "ADMIN_HR", "EMPLOYEE"],
        items: [
            { label: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
        ]
    },
    {
        title: "My Pay & Benefits",
        roles: ["OWNER", "ADMIN_FINANCE", "ADMIN_HR", "EMPLOYEE"],
        items: [
            { label: "Attendance", icon: CalendarCheck, href: "/dashboard/attendance" },
            { label: "Scan & Expense", icon: Brain, href: "/dashboard/expenses" },
            { label: "Tax Declaration", icon: FileText, href: "/dashboard/tax-declaration" },
            { label: "Tax Optimizer", icon: Sparkles, href: "/dashboard/tax-optimizer" },
            { label: "Tax Deductions", icon: ShieldCheck, href: "/dashboard/tax-deductions" },
        ]
    },
    {
        title: "People & HR",
        roles: ["OWNER", "ADMIN_HR"],
        items: [
            { label: "Directory", icon: Users, href: "/dashboard/people" },
            { label: "Recruitment", icon: Users, href: "/dashboard/recruitment" },
            { label: "Documents", icon: FolderOpen, href: "/dashboard/documents" },
            { label: "Insurance", icon: HeartPulse, href: "/dashboard/insurance" },
        ]
    },
    {
        title: "Finance & Payroll",
        roles: ["OWNER", "ADMIN_FINANCE"],
        items: [
            { label: "Pay Employees", icon: Calculator, href: "/dashboard/payroll-run" },
            { label: "Pay Contractors", icon: User, href: "/dashboard/contractors" },
            { label: "Tax Verification", icon: ShieldCheck, href: "/dashboard/admin/tax-verification" },
            { label: "Approvals", icon: FileText, href: "/dashboard/approvals" },
            { label: "Banking Hub", icon: Landmark, href: "/dashboard/banking" },
            { label: "Compliance Hub", icon: ShieldCheck, href: "/dashboard/compliance" },
            { label: "Developer Sandbox", icon: Sparkles, href: "/dashboard/sandbox" },
            { label: "Reports", icon: BarChart3, href: "/dashboard/reports" },
            { label: "Integrations", icon: Puzzle, href: "/dashboard/integrations" },
        ]
    },
    {
        title: "Corporate Spend",
        roles: ["OWNER", "ADMIN_FINANCE"],
        items: [
            { label: "Corporate Cards", icon: CreditCard, href: "/dashboard/cards" },
            { label: "Vendor Payments", icon: Building, href: "/dashboard/vendor-payments" },
        ]
    }
];

const MOCK_NOTIFICATIONS = [
    { id: 1, title: "Payroll Processed", desc: "March payroll has been successfully processed.", time: "2h ago", icon: CheckCircle2, color: "text-emerald-500", bg: "bg-emerald-50" },
    { id: 2, title: "New Leave Request", desc: "Priya Sharma requested 2 days leave.", time: "4h ago", icon: Calendar, color: "text-blue-500", bg: "bg-blue-50" },
    { id: 3, title: "Compliance Alert", desc: "TDS filing deadline is approaching.", time: "1d ago", icon: ShieldCheck, color: "text-amber-500", bg: "bg-amber-50" },
];

const MOCK_EMPLOYEES = [
    { name: "Rahul Executive", role: "Sr. Product Designer", email: "rahul@nova.com", id: "EMP001" },
    { name: "Priya Sharma", role: "HR Manager", email: "priya@nova.com", id: "EMP002" },
    { name: "Amit Kumar", role: "Software Engineer", email: "amit@nova.com", id: "EMP003" },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();
    const paths = pathname.split('/').filter(Boolean);
    const [userRole, setUserRole] = useState("EMPLOYEE");
    const [userEmail, setUserEmail] = useState("executive@company.com");
    const [isLoaded, setIsLoaded] = useState(false);
    
    // Header States
    const [searchQuery, setSearchQuery] = useState("");
    const [showSearch, setShowSearch] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
    
    const searchRef = useRef<HTMLDivElement>(null);
    const notificationRef = useRef<HTMLDivElement>(null);
    const profileRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) setShowSearch(false);
            if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) setShowNotifications(false);
            if (profileRef.current && !profileRef.current.contains(event.target as Node)) setShowProfile(false);
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/login');
            return;
        }
        const decoded = parseJwt(token);
        if (decoded) {
            const role = decoded.orgs?.[0]?.role || "EMPLOYEE";
            const email = decoded.email || "executive@company.com";
            setTimeout(() => {
                setUserRole(role);
                setUserEmail(email);
                setIsLoaded(true);
            }, 0);
        } else {
            setTimeout(() => setIsLoaded(true), 0);
        }
    }, [router]);

    const visibleSections = ALL_SECTIONS.filter(section => section.roles.includes(userRole));
    
    // Search Filtering
    const searchResults = searchQuery.trim() === "" ? [] : [
        ...visibleSections.flatMap(s => s.items)
            .filter(item => item.label.toLowerCase().includes(searchQuery.toLowerCase()))
            .map(item => ({ ...item, type: 'page' })),
        ...MOCK_EMPLOYEES
            .filter(emp => emp.name.toLowerCase().includes(searchQuery.toLowerCase()) || emp.role.toLowerCase().includes(searchQuery.toLowerCase()))
            .map(emp => ({ label: emp.name, subLabel: emp.role, href: `/dashboard/people?id=${emp.id}`, type: 'employee', ...emp }))
    ].slice(0, 6);

    // Format Role for UI
    const roleDisplay = userRole.replace('ADMIN_', 'Admin: ').replace('_', ' ');

    if (!isLoaded) return <div className="h-screen w-screen bg-background flex items-center justify-center">Loading Workspace...</div>;

    return (
        <div className="flex h-screen bg-background text-foreground overflow-hidden font-sans">
            {/* Sidebar (Dark/Navy Theme) */}
            <aside className="w-64 bg-[#0B132B] text-white flex flex-col z-20 shrink-0 border-r border-white/10">
                <div className="p-8 pb-4 flex items-center justify-between">
                    <Logo size={36} variant="white" />
                </div>

                <nav className="flex-grow px-4 pb-8 space-y-8 overflow-y-auto scrollbar-hide mt-4">
                    {visibleSections.map((section, idx) => (
                        <div key={idx} className="space-y-1">
                            {section.title && (
                                <h4 className="px-4 text-[11px] font-bold uppercase tracking-wider text-white/40 mb-3">
                                    {section.title}
                                </h4>
                            )}
                            <div className="space-y-1">
                                {section.items.map((item) => {
                                    const Icon = item.icon;
                                    const isActive = pathname === item.href;

                                    return (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all font-medium text-[14px] relative ${isActive
                                                ? "bg-[#1D4ED8] text-white shadow-lg shadow-blue-900/20"
                                                : "text-white/70 hover:bg-white/5 hover:text-white"
                                                }`}
                                        >
                                            {Icon && <Icon size={18} className={isActive ? "text-white opacity-100" : "text-white/40 group-hover:text-white/100"} />}
                                            <span>{item.label}</span>
                                            {isActive && (
                                                <div className="absolute right-2 w-1.5 h-1.5 rounded-full bg-white shadow-sm" />
                                            )}
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </nav>

                <div className="p-4 border-t border-white/10 bg-[#0B132B]">
                    <div className="bg-white/5 p-4 rounded-xl relative overflow-hidden flex items-center justify-between border border-white/5">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-white font-bold text-xs ring-2 ring-primary uppercase">
                                {userEmail.substring(0, 2)}
                            </div>
                            <div className="overflow-hidden">
                                <p className="text-[13px] font-semibold text-white truncate max-w-[100px]">{userEmail.split('@')[0]}</p>
                                <p className="text-[10px] uppercase tracking-wider text-white/40 font-bold">{roleDisplay}</p>
                            </div>
                        </div>
                        <Settings size={16} className="text-white/40 hover:text-white cursor-pointer transition-colors" />
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-grow flex flex-col min-w-0 bg-background overflow-hidden relative">
                {/* Header (Clean White) */}
                <header className="h-20 bg-card border-b border-border flex items-center px-8 justify-between shrink-0 sticky top-0 z-50 shadow-sm gap-8 transition-all">
                    <div className="flex items-center gap-6">
                        <div className="relative w-full max-w-sm group" ref={searchRef}>
                            <Search className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors ${showSearch ? 'text-primary' : 'text-muted-foreground'}`} size={18} />
                            <input
                                value={searchQuery}
                                onChange={(e) => {
                                    setSearchQuery(e.target.value);
                                    setShowSearch(true);
                                }}
                                onFocus={() => setShowSearch(true)}
                                placeholder="Search employees, payouts, reports..."
                                className="w-full bg-secondary border border-transparent outline-none pl-10 pr-4 py-2.5 rounded-xl text-[14px] text-foreground placeholder:text-muted-foreground focus:ring-4 focus:ring-primary/10 focus:border-primary focus:bg-card transition-all"
                            />

                            <AnimatePresence>
                                {showSearch && searchResults.length > 0 && (
                                    <motion.div 
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 10 }}
                                        className="absolute top-full left-0 right-0 mt-2 bg-card border border-border shadow-2xl rounded-2xl overflow-hidden py-2 z-[60]"
                                    >
                                        <div className="px-4 py-2 text-[11px] font-bold text-muted-foreground uppercase tracking-wider">Results for &quot;{searchQuery}&quot;</div>
                                        {searchResults.map((item: SearchResult, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => {
                                                    router.push(item.href);
                                                    setShowSearch(false);
                                                    setSearchQuery("");
                                                }}
                                                className="w-full text-left px-4 py-3 hover:bg-secondary flex items-center justify-between group transition-colors"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${item.type === 'page' ? 'bg-primary/10 text-primary' : 'bg-secondary text-muted-foreground'}`}>
                                                        {(() => {
                                                            const Icon = item.icon;
                                                            return item.type === 'page' && Icon ? <Icon size={16} /> : <UserIcon size={16} />;
                                                        })()}
                                                    </div>
                                                    <div>
                                                        <p className="text-[14px] font-semibold text-foreground">{item.label}</p>
                                                        <p className="text-[12px] text-muted-foreground">{item.subLabel || 'Dashboard Page'}</p>
                                                    </div>
                                                </div>
                                                <ChevronRight size={14} className="text-muted-foreground opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                                            </button>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="relative" ref={notificationRef}>
                            <button 
                                onClick={() => setShowNotifications(!showNotifications)}
                                className={`relative w-10 h-10 rounded-xl flex items-center justify-center transition-all ${showNotifications ? 'bg-primary text-white shadow-lg shadow-primary/20 scale-105' : 'bg-secondary/50 hover:bg-secondary text-muted-foreground hover:text-foreground'}`}
                            >
                                <Bell size={20} className={showNotifications ? 'animate-pulse' : ''} />
                                <div className="absolute -top-1 -right-1 w-5 h-5 bg-danger text-white text-[10px] font-black flex items-center justify-center rounded-full border-2 border-card shadow-sm">
                                    3
                                </div>
                            </button>

                            <AnimatePresence>
                                {showNotifications && (
                                    <motion.div 
                                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.95, y: 10 }}
                                        className="absolute top-full right-0 mt-3 w-80 bg-card border border-border shadow-2xl rounded-2xl overflow-hidden z-[60] origin-top-right"
                                    >
                                        <div className="p-4 border-b border-border flex items-center justify-between bg-secondary/30">
                                            <span className="font-bold text-sm">Notifications</span>
                                            <button className="text-[11px] font-bold text-primary hover:underline uppercase tracking-wider">Mark all read</button>
                                        </div>
                                        <div className="max-h-[350px] overflow-y-auto">
                                            {MOCK_NOTIFICATIONS.map(notif => (
                                                <div key={notif.id} className="p-4 hover:bg-secondary/50 cursor-pointer transition-colors flex gap-3 border-b border-border last:border-0">
                                                    <div className={`w-10 h-10 rounded-xl shrink-0 flex items-center justify-center ${notif.bg} ${notif.color}`}>
                                                        <notif.icon size={20} />
                                                    </div>
                                                    <div className="min-w-0">
                                                        <div className="flex items-center justify-between mb-0.5">
                                                            <p className="font-bold text-[13px] text-foreground truncate">{notif.title}</p>
                                                            <span className="text-[10px] text-muted-foreground whitespace-nowrap ml-2">{notif.time}</span>
                                                        </div>
                                                        <p className="text-[12px] text-muted-foreground leading-relaxed line-clamp-2">{notif.desc}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <button className="w-full py-3 text-xs font-bold text-muted-foreground hover:text-primary hover:bg-secondary/50 transition-all border-t border-border bg-card">
                                            View all activity logs
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <div className="w-px h-6 bg-border mx-1"></div>

                        <div className="relative" ref={profileRef}>
                            <button 
                                onClick={() => setShowProfile(!showProfile)}
                                className={`flex items-center gap-3 px-2 py-1.5 rounded-xl transition-all border border-transparent ${showProfile ? 'bg-secondary border-border shadow-inner' : 'hover:bg-secondary'}`}
                            >
                                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold flex items-center justify-center text-xs shadow-sm shadow-primary/30 uppercase ring-2 ring-primary ring-offset-2 ring-offset-card">
                                    {userEmail.substring(0, 2)}
                                </div>
                                <div className="hidden lg:block text-left">
                                    <p className="text-[13px] font-bold text-foreground leading-none mb-0.5">{userEmail.split('@')[0]}</p>
                                    <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-tight">{roleDisplay}</p>
                                </div>
                                <ChevronDown size={14} className={`text-muted-foreground transition-transform duration-300 ${showProfile ? 'rotate-180' : ''}`} />
                            </button>

                            <AnimatePresence>
                                {showProfile && (
                                    <motion.div 
                                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.95, y: 10 }}
                                        className="absolute top-full right-0 mt-3 w-64 bg-card border border-border shadow-2xl rounded-2xl overflow-hidden z-[60] origin-top-right py-2"
                                    >
                                        <div className="px-4 py-3 border-b border-border bg-secondary/10 mb-2">
                                            <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider mb-1">Signed in as</p>
                                            <p className="text-sm font-bold text-foreground truncate">{userEmail}</p>
                                        </div>
                                        
                                        <div className="space-y-1 px-2">
                                            {[
                                                { label: 'My Profile', icon: UserIcon, href: '/dashboard/settings' },
                                                { label: 'Account Settings', icon: Settings, href: '/dashboard/settings' },
                                                { label: 'Help & Support', icon: HelpCircle, href: '/dashboard/integrations' },
                                            ].map(item => (
                                                <button 
                                                    key={item.label}
                                                    onClick={() => {
                                                        router.push(item.href);
                                                        setShowProfile(false);
                                                    }}
                                                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-all"
                                                >
                                                    <item.icon size={18} />
                                                    {item.label}
                                                </button>
                                            ))}
                                        </div>

                                        <div className="my-2 border-t border-border mx-2"></div>

                                        <div className="px-2">
                                            <button 
                                                onClick={() => {
                                                    localStorage.removeItem('token');
                                                    router.push('/login');
                                                }}
                                                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-bold text-danger hover:bg-danger/10 transition-all"
                                            >
                                                <LogOut size={18} />
                                                Sign Out
                                            </button>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </header>

                {/* Dynamic Content */}
                <main className="flex-grow overflow-y-auto p-8 bg-background">
                    <div className="max-w-[1400px] mx-auto">
                        {/* Breadcrumbs - Clean */}
                        {paths.length > 0 && (
                            <div className="flex items-center gap-2 text-[12px] font-medium text-muted-foreground mb-6">
                                {paths.map((path, index) => {
                                    const href = `/${paths.slice(0, index + 1).join('/')}`;
                                    const isLast = index === paths.length - 1;
                                    const title = path.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

                                    return (<div key={path} className="flex items-center gap-2">
                                        {index > 0 && <ChevronRight size={14} className="text-border" />}
                                        {isLast ? (
                                            <span className="text-foreground font-semibold bg-secondary px-2 py-1 rounded-md">{title}</span>
                                        ) : (
                                            <Link href={href} className="hover:text-primary transition-colors">
                                                {title}
                                            </Link>
                                        )}
                                    </div>
                                    );
                                })}
                            </div>
                        )}
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
