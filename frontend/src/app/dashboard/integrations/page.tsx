"use client";

import React, { useState } from "react";
import { 
  Puzzle, 
  CheckCircle2, 
  ArrowRight, 
  Settings2, 
  RefreshCw, 
  Clock,
  ShieldCheck,
  Zap,
  Globe,
  Database,
  Slack,
  MessageCircle,
  Users
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const categories = ["All", "Accounting", "Recruitment", "Communication", "Banking"];

const apps = [
  { id: 'zoho', name: 'Zoho Books', category: 'Accounting', icon: Database, desc: 'Sync payroll ledgers and vendor payments directly to Zoho.', status: 'CONNECTED', lastSync: '2h ago' },
  { id: 'tally', name: 'Tally Prime', category: 'Accounting', icon: Database, desc: 'Direct API-to-API ledger synchronization for Tally ERP.', status: 'NOT_CONNECTED' },
  { id: 'slack', name: 'Slack', category: 'Communication', icon: Slack, desc: 'Real-time payroll alerts and payslip notifications.', status: 'CONNECTED', lastSync: '10m ago' },
  { id: 'teams', name: 'MS Teams', category: 'Communication', icon: MessageCircle, desc: 'Enterprise alerts and approval workflows via MS Teams.', status: 'NOT_CONNECTED' },
  { id: 'greenhouse', name: 'Greenhouse', category: 'Recruitment', icon: Users, desc: 'Auto-onboard new hires from Greenhouse ATS.', status: 'NOT_CONNECTED' },
  { id: 'lever', name: 'Lever', category: 'Recruitment', icon: Users, desc: 'Seamlessly pull candidates from Lever into payroll.', status: 'NOT_CONNECTED' },
];

export default function IntegrationsMarketplace() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredApps = apps.filter(app => activeCategory === "All" || app.category === activeCategory);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12">
          <div className="flex justify-between items-end">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20">
                  <Puzzle className="w-7 h-7 text-indigo-400" />
                </div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-zinc-500 bg-clip-text text-transparent underline decoration-indigo-500/30 underline-offset-8">
                  Integrations Marketplace
                </h1>
              </div>
              <p className="text-zinc-500 max-w-2xl text-lg">
                Connect your existing tools to NovaPayroll for a seamless, automated financial ecosystem.
              </p>
            </div>
            <div className="flex bg-zinc-900/50 p-1.5 rounded-2xl border border-white/5 backdrop-blur-xl">
              <div className="px-4 py-2 flex items-center gap-2 text-sm text-zinc-400">
                <RefreshCw className="w-4 h-4 text-green-400" />
                Auto-sync Active
              </div>
            </div>
          </div>
        </header>

        {/* Categories */}
        <div className="flex items-center gap-3 mb-12 overflow-x-auto pb-4 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2.5 rounded-xl border text-sm font-semibold transition-all whitespace-nowrap ${
                activeCategory === cat 
                ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-900/20' 
                : 'bg-zinc-900/40 border-white/5 text-zinc-400 hover:border-white/10 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* App Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          <AnimatePresence mode="popLayout">
            {filteredApps.map((app) => (
              <motion.div
                layout
                key={app.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="group relative bg-zinc-900/30 border border-white/5 rounded-3xl p-8 hover:bg-zinc-900/50 transition-all hover:border-indigo-500/30 backdrop-blur-xl"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border transition-all ${
                    app.status === 'CONNECTED' 
                    ? 'bg-indigo-500/10 border-indigo-500/20' 
                    : 'bg-zinc-950 border-white/5 group-hover:bg-zinc-800'
                  }`}>
                    <app.icon className={`w-8 h-8 ${app.status === 'CONNECTED' ? 'text-indigo-400' : 'text-zinc-500'}`} />
                  </div>
                  {app.status === 'CONNECTED' ? (
                    <span className="flex items-center gap-1.5 text-[10px] font-bold text-green-400 bg-green-500/10 px-2.5 py-1 rounded-full border border-green-500/20 tracking-wider">
                      <CheckCircle2 className="w-3 h-3" />
                      CONNECTED
                    </span>
                  ) : (
                    <button className="text-[10px] font-bold text-indigo-400 hover:text-indigo-300 tracking-wider">
                      CONNECT
                    </button>
                  )}
                </div>

                <div className="mb-8">
                  <h3 className="text-xl font-bold text-white mb-2">{app.name}</h3>
                  <p className="text-sm text-zinc-500 leading-relaxed">{app.desc}</p>
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-white/5">
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-zinc-600" />
                    <span className="text-[11px] text-zinc-600 font-medium">
                      {app.lastSync ? `Last sync: ${app.lastSync}` : 'Not synced yet'}
                    </span>
                  </div>
                  <button className="p-2.5 rounded-xl bg-zinc-950/50 border border-white/5 hover:bg-indigo-600 hover:text-white transition-all text-zinc-400 shadow-inner">
                    <Settings2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Hover Glow Effect */}
                <div className="absolute -inset-px rounded-3xl bg-gradient-to-br from-indigo-500/0 via-indigo-500/0 to-indigo-500/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Global Connectivity Status */}
        <section className="bg-gradient-to-br from-indigo-900/20 to-zinc-900/30 border border-indigo-500/10 rounded-[2.5rem] p-12 relative overflow-hidden backdrop-blur-3xl">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold mb-6">
                <Zap className="w-3 h-3" />
                ENTERPRISE CONNECTIVITY
              </div>
              <h2 className="text-4xl font-bold mb-6 leading-tight">
                Your data, <span className="text-indigo-400">synchronized</span><br />everywhere.
              </h2>
              <p className="text-zinc-400 mb-8 max-w-md text-lg leading-relaxed">
                Connect your HRIS, Accounting, and Banking tools once. We'll handle the complex background orchestration and real-time ledger synchronization.
              </p>
              <div className="flex items-center gap-4">
                <button className="px-8 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-bold transition-all shadow-xl shadow-indigo-900/30 flex items-center gap-2">
                  View API Documentation
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button className="px-8 py-3.5 bg-zinc-900 border border-white/5 text-white rounded-2xl font-bold hover:bg-zinc-800 transition-all">
                  Request Custom App
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { name: 'API Health', status: '99.98%', icon: Globe },
                { name: 'Sync Velocity', status: 'Real-time', icon: Zap },
                { name: 'Data Security', status: 'AES-256', icon: ShieldCheck },
                { name: 'Connected Orgs', status: '1,240+', icon: Users },
              ].map((stat, i) => (
                <div key={i} className="p-6 rounded-3xl bg-zinc-950/50 border border-white/5 backdrop-blur-xl">
                  <stat.icon className="w-6 h-6 text-indigo-500 mb-4" />
                  <span className="block text-2xl font-bold text-white mb-1">{stat.status}</span>
                  <span className="text-xs text-zinc-500 font-bold tracking-widest uppercase">{stat.name}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Background Decorative Element */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
        </section>
      </div>
    </div>
  );
}
