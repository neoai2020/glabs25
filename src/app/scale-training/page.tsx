"use client";

import { AppShell } from "@/components/layout/AppShell";
import { ArrowRight, Sparkles } from "lucide-react";

const JVZOO_CTA = "https://www.jvzoo.com/c/86517/415009";
const VIMEO_EMBED =
  "https://player.vimeo.com/video/1184548251?badge=0&autopause=0&player_id=0&app_id=58479";

export default function ScaleTrainingPage() {
  return (
    <AppShell
      title="Scale Training"
      subtitle="Exclusive training to multiply your results and automate your income"
      showBanner={false}
    >
      {/* Main content */}
      <div className="mx-auto max-w-3xl space-y-8 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/40 bg-sky-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-sky-300">
          <Sparkles size={14} className="text-sky-400" />
          Exclusive training
        </div>

        <h2 className="text-3xl font-extrabold uppercase leading-tight text-white sm:text-4xl md:text-5xl">
          Scale Your{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-cyan-300">
            G-Labs 95
          </span>{" "}
          To $1,000+ Per Day
        </h2>

        <p className="text-lg text-slate-400 md:text-xl">
          Watch this exclusive training to multiply your results and automate your path to
          life-changing income.
        </p>

        <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/40 shadow-2xl">
          <div className="relative" style={{ padding: "56.25% 0 0 0" }}>
            <iframe
              src={VIMEO_EMBED}
              className="absolute left-0 top-0 h-full w-full border-0"
              allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              title="Glabs video"
            />
          </div>
        </div>

        <a
          href={JVZOO_CTA}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex w-full max-w-xl items-center justify-center gap-2 rounded-xl bg-sky-600 px-8 py-5 text-base font-extrabold uppercase tracking-wide text-white shadow-lg shadow-sky-600/30 transition hover:bg-sky-500 sm:w-auto"
        >
          Click Here To Access Training
          <ArrowRight size={20} />
        </a>
      </div>
    </AppShell>
  );
}
