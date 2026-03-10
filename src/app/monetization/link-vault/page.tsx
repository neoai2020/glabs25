"use client";

import { useState, useEffect, useCallback } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { Badge } from "@/components/ui/Badge";
import { 
  Plus, DollarSign, Star, ExternalLink, CheckCircle2, ArrowRight, 
  Copy, HelpCircle, Trash2, AlertCircle
} from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

type SavedLink = {
  id: string;
  name: string;
  url: string;
  network: string;
  isDefault: boolean;
  earnings: string;
};

const STORAGE_KEY_PREFIX = "glabs_money_links_";

const defaultSavedLinks: SavedLink[] = [
  {
    id: "1",
    name: "My Amazon Affiliate Link",
    url: "https://amazon.com/shop/yourname?tag=yourtag-20",
    network: "Amazon Associates",
    isDefault: true,
    earnings: "$847"
  }
];

function loadLinks(userId: string | undefined): SavedLink[] {
  if (typeof window === "undefined") return defaultSavedLinks;
  try {
    const key = STORAGE_KEY_PREFIX + (userId ?? "anonymous");
    const stored = localStorage.getItem(key);
    if (stored) return JSON.parse(stored);
  } catch { /* ignore corrupt data */ }
  return defaultSavedLinks;
}

function saveLinks(userId: string | undefined, links: SavedLink[]) {
  if (typeof window === "undefined") return;
  try {
    const key = STORAGE_KEY_PREFIX + (userId ?? "anonymous");
    localStorage.setItem(key, JSON.stringify(links));
  } catch { /* storage full / unavailable */ }
}

export default function LinkVaultPage() {
  const { user } = useAuth();
  const [links, setLinks] = useState<SavedLink[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newLinkName, setNewLinkName] = useState("");
  const [newLinkUrl, setNewLinkUrl] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    setLinks(loadLinks(user?.id));
    setHydrated(true);
  }, [user?.id]);

  const persistLinks = useCallback(
    (next: SavedLink[]) => {
      setLinks(next);
      saveLinks(user?.id, next);
    },
    [user?.id]
  );

  const defaultLink = links.find(l => l.isDefault);

  const handleAddLink = () => {
    if (!newLinkName || !newLinkUrl) return;
    
    const newLink: SavedLink = {
      id: Date.now().toString(),
      name: newLinkName,
      url: newLinkUrl,
      network: newLinkUrl.includes("amazon") ? "Amazon" : 
               newLinkUrl.includes("etsy") ? "Etsy" : 
               newLinkUrl.includes("walmart") ? "Walmart" : "Affiliate",
      isDefault: links.length === 0,
      earnings: "$0"
    };
    
    persistLinks([...links, newLink]);
    setNewLinkName("");
    setNewLinkUrl("");
    setShowAddForm(false);
  };

  const setDefaultLink = (id: string) => {
    persistLinks(links.map(l => ({ ...l, isDefault: l.id === id })));
  };

  const deleteLink = (id: string) => {
    persistLinks(links.filter(l => l.id !== id));
  };

  const copyLink = (id: string, url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <AppShell
      title="Money Links"
      subtitle="Add your affiliate link to earn money from your images"
    >
      {/* What is this page - Clear explanation */}
      <div className="glass-gold rounded-3xl p-8">
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-amber-500/20">
            <HelpCircle className="text-amber-400" size={28} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">What is an Affiliate Link?</h2>
            <p className="mt-3 text-lg text-slate-300">
              An affiliate link is a special URL that tracks when someone buys something through your recommendation. 
              When you share an image on Pinterest with your affiliate link, and someone clicks it and makes a purchase, 
              <span className="font-semibold text-emerald-400"> you earn a commission (usually 3-10% of the sale)</span>.
            </p>
          </div>
        </div>

        {/* How it works steps */}
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl bg-black/20 p-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500 text-lg font-bold text-black">1</div>
            <h3 className="mt-3 font-semibold text-white">You share an image</h3>
            <p className="mt-1 text-sm text-slate-400">Post your AI image to Pinterest with your affiliate link attached</p>
          </div>
          <div className="rounded-2xl bg-black/20 p-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500 text-lg font-bold text-black">2</div>
            <h3 className="mt-3 font-semibold text-white">Someone clicks & buys</h3>
            <p className="mt-1 text-sm text-slate-400">They see the product on Amazon/Etsy and decide to purchase</p>
          </div>
          <div className="rounded-2xl bg-black/20 p-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500 text-lg font-bold text-black">3</div>
            <h3 className="mt-3 font-semibold text-white">You get paid!</h3>
            <p className="mt-1 text-sm text-slate-400">The company pays you a percentage of every sale automatically</p>
          </div>
        </div>
      </div>

      {/* Where to get an affiliate link */}
      <div className="glass-card rounded-3xl p-8">
        <h2 className="text-xl font-bold text-white">Where to Get an Affiliate Link?</h2>
        <p className="mt-2 text-slate-400">Sign up for free with any of these programs:</p>
        
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <a href="https://affiliate-program.amazon.com/" target="_blank" rel="noopener noreferrer" 
             className="rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:border-amber-500/30 hover:bg-white/8">
            <div className="text-2xl font-bold text-white">Amazon</div>
            <p className="mt-1 text-sm text-slate-400">Amazon Associates</p>
            <p className="mt-2 text-emerald-400 font-medium">1-10% commission</p>
            <span className="mt-3 inline-flex items-center gap-1 text-xs text-amber-400">
              Sign up free <ExternalLink size={12} />
            </span>
          </a>
          <a href="https://www.etsy.com/affiliates" target="_blank" rel="noopener noreferrer"
             className="rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:border-amber-500/30 hover:bg-white/8">
            <div className="text-2xl font-bold text-white">Etsy</div>
            <p className="mt-1 text-sm text-slate-400">Etsy Affiliate Program</p>
            <p className="mt-2 text-emerald-400 font-medium">4-8% commission</p>
            <span className="mt-3 inline-flex items-center gap-1 text-xs text-amber-400">
              Sign up free <ExternalLink size={12} />
            </span>
          </a>
          <a href="https://affiliates.walmart.com/" target="_blank" rel="noopener noreferrer"
             className="rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:border-amber-500/30 hover:bg-white/8">
            <div className="text-2xl font-bold text-white">Walmart</div>
            <p className="mt-1 text-sm text-slate-400">Walmart Affiliates</p>
            <p className="mt-2 text-emerald-400 font-medium">1-4% commission</p>
            <span className="mt-3 inline-flex items-center gap-1 text-xs text-amber-400">
              Sign up free <ExternalLink size={12} />
            </span>
          </a>
          <a href="https://www.shareasale.com/" target="_blank" rel="noopener noreferrer"
             className="rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:border-amber-500/30 hover:bg-white/8">
            <div className="text-2xl font-bold text-white">ShareASale</div>
            <p className="mt-1 text-sm text-slate-400">1000s of brands</p>
            <p className="mt-2 text-emerald-400 font-medium">5-50% commission</p>
            <span className="mt-3 inline-flex items-center gap-1 text-xs text-amber-400">
              Sign up free <ExternalLink size={12} />
            </span>
          </a>
        </div>
      </div>

      {/* Your saved links */}
      <div className="glass-card rounded-3xl p-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white">Your Saved Links</h2>
            <p className="text-slate-400">Add your affiliate link here to use with your images</p>
          </div>
          <button 
            onClick={() => setShowAddForm(true)}
            className="btn-premium flex items-center gap-2 rounded-xl px-5 py-3 font-semibold text-black"
          >
            <Plus size={18} />
            Add Link
          </button>
        </div>

        {/* Add new link form */}
        {showAddForm && (
          <div className="mt-6 rounded-2xl border border-amber-500/30 bg-amber-500/5 p-6">
            <h3 className="font-semibold text-white">Add New Affiliate Link</h3>
            <div className="mt-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300">Link Name</label>
                <input
                  type="text"
                  value={newLinkName}
                  onChange={(e) => setNewLinkName(e.target.value)}
                  placeholder="e.g., My Amazon Link"
                  className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 p-4 text-white placeholder:text-slate-500 focus:border-amber-500/50 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300">Affiliate URL</label>
                <input
                  type="url"
                  value={newLinkUrl}
                  onChange={(e) => setNewLinkUrl(e.target.value)}
                  placeholder="Paste your affiliate link here..."
                  className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 p-4 text-white placeholder:text-slate-500 focus:border-amber-500/50 focus:outline-none"
                />
              </div>
              <div className="flex gap-3">
                <button
                  onClick={handleAddLink}
                  disabled={!newLinkName || !newLinkUrl}
                  className="flex-1 rounded-xl bg-amber-500 py-3 font-semibold text-black hover:bg-amber-400 disabled:opacity-50"
                >
                  Save Link
                </button>
                <button
                  onClick={() => setShowAddForm(false)}
                  className="rounded-xl border border-white/10 px-6 py-3 text-white hover:bg-white/5"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Saved links list */}
        {!hydrated ? null : links.length === 0 ? (
          <div className="mt-6 rounded-2xl border-2 border-dashed border-white/10 p-8 text-center">
            <AlertCircle className="mx-auto text-amber-400" size={40} />
            <h3 className="mt-4 text-lg font-semibold text-white">No links saved yet</h3>
            <p className="mt-2 text-slate-400">Add your affiliate link to start earning from your images</p>
            <button
              onClick={() => setShowAddForm(true)}
              className="mt-4 inline-flex items-center gap-2 rounded-xl bg-amber-500 px-6 py-3 font-semibold text-black"
            >
              <Plus size={18} />
              Add Your First Link
            </button>
          </div>
        ) : (
          <div className="mt-6 space-y-4">
            {links.map((link) => (
              <div
                key={link.id}
                className={`rounded-2xl border p-5 ${
                  link.isDefault 
                    ? "border-emerald-500/30 bg-emerald-500/5" 
                    : "border-white/10 bg-white/5"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${
                      link.isDefault ? "bg-emerald-500/20" : "bg-amber-500/20"
                    }`}>
                      <DollarSign className={link.isDefault ? "text-emerald-400" : "text-amber-400"} size={24} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-white text-lg">{link.name}</h3>
                        {link.isDefault && <Badge tone="success">Active</Badge>}
                      </div>
                      <p className="text-slate-400">{link.network}</p>
                      <p className="mt-1 text-sm text-slate-500 truncate max-w-md">{link.url}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => copyLink(link.id, link.url)}
                      className="rounded-lg border border-white/10 bg-white/5 p-2 text-slate-400 hover:bg-white/10 hover:text-white"
                      title="Copy link"
                    >
                      {copiedId === link.id ? <CheckCircle2 size={18} className="text-emerald-400" /> : <Copy size={18} />}
                    </button>
                    {!link.isDefault && (
                      <button
                        onClick={() => setDefaultLink(link.id)}
                        className="flex items-center gap-1 rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-sm font-medium text-amber-400 hover:bg-amber-500/20"
                      >
                        <Star size={14} />
                        Make Active
                      </button>
                    )}
                    <button
                      onClick={() => deleteLink(link.id)}
                      className="rounded-lg border border-rose-500/30 bg-rose-500/10 p-2 text-rose-400 hover:bg-rose-500/20"
                      title="Delete"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* CTA to continue */}
      {defaultLink && (
        <div className="text-center">
          <p className="text-lg text-emerald-400 font-medium">
            <CheckCircle2 size={20} className="inline mr-2" />
            Your money link is ready!
          </p>
          <Link
            href="/image-forge"
            className="btn-premium mt-4 inline-flex items-center gap-3 rounded-xl px-10 py-5 text-xl font-bold text-black"
          >
            Create Images to Earn
            <ArrowRight size={24} />
          </Link>
        </div>
      )}
    </AppShell>
  );
}
