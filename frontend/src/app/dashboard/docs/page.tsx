"use client";

import { motion } from "framer-motion";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { 
    Code2, Terminal, BookOpen, Cpu, 
    Globe, Shield, Zap, ArrowLeft,
    Copy, Check, Search, Github
} from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

const SECTIONS = [
    { id: 'start', title: 'Quick Start', icon: Zap },
    { id: 'forex', title: 'Forex API', icon: Globe },
    { id: 'sandbox', title: 'Sandbox Hub', icon: Cpu },
    { id: 'security', title: 'Security & Auth', icon: Shield },
];

const CODE_SNIPPET = `// NovaSDK: Initialize & Fetch Global Rates
const nova = new NovaClient({
  apiKey: process.env.NOVA_SECRET_KEY,
  environment: 'sandbox'
});

async function processGlobalPayout() {
  const rates = await nova.forex.getRates('INR');
  console.log(\`Live USD Rate: \${rates.USD}\`);
  
  return await nova.payouts.create({
    amount: 50000,
    currency: 'USD',
    recipient: 'contractor_882x'
  });
}`;

export default function DocsHub() {
    const router = useRouter();
    const [copied, setCopied] = useState<boolean | null>(null);
    const [searchQuery, setSearchQuery] = useState("");

    const handleCopy = () => {
        navigator.clipboard.writeText(CODE_SNIPPET);
        setCopied(true);
        setTimeout(() => setCopied(null), 2000);
    };

    return (
        <DashboardLayout>
            <div className="space-y-12 pb-20">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                    <div className="flex gap-6 items-start">
                        <button 
                            onClick={() => router.back()}
                            className="mt-1 p-2 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-primary hover:border-primary transition-all shadow-sm"
                        >
                            <ArrowLeft size={20} />
                        </button>
                        <div className="space-y-2">
                            <h1 className="text-4xl font-black text-[#0F172A] tracking-tighter flex items-center gap-4">
                                Developer Hub <span className="text-[10px] bg-primary/10 text-primary px-3 py-1 rounded-full uppercase tracking-widest font-black border border-primary/10">v1.2.0</span>
                            </h1>
                            <p className="text-[#64748B] font-medium text-lg">Integrate NovaPayroll into your workflow with our elite SDKs and APIs.</p>
                        </div>
                    </div>
                </div>

                <div className="grid lg:grid-cols-4 gap-10">
                    {/* Navigation Sidebar */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            <input 
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search the docs..."
                                className="w-full pl-12 pr-4 py-4 bg-white border border-slate-100 rounded-2xl text-sm font-bold shadow-sm focus:ring-4 focus:ring-primary/5 transition-all"
                            />
                        </div>

                        <div className="space-y-1">
                            {SECTIONS.map((section) => (
                                <button 
                                    key={section.id}
                                    className="w-full flex items-center justify-between p-4 rounded-xl text-sm font-black text-slate-600 hover:bg-slate-50 transition-all group"
                                >
                                    <div className="flex items-center gap-4">
                                        <section.icon size={18} className="text-slate-400 group-hover:text-primary transition-colors" />
                                        {section.title}
                                    </div>
                                    <div className="w-1.5 h-1.5 rounded-full bg-slate-200 group-hover:bg-primary transition-colors"></div>
                                </button>
                            ))}
                        </div>

                        <div className="p-8 bg-slate-900 rounded-[2rem] text-white space-y-6 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl opacity-50"></div>
                            <Github size={32} className="text-white/20" />
                            <h4 className="text-lg font-black tracking-tight">NovaSDK on GitHub</h4>
                            <p className="text-xs text-white/40 font-medium leading-relaxed">Join 500+ enterprises building custom flows on our open-core SDKs.</p>
                            <button className="w-full py-3 bg-white text-slate-900 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-primary hover:text-white transition-all">
                                Fork Repository
                            </button>
                        </div>
                    </div>

                    {/* Content Area */}
                    <div className="lg:col-span-3 space-y-12">
                        {/* Hero Section */}
                        <div className="premium-card bg-[#0F172A] p-12 text-white border-none shadow-2xl relative overflow-hidden group">
                           <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px] -mr-48 -mt-48"></div>
                           
                           <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
                               <div className="space-y-8">
                                   <div className="w-16 h-16 rounded-2xl bg-primary text-white flex items-center justify-center shadow-2xl shadow-primary/40 group-hover:scale-110 transition-transform">
                                       <Terminal size={32} />
                                   </div>
                                   <div className="space-y-4">
                                       <h2 className="text-4xl font-black tracking-tight leading-tight">Ship Global Payouts in <span className="text-primary italic">One Line.</span></h2>
                                       <p className="text-slate-400 font-medium leading-relaxed">Our unified API handles currency conversion, TDS compliance, and multi-bank connectivity automagically.</p>
                                   </div>
                                   <div className="flex items-center gap-4">
                                       <button className="px-8 py-4 bg-primary text-white rounded-xl font-black text-xs uppercase tracking-widest shadow-xl shadow-primary/20 hover:bg-blue-600 transition-all">
                                           Grab API Keys
                                       </button>
                                       <button className="px-8 py-4 bg-white/5 border border-white/10 text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-white/10 transition-all">
                                           Playground
                                       </button>
                                   </div>
                               </div>

                               <div className="bg-black/60 backdrop-blur-3xl rounded-[2rem] border border-white/10 overflow-hidden shadow-2xl">
                                   <div className="px-6 py-4 bg-white/5 border-b border-white/5 flex items-center justify-between">
                                       <div className="flex gap-2">
                                           <div className="w-2.5 h-2.5 rounded-full bg-red-500/40"></div>
                                           <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/40"></div>
                                           <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/40"></div>
                                       </div>
                                       <div className="text-[10px] font-black tracking-widest text-slate-500 uppercase">index.js</div>
                                       <button onClick={handleCopy} className="text-slate-500 hover:text-white transition-colors">
                                           {copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                                       </button>
                                   </div>
                                   <div className="p-8">
                                       <pre className="text-xs font-mono text-primary/80 leading-loose">
                                           {CODE_SNIPPET}
                                       </pre>
                                   </div>
                               </div>
                           </div>
                        </div>

                        {/* Integration Guides */}
                        <div className="grid md:grid-cols-2 gap-10">
                            {[
                                { title: 'Global Forex API', desc: 'Fetch live rates for 100+ countries with low-latency CDN caching enabled.', icon: Globe, link: 'Explore API Reference' },
                                { title: 'Identity Sandbox', desc: 'Verify PAN, GST, and UPI details using our high-fidelity verification tunnel.', icon: Shield, link: 'Sandbox Guides' },
                            ].map((guide, i) => (
                                <div key={i} className="premium-card p-10 bg-white border border-slate-100 group hover:border-primary/20 transition-all">
                                    <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-primary group-hover:text-white transition-all mb-8 shadow-sm">
                                        <guide.icon size={24} />
                                    </div>
                                    <h3 className="text-xl font-black text-[#0F172A] mb-4 tracking-tight">{guide.title}</h3>
                                    <p className="text-sm text-[#64748B] font-medium leading-relaxed mb-8">{guide.desc}</p>
                                    <button className="flex items-center gap-2 text-primary font-black text-[10px] uppercase tracking-widest group-hover:gap-4 transition-all">
                                        {guide.link} <ArrowLeft size={14} className="rotate-180" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
