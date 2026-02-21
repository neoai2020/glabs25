import { AppShell } from "@/components/layout/AppShell";
import { Badge } from "@/components/ui/Badge";
import { docTips } from "@/lib/mockData";
import { 
  HelpCircle, 
  MessageCircle, 
  Mail, 
  BookOpen,
  CheckCircle2,
  XCircle,
  Zap,
  ArrowRight,
  Search
} from "lucide-react";
import Link from "next/link";

const faqs = [
  {
    question: "How quickly can I start earning?",
    answer: "Most members see their first earnings within 3-7 days. It depends on how many images you create and publish. The more you post, the faster you earn."
  },
  {
    question: "Do I need any technical skills?",
    answer: "No! The AI does all the hard work. You just describe what you want, and it creates the images. Then you click publish. It's that simple."
  },
  {
    question: "What are the best niches to start with?",
    answer: "Home office, skincare, and kitchen gadgets are currently the top earners. Check the 'Live Results' page to see what's trending."
  },
  {
    question: "How do I connect my affiliate links?",
    answer: "Go to 'Revenue Links' and click 'Add New Link'. Paste your Amazon, Etsy, or any affiliate link. It will automatically attach to your posts."
  },
  {
    question: "Why aren't my posts getting clicks?",
    answer: "Make sure you're posting at peak times (8-11 PM), using vertical images for Pinterest, and including 3-5 relevant hashtags."
  },
];

export default function DocsHelpPage() {
  return (
    <AppShell
      title="Help Center"
      subtitle="Everything you need to succeed - FAQs, tips, and support"
      showBanner={false}
      actions={<Badge tone="success">24/7 SUPPORT</Badge>}
    >
      {/* Search */}
      <div className="glass-card rounded-2xl p-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
          <input
            type="text"
            placeholder="Search for answers..."
            className="w-full rounded-xl border border-white/10 bg-black/40 py-4 pl-12 pr-4 text-lg text-white placeholder:text-slate-500 focus:border-amber-500/50 focus:outline-none"
          />
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        {/* Left Column */}
        <div className="space-y-6">
          {/* FAQs */}
          <div className="glass-card rounded-2xl p-6">
            <div className="flex items-center gap-3">
              <HelpCircle className="text-amber-400" size={24} />
              <h2 className="text-xl font-bold text-white">Frequently Asked Questions</h2>
            </div>

            <div className="mt-5 space-y-4">
              {faqs.map((faq) => (
                <div 
                  key={faq.question} 
                  className="rounded-xl border border-white/10 bg-white/5 p-5"
                >
                  <h3 className="text-lg font-semibold text-white">{faq.question}</h3>
                  <p className="mt-2 text-slate-300">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Tips */}
          <div className="glass-card rounded-2xl p-6">
            <div className="flex items-center gap-3">
              <Zap className="text-amber-400" size={24} />
              <h2 className="text-xl font-bold text-white">Pro Tips</h2>
            </div>

            <div className="mt-5 space-y-3">
              {docTips.map((tip) => (
                <div 
                  key={tip} 
                  className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-4"
                >
                  <CheckCircle2 className="mt-0.5 text-emerald-400 flex-shrink-0" size={18} />
                  <p className="text-slate-300">{tip}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Do's and Don'ts */}
          <div className="space-y-4">
            <div className="glass-money rounded-2xl p-6">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="text-emerald-400" size={20} />
                <h3 className="text-lg font-bold text-white">Do This</h3>
              </div>
              <ul className="mt-4 space-y-3">
                {[
                  "Post consistently - daily is best",
                  "Use vertical images for Pinterest",
                  "Add 3-5 relevant hashtags",
                  "Write engaging captions",
                  "Track what works and do more of it"
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-slate-300">
                    <CheckCircle2 size={16} className="mt-0.5 text-emerald-400 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="glass-card rounded-2xl border-rose-500/20 p-6">
              <div className="flex items-center gap-2">
                <XCircle className="text-rose-400" size={20} />
                <h3 className="text-lg font-bold text-white">Avoid This</h3>
              </div>
              <ul className="mt-4 space-y-3">
                {[
                  "Spamming too many posts at once",
                  "Using irrelevant or too many hashtags",
                  "Posting without a profit link",
                  "Giving up after a few days",
                  "Copying exact content from others"
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-slate-300">
                    <XCircle size={16} className="mt-0.5 text-rose-400 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact Support */}
          <div className="glass-gold rounded-2xl p-6">
            <h3 className="text-lg font-bold text-white">Need More Help?</h3>
            <p className="mt-2 text-slate-300">Our support team is here to help you succeed</p>
            
            <div className="mt-5 space-y-3">
              <a 
                href="#" 
                className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-4 transition hover:bg-white/10"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/20">
                  <MessageCircle className="text-amber-400" size={20} />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-white">Live Chat</p>
                  <p className="text-sm text-slate-400">Get instant help</p>
                </div>
                <ArrowRight className="text-slate-400" size={18} />
              </a>
              
              <a 
                href="mailto:support@profitflow.ai" 
                className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-4 transition hover:bg-white/10"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/20">
                  <Mail className="text-amber-400" size={20} />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-white">Email Support</p>
                  <p className="text-sm text-slate-400">support@profitflow.ai</p>
                </div>
                <ArrowRight className="text-slate-400" size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="glass-card rounded-2xl p-6">
            <div className="flex items-center gap-2">
              <BookOpen className="text-amber-400" size={20} />
              <h3 className="text-lg font-bold text-white">Quick Links</h3>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <Link 
                href="/academy" 
                className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-center text-sm font-semibold text-white hover:bg-white/10"
              >
                Free Training
              </Link>
              <Link 
                href="/image-forge" 
                className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-center text-sm font-semibold text-white hover:bg-white/10"
              >
                Create Images
              </Link>
              <Link 
                href="/monetization/link-vault" 
                className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-center text-sm font-semibold text-white hover:bg-white/10"
              >
                Add Links
              </Link>
              <Link 
                href="/launchpad" 
                className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-center text-sm font-semibold text-white hover:bg-white/10"
              >
                Publish Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
