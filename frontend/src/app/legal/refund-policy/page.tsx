"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { HandCoins, ArrowLeft } from "lucide-react";

export default function RefundPolicy() {
    return (
        <div className="min-h-screen bg-white selection:bg-primary/20 p-8 md:p-20">
            <div className="max-w-4xl mx-auto space-y-12">
                <Link href="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-primary transition-colors font-bold group">
                    <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                    Back to Home
                </Link>

                <div className="space-y-4">
                    <div className="w-16 h-16 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-600 mb-6 border border-amber-100">
                        <HandCoins size={32} />
                    </div>
                    <h1 className="text-5xl font-black text-slate-900 tracking-tight">Refund Policy.</h1>
                    <p className="text-slate-500 font-bold tracking-widest uppercase text-xs">Last Updated: March 2026</p>
                </div>

                <div className="prose prose-slate max-w-none space-y-10 text-slate-600 font-medium leading-relaxed">
                    <section className="space-y-4">
                        <h2 className="text-2xl font-black text-slate-900 tracking-tight">1. Subscription Refunds</h2>
                        <p>Novapayroll offers a 14-day money-back guarantee for initial subscription fees. If you are not satisfied with the platform, you can request a full refund within the first 14 days of your first billing cycle.</p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-black text-slate-900 tracking-tight">2. Disbursement Credits</h2>
                        <p>Funds transferred to your corporate wallet for salary disbursements are refundable to your original bank account at any time, provided they have not already been released for payouts.</p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-black text-slate-900 tracking-tight">3. Compliance Penalties</h2>
                        <p>In the unlikely event of a filing penalty caused directly by a Novapayroll system error, we will reimburse the specific penalty amount paid to the statutory authority.</p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-black text-slate-900 tracking-tight">4. Process</h2>
                        <p>To initiate a refund request, please contact our support team at support@novapayroll.com with your transaction ID and business details.</p>
                    </section>
                </div>
            </div>
        </div>
    );
}
