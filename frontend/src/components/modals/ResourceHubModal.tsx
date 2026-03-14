"use client";

import { motion, AnimatePresence } from "framer-motion";
import { 
    X, Book, Shield, Landmark, CreditCard, 
    Search, ExternalLink, Download, FileText, 
    Lock, CheckCircle2, ChevronRight, Globe,
    Zap, Cpu, Users
} from "lucide-react";
import { useState } from "react";

export type ResourceTab = 'Docs' | 'Pricing' | 'Security' | 'Compliance';

interface ResourceHubModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialTab?: ResourceTab;
}

export default function ResourceHubModal({ isOpen, onClose, initialTab = 'Docs' }: ResourceHubModalProps) {
    const [activeTab, setActiveTab] = useState<ResourceTab>(initialTab);

    const tabs: { id: ResourceTab; icon: any; label: string }[] = [
        { id: 'Docs', icon: Book, label: 'Documentation' },
        { id: 'Pricing', icon: CreditCard, label: 'Subscription' },
        { id: 'Security', icon: Shield, label: 'Trust Center' },
        { id: 'Compliance', icon: Landmark, label: 'Statutory' },
    ];

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-[#012652]/40 backdrop-blur-sm"
                    />
                    
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.98, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.98, y: 10 }}
                        className="relative w-full max-w-4xl h-[600px] bg-white rounded-2xl shadow-2xl overflow-hidden border border-[#E2E8F0] flex"
                    >
                        {/* Sidebar */}
                        <div className="w-64 bg-[#F8FAFC] border-r border-[#E2E8F0] flex flex-col">
                            <div className="p-6 border-b border-[#E2E8F0]">
                                <h3 className="text-xs font-bold text-[#64748B] uppercase tracking-[0.2em]">Resource Command</h3>
                            </div>
                            
                            <div className="flex-1 p-4 space-y-1">
                                {tabs.map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                                            activeTab === tab.id 
                                            ? "bg-white text-[#0D94FB] shadow-sm border border-[#E2E8F0]" 
                                            : "text-[#64748B] hover:bg-[#F1F5F9]"
                                        }`}
                                    >
                                        <tab.icon size={18} />
                                        {tab.label}
                                    </button>
                                ))}
                            </div>

                            <div className="p-6 bg-[#012652] text-white">
                                <div className="flex items-center gap-2 mb-2">
                                    <Globe size={14} className="text-[#0D94FB]" />
                                    <span className="text-[10px] font-bold uppercase tracking-widest">Global Status</span>
                                </div>
                                <p className="text-[11px] font-medium text-blue-100/60 leading-relaxed">
                                    All systems operational. Compliance registries active.
                                </p>
                            </div>
                        </div>

                        {/* Content Area */}
                        <div className="flex-1 flex flex-col bg-white">
                            <div className="px-8 py-5 border-b border-[#E2E8F0] flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <span className="text-xs font-bold text-[#64748B] uppercase tracking-wider">{activeTab}</span>
                                    <ChevronRight size={14} className="text-[#CBD5E1]" />
                                    <span className="text-xs font-bold text-[#012652]">Overview</span>
                                </div>
                                <button onClick={onClose} className="p-2 hover:bg-[#F8FAFC] rounded-lg text-[#94A3B8] transition-all">
                                    <X size={18} />
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                                {activeTab === 'Docs' && <DocsContent />}
                                {activeTab === 'Pricing' && <PricingContent />}
                                {activeTab === 'Security' && <SecurityContent />}
                                {activeTab === 'Compliance' && <ComplianceContent />}
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}

function DocsContent() {
    const [searchQuery, setSearchQuery] = useState("");
    const categories = [
        { title: "Core Architecture", desc: "Understanding the Nova Engine and Payroll logic.", icon: Cpu },
        { title: "API Reference", desc: "RESTful endpoints for custom integrations.", icon: Zap },
        { title: "Statutory Masters", desc: "Regional tax rules and legal disbursement docs.", icon: Landmark },
        { title: "Employee Hub", desc: "Self-service onboarding and portal management.", icon: Users },
        { title: "Compliance Guard", desc: "Automated auditing and legal validation protocols.", icon: Shield },
        { title: "Financial Node", desc: "Corporate banking and fund disbursement APIs.", icon: CreditCard },
    ];

    const filteredCategories = categories.filter(cat => 
        cat.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        cat.desc.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-8">
            <div className="space-y-2">
                <h4 className="text-2xl font-bold text-[#012652]">Knowledge Base</h4>
                <p className="text-sm text-[#64748B] font-medium">Explore technical documentation and operational guides for NovaPayroll.</p>
            </div>
            
            <div className="relative">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
                <input 
                    type="text" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search documentation..." 
                    className="w-full pl-12 pr-4 py-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl text-sm font-medium focus:ring-2 focus:ring-[#0D94FB]/20 focus:border-[#0D94FB] outline-none transition-all"
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                {filteredCategories.length > 0 ? filteredCategories.map((cat, i) => (
                    <motion.div 
                        layout
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        key={cat.title} 
                        className="p-5 border border-[#E2E8F0] rounded-2xl hover:border-[#0D94FB] transition-all cursor-pointer group"
                    >
                        <div className="w-10 h-10 bg-[#0D94FB]/10 rounded-xl flex items-center justify-center text-[#0D94FB] mb-4 group-hover:scale-110 transition-transform">
                            <cat.icon size={20} />
                        </div>
                        <h5 className="font-bold text-[#012652] mb-1">{cat.title}</h5>
                        <p className="text-[11px] text-[#64748B] leading-normal font-medium">{cat.desc}</p>
                    </motion.div>
                )) : (
                    <div className="col-span-2 py-10 text-center space-y-2">
                        <p className="text-sm font-bold text-[#012652]">No resources found</p>
                        <p className="text-xs text-[#64748B]">Try searching for 'API', 'Compliance' or 'Architecture'</p>
                    </div>
                )}
            </div>
        </div>
    );
}

function PricingContent() {
    const usageMetrics = [
        { label: 'Active Seats', val: '1,240 / 5,000', icon: Users },
        { label: 'Cloud Storage', val: '840 GB / 2 TB', icon: Cpu },
        { label: 'Network Bandwidth', val: '2.4 TB / 10 TB', icon: Zap },
    ];

    const tiers = [
        { title: 'Base Infrastructure', desc: 'Core server nodes and database instances.', icon: Cpu },
        { title: 'Network Egress', desc: 'Secure data transit and API mesh nodes.', icon: Globe },
        { title: 'Storage Vault', desc: 'Encrypted document and backup archival.', icon: Lock },
        { title: 'Compute Nodes', desc: 'High-scale processing for bulk payroll.', icon: Zap },
    ];

    return (
        <div className="space-y-8">
            <div className="p-8 bg-[#012652] rounded-3xl text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-full bg-[#0D94FB]/10 skew-x-[-20deg] -mr-32" />
                <div className="relative z-10 space-y-6">
                    <div className="flex items-center justify-between">
                        <div className="inline-block px-3 py-1 bg-[#0D94FB] rounded-full text-[10px] font-bold uppercase tracking-widest">Enterprise Elite</div>
                        <span className="text-[10px] font-bold text-blue-100/40 uppercase tracking-widest">Client: NV-9428-PX</span>
                    </div>
                    <div className="space-y-1">
                        <h4 className="text-3xl font-black italic tracking-tight">₹1.2M <span className="text-sm font-medium text-blue-100/40 not-italic">Annual</span></h4>
                        <p className="text-blue-100/60 text-sm font-medium italic">High-scale institutional subscription active since Jan 2024.</p>
                    </div>
                    <div className="flex items-center gap-10 pt-4 border-t border-white/10">
                        <div className="space-y-1">
                            <p className="text-[9px] font-bold text-blue-100/40 uppercase tracking-widest">Billing Rate</p>
                            <p className="text-sm font-bold text-white">Institutional Base</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-[9px] font-bold text-blue-100/40 uppercase tracking-widest">Next Invoice</p>
                            <p className="text-sm font-bold text-[#0D94FB]">April 15, 2026</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
                {usageMetrics.map((s, i) => (
                    <div key={i} className="p-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl space-y-2 group hover:border-[#0D94FB] transition-all cursor-default">
                        <div className="flex items-center justify-between text-[#64748B] group-hover:text-[#0D94FB]">
                            <s.icon size={16} />
                            <ChevronRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <div>
                            <p className="text-[9px] font-bold text-[#64748B] uppercase tracking-widest">{s.label}</p>
                            <p className="text-[13px] font-bold text-[#012652]">{s.val}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-2 gap-4">
                {tiers.map((tier, i) => (
                    <div key={i} className="p-5 border border-[#E2E8F0] rounded-2xl hover:border-[#0D94FB] transition-all cursor-pointer group bg-white shadow-sm hover:shadow-md">
                        <div className="w-10 h-10 bg-[#F1F5F9] rounded-xl flex items-center justify-center text-[#64748B] mb-4 group-hover:bg-[#0D94FB]/10 group-hover:text-[#0D94FB] transition-all">
                            <tier.icon size={20} />
                        </div>
                        <h5 className="font-bold text-[#012652] mb-1">{tier.title}</h5>
                        <p className="text-[11px] text-[#64748B] leading-normal font-bold">{tier.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

function SecurityContent() {
    const handleDownload = () => {
        const content = `===========================================================
                NOVAPAYROLL TRUST CENTER
            INDUSTRIAL SECURITY WHITEPAPER V1.0.4
===========================================================

DATE: March 2026
CLASSIFICATION: Public / Institutional
REGISTRY: Audit Shield Pro Verified

-----------------------------------------------------------
1. DATA ENCRYPTION & INFRASTRUCTURE
-----------------------------------------------------------
NovaPayroll employs industrial-grade encryption standards to 
ensure organization data isolation.

- At-Rest: AES-256-GCM (Galois/Counter Mode) with hardware-
  backed key management.
- In-Transit: TLS 1.3 with Perfect Forward Secrecy (PFS).
- Infrastructure: Isolated VPC nodes with multi-AZ redundancy.

-----------------------------------------------------------
2. COMPLIANCE & STATUTORY RIGOR
-----------------------------------------------------------
The platform is architected for strict adherence to regional
statutory mandates and global security frameworks.

- Regional Compliance: EPF, ESI, TDS, LWF, and PT (India).
- Global Standards: Designed for SOC2 Type II and GDPR.
- Audit Trails: Immutable logging for every administrative
  action within the high-scale industrial engine.

-----------------------------------------------------------
3. OPERATIONAL RESILIENCE
-----------------------------------------------------------
- Uptime SLA: 99.99% guaranteed through high-availability.
- Protection: Advanced DDoS mitigation and WAF filtering.
- Redundancy: Real-time database replication with <1 min RPO.

-----------------------------------------------------------
This document serves as an official overview of the security
protocols active on the NovaPayroll production environment.

(c) 2026 NovaPayroll Institutional. All Rights Reserved.
===========================================================`;
        
        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'NovaPayroll_Trust_Blueprint.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    const securityMetrics = [
        { label: 'Data Encryption', val: 'AES-256-GCM', icon: Lock },
        { label: 'Uptime SLA', val: '99.99% Guaranteed', icon: Globe },
        { label: 'Audit Logs', val: 'Immutable Registry', icon: FileText },
    ];

    const trustCards = [
        { title: "Network Isolation", desc: "Dedicated VPC environments with hardware isolation.", icon: Shield },
        { title: "Threat Sentinel", desc: "Real-time AI scanning for unauthorized access attempts.", icon: Zap },
        { title: "Sovereignty Mode", desc: "Local data residency within India/EU as per mandate.", icon: Landmark },
        { title: "Access Control", desc: "Granular RBAC with MFA and IAM integration.", icon: Lock },
    ];

    return (
        <div className="space-y-8">
            <div className="space-y-2">
                <h4 className="text-2xl font-bold text-[#012652]">Trust Center</h4>
                <p className="text-sm text-[#64748B] font-bold">Industrial security standards and operational resilience protocols.</p>
            </div>

            <div className="grid grid-cols-3 gap-4">
                {securityMetrics.map((item, i) => (
                    <div key={i} className="p-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl text-center space-y-1">
                        <item.icon size={16} className="text-[#0D94FB] mx-auto mb-2" />
                        <p className="text-[9px] font-bold text-[#64748B] uppercase tracking-wider">{item.label}</p>
                        <p className="text-xs font-bold text-[#012652]">{item.val}</p>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-2 gap-4">
                {trustCards.map((card, i) => (
                    <div key={i} className="p-5 border border-[#E2E8F0] rounded-2xl hover:border-[#0D94FB] transition-all cursor-pointer group bg-white shadow-sm">
                        <div className="w-10 h-10 bg-[#F1F5F9] rounded-xl flex items-center justify-center text-[#64748B] mb-4 group-hover:bg-[#0D94FB]/10 group-hover:text-[#0D94FB] transition-all">
                            <card.icon size={20} />
                        </div>
                        <h5 className="font-bold text-[#012652] mb-1">{card.title}</h5>
                        <p className="text-[11px] text-[#64748B] leading-normal font-bold">{card.desc}</p>
                    </div>
                ))}
            </div>

            <div 
                onClick={handleDownload}
                className="p-6 bg-[#012652] border border-[#012652] rounded-3xl flex items-center justify-between group cursor-pointer hover:bg-[#011a3b] transition-all text-white shadow-lg"
            >
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center border border-white/10 text-white">
                       <FileText size={24} />
                    </div>
                    <div>
                        <p className="text-xs font-bold">Security_Architecture_Blueprint.pdf</p>
                        <p className="text-[9px] font-bold text-blue-100/40 uppercase tracking-widest">Official Institutional Report</p>
                    </div>
                </div>
                <div className="p-2 bg-white/10 rounded-lg group-hover:bg-[#0D94FB] transition-all">
                    <Download size={14} />
                </div>
            </div>
        </div>
    );
}

function ComplianceContent() {
    const complianceStats = [
        { label: 'Verified Pillars', val: 'EPF / ESI / TDS', icon: CheckCircle2 },
        { label: 'Next Deadline', val: 'April 07, 2026', icon: Landmark },
        { label: 'Health Score', val: '98.4% Compliant', icon: Shield },
    ];

    const regulatoryCards = [
        { title: 'EPFO Registry', desc: 'Monthly contributions and UAN management logic.', icon: Landmark },
        { title: 'ESIC Portal', desc: 'Healthcare statutory filing and IP registration.', icon: Users },
        { title: 'Income Tax Node', desc: 'TDS Section 192 automation and payout audit.', icon: CreditCard },
        { title: 'Statutory Mastery', desc: 'Regional PT, LWF, and Bonus Act registries.', icon: Book },
    ];

    return (
        <div className="space-y-8">
            <div className="space-y-2">
                <h4 className="text-2xl font-bold text-[#012652]">Statutory Hub</h4>
                <p className="text-sm text-[#64748B] font-bold">Real-time statutory tracking and filing lifecycle management.</p>
            </div>

            <div className="grid grid-cols-3 gap-4">
                {complianceStats.map((item, i) => (
                    <div key={i} className="p-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl text-center space-y-1">
                        <item.icon size={16} className="text-[#0D94FB] mx-auto mb-2" />
                        <p className="text-[9px] font-bold text-[#64748B] uppercase tracking-wider">{item.label}</p>
                        <p className="text-xs font-bold text-[#012652]">{item.val}</p>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-2 gap-4">
                {regulatoryCards.map((card, i) => (
                    <div key={i} className="p-5 border border-[#E2E8F0] rounded-2xl hover:border-[#0D94FB] transition-all cursor-pointer group bg-white shadow-sm">
                        <div className="w-10 h-10 bg-[#F1F5F9] rounded-xl flex items-center justify-center text-[#64748B] mb-4 group-hover:bg-[#0D94FB]/10 group-hover:text-[#0D94FB] transition-all">
                            <card.icon size={20} />
                        </div>
                        <h5 className="font-bold text-[#012652] mb-1">{card.title}</h5>
                        <p className="text-[11px] text-[#64748B] leading-normal font-bold">{card.desc}</p>
                    </div>
                ))}
            </div>

            <div className="p-6 bg-[#10B981]/5 border border-[#10B981]/20 rounded-3xl flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="p-2 bg-[#10B981]/10 rounded-full">
                        <CheckCircle2 size={24} className="text-[#10B981]" />
                    </div>
                    <div>
                        <p className="text-sm font-bold text-[#012652]">All Systems Synchronized</p>
                        <p className="text-[10px] font-bold text-[#64748B] uppercase tracking-widest">Next automated sync: T-Minus 4h 20m</p>
                    </div>
                </div>
                <div className="px-4 py-2 bg-white border border-[#E2E8F0] rounded-xl text-[10px] font-bold text-[#012652] uppercase tracking-[0.2em]">Live Monitoring</div>
            </div>
        </div>
    );
}
