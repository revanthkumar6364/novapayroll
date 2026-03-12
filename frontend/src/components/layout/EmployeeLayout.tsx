"use client";

import { motion } from "framer-motion";
import {
    Zap, FileText, UserCircle, Receipt,
    HelpCircle, Bell, LogOut, ChevronRight
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
    { label: "My Payslips", icon: FileText, href: "/employee-portal/payslips" },
    { label: "My Profile", icon: UserCircle, href: "/employee-portal/profile" },
    { label: "Reimbursements", icon: Receipt, href: "/employee-portal/reimbursements" },
    { label: "Help & Support", icon: HelpCircle, href: "/employee-portal/support" },
];

export default function EmployeeLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    return (
        <div className="flex h-screen bg-slate-50 overflow-hidden">
            {/* Sidebar */}
            <aside className="w-64 border-r border-border bg-white flex flex-col z-20">
                <div className="p-8">
                    <Link href="/employee-portal/payslips" className="flex items-center gap-2">
                        <Zap className="text-primary w-6 h-6 fill-current" />
                        <span className="font-bold text-lg tracking-tight">Nova Portal</span>
                    </Link>
                </div>

                <nav className="flex-grow px-4 space-y-1">
                    {NAV_ITEMS.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href;

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${isActive
                                        ? "bg-primary/10 text-primary"
                                        : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                                    }`}
                            >
                                <Icon size={20} />
                                <span>{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-6 mt-auto">
                    <button className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-red-50 text-muted-foreground hover:text-red-600 transition-all group">
                        <div className="flex items-center gap-3">
                            <LogOut size={18} />
                            <span className="text-sm font-bold">Logout</span>
                        </div>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-grow flex flex-col min-w-0">
                <header className="h-20 bg-white border-b border-border flex items-center px-10 justify-between shrink-0">
                    <div>
                        <h2 className="text-xl font-bold">Welcome, Amit Sharma</h2>
                        <p className="text-xs text-muted-foreground">Software Engineer • Engineering</p>
                    </div>
                    <button className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center relative">
                        <Bell size={20} className="text-slate-600" />
                        <div className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></div>
                    </button>
                </header>

                <main className="flex-grow overflow-y-auto p-10">
                    {children}
                </main>
            </div>
        </div>
    );
}
