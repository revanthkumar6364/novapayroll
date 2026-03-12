"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FileText, ArrowLeft } from "lucide-react";

export default function TermsOfService() {
    return (
        <div className="min-h-screen bg-white selection:bg-primary/20 p-8 md:p-20">
            <div className="max-w-4xl mx-auto space-y-12">
                <Link href="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-primary transition-colors font-bold group">
                    <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                    Back to Home
                </Link>

                <div className="space-y-4">
                    <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-900 mb-6 border border-slate-100">
                        <FileText size={32} />
                    </div>
                    <h1 className="text-5xl font-black text-slate-900 tracking-tight">Terms of Use.</h1>
                    <p className="text-slate-500 font-bold tracking-widest uppercase text-xs">Last Updated: March 2026</p>
                </div>

                <div className="prose prose-slate max-w-none space-y-10 text-slate-600 font-medium leading-relaxed">
                    <section className="space-y-4">
                        <h2 className="text-2xl font-black text-slate-900 tracking-tight">1. Acceptance of Terms</h2>
                        <p>By accessing or using Novapayroll, you agree to be bound by these Terms of Use and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using this site.</p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-black text-slate-900 tracking-tight">2. Use License</h2>
                        <p>Permission is granted to use Novapayroll for your internal business operations. This is the grant of a license, not a transfer of title, and under this license you may not attempt to decompile or reverse engineer any software contained on the platform.</p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-black text-slate-900 tracking-tight">3. Accuracy of Materials</h2>
                        <p>While we strive for 100% accuracy in payroll calculations, the materials appearing on Novapayroll could include technical, typographical, or photographic errors. We recommend cross-verifying critical filings.</p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-black text-slate-900 tracking-tight">4. Limitations</h2>
                        <p>In no event shall Novapayroll or its suppliers be liable for any damages arising out of the use or inability to use the services, even if notified orally or in writing of the possibility of such damage.</p>
                    </section>
                </div>
            </div>
        </div>
    );
}
