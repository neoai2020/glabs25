import { type AffiliateLink, type Asset, type PublishItem } from "./types";

export const stats = {
  imagesGenerated: 847,
  linksAttached: 623,
  postsPublished: 412,
  streakDays: 14,
};

export const checklist = [
  { label: "Create your first AI images", done: true, href: "/image-forge" },
  { label: "Save an affiliate link", done: false, href: "/monetization/link-vault" },
  { label: "Publish your first image", done: false, href: "/launchpad" },
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
    imageUrl: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80",
    caption: "Transform your workspace into a productivity paradise",
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
    imageUrl: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80",
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
    imageUrl: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=1000&q=80",
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
    notes: "Best for workspace and productivity pins.",
  },
  {
    id: "link-2",
    title: "Printable Planner Bundle",
    network: "Etsy",
    url: "https://etsy.com/planner",
    lastUsed: "5 hours ago",
    notes: "Great for organization content.",
  },
  {
    id: "link-3",
    title: "Stock Photo Portfolio",
    network: "Stock",
    url: "https://stock-provider.com/u/glabs95",
    lastUsed: "Today",
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

export const docTips = [
  "Pinterest loves vertical images (3:4 ratio) - our AI creates them perfectly",
  "Add 3-5 hashtags to increase your reach by up to 40%",
  "Best posting times: 8-11 PM in your timezone",
  "Consistency is key: post daily to build momentum",
];
