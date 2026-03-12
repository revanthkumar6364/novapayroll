"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import { Gavel, Landmark, ShieldAlert, CheckCircle2, Copy } from "lucide-react";

export default function StatutorySettings() {
    return (
        <DashboardLayout>
            <div className="max-w-4xl space-y-8">
                <header>
                    <h1 className="text-3xl font-bold tracking-tight">Statutory Settings</h1>
                    <p className="text-muted-foreground mt-1">Configure your organization&apos;s legal and tax identifiers.</p>
                </header>

                <div className="grid grid-cols-1 gap-8">
                    {/* PF & ESI Section */}
                    <div className="premium-card p-8">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="bg-indigo-50 text-indigo-600 p-2 rounded-lg">
                                <Gavel size={20} />
                            </div>
                            <h3 className="text-lg font-bold">Social Security (PF & ESIC)</h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <label className="text-sm font-semibold block">PF Establishment ID</label>
                                <div className="relative">
                                    <input
                                        defaultValue="MH/BAN/0012345/000"
                                        className="w-full px-4 py-3 rounded-xl border border-border outline-none focus:border-primary transition-all bg-slate-50 font-mono text-sm"
                                    />
                                    <Copy className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground cursor-pointer hover:text-foreground" size={14} />
                                </div>
                                <p className="text-[10px] text-muted-foreground">Assigned by Employees&apos; Provident Fund Organization.</p>
                            </div>
                            <div className="space-y-4">
                                <label className="text-sm font-semibold block">ESIC Registration No.</label>
                                <input
                                    defaultValue="31000123450001001"
                                    className="w-full px-4 py-3 rounded-xl border border-border outline-none focus:border-primary transition-all bg-slate-50 font-mono text-sm"
                                />
                                <p className="text-[10px] text-muted-foreground">Required if you have 10+ employees.</p>
                            </div>
                        </div>
                    </div>

                    {/* Income Tax Section */}
                    <div className="premium-card p-8">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="bg-emerald-50 text-emerald-600 p-2 rounded-lg">
                                <Landmark size={20} />
                            </div>
                            <h3 className="text-lg font-bold">Income Tax & P.T.</h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <label className="text-sm font-semibold block">TAN (Tax Deduction Account Number)</label>
                                <input
                                    defaultValue="MUMR12345G"
                                    className="w-full px-4 py-3 rounded-xl border border-border outline-none focus:border-primary transition-all bg-slate-50 font-mono text-sm uppercase"
                                />
                            </div>
                            <div className="space-y-4">
                                <label className="text-sm font-semibold block">Professional Tax (P.T.) RC No.</label>
                                <input
                                    defaultValue="27123456789P"
                                    className="w-full px-4 py-3 rounded-xl border border-border outline-none focus:border-primary transition-all bg-slate-50 font-mono text-sm"
                                />
                            </div>
                        </div>

                        <div className="mt-12 pt-8 border-t border-border space-y-6">
                            <h4 className="text-sm font-bold flex items-center gap-2">
                                <ShieldAlert size={16} className="text-orange-500" />
                                Authorized Signatory Details
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-medium text-muted-foreground">Full Name</label>
                                    <input className="w-full px-4 py-2 rounded-lg border border-border text-sm" placeholder="John Doe" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-medium text-muted-foreground">Designation</label>
                                    <input className="w-full px-4 py-2 rounded-lg border border-border text-sm" placeholder="Director" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end gap-3">
                        <button className="px-6 py-3 rounded-xl font-bold border border-border hover:bg-background transition-all">Discard Changes</button>
                        <button className="bg-primary text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all flex items-center gap-2">
                            <CheckCircle2 size={18} /> Update Settings
                        </button>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
