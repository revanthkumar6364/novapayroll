"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Users, 
  Search, 
  Plus, 
  Filter, 
  MoreHorizontal, 
  Mail, 
  Phone, 
  Globe, 
  CreditCard, 
  Building2,
  ChevronRight,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { api } from "@/lib/api";

interface Vendor {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  pan?: string;
  gstin?: string;
  bankAccount?: string;
  ifsc?: string;
  status: string;
  _count?: {
    payments: number;
  };
}

export default function VendorPortal() {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [newVendor, setNewVendor] = useState({
    name: "",
    email: "",
    phone: "",
    pan: "",
    gstin: "",
    bankAccount: "",
    ifsc: ""
  });

  useEffect(() => {
    fetchVendors();
  }, []);

  const fetchVendors = async () => {
    try {
      const response = await api.get("/vendor");
      setVendors(response.data);
    } catch (error) {
      console.error("Failed to fetch vendors", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddVendor = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/vendor", newVendor);
      setShowAddModal(false);
      fetchVendors();
      setNewVendor({
        name: "", email: "", phone: "", pan: "", gstin: "", bankAccount: "", ifsc: ""
      });
    } catch (error) {
      console.error("Failed to add vendor", error);
    }
  };

  const filteredVendors = vendors.filter(v => 
    v.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8 space-y-8 bg-[#0a0a0a] min-h-screen text-white">
      {/* Header Section */}
      <div className="flex justify-between items-end">
        <div>
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 text-emerald-400 mb-2"
          >
            <Users size={20} />
            <span className="text-sm font-semibold tracking-wider uppercase">Procurement Hub</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-4xl font-bold tracking-tight"
          >
            Vendor Management
          </motion.h1>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowAddModal(true)}
          className="bg-emerald-500 hover:bg-emerald-600 text-black px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all"
        >
          <Plus size={20} />
          Register New Vendor
        </motion.button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "Active Vendors", value: vendors.length, icon: Users, color: "text-blue-400" },
          { label: "Pending Invoices", value: "₹4,25,000", icon: Clock, color: "text-amber-400" },
          { label: "Avg. Payout Time", value: "24h", icon: TrendingUp, color: "text-emerald-400" }
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-[#111] border border-white/5 p-6 rounded-2xl flex items-center justify-between"
          >
            <div>
              <p className="text-gray-400 text-sm">{stat.label}</p>
              <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
            </div>
            <div className={`p-3 rounded-xl bg-white/5 ${stat.color}`}>
              <stat.icon size={24} />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Search & Filters */}
      <div className="flex gap-4 items-center bg-[#111] p-4 rounded-2xl border border-white/5">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
          <input 
            type="text" 
            placeholder="Search by vendor name, email or PAN..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-black/50 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:border-emerald-500/50 transition-all"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-3 bg-white/5 hover:bg-white/10 rounded-xl text-sm font-medium transition-all">
          <Filter size={18} />
          Filters
        </button>
      </div>

      {/* Vendor Table */}
      <div className="bg-[#111] rounded-2xl border border-white/5 overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-white/5 text-gray-400 text-sm">
              <th className="px-6 py-4 font-medium">Vendor</th>
              <th className="px-6 py-4 font-medium">Payment Details</th>
              <th className="px-6 py-4 font-medium">Tax Compliance</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            <AnimatePresence>
              {filteredVendors.map((vendor) => (
                <motion.tr 
                  key={vendor.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="hover:bg-white/[0.02] transition-colors group"
                >
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 font-bold">
                        {vendor.name[0]}
                      </div>
                      <div>
                        <div className="font-semibold text-gray-100">{vendor.name}</div>
                        <div className="text-xs text-gray-400 flex items-center gap-1 mt-1">
                          <Mail size={12} /> {vendor.email || "No email"}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="text-sm text-gray-300 font-mono">
                      {vendor.bankAccount ? `****${vendor.bankAccount.slice(-4)}` : "Not set"}
                    </div>
                    <div className="text-xs text-gray-500 mt-1 uppercase tracking-wider">
                      {vendor.ifsc || "No IFSC"}
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex gap-2">
                       <span className="px-2 py-1 rounded bg-blue-500/10 text-blue-400 text-[10px] font-bold uppercase tracking-tight border border-blue-500/20">
                        PAN: {vendor.pan || "NA"}
                      </span>
                      {vendor.gstin && (
                        <span className="px-2 py-1 rounded bg-indigo-500/10 text-indigo-400 text-[10px] font-bold uppercase tracking-tight border border-indigo-500/20">
                          GST
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-500" />
                      <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">Verified</span>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <button className="p-2 hover:bg-white/5 rounded-lg text-gray-400 group-hover:text-white transition-all">
                      <MoreHorizontal size={20} />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
        
        {filteredVendors.length === 0 && !loading && (
          <div className="p-12 text-center text-gray-500 flex flex-col items-center">
            <Users size={48} className="mb-4 opacity-20" />
            <p className="text-lg font-medium">No vendors found</p>
            <p className="text-sm">Try searching for a different name or add a new vendor.</p>
          </div>
        )}
      </div>

      {/* Add Vendor Modal */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAddModal(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-[#111] border border-white/10 p-8 rounded-3xl w-full max-w-2xl relative shadow-2xl"
            >
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <Building2 className="text-emerald-500" />
                Register New Vendor
              </h2>
              
              <form onSubmit={handleAddVendor} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2 md:col-span-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-1">Legal Name</label>
                  <input 
                    required 
                    type="text" 
                    placeholder="Enter company or individual name"
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-500/50"
                    onChange={e => setNewVendor({...newVendor, name: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-1">Email Address</label>
                  <input 
                    type="email" 
                    placeholder="vendor@company.com"
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-500/50"
                    onChange={e => setNewVendor({...newVendor, email: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-1">Phone Number</label>
                  <input 
                    type="tel" 
                    placeholder="+91 00000 00000"
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-500/50"
                    onChange={e => setNewVendor({...newVendor, phone: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-1">PAN Card</label>
                  <input 
                    maxLength={10} 
                    placeholder="ABCDE1234F"
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm font-mono focus:outline-none focus:border-emerald-500/50 uppercase"
                    onChange={e => setNewVendor({...newVendor, pan: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-1">GSTIN (Optional)</label>
                  <input 
                    maxLength={15} 
                    placeholder="29AAAAA0000A1Z5"
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm font-mono focus:outline-none focus:border-emerald-500/50 uppercase"
                    onChange={e => setNewVendor({...newVendor, gstin: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-1">Bank Account Number</label>
                  <input 
                    required 
                    type="text" 
                    placeholder="Account number"
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm font-mono focus:outline-none focus:border-emerald-500/50"
                    onChange={e => setNewVendor({...newVendor, bankAccount: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-1">IFSC Code</label>
                  <input 
                    required 
                    maxLength={11} 
                    placeholder="HDFC0001234"
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm font-mono focus:outline-none focus:border-emerald-500/50 uppercase"
                    onChange={e => setNewVendor({...newVendor, ifsc: e.target.value})}
                  />
                </div>
                
                <div className="md:col-span-2 pt-4 flex gap-4">
                  <button 
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="flex-1 bg-white/5 hover:bg-white/10 text-white font-bold py-4 rounded-xl transition-all"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-black font-bold py-4 rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all"
                  >
                    Confirm Registration
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
