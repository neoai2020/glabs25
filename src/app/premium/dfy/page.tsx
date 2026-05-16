"use client";

import { useState, useEffect, useCallback } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { Badge } from "@/components/ui/Badge";
import {
  Sparkles, Loader2, Download, ChevronDown, ChevronUp,
  TrendingUp, Users, ImageIcon, DollarSign, Zap,
  Home, Heart, Utensils, Shirt, Baby, Dumbbell,
  Laptop, Flower2, PawPrint, Briefcase, CheckCircle2,
} from "lucide-react";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";

type StoredImage = {
  id: string;
  url: string;
  title: string;
  niche: string;
  createdAt: string;
};

const IMAGES_STORAGE_PREFIX = "glabs_generated_images_";

function loadStoredImages(userId: string | undefined): StoredImage[] {
  if (typeof window === "undefined") return [];
  try {
    const key = IMAGES_STORAGE_PREFIX + (userId ?? "anonymous");
    const stored = localStorage.getItem(key);
    if (stored) return JSON.parse(stored);
  } catch {}
  return [];
}

function saveStoredImages(userId: string | undefined, images: StoredImage[]) {
  if (typeof window === "undefined") return;
  try {
    const key = IMAGES_STORAGE_PREFIX + (userId ?? "anonymous");
    localStorage.setItem(key, JSON.stringify(images));
  } catch {}
}

type Prompt = {
  id: number;
  niche: string;
  prompt: string;
  earnings: string;
};

const NICHES = [
  { id: "home", name: "Home & Living", icon: Home },
  { id: "beauty", name: "Beauty & Skincare", icon: Heart },
  { id: "kitchen", name: "Kitchen & Cooking", icon: Utensils },
  { id: "fashion", name: "Fashion & Style", icon: Shirt },
  { id: "baby", name: "Baby & Kids", icon: Baby },
  { id: "fitness", name: "Health & Fitness", icon: Dumbbell },
  { id: "tech", name: "Tech & Gadgets", icon: Laptop },
  { id: "garden", name: "Garden & Outdoor", icon: Flower2 },
  { id: "pet", name: "Pet Products", icon: PawPrint },
  { id: "office", name: "Office & Productivity", icon: Briefcase },
] as const;

const PROMPTS: Prompt[] = [
  // Home & Living
  { id: 1, niche: "home", prompt: "Cozy minimalist living room with warm ambient lighting, soft throw blankets, and modern furniture", earnings: "$80-$140/day" },
  { id: 2, niche: "home", prompt: "Aesthetic home office with natural wood desk, green plants, and golden hour sunlight", earnings: "$70-$120/day" },
  { id: 3, niche: "home", prompt: "Scandinavian bedroom with white linen bedding, candles, and dried eucalyptus on nightstand", earnings: "$60-$110/day" },
  { id: 4, niche: "home", prompt: "Modern farmhouse kitchen shelf with ceramic vases, cookbooks, and copper accents", earnings: "$65-$115/day" },
  { id: 5, niche: "home", prompt: "Boho living room corner with rattan chair, macrame wall hanging, and floor cushions", earnings: "$75-$130/day" },
  { id: 6, niche: "home", prompt: "Minimalist entryway with wooden bench, woven basket, and large round mirror", earnings: "$60-$100/day" },
  { id: 7, niche: "home", prompt: "Cozy reading nook by a window with fairy lights, plush pillows, and stacked books", earnings: "$85-$140/day" },
  { id: 8, niche: "home", prompt: "Luxury bathroom with marble countertop, gold fixtures, and fresh white towels", earnings: "$70-$125/day" },
  { id: 9, niche: "home", prompt: "Mid-century modern dining room with walnut table, linen napkins, and candlesticks", earnings: "$65-$110/day" },
  { id: 10, niche: "home", prompt: "Japandi-style living space with low furniture, neutral tones, and bonsai tree", earnings: "$75-$120/day" },

  // Beauty & Skincare
  { id: 11, niche: "beauty", prompt: "Luxurious skincare flat lay on marble surface with gold-capped serums and fresh roses", earnings: "$90-$160/day" },
  { id: 12, niche: "beauty", prompt: "Morning skincare routine products arranged in glass tray with soft natural lighting", earnings: "$85-$150/day" },
  { id: 13, niche: "beauty", prompt: "Organic beauty products with lavender sprigs, honey jar, and linen cloth backdrop", earnings: "$80-$140/day" },
  { id: 14, niche: "beauty", prompt: "Aesthetic vanity setup with Hollywood mirror, perfume bottles, and makeup brushes", earnings: "$70-$130/day" },
  { id: 15, niche: "beauty", prompt: "Clean beauty essentials in minimalist packaging on white terrazzo surface", earnings: "$75-$125/day" },
  { id: 16, niche: "beauty", prompt: "Korean skincare collection with sheet masks, essences, and cherry blossom petals", earnings: "$95-$160/day" },
  { id: 17, niche: "beauty", prompt: "Bath time self-care setup with bath bombs, candles, eucalyptus, and wooden tray", earnings: "$80-$135/day" },
  { id: 18, niche: "beauty", prompt: "Lip care collection flat lay with glosses, balms, and dried flowers on pink silk", earnings: "$70-$120/day" },
  { id: 19, niche: "beauty", prompt: "Natural hair care products with coconut oil, shea butter, and tropical leaves", earnings: "$85-$145/day" },
  { id: 20, niche: "beauty", prompt: "Sunscreen and summer skincare products on sandy beach background with shells", earnings: "$75-$130/day" },

  // Kitchen & Cooking
  { id: 21, niche: "kitchen", prompt: "Beautiful meal prep containers with colorful grains, vegetables, and protein", earnings: "$65-$120/day" },
  { id: 22, niche: "kitchen", prompt: "Rustic sourdough bread on wooden board with butter, honey, and fresh herbs", earnings: "$70-$115/day" },
  { id: 23, niche: "kitchen", prompt: "Aesthetic coffee station with espresso machine, ceramic mugs, and pastries", earnings: "$80-$130/day" },
  { id: 24, niche: "kitchen", prompt: "Colorful smoothie bowls with granola, berries, and edible flowers from above", earnings: "$75-$125/day" },
  { id: 25, niche: "kitchen", prompt: "Modern kitchen countertop with copper cookware, fresh herbs in pots, and olive oil", earnings: "$60-$110/day" },
  { id: 26, niche: "kitchen", prompt: "Charcuterie board with artisan cheeses, fruits, honey, and crackers on marble", earnings: "$85-$140/day" },
  { id: 27, niche: "kitchen", prompt: "Matcha latte being poured into ceramic cup with bamboo whisk on wooden counter", earnings: "$70-$120/day" },
  { id: 28, niche: "kitchen", prompt: "Organized pantry with glass jars of pasta, grains, and spices with hand-written labels", earnings: "$65-$115/day" },
  { id: 29, niche: "kitchen", prompt: "Fresh pasta making scene with flour, eggs, rolling pin, and herbs on wooden table", earnings: "$75-$125/day" },
  { id: 30, niche: "kitchen", prompt: "Sunday brunch table with waffles, fresh orange juice, flowers, and linen napkins", earnings: "$80-$135/day" },

  // Fashion & Style
  { id: 31, niche: "fashion", prompt: "Capsule wardrobe flat lay with neutral tones, minimal jewelry, and leather accessories", earnings: "$85-$150/day" },
  { id: 32, niche: "fashion", prompt: "Cozy fall outfit details: chunky knit sweater, ankle boots, and leather bag on bed", earnings: "$75-$130/day" },
  { id: 33, niche: "fashion", prompt: "Minimalist jewelry collection on linen cloth with gold rings, chains, and earrings", earnings: "$90-$155/day" },
  { id: 34, niche: "fashion", prompt: "Summer dress and sandals flat lay with straw hat, sunglasses, and wildflowers", earnings: "$70-$120/day" },
  { id: 35, niche: "fashion", prompt: "Designer handbag collection displayed on glass shelf with soft backlighting", earnings: "$80-$140/day" },
  { id: 36, niche: "fashion", prompt: "Athleisure outfit flat lay with sneakers, yoga pants, and wireless earbuds", earnings: "$65-$115/day" },
  { id: 37, niche: "fashion", prompt: "Vintage-inspired outfit with high-waisted jeans, silk blouse, and retro sunglasses", earnings: "$75-$125/day" },
  { id: 38, niche: "fashion", prompt: "Watch collection displayed on leather valet tray with cufflinks and pocket square", earnings: "$85-$145/day" },
  { id: 39, niche: "fashion", prompt: "Silk pajama set folded neatly with eye mask, candle, and book on bed", earnings: "$70-$120/day" },
  { id: 40, niche: "fashion", prompt: "Workwear essentials flat lay with blazer, heels, planner, and coffee cup", earnings: "$80-$135/day" },

  // Baby & Kids
  { id: 41, niche: "baby", prompt: "Pastel nursery room with wooden crib, plush animals, and star-shaped night light", earnings: "$90-$160/day" },
  { id: 42, niche: "baby", prompt: "Baby essentials flat lay with organic onesies, wooden toys, and muslin blanket", earnings: "$85-$150/day" },
  { id: 43, niche: "baby", prompt: "Colorful kids playroom with Montessori shelves, activity table, and soft rug", earnings: "$80-$140/day" },
  { id: 44, niche: "baby", prompt: "Gender-neutral baby shower gift set with knitted booties, rattle, and books", earnings: "$75-$130/day" },
  { id: 45, niche: "baby", prompt: "Toddler snack station with silicone plates, fruit, and small water bottle", earnings: "$70-$120/day" },
  { id: 46, niche: "baby", prompt: "Kids bedroom with bunk bed, fairy lights, reading corner, and colorful artwork", earnings: "$85-$145/day" },
  { id: 47, niche: "baby", prompt: "Baby bath time setup with hooded towel, rubber duck, and gentle soap bottles", earnings: "$65-$115/day" },
  { id: 48, niche: "baby", prompt: "Organized diaper bag contents flat lay with wipes, bottles, and change of clothes", earnings: "$70-$125/day" },
  { id: 49, niche: "baby", prompt: "Sensory play setup for toddlers with colored rice, scoops, and wooden bowls", earnings: "$80-$135/day" },
  { id: 50, niche: "baby", prompt: "First birthday party decoration setup with balloon arch, cake, and pastel banner", earnings: "$95-$160/day" },

  // Health & Fitness
  { id: 51, niche: "fitness", prompt: "Home gym setup with yoga mat, dumbbells, resistance bands, and water bottle", earnings: "$75-$130/day" },
  { id: 52, niche: "fitness", prompt: "Healthy meal prep spread with lean protein, grains, and rainbow vegetables", earnings: "$70-$125/day" },
  { id: 53, niche: "fitness", prompt: "Morning wellness routine flat lay with journal, supplements, lemon water, and yoga mat", earnings: "$80-$140/day" },
  { id: 54, niche: "fitness", prompt: "Protein smoothie ingredients arranged on counter: banana, berries, protein powder, oats", earnings: "$65-$110/day" },
  { id: 55, niche: "fitness", prompt: "Running essentials flat lay with shoes, smartwatch, earbuds, and energy gel", earnings: "$70-$120/day" },
  { id: 56, niche: "fitness", prompt: "Meditation corner with cushion, incense, crystals, and small indoor fountain", earnings: "$85-$145/day" },
  { id: 57, niche: "fitness", prompt: "Post-workout recovery setup with foam roller, massage gun, and ice pack on mat", earnings: "$60-$110/day" },
  { id: 58, niche: "fitness", prompt: "Healthy snack box with nuts, dark chocolate, dried fruit, and protein bars", earnings: "$65-$115/day" },
  { id: 59, niche: "fitness", prompt: "Yoga studio at sunrise with mat, blocks, strap, and incense in warm light", earnings: "$80-$135/day" },
  { id: 60, niche: "fitness", prompt: "Sleep hygiene essentials: silk pillowcase, magnesium, lavender spray, and eye mask", earnings: "$75-$130/day" },

  // Tech & Gadgets
  { id: 61, niche: "tech", prompt: "Clean minimal desk setup with ultrawide monitor, mechanical keyboard, and desk lamp", earnings: "$80-$140/day" },
  { id: 62, niche: "tech", prompt: "Work from home essentials: laptop stand, external monitor, wireless mouse, and headset", earnings: "$70-$125/day" },
  { id: 63, niche: "tech", prompt: "Content creator setup with ring light, camera, microphone, and tripod on desk", earnings: "$85-$150/day" },
  { id: 64, niche: "tech", prompt: "Charging station with wireless pad, phone stand, earbuds case, and smartwatch", earnings: "$65-$115/day" },
  { id: 65, niche: "tech", prompt: "Gaming setup with RGB keyboard, curved monitor, headset, and ambient lighting", earnings: "$90-$155/day" },
  { id: 66, niche: "tech", prompt: "Tablet with stylus on wooden desk next to coffee, notebook, and reading glasses", earnings: "$60-$110/day" },
  { id: 67, niche: "tech", prompt: "Smart home devices arranged on shelf: speaker, display, thermostat, and camera", earnings: "$75-$130/day" },
  { id: 68, niche: "tech", prompt: "Travel tech kit flat lay with portable charger, adapters, cable organizer, and earbuds", earnings: "$70-$120/day" },
  { id: 69, niche: "tech", prompt: "Podcast recording setup with professional microphone, pop filter, and acoustic panels", earnings: "$80-$140/day" },
  { id: 70, niche: "tech", prompt: "E-reader on cozy blanket with reading glasses, tea mug, and bookmark", earnings: "$60-$105/day" },

  // Garden & Outdoor
  { id: 71, niche: "garden", prompt: "Beautiful patio setup with string lights, outdoor sofa, throw pillows, and lanterns", earnings: "$75-$130/day" },
  { id: 72, niche: "garden", prompt: "Indoor plant collection in aesthetic ceramic and terracotta pots on wooden shelf", earnings: "$70-$120/day" },
  { id: 73, niche: "garden", prompt: "Herb garden on kitchen windowsill with basil, rosemary, mint in labeled pots", earnings: "$65-$110/day" },
  { id: 74, niche: "garden", prompt: "Cozy outdoor reading nook with hammock, blanket, and lantern in garden setting", earnings: "$80-$135/day" },
  { id: 75, niche: "garden", prompt: "Raised garden bed with vegetables, herbs, and marigolds in backyard sunlight", earnings: "$60-$105/day" },
  { id: 76, niche: "garden", prompt: "Balcony garden transformation with vertical planters, bistro set, and fairy lights", earnings: "$85-$140/day" },
  { id: 77, niche: "garden", prompt: "Garden tool organization in potting shed with terra cotta pots and seed packets", earnings: "$55-$100/day" },
  { id: 78, niche: "garden", prompt: "Succulent arrangement in geometric terrarium with decorative rocks and moss", earnings: "$70-$115/day" },
  { id: 79, niche: "garden", prompt: "Fire pit seating area with Adirondack chairs, blankets, and s'mores supplies", earnings: "$80-$140/day" },
  { id: 80, niche: "garden", prompt: "Propagation station on shelf with glass vases, cuttings, and grow lights", earnings: "$65-$110/day" },

  // Pet Products
  { id: 81, niche: "pet", prompt: "Aesthetic dog bed area with cozy blanket, toy basket, and personalized food bowls", earnings: "$85-$145/day" },
  { id: 82, niche: "pet", prompt: "Cat tree and play area with scratching post, hanging toys, and cushioned perch", earnings: "$80-$135/day" },
  { id: 83, niche: "pet", prompt: "Pet grooming essentials flat lay with brushes, shampoo, towel, and nail clippers", earnings: "$65-$115/day" },
  { id: 84, niche: "pet", prompt: "Dog walking essentials: leather leash, treat pouch, waste bags, and water bottle", earnings: "$70-$120/day" },
  { id: 85, niche: "pet", prompt: "Premium pet food setup with ceramic bowls, fresh ingredients, and supplements", earnings: "$75-$130/day" },
  { id: 86, niche: "pet", prompt: "Puppy welcome home kit with crate, toys, blanket, and training pads", earnings: "$90-$155/day" },
  { id: 87, niche: "pet", prompt: "Cat window perch setup with bird feeder view, cushion, and hanging plant", earnings: "$60-$110/day" },
  { id: 88, niche: "pet", prompt: "Pet travel kit flat lay with carrier, collapsible bowl, treats, and comfort toy", earnings: "$70-$125/day" },
  { id: 89, niche: "pet", prompt: "Matching pet and owner accessories: bandana, collar, and human bracelet set", earnings: "$80-$140/day" },
  { id: 90, niche: "pet", prompt: "Fish aquarium setup with LED light, live plants, rocks, and colorful fish", earnings: "$65-$115/day" },

  // Office & Productivity
  { id: 91, niche: "office", prompt: "Clean desk setup with planner, laptop, coffee, and minimalist desk accessories", earnings: "$75-$130/day" },
  { id: 92, niche: "office", prompt: "Bullet journal spread with washi tape, colored pens, and stickers flat lay", earnings: "$80-$140/day" },
  { id: 93, niche: "office", prompt: "Standing desk setup with monitor arm, keyboard tray, and anti-fatigue mat", earnings: "$70-$120/day" },
  { id: 94, niche: "office", prompt: "Goal planning workspace with vision board, sticky notes, and whiteboard calendar", earnings: "$65-$115/day" },
  { id: 95, niche: "office", prompt: "Aesthetic stationery collection with notebooks, pens, clips, and desk organizer", earnings: "$85-$145/day" },
  { id: 96, niche: "office", prompt: "Home office shelf styling with books, plants, clock, and decorative objects", earnings: "$60-$110/day" },
  { id: 97, niche: "office", prompt: "Morning productivity setup with planner open, green tea, and laptop on bed desk", earnings: "$70-$120/day" },
  { id: 98, niche: "office", prompt: "Cable management and desk organization with wooden accessories and monitor light", earnings: "$75-$125/day" },
  { id: 99, niche: "office", prompt: "Student study desk with textbooks, highlighters, laptop, and motivational print", earnings: "$65-$110/day" },
  { id: 100, niche: "office", prompt: "Digital planner on tablet with stylus, coffee, and notebook on wooden desk", earnings: "$80-$135/day" },
];

const EARNINGS_FEED = [
  "Sarah M. earned $147 from Home & Living images",
  "James K. earned $203 from Beauty & Skincare images",
  "Lisa R. earned $89 from Kitchen & Cooking images",
  "Mike D. earned $176 from Fashion & Style images",
  "Emily W. earned $234 from Baby & Kids images",
  "Chris P. earned $112 from Health & Fitness images",
  "Anna T. earned $165 from Tech & Gadgets images",
  "David L. earned $98 from Garden & Outdoor images",
  "Rachel S. earned $188 from Pet Products images",
  "Tom B. earned $143 from Office & Productivity images",
];

export default function DFYImagesPage() {
  const { user } = useAuth();
  const [activeNiche, setActiveNiche] = useState<string>("all");
  const [howItWorksOpen, setHowItWorksOpen] = useState(false);
  const [loadingIds, setLoadingIds] = useState<Set<number>>(new Set());
  const [generatedImages, setGeneratedImages] = useState<Record<number, string>>({});
  const [tickerIndex, setTickerIndex] = useState(0);
  const [allSavedImages, setAllSavedImages] = useState<StoredImage[]>([]);

  useEffect(() => {
    setAllSavedImages(loadStoredImages(user?.id));
  }, [user?.id]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTickerIndex((prev) => (prev + 1) % EARNINGS_FEED.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const filteredPrompts =
    activeNiche === "all"
      ? PROMPTS
      : PROMPTS.filter((p) => p.niche === activeNiche);

  const handleGenerate = useCallback(async (promptItem: Prompt) => {
    setLoadingIds((prev) => new Set(prev).add(promptItem.id));

    try {
      const res = await fetch("/api/generate-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: `${promptItem.prompt}, professional product photography, Pinterest style, high quality, aesthetic, 4k, beautiful lighting`,
          width: 1024,
          height: 1024,
        }),
      });

      const data = await res.json();
      const url = data.image_url || data.generated_image || null;

      if (url) {
        setGeneratedImages((prev) => ({ ...prev, [promptItem.id]: url }));
        const nicheInfo = NICHES.find((n) => n.id === promptItem.niche);
        const newImage: StoredImage = {
          id: `dfy-${promptItem.id}-${Date.now()}`,
          url,
          title: promptItem.prompt,
          niche: nicheInfo?.name ?? "General",
          createdAt: new Date().toISOString(),
        };
        setAllSavedImages((prev) => {
          const updated = [newImage, ...prev];
          saveStoredImages(user?.id, updated);
          return updated;
        });
      }
    } catch {
      // silently fail — user can retry
    } finally {
      setLoadingIds((prev) => {
        const next = new Set(prev);
        next.delete(promptItem.id);
        return next;
      });
    }
  }, [user?.id]);

  return (
    <AppShell
      title="DFY Image Vault"
      subtitle="100 ready-to-go image prompts. Just click Generate."
    >
      {/* ── Stats Bar ── */}
      <div className="glass-gold rounded-2xl p-5">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div className="text-center">
            <p className="text-3xl font-extrabold text-amber-400 money-glow">100</p>
            <p className="mt-1 text-sm text-slate-400">Total Prompts</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-extrabold text-amber-400 money-glow">10</p>
            <p className="mt-1 text-sm text-slate-400">Niches</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-extrabold text-emerald-400 money-glow">$92</p>
            <p className="mt-1 text-sm text-slate-400">Avg Earnings/Day</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-extrabold text-emerald-400 money-glow">2.4M+</p>
            <p className="mt-1 text-sm text-slate-400">Images Generated</p>
          </div>
        </div>
      </div>

      {/* ── Social Proof ── */}
      <div className="glass-card rounded-2xl p-4">
        <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
          <div className="flex items-center gap-2">
            <Users size={18} className="text-amber-400" />
            <p className="text-sm text-slate-300">
              <span className="font-semibold text-white">12,483 members</span> have generated{" "}
              <span className="font-semibold text-emerald-400">2.4M+ images</span>
            </p>
          </div>
          <div className="flex items-center gap-2 overflow-hidden">
            <Badge tone="success" pulse>LIVE</Badge>
            <p
              key={tickerIndex}
              className="animate-pulse text-sm font-medium text-emerald-400"
            >
              {EARNINGS_FEED[tickerIndex]}
            </p>
          </div>
        </div>
      </div>

      {/* ── How It Works (collapsible) ── */}
      <div className="glass-card rounded-2xl">
        <button
          onClick={() => setHowItWorksOpen(!howItWorksOpen)}
          className="flex w-full items-center justify-between p-5 text-left"
        >
          <div className="flex items-center gap-3">
            <Sparkles size={20} className="text-amber-400" />
            <span className="text-lg font-bold text-white">How It Works</span>
            <Badge tone="gold" size="sm">3 easy steps</Badge>
          </div>
          {howItWorksOpen ? (
            <ChevronUp size={20} className="text-slate-400" />
          ) : (
            <ChevronDown size={20} className="text-slate-400" />
          )}
        </button>

        {howItWorksOpen && (
          <div className="border-t border-white/5 px-5 pb-6 pt-4">
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-xl bg-white/5 p-5 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-amber-500 text-xl font-bold text-black">
                  1
                </div>
                <h3 className="mt-3 text-lg font-bold text-white">Pick a Niche</h3>
                <p className="mt-1 text-sm text-slate-400">
                  Choose from 10 proven money-making categories
                </p>
              </div>
              <div className="rounded-xl bg-white/5 p-5 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500 text-xl font-bold text-black">
                  2
                </div>
                <h3 className="mt-3 text-lg font-bold text-white">Click Generate</h3>
                <p className="mt-1 text-sm text-slate-400">
                  AI creates a stunning, click-worthy image for you
                </p>
              </div>
              <div className="rounded-xl bg-white/5 p-5 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-amber-500 to-emerald-500 text-xl font-bold text-black">
                  3
                </div>
                <h3 className="mt-3 text-lg font-bold text-white">Download & Earn</h3>
                <p className="mt-1 text-sm text-slate-400">
                  Download your image, post it, and start earning
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ── Niche Filter Pills ── */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setActiveNiche("all")}
          className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-all ${
            activeNiche === "all"
              ? "bg-amber-500 text-black shadow-lg shadow-amber-500/25"
              : "bg-white/5 text-slate-300 hover:bg-white/10"
          }`}
        >
          All Prompts
        </button>
        {NICHES.map((n) => {
          const Icon = n.icon;
          const isActive = activeNiche === n.id;
          return (
            <button
              key={n.id}
              onClick={() => setActiveNiche(n.id)}
              className={`flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition-all ${
                isActive
                  ? "bg-amber-500 text-black shadow-lg shadow-amber-500/25"
                  : "bg-white/5 text-slate-300 hover:bg-white/10"
              }`}
            >
              <Icon size={15} />
              {n.name}
            </button>
          );
        })}
      </div>

      {/* ── Prompts Grid ── */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredPrompts.map((item) => {
          const isLoading = loadingIds.has(item.id);
          const imageUrl = generatedImages[item.id];
          const nicheInfo = NICHES.find((n) => n.id === item.niche);
          const NicheIcon = nicheInfo?.icon ?? ImageIcon;

          return (
            <div
              key={item.id}
              className="glass-card group rounded-2xl overflow-hidden transition-all hover:border-amber-500/30"
            >
              {/* Generated image area */}
              {imageUrl ? (
                <div className="relative aspect-square bg-black/20">
                  <Image
                    src={imageUrl}
                    alt={item.prompt}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                  <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100">
                    <div className="w-full p-3">
                      <Badge tone="success" size="sm">
                        <CheckCircle2 size={12} /> Ready
                      </Badge>
                    </div>
                  </div>
                </div>
              ) : isLoading ? (
                <div className="flex aspect-square items-center justify-center bg-black/20">
                  <div className="text-center">
                    <Loader2 size={36} className="mx-auto animate-spin text-amber-400" />
                    <p className="mt-3 text-sm font-medium text-slate-300">
                      AI is creating your image...
                    </p>
                  </div>
                </div>
              ) : null}

              {/* Card body */}
              <div className="p-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <NicheIcon size={14} className="text-amber-400" />
                    <span className="text-xs font-medium text-slate-500">
                      {nicheInfo?.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-emerald-400">
                    <DollarSign size={13} />
                    <span className="text-xs font-bold">{item.earnings}</span>
                  </div>
                </div>

                <p className="mt-2 text-sm leading-relaxed text-white">
                  {item.prompt}
                </p>

                <div className="mt-4">
                  {imageUrl ? (
                    <a
                      href={imageUrl}
                      download
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500/20 py-3 text-sm font-bold text-emerald-400 transition-colors hover:bg-emerald-500/30"
                    >
                      <Download size={16} />
                      Download Image
                    </a>
                  ) : (
                    <button
                      onClick={() => handleGenerate(item)}
                      disabled={isLoading}
                      className="btn-premium flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold text-black disabled:opacity-60"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 size={16} className="animate-spin" />
                          Generating...
                        </>
                      ) : (
                        <>
                          <Zap size={16} />
                          Generate Image
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Bottom CTA ── */}
      <div className="glass-money rounded-2xl p-8 text-center">
        <TrendingUp size={32} className="mx-auto text-emerald-400" />
        <h2 className="mt-3 text-2xl font-bold text-white">
          You have 100 prompts ready to go
        </h2>
        <p className="mt-2 text-slate-400">
          Every image you generate is another chance to earn. Members average $92/day.
        </p>
      </div>
    </AppShell>
  );
}
