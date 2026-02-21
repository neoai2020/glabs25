"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AppShell } from "@/components/layout/AppShell";
import { assets } from "@/lib/mockData";
import { Badge } from "@/components/ui/Badge";
import { 
  DollarSign, 
  Filter, 
  Download, 
  Sparkles, 
  Rocket,
  CheckCircle2,
  Image as ImageIcon,
  Zap,
  ArrowRight
} from "lucide-react";

export default function LibraryPage() {
  const [statusFilter, setStatusFilter] = useState<"all" | "generated" | "imported">("all");
  const [linkFilter, setLinkFilter] = useState<"all" | "hasLink" | "needsLink">("all");
  const [selectedAssets, setSelectedAssets] = useState<string[]>([]);

  const filtered = useMemo(() => {
    return assets.filter((asset) => {
      const matchesStatus = statusFilter === "all" || asset.status === statusFilter;
      const matchesLink =
        linkFilter === "all" || (linkFilter === "hasLink" ? asset.hasLink : !asset.hasLink);
      return matchesStatus && matchesLink;
    });
  }, [statusFilter, linkFilter]);

  const toggleSelect = (id: string) => {
    setSelectedAssets(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const readyToPublish = assets.filter(a => a.hasLink).length;
  const needsLink = assets.filter(a => !a.hasLink).length;

  return (
    <AppShell
      title="My Assets"
      subtitle="Your library of AI-generated images ready to earn money"
      showBanner={false}
      actions={
        <div className="flex gap-3">
          <Link
            href="/monetization/link-vault"
            className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white hover:bg-white/10"
          >
            <DollarSign size={16} />
            Revenue Links
          </Link>
          <Link
            href="/image-forge"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-4 py-2.5 text-sm font-bold text-black"
          >
            <Zap size={16} />
            Create More
          </Link>
        </div>
      }
    >
      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="glass-card rounded-2xl p-5">
          <div className="flex items-center justify-between">
            <ImageIcon className="text-amber-400" size={24} />
            <Badge tone="gold">TOTAL</Badge>
          </div>
          <p className="mt-3 text-3xl font-bold text-white">{assets.length}</p>
          <p className="text-sm text-slate-400">Images in Library</p>
        </div>

        <div className="glass-money rounded-2xl p-5">
          <div className="flex items-center justify-between">
            <CheckCircle2 className="text-emerald-400" size={24} />
            <Badge tone="success">READY</Badge>
          </div>
          <p className="mt-3 text-3xl font-bold text-emerald-400">{readyToPublish}</p>
          <p className="text-sm text-slate-400">Ready to Publish</p>
        </div>

        <div className="glass-card rounded-2xl p-5">
          <div className="flex items-center justify-between">
            <DollarSign className="text-amber-400" size={24} />
            <Badge tone="warning">ACTION</Badge>
          </div>
          <p className="mt-3 text-3xl font-bold text-amber-400">{needsLink}</p>
          <p className="text-sm text-slate-400">Need Profit Link</p>
        </div>
      </div>

      {/* Filters */}
      <div className="glass-card rounded-2xl p-5">
        <div className="flex flex-wrap items-center gap-3">
          <Filter className="text-slate-400" size={18} />
          <span className="text-sm font-medium text-slate-400">Filter:</span>
          
          <div className="flex gap-2">
            {[
              { id: "all", label: "All" },
              { id: "generated", label: "AI Created" },
              { id: "imported", label: "Imported" },
            ].map((filter) => (
              <button
                key={filter.id}
                onClick={() => setStatusFilter(filter.id as any)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  statusFilter === filter.id
                    ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                    : "bg-white/5 text-slate-300 border border-white/10 hover:bg-white/10"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>

          <span className="mx-2 h-6 w-px bg-white/10" />

          <div className="flex gap-2">
            {[
              { id: "all", label: "All Links" },
              { id: "hasLink", label: "Has Link" },
              { id: "needsLink", label: "Needs Link" },
            ].map((filter) => (
              <button
                key={filter.id}
                onClick={() => setLinkFilter(filter.id as any)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  linkFilter === filter.id
                    ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                    : "bg-white/5 text-slate-300 border border-white/10 hover:bg-white/10"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedAssets.length > 0 && (
        <div className="glass-gold rounded-2xl p-4">
          <div className="flex items-center justify-between">
            <p className="font-semibold text-white">
              {selectedAssets.length} image{selectedAssets.length !== 1 ? 's' : ''} selected
            </p>
            <div className="flex gap-2">
              <button className="rounded-lg bg-white/10 px-4 py-2 text-sm font-semibold text-white hover:bg-white/15">
                <DollarSign size={14} className="inline mr-1" />
                Add Link to All
              </button>
              <Link 
                href="/launchpad"
                className="rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-600"
              >
                <Rocket size={14} className="inline mr-1" />
                Publish Selected
              </Link>
              <button 
                onClick={() => setSelectedAssets([])}
                className="rounded-lg bg-white/10 px-4 py-2 text-sm font-semibold text-white hover:bg-white/15"
              >
                Clear
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Assets Grid */}
      <div className="glass-card rounded-2xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white">Your Images</h2>
            <p className="mt-1 text-slate-400">Click to select, then publish or add links</p>
          </div>
          <Badge tone="gold">{filtered.length} IMAGES</Badge>
        </div>

        {filtered.length === 0 ? (
          <div className="mt-6 rounded-xl border border-dashed border-white/20 bg-white/5 p-10 text-center">
            <ImageIcon className="mx-auto text-slate-500" size={48} />
            <h3 className="mt-4 text-xl font-bold text-white">No Images Yet</h3>
            <p className="mt-2 text-slate-400">
              Create your first AI images to start building your library
            </p>
            <Link
              href="/image-forge"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-6 py-3 font-bold text-black"
            >
              <Sparkles size={18} />
              Create Your First Images
            </Link>
          </div>
        ) : (
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((asset) => {
              const isSelected = selectedAssets.includes(asset.id);
              return (
                <div 
                  key={asset.id} 
                  onClick={() => toggleSelect(asset.id)}
                  className={`group cursor-pointer overflow-hidden rounded-xl border transition hover:-translate-y-1 ${
                    isSelected
                      ? "border-amber-500/50 bg-amber-500/10 ring-2 ring-amber-500/30"
                      : "border-white/10 bg-white/5 hover:border-white/20"
                  }`}
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden">
                    <Image 
                      src={asset.imageUrl} 
                      alt={asset.title} 
                      fill 
                      className="object-cover transition group-hover:scale-105" 
                    />
                    {isSelected && (
                      <div className="absolute inset-0 flex items-center justify-center bg-amber-500/30">
                        <CheckCircle2 className="text-white" size={40} />
                      </div>
                    )}
                    <div className="absolute bottom-2 left-2 flex gap-2">
                      <Badge tone={asset.hasLink ? "success" : "warning"}>
                        {asset.hasLink ? "Ready" : "Needs Link"}
                      </Badge>
                    </div>
                    <div className="absolute right-2 top-2">
                      <span className="rounded-lg bg-black/60 px-2 py-1 text-xs font-medium text-white">
                        {asset.style}
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="font-semibold text-white">{asset.title}</p>
                    <p className="mt-1 text-sm text-slate-400 line-clamp-1">{asset.prompt}</p>
                    <div className="mt-3 flex flex-wrap gap-1">
                      {asset.tags.slice(0, 3).map((tag) => (
                        <span 
                          key={tag} 
                          className="rounded-full bg-white/10 px-2 py-0.5 text-xs text-slate-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="mt-3 flex gap-2" onClick={(e) => e.stopPropagation()}>
                      {!asset.hasLink && (
                        <Link
                          href="/monetization/link-vault"
                          className="flex-1 rounded-lg bg-amber-500/20 py-2 text-center text-sm font-semibold text-amber-400 hover:bg-amber-500/30"
                        >
                          <DollarSign size={14} className="inline mr-1" />
                          Add Link
                        </Link>
                      )}
                      <Link
                        href="/launchpad"
                        className="flex-1 rounded-lg bg-white/10 py-2 text-center text-sm font-semibold text-white hover:bg-white/15"
                      >
                        <Rocket size={14} className="inline mr-1" />
                        Publish
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* CTA */}
      {assets.length > 0 && needsLink > 0 && (
        <div className="glass-gold rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-white">
                {needsLink} image{needsLink !== 1 ? 's' : ''} without profit links
              </h3>
              <p className="mt-1 text-slate-300">Add links to start earning from these images</p>
            </div>
            <Link
              href="/monetization/link-vault"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-5 py-3 font-bold text-black"
            >
              Add Profit Links
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      )}
    </AppShell>
  );
}
