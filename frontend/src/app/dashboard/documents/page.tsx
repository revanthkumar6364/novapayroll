"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import { FolderOpen, FileText, Upload, MoreVertical, Plus, Lock, CheckCircle2, Search, Download, Trash2, ShieldAlert } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

const FOLDERS = [
    { name: "Company Policies", count: 12, size: "14.2 MB", icon: FolderOpen, color: "text-blue-500", bg: "bg-blue-50" },
    { name: "Identity Proofs", count: 156, size: "205.8 MB", icon: Lock, color: "text-purple-500", bg: "bg-purple-50" },
    { name: "Tax Deductions (Form 16)", count: 45, size: "45.1 MB", icon: FileText, color: "text-emerald-500", bg: "bg-emerald-50" },
    { name: "Compliance Forms", count: 8, size: "2.5 MB", icon: ShieldAlert, color: "text-amber-500", bg: "bg-amber-50" },
];

const RECENT_FILES = [
    { name: "Employee_Handbook_2026.pdf", type: "PDF", date: "Oct 24, 2026", size: "2.4 MB", uploader: "HR Team" },
    { name: "Q3_Appraisal_Guidelines.pdf", type: "PDF", date: "Oct 20, 2026", size: "1.1 MB", uploader: "Management" },
    { name: "Holiday_Calendar_2026.xlsx", type: "Spreadsheet", date: "Oct 15, 2026", size: "145 KB", uploader: "HR Team" },
    { name: "Ganesh_HS_Offer_Letter.pdf", type: "PDF", date: "Oct 10, 2026", size: "890 KB", uploader: "Recruitment" },
];

export default function DocumentsPage() {
    return (
        <DashboardLayout>
            <div className="space-y-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <h1 className="text-3xl font-black text-[#0F172A] mb-2">Vault & Documents</h1>
                        <p className="text-[#475569] font-medium">Securely store and share compliance, identity, and company documents.</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="bg-white border border-slate-200 text-[#1E293B] px-6 py-3 rounded-xl font-bold hover:bg-slate-50 transition-all flex items-center gap-2 active:scale-95 shadow-sm">
                            <Plus size={18} /> New Folder
                        </button>
                        <button className="bg-primary text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all flex items-center gap-2 active:scale-95">
                            <Upload size={18} /> Upload File
                        </button>
                    </div>
                </div>

                {/* Secure Storage Banner */}
                <div className="premium-card bg-primary p-8 md:p-10 relative overflow-hidden text-primary-foreground flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[80px] -mr-10 -mt-10"></div>
                    <div className="relative z-10 flex items-center gap-6">
                        <div className="w-24 h-24 shrink-0 bg-white/10 rounded-2xl border border-white/20 backdrop-blur-md flex items-center justify-center shadow-inner overflow-hidden relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
                            <FolderOpen size={44} className="text-white drop-shadow-md relative z-10" strokeWidth={1.5} />
                        </div>
                        <div>
                            <h2 className="text-xl font-black mb-1">Bank-Grade Secure Vault</h2>
                            <p className="text-white/60 text-sm font-medium">All sensitive documents are 256-bit encrypted and stored on compliant servers.</p>
                        </div>
                    </div>
                    <div className="relative z-10 flex flex-col items-end shrink-0 w-full md:w-auto">
                        <div className="flex items-center justify-between w-full md:w-48 mb-2">
                            <span className="text-xs font-bold text-white/50 tracking-wider uppercase">Storage Used</span>
                            <span className="text-xs font-black text-white">45.5 GB / 100 GB</span>
                        </div>
                        <div className="w-full md:w-48 h-2 bg-white/10 rounded-full overflow-hidden">
                            <div className="h-full bg-primary w-[45%] shadow-[0_0_8px_rgba(36,93,241,0.5)]"></div>
                        </div>
                    </div>
                </div>

                {/* Folders Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {FOLDERS.map((folder, i) => (
                        <motion.div
                            key={folder.name}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="premium-card p-6 bg-white border-[#F1F5F9] hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5 transition-all group cursor-pointer"
                        >
                            <div className="flex items-start justify-between mb-6">
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${folder.bg} ${folder.color} group-hover:scale-110 transition-transform`}>
                                    <folder.icon size={24} />
                                </div>
                                <button className="text-[#94A3B8] hover:text-slate-600 transition-colors p-1">
                                    <MoreVertical size={18} />
                                </button>
                            </div>
                            <h3 className="text-lg font-black text-[#0F172A] mb-1 leading-tight">{folder.name}</h3>
                            <div className="flex items-center justify-between mt-4 text-xs font-bold text-[#64748B]">
                                <span className="flex items-center gap-1"><FileText size={12} /> {folder.count} files</span>
                                <span>{folder.size}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Recent Files Table */}
                <div className="premium-card bg-white border border-[#F1F5F9]">
                    <div className="p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-[#F8FAFC]">
                        <h2 className="text-xl font-black text-[#0F172A]">Recent Files</h2>
                        <div className="relative max-w-sm w-full">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94A3B8]" size={16} />
                            <input
                                placeholder="Search documents..."
                                className="w-full bg-slate-50 border border-[#F1F5F9] outline-none pl-11 pr-4 py-2.5 rounded-xl text-sm font-medium focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                            />
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-[#F8FAFC] bg-slate-50/50 text-[10px] uppercase tracking-wider font-black text-[#64748B]">
                                    <th className="p-4 md:p-6 rounded-tl-3xl">File Name</th>
                                    <th className="p-4 md:p-6">Date Modified</th>
                                    <th className="p-4 md:p-6 hidden sm:table-cell">Size</th>
                                    <th className="p-4 md:p-6 hidden md:table-cell">Uploaded By</th>
                                    <th className="p-4 md:p-6 text-right rounded-tr-3xl">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50 text-sm font-medium text-[#1E293B]">
                                {RECENT_FILES.map((file, i) => (
                                    <motion.tr
                                        key={i}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: i * 0.05 }}
                                        className="hover:bg-slate-50/50 transition-colors group"
                                    >
                                        <td className="p-4 md:p-6">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-lg bg-red-50 text-red-500 flex items-center justify-center shrink-0">
                                                    <FileText size={18} />
                                                </div>
                                                <div>
                                                    <p className="font-bold text-[#0F172A] line-clamp-1">{file.name}</p>
                                                    <p className="text-xs text-[#64748B] mt-0.5">{file.type}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4 md:p-6 text-[#475569] whitespace-nowrap">{file.date}</td>
                                        <td className="p-4 md:p-6 text-[#64748B] font-bold hidden sm:table-cell">{file.size}</td>
                                        <td className="p-4 md:p-6 hidden md:table-cell">
                                            <div className="flex items-center gap-2">
                                                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-[10px] font-black tracking-tighter text-primary">
                                                    {file.uploader.substring(0, 2).toUpperCase()}
                                                </div>
                                                <span className="text-slate-600">{file.uploader}</span>
                                            </div>
                                        </td>
                                        <td className="p-4 md:p-6 text-right">
                                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button className="p-2 text-[#64748B] hover:text-primary hover:bg-primary/5 rounded-lg transition-colors">
                                                    <Download size={16} />
                                                </button>
                                                <button className="p-2 text-[#64748B] hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {/* Pagination */}
                    <div className="p-6 border-t border-[#F8FAFC] flex items-center justify-between text-sm font-bold text-[#64748B]">
                        <span>Showing 4 of 215 files</span>
                        <div className="flex items-center gap-1">
                            <button className="px-3 py-1 rounded-lg hover:bg-slate-100 transition-colors opacity-50 cursor-not-allowed">Prev</button>
                            <button className="px-3 py-1 bg-primary text-white rounded-lg shadow-md shadow-primary/20">1</button>
                            <button className="px-3 py-1 rounded-lg hover:bg-slate-100 transition-colors">2</button>
                            <button className="px-3 py-1 rounded-lg hover:bg-slate-100 transition-colors">3</button>
                            <span className="px-2">...</span>
                            <button className="px-3 py-1 rounded-lg hover:bg-slate-100 transition-colors">Next</button>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
