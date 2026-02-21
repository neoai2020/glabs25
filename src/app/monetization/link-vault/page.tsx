"use client";

import { useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { links } from "@/lib/mockData";
import { Badge } from "@/components/ui/Badge";
import { 
  Plus, 
  DollarSign, 
  Copy, 
  Pencil, 
  Trash2, 
  CheckCircle2,
  Star,
  ExternalLink,
  TrendingUp,
  Zap
} from "lucide-react";

export default function LinkVaultPage() {
  const [rows] = useState(links);
  const [showAddModal, setShowAddModal] = useState(false);

  const totalEarnings = rows.reduce((sum, link) => {
    const earnings = parseFloat(link.earnings?.replace(/[$,]/g, '') || '0');
    return sum + earnings;
  }, 0);

  return (
    <AppShell
      title="Revenue Links"
      subtitle="Connect your affiliate links and start earning from every image you publish"
      showBanner={false}
      actions={
        <button 
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-5 py-3 text-sm font-bold text-black shadow-lg shadow-amber-500/25 transition hover:-translate-y-0.5"
        >
          <Plus size={18} />
          Add New Link
        </button>
      }
    >
      {/* Earnings Overview */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="glass-money rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/20">
              <DollarSign className="text-emerald-400" size={24} />
            </div>
            <Badge tone="success" pulse>LIVE</Badge>
          </div>
          <p className="mt-4 text-3xl font-bold text-emerald-400">${totalEarnings.toLocaleString()}</p>
          <p className="mt-1 text-sm text-slate-400">Total Earnings from Links</p>
        </div>

        <div className="glass-card rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/20">
              <TrendingUp className="text-amber-400" size={24} />
            </div>
            <Badge tone="gold">ACTIVE</Badge>
          </div>
          <p className="mt-4 text-3xl font-bold text-white">{rows.length}</p>
          <p className="mt-1 text-sm text-slate-400">Active Revenue Links</p>
        </div>

        <div className="glass-card rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10">
              <Star className="text-amber-400" size={24} />
            </div>
          </div>
          <p className="mt-4 text-3xl font-bold text-white">{rows.filter(l => l.isDefault).length}</p>
          <p className="mt-1 text-sm text-slate-400">Default Link Set</p>
        </div>
      </div>

      {/* Links List */}
      <div className="glass-card rounded-2xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white">Your Revenue Links</h2>
            <p className="mt-1 text-slate-400">Manage your affiliate and product links</p>
          </div>
        </div>

        <div className="mt-6 space-y-4">
          {rows.map((link) => (
            <div 
              key={link.id} 
              className={`rounded-xl border p-5 transition hover:border-amber-500/30 ${
                link.isDefault 
                  ? "border-emerald-500/30 bg-emerald-500/5" 
                  : "border-white/10 bg-white/5"
              }`}
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-4">
                  <div className={`flex h-14 w-14 items-center justify-center rounded-xl ${
                    link.isDefault ? "bg-emerald-500/20" : "bg-amber-500/20"
                  }`}>
                    <DollarSign className={link.isDefault ? "text-emerald-400" : "text-amber-400"} size={28} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-bold text-white">{link.title}</h3>
                      {link.isDefault && (
                        <Badge tone="success">DEFAULT</Badge>
                      )}
                    </div>
                    <p className="mt-1 text-sm text-slate-400">
                      {link.network} • Last used {link.lastUsed}
                    </p>
                    {link.notes && (
                      <p className="mt-2 text-sm text-slate-300">{link.notes}</p>
                    )}
                  </div>
                </div>

                <div className="flex flex-col items-end gap-2">
                  {link.earnings && (
                    <p className="text-2xl font-bold text-emerald-400">{link.earnings}</p>
                  )}
                  <div className="flex items-center gap-2">
                    <button className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm font-semibold text-white hover:bg-white/10">
                      <Copy size={14} className="inline mr-1" />
                      Copy
                    </button>
                    <button className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm font-semibold text-white hover:bg-white/10">
                      <Pencil size={14} className="inline mr-1" />
                      Edit
                    </button>
                    {!link.isDefault && (
                      <button className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-sm font-semibold text-emerald-400 hover:bg-emerald-500/20">
                        <Star size={14} className="inline mr-1" />
                        Set Default
                      </button>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-2 rounded-lg border border-white/10 bg-black/30 px-4 py-3">
                <span className="flex-1 truncate text-sm text-slate-400">{link.url}</span>
                <a 
                  href={link.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-amber-400 hover:text-amber-300"
                >
                  <ExternalLink size={16} />
                </a>
              </div>
            </div>
          ))}
        </div>

        {rows.length === 0 && (
          <div className="mt-6 rounded-xl border border-dashed border-white/20 bg-white/5 p-8 text-center">
            <DollarSign className="mx-auto text-slate-500" size={48} />
            <h3 className="mt-4 text-xl font-bold text-white">No Links Yet</h3>
            <p className="mt-2 text-slate-400">
              Add your first affiliate link to start earning from your images
            </p>
            <button 
              onClick={() => setShowAddModal(true)}
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-6 py-3 font-bold text-black"
            >
              <Plus size={18} />
              Add Your First Link
            </button>
          </div>
        )}
      </div>

      {/* Tips */}
      <div className="glass-card rounded-2xl p-6">
        <div className="flex items-center gap-2 text-amber-400">
          <Zap size={20} />
          <h2 className="text-lg font-bold">How Links Work</h2>
        </div>
        <div className="mt-5 grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/20 text-lg font-bold text-amber-400">1</div>
            <p className="mt-3 font-semibold text-white">Add Your Link</p>
            <p className="mt-1 text-sm text-slate-400">Connect your Amazon, Etsy, or any affiliate link</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/20 text-lg font-bold text-amber-400">2</div>
            <p className="mt-3 font-semibold text-white">Auto-Attached</p>
            <p className="mt-1 text-sm text-slate-400">Your link is automatically added to every image you publish</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/20 text-lg font-bold text-emerald-400">3</div>
            <p className="mt-3 font-semibold text-white">Earn Commissions</p>
            <p className="mt-1 text-sm text-slate-400">When people click and buy, you earn money automatically</p>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
