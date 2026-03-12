"use client";

import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import {
    Plus, Search, Filter, Download, MoreVertical,
    UserPlus, FileSpreadsheet
} from "lucide-react";

const EMPLOYEES = [
    { id: "EMP001", name: "Amit Sharma", role: "Software Engineer", dept: "Engineering", status: "Active", joinDate: "Jan 12, 2024", email: "amit@nova.com" },
    { id: "EMP002", name: "Priya Patel", role: "Product Manager", dept: "Product", status: "Active", joinDate: "Feb 05, 2024", email: "priya@nova.com" },
    { id: "EMP003", name: "Rahul Verma", role: "UI Designer", dept: "Design", status: "Active", joinDate: "Mar 15, 2024", email: "rahul@nova.com" },
    { id: "EMP004", name: "Sneha Reddy", role: "HR Specialist", dept: "People", status: "Onboarding", joinDate: "May 20, 2026", email: "sneha@nova.com" },
    { id: "EMP005", name: "Vikram Singh", role: "DevOps Engineer", dept: "Engineering", status: "Active", joinDate: "Oct 10, 2023", email: "vikram@nova.com" },
    { id: "EMP006", name: "Ananya Iyer", role: "Content Creator", dept: "Marketing", status: "Active", joinDate: "Nov 22, 2023", email: "ananya@nova.com" },
];

export default function EmployeesPage() {
    const [searchTerm, setSearchTerm] = useState("");

    return (
        <DashboardLayout>
            <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Employees</h1>
                    <p className="text-muted-foreground">Manage your workforce, view profiles, and track salary structures.</p>
                </div>
                <div className="flex gap-3">
                    <button className="glass px-4 py-2.5 rounded-xl text-sm font-semibold border-border hover:bg-background transition-all flex items-center gap-2">
                        <FileSpreadsheet size={18} /> Bulk Import
                    </button>
                    <button className="bg-primary text-white px-4 py-2.5 rounded-xl text-sm font-semibold shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all flex items-center gap-2">
                        <UserPlus size={18} /> Add Employee
                    </button>
                </div>
            </div>

            {/* Filters & Actions */}
            <div className="premium-card p-4 mb-6 flex flex-col md:flex-row gap-4 items-center">
                <div className="relative flex-grow">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                    <input
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search by name, ID, or department..."
                        className="w-full bg-muted/50 border-none outline-none pl-10 pr-4 py-2 rounded-xl text-sm focus:ring-2 focus:ring-primary/20 transition-all"
                    />
                </div>
                <div className="flex gap-2 w-full md:w-auto">
                    <button className="flex-grow md:flex-none glass px-4 py-2 rounded-xl text-sm font-medium border-border flex items-center justify-center gap-2">
                        <Filter size={16} /> Filters
                    </button>
                    <button className="flex-grow md:flex-none glass px-4 py-2 rounded-xl text-sm font-medium border-border flex items-center justify-center gap-2">
                        <Download size={16} /> Export
                    </button>
                </div>
            </div>

            {/* Employees Table */}
            <div className="premium-card overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-muted/50 border-b border-border">
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Employee</th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">ID</th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Department</th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Join Date</th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Status</th>
                                <th className="px-6 py-4"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {EMPLOYEES.map((emp) => (
                                <tr key={emp.id} className="hover:bg-muted/30 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-accent text-accent-foreground font-bold flex items-center justify-center text-sm">
                                                {emp.name.split(' ').map(n => n[0]).join('')}
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold">{emp.name}</p>
                                                <p className="text-xs text-muted-foreground">{emp.role}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm font-medium text-slate-500">{emp.id}</td>
                                    <td className="px-6 py-4 text-sm font-medium">{emp.dept}</td>
                                    <td className="px-6 py-4 text-sm text-muted-foreground">{emp.joinDate}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider ${emp.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                                            }`}>
                                            {emp.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="p-2 rounded-lg hover:bg-muted text-muted-foreground transition-colors">
                                            <MoreVertical size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="p-4 border-t border-border bg-slate-50/50 flex items-center justify-between">
                    <p className="text-xs text-muted-foreground">Showing 1-6 of 128 employees</p>
                    <div className="flex gap-2">
                        <button className="glass px-3 py-1.5 rounded-lg text-xs font-bold border-border disabled:opacity-50" disabled>Previous</button>
                        <button className="glass px-3 py-1.5 rounded-lg text-xs font-bold border-border">Next</button>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
