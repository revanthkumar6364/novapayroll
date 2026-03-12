"use client";

import EmployeeLayout from "@/components/layout/EmployeeLayout";
import { Download, Eye, FileText, TrendingUp, Calendar, ChevronRight } from "lucide-react";

const PAYSLIPS = [
    { month: "February", year: 2026, amount: "₹85,400", date: "Feb 28", status: "Paid" },
    { month: "January", year: 2026, amount: "₹85,400", date: "Jan 31", status: "Paid" },
    { month: "December", year: 2025, amount: "₹82,000", date: "Dec 30", status: "Paid" },
    { month: "November", year: 2025, amount: "₹82,000", date: "Nov 30", status: "Paid" },
];

export default function PayslipsPage() {
    return (
        <EmployeeLayout>
            <div className="max-w-4xl mx-auto">
                <div className="mb-10">
                    <h1 className="text-3xl font-bold mb-2">My Payslips</h1>
                    <p className="text-muted-foreground">Download your monthly salary statements and tax summaries.</p>
                </div>

                {/* Highlight - Latest Payslip */}
                <div className="premium-card p-8 mb-10 bg-gradient-to-br from-primary to-blue-600 text-white border-none">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div className="flex items-center gap-6">
                            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center">
                                <FileText size={32} />
                            </div>
                            <div>
                                <p className="text-white/70 text-sm font-medium uppercase tracking-wider">Latest Payslip • Feb 2026</p>
                                <h3 className="text-3xl font-bold">₹85,400</h3>
                                <p className="text-white/80 text-xs">Deposited to HDFC Bank **** 1234 on Feb 28, 2026</p>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <button className="bg-white text-primary px-6 py-3 rounded-xl font-bold shadow-lg hover:bg-white/90 transition-all flex items-center gap-2">
                                <Download size={18} /> Download PDF
                            </button>
                        </div>
                    </div>
                </div>

                <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                    <Calendar size={20} className="text-primary" />
                    Payment History
                </h3>

                <div className="space-y-4">
                    {PAYSLIPS.map((slip, i) => (
                        <div key={i} className="premium-card p-6 flex items-center justify-between hover:border-primary/30 transition-all group">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                                    <FileText size={20} />
                                </div>
                                <div>
                                    <h4 className="font-bold">{slip.month} {slip.year}</h4>
                                    <p className="text-xs text-muted-foreground">Released on {slip.date}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-8">
                                <div className="text-right hidden sm:block">
                                    <p className="text-sm font-bold">{slip.amount}</p>
                                    <p className="text-[10px] uppercase font-bold text-green-600">Deposited</p>
                                </div>
                                <div className="flex gap-2">
                                    <button className="p-2.5 rounded-xl border border-border hover:bg-muted transition-all text-muted-foreground">
                                        <Eye size={18} />
                                    </button>
                                    <button className="p-2.5 rounded-xl border border-border hover:bg-muted transition-all text-muted-foreground">
                                        <Download size={18} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-12 p-8 rounded-3xl bg-accent/50 border border-accent flex items-start gap-4">
                    <div className="p-3 bg-white rounded-2xl text-primary shadow-sm">
                        <TrendingUp size={24} />
                    </div>
                    <div>
                        <h4 className="font-bold mb-1">Tax Investment Declaration</h4>
                        <p className="text-sm text-muted-foreground mb-4">The window to submit your tax saving investment proofs for FY 2025-26 is now open. Submit by March 15 to avoid excess TDS.</p>
                        <button className="text-primary font-bold text-sm hover:underline flex items-center gap-1">
                            Go to Tax Declarations <ChevronRight size={14} />
                        </button>
                    </div>
                </div>
            </div>
        </EmployeeLayout>
    );
}
