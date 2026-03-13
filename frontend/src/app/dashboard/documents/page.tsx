"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import { FolderOpen, FileText, Upload, MoreVertical, Plus, Lock, CheckCircle2, Search, Download, Trash2, ShieldAlert, ArrowLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";

const INITIAL_FOLDERS = [
    { name: "Company Policies", count: 12, size: "14.2 MB", icon: FolderOpen, color: "text-blue-500", bg: "bg-blue-50", blob: "bg-blue-100/50" },
    { name: "Identity Proofs", count: 156, size: "205.8 MB", icon: Lock, color: "text-purple-500", bg: "bg-purple-50", blob: "bg-purple-100/50" },
    { name: "Tax Deductions (Form 16)", count: 45, size: "45.1 MB", icon: FileText, color: "text-emerald-500", bg: "bg-emerald-50", blob: "bg-emerald-100/50" },
    { name: "Compliance Forms", count: 8, size: "2.5 MB", icon: ShieldAlert, color: "text-amber-500", bg: "bg-amber-50", blob: "bg-amber-100/50" },
];

const THEMES = [
    { color: "text-blue-500", bg: "bg-blue-50", blob: "bg-blue-100/50" },
    { color: "text-purple-500", bg: "bg-purple-50", blob: "bg-purple-100/50" },
    { color: "text-emerald-500", bg: "bg-emerald-50", blob: "bg-emerald-100/50" },
    { color: "text-amber-500", bg: "bg-amber-50", blob: "bg-amber-100/50" },
];

const RECENT_FILES = [
    { name: "Employee_Handbook_2026.pdf", type: "PDF", date: "Oct 24, 2026", size: "2.4 MB", uploader: "HR Team" },
    { name: "Q3_Appraisal_Guidelines.pdf", type: "PDF", date: "Oct 20, 2026", size: "1.1 MB", uploader: "Management" },
    { name: "Holiday_Calendar_2026.xlsx", type: "Spreadsheet", date: "Oct 15, 2026", size: "145 KB", uploader: "HR Team" },
    { name: "Ganesh_HS_Offer_Letter.pdf", type: "PDF", date: "Oct 10, 2026", size: "890 KB", uploader: "Recruitment" },
];

const ITEMS_PER_PAGE = 5;

export default function DocumentsPage() {
    const router = useRouter();
    const [folders, setFolders] = useState(INITIAL_FOLDERS);
    const [recentFiles, setRecentFiles] = useState(RECENT_FILES);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [showNewFolder, setShowNewFolder] = useState(false);
    const [showUpload, setShowUpload] = useState(false);
    const [newFolderName, setNewFolderName] = useState("");
    const [activeMenu, setActiveMenu] = useState<string | null>(null);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setActiveMenu(null);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleDeleteFolder = (name: string) => {
        setFolders(folders.filter(f => f.name !== name));
        setActiveMenu(null);
    };

    const handleDeleteFile = (name: string) => {
        setRecentFiles(recentFiles.filter(f => f.name !== name));
    };

    const handleDownloadFile = (fileName: string) => {
        // Professional simulation of file download
        const dummyContent = "SECURE_VAULT_ENCRYPTED_FILE_CONTENT";
        const blob = new Blob([dummyContent], { type: "application/pdf" });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", fileName);
        document.body.appendChild(link);
        link.click();
        link.parentNode?.removeChild(link);
    };

    const handleCreateFolder = () => {
        if (!newFolderName.trim()) return;
        
        const themeIndex = folders.length % THEMES.length;
        const theme = THEMES[themeIndex];

        const newFolder = {
            name: newFolderName.trim(),
            count: 0,
            size: "0 KB",
            icon: FolderOpen,
            color: theme.color,
            bg: theme.bg,
            blob: theme.blob
        };
        
        setFolders([newFolder, ...folders]);
        setNewFolderName("");
        setShowNewFolder(false);
    };

    const filteredFolders = folders.filter(f => 
        f.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const filteredFiles = recentFiles.filter(f => 
        f.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        f.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        f.uploader.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Pagination Logic
    const totalPages = Math.ceil(filteredFiles.length / ITEMS_PER_PAGE);
    const paginatedFiles = filteredFiles.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    // Reset to page 1 when searching
    const handleSearchChange = (val: string) => {
        setSearchTerm(val);
        setCurrentPage(1);
    };

    return (
        <DashboardLayout>
            <div className="space-y-8 relative">
                {/* Modals */}
                <AnimatePresence>
                    {(showNewFolder || showUpload) && (
                        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                            <motion.div 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => { setShowNewFolder(false); setShowUpload(false); }}
                                className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
                            />
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden"
                            >
                                <div className="p-8">
                                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${showNewFolder ? 'bg-blue-50 text-blue-500' : 'bg-primary/10 text-primary'}`}>
                                        {showNewFolder ? <Plus size={32} /> : <Upload size={32} />}
                                    </div>
                                    <h2 className="text-2xl font-black text-[#0F172A] mb-2">
                                        {showNewFolder ? "Create New Folder" : "Upload New File"}
                                    </h2>
                                    <p className="text-[#64748B] font-medium mb-8">
                                        {showNewFolder ? "Enter a name for your new secure vault folder." : "Select a document to securely upload to the vault."}
                                    </p>
                                    
                                    <div className="space-y-4">
                                        <div>
                                            <label className="text-[11px] font-bold uppercase tracking-wider text-[#94A3B8] block mb-2">{showNewFolder ? "Folder Name" : "Select File Type"}</label>
                                            <input 
                                                autoFocus
                                                value={newFolderName}
                                                onChange={(e) => setNewFolderName(e.target.value)}
                                                onKeyDown={(e) => e.key === 'Enter' && handleCreateFolder()}
                                                placeholder={showNewFolder ? "e.g. Finance Reports" : "PDF, Images, or Spreadsheets"}
                                                className="w-full bg-slate-50 border border-slate-100 outline-none p-4 rounded-xl font-bold text-[#0F172A] focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all"
                                            />
                                        </div>
                                        <div className="flex gap-4 pt-4">
                                            <button 
                                                onClick={() => { setShowNewFolder(false); setShowUpload(false); setNewFolderName(""); }}
                                                className="flex-1 px-6 py-4 rounded-xl font-black text-[#64748B] hover:bg-slate-50 transition-all active:scale-95"
                                            >
                                                Cancel
                                            </button>
                                            <button 
                                                onClick={showNewFolder ? handleCreateFolder : () => setShowUpload(false)}
                                                className="flex-1 bg-[#1D4ED8] text-white px-6 py-4 rounded-xl font-black shadow-lg shadow-primary/25 hover:bg-blue-700 transition-all active:scale-95 border border-white/10"
                                            >
                                                {showNewFolder ? "Create" : "Upload"}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>
                
                {/* Back Button & Navigation */}
                <div className="flex items-center gap-4 mb-2">
                    <button 
                        onClick={() => router.push('/dashboard')}
                        className="group flex items-center gap-2 text-sm font-bold text-[#64748B] hover:text-primary transition-all pr-4 py-1.5"
                    >
                        <div className="w-8 h-8 rounded-full bg-white border border-slate-100 flex items-center justify-center shadow-sm group-hover:border-primary/20 group-hover:bg-slate-50 transition-all">
                            <ArrowLeft size={16} />
                        </div>
                        <span>Back to Home</span>
                    </button>
                    <div className="h-4 w-px bg-slate-200 hidden md:block"></div>
                    <div className="flex items-center gap-2 text-[12px] font-bold text-[#94A3B8] uppercase tracking-wider">
                        <span>Dashboard</span>
                        <ChevronRight size={12} />
                        <span className="text-[#0F172A]">Documents</span>
                    </div>
                </div>

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <h1 className="text-3xl font-black text-[#0F172A] mb-2">Vault & Documents</h1>
                        <p className="text-[#475569] font-medium">Securely store and share compliance, identity, and company documents.</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <button 
                            onClick={() => setShowNewFolder(true)}
                            className="bg-white border-2 border-slate-100 text-[#0F172A] px-6 py-3.5 rounded-xl font-black hover:border-primary/20 hover:bg-slate-50/50 transition-all flex items-center gap-2 active:scale-95 shadow-sm"
                        >
                            <Plus size={20} className="text-primary" /> New Folder
                        </button>
                        <button 
                            onClick={() => setShowUpload(true)}
                            className="bg-[#1D4ED8] text-white px-8 py-3.5 rounded-xl font-black shadow-xl shadow-blue-500/20 hover:bg-blue-700 transition-all flex items-center gap-2 active:scale-95 border border-white/10"
                        >
                            <Upload size={20} /> Upload File
                        </button>
                    </div>
                </div>

                {/* Secure Storage Banner */}
                <div className="premium-card bg-gradient-to-br from-blue-50 via-white to-slate-50 p-8 md:p-10 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 border border-blue-100 shadow-xl shadow-blue-500/5">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100/30 rounded-full blur-[100px] -mr-20 -mt-20"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-slate-100/50 rounded-full blur-[80px] -ml-10 -mb-10"></div>
                    <div className="relative z-10 flex items-center gap-6">
                        <div className="w-24 h-24 shrink-0 bg-white rounded-3xl border border-blue-100 shadow-lg flex items-center justify-center overflow-hidden relative group/icon">
                            <div className="absolute inset-0 bg-gradient-to-t from-blue-50 to-transparent"></div>
                            <FolderOpen size={48} className="text-primary drop-shadow-sm relative z-10" strokeWidth={1.5} />
                        </div>
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <h2 className="text-2xl font-black tracking-tight text-[#0F172A]">Bank-Grade Secure Vault</h2>
                                <div className="px-2 py-0.5 bg-blue-100 text-blue-600 rounded text-[10px] font-black uppercase tracking-wider border border-blue-200">Active</div>
                            </div>
                            <p className="text-[#64748B] text-sm font-semibold max-w-md leading-relaxed">All sensitive documents are 256-bit encrypted and stored on compliant tier-4 servers.</p>
                        </div>
                    </div>
                    <div className="relative z-10 flex flex-col items-end shrink-0 w-full md:w-auto bg-white/80 p-6 rounded-2xl border border-blue-100 backdrop-blur-md shadow-sm">
                        <div className="flex items-center justify-between w-full md:w-48 mb-3">
                            <span className="text-[10px] font-black text-[#94A3B8] tracking-[0.2em] uppercase">Storage Used</span>
                            <span className="text-xs font-black text-[#0F172A]">45.5%</span>
                        </div>
                        <div className="w-full md:w-48 h-2.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200 p-[1px]">
                            <div className="h-full bg-gradient-to-r from-primary to-blue-400 w-[45%] rounded-full shadow-sm"></div>
                        </div>
                        <p className="text-[10px] font-bold text-[#64748B] mt-3 flex items-center gap-1.5">
                            <CheckCircle2 size={10} className="text-emerald-500" /> Enterprise Plan Verified
                        </p>
                    </div>
                </div>

                {/* Folders Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {filteredFolders.map((folder, i) => (
                        <motion.div
                            key={folder.name}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="premium-card p-6 bg-white border-[#F1F5F9] hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5 transition-all group cursor-pointer relative"
                        >
                            {/* Decorative Edge Blob - Contained in a separate overflow-hidden layer */}
                            <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
                                <div className={`absolute top-0 right-0 w-24 h-24 rounded-bl-full ${folder.blob} opacity-0 group-hover:opacity-100 transition-all duration-500 scale-90 group-hover:scale-100 origin-top-right`}></div>
                            </div>

                            <div className="flex items-start justify-between mb-6 relative z-10">
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${folder.bg} ${folder.color} group-hover:scale-110 transition-transform`}>
                                    <folder.icon size={24} />
                                </div>
                                <div className="relative">
                                    <button 
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setActiveMenu(activeMenu === folder.name ? null : folder.name);
                                        }}
                                        className="text-[#94A3B8] hover:text-slate-600 transition-colors p-1 rounded-lg hover:bg-slate-100 active:scale-95"
                                    >
                                        <MoreVertical size={18} />
                                    </button>

                                    <AnimatePresence>
                                        {activeMenu === folder.name && (
                                            <motion.div 
                                                ref={menuRef}
                                                initial={{ opacity: 0, scale: 0.95, y: -10 }}
                                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                                                className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-[0_10px_40px_-5px_rgba(0,0,0,0.15)] border border-slate-200 py-2 z-[60] overflow-hidden"
                                            >
                                                <button className="w-full text-left px-4 py-2.5 text-sm font-bold text-[#475569] hover:bg-slate-50 transition-colors flex items-center gap-2">
                                                    <Download size={14} className="text-slate-400" /> Download Folder
                                                </button>
                                                <button className="w-full text-left px-4 py-2.5 text-sm font-bold text-[#475569] hover:bg-slate-50 transition-colors flex items-center gap-2">
                                                    <FolderOpen size={14} className="text-slate-400" /> Rename Folder
                                                </button>
                                                <div className="my-1 border-t border-slate-100"></div>
                                                <button 
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleDeleteFolder(folder.name);
                                                    }}
                                                    className="w-full text-left px-4 py-2.5 text-sm font-black text-danger hover:bg-red-50 transition-colors flex items-center gap-2"
                                                >
                                                    <Trash2 size={14} /> Delete Folder
                                                </button>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
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
                                value={searchTerm}
                                onChange={(e) => handleSearchChange(e.target.value)}
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
                                <AnimatePresence mode="popLayout">
                                    {paginatedFiles.map((file, i) => (
                                        <motion.tr
                                            key={file.name}
                                            layout
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, scale: 0.95 }}
                                            transition={{ duration: 0.2 }}
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
                                                <div className="flex items-center justify-end gap-2 text-[#94A3B8]">
                                                    <button 
                                                        onClick={() => handleDownloadFile(file.name)}
                                                        className="p-2 hover:text-primary hover:bg-primary/5 rounded-lg transition-all active:scale-90 opacity-40 group-hover:opacity-100"
                                                        title="Download File"
                                                    >
                                                        <Download size={16} />
                                                    </button>
                                                    <button 
                                                        onClick={() => handleDeleteFile(file.name)}
                                                        className="p-2 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all active:scale-90 opacity-40 group-hover:opacity-100"
                                                        title="Delete File"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            </td>
                                        </motion.tr>
                                    ))}
                                </AnimatePresence>
                            </tbody>
                        </table>
                    </div>
                    {/* Pagination */}
                    <div className="p-6 border-t border-[#F8FAFC] flex items-center justify-between text-sm font-bold text-[#64748B]">
                        <span>
                            Showing {Math.min(filteredFiles.length, (currentPage - 1) * ITEMS_PER_PAGE + 1)} to {Math.min(filteredFiles.length, currentPage * ITEMS_PER_PAGE)} of {filteredFiles.length} files
                        </span>
                        <div className="flex items-center gap-1">
                            <button 
                                onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
                                disabled={currentPage === 1}
                                className={`px-3 py-1 rounded-lg transition-all ${currentPage === 1 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-slate-100 text-[#1E293B]'}`}
                            >
                                Prev
                            </button>
                            
                            {[...Array(totalPages)].map((_, i) => (
                                <button
                                    key={i + 1}
                                    onClick={() => handlePageChange(i + 1)}
                                    className={`w-8 h-8 rounded-lg transition-all ${currentPage === i + 1 ? 'bg-primary text-white shadow-md shadow-primary/20' : 'hover:bg-slate-100 text-[#1E293B]'}`}
                                >
                                    {i + 1}
                                </button>
                            ))}

                            <button 
                                onClick={() => currentPage < totalPages && setCurrentPage(currentPage + 1)}
                                disabled={currentPage === totalPages || totalPages === 0}
                                className={`px-3 py-1 rounded-lg transition-all ${currentPage === totalPages || totalPages === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-slate-100 text-[#1E293B]'}`}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
