import { AppShell } from "@/components/layout/AppShell";
import { Badge } from "@/components/ui/Badge";
import { HelpCircle, MessageCircle, Mail, ChevronRight, Phone, CheckCircle2, Play, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

const faqs = [
  { 
    q: "How quickly can I start making money?", 
    a: "Most members see their first earnings within 3-7 days of posting consistently. Some see results faster depending on their niche and how many images they publish." 
  },
  { 
    q: "Do I need any technical skills?", 
    a: "No! The AI does everything for you. Just pick a topic, and the system creates beautiful images automatically. If you can click a button, you can do this." 
  },
  { 
    q: "What's an affiliate link and where do I get one?", 
    a: "An affiliate link is a special URL that tracks sales. When someone buys through your link, you earn a commission. Get one free from Amazon Associates, Etsy Affiliates, or other programs. We explain everything in the Money Links section." 
  },
  { 
    q: "How much can I realistically earn?", 
    a: "Our average member earns about $214.36/day. Top earners make $500-1,000/day. It depends on how consistently you follow our system." 
  },
  { 
    q: "Which platform should I start with?", 
    a: "Pinterest is the best place to start. You don't need followers, posts stay visible for months, and it has the highest earning potential. Our Cash Out section has step-by-step instructions." 
  },
  { 
    q: "How do I get paid?", 
    a: "Your affiliate program pays you directly. Amazon pays monthly via bank transfer or gift card. Most programs have a minimum payout threshold of $10-100." 
  },
];

// Support link placeholder
const supportLink = "#support";

export default function DocsHelpPage() {
  return (
    <AppShell
      title="Help Center"
      subtitle="Get answers to your questions"
    >
      {/* Quick Start Banner */}
      <div className="glass-gold rounded-3xl p-8">
        <div className="flex flex-col items-center text-center lg:flex-row lg:text-left lg:justify-between gap-6">
          <div className="flex flex-col lg:flex-row items-center gap-6">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-500/20">
              <Play size={28} className="text-amber-400 fill-amber-400 ml-1" />
            </div>
            <div>
              <Badge tone="gold">RECOMMENDED</Badge>
              <h2 className="mt-2 text-2xl font-bold text-white">New here? Watch this first</h2>
              <p className="text-slate-300">10-minute video that shows you exactly how to make money</p>
            </div>
          </div>
          <Link href="/academy" className="btn-premium flex items-center gap-2 rounded-xl px-6 py-3 font-semibold text-black">
            Watch Training
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>

      {/* FAQs */}
      <div className="glass-card rounded-3xl p-8">
        <h2 className="text-xl font-bold text-white">Frequently Asked Questions</h2>
        <p className="text-slate-400 mt-1">Click any question to see the answer</p>
        
        <div className="mt-6 space-y-3">
          {faqs.map((faq) => (
            <details key={faq.q} className="group rounded-2xl border border-white/10 bg-white/5">
              <summary className="flex cursor-pointer items-center justify-between p-5">
                <span className="font-medium text-white pr-4">{faq.q}</span>
                <ChevronRight size={20} className="text-slate-500 transition group-open:rotate-90 shrink-0" />
              </summary>
              <div className="border-t border-white/5 px-5 py-4">
                <p className="text-slate-300 leading-relaxed">{faq.a}</p>
              </div>
            </details>
          ))}
        </div>
      </div>

      {/* Quick Tips */}
      <div className="glass-card rounded-3xl p-8">
        <h2 className="text-xl font-bold text-white">Tips for Success</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-5">
            <p className="font-semibold text-emerald-400">✓ DO THIS</p>
            <ul className="mt-3 space-y-2">
              <li className="flex items-start gap-2 text-slate-300">
                <CheckCircle2 size={18} className="text-emerald-400 mt-0.5 shrink-0" />
                Post 5-10 images per day to Pinterest
              </li>
              <li className="flex items-start gap-2 text-slate-300">
                <CheckCircle2 size={18} className="text-emerald-400 mt-0.5 shrink-0" />
                Stick to 1-2 niches you know
              </li>
              <li className="flex items-start gap-2 text-slate-300">
                <CheckCircle2 size={18} className="text-emerald-400 mt-0.5 shrink-0" />
                Be patient - results grow over time
              </li>
              <li className="flex items-start gap-2 text-slate-300">
                <CheckCircle2 size={18} className="text-emerald-400 mt-0.5 shrink-0" />
                Use the AI-recommended prompts
              </li>
            </ul>
          </div>
          <div className="rounded-2xl border border-rose-500/20 bg-rose-500/5 p-5">
            <p className="font-semibold text-rose-400">✗ AVOID THIS</p>
            <ul className="mt-3 space-y-2">
              <li className="flex items-start gap-2 text-slate-300">
                <span className="text-rose-400 shrink-0 mt-0.5">✗</span>
                Posting just 1-2 images and giving up
              </li>
              <li className="flex items-start gap-2 text-slate-300">
                <span className="text-rose-400 shrink-0 mt-0.5">✗</span>
                Jumping between too many niches
              </li>
              <li className="flex items-start gap-2 text-slate-300">
                <span className="text-rose-400 shrink-0 mt-0.5">✗</span>
                Expecting overnight riches
              </li>
              <li className="flex items-start gap-2 text-slate-300">
                <span className="text-rose-400 shrink-0 mt-0.5">✗</span>
                Forgetting to add your affiliate link
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Contact Support */}
      <div className="glass-card rounded-3xl p-8">
        <h2 className="text-xl font-bold text-white">Need More Help?</h2>
        <p className="text-slate-400 mt-1">Our support team is here for you</p>
        
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <a href={supportLink} className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:bg-white/8 hover:border-emerald-500/30">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-emerald-500/20">
              <MessageCircle className="text-emerald-400" size={28} />
            </div>
            <div>
              <p className="text-lg font-semibold text-white">Live Chat</p>
              <p className="text-slate-400">Get help instantly</p>
              <Badge tone="success" size="sm">Online Now</Badge>
            </div>
          </a>
          <a href="mailto:support@glabs95.com" className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:bg-white/8 hover:border-amber-500/30">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-amber-500/20">
              <Mail className="text-amber-400" size={28} />
            </div>
            <div>
              <p className="text-lg font-semibold text-white">Email Us</p>
              <p className="text-slate-400">support@glabs95.com</p>
              <p className="text-xs text-slate-500">Usually replies in 2-4 hours</p>
            </div>
          </a>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center">
        <p className="text-lg text-slate-300">Ready to start earning?</p>
        <Link
          href="/image-forge"
          className="btn-premium mt-4 inline-flex items-center gap-3 rounded-xl px-10 py-5 text-xl font-bold text-black"
        >
          <Sparkles size={24} />
          Create Your First Image
          <ArrowRight size={24} />
        </Link>
      </div>
    </AppShell>
  );
}
