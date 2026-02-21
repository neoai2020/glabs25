"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AppShell } from "@/components/layout/AppShell";
import { assets } from "@/lib/mockData";
import { Badge } from "@/components/ui/Badge";
import { Sparkles, Rocket, CheckCircle2, Image as ImageIcon, TrendingUp, DollarSign } from "lucide-react";

export default function LibraryPage() {
  const [selectedAssets, setSelectedAssets] = useState<string[]>([]);

  const toggleSelect = (id: string) => {
    setSelectedAssets(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const readyCount = assets.filter(a => a.hasLink).length;
  const needLinkCount = assets.filter(a => !a.hasLink).length;

  return (
    <AppShell
      title="My Images"
      subtitle="All your AI-generated money-making images"
      showBanner={false}
      actions={
        <Link href="/image-forge" className="btn-premium flex items-center gap-2 rounded-xl px-5 py-3 font-semibold text-black">
          <Sparkles size={18} />
          Create More
        </Link>
      }
    >
      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-4">
        <div className="glass-card rounded-2xl p-5">
          <ImageIcon className="text-amber-400" size={24} />
          <p className="mt-3 text-2xl font-bold text-white">{assets.length}</p>
          <p className="text-sm text-slate-400">Total Images</p>
        </div>
        <div className="glass-money rounded-2xl p-5">
          <CheckCircle2 className="text-emerald-400" size={24} />
          <p className="mt-3 text-2xl font-bold text-white">{readyCount}</p>
          <p className="text-sm text-slate-400">Ready to Publish</p>
        </div>
        <div className="glass-card rounded-2xl p-5">
          <TrendingUp className="text-amber-400" size={24} />
          <p className="mt-3 text-2xl font-bold text-white">1,247</p>
          <p className="text-sm text-slate-400">Total Clicks</p>
        </div>
        <div className="glass-money rounded-2xl p-5">
          <DollarSign className="text-emerald-400" size={24} />
          <p className="mt-3 text-2xl font-bold text-emerald-400 money-glow">$186</p>
          <p className="text-sm text-slate-400">Earnings</p>
        </div>
      </div>

      {assets.length === 0 ? (
        <div className="glass-card rounded-3xl p-12 text-center">
          <ImageIcon className="mx-auto text-slate-500" size={64} />
          <h3 className="mt-6 text-2xl font-bold text-white">No images yet</h3>
          <p className="mt-2 text-lg text-slate-400">Create your first money-making images with AI</p>
          <Link
            href="/image-forge"
            className="btn-premium mt-8 inline-flex items-center gap-2 rounded-xl px-8 py-4 text-lg font-bold text-black"
          >
            <Sparkles size={20} />
            Create Your First Image
          </Link>
        </div>
      ) : (
        <>
          {/* Selection Bar */}
          {selectedAssets.length > 0 && (
            <div className="flex items-center justify-between rounded-2xl border border-amber-500/30 bg-amber-500/10 p-5">
              <p className="text-lg font-medium text-white">{selectedAssets.length} image{selectedAssets.length > 1 ? 's' : ''} selected</p>
              <div className="flex gap-3">
                <Link href="/launchpad" className="btn-premium flex items-center gap-2 rounded-xl px-5 py-2 font-semibold text-black">
                  <Rocket size={16} />
                  Publish Selected
                </Link>
                <button onClick={() => setSelectedAssets([])} className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-white hover:bg-white/10">
                  Clear
                </button>
              </div>
            </div>
          )}

          {/* Needs Link Warning */}
          {needLinkCount > 0 && (
            <div className="flex items-center gap-4 rounded-2xl border border-amber-500/30 bg-amber-500/10 p-5">
              <DollarSign className="text-amber-400 shrink-0" size={24} />
              <div className="flex-1">
                <p className="font-semibold text-white">{needLinkCount} image{needLinkCount > 1 ? 's' : ''} need a money link</p>
                <p className="text-slate-400">Add your affiliate link to start earning from these images</p>
              </div>
              <Link href="/monetization/link-vault" className="rounded-xl bg-amber-500 px-5 py-2 font-semibold text-black hover:bg-amber-400">
                Add Link
              </Link>
            </div>
          )}

          {/* Image Grid */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {assets.map((asset) => {
              const isSelected = selectedAssets.includes(asset.id);
              return (
                <button
                  key={asset.id}
                  onClick={() => toggleSelect(asset.id)}
                  className={`group overflow-hidden rounded-2xl border text-left transition-all ${
                    isSelected 
                      ? "border-amber-500 ring-2 ring-amber-500/30 scale-[1.02]" 
                      : "border-white/10 hover:border-white/20"
                  }`}
                >
                  <div className="relative aspect-square overflow-hidden">
                    <Image src={asset.imageUrl} alt={asset.title} fill className="object-cover transition group-hover:scale-105" />
                    {isSelected && (
                      <div className="absolute inset-0 flex items-center justify-center bg-amber-500/30 backdrop-blur-sm">
                        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-amber-500">
                          <CheckCircle2 className="text-black" size={28} />
                        </div>
                      </div>
                    )}
                    <div className="absolute bottom-2 left-2">
                      <Badge tone={asset.hasLink ? "success" : "warning"} size="sm">
                        {asset.hasLink ? "Ready" : "Needs link"}
                      </Badge>
                    </div>
                  </div>
                  <div className="bg-black/40 p-3">
                    <p className="font-medium text-white truncate">{asset.title}</p>
                    <p className="text-sm text-slate-400">{asset.style}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </>
      )}
    </AppShell>
  );
}
