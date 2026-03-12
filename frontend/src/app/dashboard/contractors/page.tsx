"use client";

import { motion } from "framer-motion";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Users, UserPlus, FileText, IndianRupee, Search, MoreHorizontal } from "lucide-react";

export default function ContractorsPage() {
    return (
        <DashboardLayout>
            <div className="space-y-8">
                <header className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Contractors</h1>
                        <p className="text-muted-foreground">Manage non-employee staff and professional services.</p>
                    </div>
                    <button className="bg-primary text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all flex items-center gap-2 active:scale-95">
                        <UserPlus size={18} /> Add Contractor
                    </button>
                </header>

                {/* Summary Widgets */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="premium-card p-6 flex items-center gap-4">
                        <div className="bg-blue-50 text-blue-600 p-4 rounded-2xl">
                            <Users size={24} />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Total Contractors</p>
                            <p className="text-2xl font-bold">8</p>
                        </div>
                    </div>
                    <div className="premium-card p-6 flex items-center gap-4">
                        <div className="bg-purple-50 text-purple-600 p-4 rounded-2xl">
                            <IndianRupee size={24} />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Total Payouts (Feb)</p>
                            <p className="text-2xl font-bold">₹1,45,000</p>
                        </div>
                    </div>
                    <div className="premium-card p-6 flex items-center gap-4">
                        <div className="bg-orange-50 text-orange-600 p-4 rounded-2xl">
                            <FileText size={24} />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Total TDS Collected</p>
                            <p className="text-2xl font-bold">₹14,500</p>
                        </div>
                    </div>
                </div>

                {/* Search and Filters */}
                <div className="premium-card p-4 flex items-center gap-4">
                    <div className="relative flex-grow">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                        <input
                            placeholder="Search contractors by name or PAN..."
                            className="w-full pl-10 pr-4 py-2 bg-slate-50 border-none rounded-xl text-sm focus:ring-1 focus:ring-primary/20"
                        />
                    </div>
                    <button className="px-4 py-2 border border-border rounded-xl text-sm font-medium hover:bg-slate-50">Filter</button>
                </div>

                {/* Contractor Table */}
                <div className="premium-card overflow-hidden">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-slate-50 border-b border-border">
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Name</th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Type</th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">TDS Section</th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Monthly Fee</th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {[
                                { name: "Rahul S.", type: "Professional", section: "194J (10%)", fee: "₹50,000" },
                                { name: "Priya K.", type: "Technical", section: "194J (10%)", fee: "₹35,000" },
                                { name: "Global Const.", type: "Contractor", section: "194C (2%)", fee: "₹60,000" },
                            ].map((c, i) => (
                                <motion.tr
                                    key={i}
                                    className="hover:bg-slate-50/50 transition-colors group"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: i * 0.05 }}
                                >
                                    <td className="px-6 py-4">
                                        <div className="font-semibold">{c.name}</div>
                                        <div className="text-[10px] text-muted-foreground font-mono">ABCDE1234F</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded text-[10px] font-bold uppercase">{c.type}</span>
                                    </td>
                                    <td className="px-6 py-4 font-medium text-sm text-muted-foreground">{c.section}</td>
                                    <td className="px-6 py-4 font-bold">{c.fee}</td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="p-2 hover:bg-white rounded-lg transition-colors border-border">
                                            <MoreHorizontal size={16} />
                                        </button>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </DashboardLayout>
    );
}
