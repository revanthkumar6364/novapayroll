"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import {
    Plus, Clock, CheckCircle2, AlertCircle
} from "lucide-react";

const RUNS = [
    { month: "March", year: 2026, status: "Review", amount: "₹42,50,000", employees: 128, type: "Regular" },
    { month: "February", year: 2026, status: "Paid", amount: "₹41,20,000", employees: 125, type: "Regular" },
    { month: "January", year: 2026, status: "Paid", amount: "₹40,80,000", employees: 124, type: "Regular" },
];

export default function PayrollPage() {
    return (
        <DashboardLayout>
            <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Payroll</h1>
                    <p className="text-muted-foreground">Manage payment cycles, approve runs, and generate payslips.</p>
                </div>
                <button className="bg-primary text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all flex items-center gap-2">
                    <Plus size={20} /> New Monthly Run
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    {/* Active Run Card */}
                    <div className="premium-card p-1 border-primary/20 overflow-hidden relative">
                        <div className="absolute top-0 right-0 p-4">
                            <div className="bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded">Current active cycle</div>
                        </div>
                        <div className="p-8">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-16 h-16 rounded-2xl bg-primary flex flex-col items-center justify-center text-white">
                                    <span className="text-[10px] font-bold uppercase">Mar</span>
                                    <span className="text-2xl font-bold">26</span>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold">March 2026 Payroll</h3>
                                    <p className="text-muted-foreground text-sm">Calculation completed • 128 Employees</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-4 mb-8">
                                <div className="bg-slate-50 p-4 rounded-xl border border-border">
                                    <p className="text-[10px] text-muted-foreground uppercase font-bold mb-1">Total Payout</p>
                                    <p className="text-lg font-bold">₹42.50L</p>
                                </div>
                                <div className="bg-slate-50 p-4 rounded-xl border border-border">
                                    <p className="text-[10px] text-muted-foreground uppercase font-bold mb-1">Deductions</p>
                                    <p className="text-lg font-bold">₹2.15L</p>
                                </div>
                                <div className="bg-slate-50 p-4 rounded-xl border border-border">
                                    <p className="text-[10px] text-muted-foreground uppercase font-bold mb-1">Compliance</p>
                                    <p className="text-lg font-bold">₹4.20L</p>
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <button className="bg-primary text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all flex-grow">
                                    Continue to Review & Approval
                                </button>
                                <button className="p-3 border border-border rounded-xl hover:bg-muted transition-colors">
                                    <Clock size={20} className="text-muted-foreground" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* History */}
                    <h3 className="text-lg font-bold mt-8 mb-4">Past Payroll History</h3>
                    <div className="space-y-4">
                        {RUNS.slice(1).map((run, i) => (
                            <div key={i} className="premium-card p-6 flex items-center justify-between group">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-slate-100 flex flex-col items-center justify-center text-slate-500 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                                        <span className="text-[8px] font-bold uppercase">{run.month.substring(0, 3)}</span>
                                        <span className="text-md font-bold text-slate-700 group-hover:text-primary">{run.year.toString().substring(2)}</span>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-sm">{run.month} {run.year} Run</h4>
                                        <p className="text-xs text-muted-foreground">{run.employees} Employees • {run.type}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold text-sm mb-1">{run.amount}</p>
                                    <div className="flex items-center gap-1 justify-end text-[10px] font-bold text-green-600 uppercase tracking-tighter">
                                        <CheckCircle2 size={12} />
                                        {run.status}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Sidebar Widgets */}
                <div className="space-y-6">
                    <div className="premium-card p-6">
                        <h4 className="font-bold mb-4 flex items-center gap-2">
                            <AlertCircle size={16} className="text-blue-500" />
                            Payroll Checklist
                        </h4>
                        <div className="space-y-3">
                            {[
                                { label: "Update attendance", done: true },
                                { label: "Check for salary revisions", done: true },
                                { label: "Verify LOP and overtime", done: true },
                                { label: "Generate draft run", done: true },
                                { label: "Approve for payout", done: false },
                                { label: "Release payslips", done: false },
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <div className={`w-4 h-4 rounded border flex items-center justify-center ${item.done ? "bg-primary border-primary text-white" : "border-slate-300"}`}>
                                        {item.done && <CheckCircle2 size={10} />}
                                    </div>
                                    <span className={`text-xs ${item.done ? "text-slate-400 line-through" : "text-slate-600"}`}>
                                        {item.label}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="premium-card p-6 bg-slate-900 text-white">
                        <h4 className="font-bold mb-2">Compliance Vault</h4>
                        <p className="text-[11px] text-slate-400 mb-6">Your statutory filings are automatically generated and ready for submission.</p>
                        <button className="w-full bg-white/10 hover:bg-white/20 text-white text-xs font-bold py-2.5 rounded-lg transition-all border border-white/10">
                            View Compliance Center
                        </button>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
