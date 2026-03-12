"use client";

import {
    LayoutDashboard, Users, Calculator,
    ShieldCheck, Receipt, BarChart3, Settings,
    Bell, Search, ChevronDown, User, Heart,
    CalendarCheck, FileText, Landmark, Puzzle,
    ChevronRight, ArrowUpRight, HelpCircle,
    FolderOpen, HeartPulse, Sparkles, CreditCard, Building
} from "lucide-react";
import Logo from "../ui/Logo";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

function parseJwt(token: string) {
    try {
        return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
        return null;
    }
}

const ALL_SECTIONS = [
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
            { label: "Reimbursements", icon: Receipt, href: "/dashboard/reimbursements" },
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
            { label: "Approvals", icon: FileText, href: "/dashboard/approvals" },
            { label: "Payouts Hub", icon: Landmark, href: "/dashboard/payouts" },
            { label: "Compliance Hub", icon: ShieldCheck, href: "/dashboard/compliance" },
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

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();
    const paths = pathname.split('/').filter(Boolean);
    const [userRole, setUserRole] = useState("EMPLOYEE");
    const [userEmail, setUserEmail] = useState("executive@company.com");
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/login');
            return;
        }
        const decoded = parseJwt(token);
        if (decoded) {
            const role = decoded.orgs?.[0]?.role || "EMPLOYEE";
            setUserRole(role);
            setUserEmail(decoded.email || "executive@company.com");
        }
        setIsLoaded(true);
    }, [router]);

    const visibleSections = ALL_SECTIONS.filter(section => section.roles.includes(userRole));
    
    // Format Role for UI
    const roleDisplay = userRole.replace('ADMIN_', 'Admin: ').replace('_', ' ');

    if (!isLoaded) return <div className="h-screen w-screen bg-background flex items-center justify-center">Loading Workspace...</div>;

    return (
        <div className="flex h-screen bg-background text-foreground overflow-hidden font-sans">
            {/* Sidebar (Dark/Navy Theme) */}
            <aside className="w-64 bg-sidebar text-sidebar-foreground flex flex-col z-20 shrink-0 border-r border-sidebar-hover">
                <div className="p-8 pb-4 flex items-center justify-between">
                    <Logo size={36} className="invert brightness-0" />
                </div>

                <nav className="flex-grow px-4 pb-8 space-y-8 overflow-y-auto scrollbar-hide mt-4">
                    {visibleSections.map((section, idx) => (
                        <div key={idx} className="space-y-1">
                            {section.title && (
                                <h4 className="px-4 text-[11px] font-bold uppercase tracking-wider text-sidebar-foreground/50 mb-3">
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
                                            className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors font-medium text-[14px] relative ${isActive
                                                ? "bg-primary text-primary-foreground shadow-sm"
                                                : "text-sidebar-foreground/80 hover:bg-sidebar-hover hover:text-white"
                                                }`}
                                        >
                                            <Icon size={18} className={isActive ? "text-primary-foreground opacity-90" : "text-sidebar-foreground/60"} />
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

                <div className="p-4 border-t border-sidebar-hover bg-sidebar">
                    <div className="bg-sidebar-hover p-4 rounded-xl relative overflow-hidden flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary-foreground font-bold text-xs ring-2 ring-primary uppercase">
                                {userEmail.substring(0, 2)}
                            </div>
                            <div className="overflow-hidden">
                                <p className="text-[13px] font-semibold text-white truncate max-w-[100px]">{userEmail.split('@')[0]}</p>
                                <p className="text-[10px] uppercase tracking-wider text-sidebar-foreground/60 font-bold">{roleDisplay}</p>
                            </div>
                        </div>
                        <Settings size={16} className="text-sidebar-foreground/60 hover:text-white cursor-pointer transition-colors" />
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-grow flex flex-col min-w-0 bg-background overflow-hidden relative">
                {/* Header (Clean White) */}
                <header className="h-16 bg-card border-b border-border flex items-center px-8 justify-between shrink-0 sticky top-0 z-30 shadow-sm">
                    <div className="flex items-center gap-6 flex-grow max-w-xl">
                        <div className="relative w-full group">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" size={18} />
                            <input
                                placeholder="Search employees, payouts, reports..."
                                className="w-full bg-secondary border border-transparent outline-none pl-10 pr-4 py-2 rounded-lg text-[14px] text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-card transition-all"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        <button className="relative w-10 h-10 rounded-full hover:bg-secondary flex items-center justify-center transition-colors text-muted-foreground hover:text-foreground">
                            <Bell size={20} />
                            <div className="absolute top-2.5 right-2.5 w-2 h-2 bg-danger rounded-full border-2 border-card"></div>
                        </button>

                        <div className="w-px h-6 bg-border mx-1"></div>

                        <button className="flex items-center gap-3 hover:bg-secondary px-2 py-1.5 rounded-lg transition-colors border border-transparent">
                            <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold flex items-center justify-center text-xs shadow-sm shadow-primary/30 uppercase">
                                {userEmail.substring(0, 2)}
                            </div>
                            <div className="hidden lg:block text-left">
                                <p className="text-[13px] font-semibold text-foreground leading-none mb-0.5">{userEmail.split('@')[0]}</p>
                                <p className="text-[11px] text-muted-foreground capitalize">{roleDisplay}</p>
                            </div>
                            <ChevronDown size={14} className="text-muted-foreground" />
                        </button>
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
