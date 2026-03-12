"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Shield, ArrowLeft } from "lucide-react";

export default function PrivacyPolicy() {
    return (
        <div className="min-h-screen bg-white selection:bg-primary/20 p-8 md:p-20">
            <div className="max-w-4xl mx-auto space-y-12">
                <Link href="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-primary transition-colors font-bold group">
                    <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                    Back to Home
                </Link>

                <div className="space-y-4">
                    <div className="w-16 h-16 rounded-2xl bg-primary/5 flex items-center justify-center text-primary mb-6">
                        <Shield size={32} />
                    </div>
                    <h1 className="text-5xl font-black text-slate-900 tracking-tight">Privacy Policy.</h1>
                    <p className="text-slate-500 font-bold tracking-widest uppercase text-xs">Last Updated: March 2026</p>
                </div>

                <div className="prose prose-slate max-w-none space-y-10 text-slate-600 font-medium leading-relaxed">
                    <section className="space-y-4">
                        <h2 className="text-2xl font-black text-slate-900 tracking-tight">1. Information We Collect</h2>
                        <p>We collect information that you provide directly to us when you create an account, use our payroll services, or communicate with us. This includes personal identification, financial data for salary disbursements, and employment records.</p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-black text-slate-900 tracking-tight">2. How We Use Your Information</h2>
                        <p>Your data is used to process payroll, verify compliance with statutory regulations (PF, ESI, TDS), and provide customer support. We use advanced encryption to ensure your financial data is never exposed.</p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-black text-slate-900 tracking-tight">3. Data Security</h2>
                        <p>Novapayroll is PCI-DSS compliant and uses bank-grade AES-256 encryption. We implement strict access controls and regular security audits to protect against unauthorized access.</p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-black text-slate-900 tracking-tight">4. Third-Party Sharing</h2>
                        <p>We share information with banking partners and government authorities (Income Tax Department, EPFO) exclusively for processing your payroll and compliance filings.</p>
                    </section>
                </div>
            </div>
        </div>
    );
}
