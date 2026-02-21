"use client";

import { useMemo, useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { assets, links, publishes } from "@/lib/mockData";
import { Badge } from "@/components/ui/Badge";
import { 
  CheckCircle2, 
  Rocket, 
  Clock, 
  Image as ImageIcon,
  DollarSign,
  Calendar,
  ArrowRight,
  Zap,
  AlertCircle,
  CheckSquare
} from "lucide-react";
import Image from "next/image";

const destinations = [
  { id: "pinterest", label: "Pinterest", desc: "Best for traffic & sales", icon: "📌", recommended: true },
  { id: "instagram", label: "Instagram", desc: "Great for engagement", icon: "📸" },
  { id: "stock", label: "Stock Sites", desc: "Passive income", icon: "🖼️" },
];

export default function LaunchpadPage() {
  const [destination, setDestination] = useState("pinterest");
  const [selectedAssets, setSelectedAssets] = useState<string[]>([]);
  const [schedule, setSchedule] = useState<"now" | "later">("now");
  const [scheduledTime, setScheduledTime] = useState("2026-01-20T20:00");

  const toggleAsset = (id: string) => {
    setSelectedAssets((prev) =>
      prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]
    );
  };

  const defaultLink = useMemo(() => links.find((l) => l.isDefault), []);
  const canPublish = selectedAssets.length > 0 && defaultLink;

  const recentActivity = publishes.slice(0, 4);

  return (
    <AppShell
      title="Publish & Earn"
      subtitle="Select your images, choose where to post, and start making money"
      showBanner={false}
      actions={
        <Badge tone="success" pulse>YOUR PROFIT LINK IS READY</Badge>
      }
    >
      <div className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
        {/* Left Column - Main Actions */}
        <div className="space-y-6">
          {/* Step 1: Choose Platform */}
          <div className="glass-card rounded-2xl p-6">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/20 text-lg font-bold text-amber-400">1</span>
              <div>
                <h2 className="text-xl font-bold text-white">Where Do You Want to Publish?</h2>
                <p className="text-slate-400">Choose the platform to post your images</p>
              </div>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {destinations.map((dest) => (
                <button
                  key={dest.id}
                  onClick={() => setDestination(dest.id)}
                  className={`relative flex flex-col items-center rounded-xl border p-5 text-center transition hover:-translate-y-1 ${
                    destination === dest.id
                      ? "border-amber-500/50 bg-amber-500/10"
                      : "border-white/10 bg-white/5 hover:border-white/20"
                  }`}
                >
                  {dest.recommended && (
                    <span className="absolute -top-2 right-2 rounded-full bg-emerald-500 px-2 py-0.5 text-[10px] font-bold text-white">
                      RECOMMENDED
                    </span>
                  )}
                  <span className="text-3xl">{dest.icon}</span>
                  <span className="mt-2 font-bold text-white">{dest.label}</span>
                  <span className="mt-1 text-sm text-slate-400">{dest.desc}</span>
                  {destination === dest.id && (
                    <CheckCircle2 className="absolute right-3 top-3 text-amber-400" size={20} />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Select Images */}
          <div className="glass-card rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/20 text-lg font-bold text-amber-400">2</span>
                <div>
                  <h2 className="text-xl font-bold text-white">Select Your Images</h2>
                  <p className="text-slate-400">Click on images to select them for publishing</p>
                </div>
              </div>
              <Badge tone="gold">{selectedAssets.length} SELECTED</Badge>
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {assets.map((asset) => {
                const isSelected = selectedAssets.includes(asset.id);
                return (
                  <button
                    key={asset.id}
                    onClick={() => toggleAsset(asset.id)}
                    className={`group relative overflow-hidden rounded-xl border text-left transition hover:-translate-y-1 ${
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
                        <div className="absolute inset-0 flex items-center justify-center bg-amber-500/20">
                          <CheckCircle2 className="text-amber-400" size={40} />
                        </div>
                      )}
                      <div className="absolute bottom-2 left-2">
                        <Badge tone={asset.hasLink ? "success" : "warning"}>
                          {asset.hasLink ? "Link Ready" : "No Link"}
                        </Badge>
                      </div>
                    </div>
                    <div className="p-3">
                      <p className="font-semibold text-white">{asset.title}</p>
                      <p className="mt-1 text-xs text-slate-400 line-clamp-1">{asset.style}</p>
                    </div>
                  </button>
                );
              })}
            </div>

            {assets.length === 0 && (
              <div className="mt-5 rounded-xl border border-dashed border-white/20 bg-white/5 p-8 text-center">
                <ImageIcon className="mx-auto text-slate-500" size={40} />
                <p className="mt-3 font-semibold text-white">No images yet</p>
                <p className="mt-1 text-slate-400">Create some images first to publish them</p>
                <a
                  href="/image-forge"
                  className="mt-4 inline-flex items-center gap-2 rounded-xl bg-amber-500 px-4 py-2 font-semibold text-black"
                >
                  <Zap size={16} />
                  Create AI Images
                </a>
              </div>
            )}
          </div>

          {/* Step 3: When to Post */}
          <div className="glass-card rounded-2xl p-6">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/20 text-lg font-bold text-amber-400">3</span>
              <div>
                <h2 className="text-xl font-bold text-white">When Do You Want to Post?</h2>
                <p className="text-slate-400">Publish now or schedule for later</p>
              </div>
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <button
                onClick={() => setSchedule("now")}
                className={`flex items-center gap-4 rounded-xl border p-5 transition ${
                  schedule === "now"
                    ? "border-emerald-500/50 bg-emerald-500/10"
                    : "border-white/10 bg-white/5 hover:border-white/20"
                }`}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/20">
                  <Rocket className="text-emerald-400" size={24} />
                </div>
                <div className="text-left">
                  <p className="font-bold text-white">Publish Now</p>
                  <p className="text-sm text-slate-400">Start earning immediately</p>
                </div>
                {schedule === "now" && <CheckCircle2 className="ml-auto text-emerald-400" size={24} />}
              </button>

              <button
                onClick={() => setSchedule("later")}
                className={`flex items-center gap-4 rounded-xl border p-5 transition ${
                  schedule === "later"
                    ? "border-amber-500/50 bg-amber-500/10"
                    : "border-white/10 bg-white/5 hover:border-white/20"
                }`}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/20">
                  <Calendar className="text-amber-400" size={24} />
                </div>
                <div className="text-left">
                  <p className="font-bold text-white">Schedule for Later</p>
                  <p className="text-sm text-slate-400">Best time to post: 8-11 PM</p>
                </div>
                {schedule === "later" && <CheckCircle2 className="ml-auto text-amber-400" size={24} />}
              </button>
            </div>

            {schedule === "later" && (
              <div className="mt-4 rounded-xl border border-white/10 bg-white/5 p-4">
                <label className="block text-sm font-medium text-slate-400">Choose date and time</label>
                <input
                  type="datetime-local"
                  value={scheduledTime}
                  onChange={(e) => setScheduledTime(e.target.value)}
                  className="mt-2 w-full rounded-xl border border-white/10 bg-black/40 p-4 text-lg text-white focus:border-amber-500/50 focus:outline-none"
                />
              </div>
            )}
          </div>

          {/* Publish Button */}
          <button
            disabled={!canPublish}
            className="flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-emerald-600 py-5 text-xl font-bold text-white shadow-lg shadow-emerald-500/30 transition hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-500/40 disabled:opacity-50 disabled:hover:translate-y-0"
          >
            <Rocket size={24} />
            {schedule === "now" ? `Publish ${selectedAssets.length} Image${selectedAssets.length !== 1 ? 's' : ''} Now` : `Schedule ${selectedAssets.length} Image${selectedAssets.length !== 1 ? 's' : ''}`}
          </button>

          {!defaultLink && (
            <div className="flex items-center gap-3 rounded-xl border border-amber-500/30 bg-amber-500/10 p-4">
              <AlertCircle className="text-amber-400 flex-shrink-0" size={24} />
              <div>
                <p className="font-semibold text-white">Add a Profit Link First</p>
                <p className="text-sm text-slate-400">You need to connect an affiliate link to start earning</p>
              </div>
              <a
                href="/monetization/link-vault"
                className="ml-auto rounded-lg bg-amber-500 px-4 py-2 text-sm font-bold text-black"
              >
                Add Link
              </a>
            </div>
          )}
        </div>

        {/* Right Column - Summary & Activity */}
        <div className="space-y-6">
          {/* Summary Card */}
          <div className="glass-gold rounded-2xl p-6">
            <h2 className="text-lg font-bold text-white">Publishing Summary</h2>
            
            <div className="mt-5 space-y-4">
              <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-center gap-3">
                  <CheckSquare className="text-slate-400" size={20} />
                  <span className="text-slate-300">Images Selected</span>
                </div>
                <span className="text-xl font-bold text-white">{selectedAssets.length}</span>
              </div>

              <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-center gap-3">
                  <Rocket className="text-slate-400" size={20} />
                  <span className="text-slate-300">Destination</span>
                </div>
                <span className="font-semibold text-white capitalize">{destination}</span>
              </div>

              <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-center gap-3">
                  <Clock className="text-slate-400" size={20} />
                  <span className="text-slate-300">Timing</span>
                </div>
                <span className="font-semibold text-white">
                  {schedule === "now" ? "Immediately" : scheduledTime.replace("T", " at ")}
                </span>
              </div>

              <div className="flex items-center justify-between rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4">
                <div className="flex items-center gap-3">
                  <DollarSign className="text-emerald-400" size={20} />
                  <span className="text-emerald-300">Profit Link</span>
                </div>
                <span className="font-semibold text-emerald-400">
                  {defaultLink ? "Connected ✓" : "Not Set"}
                </span>
              </div>
            </div>

            {defaultLink && (
              <div className="mt-4 rounded-xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm font-medium text-slate-400">Your link will be attached:</p>
                <p className="mt-1 font-semibold text-white">{defaultLink.title}</p>
                <p className="text-xs text-slate-400">{defaultLink.network}</p>
              </div>
            )}
          </div>

          {/* Recent Activity */}
          <div className="glass-card rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-white">Recent Activity</h2>
              <a href="/scheduler" className="text-sm font-semibold text-amber-400 hover:text-amber-300">
                View All <ArrowRight size={14} className="inline" />
              </a>
            </div>

            <div className="mt-5 space-y-3">
              {recentActivity.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-4"
                >
                  <div>
                    <p className="font-semibold capitalize text-white">{item.destination}</p>
                    <p className="text-xs text-slate-400">
                      {item.assetIds.length} image{item.assetIds.length !== 1 ? 's' : ''}
                    </p>
                  </div>
                  <Badge
                    tone={
                      item.status === "sent" ? "success" :
                      item.status === "failed" ? "danger" :
                      item.status === "scheduled" ? "gold" : "warning"
                    }
                  >
                    {item.status}
                  </Badge>
                </div>
              ))}
            </div>
          </div>

          {/* Tips */}
          <div className="glass-card rounded-2xl p-6">
            <div className="flex items-center gap-2 text-amber-400">
              <Zap size={18} />
              <h2 className="text-lg font-bold">Pro Tips</h2>
            </div>
            <ul className="mt-4 space-y-3 text-slate-300">
              <li className="flex items-start gap-2">
                <CheckCircle2 size={16} className="mt-0.5 text-emerald-400 flex-shrink-0" />
                <span><strong className="text-white">Best times:</strong> 8-11 PM gets 2x more clicks</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 size={16} className="mt-0.5 text-emerald-400 flex-shrink-0" />
                <span><strong className="text-white">Consistency:</strong> Post daily for best results</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 size={16} className="mt-0.5 text-emerald-400 flex-shrink-0" />
                <span><strong className="text-white">Pinterest first:</strong> Highest earning potential</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
