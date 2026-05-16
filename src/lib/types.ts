export type AssetStatus = "generated" | "imported";

export type Asset = {
  id: string;
  title: string;
  prompt: string;
  style: string;
  aspectRatio?: string;
  tags: string[];
  createdAt: string;
  status: AssetStatus;
  hasLink: boolean;
  linkId?: string;
  imageUrl: string;
  caption?: string;
  quality?: string;
};

export type AffiliateLink = {
  id: string;
  title: string;
  network: "Pinterest" | "Instagram" | "Amazon" | "Etsy" | "Stock";
  url: string;
  isDefault?: boolean;
  lastUsed: string;
  notes?: string;
  earnings?: string;
};

export type PublishItem = {
  id: string;
  destination: "pinterest" | "instagram" | "stock";
  status: "sent" | "failed" | "scheduled" | "prepared" | "retry";
  scheduledFor?: string;
  createdAt: string;
  linkId?: string;
  assetIds: string[];
  error?: string;
};

export type SocialEvent = {
  id: string;
  headline: string;
  detail: string;
  ago: string;
  pill?: string;
};

export type ChecklistItem = {
  label: string;
  done: boolean;
  href?: string;
};

export type Testimonial = {
  name: string;
  avatar: string;
  earnings: string;
  period: string;
  quote: string;
  niche: string;
};

export type NicheData = {
  name: string;
  avgEarnings: string;
  growth: string;
};
