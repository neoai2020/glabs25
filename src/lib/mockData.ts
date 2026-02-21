import { type AffiliateLink, type Asset, type PublishItem, type SocialEvent } from "./types";

export const stats = {
  imagesGenerated: 847,
  linksAttached: 623,
  postsPublished: 412,
  streakDays: 14,
  estimatedEarnings: 2847,
  clicksToday: 1243,
  conversionRate: 4.2,
};

export const checklist = [
  { label: "Create your first AI images (takes 30 seconds)", done: true, href: "/image-forge" },
  { label: "Connect your profit link (we'll handle the rest)", done: false, href: "/monetization/link-vault" },
  { label: "Hit publish and start earning", done: false, href: "/launchpad" },
];

export const assets: Asset[] = [
  {
    id: "asset-1",
    title: "Luxury Home Office Setup",
    prompt: "premium minimalist home office with gold accents, natural light, high-end desk setup, lifestyle photography",
    style: "Premium",
    aspectRatio: "3:4",
    tags: ["home office", "luxury", "productivity"],
    createdAt: "2026-01-18T20:10:00Z",
    status: "generated",
    hasLink: true,
    linkId: "link-1",
    imageUrl: "https://images.unsplash.com/photo-1508387024700-9fe5c0b36f47?auto=format&fit=crop&w=800&q=80",
    caption: "Transform your workspace into a productivity paradise ✨",
  },
  {
    id: "asset-2",
    title: "Skincare Flat Lay",
    prompt: "aesthetic skincare products arranged on marble surface, soft lighting, beauty flat lay",
    style: "Aesthetic",
    aspectRatio: "1:1",
    tags: ["beauty", "skincare", "self-care"],
    createdAt: "2026-01-18T15:20:00Z",
    status: "generated",
    hasLink: false,
    imageUrl: "https://images.unsplash.com/photo-1506617420156-8e4536971650?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "asset-3",
    title: "Smart Kitchen Gadget",
    prompt: "modern smart kitchen appliance, clean white background, product photography style",
    style: "Product",
    aspectRatio: "16:9",
    tags: ["kitchen", "smart home", "tech"],
    createdAt: "2026-01-17T12:05:00Z",
    status: "imported",
    hasLink: true,
    linkId: "link-3",
    imageUrl: "https://images.unsplash.com/photo-1506801310323-534be5e7edd5?auto=format&fit=crop&w=1000&q=80",
  },
];

export const links: AffiliateLink[] = [
  {
    id: "link-1",
    title: "Home Office Essentials",
    network: "Amazon",
    url: "https://amazon.com/desk-mat-pro",
    isDefault: true,
    lastUsed: "2 hours ago",
    notes: "Best for workspace and productivity pins. High conversion rate.",
    earnings: "$1,247",
  },
  {
    id: "link-2",
    title: "Printable Planner Bundle",
    network: "Etsy",
    url: "https://etsy.com/planner",
    lastUsed: "5 hours ago",
    notes: "Great for organization content. $8.50 per sale.",
    earnings: "$892",
  },
  {
    id: "link-3",
    title: "Stock Photo Portfolio",
    network: "Stock",
    url: "https://stock-provider.com/u/glabs95",
    lastUsed: "Today",
    earnings: "$456",
  },
];

export const publishes: PublishItem[] = [
  {
    id: "pub-1",
    destination: "pinterest",
    status: "scheduled",
    scheduledFor: "2026-01-19T23:00:00Z",
    createdAt: "2026-01-19T17:15:00Z",
    linkId: "link-1",
    assetIds: ["asset-1"],
  },
  {
    id: "pub-2",
    destination: "instagram",
    status: "prepared",
    createdAt: "2026-01-19T16:05:00Z",
    assetIds: ["asset-2", "asset-3"],
  },
  {
    id: "pub-3",
    destination: "stock",
    status: "sent",
    createdAt: "2026-01-18T08:15:00Z",
    linkId: "link-3",
    assetIds: ["asset-3"],
  },
  {
    id: "pub-4",
    destination: "pinterest",
    status: "failed",
    createdAt: "2026-01-18T07:15:00Z",
    assetIds: ["asset-2"],
    error: "Connection timeout - click to retry",
  },
];

export const socialFeed: SocialEvent[] = [
  {
    id: "soc-1",
    headline: "Sarah M. just earned $127",
    detail: "From her home office pin • Posted 2 days ago",
    ago: "Just now",
    pill: "+$127",
  },
  {
    id: "soc-2",
    headline: "New member reached $1,000",
    detail: "Mike T. hit his first milestone • Started 3 weeks ago",
    ago: "5 min ago",
    pill: "Milestone!",
  },
  {
    id: "soc-3",
    headline: "234 images published this hour",
    detail: "Community is active • Your turn to earn",
    ago: "Live",
    pill: "Active",
  },
  {
    id: "soc-4",
    headline: "Lisa K. earned $340 today",
    detail: "Skincare niche • 8 pins published",
    ago: "12 min ago",
    pill: "+$340",
  },
  {
    id: "soc-5",
    headline: "Top earner this week: $4,280",
    detail: "James R. • Home decor niche",
    ago: "Updated",
    pill: "Leader",
  },
];

export const docTips = [
  "Pinterest loves vertical images (3:4 ratio) - our AI creates them perfectly",
  "Add 3-5 hashtags to increase your reach by up to 40%",
  "Best posting times: 8-11 PM in your timezone",
  "Consistency is key: post daily to build momentum",
];

export const testimonials = [
  {
    name: "Sarah M.",
    avatar: "SM",
    earnings: "$4,230",
    period: "This Month",
    quote: "I was skeptical at first, but the AI does all the heavy lifting. I just click publish.",
    niche: "Home Decor",
  },
  {
    name: "Mike T.",
    avatar: "MT", 
    earnings: "$2,150",
    period: "Last Week",
    quote: "Finally something that actually works. Started seeing results in my first week.",
    niche: "Tech Gadgets",
  },
  {
    name: "Jennifer L.",
    avatar: "JL",
    earnings: "$8,400",
    period: "This Month",
    quote: "The training video changed everything. Now I earn while I sleep.",
    niche: "Beauty & Skincare",
  },
];

export const earningsData = {
  today: 847,
  yesterday: 1234,
  thisWeek: 4892,
  thisMonth: 18456,
  allTime: 127840,
};

export const topNiches = [
  { name: "Home Office", avgEarnings: "$2,400/mo", growth: "+23%" },
  { name: "Skincare", avgEarnings: "$3,100/mo", growth: "+45%" },
  { name: "Smart Home", avgEarnings: "$1,800/mo", growth: "+18%" },
  { name: "Kitchen Gadgets", avgEarnings: "$2,100/mo", growth: "+31%" },
  { name: "Fitness", avgEarnings: "$1,950/mo", growth: "+27%" },
];
