"use client";

import React, { useState } from "react";
import { 
  Users, 
  Search, 
  CheckCircle2, 
  XCircle, 
  Eye, 
  MessageSquare, 
  Clock,
  Filter,
  ArrowUpRight,
  ExternalLink,
  ShieldAlert
} from "lucide-react";

const mockQueue = [
  { id: 1, name: 'Aarav Sharma', amount: '₹1,50,000', proofs: 3, section: '80C', date: '2026-03-14', status: 'PENDING' },
  { id: 2, name: 'Sneha Patel', amount: '₹22,000', proofs: 1, section: '80D', date: '2026-03-14', status: 'PENDING' },
  { id: 3, name: 'Reva Kumar', amount: '₹45,000', proofs: 2, section: 'HRA', date: '2026-03-13', status: 'VERIFIED' },
  { id: 4, name: 'Amit Singh', amount: '₹12,000', proofs: 1, section: 'OTHER', date: '2026-03-13', status: 'REJECTED' },
];

export default function TaxVerificationPage() {
  const [selectedItem, setSelectedItem] = useState<any>(null);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-4xl font-bold text-white flex items-center gap-3">
                <ShieldAlert className="w-10 h-10 text-yellow-500" />
                Proof Verification Queue
              </h1>
              <p className="text-zinc-500 mt-2">Audit and verify manual investment declarations from employees</p>
            </div>
            <div className="flex gap-4">
               <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-900 border border-white/5">
                <Clock className="w-4 h-4 text-yellow-400" />
                <span className="text-sm">24 Pending Reviews</span>
               </div>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main List */}
          <div className="lg:col-span-3 space-y-4">
            <div className="flex items-center gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                <input 
                  type="text" 
                  placeholder="Search by employee name or ID..."
                  className="w-full bg-zinc-900 border border-white/5 rounded-lg py-2.5 pl-10 pr-4 outline-none focus:border-blue-500/50"
                />
              </div>
              <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-zinc-900 border border-white/5 hover:bg-zinc-800 transition-all">
                <Filter className="w-4 h-4" />
                <span>Filters</span>
              </button>
            </div>

            <div className="bg-zinc-900/30 border border-white/5 rounded-2xl overflow-hidden backdrop-blur-xl">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/5 bg-white/5">
                    <th className="px-6 py-4 text-xs font-semibold text-zinc-400 uppercase tracking-wider">Employee</th>
                    <th className="px-6 py-4 text-xs font-semibold text-zinc-400 uppercase tracking-wider">Section</th>
                    <th className="px-6 py-4 text-xs font-semibold text-zinc-400 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-4 text-xs font-semibold text-zinc-400 uppercase tracking-wider">Docs</th>
                    <th className="px-6 py-4 text-xs font-semibold text-zinc-400 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-xs font-semibold text-zinc-400 uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {mockQueue.map((item) => (
                    <tr 
                      key={item.id} 
                      className={`hover:bg-white/5 transition-all cursor-pointer ${selectedItem?.id === item.id ? 'bg-blue-500/5' : ''}`}
                      onClick={() => setSelectedItem(item)}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center font-bold text-xs text-indigo-400">
                            {item.name.charAt(0)}
                          </div>
                          <span className="font-medium">{item.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-zinc-400 text-sm font-mono">{item.section}</td>
                      <td className="px-6 py-4 font-semibold text-sm">{item.amount}</td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-500 text-[10px] font-bold">
                          {item.proofs} FILES
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`text-[10px] px-2 py-1 rounded-full font-bold border ${
                          item.status === 'VERIFIED' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                          item.status === 'REJECTED' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                          'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
                        }`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button className="p-2 hover:bg-zinc-800 rounded-lg text-zinc-400 hover:text-white transition-all">
                          <Eye className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Review Panel */}
          <div className="lg:col-span-1">
            {selectedItem ? (
              <div className="bg-zinc-900 border border-white/5 rounded-2xl p-6 sticky top-8">
                <h3 className="text-xl font-bold mb-1">{selectedItem.name}</h3>
                <p className="text-zinc-500 text-sm mb-6 pb-6 border-b border-white/5">Reviewing {selectedItem.section} Proofs</p>

                <div className="space-y-6">
                   <div>
                    <span className="text-xs text-zinc-500 uppercase font-bold tracking-widest block mb-2">Attached Proofs</span>
                    <div className="space-y-3">
                      {[1, 2].map(i => (
                        <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-zinc-950 border border-white/5 group">
                          <div className="flex items-center gap-3">
                             <div className="p-2 bg-red-500/10 rounded-lg border border-red-500/20">
                               <span className="text-[10px] font-bold text-red-400">PDF</span>
                             </div>
                             <span className="text-sm text-zinc-400 group-hover:text-white transition-all underline decoration-zinc-700 cursor-pointer">proof_{i}.pdf</span>
                          </div>
                          <ExternalLink className="w-3 h-3 text-zinc-600" />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="text-xs text-zinc-500 uppercase font-bold tracking-widest block mb-2">Admin Remarks</span>
                    <textarea 
                      placeholder="Add reason for rejection or notes for verification..."
                      className="w-full bg-zinc-950 border border-white/5 rounded-lg p-3 text-sm focus:border-blue-500 outline-none h-24"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-4">
                    <button className="flex items-center justify-center gap-2 py-3 bg-red-600/10 border border-red-600/20 text-red-500 rounded-xl font-semibold hover:bg-red-600 hover:text-white transition-all">
                      <XCircle className="w-4 h-4" />
                      Reject
                    </button>
                    <button className="flex items-center justify-center gap-2 py-3 bg-green-600 border border-green-700 text-white rounded-xl font-semibold hover:bg-green-500 transition-all shadow-lg shadow-green-900/20">
                      <CheckCircle2 className="w-4 h-4" />
                      Verify
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-zinc-900/30 border border-dashed border-white/10 rounded-2xl p-12 text-center text-zinc-600">
                <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-10" />
                <p>Select an entry to begin manual verification</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
