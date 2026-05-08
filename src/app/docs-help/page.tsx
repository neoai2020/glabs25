import { AppShell } from "@/components/layout/AppShell";
import { Badge } from "@/components/ui/Badge";
import { MessageCircle, Mail, ChevronRight, CheckCircle2, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

const faqs = [
  {
    q: "Do I need any technical skills?",
    a: "No. Pick a topic and the system creates images for you. If you can click a button, you can use G-Labs 95.",
  },
  {
    q: "What's an affiliate link and where do I get one?",
    a: "An affiliate link is a destination URL provided by an affiliate program that identifies you as the referrer. You can apply for free with programs like Amazon Associates, Etsy Affiliates, or ShareASale. Save your link in the Affiliate Links section.",
  },
  {
    q: "Which platform should I start with?",
    a: "Pinterest is a good place to start — pins are discovered through search and stay visible for a long time. Launchpad has step-by-step instructions for Pinterest, Instagram, TikTok, and Facebook.",
  },
  {
    q: "How do I save and reuse images?",
    a: "Generated images appear in your Library and on the Launchpad page under \"Your Images Ready to Post.\" You can download them at any time.",
  },
];

const supportLink = "#support";

export default function DocsHelpPage() {
  return (
    <AppShell
      title="Help Center"
      subtitle="Get answers to your questions."
    >
      {/* FAQs */}
      <div className="glass-card rounded-3xl p-8">
        <h2 className="text-xl font-bold text-white">Frequently Asked Questions</h2>
        <p className="text-slate-400 mt-1">Click any question to see the answer.</p>

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
        <h2 className="text-xl font-bold text-white">Tips</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-5">
            <p className="font-semibold text-emerald-400">DO</p>
            <ul className="mt-3 space-y-2">
              <li className="flex items-start gap-2 text-slate-300">
                <CheckCircle2 size={18} className="text-emerald-400 mt-0.5 shrink-0" />
                Post a few images per day on Pinterest for best discoverability
              </li>
              <li className="flex items-start gap-2 text-slate-300">
                <CheckCircle2 size={18} className="text-emerald-400 mt-0.5 shrink-0" />
                Stick to 1-2 niches you know
              </li>
              <li className="flex items-start gap-2 text-slate-300">
                <CheckCircle2 size={18} className="text-emerald-400 mt-0.5 shrink-0" />
                Use the AI-recommended prompts
              </li>
              <li className="flex items-start gap-2 text-slate-300">
                <CheckCircle2 size={18} className="text-emerald-400 mt-0.5 shrink-0" />
                Save your affiliate links so they&apos;re ready to attach
              </li>
            </ul>
          </div>
          <div className="rounded-2xl border border-rose-500/20 bg-rose-500/5 p-5">
            <p className="font-semibold text-rose-400">AVOID</p>
            <ul className="mt-3 space-y-2">
              <li className="flex items-start gap-2 text-slate-300">
                <span className="text-rose-400 shrink-0 mt-0.5">×</span>
                Posting once and forgetting about it
              </li>
              <li className="flex items-start gap-2 text-slate-300">
                <span className="text-rose-400 shrink-0 mt-0.5">×</span>
                Jumping between too many niches
              </li>
              <li className="flex items-start gap-2 text-slate-300">
                <span className="text-rose-400 shrink-0 mt-0.5">×</span>
                Forgetting to attach your affiliate link
              </li>
              <li className="flex items-start gap-2 text-slate-300">
                <span className="text-rose-400 shrink-0 mt-0.5">×</span>
                Posting low-quality or off-topic images
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Contact Support */}
      <div className="glass-card rounded-3xl p-8">
        <h2 className="text-xl font-bold text-white">Need More Help?</h2>
        <p className="text-slate-400 mt-1">Our support team is here for you.</p>

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
        <p className="text-lg text-slate-300">Ready to create something?</p>
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
