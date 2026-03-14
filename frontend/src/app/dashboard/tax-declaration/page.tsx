"use client";

import React, { useState, useEffect } from "react";
import { 
  Building2, 
  CreditCard, 
  ShieldCheck, 
  Upload, 
  CheckCircle2, 
  AlertCircle,
  ArrowRight,
  Info,
  DollarSign,
  FileText
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function TaxDeclarationPage() {
  const [activeTab, setActiveTab] = useState<'declaration' | 'proofs'>('declaration');
  const [regime, setRegime] = useState<'OLD' | 'NEW'>('OLD');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [declaration, setDeclaration] = useState({
    investments80C: 0,
    investments80D: 0,
    hraAmount: 0,
    otherIncome: 0,
  });

  const [proofs, setProofs] = useState<any[]>([]);

  const sections = [
    { id: '80C', name: 'Section 80C', limit: 150000, desc: 'PPF, ELSS, LIC, Tuition Fees, etc.' },
    { id: '80D', name: 'Section 80D', limit: 25000, desc: 'Medical Insurance Premiums' },
    { id: 'HRA', name: 'House Rent Allowance', limit: null, desc: 'Rent paid for accommodation' },
    { id: 'OTHER', name: 'Other Income', limit: null, desc: 'Income from other sources/interest' },
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white p-8">
      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
              Tax Declaration Hub
            </h1>
            <p className="text-zinc-500 mt-2">Manage your statutory investments & proofs for FY 2025-26</p>
          </div>
          <div className="flex bg-zinc-900/50 p-1 rounded-xl border border-white/5">
            <button 
              onClick={() => setRegime('OLD')}
              className={`px-6 py-2 rounded-lg transition-all ${regime === 'OLD' ? 'bg-blue-600 text-white' : 'text-zinc-400 hover:text-white'}`}
            >
              Old Regime
            </button>
            <button 
              onClick={() => setRegime('NEW')}
              className={`px-6 py-2 rounded-lg transition-all ${regime === 'NEW' ? 'bg-blue-600 text-white' : 'text-zinc-400 hover:text-white'}`}
            >
              New Regime
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Declaration Form */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-zinc-900/30 border border-white/5 rounded-2xl p-6 backdrop-blur-xl">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                  <ShieldCheck className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Structured Declaration</h3>
                  <p className="text-zinc-500 text-sm">Enter amounts manually under respective sections</p>
                </div>
              </div>

              <div className="space-y-6">
                {sections.map((section) => (
                  <div key={section.id} className="p-4 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-all">
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <h4 className="font-medium text-zinc-200">{section.name}</h4>
                        <p className="text-xs text-zinc-500">{section.desc}</p>
                      </div>
                      {section.limit && (
                        <span className="text-xs px-2 py-1 rounded bg-zinc-800 text-zinc-400 border border-white/5">
                          Max Limit: ₹{section.limit.toLocaleString()}
                        </span>
                      )}
                    </div>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                      <input 
                        type="number"
                        placeholder="0.00"
                        className="w-full bg-zinc-950/50 border border-white/10 rounded-lg py-3 pl-10 pr-4 focus:ring-2 focus:ring-blue-500 outline-none transition-all text-white font-mono"
                        onChange={(e) => {
                          const val = Math.max(0, parseInt(e.target.value) || 0);
                          setDeclaration(prev => ({ ...prev, [`investments${section.id}`]: val }));
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <button className="w-full mt-8 bg-blue-600 hover:bg-blue-500 text-white font-semibold py-4 rounded-xl shadow-lg shadow-blue-900/20 transition-all flex items-center justify-center gap-2">
                <CheckCircle2 className="w-5 h-5" />
                Review & Save Declaration
              </button>
            </div>
          </div>

          {/* Proof Uploads Sidebar */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-indigo-900/20 to-zinc-900/30 border border-white/5 rounded-2xl p-6 backdrop-blur-xl">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Upload className="w-5 h-5 text-indigo-400" />
                Proof Uploads
              </h3>
              <p className="text-zinc-500 text-sm mb-6">Upload receipts/documents for manual verification by HR.</p>
              
              <div className="space-y-4">
                {['LIC Receipt', 'Rent Agreement', 'Medical Policy'].map((type, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-lg border border-white/5 bg-zinc-950/30">
                    <div className="flex items-center gap-3">
                      <FileText className="w-4 h-4 text-zinc-400" />
                      <span className="text-sm font-medium">{type}</span>
                    </div>
                    <button className="text-blue-400 hover:text-blue-300 text-xs font-semibold">
                      Upload
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-zinc-900/30 border border-white/5 rounded-2xl p-6 backdrop-blur-xl">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Info className="w-5 h-5 text-blue-400" />
                Regime Insights
              </h3>
              <div className="p-4 rounded-lg bg-blue-500/5 border border-blue-500/10 mb-4">
                <p className="text-sm text-blue-200">
                  {regime === 'OLD' 
                    ? "Old regime allows you to reduce taxable income via 80C, HRA, and more."
                    : "New regime offers lower slab rates but limits most 80C deductions."}
                </p>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-400">Estimated Tax Saving</span>
                  <span className="text-green-400 font-semibold">₹24,500</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-400">Declaration Status</span>
                  <span className="text-yellow-400 font-semibold">Pending Review</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
