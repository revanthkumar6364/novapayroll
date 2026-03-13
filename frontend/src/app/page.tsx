"use client";

import { motion } from "framer-motion";
import { ChevronRight, ShieldCheck, Users, BarChart3, ArrowRight, Zap, Globe, Heart, Twitter, Linkedin, Github } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Logo from "../components/ui/Logo";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen selection:bg-primary/20 selection:text-primary mesh-gradient overflow-x-hidden">
      {/* Navigation */}
      <header className="fixed top-0 w-full z-50 glass border-b border-white/10">
        <div className="container mx-auto px-6 h-24 flex items-center justify-between">
          <Logo size={44} variant="light" />

          <nav className="hidden lg:flex items-center gap-12 text-[14px] font-bold text-[#475569]">
            <Link href="/dashboard/vendor-payments" className="hover:text-primary transition-all hover:-translate-y-0.5">Payments</Link>
            <Link href="/dashboard/cards" className="hover:text-primary transition-all hover:-translate-y-0.5">Banking+</Link>
            <Link href="/dashboard/payroll-run" className="hover:text-primary transition-all hover:-translate-y-0.5 text-[#245DF1] relative after:absolute after:bottom-[-8px] after:left-0 after:w-full after:h-0.5 after:bg-[#245DF1]">Payroll</Link>
            <Link href="/dashboard/documents" className="hover:text-primary transition-all hover:-translate-y-0.5">Resources</Link>
            <Link href="/dashboard/tax-optimizer" className="hover:text-primary transition-all hover:-translate-y-0.5 font-black">Pricing</Link>
          </nav>
          <div className="flex items-center gap-6">
            <Link href="/login" className="text-[13px] font-black text-[#245DF1] hover:text-[#1d4ed8] transition-all px-5 py-2.5 border border-[#245DF1]/20 rounded-xl hover:bg-[#245DF1]/5">
              Login
            </Link>
            <Link href="/signup" className="relative group overflow-hidden bg-[#245DF1] text-white px-6 py-3 rounded-xl text-[13px] font-black hover:bg-[#1d4ed8] transition-all shadow-premium active:scale-95">
              <span className="relative z-10 flex items-center gap-2 text-white">
                Sign Up
                <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-[100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-grow pt-32">
        <section className="container mx-auto px-6 py-16 lg:py-24 relative">
          <div className="flex flex-col lg:flex-row items-center gap-24 relative z-10">
            <div className="flex-1 text-left">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-primary/5 text-primary text-[11px] font-black uppercase tracking-[0.2em] mb-10 border border-primary/10 shadow-sm"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                Trusted by 10,000+ Indian Enterprises
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="text-3xl md:text-5xl font-black tracking-tighter mb-8 leading-[1.2] text-[#0F172A] drop-shadow-sm"
              >
                Modern <span className="text-gradient">Payroll</span> Built for High-Growth Teams.
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-lg text-[#475569] mb-12 leading-relaxed max-w-lg font-medium"
              >
                End-to-end automation for your most critical business operations. Disburse salaries, file taxes, and manage compliance from a single premium command center.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-8"
              >
                <Link href="/signup" className="bg-[#245DF1] text-white px-7 py-3 rounded-xl text-sm font-black hover:bg-[#1d4ed8] transition-all active:scale-95 shadow-xl shadow-[#245DF1]/20 flex items-center gap-2">
                  Get Started
                  <ArrowRight size={18} className="text-white" />
                </Link>
                <Link href="/login" className="bg-white text-[#0F172A] px-7 py-3 rounded-xl text-sm font-black hover:bg-slate-50 transition-all border border-slate-200 shadow-sm flex items-center justify-center">
                  Book Demo
                </Link>
              </motion.div>
            </div>

            <div className="flex-1 relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 40 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-20"
              >
                <div className="relative w-full aspect-square max-w-2xl mx-auto flex items-center justify-center">
                  <div className="absolute inset-0 bg-primary/20 rounded-full blur-[100px] opacity-20"></div>
                  
                  {/* Floating UI Elements */}
                  <motion.div
                    animate={{ y: [-10, 10, -10] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute z-20 top-1/4 -right-10 glass shadow-premium p-6 rounded-2xl border border-white/50 flex items-center gap-4 bg-white/90 backdrop-blur-xl"
                  >
                    <div className="w-14 h-14 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center">
                      <Zap size={28} />
                    </div>
                    <div>
                      <div className="text-[11px] font-black text-[#64748B] uppercase tracking-widest mb-1">Status</div>
                      <div className="text-xl font-black text-[#0F172A]">₹1.2M Disbursed</div>
                    </div>
                  </motion.div>

                  <motion.div
                    animate={{ y: [10, -10, 10] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute z-10 bottom-1/4 -left-10 glass shadow-premium p-6 rounded-2xl border border-white/50 flex items-center gap-4 bg-white/90 backdrop-blur-xl"
                  >
                    <div className="w-14 h-14 bg-blue-100 text-primary rounded-2xl flex items-center justify-center">
                      <ShieldCheck size={28} />
                    </div>
                    <div>
                      <div className="text-[11px] font-black text-[#64748B] uppercase tracking-widest mb-1">Compliance</div>
                      <div className="text-xl font-black text-[#0F172A]">TDS Auto-Filed</div>
                    </div>
                  </motion.div>

                  <div className="w-[80%] h-[80%] glass rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-white/60 flex items-center justify-center bg-gradient-to-tr from-white/60 to-white/20 backdrop-blur-md relative z-0">
                     <motion.div
                       animate={{ 
                         rotate: [0, 5, -5, 0],
                         scale: [1, 1.02, 0.98, 1]
                       }}
                       transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                     >
                       <BarChart3 size={160} className="text-primary/20" strokeWidth={1} />
                     </motion.div>
                  </div>
                </div>
              </motion.div>

              {/* Decorative Floating Elements */}
              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-10 right-0 w-24 h-24 glass rounded-3xl -z-10 border-primary/20 flex items-center justify-center shadow-premium"
              >
                <Zap size={32} className="text-primary fill-primary/10" />
              </motion.div>
              <motion.div
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-20 left-0 w-16 h-16 glass rounded-2xl -z-10 border-purple-500/20 flex items-center justify-center shadow-xl"
              >
                <ShieldCheck size={24} className="text-purple-500" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-24 lg:py-32 bg-white/40 backdrop-blur-3xl border-y border-slate-100 relative">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center max-w-3xl mx-auto mb-20"
            >
              <h2 className="text-3xl md:text-5xl font-black mb-8 tracking-tight text-[#0F172A]">Zero errors. <span className="text-primary italic">Absolute</span> speed.</h2>
              <p className="text-[#475569] text-base font-medium leading-relaxed">Integrated tools designed for modern Indian HR and Finance teams to operate at light speed with absolute precision.</p>
            </motion.div>

            <div className="grid lg:grid-cols-3 gap-16">
              {/* Compliance Card */}
              <motion.div
                whileHover={{ y: -8, scale: 1.02 }}
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="premium-card p-12 bg-white flex flex-col items-center text-center group border border-slate-100/50 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-rose-50 rounded-bl-full transition-all duration-500 group-hover:bg-rose-100 group-hover:w-40 group-hover:h-40"></div>
                <div className="w-14 h-14 bg-rose-50 rounded-xl flex items-center justify-center mb-8 group-hover:bg-rose-100 transition-all duration-300 border border-rose-100 shadow-sm relative z-10">
                  <ShieldCheck size={24} className="text-rose-500" />
                </div>
                <h3 className="text-xl font-black mb-6 text-[#0F172A] relative z-10">Compliance First</h3>
                <p className="text-sm text-[#475569] font-medium leading-relaxed relative z-10">Automated PF, ESI, PT, and TDS with intelligent validation and single-click government filings.</p>
              </motion.div>

              {/* Payouts Card */}
              <motion.div
                whileHover={{ y: -8, scale: 1.02 }}
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="premium-card p-12 bg-white flex flex-col items-center text-center group border border-slate-100/50 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-green-50 rounded-bl-full transition-all duration-500 group-hover:bg-green-100 group-hover:w-40 group-hover:h-40"></div>
                <div className="w-14 h-14 bg-green-50 rounded-xl flex items-center justify-center mb-8 group-hover:bg-green-100 transition-all duration-300 border border-green-100 shadow-sm relative z-10">
                  <Zap size={24} className="text-green-500" />
                </div>
                <h3 className="text-xl font-black mb-6 text-[#0F172A] relative z-10">Instant Disbursement</h3>
                <p className="text-sm text-[#475569] font-medium leading-relaxed relative z-10">Execute bulk salary transfers via direct bank integrations. Faster than a blink, safer than a vault.</p>
              </motion.div>

              {/* Employee Exp Card */}
              <motion.div
                whileHover={{ y: -8, scale: 1.02 }}
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="premium-card p-12 bg-white flex flex-col items-center text-center group border border-slate-100/50 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-sky-50 rounded-bl-full transition-all duration-500 group-hover:bg-sky-100 group-hover:w-40 group-hover:h-40"></div>
                <div className="w-14 h-14 bg-primary/5 rounded-xl flex items-center justify-center mb-8 group-hover:bg-primary/10 transition-colors border border-primary/10 shadow-sm relative z-10">
                  <Users size={24} className="text-primary" />
                </div>
                <h3 className="text-xl font-black mb-6 text-[#0F172A] relative z-10">Premium Portal</h3>
                <p className="text-sm text-[#475569] font-medium leading-relaxed relative z-10">Delight your team with a slick self-serve experience for payslips, tax proofing, and leaves.</p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Savings Calculator Section */}
        <section className="py-24 lg:py-32 bg-[#F8FAFC]">
          <div className="container mx-auto px-6">
            <div className="flex flex-col lg:flex-row items-center gap-20 bg-white rounded-[3rem] p-12 md:p-20 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.04)] border border-slate-100 overflow-hidden relative">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary/0 via-primary/50 to-primary/0"></div>
              
              <div className="flex-1 space-y-8 relative z-10">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 text-primary text-[11px] font-black uppercase tracking-widest border border-primary/10">
                  <BarChart3 size={14} /> ROI Calculator
                </div>
                <h2 className="text-3xl md:text-5xl font-black text-[#0F172A] leading-tight tracking-tight">
                  See how much you <span className="text-primary italic">save.</span>
                </h2>
                <p className="text-[#475569] text-lg font-medium leading-relaxed">
                  Traditional payroll takes days of manual effort and is prone to compliance fines. With NovaPayroll, you eliminate administrative overhead and reduce operational costs by up to 85%.
                </p>
                
                <div className="space-y-8 pt-4">
                  <div>
                    <div className="flex justify-between mb-4">
                      <span className="text-[#0F172A] font-bold">Total Headcount (Employees)</span>
                      <span className="text-primary font-black">250</span>
                    </div>
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: "65%" }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="h-full bg-primary"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-4">
                      <span className="text-[#0F172A] font-bold">Manual Hours / Month</span>
                      <span className="text-primary font-black">120 hrs</span>
                    </div>
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: "80%" }}
                        transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
                        className="h-full bg-primary"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex-1 w-full relative z-10">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  className="bg-gradient-to-br from-[#1D4ED8] to-[#1E40AF] rounded-[2rem] p-10 text-white shadow-2xl relative overflow-hidden"
                >
                  <div className="absolute -top-20 -right-20 w-80 h-80 bg-white/20 rounded-full blur-3xl"></div>
                  <div className="relative z-10 space-y-10">
                    <div className="text-center">
                      <p className="text-white/40 font-black uppercase tracking-[0.2em] text-xs mb-4">Annual Savings Project</p>
                      <h3 className="text-6xl font-black tracking-tighter text-white">₹14,24,000*</h3>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white/10 border border-white/20 rounded-2xl p-6">
                        <p className="text-white/40 text-[10px] font-black uppercase mb-2">Time Saved</p>
                        <p className="text-2xl font-black text-white">96%</p>
                      </div>
                      <div className="bg-white/10 border border-white/20 rounded-2xl p-6">
                        <p className="text-white/40 text-[10px] font-black uppercase mb-2">Error Rate</p>
                        <p className="text-2xl font-black text-white">0.001%</p>
                      </div>
                    </div>

                    <Link href="/dashboard" className="w-full bg-white text-[#1D4ED8] py-5 rounded-2xl font-black text-lg hover:bg-white/95 transition-all shadow-xl shadow-black/10 active:scale-95 flex items-center justify-center">
                      Get Detailed Audit
                    </Link>
                    <p className="text-[11px] text-white/100 text-center font-bold tracking-wide leading-relaxed italic mt-6">*Calculated based on industry average compliance risks and admin overheads.</p>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Global CTA Section */}
        <section className="py-24 lg:py-32 container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-[#F0F7FF] rounded-[4rem] p-24 md:p-32 relative overflow-hidden shadow-[0_20px_50px_rgba(36,93,241,0.05)] border border-[#245DF1]/10"
          >

            <div className="absolute top-0 right-0 w-[50%] h-full bg-[#245DF1]/5 skew-x-[20deg] translate-x-1/2"></div>
            <div className="relative z-10 max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-black text-[#0F172A] mb-8 tracking-tight leading-[1.2]">Transform your finance operations today.</h2>
              <p className="text-[#475569] text-base mb-12 font-medium max-w-xl mx-auto">Join India&apos;s most innovative companies scales their team with NovaPayroll.</p>
              <Link href="/signup" className="inline-flex items-center gap-3 bg-[#245DF1] text-white px-10 py-4 rounded-xl text-lg font-black hover:bg-[#1d4ed8] transition-all active:scale-95 shadow-xl shadow-[#245DF1]/20">
                Start Free Trial
                <ArrowRight size={20} className="text-white" />
              </Link>
            </div>
          </motion.div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#0B132B] text-white py-20 lg:py-28 border-t border-white/5 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-6 gap-16 mb-20">
            <div className="col-span-2 space-y-10">
              <Logo variant="white" showText={true} size={48} />
              <p className="text-white text-lg max-w-xs leading-relaxed font-medium">
                Reimagining financial infrastructure for high-growth enterprises. Elite fintech tools for modern payroll and treasury operations.
              </p>
              <div className="flex items-center gap-6">
                <Link href="#" className="w-12 h-12 flex items-center justify-center bg-white/20 rounded-2xl hover:bg-white/30 transition-all"><Twitter size={22} className="text-white hover:text-white transition-colors" /></Link>
                <Link href="#" className="w-12 h-12 flex items-center justify-center bg-white/20 rounded-2xl hover:bg-white/30 transition-all"><Linkedin size={22} className="text-white hover:text-white transition-colors" /></Link>
                <Link href="#" className="w-12 h-12 flex items-center justify-center bg-white/20 rounded-2xl hover:bg-white/30 transition-all"><Github size={22} className="text-white hover:text-white transition-colors" /></Link>
              </div>
            </div>

            <div className="space-y-8">
              <h4 className="font-black text-white/70 text-[11px] uppercase tracking-[0.3em]">Products</h4>
              <ul className="space-y-5 text-white text-sm font-bold">
                <li><Link href="/dashboard/vendor-payments" className="hover:translate-x-1 hover:text-white transition-all inline-block">Payments</Link></li>
                <li><Link href="/dashboard/cards" className="hover:translate-x-1 hover:text-white transition-all inline-block">Banking+</Link></li>
                <li><Link href="/dashboard/payroll-run" className="hover:translate-x-1 hover:text-white transition-all inline-block">Payroll</Link></li>
                <li><Link href="/dashboard/tax-optimizer" className="hover:translate-x-1 hover:text-white transition-all inline-block">Taxes</Link></li>
              </ul>
            </div>

            <div className="space-y-8">
              <h4 className="font-black text-white/70 text-[11px] uppercase tracking-[0.3em]">Resources</h4>
              <ul className="space-y-5 text-white text-sm font-bold">
                <li><Link href="/dashboard/documents" className="hover:translate-x-1 hover:text-white transition-all inline-block">Insights</Link></li>
                <li><Link href="/resources/case-studies" className="hover:translate-x-1 hover:text-white transition-all inline-block">Case Studies</Link></li>
                <li><Link href="/dashboard/documents" className="hover:translate-x-1 hover:text-white transition-all inline-block">Documentation</Link></li>
                <li><Link href="/support" className="hover:translate-x-1 hover:text-white transition-all inline-block">Support</Link></li>
              </ul>
            </div>

            <div className="space-y-8">
              <h4 className="font-black text-white/70 text-[11px] uppercase tracking-[0.3em]">Company</h4>
              <ul className="space-y-5 text-white text-sm font-bold">
                <li><Link href="/about/story" className="hover:translate-x-1 hover:text-white transition-all inline-block">Our Story</Link></li>
                <li><Link href="/about/press" className="hover:translate-x-1 hover:text-white transition-all inline-block">Press Kit</Link></li>
                <li><Link href="/careers" className="hover:translate-x-1 hover:text-white transition-all inline-block">Join Us</Link></li>
                <li><Link href="/legal/privacy" className="hover:translate-x-1 hover:text-white transition-all inline-block">Legal</Link></li>
              </ul>
            </div>

            <div className="space-y-8">
              <h4 className="font-black text-white/50 text-[11px] uppercase tracking-[0.3em]">Newsletter</h4>
              <p className="text-white text-sm font-medium">Get the latest payroll hacks and compliance updates.</p>
              <div className="flex gap-2">
                <input className="bg-white/10 border border-white/30 rounded-xl px-4 py-3 text-sm outline-none focus:border-white transition-colors w-full text-white placeholder:text-white/60" placeholder="email@address.com" />
                <button className="bg-[#245DF1] text-white hover:bg-[#1d4ed8] rounded-xl p-3 px-4 transition-all active:scale-95 shadow-lg shadow-black/10"><ChevronRight size={20} /></button>
              </div>
            </div>
          </div>

          <div className="pt-16 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="flex items-center gap-3 text-white/60 text-sm font-bold">
              <span>© 2026 Nova Payroll. Handcrafted with</span>
              <Heart size={16} className="text-red-500 fill-red-500 animate-pulse" />
              <span>in India.</span>
            </div>
              <div className="flex items-center gap-8">
              <div className="flex items-center gap-3 grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all cursor-pointer">
                <ShieldCheck size={20} className="text-white" />
                <span className="text-[11px] font-black uppercase tracking-widest text-white">PCI-DSS Compliant</span>
              </div>
              <div className="flex items-center gap-3 grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all cursor-pointer">
                <Globe size={20} className="text-white" />
                <span className="text-[11px] font-black uppercase tracking-widest text-white">ISO 27001 Certified</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
