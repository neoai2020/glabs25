"use client";

import { useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { Badge } from "@/components/ui/Badge";
import { 
  Sparkles, Loader2, ArrowRight, CheckCircle2, Zap, TrendingUp,
  Home, Heart, Utensils, Shirt, Baby, Dumbbell, Laptop, Flower2, AlertCircle, Download
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// Proven money-making niches with pre-built prompts
const niches = [
  { 
    id: "home", 
    name: "Home & Living", 
    icon: Home, 
    earnings: "$89/day avg",
    hot: true,
    prompts: [
      "Cozy minimalist living room with warm lighting, plants, and modern furniture",
      "Aesthetic home office setup with natural wood desk and greenery",
      "Beautiful bedroom with soft neutral bedding and fairy lights"
    ]
  },
  { 
    id: "skincare", 
    name: "Beauty & Skincare", 
    icon: Heart, 
    earnings: "$127/day avg",
    hot: true,
    prompts: [
      "Luxurious skincare products arranged on marble bathroom counter",
      "Natural organic beauty products with flowers and greenery",
      "Morning skincare routine flat lay with golden hour lighting"
    ]
  },
  { 
    id: "kitchen", 
    name: "Kitchen & Cooking", 
    icon: Utensils, 
    earnings: "$76/day avg",
    prompts: [
      "Modern kitchen with copper cookware and fresh herbs",
      "Beautiful meal prep with colorful healthy ingredients",
      "Cozy kitchen corner with coffee station and pastries"
    ]
  },
  { 
    id: "fashion", 
    name: "Fashion & Style", 
    icon: Shirt, 
    earnings: "$94/day avg",
    prompts: [
      "Capsule wardrobe flat lay with neutral colors and accessories",
      "Stylish outfit of the day with minimalist jewelry",
      "Cozy fall fashion with sweaters and boots aesthetic"
    ]
  },
  { 
    id: "baby", 
    name: "Baby & Kids", 
    icon: Baby, 
    earnings: "$112/day avg",
    hot: true,
    prompts: [
      "Adorable nursery room with soft pastel colors and toys",
      "Baby essentials flat lay with cute accessories",
      "Kids playroom organization with colorful storage"
    ]
  },
  { 
    id: "fitness", 
    name: "Health & Fitness", 
    icon: Dumbbell, 
    earnings: "$98/day avg",
    prompts: [
      "Home gym setup with yoga mat and weights",
      "Healthy meal prep containers with protein and vegetables",
      "Morning workout essentials with water bottle and headphones"
    ]
  },
  { 
    id: "tech", 
    name: "Tech & Gadgets", 
    icon: Laptop, 
    earnings: "$83/day avg",
    prompts: [
      "Clean desk setup with laptop and productivity accessories",
      "Work from home essentials with modern gadgets",
      "Tech accessories flat lay on wooden desk"
    ]
  },
  { 
    id: "garden", 
    name: "Garden & Outdoor", 
    icon: Flower2, 
    earnings: "$71/day avg",
    prompts: [
      "Beautiful patio setup with string lights and plants",
      "Indoor plant collection in aesthetic pots",
      "Cozy outdoor reading nook with cushions and blankets"
    ]
  },
];

export default function ImageForgePage() {
  const [selectedNiche, setSelectedNiche] = useState<string | null>(null);
  const [selectedPrompt, setSelectedPrompt] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const [aiStatus, setAiStatus] = useState("");
  const [error, setError] = useState<string | null>(null);

  const niche = niches.find(n => n.id === selectedNiche);

  const generateImages = async () => {
    if (!selectedPrompt) return;
    
    setIsGenerating(true);
    setGeneratedImages([]);
    setError(null);
    
    // Show AI status updates for user confidence
    const statuses = [
      "🧠 AI is analyzing the best composition...",
      "🎨 Creating stunning visuals...",
      "✨ Adding professional finishing touches...",
      "💰 Optimizing for maximum clicks..."
    ];
    
    // Show status updates while API is working
    let statusIndex = 0;
    const statusInterval = setInterval(() => {
      setAiStatus(statuses[statusIndex % statuses.length]);
      statusIndex++;
    }, 2000);
    
    try {
      const response = await fetch("/api/generate-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          prompt: `${selectedPrompt}, professional product photography, Pinterest style, high quality, aesthetic, 4k, beautiful lighting`,
          width: 1024,
          height: 1024
        }),
      });
      
      clearInterval(statusInterval);
      const data = await response.json();
      
      console.log("Response from API:", data);
      
      if (data.success && data.image_url) {
        setGeneratedImages([data.image_url]);
        setAiStatus("");
      } else if (data.image_url) {
        setGeneratedImages([data.image_url]);
        setAiStatus("");
      } else if (data.generated_image) {
        setGeneratedImages([data.generated_image]);
        setAiStatus("");
      } else {
        // API returned but no image - show error with retry option
        console.error("No image in response:", data);
        setError("Image generation is taking longer than expected. Please try again.");
        setAiStatus("");
      }
    } catch (err) {
      clearInterval(statusInterval);
      console.error("Generation error:", err);
      setError("Something went wrong. Please try again.");
      setAiStatus("");
    }
    
    setIsGenerating(false);
  };

  return (
    <AppShell
      title="AI Profit Machine"
      subtitle="Pick a topic → AI creates money-making images → You earn"
    >
      {/* Step 1: Choose Niche */}
      <div className="glass-card rounded-3xl p-8">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500 text-lg font-bold text-black">1</div>
          <div>
            <h2 className="text-xl font-bold text-white">Choose Your Money-Making Topic</h2>
            <p className="text-slate-400">Pick a niche with proven earnings. AI handles everything else.</p>
          </div>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {niches.map((n) => {
            const Icon = n.icon;
            const isSelected = selectedNiche === n.id;
            return (
              <button
                key={n.id}
                onClick={() => {
                  setSelectedNiche(n.id);
                  setSelectedPrompt(null);
                  setGeneratedImages([]);
                  setError(null);
                }}
                className={`relative rounded-2xl border p-5 text-left transition-all ${
                  isSelected
                    ? "border-amber-500 bg-amber-500/10 ring-2 ring-amber-500/30"
                    : "border-white/10 bg-white/5 hover:border-amber-500/30 hover:bg-white/8"
                }`}
              >
                {n.hot && (
                  <Badge tone="success" size="sm">🔥 HOT</Badge>
                )}
                <div className={`mt-2 flex h-12 w-12 items-center justify-center rounded-xl ${
                  isSelected ? "bg-amber-500 text-black" : "bg-white/10 text-white"
                }`}>
                  <Icon size={24} />
                </div>
                <h3 className="mt-3 font-semibold text-white">{n.name}</h3>
                <p className="mt-1 flex items-center gap-1 text-sm text-emerald-400">
                  <TrendingUp size={14} />
                  {n.earnings}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Step 2: AI Picks the Best Image Idea */}
      {niche && (
        <div className="glass-card rounded-3xl p-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500 text-lg font-bold text-black">2</div>
            <div>
              <h2 className="text-xl font-bold text-white">AI-Recommended Image Ideas</h2>
              <p className="text-slate-400">These images are proven to get clicks. Just pick one.</p>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            {niche.prompts.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setSelectedPrompt(prompt);
                  setError(null);
                }}
                className={`w-full rounded-xl border p-5 text-left transition-all ${
                  selectedPrompt === prompt
                    ? "border-emerald-500 bg-emerald-500/10 ring-2 ring-emerald-500/30"
                    : "border-white/10 bg-white/5 hover:border-emerald-500/30"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                    selectedPrompt === prompt ? "bg-emerald-500 text-black" : "bg-white/10"
                  }`}>
                    {selectedPrompt === prompt ? <CheckCircle2 size={20} /> : <Sparkles size={20} className="text-amber-400" />}
                  </div>
                  <p className="text-lg text-white">{prompt}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 3: Generate */}
      {selectedPrompt && (
        <div className="glass-gold rounded-3xl p-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-emerald-500 text-lg font-bold text-black">3</div>
            <div>
              <h2 className="text-xl font-bold text-white">Create Your Money-Making Image</h2>
              <p className="text-slate-400">One click. AI does all the work.</p>
            </div>
          </div>

          <button
            onClick={generateImages}
            disabled={isGenerating}
            className="btn-premium mt-6 flex w-full items-center justify-center gap-3 rounded-xl py-5 text-xl font-bold text-black disabled:opacity-70"
          >
            {isGenerating ? (
              <>
                <Loader2 className="animate-spin" size={24} />
                AI is creating your image...
              </>
            ) : (
              <>
                <Zap size={24} />
                Generate Money-Making Image
              </>
            )}
          </button>

          {aiStatus && (
            <div className="mt-4 rounded-xl bg-black/30 p-4 text-center">
              <p className="text-lg text-white">{aiStatus}</p>
            </div>
          )}

          {error && (
            <div className="mt-4 rounded-xl border border-amber-500/30 bg-amber-500/10 p-4">
              <div className="flex items-center gap-3">
                <AlertCircle className="text-amber-400 shrink-0" size={20} />
                <p className="text-white">{error}</p>
              </div>
              <button
                onClick={generateImages}
                className="mt-3 w-full rounded-lg bg-amber-500 py-2 text-sm font-semibold text-black hover:bg-amber-400"
              >
                Try Again
              </button>
            </div>
          )}
        </div>
      )}

      {/* Results */}
      {generatedImages.length > 0 && (
        <div className="glass-money rounded-3xl p-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white">🎉 Your Image is Ready!</h2>
              <p className="text-slate-300">This image is optimized to get clicks and make you money</p>
            </div>
            <Badge tone="success" size="md">
              <CheckCircle2 size={16} className="mr-1" />
              Ready to Publish
            </Badge>
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            <div className="overflow-hidden rounded-2xl border border-emerald-500/30">
              <div className="relative aspect-square">
                <Image
                  src={generatedImages[0]}
                  alt="Generated image"
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
              <div className="bg-black/40 p-4">
                <a
                  href={generatedImages[0]}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                  className="flex items-center justify-center gap-2 rounded-lg bg-white/10 py-2 text-sm font-medium text-white hover:bg-white/20"
                >
                  <Download size={16} />
                  Download Image
                </a>
              </div>
            </div>

            <div className="flex flex-col justify-center">
              <h3 className="text-xl font-semibold text-white">What Happens Next?</h3>
              <div className="mt-4 space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 text-emerald-400 shrink-0" size={20} />
                  <div>
                    <p className="font-medium text-white">Your image is ready</p>
                    <p className="text-sm text-slate-400">Download it or go to Cash Out to publish</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 text-emerald-400 shrink-0" size={20} />
                  <div>
                    <p className="font-medium text-white">Add your money link</p>
                    <p className="text-sm text-slate-400">Every click = potential earnings</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 text-emerald-400 shrink-0" size={20} />
                  <div>
                    <p className="font-medium text-white">Post to Pinterest & more</p>
                    <p className="text-sm text-slate-400">We show you exactly how</p>
                  </div>
                </div>
              </div>

              <Link
                href="/launchpad"
                className="btn-premium mt-8 flex items-center justify-center gap-2 rounded-xl py-4 text-lg font-bold text-black"
              >
                Go to Cash Out
                <ArrowRight size={20} />
              </Link>

              <button
                onClick={() => {
                  setSelectedPrompt(null);
                  setGeneratedImages([]);
                  setError(null);
                }}
                className="mt-3 rounded-xl border border-white/10 py-3 text-white hover:bg-white/5"
              >
                Create Another Image
              </button>
            </div>
          </div>
        </div>
      )}
    </AppShell>
  );
}
