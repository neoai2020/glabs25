"use client";

import { useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { assets as mockAssets, topNiches } from "@/lib/mockData";
import { Badge } from "@/components/ui/Badge";
import { 
  Sparkles, 
  Wand2, 
  Download, 
  Eye, 
  Loader2, 
  RefreshCcw,
  CheckCircle2,
  ArrowRight,
  Zap,
  TrendingUp
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const stylePresets = [
  { id: "premium", label: "Premium Lifestyle", desc: "High-end, aspirational" },
  { id: "product", label: "Product Showcase", desc: "Clean, sellable" },
  { id: "aesthetic", label: "Aesthetic Vibes", desc: "Trendy, Pinterest-ready" },
  { id: "minimal", label: "Minimal & Clean", desc: "Simple, modern" },
];

const aspectRatios = [
  { id: "3:4", label: "Pinterest", desc: "Best for pins" },
  { id: "1:1", label: "Instagram", desc: "Square posts" },
  { id: "16:9", label: "Wide", desc: "Banners & covers" },
];

const quickPrompts = [
  "Luxury home office with gold accents",
  "Skincare products on marble surface",
  "Modern kitchen with smart gadgets",
  "Cozy reading nook with warm lighting",
  "Minimalist desk setup for productivity",
];

export default function ImageForgePage() {
  const [prompt, setPrompt] = useState("");
  const [style, setStyle] = useState("premium");
  const [aspect, setAspect] = useState("3:4");
  const [quantity, setQuantity] = useState(4);
  const [isGenerating, setIsGenerating] = useState(false);
  const [results, setResults] = useState(mockAssets);

  const onGenerate = () => {
    if (!prompt.trim()) return;
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setResults(mockAssets);
    }, 2000);
  };

  return (
    <AppShell
      title="AI Image Creator"
      subtitle="Describe what you want and watch the AI create stunning, money-making images"
      showBanner={false}
      actions={
        <Badge tone="gold" pulse>POWERED BY ADVANCED AI</Badge>
      }
    >
      <div className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
        {/* Main Creation Panel */}
        <div className="space-y-6">
          {/* Prompt Input */}
          <div className="glass-gold rounded-2xl p-6">
            <div className="flex items-center gap-2 text-amber-400">
              <Wand2 size={20} />
              <h2 className="text-lg font-bold">What Do You Want to Create?</h2>
            </div>
            <p className="mt-1 text-slate-400">Describe your ideal image in simple words</p>
            
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="mt-4 w-full rounded-xl border border-white/10 bg-black/40 p-4 text-lg text-white placeholder:text-slate-500 focus:border-amber-500/50 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
              rows={4}
              placeholder="Example: A beautiful home office with natural light, modern furniture, and plants..."
            />

            {/* Quick Prompts */}
            <div className="mt-4">
              <p className="text-sm font-medium text-slate-400">Quick ideas (click to use):</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {quickPrompts.map((qp) => (
                  <button
                    key={qp}
                    onClick={() => setPrompt(qp)}
                    className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300 transition hover:border-amber-500/30 hover:bg-amber-500/10 hover:text-white"
                  >
                    {qp}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Style Selection */}
          <div className="glass-card rounded-2xl p-6">
            <h2 className="text-lg font-bold text-white">Choose Your Style</h2>
            <p className="mt-1 text-slate-400">Select the look that fits your content</p>
            
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {stylePresets.map((preset) => (
                <button
                  key={preset.id}
                  onClick={() => setStyle(preset.id)}
                  className={`flex flex-col items-start rounded-xl border p-4 text-left transition ${
                    style === preset.id
                      ? "border-amber-500/50 bg-amber-500/10"
                      : "border-white/10 bg-white/5 hover:border-white/20"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {style === preset.id && <CheckCircle2 size={18} className="text-amber-400" />}
                    <span className="font-semibold text-white">{preset.label}</span>
                  </div>
                  <span className="mt-1 text-sm text-slate-400">{preset.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Size & Quantity */}
          <div className="glass-card rounded-2xl p-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <h3 className="font-bold text-white">Image Size</h3>
                <p className="mt-1 text-sm text-slate-400">Best format for your platform</p>
                <div className="mt-3 space-y-2">
                  {aspectRatios.map((ar) => (
                    <button
                      key={ar.id}
                      onClick={() => setAspect(ar.id)}
                      className={`flex w-full items-center justify-between rounded-xl border px-4 py-3 transition ${
                        aspect === ar.id
                          ? "border-amber-500/50 bg-amber-500/10"
                          : "border-white/10 bg-white/5 hover:border-white/20"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {aspect === ar.id && <CheckCircle2 size={18} className="text-amber-400" />}
                        <span className="font-semibold text-white">{ar.label}</span>
                      </div>
                      <span className="text-sm text-slate-400">{ar.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-bold text-white">How Many Images?</h3>
                <p className="mt-1 text-sm text-slate-400">More images = more chances to earn</p>
                <div className="mt-3 grid grid-cols-4 gap-2">
                  {[2, 4, 6, 8].map((num) => (
                    <button
                      key={num}
                      onClick={() => setQuantity(num)}
                      className={`rounded-xl border py-3 text-lg font-bold transition ${
                        quantity === num
                          ? "border-amber-500/50 bg-amber-500/10 text-amber-400"
                          : "border-white/10 bg-white/5 text-white hover:border-white/20"
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
                <p className="mt-3 text-center text-sm text-emerald-400">
                  <TrendingUp size={14} className="inline mr-1" />
                  Creating {quantity} images at once
                </p>
              </div>
            </div>
          </div>

          {/* Generate Button */}
          <button
            onClick={onGenerate}
            disabled={isGenerating || !prompt.trim()}
            className="flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 py-5 text-xl font-bold text-black shadow-lg shadow-amber-500/30 transition hover:-translate-y-1 hover:shadow-xl hover:shadow-amber-500/40 disabled:opacity-50 disabled:hover:translate-y-0"
          >
            {isGenerating ? (
              <>
                <Loader2 className="animate-spin" size={24} />
                AI is Creating Your Images...
              </>
            ) : (
              <>
                <Sparkles size={24} />
                Create {quantity} AI Images Now
              </>
            )}
          </button>
        </div>

        {/* Right Side - Tips & Results Preview */}
        <div className="space-y-6">
          {/* Hot Niches */}
          <div className="glass-money rounded-2xl p-6">
            <div className="flex items-center gap-2 text-emerald-400">
              <TrendingUp size={20} />
              <h2 className="text-lg font-bold">Hot Niches Right Now</h2>
            </div>
            <p className="mt-1 text-slate-400">These topics are earning the most</p>
            <div className="mt-4 space-y-2">
              {topNiches.slice(0, 4).map((niche, idx) => (
                <div 
                  key={niche.name}
                  className="flex items-center justify-between rounded-xl border border-emerald-500/20 bg-emerald-500/5 px-4 py-3"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/20 text-sm font-bold text-emerald-400">
                      {idx + 1}
                    </span>
                    <span className="font-medium text-white">{niche.name}</span>
                  </div>
                  <span className="text-sm font-semibold text-emerald-400">{niche.growth}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Pro Tips */}
          <div className="glass-card rounded-2xl p-6">
            <div className="flex items-center gap-2 text-amber-400">
              <Zap size={20} />
              <h2 className="text-lg font-bold">Tips for Better Results</h2>
            </div>
            <ul className="mt-4 space-y-3 text-slate-300">
              <li className="flex items-start gap-3">
                <CheckCircle2 size={18} className="mt-0.5 text-emerald-400 flex-shrink-0" />
                <span><strong className="text-white">Be specific</strong> - "modern home office with plant" works better than just "office"</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 size={18} className="mt-0.5 text-emerald-400 flex-shrink-0" />
                <span><strong className="text-white">Pinterest loves vertical</strong> - Use 3:4 ratio for best engagement</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 size={18} className="mt-0.5 text-emerald-400 flex-shrink-0" />
                <span><strong className="text-white">Quantity matters</strong> - More images = more posts = more earnings</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 size={18} className="mt-0.5 text-emerald-400 flex-shrink-0" />
                <span><strong className="text-white">Stick to trending niches</strong> - Home, beauty, and tech perform best</span>
              </li>
            </ul>
          </div>

          {/* What Happens Next */}
          <div className="glass-card rounded-2xl p-6">
            <h2 className="text-lg font-bold text-white">What Happens Next?</h2>
            <div className="mt-4 space-y-3">
              <div className="flex items-center gap-3 text-slate-300">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-500/20 text-sm font-bold text-amber-400">1</span>
                <span>AI creates your images (30 seconds)</span>
              </div>
              <div className="flex items-center gap-3 text-slate-300">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-500/20 text-sm font-bold text-amber-400">2</span>
                <span>Add your profit link (1 click)</span>
              </div>
              <div className="flex items-center gap-3 text-slate-300">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/20 text-sm font-bold text-emerald-400">3</span>
                <span>Publish and start earning!</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Results Section */}
      {results.length > 0 && (
        <div className="glass-card rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-white">Your AI-Generated Images</h2>
              <p className="mt-1 text-slate-400">Ready to add links and publish</p>
            </div>
            <div className="flex gap-2">
              <button className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10">
                <RefreshCcw size={16} className="inline mr-2" />
                Generate More
              </button>
              <Link
                href="/launchpad"
                className="rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-4 py-2 text-sm font-bold text-black hover:from-amber-400 hover:to-amber-500"
              >
                Publish These Images
                <ArrowRight size={16} className="inline ml-2" />
              </Link>
            </div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((result) => (
              <div 
                key={result.id} 
                className="group overflow-hidden rounded-xl border border-white/10 bg-white/5 transition hover:border-amber-500/30"
              >
                <div className="relative aspect-[3/4] w-full overflow-hidden">
                  <Image 
                    src={result.imageUrl} 
                    alt={result.title} 
                    fill 
                    className="object-cover transition group-hover:scale-105" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3">
                    <Badge tone={result.hasLink ? "success" : "warning"}>
                      {result.hasLink ? "Ready to Publish" : "Needs Link"}
                    </Badge>
                  </div>
                </div>
                <div className="p-4">
                  <p className="font-semibold text-white">{result.title}</p>
                  <p className="mt-1 text-sm text-slate-400 line-clamp-2">{result.prompt}</p>
                  <div className="mt-3 flex items-center gap-2">
                    <button className="flex-1 rounded-lg bg-white/10 py-2 text-sm font-semibold text-white hover:bg-white/15">
                      <Eye size={14} className="inline mr-1" />
                      Preview
                    </button>
                    <button className="flex-1 rounded-lg bg-white/10 py-2 text-sm font-semibold text-white hover:bg-white/15">
                      <Download size={14} className="inline mr-1" />
                      Save
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </AppShell>
  );
}
